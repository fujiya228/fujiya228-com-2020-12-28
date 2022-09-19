---
layout: post
title: 'v-forの使い方-Vue.js'
author: [Fujiya]
tags: ['v-for']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2019-11-12T05:13:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-for`ディレクティブの基本的な使い方をサンプルコードを参考に解説していきます。

## v-forの基本的な使い方
配列など複数のデータを繰り返し表示させたいとき、`v-for`ディレクティブを使うことができます。
記述の形式としては以下のような特別な形式を使います。

```js:title=Vue.js
 v-for="要素名 in 配列"
```

実際に動くコードとその結果を見てみます。

```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="item in items">
      {{item.name}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      items: [
        { id: 1, name: "apple", price: 150 },
        { id: 2, name: "orage", price: 120 },
        { id: 3, name: "peach", price: 200 },
        { id: 4, name: "lemon", price: 80 },
      ],
    }
  })
</script>
```

```html:title=結果
<div id="app">
  <ul>
    <li>apple</li>
    <li>orage</li>
    <li>peach</li>
    <li>lemon</li>
  </ul>
</div>
```

itemsに定義した中身を繰り返し表示できていることがわかります。
先ほど`v-for="要素名 in 配列"`と記述すると言いましたが、`in`の代わりに`of`を用いることもできます。

### indexの設定
要素に`インデックス`を付けたい場合、以下のようにすることで可能です。
インデックスは0から始まります。

```js:title=Vue.js
  v-for="(要素名,インデックス名) in 配列"
```

```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="(item,index) in items">
      {{index}}-{{item.name}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
  el: "#app",
    data: {
      items: [
        { id: 1, name: "apple", price: 150 },
        { id: 2, name: "orage", price: 120 },
        { id: 3, name: "peach", price: 200 },
        { id: 4, name: "lemon", price: 80 },
      ],
    }
  })
</script>
```
```html:title=結果
<div id="app">
  <ul>
    <li>0-apple</li>
    <li>1-orage</li>
    <li>2-peach</li>
    <li>3-lemon</li>
  </ul>
</div>
```

### keyの設定
リストの内容が単純な場合や意図的な場合を除いて、v-forにはkey属性を与えることが推奨されています。これは、ユーザーの操作などで要素の状態が変化したときに、どの要素が変化したのかを追跡できるようにするためです。

```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="item in items" v-bind:key="item.id">
      {{item.name}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      items: [
        { id: 1, name: "apple", price: 150 },
        { id: 2, name: "orage", price: 120 },
        { id: 3, name: "peach", price: 200 },
        { id: 4, name: "lemon", price: 80 },
      ],
    }
  })
</script>
```

適切に追跡してもらうためにも一意（ユニーク）な`key`属性を与えるようにしましょう。

`key`属性についてはこちら
<div class="ads"></div>

## objectや文字列などに対するv-for
`v-for`は配列だけでなくobjectや文字列などに対しても使うことができます。

### object

```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="value in fruit">
      {{value}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      fruit:{
        name: "apple",
        num: 200,
        price: 150,
      },
    }
  })
</script>
```
```html:title=結果
<div id="app">
  <ul>
    <li>apple</li>
    <li>200</li>
    <li>150</li>
  </ul>
</div>
```

今回はfruitというオブジェクトを定義して`v-for`に使用しました。各プロパティが表示されていることが分かります。

objectでも`インデックス`を付けることができ、さらに`key`も取得できます。

```js:title=Vue.js
v-for="(要素名,要素のキー,インデックス名) in 配列"
```
```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="(value, key, index) in fruit">
      {{index}}-{{key}}:{{value}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      fruit: {
        name: "apple",
        num: 200,
        price: 150,
      },
    }
  })
</script>
```
```html:title=結果
<div id="app">
  <ul>
    <li>0-name:apple</li>
    <li>1-num:200</li>
    <li>2-price:150</li>
  </ul>
</div>
```

### 文字列
```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="value in string">
      {{value}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      string: 'Fujiya',
    }
  })
</script>
```
```html:title=結果
<div id="app">
  <ul>
    <li>F</li>
    <li>u</li>
    <li>j</li>
    <li>i</li>
    <li>y</li>
    <li>a</li>
  </ul>
</div>
```
一文字ずつ出力されます。

### 整数値
```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="n in 5">
      {{n}}
    </li>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app"
  })
</script>
```
```html:title=結果
<div id="app">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</div>
```
1から順番に出力されます。

<div class="ads"></div>

### v-forとv-if
`v-for`と`v-if`を同じタグに対して用いることは推奨されていません。
というのも、`v-for`の方が`v-if`よりも評価される優先度が高いために、パフォーマンスの低下などのデメリットが生じるからです。
対策としては、以下のような方法があります。

- 配列の要素に対する場合、配列に対して算出プロパティを用いてフィルタリングを掛ける。
- 配列全体に対する場合、親要素（`ul` , `ol`）に対して`v-if`を用いる。

公式のスタイルガイドにて詳しく解説がありますのでそちらを参照してください。

[スタイルガイド](https://jp.vuejs.org/v2/style-guide/#v-for-%E3%81%A8%E4%B8%80%E7%B7%92%E3%81%AB-v-if-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%AE%E3%82%92%E9%81%BF%E3%81%91%E3%82%8B-%E5%BF%85%E9%A0%88)

## まとめ
今回は`v-for`の基本的な使い方を解説しました。
`key`や`filter`など気を付ける点がいくつかあるので、別の記事で解説したいと思います。