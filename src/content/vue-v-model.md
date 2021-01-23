---
layout: post
title: 'v-modelの使い方-Vue.js'
author: [Fujiya]
tags: ['v-model','データバインディング']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-30T05:14:33.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-model`ディレクティブの基本的な使い方をサンプルコードを参考に解説していきます。

## v-modelの基本的な使い方
`v-modle`は`form`に関する要素（`input`や`textarea`など）にデータをバインドし、変更を監視するといった一連の動作を割り当てる（双方向バインディングを作成する）のに使われます。

```js:title=Vue.js
v-model="変数"
```

`v-on`と`v-bind`を用いても同じ動作を実現することができますが、複数ある場合には面倒で複雑になるのでこちらを利用することになると思います。

以下のコードでは`v-model`でdataの`text`を双方向バインディングできるようにしています。

```html:title=Vue.js
<div id="app">
  <input type="text" v-model="text" />
  <p>入力内容：{{text}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      text: "",
    },
  });
</script>
```

同じことを`v-on`と`v-bind`を使って実装すると以下のようになります。

```html:title=Vue.js
<div id="app">
  <input type="text" v-bind:value="text" v-on:input="changeText($event)" />
  <p>入力内容：{{text}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      text: "",
    },
    methods: {
      changeText(event) {
        this.text = event.target.value;
      },
    },
  });
</script>
```

`v-on`と`v-bind`についてはこちら
<div class="ads"></div>

## v-modelの修飾子
v-modelにも修飾子があり、用いることでイベントのタイミングやデータに変更を加えることができます。

| 修飾子 |                         内容                        |
|:------:|:---------------------------------------------------:|
| lazy   | `input`イベントの代わりに`chnage`イベントでデータを変更 |
| number | 文字列から数値に型変換したのちにデータを変更        |
| trim   | 空白を取り除いたのちにデータを変更                  |

### lazy
デフォルトでは各`input`イベント（※変換のあるものは変換決定後）でデータを変更しますが、`lazy`によって`change`イベントでデータを変更するようにできます。

`type="text"`だとEnterが押されたときやフォーカスが外れたとき（`textarea`はEnterで改行になる）、`raidio`や`checkbox`は要素が`:checked`になったときなどです。`change`イベントは[HTMLElement: change イベント](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/change_event)を参考に。

以下のコードでは入力後にEnterを押したり、フォーカスを外したりすると表示が変わります。

```html:title=Vue.js
<div id="app">
  <input type="text" v-model.lazy="text" />
  <p>入力内容：{{text}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      text: "",
    },
  });
</script>
```

### number
`input`は常に`value`を文字列で返します。数値として扱いたい場合には、`number`を付けることで自動的に型を変換してくれます。

以下のコードでは、`num1`では文字列として扱われ、表示されるのは入力の数字と1が横並び、`num2`では数値として扱われ、表示されるのは入力と1の計算結果となります。

```html:title=Vue.js
<div id="app">
  <div>
    <input type="number" v-model="num1" />
    <p>num1：{{num1 + 1}}</p> <!-- 文字列として扱われ、文字列のつなぎ合わせとなる -->
  </div>
  <div>
    <input type="number" v-model.number="num2" />
    <p>num2：{{num2 + 1}}</p> <!-- 数値として扱われ、入力+1の結果となる -->
  </div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      num1: null,
      num2: null,
    },
  });
</script>
```

### trim
入力されたデータから空白を取り除いてくれます。

以下のコードでは、余分な空白を持つ入力から余分を取り除いてくれます。

```html:title=Vue.js
<div id="app">
  <input type="text" v-model.trim="text" />
  <!-- Lorem     ipsum     dolor     sit     amet => Lorem ipsum dolor sit amet -->
  <p>{{text}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      text: "",
    },
  });
</script>
```

## 動的な値のバインディング
標準では`checkbox`は真偽値（Boolean）、`radio`や`select`は文字列と型が決まっています。しかし、決められた型以外をバインディングする方法も用意されています。

### checkbox
`checkbox`の場合はチェックされているとき、されていないとき、それぞれに`true-value`と`false-value`を用いて値をバインディングできます。

```html:title=Vue.js
<div id="app">
  <input type="checkbox" v-model="toggle" true-value="true-value" false-value="false-value">
  <p>{{toggle}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      toggle: "",
    },
  });
</script>
```

注意する点は、

- 初期の段階ではdataオプションで初期化された値が入る点
- ブラウザはフォームの送信の中にチェックされていないチェックボックスを含めない点

です。

初期で`true-value`か`false-value`のどちらかの値を表示したい場合には、`data`オプションで初期化する必要があります。

また、このフォームを送信するときにチェックされていない場合はデータが含まれないので、どちらかの値が確実に送信されるためには`radio`を使う必要があります

### radio
`radio`には`v-bind`を用いてバインディングすることができます。

以下のコードでは、初期で文字列を与えていますが、選択後には`number`型の値が入ります。

```html:title=Vue.js
<div id="app">
  <input type="radio" v-model="radio" v-bind:value="num">
  <p>{{num}}</p>
  <p>{{radio}}</p>
  <p>type: {{typeof radio}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      num: 11111,
      radio: "初期値"
    },
  });
</script>
```

### select
`select`にも`v-bind`でバインディングすることができます。

以下のコードでは、初期では文字列を与えていますが、選択肢を選ぶとそれぞれの値が入ります。

```html:title=Vue.js
<div id="app">
  <select v-model="select">
    <option v-bind:value="num">{{num}}</option>
    <option v-bind:value="object">{{object.x}},{{object.y}}</option>
    <option v-bind:value="boolean">{{boolean}}</option>
  </select>
  <p>{{select}}</p>
  <p>type: {{typeof select}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      num: 11111,
      object: {x:10, y: 20},
      boolean: true,
      select: "初期値"
    },
  });
</script>
```

`v-bind`はこちら
<div class="ads"></div>

## 複数選択
`checkbox`や`select`などを複数選択にしたい場合があると思います。そのようなときには以下のような仕様となります。

### checkbox
複数の`input`タグに設定したv-modelが配列となります。

注意する点は初期段階で配列でない場合は有効ではない点です。

```html:title=Vue.js
<div id="app">
  <input type="checkbox" v-model="check" value="apple" />
  <input type="checkbox" v-model="check" value="orange" />
  <input type="checkbox" v-model="check" value="peach" />
  <p>{{check}}</p>
  <p>type: {{typeof check}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      check: []
    },
  });
</script>
```

### select
`select`タグに設定したv-modelが配列となります。こちらは初期で配列でない場合でも大丈夫です。

`Ctrl`を押しながら複数選択することができます。

```html:title=Vue.js
<div id="app">
  <select v-model="select" multiple>
    <option value="apple">apple</option>
    <option value="orange">orange</option>
    <option value="peach">peach</option>
  </select>
  <p>{{select}}</p>
  <p>type: {{typeof select}}</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      select: "初期値"
    },
  });
</script>
```

## まとめ
今回は`v-model`ディレクティブの使い方についてまとめていきました。