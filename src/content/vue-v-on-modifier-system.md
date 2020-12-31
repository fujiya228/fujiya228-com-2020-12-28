---
layout: post
title: 'v-on システム修飾子キーの使い方-Vue.js'
author: [Fujiya]
tags: ['v-on','修飾子','キー修飾子']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-09T05:14:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-on`ディレクティブの`修飾子`のうち`システム修飾子キー`の使い方をサンプルコードを参考に解説していきます。

## システム修飾子キーとは
`システム修飾子キー`は用いることで、同じイベントでも異なったイベントとして扱うことができるようになる修飾子です。基本の記述の仕方は以下の通りです。

```js:title=Vue.js
v-on:イベント.修飾子="ハンドラ"
```

例として以下のコードでは二つ目のボタンは`Ctrl`ボタンを押しながらでないと動作しません。

```html:title=Vue.js
<div id="app">
  <button v-on:click="call(1)">click 1</button>
  <button v-on:click.ctrl="call(2)">click 2</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods:{
      call(target){
        console.log(target + ' called')
      }
    }
  })
</script>
```

## 修飾子の種類
修飾子には以下の種類があります。

|       修飾子      |                           内容                          |
|:-----------------:|:-------------------------------------------------------:|
|       shift       | Shiftキー                                               |
|   ctrl(control)   | Ctrlキー                                                |
|        alt        | Altキー                                                 |
|        meta       | Macintosh コマンドキー（⌘） windows ウィンドウキー（⊞） |
| left,right,middle |                   マウスボタンの修飾子                  |

## exact
`exact`は修飾子のパターンを制限するのに用いられます。

上記の`システム修飾子キー`などを使うと同じ要素に対してイベントを重複して割り当てを行うことができます。

```html:title=Vue.js
<div id="app">
  <button 
    v-on:click="call(1)"
    v-on:click.ctrl="call(2)"
    >
      click
  </button>
  <button 
    v-on:click.exact="call(1)"
    v-on:click.ctrl="call(2)"
    >
      click
  </button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods:{
      call(target){
        console.log(target + ' called')
      }
    }
  })
</script>
```

しかし、上記のコードの場合`Ctrl`ボタンを押しながら一つ目のボタンをクリックするとどちらのメソッドも実行されてしまいます。これは、`Ctrl`ボタンを押しながらでも`click`イベントには違いないということで実行されてしまいます。

そこで二つ目のボタンでは`click`イベントに`exact`を付けており、このようにすることで`click`以外何も押されていないときにのみ実行されるようにできます。

## まとめ
今回は`システム修飾子キー`の基本的な使い方について解説しました。組み合わせ方によって高度なイベントハンドリングが可能なのでぜひとも使いこなしたい機能です。
他の修飾子については別の記事で解説していきたいと思います。
