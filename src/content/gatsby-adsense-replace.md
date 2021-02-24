---
layout: post
title: 'GatsbyJSのサイトでAdSenseを記事内に入れる'
author: [Fujiya]
tags: ['分割代入']
category: JavaScript
image: 'img/taxonomy/javascript.png'
date: '2020-12-31T05:13:22.126Z'
draft: false
excerpt: JavaScript Article
---

gatsbyの記事内にAdSenseおこうと思ったけど、Googleの提示してくれてるやつそのままは記事として（Markdownで）編集しづらいので
自動で置き換えてくれる関数作った

参考
https://qiita.com/bob_yama/items/2b24fca112587a1bf8e8
https://stackoverflow.com/questions/47890380/how-to-insert-a-dom-value-in-a-react-react-component
https://mottox2.com/posts/272
https://mao-tss.medium.com/fix-google-adsense-loading-issues-with-react-f338cbd61ac4
https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/
https://stackoverflow.com/questions/35338314/adsense-error-with-joomla-adsbygoogle-push-error
https://ja.reactjs.org/docs/react-dom.html#render


```TypeScript:title=TypeScript
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const adsenseReplace = () => {
  const client = 'ca-pub-5351220307196429';
  const format = 'fluid';
  const layout = 'in-article';
  const slot = '1004093357';
  if (window) {
    Array.from(document.getElementsByClassName('ads')).forEach(element => {
      ReactDOM.render(
        <Ins
          className="adsbygoogle"
          data-ad-client={client}
          data-ad-layout={layout}
          data-ad-format={format}
          data-ad-slot={slot}
        />,
        element,
        () => {
          // callbackで追加してやらないと、renderされる前にpushしてしまって？、以下のエラーがでる
          // adsbygoogle.push(): All ins elements in the DOM with class=adsbygoogle already have ads in them.
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        },
      );
    });
  }
};

const Ins = styled.ins`
  display:block;
  text-align:center;
`;
```
