---
layout: post
title: 'v-bindの使い方-Vue.js'
author: [Fujiya]
tags: ['v-bind','データバインディング']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-24T05:14:33.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`v-bind`ディレクティブの基本的な使い方をサンプルコードを参考に解説していきます。

## v-bindの基本的な使い方
HTMLのタグ（要素）には、様々な`属性`を与えることが出来ます。`v-bind`はこの要素の`属性`へのデータバインディングに使われます。

```js:title=Vue.js
v-bind:属性名="値"
```

以下のコードは、`input`の`value`にdataの`buttonText`をバインディングしています。ボタンのテキストには`ボタン`と表示されます。

```html:title=Vue.js
<div id="app">
  <input type="button" v-bind:value="buttonText">
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      buttonText: 'ボタン'
    },
  })
</script>
```

## クラスやスタイルへのバインディング
`class`や`style`属性へのバインディングは少し違っていて、オブジェクトや配列を渡してバインディングします。

```js:title=Vue.js
v-bind:class="オブジェクト・配列"
v-bind:style="オブジェクト・配列"
```

### クラスへのバインディング
クラスをオブジェクトで渡すときは

```js:title=Vue.js
{ クラス名 : 真偽値 }
```

以下のコードでは`pタグ`の`class`へ`isAcrive`がtrueのとき`activeクラス`が有効となります。

```html:title=Vue.js
<div id="app">
  <p v-bind:class="{ active: isActive }">pタグ</p>
  <button @click="isActive = !isActive">切り替え</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      isActive: true
    },
  })
</script>
<style>
  .active{
    color: #ff8d3f;
  }
</style>
```

クラスを配列で渡すときは

```js:title=Vue.js
[ 変数やオブジェクト ]
```

以下のコードでは3つのクラスを渡しています。

```html:title=Vue.js
<div id="app">
  <p v-bind:class="[ class1, class2, class3 ]">pタグ</p>
  <button @click="isActive = !isActive">切り替え</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      isActive: true,
      class1: 'class1',
      class2: 'class2',
      class3: 'class3',
    },
  })
</script>
```

また、三項演算子を使いたい場合にも配列を用います。

```html:title=Vue.js
<p v-bind:class="[isActive ? 'active' : 'inactive']">pタグ</p>
```

`v-on`についてはこちら

### スタイルへのバインディング
スタイルをオブジェクトで渡すときは

```js:title=Vue.js
{ プロパティ : 値 }
```

プロパティについては`ケバブケース`のままだとエラーとなるので以下のように`キャメルケース`にしたり`文字列`にして対応します。

```html:title=Vue.js
<p v-bind:style="{backgroundColor: 'red'}">pタグ</p>

<p v-bind:style="{'background-color': 'red'}">pタグ</p>
```

スタイルを配列で渡すときは

```js:title=Vue.js
[スタイルのオブジェクト,・・・,・・・]
```

## オブジェクトを渡す
複数の属性にバインディングしたり、複数のクラスやスタイルをバインディングする場合には可読性が悪くなってしまいます。このようなときにはオブジェクトにまとめて渡すことができます。

### 複数属性

```html:title=Vue.js
<div id="app">
  <input v-bind="multiBind"/>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      isActive: true,
    },
    computed:{
      multiBind(){
        return {
          type: 'text',
          autcomplete: true,
          placeholder: 'input',
          require: true,
        }
      }
    }
  })
</script>
```

### 複数クラス

```html:title=Vue.js
<div id="app">
  <p v-bind:class="multiClass">pタグ</p>
  <button @click="isActive = !isActive">切り替え</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      isActive: true,
    },
    computed:{
      multiClass(){
        return {
          active: this.isActive,
          inactive: !this.isActive
        }
      }
    }
  })
</script>
<style>
  .active{
    color: #ff8d3f;
  }
  .inactive{
    color: blue
  }
</style>
```

### 複数スタイル

```html:title=Vue.js
<div id="app">
  <button @click="changeNum()">切り替え</button>
  <p v-bind:style="multiStyle">pタグ</p>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      num: 255,
    },
    methods:{
      changeNum(){
        this.num =  (this.num + 20) % 256
      }
    },
    computed:{
      multiStyle(){
        return {
          width: 100 + this.num + 'px',
          height: 100 + this.num + 'px',
          color: 'white',
          background: 'rgb('+ this.num + ', 100,' + (255-this.num) +')',
        }
      }
    }
  })
</script>
```

## 標準の指定と同時に使う
標準の指定と同時に使うことができます。idなど一つしか指定できないものは上書きされ、classなど複数指定できるものは共存します。

```html:title=Vue.js
   <p id="id_a" v-bind:id="'id_b'">pタグ</p>

=> <p id="id_b">pタグ</p>

   <p class="class_a" v-bind:class="'class_b'">pタグ</p>

=> <p class="class_a class_b">pタグ</p>
```


