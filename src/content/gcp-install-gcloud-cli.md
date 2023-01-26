---
layout: post
title: 'gcloud CLI のインストールから基本的な使い方-GCP'
author: [Fujiya]
tags: ['GCP', 'gcloud CLI', 'Install', '', ]
category: GCP
image: 'img/taxonomy/gcp.png'
date: '2023-01-26T23:55:20'
draft: false
excerpt: GCP Article
---

## 概要

1. gcloud CLIのインストール
2. 初期化
3. 認証方法
4. 基本的な使い方
5. その他の機能について

## gcloud CLIのインストール

公式にはいくつかインストール方法が記載されているが、今回はインストーラーを利用する方法で説明します。
Google Cloud CLI のインストール方法は、OSによって異なります。

参考：[Google Cloud CLI インストーラの使用](https://cloud.google.com/sdk/docs/downloads-interactive?hl=ja#linux-mac)

### MacOS / Linuxの場合

1. 以下のコマンドを実行します。
  ```bash:title=MacOS/Linux
  curl https://sdk.cloud.google.com | bash
  ```
2. いくつかの質問が表示されるので、それぞれに対して回答してください。
   1. **Installation directory (this will create a google-cloud-sdk subdirectory) (ホームディレクトリが表示されているはず):**
      - インストール先を指定します。デフォルトのままで問題ありません。
      - 何も入力せずにEnterを押すと、デフォルトのインストール先にインストールされます。
   2. **Do you want to help improve the Google Cloud CLI (y/N)?**
      - gcloud CLI の改善のために匿名の使用統計情報を送信するかどうかを選択します。
      - 個人的には協力したいです。
   3. **Modify profile to update your $PATH and enable shell command completion?**
      - プロファイルを変更して、$PATHを更新し、シェルコマンドの補完を有効にするか選択します。
      - 基本はYesで問題ありません。
      - Yesで回答した場合利用している、シェルに合わせて更新するrc fileが表示されます。問題なければそのままEnterを押してください。
3. インストールが完了したら、以下のコマンドを実行するなどしてシェルを再起動してください。
  ```bash:title=MacOS/Linux
  exec -l $SHELL
  ```
4. インストールが完了したかどうかを確認するために、以下のコマンドを実行してください。
  ```bash:title=MacOS/Linux
  gcloud version
  ```
  インストールが完了していれば、以下のような結果が表示されます。
  ```bash:title=MacOS/Linux
  Google Cloud SDK 415.0.0
  bq 2.0.84
  core 2023.01.20
  gcloud-crc32c 1.0.0
  gsutil 5.18
  ```


### Windowsの場合（一応）

- [Google Cloud CLI インストーラ](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe?hl=ja)をダウンロードします。
- ダウンロードしたインストーラーを実行し、画面の指示に沿って操作してください。（詳細に関しては[こちら](https://cloud.google.com/sdk/docs/downloads-interactive?hl=ja#windows)を参考にしてください）

## 初期化

Google Cloud CLI を初期化するには、gcloud init を実行します。

1. gcloud init を実行します。
  ```bash:title=Command
  gcloud init
  ```
2. **You must log in to continue. Would you like to log in (Y/n)?**
   - 初めての設定の場合、ログインを求められます。
   - Yesで問題ありません。
   - Yesを選択した場合、ブラウザが開き、Googleアカウントでログインします。
   - Googleアカウントを選択すると、SDKに操作を許可するかどうかの質問が表示されるので、許可します。
   - 許可すると自動的にCLIに戻ります。
3. **Pick cloud project to use:**
   - どのプロジェクトを利用するかを選択します。
   - プロジェクトがない場合は、新規に作成するか、既存のプロジェクトを選択します。
   - 今回は、既存のプロジェクトを選択します。
   - 数字を選んでください。
4. これで設定は完了です。

## 認証方法

Google Cloud にアクセスするには、初期化のときにログインしたように Google Cloud CLI を承認する必要があります。
大きく分けて、2つの方法があります。

### ユーザーアカウント

[ユーザーアカウント](https://cloud.google.com/docs/authentication?hl=ja#user_accounts)を利用する場合、以下のコマンドを実行します。
ブラウザで Google アカウントにログインし、認証情報を取得します。（初期化時と同様）

```bash:title=Command
gcloud auth login
```

### サービスアカウント

[サービスアカウント](https://cloud.google.com/docs/authentication?hl=ja#service_accounts)を利用する場合、以下のコマンドを実行します。

```bash:title=Command
gcloud auth activate-service-account --key-file=PATH_TO_KEY_FILE
```

その他認証関連の操作以下を参考にしてください。

- [アカウントの一覧表示](https://cloud.google.com/sdk/docs/authorizing?hl=ja#list_accounts)
- [有効なアカウントを切り替える](https://cloud.google.com/sdk/docs/authorizing?hl=ja#switch_the_active_account)
- [承認済みセッションの長さの設定（Google Workspace のみ）](https://cloud.google.com/sdk/docs/authorizing?hl=ja#set_authorized_session_length_only)
- [アカウントの認証情報を取り消す](https://cloud.google.com/sdk/docs/authorizing?hl=ja#revoke_credentials_for_an_account)
- [認証情報ファイルを操作する](https://cloud.google.com/sdk/docs/authorizing?hl=ja#work_with_credential_files)
- [アプリケーションのデフォルト認証情報を設定する](https://cloud.google.com/sdk/docs/authorizing?hl=ja#set_up_application_default_credentials)

## 基本的な使い方
-  プロジェクトの一覧表示
  ```bash:title=Command
  gcloud projects list
  ```
-  プロジェクトの切り替え
  ```bash:title=Command
  gcloud config set project PROJECT_ID
  ```
-  バケットの一覧表示
  ```bash:title=Command
  gsutil ls
  ```
-  バケットの作成
  ```bash:title=Command
  gsutil mb gs://BUCKET_NAME
  ```
-  バケットの削除
  ```bash:title=Command
  gsutil rm -r gs://BUCKET_NAME
  ```
-  バケットの中身を表示
  ```bash:title=Command
  gsutil ls gs://BUCKET_NAME
  ```
-  ファイルのアップロード
  ```bash:title=Command
  gsutil cp FILE_NAME gs://BUCKET_NAME
  ```
-  ファイルのダウンロード
  ```bash:title=Command
  gsutil cp gs://BUCKET_NAME/FILE_NAME .
  ```
-  ファイルの削除
  ```bash:title=Command
  gsutil rm gs://BUCKET_NAME/FILE_NAME
  ```
-  ファイルの移動
  ```bash:title=Command
  gsutil mv gs://BUCKET_NAME/FILE_NAME gs://BUCKET_NAME/FILE_NAME
  ```
-  ファイルのコピー
  ```bash:title=Command
  gsutil cp gs://BUCKET_NAME/FILE_NAME gs://BUCKET_NAME/FILE_NAME
  ```

## その他の機能について

コンポーネントは、Google Cloud CLI のインストールして追加することが可能です。

コンポーネントは、以下のコマンドで確認できます。

```bash:title=Command
gcloud components list
```

コンポーネントをインストールするには、以下のコマンドを実行します。

```bash:title=Command
gcloud components install COMPONENT_ID
```

コンポーネントをアップデートするには、以下のコマンドを実行します。

```bash:title=Command
gcloud components update COMPONENT_ID
```

コンポーネントをアンインストールするには、以下のコマンドを実行します。

```bash:title=Command
gcloud components remove COMPONENT_ID
```

参考：[gcloud CLI コンポーネントを管理する](https://cloud.google.com/sdk/docs/components?hl=ja)