---
layout: post
title: 'PythonでGoogle Drive上のCSVファイルを読み込み、Google Cloud Storageにアップロードする方法-GCP'
author: [Fujiya]
tags: ['GCP', 'Google Drive', 'Cloud Storage', 'Python']
category: GCP
image: 'img/taxonomy/gcp.png'
date: '2023-02-25T00:17:29'
draft: false
excerpt: GCP Article
---

## 概要

Google Drive上のCSVファイルを読み込み、Google Cloud Storageにアップロード

## 前提・事前準備

- Python3.10.2

### 1. IAM

- 使用するサービスアカウント
  - Google Driveへのアクセス用
  - Cloud Storageへのアクセス用
- 各アカウントのJSONをプログラムのフォルダへ格納
  - Dieveアクセス用のアカウントがGoogle Driveへアクセスできるよにしておく
  - メールアドレスが発行されるのでそれを指定して招待する
  - 閲覧者でOK

### 2. GCPで各種APIを有効化

- cloud function
- drive

### 3. Google Cloud Storage

以下を手動で準備
- バケット作成
- サービスアカウントに対して、func-py-storageにアクセス権限を付与
  - 「バケットの詳細 > 権限 > アクセス権を付与」で割り当て
  - ストレージ管理者を付与
  - サービスアカウント作成時にも可能（[参考](https://zenn.dev/ohsawa0515/articles/allow-access-specific-gcs-bucket-by-iam-conditions)）


## ソースコード

```txt:title=requirements.txt
google-api-python-client==2.74.0
google-auth-httplib2==0.1.0
google-auth-oauthlib==0.8.0
google-cloud-storage==2.5.0
pandas==1.3.4
python-dateutil==2.8.2
```

```py:title=main.py
from google.cloud import storage
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

import pandas as pd

from get_file_list_from_drive import get_file_list_from_drive
from download_from_drive import download_from_drive
from upload_to_gcs import upload_to_gcs

BUCKET_NAME = 'test_bucket'
FOLDER_NAME = 'folder1'
DRIVE_ID = '1dPDPC_Z0jJMsdfV2_4voIlkjcOK0uy'
DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive']

def move_csv():
    try:
        drive_creds = Credentials.from_service_account_file('drive-service-credentials.json', scopes=DRIVE_SCOPES)
        drive_service = build('drive', 'v3', credentials=drive_creds)
        gcs_creds = Credentials.from_service_account_file('gcs-service-credentials.json')
        gcs_client = storage.Client(credentials=gcs_creds)
        bucket = gcs_client.get_bucket(BUCKET_NAME)

        items = get_file_list_from_drive(drive_service, DRIVE_ID)

        if not items:
            print('ファイルはありませんでした。')
            exit()

        for item in items:
            print(f'{item["name"]} {item["createdTime"]} {item["id"]}')
            file = download_from_drive(drive_service, item['id'])

            df = pd.read_csv(file)
            upload_to_gcs(bucket, f'{FOLDER_NAME}/{item["name"]}', df.to_csv(index=False))

        # 正常終了した時のメッセージをセット
        message = 'BQテーブル更新成功'

    except Exception as e:
        # エラーが発生した時のメッセージをセット
        print(e)
        message = 'BQテーブル更新失敗'

    print(message)

if __name__ == '__main__':
    move_csv()
```

```py:title=get_file_list_from_drive.py
from datetime import timedelta, datetime
from dateutil import tz

def get_file_list_from_drive(service, target_folder_id):
    now = datetime.now(tz.gettz('Asia/Tokyo'))
    today = now.strftime('%Y-%m-%d')
    yesterday = (now - timedelta(days=1)).strftime('%Y-%m-%d')
    search_query = f"parents in '{target_folder_id}' and trashed = false and createdTime >= '{yesterday}' and createdTime < '{today}'"

    print(f"search_query => {search_query}")

    results = service.files().list(
        supportsAllDrives=True,
        includeItemsFromAllDrives=True,
        pageSize=50,
        q=search_query,
        fields="files(id, name, createdTime)").execute()
    return results.get('files', [])
```

```py:title=download_from_drive.py
import io
import re
from googleapiclient.http import MediaIoBaseDownload

def download_from_drive(service, id):
    request = service.files().get_media(fileId=id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()

        encoding_list = [
            'UTF-8',
            'UTF-16',
            'SHIFT_JIS',
            'CP932',
        ]
        bytes =  fh.getvalue()
        for encoding in encoding_list:
            try:
                file_text = bytes.decode(encoding)
                print(f'encoding is "{encoding}"')
                break
            except UnicodeDecodeError as error:
                print(f'encoding is not "{encoding}"')

    return io.StringIO(re.sub(r',\s*?\n', '\n', file_text))
```

```py:title=upload_to_gcs.py
def upload_to_gcs(bucket, blob_name, data):
    blob = bucket.blob(blob_name)
    blob.upload_from_string(data=data, content_type='text/csv')
    print(f"Blob {blob_name} created.")
```

## 解説

### main.py

このプログラムは、Google Drive上のCSVファイルを読み込み、Google Cloud StorageにアップロードするためのPythonスクリプトです。以下に解説を記載します。

```py:title=main.py
from google.cloud import storage
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

import pandas as pd

from get_file_list_from_drive import get_file_list_from_drive
from download_from_drive import download_from_drive
from upload_to_gcs import upload_to_gcs

BUCKET_NAME = 'sbi_stock_518_atarayo'
FOLDER_NAME = 'folder1'
DRIVE_ID = '1dPDPC_Z0jJMsdfV2_4voIlkjcOK0uy'
DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive']
```

Google Cloud StorageやGoogle DriveのAPIを使用するためのライブラリをインポートしています。

また、BUCKET_NAME、FOLDER_NAME、DRIVE_ID、DRIVE_SCOPESを設定しています。
- BUCKET_NAMEは、アップロードするバケットの名前
- FOLDER_NAMEは、アップロードするフォルダの名前
- DRIVE_IDは、読み込むファイルが存在するGoogle DriveフォルダのID
- DRIVE_SCOPESは、Google Drive APIのスコープ

```py:title=main.py
def move_csv():
    try:
        drive_creds = Credentials.from_service_account_file('drive-service-credentials.json', scopes=DRIVE_SCOPES)
        drive_service = build('drive', 'v3', credentials=drive_creds)
        gcs_creds = Credentials.from_service_account_file('gcs-service-credentials.json')
        gcs_client = storage.Client(credentials=gcs_creds)

        bucket = gcs_client.get_bucket(BUCKET_NAME)
        items = get_file_list_from_drive(drive_service, DRIVE_ID)

        if not items:
            print('ファイルはありませんでした。')
            exit()

        for item in items:
            print(f'{item["name"]} {item["createdTime"]} {item["id"]}')
            file = download_from_drive(drive_service, item['id'])

            df = pd.read_csv(file)
            upload_to_gcs(bucket, f'{FOLDER_NAME}/{item["name"]}', df.to_csv(index=False))

        # 正常終了した時のメッセージをセット
        message = 'BQテーブル更新成功'

    except Exception as e:
        # エラーが発生した時のメッセージをセット
        print(e)
        message = 'BQテーブル更新失敗'

    print(message)

```

`move_csv`関数では、Google DriveおよびGoogle Cloud Storageに接続し、CSVファイルを読み込んでアップロードします。具体的には、Google DriveおよびGoogle Cloud Storageのクライアントを取得し、`get_file_list_from_drive`関数を使用してGoogle Driveフォルダ内のファイルのリストを取得します。

リストが空でない場合は、ファイルを1つずつ読み込んで、Pandasライブラリを使用してCSVを読み込みます。

CSVを読み込んだら、`upload_to_gcs`関数を使用して、CSVファイルをGoogle Cloud Storageにアップロードします。アップロードされたファイルは、指定されたバケットとフォルダに保存されます。アップロードが完了した後は、正常終了したメッセージが表示されます。

```py:title=main.py
if __name__ == '__main__':
    move_csv()
```

最後に、`move_csv`関数を呼び出して、スクリプトを実行します。このスクリプトを実行するためには、Google DriveおよびGoogle Cloud Storageの認証情報が必要です。認証情報は、それぞれのサービスの管理画面から取得することができます。また、必要なライブラリをインストールする必要があります。

### get_file_list_from_drive.py

このプログラムは、Google Driveから指定されたフォルダ内にあるファイルのリストを取得するための関数です。

```py:title=get_file_list_from_drive.py
from datetime import timedelta, datetime
from dateutil import tz

def get_file_list_from_drive(service, target_folder_id):
```

必要なライブラリをインポートして、ファイルリストを取得するための関数を定義します。関数には、Google DriveのAPIを利用するためのサービスオブジェクトと、取得対象のフォルダのIDが引数として与えられます。


```py:title=get_file_list_from_drive.py
now = datetime.now(tz.gettz('Asia/Tokyo'))
today = now.strftime('%Y-%m-%d')
yesterday = (now - timedelta(days=1)).strftime('%Y-%m-%d')
search_query = f"parents in '{target_folder_id}' and trashed = false and createdTime >= '{yesterday}' and createdTime < '{today}'"
```

今回は、フォルダ内のファイルを日付でフィルタリングします。

まず、現在の日時を取得し、タイムゾーンを設定します。ここでは、日本標準時を指定しています。次に、今日の日付と昨日の日付を文字列として取得します。最後に、Google DriveのAPIを使用して、ファイルを検索するためのクエリを作成します。クエリは、以下の条件で作成します。

- フォルダをIDで指定
- 削除されていないファイルに絞る
- 作成日が昨日以降、作成日が今日以前のファイル

```py:title=get_file_list_from_drive.py
print(f"search_query => {search_query}")

results = service.files().list(
    supportsAllDrives=True,
    includeItemsFromAllDrives=True,
    pageSize=50,
    q=search_query,
    fields="files(id, name, createdTime)").execute()
```

作成した検索クエリを出力し、Google DriveのAPIを使ってファイルリストを取得します。ここでは、全ドライブから検索対象とするために`supportsAllDrives`と`includeItemsFromAllDrives`を`True`に設定しています。また、1回のリクエストで最大50件のファイルを取得するように設定しています。取得されるファイルの情報には、ファイルのID、ファイル名、作成日時が含まれます。

```py:title=get_file_list_from_drive.py
return results.get('files', [])
```

取得したファイルリストを戻り値として返します。ただし、リストが空の場合は、空のリストを返します。

### download_from_drive.py

このプログラムは、Google Drive上のファイルをダウンロードするための関数です。
Google Drive上にあるファイルをダウンロードし、CSVファイル内の文字コードを推定して、文字コードを変換したファイル内容を`StringIO`オブジェクトとして返します。

```py:title=download_from_drive.py
import io
import re
from googleapiclient.http import MediaIoBaseDownload

def download_from_drive(service, id):
```

必要なライブラリをインポートして、ファイルリストを取得するための関数を定義します。

（Pythonの標準ライブラリであるioと、正規表現操作に必要なreをインポートしています。また、Google Drive APIでファイルをダウンロードするために必要なMediaIoBaseDownloadをインポートしています。）

`download_from_drive()`関数を定義します。この関数は、Google Drive上のファイルをダウンロードし、テキストファイルとして返します。この関数は、Google DriveのファイルIDを引数として受け取ります。

```py:title=download_from_drive.py
request = service.files().get_media(fileId=id)
fh = io.BytesIO()
downloader = MediaIoBaseDownload(fh, request)
done = False
while done is False:
    status, done = downloader.next_chunk()
```

まず、Google Driveからファイルをダウンロードするために、`service.files().get_media()` メソッドを使用します。このメソッドは、`fileId` 引数で指定されたIDのファイルをダウンロードするためのリクエストを作成します。

`MediaIoBaseDownload()` クラスは、バッファにファイルデータをダウンロードするためのオブジェクトです。`downloader.next_chunk()` メソッドを使用して、ファイルデータをバッファに取得しています。ダウンロードが完了するまで、whileループを使用して、ファイルのダウンロードを続けます。

```py:title=download_from_drive.py
encoding_list = [
    'UTF-8',
    'UTF-16',
    'SHIFT_JIS',
    'CP932',
]
```

ダウンロードしたファイルのエンコーディングを自動検出するために、`encoding_list`というエンコーディングのリストを定義します。
日本語を扱う場合は、上記である程度カバーできるはずです。

```py:title=download_from_drive.py
bytes =  fh.getvalue()
for encoding in encoding_list:
    try:
        file_text = bytes.decode(encoding)
        print(f'encoding is "{encoding}"')
        break
    except UnicodeDecodeError as error:
        print(f'encoding is not "{encoding}"')
```

`io.BytesIO()`オブジェクトに格納されたバイト文字列を取得し、各エンコーディングでデコードを試行します。デコードに成功した場合、`file_text`変数にテキストとして格納し、ループを抜けます。デコードに失敗した場合は、エラーメッセージを出力します。

```py:title=download_from_drive.py
return io.StringIO(re.sub(r',\s*?\n', '\n', file_text))
```

最後に、正規表現を使用して、ファイル内のコンマの前にスペースがある場合に、そのスペースを削除することにより、PandasによるCSVの読み込みに問題が生じるのを回避します。

### upload_to_gcs.py

```py:title=upload_to_gcs.py
def upload_to_gcs(bucket, blob_name, data):
    blob = bucket.blob(blob_name)
    blob.upload_from_string(data=data, content_type='text/csv')
    print(f"Blob {blob_name} created.")
```

`upload_to_gcs` 関数は、Google Cloud Storage に指定されたバケットに CSV データをアップロードするための関数です。引数として、`bucket` は `google.cloud.storage.bucket.Bucket` オブジェクト、`blob_name` はアップロードする CSV ファイルの名前、`data` はアップロードする CSV データを指定します。

まず、`bucket.blob(blob_name)` を使って、アップロードする CSV ファイルのオブジェクトを取得します。次に、`blob.upload_from_string()` を呼び出して、指定された文字列を CSV データとしてアップロードします。`content_type` には、アップロードするファイルの MIME タイプを指定します。ここでは、CSV ファイルのために `text/csv` を指定しています。

最後に、`print()` 関数を使って、アップロードが完了したことを示すメッセージを出力します。