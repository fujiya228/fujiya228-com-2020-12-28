---
layout: post
title: 'bundlerをバージョン指定して実行-Ruby'
author: [Fujiya]
tags: ['bundler', 'バージョン指定']
category: Ruby
image: 'img/taxonomy/ruby.png'
date: '2021-05-11T00:54:52'
draft: false
excerpt: Ruby Article
---

`bundler`のバージョンを指定して実行したい！

## 結論
```bash:title=bash
bundler _バージョン_ コマンド

# 例
bundler _2.2.15_ -v
```
## 実際に確認する

### インストールされたバージョンの確認
```bash:title=bash
gem list bundler
```
```bash:title=実行結果
*** LOCAL GEMS ***

bundler (2.2.15, 2.2.11)
```

### バージョンを指定してbundlerのバージョンを確認
```bash:title=bash
bundler _2.2.15_ -v
```
```bash:title=実行結果
Bundler version 2.2.15
```

## まとめ
bundlerをバージョン指定して実行できるよ！