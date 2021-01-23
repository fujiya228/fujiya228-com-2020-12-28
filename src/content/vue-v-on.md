---
layout: post
title: 'v-onの使い方-Vue.js'
author: [Fujiya]
tags: ['v-on']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-06T05:13:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-on`ディレクティブの使い方をサンプルコードを参考に解説していきます。

## v-onの基本的な使い方
ある要素をクリックしたときに特定の処理を行いたい場合、その要素のイベントに処理を割り当てておく必要があります。

Vue.jsではその作業を`v-on`ディレクティブによって行います。（JavaScriptではDOM APIの[addEventListener](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)、[removeEventListener](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/removeEventListener)を使います。）

```js:title=Vue.js
v-on:イベント="イベントハンドラ"
```

```html:title=Vue.js
<div id="app">
  <button v-on:click="count++">count++</button>
  <p>Count: {{ count }}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      count: 0
    }
  })
</script>
```

イベントハンドラ（実行する内容）には`JavaScriptの式`を記述し、指定したイベントが起こった際にその内容を実行できます。

## 指定可能なイベント
v-onディレクティブで指定可能なイベントは実行されているブラウザがサポートしているものすべてとなります。サポート状況は[Can I use](https://caniuse.com/)や[イベントリファレンス | MDN](https://developer.mozilla.org/ja/docs/Web/Events)を参考にしてみてください。

## イベントハンドラ
イベントハンドラには`JavaScriptの式`を記述できましたが、`式`だけでは複雑な処理が実現できないので、代わりにメソッドを指定することができます。指定の仕方には`メソッドイベントハンドラ`と`インラインメソッドハンドラ`の2種類があります。

### メソッドイベントハンドラ
methodsオプションに指定した`メソッドの名前`を指定して呼び出す方法です。

```html:title=Vue.js
<div id="app">
  <button v-on:click="twiceNum">二倍！</button>
  <p>Count: {{ count }}</p>
  <p>Number: {{ num }}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      count: 0,
      num: 1
    },
    methods: {
      twiceNum (event) {
        this.count++
        this.num *= 2
        if(event) console.log(event)
      }
    }
  })
</script>
```
### インラインメソッドハンドラ
メソッド名ではなく`JavaScript 式`として指定する方法です。

```html:title=Vue.js
<div id="app">
  <button v-on:click="twiceNum($event)">二倍！</button><!-- eventは$eventで渡す-->
  <p>Count: {{ count }}</p>
  <p>Number: {{ num }}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      count: 0,
      num: 1
    },
    methods: {
      twiceNum(event) {
        this.count++
        this.num *= 2
        if (event) console.log(event)
      }
    }
  })
</script>
```
### 2つの違いについて
主な違いとしては以下のような点があります。

- `()`があるかないか
- `メソッドイベントハンドラ`ではデフォルトでネイティブのeventを渡せる
- `インラインメソッドハンドラ`では`$event`変数を用いてネイティブのeventを渡せる
- 渡しているもの（関数への参照か、JavaScriptの式か）

個人的には以下の理由から`()`を付けています。

- `()`があった方が見やすい（ハイライトされ、変数と見間違えないなど）
- 引数を与えたくなったときに渡しやすい

あくまで個人的であり、一般のルールやパフォーマンス的な違いについては調査できていないので今後行っていきたいと思います。
<div class="ads"></div>

## v-onの応用的な使い方

### 省略形
`v-on`は`@`と記述して省略することができます。

```html:title=Vue.js
<button v-on:click="func()"></button>

<button @:click="func()"></button>
```
**注意する点**はサーバー側において、他の言語でレンダリングする際にはエラーとなる可能性があるということです。（レンダリングする言語において`@`が他の意味を表したりする）

### オブジェクト構文
以下のようにオブジェクトを渡すことができます。

```html:title=Vue.js
<div id="app">
  <button v-on="{ click: twiceNum, mouseleave: reset }">二倍！</button>
  <p>Count: {{ count }}</p>
  <p>Number: {{ num }}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      count: 0,
      num: 1,
    },
    methods: {
      twiceNum () {
        this.count++
        this.num *= 2
      },
      reset () {
        this.count = 0
        this.num = 1
      }
    }
  })
</script>
```

複数の要素に同じような割り当てをしたい場合には以下のようにすることができます。

```html:title=Vue.js
<div id="app">
  <button v-on="eventObj">button 1</button>
  <p>Count: {{ count }}</p>
  <p>Number: {{ num }}</p>
  <button v-on="eventObj">button 2</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      count: 0,
      num: 1,
      eventObj: {}
    },
    methods: {
      twiceNum () {
        this.count++
        this.num *= 2
      },
      reset () {
        this.count = 0
        this.num = 1
      }
    },
    created () {
      this.eventObj = {
        click: this.twiceNum,
        mouseleave: this.reset
      }
    }
  })
</script>
```

### 動的イベント
バージョン 2.6.0 から、角括弧で囲むことで JavaScript 式をディレクティブの引数に使うこともできるようになり、`v-on`でも適用されています。
使ってみたところ`[]`内の文字列はすべて小文字として扱われているしまっているようなのでキャメルケースやパスカルケースは使えないようでした。

```html:title=Vue.js
<div id="app">
  <button v-on:[dynamic]="twiceNum">click</button>
  <p>Count: {{ count }}</p>
  <p>Number: {{ num }}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      count: 0,
      num: 1,
      dynamic: 'click'
    },
    methods: {
      twiceNum () {
        this.count++
        this.num *= 2
        this.dynamic = this.dynamic === 'click' ? 'mouseleave' : 'click'
      }
    }
  })
</script>
```

### 修飾子
`v-on`では様々な修飾子を使うことができます。種類が多いのでこちらは別の記事で解説していきます。

## まとめ
今回は`v-on`の基本的な使い方と少し応用的な使い方を解説しました。
修飾子については別の記事で解説していきたいと思います。