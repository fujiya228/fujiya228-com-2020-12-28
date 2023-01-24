---
layout: post
title: 'サービスから吐き出されたJSONデータをBigQueryへ連携する方法-GCP'
author: [Fujiya]
tags: ['GCP', 'BigQuery', 'Cloud Storage', 'JSON', ]
category: GCP
image: 'img/taxonomy/gcp.png'
date: '2023-01-25T02:55:47'
draft: false
excerpt: GCP Article
---

## 手順

1. JSONデータをGoogle Cloud Storage（以下GCS）へアップロード
2. BigQuery（以下BQ）でJSONデータを読み込む

## 詳細

### 1. JSONデータをGCSへアップロード

- GCP（事前準備）
    - GCSへアップロードするために必要なAPIを有効化
        - cloud storageを有効化
        - 他のAPIが必要だった場合は、お手数ですが必要なものを有効化してください
        - 参考：[Google Cloud プロジェクトでの API の有効化](https://cloud.google.com/endpoints/docs/openapi/enable-api?hl=ja)
    - GCSへアップロードするための認証情報を発行する
        - 以下のいずれか、で良いですが今回はサービスアカウントで説明します。
            - API キー
            - OAuth
            - サービスアカウント
        - サービスアカウントでキーを発行しておく
            - 参考：[サービス アカウント キーの作成と管理](https://cloud.google.com/iam/docs/creating-managing-service-account-keys?hl=ja)
    - GCSにJSONデータ格納用のバケットを用意する
        - 基本デフォルトの設定でも問題ない
        - 「バケットの詳細 > 権限 > アクセス権を付与」で割り当て
        - ストレージ管理者を付与
        - アカウント作成時にも可能（[参考](https://zenn.dev/ohsawa0515/articles/allow-access-specific-gcs-bucket-by-iam-conditions)）
- プログラム
    - クライアントライブラリをインストール（メジャーな言語なら対応しているはず）
    - サービスアカウントのキーで認証情報を取得
        - 参考：[サービスアカウントとして認証する](https://cloud.google.com/docs/authentication/production?hl=ja)
    - ファイルをBQで読み込める形式に変換
        - 参考：[制約事項](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-json?hl=ja#limitations)
    - アップロード（作成したGCSバケットへ）
        - 参考：[ファイル システムからオブジェクトをアップロードする](https://cloud.google.com/storage/docs/uploading-objects?hl=ja#storage-upload-object-python)

### 2. BQでJSONデータを読み込む

- テーブルをCloud Storageのデータを参照する形で作成
    - テーブルの作成元 => GCS
    - ファイル選択 or URIパターン
        - URIパターンなら「*.json」などで複数読み込める
        - 作成したバケット内で指定することになる
    - ファイル形式 => JSON
    - プロジェクト => 任意
    - データセット => 任意
    - テーブル => 任意の名前
    - テーブルタイプ => 外部テーブル
    - スキーマ => 自動検出（検出できない場合はJSONデータの構造を見直す必要あり）

## 参考

- [Cloud Storage からの JSON データの読み込み](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-json?hl=ja)