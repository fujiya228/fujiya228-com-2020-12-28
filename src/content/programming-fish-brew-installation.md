---
layout: post
title: 'fish環境でbrew(Homebrew)をインストールする-Programming'
author: [Fujiya]
tags: ['fish', 'brew', 'Homebrew', 'インストール', 'install']
category: Programming
image: 'img/taxonomy/programming.png'
date: '2022-01-06T00:08:15'
draft: false
excerpt: Programming Article
---

fish環境で`Homebrew(brew)`をインストールする方法をまとめます。

fish環境では`Homebrew(brew)`の[公式](https://brew.sh/index_ja)の通りにはインストールできません。
fish環境でも`Homebrew(brew)`をインストールできる手順をまとめました。

※fishの環境構築は、別を参考にしてください。

## インストール手順

1. インストールコマンド実行
2. HomebrewのPATHを通すための準備
3. シェルを再起動してバージョン確認

### 1. インストールコマンド実行

以下のコマンドでインストール

```bash:title=command
url -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash
```

### 2. HomebrewのPATHを通すための準備

`~/.config/fish/config.fish` にPATHを通すためのコマンドを追加
fish起動時に実行されます。

```bash:title=config.fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    # ・
    # ・（他にコマンドがあればここに記述されているはず）
    # ・
    eval (/opt/homebrew/bin/brew shellenv) # <= これを追加
end
```

### 3. シェルを再起動してバージョン確認

シェルを再起動して以下のコマンドでHomebrewが使えることを確認します。

```bash:title=command
brwe -v
```

```bash:title=結果
Homebrew 3.3.9
Homebrew/homebrew-core (git revision 9e894306ad4; last commit 2022-01-03)
```

インストールはここまでです！
