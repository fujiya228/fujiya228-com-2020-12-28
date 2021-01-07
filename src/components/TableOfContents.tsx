import React from 'react';

import styled from '@emotion/styled';

import { colors } from '../styles/colors';

interface TableOfContentsProps {
  isHome?: boolean;
  isPost?: boolean;
  headings?: Array<{
    id: string;
    depth: number;
    value: string;
  }>;
}

interface TableOfContentsState {
  isOpen: boolean;
}

class TableOfContents extends React.Component<TableOfContentsProps, TableOfContentsState> {
  state = { isOpen: false };

  switchState(flag: boolean): void {
    this.setState({ isOpen: !flag });
  }

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
        <TableOfContentsOverlay className={this.state.isOpen ? 'open' : ''} onClick={() => this.switchState(this.state.isOpen)} />
        <TableOfContentsMain className={this.state.isOpen ? 'open' : ''}>
          {this.props.headings?.map(heading => {
            return (
              <TableOfContentsLinkBox key={heading.id} className={`depth-${heading.depth}`} onClick={() => this.scroll(heading.id)}>
                <a>{heading.value}</a>
              </TableOfContentsLinkBox>
            );
          })}
        </TableOfContentsMain>
        <TableOfContentsFAB className={this.state.isOpen ? 'open' : ''} onClick={() => this.switchState(this.state.isOpen)}>
          <i className="icon" />
          <i className="icon" />
          <i className="icon" />
        </TableOfContentsFAB>
      </nav>
    );
  }
}

const TableOfContentsMain = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 64px;
  left: 0;
  width: 80%;
  max-width: 330px;
  height: calc(100% - 64px);
  /* padding: 8px; */
  padding: 8px 8px 8px 0;
  /* background: ${colors.base}; */
  background: #fff;
  font-size: 16px;
  transition: .2s ease-in-out;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  z-index: 1000;

  &.open{
    transform: none;
  }

  ul {
    padding: 0 0 0 1em;
    margin: 0;
    list-style: none;
  }
  
  li {
    padding: 0;
    margin: 0;
    line-height: 32px;
    &:hover >{
      &p>a, &a{
        color: #fff;
        background: #666;
      }
    }
  }
  
  p {
    margin: 0 0 1px;
    &:hover a{
      color: #fff;
      background: #666;
    }
  }

  a {
    display: block;
    padding: 2px;
    text-decoration: none;
    color: ${colors.base};
  }

  > ul {
    padding: 0;
  }

`;

const TableOfContentsLinkBox = styled.div`
  border-radius: 0 16px 16px 0;
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

const TableOfContentsFAB = styled.div`
  position: fixed;
  left: 16px;
  bottom: calc(25% + 64px);
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  box-shadow: 0 0 8px gray;
  background: ${colors.base};
  transition: .2s ease-in-out;
  z-index: 1000;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }

  .icon {
    display: block;
    position: relative;
    top: 14px;
    width: 16px;
    height: 4px;
    margin: 0 20px;
    border-radius: 2px;
    background: #fff;
    transition: .3s ease-in-out;
    ::after {
      display: block;
      position: relative;
      left: -8px;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background: #fff;
      content: '';
    }
    + i {
      margin-top: 4px;
    }
  }

  &.open {
    left: -64px;
  }
`;

const TableOfContentsOverlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  transition: .2s ease-in-out;
  opacity: 0;
  z-index: -1;

  &.open{
    opacity: .5;
    z-index: 900;
  }
`;

export default TableOfContents;
