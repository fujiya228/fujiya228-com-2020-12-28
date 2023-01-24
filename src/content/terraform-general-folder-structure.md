---
layout: post
title: 'Terraformの一般的なフォルダ構成例-Terraform'
author: [Fujiya]
tags: ['Terrafrom', 'フォルダ構成', 'ディレクトリ構成', '一般']
category: Terrafrom
image: 'img/taxonomy/terraform.png'
date: '2023-01-25T03:10:30'
draft: false
excerpt: Terrafrom Article
---

## 概要

Terraformの一般的なフォルダ構成例をChatGPTに聞いてみた。

一般的なフォルダ構成の例は以下の通りらしい。

```bash:title=一般的なフォルダ構成例
my-project/
    |
    |--main.tf
    |--variables.tf
    |--outputs.tf
    |--terraform.tfvars
    |--modules/
    |     |
    |     |--module1/
    |     |   |
    |     |   |--main.tf
    |     |   |--variables.tf
    |     |   |--outputs.tf
    |     |
    |     |--module2/
    |         |
    |         |--main.tf
    |         |--variables.tf
    |         |--outputs.tf
    |
    |--enviroments/
          |
          |--prod/
          |   |
          |   |--terraform.tfvars
          |
          |--staging/
              |
              |--terraform.tfvars
```

>- **`main.tf`**: Terraformの設定ファイル。ここには、AWSのリソースを作成、削除、更新するための設定が書かれています。
>- **`variables.tf`**: Terraformの変数定義。ここでは、main.tfで使用する変数を定義します。
>- **`outputs.tf`**: Terraformが作成したリソースの一部を出力するための設定が書かれています。
>- **`terraform.tfvars`**: Terraformの変数に代入する値を設定します。
>- **`modules/`**: Terraformのモジュールを格納します。
>- **`environments/`**: 環境ごとに異なる設定を適用するために、環境ごとにフォルダを作成し、それぞれにterraform.tfvarsを配置します。
>
>上記のフォルダ構成はあくまで一例であり、ご自身のプロジェクトに合ったフォルダ構成をカスタマイズすることで、よりスケーラブルかつ管理しやすい構成にすることができます。

## 他にも調べてみた

この記事を書いている時点で、他にも調べてみた。

[Terraformのディレクトリパターン集](https://qiita.com/reireias/items/253529c889cafb3fa4c7)
- 1ディレクトリでworkspaceを使うパターン
- 環境ごとにディレクトリを切るパターン
- 共通部分をmoduleに切り出すパターン

[Terraformの最適（≠最強）なディレクトリ構成を考えてみた](https://zenn.dev/himekoh/articles/202208191916)

 ```bash:title=Terraformの最適（≠最強）なディレクトリ構成
 .
 ├── env1
 │   ├── backend.tf
 │   ├── outputs.tf
 │   ├── terraform.tfvars
 │   └── variables.tf
 │   ・・・
 ├── env2
 │   ├── backend.tf
 │   ├── outputs.tf
 │   ├── terraform.tfvars
 │   └── variables.tf
 │   ・・・
 ├── modules
 │   └── example1
 │       ├── main.tf
 │       ├── outputs.tf
 │       └── variables.tf
 └── shared
     └── provider.tf
     ・・・
 ```

## まとめ

「開発している環境による」と言ったらChatGPTの回答と同じになるんだけど、DRYに書くためには、moduleやenvironmentに分けるのはどの環境でもありそうだなと思った。
