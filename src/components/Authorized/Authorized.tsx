import React from 'react';
import CheckPermissions from './CheckPermissions';

interface AuthProps {
  children: any;
  authority?: any;
  noMatch?: any;
}
class Authorized extends React.Component<AuthProps, {}, any> {
  public render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
