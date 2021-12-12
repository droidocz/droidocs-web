import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// import Link from './link';
import config from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';

const extractItems = (item) => {
  if (Array.isArray(item)) {
    return item.reduce((acc, current) => [...acc, extractItems(current)], [])
  }

  let items = []
  if (item.title) {
    const itemId = item.title
      ? item.title.replace(/\s+/g, '').toLowerCase()
      : '#';

    items = [...items, (
      <ListItem key={itemId} to={`#${itemId}`} level={1}>
        {item.title}
      </ListItem>
    )];
  }
  if (item.items && item.items.length) {
    items = [...items, extractItems(item.items)];
  }

  return items
}

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let navItems = [];

      let finalNavItems

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        const navItems = allMdx.edges.map((item, index) => {
          let innerItems;

          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {

              if (item.node.tableOfContents.items) {
                innerItems = extractItems(item.node.tableOfContents.items)
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <Sidebar>
            <ul className={'rightSideBarUL'}>
              <li className={'rightSideTitle'}>CONTENTS</li>
              {finalNavItems}
            </ul>
          </Sidebar>
        );
      } else {
        return (
          <Sidebar>
            <ul></ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
