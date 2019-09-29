import React, { PureComponent, Fragment } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import styles from './SiderMenu.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map(
    (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`
  );
}

const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} antd />;
  }
  return icon;
};

export interface ISilderMenuProps {}

export default class SilderMenu extends PureComponent<ISilderMenuProps> {
  private constructor(props) {
    super(props);
    this.flatMenuKeys = this.getFlatMenuKeys(props.menu);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props)
    };
  }

  getMenuMatches = (flatMenuKeys, path) =>
    this.flatMenuKeys.filter(item => {
      if (item) {
        return pathToRegexp(item).test(path);
      }
      return false;
    });

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getDefaultCollapsedSubMenus = props => {
    const {
      location: { pathname },
      flatMenuKeys
    } = props;
    return urlToList(pathname)
      .map(item => this.getMenuMatches(flatMenuKeys, item)[0])
      .filter(item => item);
  };

  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menu
   */
  getFlatMenuKeys = menu =>
    menu.reduce((keys, item) => {
      keys.push(item.path);
      if (item.children) {
        return keys.concat(this.getFlatMenuKeys(item.children));
      }
      return keys;
    }, []);

  /**
   * Find all matched menu keys based on paths
   * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
   * @param  paths: [/abc, /abc/11, /abc/11/info]
   */
  getMenuMatchKeys = (flatMenuKeys, paths) =>
    paths.reduce(
      (matchKeys, path) =>
        matchKeys.concat(
          this.flatMenuKeys.filter(item => pathToRegexp(item).test(path))
        ),
      []
    );

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  private getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { isMobile, onCollapse } = this.props;
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        // replace={itemPath === this.props.location.pathname}
        onClick={isMobile ? onCollapse : () => {}}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  private getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
  };

  /**
   * 获得菜单子节点
   */
  private getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  };

  // 转化路径
  private conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/').replace(/\/:\w+\??/, '');
    }
  };

  public render() {
    const { menu } = this.props;
    let collapsed;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        width={208}
        collapsedWidth={64}
        className={styles.sider}
      >
        <Fragment>
          <div className={styles.logo} key="logo">
            <Link to={'/home'}>
              {/* <img src="" alt="logo" /> */}
              supngin
            </Link>
            <i
              // className={collapsed ? styles.collapseOpen : styles.collapseClose}
              onClick={() => {}}
            />
          </div>
          <Menu mode="inline" theme="dark">
            {this.getNavMenuItems(menu)}
          </Menu>
        </Fragment>
      </Sider>
    );
  }
}
