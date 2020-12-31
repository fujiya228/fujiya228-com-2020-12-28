---
layout: post
title: 'v-on 省略記法と注意点-Vue.js'
author: [Fujiya]
tags: ['v-on','省略記法']
category: Vuejs
image: 'img/taxonomy/vuejs.png'
date: '2020-05-10T05:14:22.126Z'
draft: false
excerpt: Vue.js Article
---

`v-on`ディレクティブの基本的な記法

```html:title=Vue.js
<button v-on:click="func()"></button>
```

`v-on`ディレクティブの省略記法

```html:title=Vue.js
<button @click="func()"></button>
```

`v-on`を`@`で置き換えて使えます。

## 注意点
サーバー側において、他の言語でレンダリングする際にはエラーとなる可能性があるという点には注意してください。（レンダリングする言語において`@`が他の意味を表したりする）

`v-on`ディレクティブの詳しい使い方についてはこちら
