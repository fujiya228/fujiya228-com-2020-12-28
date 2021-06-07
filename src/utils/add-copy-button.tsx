import React from 'react';
import ReactDOM from 'react-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { Copy } from '../components/icons/copy';
import { css } from '@emotion/react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const addCopyButton = () => {
  if (window) {
    Array.from(document.getElementsByClassName('gatsby-highlight')).forEach(element => {
      const code = element.textContent?.toString() || "no content";
      const prev = element.previousElementSibling;
      const container = document.createElement('div');

      container.setAttribute('style', 'display:block; position: relative;')
      prev?.before(container);

      ReactDOM.render(
        <CopyToClipBoard text={code}>
          <button css={CopyButton}>
            <Copy />
          </button>
        </CopyToClipBoard>,
        container,
      );
    });
  }
};

const CopyButton = css`
  position: absolute;
  right: 24px;
  font-family: Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;
  background: #777;
  font-size: 12px;
  color: #eee;
  z-index: 10;

  display: inline-block;
  margin: 0;
  padding: 0 10px;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.4rem;
  }
`;
