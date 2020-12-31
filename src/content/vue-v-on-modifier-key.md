---
layout: post
title: 'v-on キー修飾子の使い方-Vue.js'
author: [Fujiya]
tags: ['v-on','修飾子','キー修飾子']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-09T05:13:22.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-on`ディレクティブの修飾子のうちキー修飾子の使い方をサンプルコードを参考に解説していきます。

## キー修飾子とは
`キー修飾子`はキーボードからのイベントを監視したい場合に用いることのできる修飾子です。基本の記述の仕方は以下の通りです。

```js:title=Vue.js
v-on:キーボードイベント.特定のキー="ハンドラ"
```

動くコードとその結果を見てみます。

```html:title=Vue.js
<div id="app">
  <input
    v-on:keydown.enter="func('down')"
    />
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods:{
      func(target){
        console.log(target)
      }
    }
  })
</script>
```

`input`タグにフォーカスした状態で`Enter`押すと以下のような結果になります。

```console:title=console
down
```

## キーボードイベントの種類
キーボードイベントには以下の種類があります。

|       修飾子      |                           内容                          |
|:-----------------:|:-------------------------------------------------------:|
|       shift       | Shiftキー                                               |
|   ctrl(control)   | Ctrlキー                                                |
|        alt        | Altキー                                                 |

### 各イベントの処理
それぞれのイベントの処理について詳しく確認してみます。

```html:title=Vue.js
<div id="app">
  <input
    v-on:keypress.enter="func('press')"
    v-on:keydown.enter="func('down')"
    v-on:keyup.enter="func('up')"
    />
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods:{
      func(target){
        console.log(target)
      }
    }
  })
</script>
```

`input`タグにフォーカスした状態で`Enter`押すと以下のような結果になります。

```console:title=console
down
press
up
```

上記からもわかるように処理される順番としては`down => press => up`となります。また、キーを長押しした場合には`down`と`press`が連続して処理されます。

```console:title=console
down
press
down
press
.
.
.
```

## キーの指定の仕方
監視するキーの指定の仕方には以下のような種類があります。

- エイリアスで指定
- [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)で公開されているものケバブケースで指定
- keyCodeで指定

### エイリアスで指定
`Vue.js`では一般的に使用されるキーコードのエイリアスを提供しています。

|       修飾子      |                           内容                          |
|:-----------------:|:-------------------------------------------------------:|
|       shift       | Shiftキー                                               |
|   ctrl(control)   | Ctrlキー                                                |
|        alt        | Altキー                                                 |
|        meta       | Macintosh コマンドキー（⌘） windows ウィンドウキー（⊞） |
| left,right,middle |                   マウスボタンの修飾子                  |
|       exact       |                  修飾子のパターンを制限                 |

### ケバブケースで指定
`Vue.js`では[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)で公開されているものケバブケースで指定することができます。

```html:title=Vue.js
<input v-on:keydown.page-down="func('down')"/>
```

確認する際に注意しておきたいのがノートパソコンなどでは指定したキーがなく、`ファンクションキー`など特定のキーと同時に押さないと入力されない点です。普段使わないキーなどは忘れがちなので気を付けておきたいです。

### keyCodeで指定
イベントに割り当てられている`keyCode`属性（`event.keyCode`で確認できる）を指定することができます。

```html:title=Vue.js
<input v-on:keydown.65="func('down')"/>
```

しかし公式でも言われているように非推奨となっています。

また、以下のコードで示すように`press`は`down`と`up`と違う動きをするので注意が必要です。

```html:title=Vue.js
<div id="app">
  <input
    v-on:keypress="func('press', $event)"
    v-on:keydown="func('down', $event)"
    v-on:keyup="func('up', $event)"/>
  <input
    v-on:keypress.65="call('press')"
    v-on:keydown.65="call('down')"
    v-on:keyup.65="call('up')"/>
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods:{
      func(target, event){
        console.log(target + ': ' + event.key + ' => ' + event.keyCode)
      },
      call(target){
        console.log(target + ' called')
      }
    }
  })
</script>
```

上記のコードで1つ目の`input`に適当なキーで入力すると、一部のキーではkeyCodeの結果が違ってくることがあります。

```console:title=console
down: a => 65
press: a => 97
up: a => 65
```

2つ目の`input`のkeyCodeに任意のキーを指定して、入力すると実行されないといった結果が得られます。
上記のコードで上の結果が得られたとき`a`を2つ目の`input`に入力すると以下のようになります。

```console:title=console
down called
up called
```

## その他特徴
特徴として以下のような点があります。

- 複数指定可能
- カスタムキーエイリアスを定義

### 複数指定可能
以下に示すように複数指定することができます。

```html:title=Vue.js
<div id="app">
  <input v-on:keydown.up.down.left.right="func('down')" />
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      func(target) {
        console.log(target)
      }
    }
  })
</script>
```

### カスタムキーエイリアスを定義
独自のエイリアスを定義できます。

```html:title=Vue.js
<div id="app">
  <input
    v-on:keypress.a="call('press')"
    v-on:keydown.a="call('down')"
    v-on:keyup.a="call('up')"/>
  <input
    v-on:keypress.b="call('press')"
    v-on:keydown.b="call('down')"
    v-on:keyup.b="call('up')"/>
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
  Vue.config.keyCodes = {
    a: 65,
    // 複数のコードを定義
    b: [66, 98],
  }
</script>
```

以下のようにキャメルケースは使えませんが、ダブルクォーテーションでケバブケースを使用することができます。

```html:title=Vue.js
Vue.config.keyCodes = {
  mediaPlayPause: 179, // 使えない
  "media-play-pause": 179,
}
```

## まとめ
今回は`キー修飾子`の基本的な使い方について解説しました。
他の修飾子については別の記事で解説していきたいと思います。


