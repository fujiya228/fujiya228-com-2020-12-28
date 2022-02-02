---
layout: post
title: 'rbenvをインストールする-Ruby'
author: [Fujiya]
tags: ['rbenv', 'インストール', 'install']
category: Ruby
image: 'img/taxonomy/ruby.png'
date: '2021-05-16T20:06:44'
draft: false
excerpt: Ruby Article
---


Rubyのバージョン管理ツールである`rbenv`のインストールの仕方をまとめていきます。

**注意事項**
> rbenvはRVMと互換性がありません。rbenvをインストールする前に、必ずRVMを完全にアンインストールし、シェル初期化ファイルからRVMへの参照を削除してください。

参考：*[rbenv/rbenv](https://github.com/rbenv/rbenv#installation)*

インストールの方法は大きく分けて以下の**２通り**の方法があります。

- パッケージマネージャーを用いる方法
- GitHubからクローンする方法

今回は、2つ目のGitHubからクローンする方法をまとめておきます。

## GitHubからクローンしてrbenvをインストールする

### GitHubから~/.rbenvへクローン
```bash:title=command
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```
必要があれば以下のコマンドで、bash拡張機能をコンパイルしてください。`rbenv`の高速化が可能です。
```bash:title=command
cd ~/.rbenv && src/configure && make -C src
```

### rbenvのパスを通す

以下にあるコマンドから自分の使っている環境（シェル）にあったものを実行し、`rbenv`のパスを通します。

```bash:title=bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
```
```bash:title=Ubuntu Desktop
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.profile
```
```bash:title=Zsh
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
```
```bash:title=Fish shell
set -Ux fish_user_paths $HOME/.rbenv/bin $fish_user_paths
```

### rbenv shimsのパスを通す

以下にあるコマンドから自分の使っている環境（シェル）にあったものを実行し、`rbenv shims`のパスを通します。

```bash:title=bash
echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.bash_profile
```
```bash:title=Ubuntu Desktop
echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.bashrc
```
```bash:title=Zsh
echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.zshrc
```
```bash:title=Fish shell
set -Ux fish_user_paths $HOME/.rbenv/shims $fish_user_paths
```

### シェルにrbenvを設定する
```bash:title=command
~/.rbenv/bin/rbenv init
```

### シェルを再起動して、PATHの変更を反映させる

通常、一度シェルを閉じてまた開き直すことで反映されます。

### rbenvが正しく設定されていることを確認する
以下のコマンドで`rbenv-doctor`を使って、チェックを行ってくれます。
```bash:title=command
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
```

### ruby-buildをインストール
[ruby-build](https://github.com/rbenv/ruby-build#readme)は、`rbenv install` コマンドを提供するrbenvのプラグインです。いくつかインストール方法がありますが、今回はrbenvのプラグインへインストールします。

ruby-buildには必要なライブラリがあるので、[rbenv/ruby-build](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment)を参考にインストールしておいてください。

```bash:title=command
mkdir -p "$(rbenv root)"/plugins
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

### 実行してバージョン確認してみる
```bash:title=command
rbenv -v
```

## おまけ： rbenv-installer

[rbenv-installer](https://github.com/rbenv/rbenv-installer#rbenv-installer)を用いることで、自動的に`rbenv`,`ruby-build`をインストールすることができます。
下記のコマンドのあと、rbenvのパスを通すなど前述の設定・確認を行ってください。

```bash:title=bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
```