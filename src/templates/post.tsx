import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as _ from 'lodash';
import { lighten, setLightness } from 'polished';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { ReadNext } from '../components/ReadNext';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain } from '../styles/shared';
import config from '../website-config';
import { AuthorList } from '../components/AuthorList';
import { Adsense } from '../components/Adsense';
import { PostAside } from '../components/PostAside';
import { adsenseReplace } from '../utils/AdsenseReplace';
import { addCopyButton } from '../utils/add-copy-button';

export interface Author {
  id: any;
  name: string;
  bio: string;
  avatar: {
    children: Array<{
      fluid: FluidObject;
    }>;
  };
}

interface PageTemplateProps {
  location: Location;
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      headings: Array<{
        id: string;
        depth: number;
        value: string;
      }>;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        category: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        excerpt: string;
        tags: string[];
        author: Author[];
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            date: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
    recentPosts: {
      edges: Array<{
        node: {
          frontmatter: {
            title: string;
            date: string;
            draft: boolean;
            image: {
              childImageSharp: {
                fluid: FluidObject;
              };
            };
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: Author[];
  };
}

const PageTemplate = ({ data, pageContext, location }: PageTemplateProps) => {
  const post = data.markdownRemark;
  const { pathname } = location;
  let width = '';
  let height = '';
  if (post.frontmatter.image?.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  const date = new Date(post.frontmatter.date);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'dd LLL yyyy');

  const postData = {
    title: post.frontmatter.title,
    slug: location.pathname,
    category: post.frontmatter.category,
    date: post.frontmatter.date,
    image: post.frontmatter.image.childImageSharp.fluid.src,
  };

  useEffect(() => {
    adsenseReplace();
    addCopyButton();
  }, [pathname]);

  return (
    <IndexLayout className="post-template" postData={postData}>
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        {post.frontmatter.image?.childImageSharp && (
          <meta
            property="og:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {post.frontmatter.image?.childImageSharp && (
          <meta
            name="twitter:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.frontmatter.author[0].name} />
        <meta name="twitter:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper css={PostTemplate}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={post.frontmatter} />
            </div>
          </div>
        </header>
        <div css={[outer, PostMainColmun]}>
          <main id="site-main" className="site-main" css={[SiteMain, inner]}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.frontmatter.image && NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTags className="post-full-tags">
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {post.frontmatter.tags[0]}
                    </Link>
                  )}
                </PostFullTags>
                <PostFullTitle className="post-full-title">{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.frontmatter.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <AuthorList authors={post.frontmatter.author} tooltip="large" />
                    <section className="post-full-byline-meta">
                      <h4 className="author-name">
                        {post.frontmatter.author.map(author => (
                          <Link key={author.name} to={`/author/${_.kebabCase(author.name)}/`}>
                            {author.name}
                          </Link>
                        ))}
                      </h4>
                      <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span> {post.timeToRead} min read
                        </span>
                      </div>
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>
              <PostContent htmlAst={post.htmlAst} />
            </article>
          </main>
          <PostAside pathname={pathname} headings={post.headings} />
        </div>

        <ReadNext
          currentPageSlug={location.pathname}
          tags={post.frontmatter.tags}
          relatedPosts={data.relatedPosts}
          pageContext={pageContext}
        />

        <Adsense pathname={pathname} />
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

const PostMainColmun = css`
  margin: 64px auto 0;
  display: flex;
  align-items: stretch;
  width: 100%;

  @media (min-width: 1170px) {
    max-width: 1040px;
    padding: 0;
  }
`;

const PostTemplate = css`
  .site-main {
    position: relative;
    background: #fff;
    padding-bottom: 4vw;
    max-width: 70%;

    @media (max-width: 840px) {
      max-width: 100%;
    }
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

export const PostFull = css`
  position: relative;
  width: 100%;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  padding: 70px 0 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 0 50px;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

const PostFullTags = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  text-transform: uppercase;
`;

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  color: var(--midgrey);
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten('0.1', colors.lightgrey)};

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    color: ${lighten('0.1', colors.darkgrey)};
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten('0.15', colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      headings {
        depth
        id
        value
      }
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        category
        tags
        excerpt
        image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author {
          name
          bio
          avatar {
            children {
              ... on ImageSharp {
                fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;
