---
layout: post
title: 'PHP背景色の明度を判断して、白または黒の文字色を使用する-PHP'
author: [Fujiya]
tags: ['PHP','Programming']
category: PHP
image: 'img/taxonomy/php.png'
date: '2023-02-10T00:16:19'
draft: false
excerpt: PHP Article
---

背景色に対して、はっきり文字が見えるように文字の色を自動で計算したい場合ってあると思います。
以下は、PHPで背景色の明度を判断して、白または黒の文字色を使用する例です。

```php:title=PHP
function getContrastingColor($bgColor) {
  $color = (substr($bgColor, 0, 1) === '#') ? substr($bgColor, 1) : $bgColor;
  $r = hexdec(substr($color, 0, 2));
  $g = hexdec(substr($color, 2, 2));
  $b = hexdec(substr($color, 4, 2));
  $yiq = (($r * 299) + ($g * 587) + ($b * 114)) / 1000;
  return ($yiq >= 128) ? 'black' : 'white';
}
```

```php:title=PHP
// Example usage:
$bgColor = '#000000';
$textColor = getContrastingColor($bgColor);
echo $textColor; // 'white'
```

この例では、背景色を16進数形式で取得し、R、G、B値に分解します。次に、YIQ値を計算して、背景色の明度を判断します。YIQ値が128以上であれば、文字色は黒、そうでなければ白となります。