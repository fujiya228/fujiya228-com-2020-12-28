---
layout: post
title: 'データ(data-*)属性を扱う-JavaScript'
author: [Fujiya]
tags: ['データ属性']
category: JavaScript
image: 'img/taxonomy/javascript.png'
date: '2021-08-25T00:58:09'
draft: false
excerpt: JavaScript Article
---

ここでは、HTMLの`data-`で始まるデータ属性をJavaScriptで扱う方法をサンプルコードとともに解説していきます。


今回はデータ属性の扱い方について以下の2つの方法を紹介します。
- 〇〇Attribute()
- dataset

簡潔に振り返りできるように、今回扱う操作とそれぞれの記述についてざっくりと表にしました。

| 操作     | 〇〇Attribute()                   | dataset                                   |
| -------- | --------------------------------- | ----------------------------------------- |
| 取得     | el.getAttribute(attributeName)    | el.dataset.keyname or el.dataset[keyname] |
| 設定     | el.setAttribute(attributeName)    | el.dataset.keyname= value                 |
| 削除     | el.removeAttribute(attributeName) | delete el.dataset.keyname                 |
| 存在確認 | el.hasAttribute(attributeName)    | keyname in el.dataset                     |

※注意事項
- `el`はHTMLの要素（Eemelnt）です。
- `attributeName`は`data-*`のことです。例：`data-user`
- `keyname`は`data-*`の`*`の部分。`data-user`であれば`user`が`keyname`です。

※datasetのkeynameルール
- キャメルケース　で　ダッシュ、ドットなどは含みません。
- ASCII 大文字の A から Z は使用できません

参考
- [HTMLElement.dataset](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/dataset)
- [Element](https://developer.mozilla.org/ja/docs/Web/API/Element)
- [データ属性の使用](https://developer.mozilla.org/ja/docs/Learn/HTML/Howto/Use_data_attributes)

<div class="ads"></div>

## 〇〇Attribute()

```js:title=JavaScript
// 要素の作成
el = document.createElement("div");

// data属性の設定
el.setAttribute('data-user', 'Alice');

// data属性の存在確認
console.log(el.hasAttribute('data-user')); // => true
console.log(el.hasAttribute('data-id')); // => false

// data属性の取得
console.log(el.getAttribute('data-user')); // => Alice

// data属性の書き換え
el.setAttribute('data-user', 'Bob');
console.log(el.getAttribute('data-user')); // => Bob

// data属性の削除
delete el.removeAttribute('data-user');
console.log(el.hasAttribute('data-user')); // => false
```

## dataset

```js:title=JavaScript
// 要素の作成
el = document.createElement("div");

// data属性の設定
el.dataset.user = 'Alice';

// data属性の存在確認
console.log('user' in el.dataset); // => true
console.log('id' in el.dataset); // => false

// data属性の取得
console.log(el.dataset.user); // => Alice

// data属性の書き換え
el.dataset.user = 'Bob';
console.log(el.dataset.user); // => Bob

// data属性の削除
delete el.dataset.user;
console.log('user' in el.dataset); // => false
```

<div class="ads"></div>

## まとめ
HTMLの`data-`で始まるデータ属性をJavaScriptで扱う方法を紹介しました。

個人的には`dataset`の方法を使う方が完結に書くことができて好きです。