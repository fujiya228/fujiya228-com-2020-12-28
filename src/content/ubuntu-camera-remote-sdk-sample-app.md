---
layout: post
title: 'Ubuntu20.04でremote-camera-sdkを使ってRX0II(DSC-RX0M2)を動かす-Programming'
author: [Fujiya]
tags: ['remote-camera-sdk', 'RX0II','DSC-RX0M2', 'Ubuntu']
category: Programming
image: 'img/taxonomy/programming.png'
date: '2021-06-09T00:04:42'
draft: false
excerpt: Programming Article
---


2021-05-11にリリースされた「Camera Remote SDK Ver. 1.04.00」では以下のような変更がありました。

- DSC-RX0M2(Ver. 3.00以降)に対応。
- Linux® 64bit (x86)版をリリース。

*参考：[Camera Remote SDK](https://support.d-imaging.sony.co.jp/app/sdk/ja/index.html)*

ということで、Linuxとして`Ubuntu20.04`、カメラ`RX0II(DSC-RX0M2)`を動かしてみました。

## RX0II(DSC-RX0M2)の本体ソフトウェアアップデート

RX0II(DSC-RX0M2)でCamera Remote SDKを使う要件として`Ver. 3.00以降`があるので以下のリンク先の指示に従ってアップデートを行います。

[DSC-RX0M2本体ソフトウェアアップデート Ver. 3.00](https://support.d-imaging.sony.co.jp/www/cscs/firm/?mdl=DSC-RX0M2&area=jp&lang=jp)

**注意事項**

Ubuntuでは、以下のように言われアップデートができません。今回はおとなしくWindowsでアップデートしました。

> ご利用の端末からはシステムソフトウェアのダウンロードが行えません。WindowsまたはMac OSの動作するPCをご利用ください。

<div class="ads"></div>

## 環境のセットアップ

環境のセットアップのために以下を進めていきます。
- SDKのダウンロード
- カメラの設定
- PC環境の設定
- サンプルアプリのビルド

### SDKダウンロード

以下からSDKをダウンロードをします。

[ソフトウェア使用許諾契約書](https://support.d-imaging.sony.co.jp/app/sdk/licenseagreement_d/ja.html)

ダウンロード後は展開し適当な場所に配置しておきます。
今回はホームに`CrSDK_v1.04.00_20210511a_Linux64PC`を作成・展開して進めます。

```bash:title=Command
mkdir ~/CrSDK_v1.04.00_20210511a_Linux64PC
```

展開した中身には`RemoteSampleApp_IM_v1.04.00.pdf`というサンプルアプリを使うまでの流れが記載されているPDFがあるのでそちらに従っていきます。

<div class="ads"></div>

### カメラの設定

早速`0. Preparation`　＞　`Camera settings and connect to PC(/SBC).`から進めていきたいところですが、いきなり詰まりました。

いくら探しても`PC Remote Function`が見つかりません。
しばらく操作してわかったのですが`RX0II(DSC-RX0M2)`は、このPDFで示されているソフトウェアとは別のようで、
`カメラの設定`　＞　`セットアップ３`　＞　`USB接続`　→　PCリモートにすることで可能なようです。

逆にPDFより簡単になっているのでありがたい。

### PC環境の設定

引き続き`0. Preparation`の指示に従って準備を進めていきます。

**Installation of some necessary packages.**

必要なパッケージのインストール

```bash:title=Command
sudo apt install autoconf libtool libudev-dev gcc g++ make cmake unzip libxml2-dev
```

**USB setting**

USBバルクの設定変更。Ubuntuは以下のコマンド。

```bash:title=Command
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash usbcore.usbfs_memory_mb=150"
```

```bash:title=Command
sudo update-grub
```

**確認する**

以下のコマンドで設定ができたか確認します。
```bash:title=Command
cat /sys/module/usbcore/parameters/usbfs_memory_mb
```

PDFでは、出力結果が`150`になっていましたが、自分の環境では反映できていないのか`16`でした。（自分はそのまま進めて問題なかったです。）

### サンプルアプリのビルド

`1. Sample Application Build`に従って、サンプルアプリのビルドを行います。
最初に作成した作業ディレクトリ（`~/CrSDK_v1.04.00_20210511a_Linux64PC`）に移動します。（また、ダウンロードしたSDKのzipを展開していない方は、unzipコマンドで展開してください。

```bash:title=Command
cd ~/CrSDK_v1.04.00_20210511a_Linux64PC
```
```bash:title=Command
unzip [the package file]
```

以下のコマンドを順に実行します。

```bash:title=Command
mkdir build
```
```bash:title=Command
cd build
```
```bash:title=Command
cmake -DCMAKE_BUILD_TYPE=Release ..
```
```bash:title=Command
cmake --build .
```

ビルド後は`~/CrSDK_v1.04.00_20210511a_Linux64PC/build`に`RemoteCli`ができているはずです。

<div class="ads"></div>

## サンプルアプリでRX0II(DSC-RX0M2)を動かしてみる

準備が整ったはずなので実行してみましょう。

`カメラの設定`　＞　`セットアップ３`　＞　`USB接続`　→　PCリモート　になっていることを確認し、USBでPCに接続します。

接続後に`~/CrSDK_v1.04.00_20210511a_Linux64PC/build`に移動し以下のコマンドを実行しましょう。

```bash:title=Command
./RemoteCli 
```

カメラが接続されていれば、それらがリストとなって出力されているはずです。その中から自分の使用したいカメラの番号を指定します。（自分は1台だったので1を入力。)

```bash:title=Command
1
```

接続が完了すると使用可能な状態です。

以下のような番号と機能のリストが表示されるので、使いたい番号を入力して使いましょう！

```bash:title=Command
(s) Status display and camera switching 
(0) Connect / Disconnect 
(1) Shutter Release 
(2) Shutter Half Release in AF mode 
(3) Shutter Half and Full Release in AF mode 
(4) Continuous Shooting 
(5) Aperture 
(6) ISO 
(7) Shutter Speed 
(8) Live View 
(9) Live View Imege Quality 
(a) Position Key Setting 
(b) Exposure Program Mode 
(c) Still Capture Mode(Drive mode) 
(d) Focus Mode 
(e) Focus Area 
(11) FELock 
(12) AWBLock 
(13) AF Area Position(x,y) 
(14) Selected MediaFormat 
(15) Movie Rec Button 
(16) White Balance 
(17) Custom WB 
(18) Zoom Operation 
(x) Exit
```

<div class="ads"></div>

## まとめ
今回は、Ubuntu20.04でremote-camera-sdkを使ってRX0II(DSC-RX0M2)を動かしてみました。
時間があればアプリケーションの方もいじって使ってみたいと思います。