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
      console.log('insert ads');
      ReactDOM.render(
        <Ins
          className="adsbygoogle"
          data-ad-client={client}
          data-ad-layout={layout}
          data-ad-format={format}
          data-ad-slot={slot}
        />,
        element,
      );
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
};

const Ins = styled.ins`
  display:block;
  text-align:center;
`;
