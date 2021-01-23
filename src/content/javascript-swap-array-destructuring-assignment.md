---
layout: post
title: '分割代入で配列の要素を入れ替える-JavaScript'
author: [Fujiya]
tags: ['分割代入']
category: JavaScript
image: 'img/taxonomy/javascript.png'
date: '2020-12-31T05:13:22.126Z'
draft: false
excerpt: JavaScript Article
---

ここでは、JavaScriptの分割代入を用いて配列の要素を入れ替える方法をサンプルコードを参考に解説していきます。

## 入れ替えコードの紹介
まずはコードの紹介から。以下のコードで入れ替えることができます。

```JavaScript:title=JavaScript
let array = [1, 4, 9, 16];
let i=0;
let j=3;

[array[i], array[j]] = [array[j], array[i]];

console.log(array); // => Array [16, 4, 9, 1]
```
<div class="ads"></div>

## コードの解説
上記のコードでは分割代入というJavaScriptの構文を用いて実現しています。

> 分割代入 (Destructuring assignment) 構文は、配列から値を取り出して、あるいはオブジェクトからプロパティを取り出して別個の変数に代入することを可能にする JavaScript の式です。

参考：[分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

以下は[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)で公開されているのサンプルコードです。

```JavaScript:title=JavaScript
let a, b;
[a, b] = [10, 20];
console.log(a); // => 10
console.log(b); // => 20
```

分割代入では、上記のような代入を可能にします。この機能を用いて、左辺と右辺に順番を入れ替えたい配列の要素を指定することで、配列の要素の入れ替えを実現できます。

## まとめ
今回はJavaScriptの分割代入を用いて配列の要素を入れ替えるコードを紹介しました。

分割代入を使用せずに 配列2つの値を交換するには、一時変数を用いたり、splice関数を用いたりする方法があります。

今後はそれぞれの方法でどれがいいのかなども調査しておきたいです。