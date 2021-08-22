import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import { Helmet } from 'react-helmet';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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

import config from '../../website-config';
import { Adsense } from '../../components/Adsense';

export interface LandScouterProps {
  pathname: string;
  data: {
    header: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  };
}
interface LandScouterState {
  mapLat: number;
  mapLng: number;
}

const containerStyle = {
  width: '100%',
  height: '50vh',
};

const center = {
  lat: 35.681,
  lng: 139.767,
};

const app_config = {
  title: '土地スカウター',
  description: '土地の戦闘力を計測しよう！',
};

const LandScouter: React.FC<LandScouterProps> = props => {
  const { width, height } = props.data.header.childImageSharp.fixed;
  const [state, setState] = useState<LandScouterState>({ mapLat: 0, mapLng: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareText, setShareText] = useState<string>('');
  const pathname = '/apps/land-scouter';
  const appURL = `${config.siteUrl}${pathname}`;

  const [map, setMap] = useState<any>();

  const onLoad = (mapInstance: any) => {
    setMap(mapInstance);
    setState({ mapLat: mapInstance.center.lat(), mapLng: mapInstance.center.lng() });
  };

  const mapMoveStart = () => {
    setState({ mapLat: 0, mapLng: 0 });
  };

  const mapMove = () => {
    setState({
      mapLat: map.center.lat().toFixed(3), mapLng: map.center.lng().toFixed(3),
    });
  };

  const requestScore = () => {
    const httpRequest = new XMLHttpRequest();

    setIsLoading(true);
    delError();

    if (!httpRequest) {
      console.log('中断 :( XMLHTTP インスタンスを生成できませんでした');
      return false;
    }

    httpRequest.onreadystatechange = () => {
      try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const response = JSON.parse(httpRequest.responseText);
            const resultScore = document.getElementById('result-score');
            const resultPlaces = document.getElementById('result-places');
            const places: Record<string, number> = response?.places;
            const placesDOM = [];

            setShareText(`緯度：${response.location.latitude}、経度：${response.location.longitude}の戦闘力は${response.score}でした！！！`);

            document.getElementById('result')?.classList.add('open');

            for (const [key, value] of Object.entries(places)) {
              placesDOM.push(
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>,
              );
            }

            ReactDOM.render(
              <div>
                <span className="result_title">戦闘力</span>
                <span className="result_score">{response.score}</span>
              </div>,
              resultScore,
            );
            ReactDOM.render(
              <table>
                <thead>
                  <tr>
                    <th>Place type</th>
                    <th>Number of Place</th>
                  </tr>
                </thead>
                <tbody>
                  {placesDOM}
                </tbody>
              </table>,
              resultPlaces,
            );
          } else {
            console.log('リクエストに問題が発生しました');
            notifyError();
          }

          closeOverlay();
        }
      } catch (e: unknown) {
        console.log('例外を捕捉');
        closeOverlay();
        notifyError();
      }
    };

    httpRequest.open('GET', `https://fujiya-api.herokuapp.com/api/v1/location_scores/${locationId()}`);
    httpRequest.send();
  };

  const locationId = () => {
    return `${state.mapLat.toString().replace('.', '\'')}_${state.mapLng.toString().replace('.', '\'')}`;
  };

  const closeOverlay = () => {
    setTimeout(() => setIsLoading(false), 2000);
  };

  const notifyError = () => {
    const error = document.getElementById('error');
    ReactDOM.render(
      <div>
        <span className="error_title">エラー</span>
        <span className="error_message">申し訳ありません。エラーが発生したため正しく処理できませんでした。</span>
      </div>,
      error,
    );
  };

  const delError = () => {
    const error = document.getElementById('error');
    ReactDOM.render(
      <div />,
      error,
    );
  };

  return (
    <IndexLayout>
      <Helmet>
        <title>{app_config.title}</title>
        <meta name="description" content={app_config.description} />
        <meta property="og:site_name" content={app_config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={app_config.title} />
        <meta property="og:description" content={app_config.description} />
        <meta property="og:url" content={appURL} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && (
          <meta name="google-site-verification" content={config.googleSiteVerification} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={app_config.title} />
        <meta name="twitter:description" content={app_config.description} />
        <meta name="twitter:url" content={appURL} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width.toString()} />
        <meta property="og:image:height" content={height.toString()} />
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
                <PostFullTitle className="post-full-title">{app_config.title}</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <div css={AppContent}>
                    <LoadScript googleMapsApiKey="AIzaSyAWRE_mRt_AhQONNAqrgBzZun9Cq28y8wY">
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onDragStart={mapMoveStart}
                        onDrag={mapMove}
                      >
                        <div css={MapCenterIcon} />
                      </GoogleMap>
                    </LoadScript>
                    <div className="controller">
                      <p><label>緯度</label><input readOnly className="text" type="text" value={state.mapLat} /></p>
                      <p><label>経度</label><input readOnly className="text" type="text" value={state.mapLng} /></p>
                      <p><button type="button" className="button" onClick={requestScore}>計測</button></p>
                    </div>
                    <div className="error" id="error" />
                    <div className="result" id="result">
                      <div id="result-score" />
                      <div className="button share">
                        <TwitterShareButton title={shareText} url={appURL} hashtags={[app_config.title]}>
                          <TwitterIcon size={32} borderRadius={4} />
                          <span>シェアする</span>
                        </TwitterShareButton>
                      </div>
                      <div id="result-places" />
                    </div>
                    <div className={['overlay', isLoading ? 'open' : ''].join(' ')}>
                      <div className="container">
                        <div className="c1">計</div>
                        <div className="c2">測</div>
                        <div className="c3">中</div>
                        <div className="c4">・</div>
                        <div className="c5">・</div>
                        <div className="c6">・</div>
                      </div>
                    </div>
                  </div>
                </div>
              </PostFullContent>
              <Adsense pathname={pathname} />
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout >
  );
};

export const pageQuery = graphql`
  query {
    header: file(relativePath: { eq: "img/logo.fin.png" }) {
      childImageSharp {
        fixed(width: 2000, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

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
    width: 50px;
  }
  .controller {
    width: 100%;
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    button {
      background: #e04e4e;
      color: white;
      font-weight: bold;
    }
  }
  .text {
    width: 100px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px black;
    text-align: center;
  }
  .output {
    background: #eee;
  }
  .button {
    width: 160px;
    margin: 0 auto;
    border-radius: 4px;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 32px;
    transition: .3s ease-in-out;
    &:hover {
      opacity: 0.6;
    }
  }
  .error {
    width: 100%;
    span {
      display: block;
      width: 100%;
      font-weight: bold;
    }
    &_title {
      font-size: 32px;
      margin: 8px 0;
    }
    &_message {

    }
  }
  #result {
    display: none;
    &.open {
      display: block;
    }
  }
  .result {
    width: 100%;
    #result-score {
      padding: 48px;
      margin-bottom: 48px;
      border-radius: 12px;
      text-align: center;
      background: #e04e4e;
      span {
        display: block;
        width: 100%;
        font-weight: bold;
      }
    }
    &_title {
      margin-bottom: 24px;
      color: white;
      font-size: 32px;
    }
    &_score {
      padding: 48px 0;
      background: white;
      font-size: 64px;
    }
  }
  .share {
    background: #00aced;
    color:white;
    button {
      width: 100%;
    }
  }
  .overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    transition: .3s;
    opacity: 0;
    z-index: -1;
    &.open {
      opacity: 1;
      z-index: 100;
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 50%;
      z-index: 100;
      .c1, .c2, .c3, .c4, .c5, .c6 {
        font-family: 'Work Sans', sans-serif;
        color: white;
        margin: 0 4px;
        font-weight: bold;
        font-size: 32px;
        animation: move;
        animation-timing-function: cubic-bezier(0.15,-0.01, 0.58, 1);
        animation-duration: 2s;
        animation-iteration-count: infinite;
        will-change: transform;
      }

      .c1 { animation-delay: 0s; }
      .c2 { animation-delay: 0.1s; }
      .c3 { animation-delay: 0.2s; }
      .c4 { animation-delay: 0.3s; }
      .c5 { animation-delay: 0.4s; }
      .c6 { animation-delay: 0.5s; }

      @keyframes move {
        0%, 20% { transform: translateY(0); }
        20%, 50% { transform: translateY(-3rem); }
        50%, 100% { transform: translateY(0); }
      }
    }
  }
  .fixed_ads {
    position: fixed;
    top: 140px;
    height: 700px;
    width: 200px;
    background: #eee;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
  img {
    margin: 0;
  }
`;

const MapCenterIcon = css`
  width: 40px;
  height: 40px;
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 2px);
  &::before {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    margin: calc(50% - 2px) 0;
    background: black;
    position: absolute;
  }
  &::after {
    content: '';
    display: block;
    width: 4px;
    height: 40px;
    margin: 0 calc(50% - 2px);
    background: black;
    position: absolute;
  }
`;

export default LandScouter;
