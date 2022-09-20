import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';

interface TableOfContentsProps {
  headings?: Array<{
    id: string;
    depth: number;
    value: string;
  }>;
}

class TableOfContents extends React.Component<TableOfContentsProps> {
  scroll(id: string): any {
    const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
    const offset = window.pageYOffset;
    window.scrollTo({
      top: top + offset,
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <nav>
        <TableOfContentsMain>
          {this.props.headings?.map(heading => {
            return (
              <TableOfContentsLinkBox key={heading.id} className={`depth-${heading.depth}`} onClick={() => this.scroll(heading.id)}>
                <a>{heading.value}</a>
              </TableOfContentsLinkBox>
            );
          })}
        </TableOfContentsMain>
      </nav>
    );
  }
}

const TableOfContentsMain = styled.div`
  padding: 8px 8px 8px 0;
  background: #fff;
  font-size: 16px;
`;

const TableOfContentsLinkBox = styled.div`
  border-radius: 0 16px 16px 0;

  a {
    display: block;
    padding: 2px;
    text-decoration: none;
    color: ${colors.base};
  }

  &.depth-2 a {
    padding-left: 1em;
  }
  &.depth-3 a {
    padding-left: 2em;
  }
  &.depth-4 a {
    padding-left: 3em;
  }
  &.depth-5 a {
    padding-left: 4em;
  }
  &.depth-6 a {
    padding-left: 5em;
  }
  :hover {
    color: #fff;
    background: #f1f3f4;
    cursor: pointer;
  }
`;

export default TableOfContents;
