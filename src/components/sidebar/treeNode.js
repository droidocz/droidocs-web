import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from '../link';

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, items, ...rest }) => {
  const isCollapsed = collapsed[url];

  const collapse = () => {
    setCollapsed(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }

  const currentUrl = location && (`${location.pathname}`.replace(/\/+$/, '') || '/')
  const active = currentUrl === url || currentUrl === config.gatsby.pathPrefix + url;

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  const canCollapse = !config.sidebar.frontLine && title && hasChildren;

  return (
    <li className={calculatedClassName}>
      {title && (
        <Link to={url} onClick={(canCollapse && isCollapsed) ? collapse : () => undefined}>
          {title}
          {canCollapse ? (
            <button onClick={collapse} aria-label="collapse" className="collapser">
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
