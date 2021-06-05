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
  const layout = 'in-article';
  const slot = '1004093357';
  if (window) {
    Array.from(document.getElementsByClassName('ads')).forEach(element => {
      ReactDOM.render(
        <Ins
          className="adsbygoogle"
          data-ad-client={client}
          data-ad-layout={layout}
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
