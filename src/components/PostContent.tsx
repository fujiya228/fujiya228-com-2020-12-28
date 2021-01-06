import { lighten } from 'polished';
import React from 'react';
import styled from '@emotion/styled';
import RehypeReact from 'rehype-react';

import { colors } from '../styles/colors';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  // components: { 'interactive-counter': Counter },
  components: {},
}).Compiler;

const Ast = ({ ast, ...props }: any) => {
  ast.properties = props;
  return renderAst(ast);
};

export interface PostContentProps {
  htmlAst: any;
}

const PostContent: React.FC<PostContentProps> = ({ htmlAst }) => {
  return (
    <PostFullContent className="post-full-content">
      {/* TODO: this will apply the class when rehype-react is published https://github.com/rhysd/rehype-react/pull/11 */}
      <Ast className="post-content" ast={htmlAst} />
    </PostFullContent>
  );
};

export const PostFullContent = styled.section`
  position: relative;
  margin: 0 auto;
  padding: 0 170px 6vw;
  min-height: 230px;
  font-family: Georgia, serif;
  font-size: 2rem;
  line-height: 1.6em;
  background: #fff;

  @media (max-width: 1170px) {
    padding: 0 11vw;
  }
  @media (max-width: 800px) {
    padding: 0 5vw;
    font-size: 1.8rem;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
  @media (max-width: 500px) {
    .post-full-custom-excerpt {
      font-size: 1.9rem;
      line-height: 1.5em;
    }
  }

  .no-image {
    padding-top: 0;
  }

  
  p,
  ul,
  ol,
  dl,
  pre,
  blockquote,
  .post-full-comments,
  .footnotes {
    font-size: 18px;
    line-height: 1.6em;
    margin-bottom: 24px;
    min-width: 100%;
  }
  @media (max-width: 500px) {
    p,
    ul,
    ol,
    dl,
    pre,
    .post-full-comments,
    .footnotes {
      margin-bottom: 1.28em;
    }
  }

  li {
    word-break: break-word;
  }

  li p {
    margin: 0;
  }

  a {
    /* color: var(--blue); */
    color: ${colors.blue};
    word-break: break-word;
    /* box-shadow: var(--blue) 0 -1px 0 inset; */
    box-shadow: ${colors.blue} 0 -1px 0 inset;
    transition: all 0.2s ease-in-out;
  }

  a:hover {
    /* color: var(--blue); */
    color: ${colors.blue};
    text-decoration: none;
    /* box-shadow: var(--blue) 0 -1px 0 inset; */
    box-shadow: none;
  }

  strong,
  em {
    /* color: color(var(--darkgrey) l(-5%)); */
    color: ${lighten('-0.05', colors.darkgrey)};
  }

  small {
    display: inline-block;
    line-height: 1.6em;
  }

  img,
  video {
    display: block;
    margin: 1.5em auto;
    max-width: 1040px;
    height: auto;
  }
  @media (max-width: 1040px) {
    img,
    video {
      width: 100%;
    }
  }

  img[src$='#full'] {
    max-width: none;
    width: 100vw;
  }

  img + br + small {
    display: block;
    margin-top: -3em;
    margin-bottom: 1.5em;
    text-align: center;
  }

  iframe {
    margin: 0 auto !important;
  }

  blockquote {
    margin: 0 0 1.5em;
    padding: 1em 1.5em;
    border-left: #3eb0ef 3px solid;
    background-color: #eee;
  }
  @media (max-width: 500px) {
    blockquote {
      padding: 0 1.3em;
    }
  }

  blockquote p {
    margin: 0 0 1em 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: italic;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  code {
    margin: 0 4px;
    padding: 0 6px;
    font-size: 0.85em;
    font-family: Consolas, "Courier New", monospace;
    color: #2280e2;
    /* background: var(--whitegrey); */
    /* background: ${colors.whitegrey}; */
    background: #d4d4d4;
    border-radius: 3px;
    display: inline-block;
  }

  p code {
    word-break: break-all;
  }

  pre {
    overflow-x: auto;
    /* margin: 1.5em 0 3em; */
    padding: 20px;
    max-width: 100%;
    /* border: color(var(--darkgrey) l(-10%)) 1px solid; */
    /* border: ${lighten('-0.1', colors.darkgrey)} 1px solid; */
    /* color: var(--whitegrey); */
    color: ${colors.whitegrey};
    font-size: 1.4rem;
    line-height: 1.5em;
    /* background: color(var(--darkgrey) l(-3%)); */
    /* background: ${lighten('-0.03', colors.darkgrey)}; */
    border-radius: 5px;
  }

  pre ::selection {
    /* color: color(var(--midgrey) l(-25%)); */
    color: #000;
  }

  pre code {
    padding: 0;
    font-size: inherit;
    line-height: inherit;
    background: transparent;
  }

  pre code :not(span) {
    color: inherit;
  }

  .fluid-width-video-wrapper {
    margin: 1.5em 0 3em;
  }

  hr {
    margin: 2em 0;
  }

  hr:after {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    display: block;
    margin-left: -10px;
    width: 1px;
    height: 30px;
    /* background: color(var(--lightgrey) l(+10%)); */
    background: ${lighten('0.1', colors.lightgrey)};
    box-shadow: #fff 0 0 0 5px;
    transform: rotate(45deg);
  }

  hr + p {
    margin-top: 1.2em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* color: color(var(--darkgrey) l(-5%)); */
    color: ${lighten('-0.05', colors.darkgrey)};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', '游ゴシック', 'Yu Gothic', sans-serif;
    padding-top: 72px;
  }

  h1 {
    margin: 0.5em 0 0.4em;
    font-size: 4.2rem;
    line-height: 1.4em;
    font-weight: 600;
    border-bottom: solid 10px ${colors.base};
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 3.2rem;
    }
  }

  h2 {
    margin: 0 0 24px;
    font-size: 3.2rem;
    line-height: 1.4em;
    font-weight: 600;
    border-bottom: solid 3px ${colors.base};
  }
  @media (max-width: 800px) {
    h2 {
      margin-bottom: 0.3em;
      font-size: 2.8rem;
    }
  }

  h3 {
    font-size: 2.5rem;
    line-height: 1.4em;
    font-weight: 600;
  }
  @media (max-width: 800px) {
    h3 {
      margin-bottom: 0.3em;
      font-size: 2.4rem;
    }
  }

  h4 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.4em;
  }
  @media (max-width: 800px) {
    h4 {
      margin-bottom: 0.3em;
      font-size: 2.4rem;
    }
  }

  h5 {
    display: block;
    margin: 0.5em 0;
    padding: 0.4em 1em 0.9em;
    border: 0;
    /* color: var(--blue); */
    color: ${colors.blue};
    font-family: Georgia, serif;
    font-size: 3.2rem;
    line-height: 1.35em;
    text-align: center;
  }
  @media (min-width: 1180px) {
    h5 {
      max-width: 1060px;
      /* width: 100vw; */
    }
  }
  @media (max-width: 800px) {
    h5 {
      margin-bottom: 1em;
      margin-left: 1.3em;
      padding: 0 0 0.5em;
      font-size: 2.4rem;
      text-align: initial;
    }
  }

  h6 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.4em;
  }
  @media (max-width: 800px) {
    h6 {
      font-size: 1.8rem;
    }
  }

  h3,h4,h6 {
    margin: 0 0 24px;
    border-bottom: double 8px ${colors.base};
  }

  table {
    display: inline-block;
    overflow-x: auto;
    margin: 0.5em 0 2.5em;
    max-width: 100%;
    width: auto;
    border-spacing: 0;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', '游ゴシック', 'Yu Gothic', sans-serif;
    font-size: 1.6rem;
    white-space: nowrap;
    vertical-align: top;
  }

  table {
    -webkit-overflow-scrolling: touch;
    background: radial-gradient(ellipse at left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 0
        center,
      radial-gradient(ellipse at right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 100% center;
    background-attachment: scroll, scroll;
    background-size: 10px 100%, 10px 100%;
    background-repeat: no-repeat;
  }

  table td:first-of-type {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table td:last-child {
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-position: 100% 0;
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table th {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-align: left;
    text-transform: uppercase;
    /* background-color: color(var(--whitegrey) l(+4%)); */
    background-color: ${lighten('0.04', colors.whitegrey)};
  }

  table th,
  table td {
    padding: 6px 12px;
    /* border: color(var(--whitegrey) l(-1%) s(-5%)) 1px solid; */
    border: ${lighten('-0.01', colors.whitegrey)} 1px solid;
  }

  @media (prefers-color-scheme: dark) {
    /* background: var(--darkmode); */
    background: ${colors.darkmode};

    h1,
    h2,
    h3,
    h4,
    h6 {
      color: rgba(255, 255, 255, 0.9);
    }

    a {
      color: #fff;
      box-shadow: inset 0 -1px 0 #fff;
    }

    strong {
      color: #fff;
    }

    em {
      color: #fff;
    }

    code {
      color: #fff;
      background: #000;
    }

    hr {
      /* border-top-color: color(var(--darkmode) l(+8%)); */
      /* border-top-color: ${lighten('0.08', colors.darkmode)}; */
      border-top-color: #17191c;
    }

    hr:after {
      background: #17191c;
      box-shadow: ${colors.darkmode} 0 0 0 5px;
    }

    figcaption {
      color: rgba(255, 255, 255, 0.6);
    }

    table td:first-of-type {
      /* background-image: linear-gradient(
        to right,
        var(--darkmode) 50%,
        color(var(--darkmode) a(0%)) 100%
      ); */
      background-image: linear-gradient(to right, ${colors.darkmode} 50%, ${colors.darkmode} 100%);
    }

    table td:last-child {
      /* background-image: linear-gradient(
        to left,
        var(--darkmode) 50%,
        color(var(--darkmode) a(0%)) 100%
      ); */
      background-image: linear-gradient(270deg, #191b1f 50%, rgba(25, 27, 31, 0));
    }

    table th {
      color: rgba(255, 255, 255, 0.85);
      /* background-color: color(var(--darkmode) l(+8%)); */
      background-color: ${lighten('0.08', colors.darkmode)};
    }

    table th,
    table td {
      /* border: color(var(--darkmode) l(+8%)) 1px solid; */
      border: ${lighten('0.08', colors.darkmode)} 1px solid;
    }

    .kg-bookmark-container,
    .kg-bookmark-container:hover {
      color: rgba(255, 255, 255, 0.75);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
    }
  }

  /* Start Syntax Highlighting */
  /* Taken from overreacted https://github.com/gaearon/overreacted.io/blob/942b41555f5e5ccbb5f93f6c26142cd90b314236/src/utils/global.css#L68 */
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
    padding: 48px 20px 20px;
  }

  /* Inline code */
  *:not(pre) > code[class*='language-'] {
    color: #2280e2;
    background: #d4d4d4;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999;
  }

  .token.punctuation {
    color: #ccc;
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #e2777a;
  }

  .token.function-name {
    color: #6196cc;
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: #f08d49;
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #f8c555;
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #cc99cd;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #7ec699;
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: #67cdcc;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: green;
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  .gatsby-highlight-code-line {
    background-color: hsla(207, 95%, 15%, 1);
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 1.25em;
    border-left: 0.25em solid #ffa7c4;
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    border-radius: 10px;
    background: #011627;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
  }
  /* End Syntax Highlighting */

  /* Highlighting title */
  .gatsby-code-title {
    display: block;
    position: relative;
  }

  .gatsby-code-title span {
    display: inline;
    position: absolute;
    left: 0;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    color: #eee;
    background: #777;
    padding: 0 16px;
    font-size: 14px;
    z-index: 10;
  }
`;

export default PostContent;
