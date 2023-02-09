---
layout: post
title: 'JavaScript背景色の明度を判断して、白または黒の文字色を使用する-JavaScript'
author: [Fujiya]
tags: ['JavaScript','Programming']
category: JavaScript
image: 'img/taxonomy/javascript.png'
date: '2023-02-10T01:31:44'
draft: false
excerpt: JavaScript Article
---

背景色に対して、はっきり文字が見えるように文字の色を自動で計算したい場合ってあると思います。
以下は、PHPで背景色の明度を判断して、白または黒の文字色を使用する例です。

```js:title=JavaScript
function getContrastingColor(bgColor) {
  const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}
```

```js:title=JavaScript
// Example usage:
const bgColor = '#000000';
const textColor = getContrastingColor(bgColor);
console.log(textColor); // 'white'
```

この例では、背景色を16進数形式で取得し、R、G、B値に分解します。次に、YIQ値を計算して、背景色の明度を判断します。YIQ値が128以上であれば、文字色は黒、そうでなければ白となります。