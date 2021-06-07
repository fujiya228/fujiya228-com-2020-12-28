import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { colors } from '../styles/colors';
import { format } from 'date-fns';

export interface PostAsideProps {
  pathname: string;
  recentPosts?: {
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
}

export const PostAside: React.FC<PostAsideProps> = props => {

  return (
    <aside id="post-aside" css={PostAsideStyle}>
      <div className="StickyContainer">
        <section>
          <header>スポンサーリンク</header>
          <div className="ads" />
        </section>
        <section>
          <header>Recent Posts</header>
          {props.recentPosts?.edges.map(post => {
            // filter out drafts in production
            return (
              (!post.node.frontmatter.draft ||
                process.env.NODE_ENV !== 'production') && (
                <Link css={PostLink} to={post.node.fields.slug}>
                  <RecentPost key={post.node.fields.slug}>
                    <PostImage>
                      {post.node.frontmatter?.image?.childImageSharp?.fluid && (
                        <Img
                          alt={`${post.node.frontmatter.title} cover image`}
                          style={{ height: '100%' }}
                          fluid={post.node.frontmatter.image.childImageSharp.fluid}
                        />
                      )}
                    </PostImage>
                    <PostContent>
                      <PostTitle>{post.node.frontmatter.title}</PostTitle>
                      <PostDate>{format(new Date(post.node.frontmatter.date), 'yyyy-MM-dd')}</PostDate>
                    </PostContent>
                  </RecentPost>
                </Link>
              )
            );
          })}
        </section>
      </div>
    </aside>
  );
};

const PostAsideStyle = css`
  width: 30%;
  padding: 60px 0 0 24px;

  @media (max-width: 840px) {
    display: none;
  }

  .StickyContainer {
    position: sticky;
    top: 72px;
    :first-child {
      margin-bottom: 8px;
    }
  }

  header {
    width: 100%;
    font-size: 12px;
    border-top: 3px solid #4e4e4e;
    padding: 8px 0 8px;
    font-weight: 700;
    text-align: center;
    color: #4e4e4e;
  }
`;

const PostLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  color: ${colors.link};
  &:hover{
    text-decoration: none;
  }
`;

const RecentPost = styled.article`
  display: flex;
  width: 100%;
  margin: 8px 0;
  transition: all 0.35s ease-in-out;
  &:hover{
    opacity: 0.6;
  }
`;

const PostImage = styled.div`
  width: 72px;
  height: 72px;
`;

const PostContent = styled.div`
  width: calc(100% - 72px);
  height: 72px;
  padding: 0 0 0 8px;
  font-size: 14px;
  line-height: 24px;
`;

const PostTitle = styled.div`
  height: 48px;
  overflow: hidden;
`;

const PostDate = styled.div`
  height: 24px;
  text-align: right;
`;

