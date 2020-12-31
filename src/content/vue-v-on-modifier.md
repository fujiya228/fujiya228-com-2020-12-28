---
layout: post
title: 'v-on 修飾子の使い方-Vue.js'
author: [Fujiya]
tags: ['v-on','修飾子']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-06T05:13:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-on`ディレクティブの`修飾子`の種類と基本的な使い方を解説していきます。

## v-onにおける修飾子とは
Vue.jsでは`v-on`を用いて要素のイベントに処理を割り当てを行います。

```js:title=Vue.js
v-on:イベント="イベントハンドラ"
```

詳しくはこちらの記事で解説しています。

これらには`.`でつないで様々な`修飾子`を指定することができます。

```js:title=Vue.js
v-on:イベント.修飾子="イベントハンドラ"
```

`修飾子`を付けることで様々な効果を得ることができます。`修飾子`にもいくつか種類があるので以下でひとつずつ解説しています。

## イベント修飾子
実際のアプリケーションではイベントハンドラ内で `event.preventDefault` や `event.stopPropagation` が必要になってくる思います。これらを自分で実装してもいいのですが、手間が増えてしまいます。そこでそれらをより簡単に実装するための修飾子が`イベント修飾子`です。基本の記述の仕方は以下の通りです。

```js:title=Vue.js
v-on:イベント.修飾子="ハンドラ"
```

| 修飾子  | 内容  |
|---------|------|
|   stop  | イベントの伝搬停止  event.stopPropagation()を呼ぶ |
| prevent | デフォルトの処理停止  event.preventDefault()を呼ぶ  |
| capture | キャプチャフェーズで実行  [EventTarget.addEventListener()](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)の設定を参照  |
|   self  | 要素がイベントの発生源の時のみ実行  |
|   once  | 一度のみ実行  [EventTarget.addEventListener()](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)の設定を参照  |
| passive | ハンドラが「event.preventDefault()を呼び出さない」ことを伝える  [EventTarget.addEventListener()](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)の設定を参照  |
|  native | コンポーネントのルートのイベントをハンドリング  詳しく別の記事で解説  |

イベント修飾子の詳細については別の記事で解説します。
一部の`修飾子`ではイベントの伝搬やキャプチャフェーズなどイベントの処理のされ方が重要になります。これについては別の記事で詳しく解説します。

## キー修飾子
`キー修飾子`はキーボードからのイベントを監視したい場合に用いることのできる修飾子です。基本の記述の仕方は以下の通りです。

```js:title=Vue.js
v-on:キーボードイベント.特定のキー="ハンドラ"
```

使用できるキーボードイベントには以下のものがあります。

| イベント | 内容                           |
|----------|--------------------------------|
| keypress | タイプしたときをハンドリング   |
|  keydown | 押されたときをハンドリング     |
|   keyup  | 押し終わったときをハンドリング |

`Vue.js`では一般的に使用されるキーコードのエイリアスを提供しています。

|     エイリアス     |              内容              |
|:------------------:|:------------------------------:|
|        enter       | エンターキー                   |
|         tab        | タブキー                       |
|       delete       | `Delete` と `Backspace` キーの両方 |
|         esc        | エスケープキー                 |
|        space       | スペースキー                   |
| up,down,left,right |            方向キー            |

詳細な動作やそのほかのキーの指定については別の記事で詳しく解説します。

## システム修飾子キー
`システム修飾子キー`は用いることで、同じイベントでも異なったイベントとして扱うことができるようになる修飾子です。基本の記述の仕方は以下の通りです。

```js:title=Vue.js
v-on:イベント.修飾子="ハンドラ"
```

使用できる修飾子には以下のものがあります。

|       修飾子      |                           内容                          |
|:-----------------:|:-------------------------------------------------------:|
|       shift       | `Shift`キー                                            |
|   ctrl(control)   | `Ctrl`キー                                             |
|        alt        | `Alt`キー                                              |
|        meta       | Macintosh コマンドキー（⌘） windows ウィンドウキー（⊞） |
| left,right,middle |                   マウスボタンの修飾子                  |
|       exact       |                  修飾子のパターンを制限                 |

異なったイベントとして扱えるので、同じ要素に対してイベントを重複して割り当てを行うことができます。

また、以下のように一つのイベントに対して複数割り当てることも可能です。

```js:title=Vue.js
v-on:click.ctrl.shift="call(2)"
```

詳細な動作や注意点については別の記事で詳しく解説します。

## その他特徴
他にも以下のような特徴があります。

### 修飾子は繋げることができる

```js:title=Vue.js
v-on:click.stop.prevent="func()"
```

ここで**注意**しなければならないのは、複数繋げた場合にそれらの`順序`にも意味があるという点です。

### ハンドラを指定せず、修飾子だけで使うこができる

```js:title=Vue.js
v-on:click.prevent
```

このようにすることでハンドラなしでデフォルトの処理を停止することができます。

## まとめ
今回は`v-on`に用いることのできる`修飾子`の種類と基本的な使い方について解説しました。
各修飾子については別の記事で詳しく解説していきたいと思います。