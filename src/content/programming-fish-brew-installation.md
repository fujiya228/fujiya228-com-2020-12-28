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

以下では、公式の方法がなぜインストールできなかったか調査した結果をまとめていきます。

## 公式がなぜインストールできなかったか

### Homebrewの公式をみる

[Homebrew公式サイト](https://brew.sh/index_ja)
インストール用のコマンドとして以下を指定されています。

```bash:title=command
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

しかし、これだと実行できません。
以下のようなエラーが出ます。

```bash:title=エラー
fish: $(...) is not supported. In fish, please use '(curl)'.
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### エラーが出る理由

fishは`$(...)`をサポートしていないようです。
fishはBashやzshのようにPOSIX互換ではありません。そのため以下のような差分があります。

- 標準エラー出力のリダイレクトは^を使う
- 変数はNAME=hogeではなくset NAME hogeを使う
- 終了ステータスは$?ではなく$statusを使う
- コマンド置換はcommandや$(command)ではなく(command)を使う

### エラーを出さずにインストールしたい

実行した以下のコマンドを見てみます。

```bash:title=command
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

このコマンドの目的は
以下のスクリプトを実行すること

```bash:title=command
https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh
```

実行するために パイプラインでbashにつなぎます。

```bash:title=command
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash
```

これでインストールができるようになりました。

### インストール後

インストールが終わると以下のようにPATHを通すように指示されます。

```bash:title=指示
==> Next steps:
- Run these two commands in your terminal to add Homebrew to your PATH:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/fujiya/.profile
    eval "$(/opt/homebrew/bin/brew shellenv)"
- Run brew help to get started
- Further documentation:
    https://docs.brew.sh
```

つまり以下の内容コマンドの内容を実行すればbrewへのPATHが通るようになります。（eval: 指定した文字列を評価後に連結して、現在のシェルに実行させる）

```bash:title=command
/opt/homebrew/bin/brew shellenv
```

内容は以下

```bash:title=内容
set -gx HOMEBREW_PREFIX "/opt/homebrew";
set -gx HOMEBREW_CELLAR "/opt/homebrew/Cellar";
set -gx HOMEBREW_REPOSITORY "/opt/homebrew";
set -q PATH; or set PATH ''; set -gx PATH "/opt/homebrew/bin" "/opt/homebrew/sbin" $PATH;
set -q MANPATH; or set MANPATH ''; set -gx MANPATH "/opt/homebrew/share/man" $MANPATH;
set -q INFOPATH; or set INFOPATH ''; set -gx INFOPATH "/opt/homebrew/share/info" $INFOPATH;
```

fishを起動するたびにパスを通し直すのは大変なので、fishのconfigに記述して起動時に実行するようにします。
今回も$が使えないことには注意しておきます

`~/.config/fish/config.fish`に以下を実行するように追記する

```bash:title=command
eval (/opt/homebrew/bin/brew shellenv)
```
