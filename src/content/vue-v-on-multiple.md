---
layout: post
title: 'v-on 複数の処理を呼び出す-Vue.js'
author: [Fujiya]
tags: ['v-on','複数']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-10T05:14:33.126Z'
draft: false
excerpt: Vue.js Article
---

`v-on`で1つのイベントに対して複数の処理を行いたい時があるかと思います。今回はその実装方法について解説します。

## 実装方法
まずは簡潔に実装方法の紹介から

### セミコロンで区切ってメソッドを複数指定
インラインメソッドハンドラとしてメソッドをセミコロン`;`で区切って指定します。

```html:title=Vue.js
<div id="app">
  <button v-on:click="func1(); func2()">click</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      num: 0
    },
    methods:{
      func1(){
        console.log('func1 called')
      },
      func2() {
        console.log('func2 called')
      }
    }
  })
</script>
```

### 複数のメソッドを内包するメソッドを定義し指定
複数のメソッドを内包するメソッドをハンドラとして指定します。

```html:title=Vue.js
<div id="app">
  <!-- メソッドイベントハンドラ -->
  <button v-on:click="func3">click</button>
  <!-- インラインメソッドハンドラ -->
  <button v-on:click="func3()">click</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      num: 0
    },
    methods:{
      func1(){
        console.log('func1 called')
      },
      func2() {
        console.log('func2 called')
      },
      func3() {
        this.func1()
        this.func2()
        console.log('func3 called')
      }
    }
  })
</script>
```

## 補足
`v-on`の基本的な使い方は以下の通りです。

```js:title=Vue.js
v-on:イベント="イベントハンドラ"
```

イベントハンドラには基本的にJavaScriptの式が記述できます。

インラインメソッドハンドラではJavaScript 式でメソッドを指定することができるので、それらを一行にまとめることで前者の方は実現されています。

### JavaScriptの式とは？

> 式とは、ある値へと決定される有効なコードの単位のことです。
[式と演算子 – JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)

イベントハンドラの指定の仕方には2通りありますが、後者の複数のメソッドを内包するメソッドを定義し指定する場合においてどちらを指定しても問題ないのでコーディングルールや好みにあわせるといいと思います。

`v-on`ディレクティブの詳しい使い方についてはこちら
<div class="ads"></div>

## 使い分け方
使い分けの基準ですが、指定したいイベントハンドラの出現頻度によると思います。その場限りならば前者で構わないと思いますが、複数回出現するならば後者のようにまとめた方が管理が楽だと思います。

