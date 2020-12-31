---
layout: post
title: 'JavaScriptで目次(TOC:Table of Contents)を作成する-JavaScript'
author: [Fujiya]
tags: ['TOC']
category: JavaScript
image: 'img/taxonomy/javascript.png'
date: '2019-05-01T05:13:22.126Z'
draft: false
excerpt: 
---

ここでは、JavaScript(jQuery)を用いて目次を自動挿入する方法をサンプルコードを参考に解説していきます。

## TOC自動挿入コードの紹介
まずはコードの紹介から。

仕様は、以下のようになります。

- mainタグの中にあるh1～h3タグを探し出し、id=”TOC”の要素へ目次を表示
- 番号付き
- リンク付き

```JavaScript:title=JavaScript
jQuery(document).ready(function (jQuery) {
    var ID_count = 0;
    var h_count = [0, 0, 0];
    var current_level = 0;
    var level = 0;
    var flag = 1;
    var toc = '';
    var num = '';
    var i;
    jQuery("main h1,main h2,main h3", this).each(function () {
        ID_count++;
        this.id = "toc-" + ID_count;
        if (this.nodeName.toLowerCase() == "h1") {
            level = 1;
            h_count[0]++;
            h_count[1] = h_count[2] = 0;
        } else if (this.nodeName.toLowerCase() == "h2") {
            level = 2;
            h_count[1]++;
            h_count[2] = 0;
        } else if (this.nodeName.toLowerCase() == "h3") {
            level = 3;
            h_count[2]++;
        }
        while (current_level < level) {
            toc += '<ul><li>';
            current_level++;
            flag = 0;
        }
        while (current_level > level) {
            toc += "</li></ul>";
            current_level--;
        }
        if (flag) {
            toc += "</li><li>";
        }
        flag = 1;
        if (h_count[1]) {
            num = h_count[1];
            for (i = 2; i < level; i++) num += '.' + h_count[i];
            toc += '<a href="#' + this.id + '">' + num + ': ' + jQuery(this).html() + "</a>\n";
        } else toc += '<a href="#' + this.id + '">' + jQuery(this).html() + "</a>\n";
    });
    while (current_level > 0) {
        toc += "</li></ul>";
        current_level--;
    }
    jQuery("#TOC").html('<div>目次</div>' + toc);

});
```

## コードの解説
コードの解説です。今回の方針は以下のようになります。

1. mainタグ内のh1~h6タグの取得
2. 各タグの階層を判断
3. 同じ階層で何番目のタグかを判断
4. 対象のタグへのリンクを作る
5. id=”TOC”のタグ内に出力

2～3はタグがある限り繰り返し行います。

### mainタグ内のh1~h3タグの取得
以下のコードが取得の部分になります。

```JavaScript:title=JavaScript
jQuery("main h1,main h2,main h3", this).each(function () {/*ここに2~3の処理が入ってます*/}); 
```

jQueryを用いてmainタグ内のh1~h6タグを取得します。取得したいタグを変更したい場合は、ダブルクォーテーション内にカンマで区切って記入することで追加、削除が可能です。

### 各タグの階層を判断
変数の役割はコード中に記載した通りです。
this.nodeName.toLowerCase()で要素が何かを判断します。if()で順番に判断していき、合致するところで要素のレベルが確定します。
確定後はそれまでのレベルと比較して、追加するタグ、閉じるタグを決定していきます。

```JavaScript:title=JavaScript
var current_level = 0;//現在の階層レベルを格納します。
var level = 0;//新しく取得したタグの階層レベルを格納します。
var flag = 1;//レベルが上がった時のフラグです。 
var toc = '';//出力するための文字列を格納します。
if (this.nodeName.toLowerCase() == "h1") {
    level = 1;
} else if (this.nodeName.toLowerCase() == "h2") {
    level = 2;
} else if (this.nodeName.toLowerCase() == "h3") {
    level = 3;
}
//レベルが上がったときは新しい<ul>タグとその中身の<li>タグを追加します。
while (current_level < level) {
    toc += '<ul><li>';
    current_level++;//レベルをインクリメント
    flag = 0;//フラグを変更
}
//レベルが下がったときはそれまでの<li>タグ、<ul>タグを閉じます。
while (current_level > level) {
    toc += "</li></ul>";
    current_level--;//レベルをデクリメント
}
//レベルが上がっていなければ、前の<li>タグを閉じ、次の<li>タグを追加します。
if (flag) {
    toc += "</li><li>";
}
flag = 1;//フラグを元にもどす 
```

### 同じ階層で何番目のタグかを判断
先ほどのレベル判断時と同じタイミングで今までの個数をインクリメントすることで何番目のタグかを判断します。

```JavaScript:title=JavaScript
var h_count = [0, 0, 0];//タグが何番目のものかを記録しておくものです。
var num = '';//番号を振る際の数字を格納します。 
if (this.nodeName.toLowerCase() == "h1") {
    h_count[0]++;//個数をインクリメント
    h_count[1] = h_count[2] = 0;//より大きいレベルの個数をリセットします。
} else if (this.nodeName.toLowerCase() == "h2") {
    h_count[1]++;
    h_count[2] = 0;
} else if (this.nodeName.toLowerCase() == "h3") {
    h_count[2]++;
}
//h1タグは基本的に1つであるため、無視します。
//h2タグの数字が0でなければ判定を行います。
if (h_count[1]) {
    num = h_count[1];
    for (i = 2; i < level; i++) num += '.' + h_count[i];//「.」で区切ります。
}
```

### 対象のタグへのリンクを作る
タグへのリンクを付けます。今回は対象のタグにidを付けて、それに対するリンクをaタグによって作ります。

```JavaScript:title=JavaScript
var ID_count = 0;//idにつける番号を格納します。

ID_count++;
this.id = "toc-" + ID_count;//対象のタグにidを設定
if (h_count[1]) {
    num = h_count[1];
    for (i = 2; i < level; i++) num += '.' + h_count[i];//番号を格納
    //tocに<a>タグでリンクを設定、href属性でidを指定 
    toc += '<a href="#' + this.id + '">' + num + ': ' + jQuery(this).html() + "</a>\n";
} else toc += '<a href="#' + this.id + '">' + jQuery(this).html() + "</a>\n";//<h1>の場合は番号を付けない 
```

### id=”TOC”のタグ内に出力
jQueryを用いて指定したidのタグの中に今まで格納してきたものを出力します。


```JavaScript:title=JavaScript
//終了したら、それまでのタグをすべて閉じます。
while (current_level > 0) {
    toc += "</li></ul>";
    current_level--;
}
//id="TOC"のタグの中に以下の目次タグと今まで格納してきたtocを出力
jQuery("#TOC").html('<div>目次</div>' + toc); 
```

## 応用してみる
上記ではh1~h3でしたが、拡張してh1~h6や特定のタグに絞ることもできます。また、ul,li,a要素にクラスを割り振ることでデザインを整えることもできます。

## まとめ
今回はJavaScriptでを用いて目次を自動挿入する方法を紹介しました。
また、今回はjQueryを用いましたが、素のJavaScriptでのコードも公開したいです。
