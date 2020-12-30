import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const Contact: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>Contact</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">Contact</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content" css={forms}>
                <p>お問い合わせは以下のフォームより送信できます。</p>
                <form name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  <p>
                    <label>お名前 (必須)<br /><input className="contact" type="text" name="name" /></label>
                  </p>
                  <p>
                    <label>メールアドレス (必須)<br /><input className="contact" type="email" name="email" /></label>
                  </p>
                  <p>
                    <label>メッセージ本文<br /><textarea className="contact" name="message" /></label>
                  </p>
                  <p>
                    <button className="contact" type="submit">送信</button>
                  </p>
                </form>
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

const forms = css`
  button, input, select, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    outline: 0;
    background: 0 0;
  }

  input,textarea{
    width: 280px;
    padding: 8px;
    background: #eee;
    border-radius: 3px;
    &:focus {
      border: 2px solid ${colors.link};
      padding: 6px;
    }
  }

  button {
    width : 200px;
    border-radius: 3px;
    padding: 4px;
    background: ${colors.link};
    color: #fff;
    transition: .2s ease;
    &:hover {
      opacity: .6;
    }
  }
`;

export default Contact;
