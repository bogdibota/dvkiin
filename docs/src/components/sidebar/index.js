import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import styled from 'react-emotion';
import { ExternalLink } from 'react-feather';
import config from '../../../config';
import '../styles.css';
import Tree from './tree';

const forcedNavOrder = config.sidebar.forcedNavOrder;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={ className }>
      <a href={ props.to } { ...props } />
    </li>
  );
})`
  list-style: none;

  a {
    color: #007a73;
    text-decoration: none;
    font-weight: ${ ({ level }) => (level === 0 ? 700 : 400) };
    padding: 0.45rem 0 0.45rem ${ props => 2 + (props.level || 0) * 1 }rem;
    display: block;
    position: relative;

    &:hover {
      color: #007a73 !important;
    }

    ${ props =>
  props.active &&
  `
      color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    ` } // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

const Sidebar = styled('aside')`
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #2196F3;
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(#2196F3, #6ec6ff);
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#2196F3), to(#6ec6ff));
  /* Safari 5.1, Chrome 10+ */
  background: -webkit-linear-gradient(top, #2196F3, #6ec6ff);
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(top, #2196F3, #6ec6ff);
  /* IE 10 */
  background: -ms-linear-gradient(top, #2196F3, #6ec6ff);
  /* Opera 11.10+ */
  background: -o-linear-gradient(top, #2196F3, #6ec6ff);
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #2196F3;
    background: #2196F3;
  }
  @media (min-width: 767px) and (max-width:1023px)
  {
    padding-left: 0;
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }
`;


const Divider = styled(props => (
  <li { ...props }>
    <hr/>
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;


const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={ graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    ` }
    render={ ({ allMdx }) => {
      return (
        <Sidebar>
          <ul className={ 'sideBarUL' }>
            <Tree
              edges={ allMdx.edges }
            />
            <Divider/>
            { config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={ key } to={ link.link }>
                    { link.text }
                    <ExternalLink size={ 14 }/>
                  </ListItem>
                );
              }
            }) }
          </ul>
        </Sidebar>
      );
    } }
  />
);

export default SidebarLayout;
