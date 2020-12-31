---
layout: post
title: 'v-showの使い方-Vue.js'
author: [Fujiya]
tags: ['v-show']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-04T05:13:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-show`ディレクティブの使い方をサンプルコードを参考に解説していきます。

## v-showの基本的な使い方
扱っているデータの状態に応じて条件分岐し、表示を切り替えたいとき、`v-show`ディレクティブを使うことができました。
記述の形式は以下の通りです。

```js:title=Vue.js
v-show="変数"  v-show="条件式"
```
基本的な使い方は`v-if`と同じです。 `v-if`と違う点は描画の仕方です。`v-if`は表示されないときDOM自体が描画されませんが、`v-show`では常にDOMを描画し、表示・非表示の切り替えは`display`プロパティによって行われます。

実際に動くコードとその結果を見てみます。

```html:title=Vue.js
<div id="app">
  <div v-show="flag">表示される</div>
  <div v-show="!flag">表示されない</div>
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
  <div>表示される</div>
  <div style="display: none;">表示されない</div>
</div>
```

## templateタグ
複数を同時に切り替えたいときに`v-if`ではtemplateタグを使うことができました。しかし、`v-show`では使えないので注意が必要です。

## まとめ
今回は`v-show`の基本的な使い方を解説しました。
同様に条件によって表示を切り替える`v-if`ディレクティブというものがあるので、別の記事で解説したいと思います。

