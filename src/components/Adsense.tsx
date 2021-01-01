import React, { useEffect } from 'react';
import styled from '@emotion/styled';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const Adsense: React.FC = () => {
  useEffect(() => {
    if (window) {
      // window.adsbygoogle = window.adsbygoogle || [];
      // window.adsbygoogle.push({});
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  });

  return (
    <Ins
      className="adsbygoogle" data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-5351220307196429"
      data-ad-slot="1004093357"
    />
  );
};

const Ins = styled.ins`
  display:block;
  text-align:center;
`;
