import React, { PureComponent, Fragment } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import styles from './Menu.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map(
    (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`
  );
}

const getIcon = icon => {
  if (typeof icon === 'string') {
    return <Icon type={icon} antd />;
  }
  return icon;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
const getFlatMenuKeys = (menu: [], parent?: string) =>
  menu.reduce((keys, item) => {
    const { path, children } = item;
    keys.push({ path, parent });
    if (children) {
      return keys.concat(getFlatMenuKeys(children, path));
    }
    return keys;
  }, []);

interface IMenuProps {
  location: any;
  flatMenuKeys?: [];
}

interface IMenuState {
  collapsed: boolean;
  openKeys: [];
}

class SiderMenu extends PureComponent<IMenuProps, IMenuState> {
  private constructor(props) {
    super(props);
    const {
      menuData,
      location: { pathname }
    } = props;
    this.flatMenuKeys = getFlatMenuKeys(menuData);
    const { parent } = this.getDefaultCollapsedSubMenus(pathname);
    this.state = {
      openKeys: [parent],
      collapsed: true
    };
  }

  private getMenuMatches = (path: string) =>
    this.flatMenuKeys.filter(item => {
      if (item) {
        return pathToRegexp(item.path).test(path);
      }
      return false;
    });

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  private getDefaultCollapsedSubMenus = (pathname: string) => {
    return this.getMenuMatches(pathname)[0] || {};
  };

  private getMenuShowName = (name: string, shortName?: string): string => {
    const showName = this.state.collapsed && shortName ? shortName : name;
    return showName;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  private getMenuItemPath = (item: object) => {
    const { icon, path, name, shortName } = item;
    const itemPath = this.conversionPath(path);
    const { isMobile, onCollapse } = this.props;
    const showName = this.getMenuShowName(name, shortName);
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath}>
          {getIcon(icon)}
          <span>{showName}</span>
        </a>
      );
    }
    return (
      <Link to={itemPath} onClick={isMobile ? onCollapse : () => {}}>
        {icon}
        <span>{showName}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  private getSubMenuOrItem = (item: object) => {
    const { children, icon, name, shortName, path } = item;
    if (children && children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(children);
      if (childrenItems && childrenItems.length > 0) {
        const showName = this.getMenuShowName(name, shortName);
        return (
          <SubMenu
            title={
              icon ? (
                <span>
                  {getIcon(icon)}
                  <span>{showName}</span>
                </span>
              ) : (
                showName
              )
            }
            key={path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 获得菜单子节点
   */
  private getNavMenuItems = (menuData?: []) => {
    if (!menuData) {
      return [];
    }
    return menuData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  };

  // 转化路径
  private conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/').replace(/\/:\w+\??/, '');
    }
  };

  private isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  private handleCollapsed = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  private handleOpenChange = openKeys => {
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  };
  // Get the currently selected menu
  private getSelectedMenuKeys = pathname =>
    urlToList(pathname).map(itemPath =>
      this.getMenuMatches(this.flatMenuKeys, itemPath).pop()
    );

  private render() {
    const {
      menuData,
      location: { pathname }
    } = this.props;
    const { openKeys, collapsed } = this.state;
    return (
      <Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        width={208}
        collapsedWidth={64}
      >
        <Fragment>
          <div className={styles.title}>
            <span style={{ display: collapsed ? 'none' : 'inline-block' }}>
              小助手
            </span>
            <i onClick={this.handleCollapsed}>icon</i>
          </div>
          <Menu
            mode="inline"
            openKeys={openKeys}
            selectedKeys={[pathname]}
            onOpenChange={this.handleOpenChange}
          >
            {this.getNavMenuItems(menuData)}
          </Menu>
        </Fragment>
      </Sider>
    );
  }
}
export default SiderMenu;
