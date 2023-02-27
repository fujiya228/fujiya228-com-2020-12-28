---
layout: post
title: '新しいブランチが作成された時にGitHubActionsでPRを作成する-GitHub'
author: [Fujiya]
tags: ['GitHub','GitHubActions', 'PR']
category: GitHub
image: 'img/taxonomy/github.png'
date: '2023-02-10T01:31:44'
draft: false
excerpt: GitHub Article
---

新しいブランチが作成された時にGitHubActionsでPRを作成する方法を調べてみました。

注意点
- GitHubActionsは、リポジトリのデフォルトブランチに対してのみ動作します。
  - [参考](https://docs.github.com/ja/actions/reference/events-that-trigger-workflows#about-workflow-events)
- コミットがない状態でプッシュしても失敗します。

Actions周りのドキュメントは、以下のページが参考になりました。

- [ワークフローについて](https://docs.github.com/ja/actions/using-workflows/about-workflows)

ブランチやタグが作成された時に発火するのは`create`イベントです。
[参考](https://docs.github.com/ja/actions/using-workflows/events-that-trigger-workflows#create)

フィルターの構文
[参考](https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions)

テンプレートを使う
[参考](https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

PR作成に関連するActionsのスクリプトには、以下のようなものあるみたいなので試してみたい。
- https://github.com/marketplace/actions/create-pull-request
- [actions/github-script](https://github.com/actions/github-script)