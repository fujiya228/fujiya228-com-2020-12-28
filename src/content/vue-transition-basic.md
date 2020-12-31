---
layout: post
title: 'トランジション(transition,transition-group)の使い方-Vue.js'
author: [Fujiya]
tags: ['transition','transiton-group','トランジション']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-06-12T05:14:33.126Z'
draft: false
excerpt: Vue.js Article
---

ここでは、`Vue.js`における`トランジション`についてサンプルコードを参考に解説していきます。

## トランジションとは
ボタンの切り替えやドロワーメニューの表示・非表示などアプリケーションの中で、トランジション（切り替え）効果（表示・非表示の際のトランジションやアニメーションなど）を使いたいと思うことがあると思います。

`Vue.js`ではそのような追加、更新、削除されたときにトランジション効果を適用するための方法を複数用意してくれています。

## 基本的な使い方

Vue.jsではトランジション効果を使うには主に2つの作業が必要です。

- トランジション効果を与えたい要素を指定する
- 選択した要素に与えたいトランジション効果をCSSで記述する

```html:title=Vue.js
<!-- 対象が単体の場合 -->
<transition>
  <トランジションの対象>
</transition>
<!-- 対象が複数の場合 -->
<transition-group>
  <トランジションの対象（複数）>
</transition-group>
```
CSSはVue.js標準のクラスまたはユーザーによるカスタムクラスをセレクタとして記述します。

以下のコードでは`transition`タグで要素を指定、`Vue.js標準のクラス`にトランジション効果を記述しています。

```html:title=Vue.js
<div id="app">
  <button @click="active = !active">切り替え</button>
  <!-- トランジション効果を与えたい要素を指定 ここから -->
  <transition>
    <div v-show="active">トランジションの対象</div>
  </transition>
  <!-- トランジション効果を与えたい要素を指定 ここまで -->
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      active: true,
    },
  });
</script>
<!-- トランジション効果をCSSで記述 -->
<style>
  .v-enter-active,
  .v-leave-active {
    transition: 0.5s;
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
</style>
```

## トランジション効果を与えたい要素を指定
トランジション効果を与えたい要素の指定の仕方には主に2通りあります。

対象の要素が単体の場合には`transition`タグ、複数のグループである場合には`transition-group`タグを用います。

先の例では、対象の要素が`div`タグ1つであったため、`transition`タグで囲んで指定しています。

## 選択した要素に与えたいトランジション効果をCSSで記述する

### トランジション用のクラス
記述するセレクタには6種類のクラスがあります。新しく要素が追加・表示されるときを`enter`、要素が削除・非表示されるときを`leave`といいます。

|     クラス     |                                                     内容                                                     |
|:--------------:|:------------------------------------------------------------------------------------------------------------:|
| v-enter        | enterの開始状態。要素が挿入される前に追加され、要素が挿入された後に削除される。                              |
| v-enter-active | enterの活性状態。要素が挿入される前に追加され、トランジション/アニメーションが終了すると削除される。         |
| v-enter-to     | enter の終了状態。要素が挿入された後に追加され、トランジション/アニメーションが終了すると削除される。        |
| v-leave        | leaveの開始状態。要素の削除が始まる前に追加され、開始直後に削除される。                                      |
| v-leave-active | leaveの活性状態。要素の削除が始まる前に追加され、トランジション/アニメーションが終了すると削除される。       |
| v-leave-to     | leaveの終了状態。要素の削除が始まった直後に追加され、トランジション/アニメーションが終了すると削除されます。 |

これらのクラスは適用されるタイミングになると、`transition`タグなどで`指定した要素`に追加でクラスが付与されます。

また、上記の表に示した各クラスの適用されているタイミングを図で表すと以下のようになります。（[公式](https://jp.vuejs.org/v2/guide/transitions.html#%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)に下の図のもととなった画像があります。）

```console:title=figure
                  Enter

    opacity: 0; ==========> opacity: 1;
        |                       |
      v-enter               v-enter-to
   |___________________________________|
                    |
              v-enter-active

============================================

                  Leave

    opacity: 1; ==========> opacity: 0;
        |                       |
      v-leave               v-leave-to
   |___________________________________|
                    |
              v-leave-active
```

### 独自のプレフィックスで複数のトランジション効果を指定する
異なったトランジション効果を複数指定したい場合があるかと思います。その場合には以下のような方法が使えます。

- 独自のセレクタと組み合わせる
- name属性を使って、独自のプレフィックスを付ける

#### 独自のセレクタと組み合わせる
以下のように標準のセレクタを独自のセレクタと組み合わせて、様々なパターンを実現することができます。

```html:title=Vue.js
<div id="app">
  <button @click="active = !active">acitve切り替え</button>
  <button @click="type = !type">type切り替え</button>
  <span>type : {{type}}</span>
  <transition>
    <div v-show="active" :class="{type: type}">トランジションの対象</div>
  </transition>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      active: true,
      type: true,
    },
  });
</script>
<style>
  .v-enter-active,
  .v-leave-active {
    transition: 3s;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .type.v-enter-active,
  .type.v-leave-active {
    transition: .3s;
  }

  .type.v-enter,
  .type.v-leave-to {
    opacity: 0;
  }
</style>
```

#### name属性を使う
先ほど説明した6つのクラスにはデフォルトで`v`というプレフィックスが付けられています。このプレフィックスは`transition`タグや`transition-group`タグに`name`属性を指定することで変更が可能です。

以下では`name`属性を指定し、プレフィックスを変更しています。

```html:title=Vue.js
<div id="app">
  <button @click="active = !active">切り替え</button>
  <transition name="sample">
    <div v-show="active">トランジションの対象</div>
  </transition>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      active: true,
    },
  });
</script>
<style>
  .sample-enter-active,
  .sample-leave-active {
    transition: 0.5s;
  }

  .sample-enter,
  .sample-leave-to {
    opacity: 0;
  }
</style>
```

## まとめ
今回はVue.jsの`トランジション`機能の基本的な使い方をサンプルコードを参考に解説していきました。