---
layout: post
title: 'pyenvをインストールする-Python'
author: [Fujiya]
tags: ['pyenv', 'インストール', 'install']
category: Python
image: 'img/taxonomy/python.png'
date: '2022-02-26T20:06:38'
draft: false
excerpt: Python Article
---


Pythonのバージョン管理ツールである`pyenv`のインストールの仕方をまとめていきます。

インストールの方法は大きく分けて以下の**２通り**の方法があります。

- パッケージマネージャーを用いる方法
- GitHubからクローンする方法 [pyenv/pyenv installation > Basic GitHub Checkout](https://github.com/pyenv/pyenv#basic-github-checkout)

今回は、2つ目のGitHubからクローンする方法をまとめておきます。

## GitHubからクローンしてpyenvをインストールする

### GitHubから~/.pyenvへクローン
```bash:title=command
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```
必要があれば以下のコマンドで、bash拡張機能をコンパイルしてください。`pyenv`の高速化が可能です。
```bash:title=command
cd ~/.pyenv && src/configure && make -C src
```

### pyenv用にshellの環境を構築する

自分の使っているshellの環境にあった項目の操作を実行してください。

#### Bash

```bash:title=Debian,Ubuntu,Mint
sed -Ei -e '/^([^#]|$)/ {a \
export PYENV_ROOT="$HOME/.pyenv"
a \
export PATH="$PYENV_ROOT/bin:$PATH"
a \
' -e ':a' -e '$!{n;ba};}' ~/.profile
echo 'eval "$(pyenv init --path)"' >>~/.profile

echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```
```bash:title=RedHat,Fedora,CentOS
sed -Ei -e '/^([^#]|$)/ {a \
export PYENV_ROOT="$HOME/.pyenv"
a \
export PATH="$PYENV_ROOT/bin:$PATH"
a \
' -e ':a' -e '$!{n;ba};}' ~/.bash_profile
echo 'eval "$(pyenv init --path)"' >> ~/.bash_profile

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init --path)"' >> ~/.profile

echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```
```bash:title=SUSE
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init --path)"' >> ~/.profile

echo 'if command -v pyenv >/dev/null; then eval "$(pyenv init -)"; fi' >> ~/.bashrc
```
```bash:title=MacOS
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init --path)"' >> ~/.profile
echo 'if [ -n "$PS1" -a -n "$BASH_VERSION" ]; then source ~/.bashrc; fi' >> ~/.profile

echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

#### Zsh

```bash:title=MacOS
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zprofile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zprofile
echo 'eval "$(pyenv init --path)"' >> ~/.zprofile

echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

```bash:title=他OS
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zprofile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zprofile
echo 'eval "$(pyenv init --path)"' >> ~/.zprofile

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init --path)"' >> ~/.profile

echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

### シェルを再起動して、PATHの変更を反映させる

通常、一度シェルを閉じてまた開き直すことで反映されます。

### Pythonのbuildの依存パッケージをインストール
[pyenv/pyenv wiki](https://github.com/pyenv/pyenv/wiki#suggested-build-environment)へ遷移し、それぞれのOS環境に合わせた依存パッケージをインストールしてください。

### pyenvが正しく設定されていることを確認する

`pyenv doctor`を使って、チェックを行います。
以下のコマンドでpyenv-doctorをインストールします。
```bash:title=command
git clone https://github.com/pyenv/pyenv-doctor.git "~/.pyenv/plugins/pyenv-doctor"
```

```bash:title=command
pyenv doctor
```

以下のように出ていれば利用可能です。
```bash:title=結果
・
・
・
Congratulations! You are ready to build pythons!
```

### 実行してバージョン確認してみる
```bash:title=command
pyenv -v
```

```bash:title=結果
pyenv 2.2.4-1-4-g1e79a522
```

### nodeをインストールする
```bash:title=command
pyenv install 14.18.0
```
