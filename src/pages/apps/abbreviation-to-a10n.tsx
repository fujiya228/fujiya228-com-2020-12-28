import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../../components/Footer';
import SiteNav from '../../components/header/SiteNav';
import { PostFullContent } from '../../components/PostContent';
import { Wrapper } from '../../components/Wrapper';
import IndexLayout from '../../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../../templates/post';
import { colors } from '../../styles/colors';

import { abbreviation } from '../../utils/hira-to-alpha';
import { Adsense } from '../../components/Adsense';

interface AbbreviationState {
  inputStr: string;
  outputStr: string;
  alphaStr: string;
}

class Abbreviation extends React.Component<any, AbbreviationState> {
  state = { inputStr: 'ヤマダたろう', alphaStr: 'yamadatarou', outputStr: 'y9u' };

  inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [alpha, output] = abbreviation(e?.target?.value);
    this.setState({ inputStr: e?.target?.value });
    this.setState({ outputStr: output });
    this.setState({ alphaStr: alpha });
  };

  render() {
    return (
      <IndexLayout>
        <Helmet>
          <title>internationalization to i18n | 省略化アプリケーション</title>
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
                  <PostFullTitle className="post-full-title">省略化アプリケーション</PostFullTitle>
                </PostFullHeader>

                <PostFullContent className="post-full-content">
                  <div className="post-content">
                    <div css={AppContent}>
                      <p>internationalization ＝＞ i18n や localization ＝＞ l10n といった変換をしてくれるアプリケーションです。<br />ひらがな、カタカナもある程度対応しました。（「っ」や「ー」、記号など一部変換できません。）</p>
                      <p><label>入力</label><input className="text" type="text" value={this.state.inputStr} onChange={this.inputChange} /></p>
                      <p><label>アルファベット</label><input readOnly className="text output" type="text" value={this.state.alphaStr} /></p>
                      <p><label>省略結果</label><input readOnly className="text output" type="text" value={this.state.outputStr} /></p>
                    </div>
                  </div>
                </PostFullContent>
                <Adsense pathname={this.props.location.pathname} />
              </article>
            </div>
          </main>
          <Footer />
        </Wrapper>
      </IndexLayout >
    );
  }
}

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

const AppContent = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  label {
    display: inline-block;
    width: 200px;
  }
  .text {
    width: 200px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px black;
  }
  .output {
    background: #eee;
  }
`;

export default Abbreviation;
