---
layout: post
title: 'Vue.jsのkeyとは？-Vue.js'
author: [Fujiya]
tags: ['key']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-20T05:14:33.126Z'
draft: false
excerpt: Vue.js Article
---

Vue.jsには`key`属性と呼ばれる特別な属性がありますが、何のためにあるのか分かりづらいと感じたことがあったので`key`属性の詳細についてサンプルコードを参考に解説していきます。

## 基本的な使い方
まずは、基本的な使い方。

```js:title=Vue.js
v-bind:key="何かしらの値" // Vueで扱っている変数などを用いる場合

key="文字列"              // そうでない場合
```

## key属性の役割
`key`属性の役割について。
[公式のAPIドキュメント](https://jp.vuejs.org/v2/api/#key)では以下のように説明されています。

> key 特別属性は、主に古いリストの代わりにノードの新しいリストを差分算出する VNode を識別するために Vue の仮想 DOM アルゴリズムに対するヒントとして使用されます。

最後の部分にもあるようにVueの処理に対するヒント、手助けをしているということになります。

ではどのように手助けをしているのか、`key`属性がない場合と`key`属性がある場合を比較していきます。

### key属性がない場合
公式では以下のように説明されています。

> キーがない場合、Vue は要素の移動を最小限に抑えるアルゴリズムを使用し、可能な限りその場で同じタイプの要素にパッチ適用/再利用しようとします。

言い換えると、可能な限り変更前の要素を再利用し、そこにデータや処理を適用するということになります。

以下ののコードでSwitchボタンを押すとlabelとinputが切り替わりますが、
要素自体は再利用されているのでinputに値を入力した状態で切り替えると値は保持されたままとなっています。

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
      switchType() {
        this.type = !this.type
      }
    }
  }) 
</script>
```

### key属性がある場合
公式では以下のように説明されています。

> キーがある場合は、キーの順序の変化に基づいて要素を並べ替え、
そして、もはや存在しないキーを持つ要素は常に削除/破棄されます。

つまりは、キーを監視してその状態に合わせて処理を行うということになります。

以下のコードは先ほどのコードのinputに`key`属性を割り当ててます。
このようにすることでSwitchボタンを押して切り替えると値はリセット（`v-if`で再レンダリングされる）されます。

```html:title=Vue.js
<div id="app">
  <template v-if="type">
    <label>type1</label>
    <input placeholder="type1" key="type1">
  </template>
  <template v-else>
    <label>type2</label>
    <input placeholder="type2" key="type2">
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
      switchType() {
        this.type = !this.type
      }
    }
  }) 
</script>
```

### コンポーネントやトランジション
`key`属性を与えることで要素やコンポーネントを適切に処理することができるようになります。

- コンポーネントのライフサイクルフックをトリガ
- トランジションのトリガ
<div class="ads"></div>

## v-if
`v-if`では上で示した例のように、切り替えた際に同じ位置に同じ要素がくる場合などに、制御する目的で使うことが出来ます。

```html:title=Vue.js
v-ifの使い方-Vue.js
<div id="app">
  <template v-if="type">
    <label>type1</label>
    <input placeholder="type1" key="type1">
  </template>
  <template v-else>
    <label>type2</label>
    <input placeholder="type2" key="type2">
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
      switchType() {
        this.type = !this.type
      }
    }
  }) 
</script>
```

## v-for
公式では`v-for`に可能な限り`key`属性を与えることが推奨されています。
リストレンダリングする際には同じ要素が繰り返されるので、もしデータに変更が加わった場合に望んだ動きをしない可能性があるからです。
<div class="ads"></div>

## 注意点

### 一意なキー
共通の親を持つ要素は、一意なキーを持っていなければない点です。もし、重複した場合には意図した動作を得られません。
例えば以下のコードの場合、二つの配列で`key`が重複しておりエラーが出ます。

```html:title=Vue.js
<div id="app">
  <ul>
    <li v-for="item in items" v-bind:key="item.id">
      <span>{{item.name}}</span>
    </li>
    <li v-for="item in items2" v-bind:key="item.id">
      <span>{{item.name}}</span>
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
      ],
      items2: [
        { id: 1, name: "peach", price: 200 },
        { id: 2, name: "lemon", price: 80 },
      ],
    },
  })
</script>
```

### v-forのインデックス
また、v-forではインデックスを取得することができますが、これを`key`属性に与えていた場合、データが削除された時にインデックスが変化するので正しく追跡することが出来ません。
[Vue.js: v-forで項目インデックスをkey属性にしていいのか](https://qiita.com/FumioNonaka/items/d1d9c9335116426a8316)という記事がとても参考になります。

### keyに与える値
`key`属性にはオブジェクトや配列のような値は用いず、文字列や数値を使うようにしましょう。
こちらは公式で言われていることでしたが、パフォーマンスやライフサイクルに影響するのでしょうか？

## まとめ

今回は`key`属性の役割についてまとめていきました。

- `key`はVueの処理を手助けする
- `key`がない場合、同じ要素を再利用される
- `key`がある場合、`key`に基づいて変更される
- 同じ要素を親に持つ場合`key`は一意なものにする
- v-forのインデックスを`key`に用いない
- `key`を正しく用いて効率よく扱っていきましょう。