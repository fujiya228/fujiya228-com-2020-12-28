---
layout: post
title: 'nodenvをインストールする-Node.js'
author: [Fujiya]
tags: ['nodenv', 'インストール', 'install']
category: Nodejs
image: 'img/taxonomy/nodejs.png'
date: '2021-05-30T00:08:15'
draft: false
excerpt: Node.js Article
---


Node.jsのバージョン管理ツールである`nodenv`のインストールの仕方をまとめていきます。

インストールの方法は大きく分けて以下の**２通り**の方法があります。

- パッケージマネージャーを用いる方法
- GitHubからクローンする方法 [nodenv/nodenv installation](https://github.com/nodenv/nodenv#installation)

今回は、2つ目のGitHubからクローンする方法をまとめておきます。

## GitHubからクローンしてnodenvをインストールする

### GitHubから~/.nodenvへクローン
```bash:title=command
git clone https://github.com/nodenv/nodenv.git ~/.nodenv
```
必要があれば以下のコマンドで、bash拡張機能をコンパイルしてください。`nodenv`の高速化が可能です。
```bash:title=command
cd ~/.nodenv && src/configure && make -C src
```

### nodenvのパスを通す

以下にあるコマンドから自分の使っている環境（シェル）にあったものを実行し、`nodenv`のパスを通します。

```bash:title=bash
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bash_profile
```
```bash:title=Ubuntu Desktop
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bashrc
```
```bash:title=Zsh
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.zshrc
```
```bash:title=Fish shell
set -Ux fish_user_paths $HOME/.nodenv/bin $fish_user_paths
```

### nodenv shimsのパスを通す

以下にあるコマンドから自分の使っている環境（シェル）にあったものを実行し、`nodenv shims`のパスを通します。

```bash:title=bash
echo 'export PATH="$HOME/.nodenv/shims:$PATH"' >> ~/.bash_profile
```
```bash:title=Ubuntu Desktop
echo 'export PATH="$HOME/.nodenv/shims:$PATH"' >> ~/.bashrc
```
```bash:title=Zsh
echo 'export PATH="$HOME/.nodenv/shims:$PATH"' >> ~/.zshrc
```
```bash:title=Fish shell
set -Ux fish_user_paths $HOME/.nodenv/shims $fish_user_paths
```

### シェルにnodenvを設定する
```bash:title=command
~/.nodenv/bin/nodenv init
```

### シェルを再起動して、PATHの変更を反映させる

通常、一度シェルを閉じてまた開き直すことで反映されます。

### node-buildをインストール
[node-build](https://github.com/nodenv/node-build#readme)は、`nodenv install` コマンドを提供するnodenvのプラグインです。いくつかインストール方法がありますが、今回はnodenvのプラグインへインストールします。

```bash:title=command
mkdir -p $HOME/.nodenv/plugins
git clone https://github.com/nodenv/node-build.git $HOME/.nodenv/plugins/node-build
```

### nodenvが正しく設定されていることを確認する
以下のコマンドで`nodenv-doctor`を使って、チェックを行ってくれます。
```bash:title=command
curl -fsSL https://github.com/nodenv/nodenv-installer/raw/master/bin/nodenv-doctor | bash
```

```bash:title=結果
Checking for `nodenv` in PATH: /Users/<username>/.nodenv/bin/nodenv
Checking for `nodenv shims` in PATH: OK
Checking `nodenv install` support: /Users/<username>/.nodenv/plugins/node-build/bin/nodenv-install (node-build 4.9.64)
Counting installed Node versions: none
  There aren't any Node versions installed under `/Users/fujiya/.nodenv/versions'.
  You can install Node versions like so: nodenv install 2.2.4
Auditing installed plugins: OK
```

### 実行してバージョン確認してみる
```bash:title=command
nodenv -v
```

### nodeをインストールする
```bash:title=command
nodenv install 14.18.0
```

## おまけ： nodenv-installer

[nodenv-installer](https://github.com/nodenv/nodenv-installer#nodenv-installer)を用いることで、自動的に`nodenv`,`node-build`をインストールすることができます。
下記のコマンドのあと、nodenvのパスを通すなど前述の設定・確認を行ってください。

```bash:title=with curl
curl -fsSL https://raw.githubusercontent.com/nodenv/nodenv-installer/master/bin/nodenv-installer | bash
```
or
```bash:title=with wget
wget -q https://raw.githubusercontent.com/nodenv/nodenv-installer/master/bin/nodenv-doctor -O- | bash
```