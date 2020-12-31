---
layout: post
title: 'OpenCV.jsを使ってみる'
author: [Fujiya]
tags: ['OpenCV','OpenCV.js']
category: JavaScript
image: 'img/taxonomy/vuejs.png'
date: '2020-06-18T05:14:33.126Z'
draft: false
excerpt: JavaScript Article
---

OpenCVがJavaScriptでも使えるということで使ってみました。

今回は撮影しているものに対して以下の処理を行いました。

- グレースケール化
- 線画化
- 顔検出

[デモはこちら](https://fujiya228.github.io/open-cv-js_demo/demo/)

## 準備
まずはOpenCV.jsのソースコードの準備から
主に以下の二つの手段があります。

1. 公式リポジトリのコードをJavaScriptに変換する
2. 公式のものをダウンロードしてくる

1つ目の方法は公式の手順にしたがって準備することができます。
2つ目の方法は公式のドキュメントページで読み込まれているものをコピーしてくるという手法です。

## 公式リポジトリを変換する
[OpenCV: Build OpenCV.js](https://docs.opencv.org/3.4/d4/da1/tutorial_js_setup.html)　にビルドの手順が紹介されています。

今回は試しに使ってみるだけなので、簡単な説明のみ書いておきます。

必要なもの

- Python
- Node.js
- CMake
- Emscripten([インストール手順](https://emscripten.org/docs/getting_started/downloads.html))

### 手順

- 必要なものをインストール
- GitHubからソースコードのの入手
  `git clone https://github.com/opencv/opencv.git`
- ソースからOpenCV.jsをビルドする
  `python ./platforms/js/build_js.py ＜出力先のディレクトリ＞`

## 公式のドキュメントからコピーを取得
[ビルドの手順を示したページ](https://docs.opencv.org/3.4/d4/da1/tutorial_js_setup.html)の最初にも書かれていましたが、使用するだけならばOpencv.jsの使用チュートリアルから、ビルド済みコピーを取得することができます。

チュートリアル　=>　[OpenCV: OpenCV.js Tutorials](https://docs.opencv.org/master/d5/d10/tutorial_js_root.html)

ビルド済みソースコード　=>　[https://docs.opencv.org/master/opencv.js](https://docs.opencv.org/master/opencv.js)

上記のURLではmasterとなっていますが、他のバージョンも指定することができます。

ドキュメント一覧は[こちら](https://docs.opencv.org/)

### 注意点
リンク先を開いてダウロードする際の注意する点としては、ソースコードが大きいので、読み込まれるまで時間がかかる点です。ページにソースコードが表示される場合、読み込まれてからダウンロードしましょう。

## 使い方
基本的な使い方は非常に簡単で、scriptタグでの読み込みを行うだけです。k

```html:title=読み込み
<script src="opencv.js" type="text/javascript"></script>
```

読み込んだあとは`cv`オブジェクトを用いることでOpenCVのオブジェクトと機能をつかうことができます。

```js:title=例
let mat = cv.imread(imgElement);
```

### 注意点
cv.Matは自動でメモリを解放されないので、解放するにはcv.Matの`delete`メソッドを呼び出す必要があります。

```js:title=JavaScript
mat.delete();
```

## デモのソースコード
デモで使っているソースコードを紹介しておきます。

GitHubのリポジトリ [https://github.com/fujiya228/open-cv-js_demo](https://github.com/fujiya228/open-cv-js_demo)

### HTML

```html:title=index.html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenCV APP -Camera-</title>
  <style>
    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    h2 {
      text-align: center;
    }

    header {
      width: 100%;
      position: absolute;
      bottom: 24px;
    }

    .Buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      max-width: 800px;
      margin: 0 auto;
    }

    .wrapper {
      width: 100%;
      height: 100%;
    }

    button {
      display: block;
      width: 100px;
      margin: 4px 0;
    }

    button.on {
      background: #e53935;
      color: white;
    }

    video {
      width: 100%;
      display: none;
    }

    canvas {
      display: block;
      margin: 0 auto;
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  </style>
</head>

<body>
  <!-- control -->
  <header>
    <p id="error-message"></p>
    <h2 id="status">OpenCV.js is loading...</h2>
    <div class="Buttons">
      <button id="switchGrayScale" disabled>GrayScale</button>
      <button id="switchLineDrawing" disabled>LineDrawing</button>
      <button id="switchFaceDetection" disabled>FaceDetection</button>
    </div>
  </header>

  <!-- input -->
  <video id="video" autoplay="true" playsinline="true"></video>

  <!-- output -->
  <div class="wrapper">
    <canvas id="canvasOutput" style="-webkit-font-smoothing:none"></canvas>
  </div>

  <!-- script -->
  <script type="text/javascript">
    function onOpenCvReady() {
      document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    }
  </script>
  <script src="./utils.js" type="text/javascript"></script>
  <script src="./opencv.js" onload="onOpenCvReady();" type="text/javascript"></script>
  <script src="./index.js" type="text/javascript"></script>
</body>

</html>
```

utils.jsはOpenCV.jsと同様に公式からダウンロードできるもので、エラーやカメラのスタートなどを簡単に扱えます。

今回はスマホの背面カメラを使いたかったので、一部変更を加えて使いました。

128行目

```js:title=utils.js
'env': {width: {exact: 320}, height: {exact: 240}, facingMode: 'environment'}, // スマホなどの背面カメラ用
```

[utils.js の ソースコード](https://docs.opencv.org/master/utils.js)

### JavaScript

```js:title=index.js
const FPS = 30;
const GS = 'GrayScale';
const LD = 'LineDrawing';
const FD = 'FaceDetection';

const utils = new Utils('error-message');

let isStreaming = false;
let type;
const video = document.getElementById('video');
const switchGrayScale = document.getElementById('switchGrayScale');
const switchLineDrawing = document.getElementById('switchLineDrawing');
const switchFaceDetection = document.getElementById('switchFaceDetection');
const canvasOutput = document.getElementById('canvasOutput');
const canvasContext = canvasOutput.getContext('2d');
const count = 0;
// 共通
let cap;
let src;
let dst;
let gray;
// 線画用
let imgDilated;
let imgDiff;
// 顔検出用
let faces;
let classifier;
// 計測用
let begin;
let loss;
let delay;

const faceCascadeFile = 'haarcascade_frontalface_default.xml';
utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
  switchGrayScale.removeAttribute('disabled');
  switchLineDrawing.removeAttribute('disabled');
  switchFaceDetection.removeAttribute('disabled');
});
// イベントリスナの設定
switchGrayScale.addEventListener('click', { typeText: GS, handleEvent: clickSwitch });
switchLineDrawing.addEventListener('click', { typeText: LD, handleEvent: clickSwitch });
switchFaceDetection.addEventListener('click', { typeText: FD, handleEvent: clickSwitch });

// 切り替え
function clickSwitch() {
  if (isStreaming) {
    // 動いていたら一旦停止
    onVideoStopped();
    // 動いていたもののボタンならそのまま終了
    if (type === this.typeText) {
      return;
    }
  }

  // 違うボタンなら再始動
  type = this.typeText;
  utils.clearError();
  utils.startCamera('env', onVideoStarted, 'video');
}

// 前処理
function onVideoStarted(stream, self_video) {
  // console.log(stream) // utils.jsにあったから確認で
  // console.log(self_video) // utils.jsにあったから確認で
  isStreaming = true;

  video.width = video.videoWidth;
  video.height = video.videoHeight;
  cap = new cv.VideoCapture(video);
  src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  gray = new cv.Mat();
  switch (type) {
    case GS:
      // グレースケール
      switchGrayScale.innerText = 'Stop';
      switchGrayScale.classList.add('on');
      startDrawing(grayScale);
      break;
    case LD:
      // 線画
      switchLineDrawing.innerText = 'Stop';
      switchLineDrawing.classList.add('on');
      imgDilated = new cv.Mat();
      imgDiff = new cv.Mat();
      startDrawing(convertImageToLineDrawing);
      break;
    case FD:
      // 顔検出
      switchFaceDetection.innerText = 'Stop';
      switchFaceDetection.classList.add('on');
      faces = new cv.RectVector();
      classifier = new cv.CascadeClassifier();
      classifier.load('haarcascade_frontalface_default.xml');
      // console.log('model load ' + classifier.load('haarcascade_frontalface_default.xml'));
      startDrawing(faceDetection);
      break;
    default:
      console.log(type);
  }
}

// 後処理
function onVideoStopped() {
  // 描画していたものをクリア
  canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
  // カメラ停止
  utils.stopCamera();
  isStreaming = false;
  // destructorがないらしいので手動で削除
  src.delete();
  dst.delete();
  gray.delete();
  switch (type) {
    case GS:
      // グレースケール
      switchGrayScale.innerText = type;
      switchGrayScale.classList.remove('on');
      break;
    case LD:
      // 線画
      switchLineDrawing.innerText = type;
      switchLineDrawing.classList.remove('on');
      imgDiff.delete();
      imgDilated.delete();
      break;
    case FD:
      // 顔検出
      switchFaceDetection.innerText = type;
      switchFaceDetection.classList.remove('on');
      faces.delete();
      classifier.delete();
      break;
    default:
      console.log(type);
  }
}

// 実行
function startDrawing(callBack) {
  if (!isStreaming) {
    return;
  }

  begin = Date.now(); // 開始
  /* ====================================================== */
  cap.read(src); // 読み込み

  // 処理の呼び出し
  callBack();

  cv.imshow('canvasOutput', dst); // 出力
  /* ====================================================== */
  loss = Date.now() - begin; // 計算時間
  delay = (1000 / FPS) - loss; // 遅延計算
  setTimeout(startDrawing, delay, callBack); // 再帰
  // console.log(count++ + ' 処理時間：' + loss + ' ms') // 確認
}

// 処理の関数

// グレースケール
function grayScale() {
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
}

// 線画
function convertImageToLineDrawing() {
  const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5));

  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  cv.dilate(gray, imgDilated, kernel, new cv.Point(-1, 1), 1);

  cv.absdiff(imgDilated, gray, imgDiff);

  cv.bitwise_not(imgDiff, dst);
}

// 顔検出
function faceDetection() {
  src.copyTo(dst);
  cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
  classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
  for (let i = 0; i < faces.size(); ++i) {
    const face = faces.get(i);
    const point1 = new cv.Point(face.x, face.y);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const point2 = new cv.Point(face.x + face.width, face.y + face.height);
    cv.rectangle(dst, point1, point2, [103, 183, 179, 255]);
  }
}
```

画像処理の実行には再帰を用いて繰り返し行っています。

顔検出の際にはそれ用のモデルが必要となります。

今回は[公式のチュートリアル](https://docs.opencv.org/master/d2/d99/tutorial_js_face_detection.html)で使われていたものと同じものを使っています。

[モデル（haarcascade_frontalface_default.xml）](https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml)