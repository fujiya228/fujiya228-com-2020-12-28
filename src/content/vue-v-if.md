---
layout: post
title: 'v-ifの使い方-Vue.js'
author: [Fujiya]
tags: ['v-if']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-03T05:13:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-if`ディレクティブの使い方をサンプルコードを参考に解説していきます。

## v-ifの基本的な使い方
扱っているデータの状態に応じて条件分岐し、表示を切り替えたいとき、`v-if`ディレクティブを使うことができます。
記述の形式は以下の通りです。

```js:title=Vue.js
v-if="変数"  v-if="条件式"
```

対象のブロックは、変数や条件式が真のときのみ描画されます。
実際に動くコードとその結果を見てみましょう。

```html:title=Vue.js
<div id="app">
  <div v-if="flag">描画される</div>
  <div v-if="!flag">描画されない</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      flag: true
    }
  })
</script>
```
```html:title=結果
<div id="app">
  <div>描画される</div>
  <!---->
</div>
```

変数が真ではない場合には上記のようにコメントアウトされます。

<div class="ads"></div>

### v-else
else文の役割をする`v-else`ディレクティブも存在します。
`v-if`の後に記述することができ、`v-if`が条件を満たさなかった場合に表示されます。

```html:title=Vue.js
<div id="app">
  <div v-if="flag">描画される</div>
  <div v-else>v-else1</div>
  <div v-if="flag2">描画されない</div>
  <div v-else>v-else2</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      flag: true,
      flag2: false
    }
  })
</script>
```
```html:title=結果
<div id="app">
  <div>描画される</div>
  <div>v-else2</div>
</div>
```

`v-else`がある場合には描画されなかった要素のコメントアウトの表示もなくなります。

### v-else-if
複数の条件を同時に使いたい場合には`v-else-if`ディレクティブが使えます。
こちらも`v-if`の後に記述することができ、直前の`v-if`や`v-else-if`が条件を満たさず、指定した条件を満たす場合に表示されます。

```html:title=Vue.js
<div id="app">
  <div v-if="flag > 0">flag は　正</div>
  <div v-else-if="flag < 0">flag は　負</div>
  <div v-else-if="flag === 0">flag は　0</div>
  <div v-else>flag は　数ではない</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      flag: 'apple'
    } 
  }) 
</script>
```
```html:title=結果
<div id="app">
  <div>flag は 数 ではない</div>
</div>
```

こちらも描画されなかった要素のコメントアウトの表示はなくなります。
<div class="ads"></div>

## templateタグ
複数を同時に切り替えたいとき、それぞれに`v-if`や`v-else-if`、`v-else`を付けるのは面倒です。

かといってわざわざ新しく要素でまとめては他との階層が分かれてしまったり、`ul`や`ol`のようにまとめられない（`li`のみしか入れられない）といった問題が発生します。

そんなときには`template`タグを使って解決することができます。

```html:title=Vue.js
<div id="app">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <template v-if="flag">
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </template>
    <template v-else>
      <li>7</li>
      <li>8</li>
      <li>9</li>
    </template>
  </ul>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      flag: false
    } 
  }) 
</script>
```
```html:title=結果
<div id="app">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</div>
```

上記のように`template`タグは描画されません。
また、こちらも描画されなかった要素のコメントアウトの表示はなくなります。

ちなみに、同じような働きをする`v-show`は`template`タグでは使えないので注意が必要です。

<div class="ads"></div>

## v-else, v-else-ifとkey
Vue は要素を可能な限り効率的に描画しようして、要素を再利用することがよくあるそうです。これが`v-if`などでも起こるのですが、これらには以下のような注意する点があります。

- 同じ要素の属性の状態が残る
- `transition`うまく動作しない

一つ目の例が以下です。

```html:title=Vue.js
<div id="app">
  <template v-if="type">
    <label>type1</label>
    <input placeholder="type1">
  </template>
  <template v-else>
    <label>type2</label>
    <input placeholder="type2">
  </template>
  <input type="button" @click="switchType()" value="Switch!">
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      type: true
    },
    methods: {
      switchType(){
        this.type = !this.type
      }
    }
  }) 
</script>
```

Switchボタンを押すと`label`と`input`が切り替わりますが、値を入力した状態で切り替えても値は保持されたままとなっています。もし値を保持したいのであれば問題ありませんが、そうでない場合には困った動作です。

これを解決する方法が`key`属性を与えてあげる方法です。ユニークな値を `key` 属性を追加することでVueがその`key`を追跡し再利用されなくなります。

`key`属性についてはこちら
<div class="ads"></div>

## v-ifとv-for
`v-for`と`v-if`を同じタグに対して用いることは推奨されていません。
というのも、`v-for`の方が`v-if`よりも評価される優先度が高いために、パフォーマンスの低下などのデメリットが生じるからです。

対策としては、以下のような方法があります。

- 配列の要素に対する場合、配列に対して算出プロパティを用いてフィルタリングを掛ける。
- 配列全体に対する場合、親要素（`ul` , `ol`）に対して`v-if`を用いる。

公式のスタイルガイドにて詳しく解説がありますのでそちらを参照してください。

[スタイルガイド](https://jp.vuejs.org/v2/style-guide/#v-for-%E3%81%A8%E4%B8%80%E7%B7%92%E3%81%AB-v-if-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%AE%E3%82%92%E9%81%BF%E3%81%91%E3%82%8B-%E5%BF%85%E9%A0%88)

## まとめ
今回は`v-if`の基本的な使い方を解説しました。
同様に条件によって表示を切り替える`v-show`ディレクティブというものがあるので、別の記事で解説したいと思います。