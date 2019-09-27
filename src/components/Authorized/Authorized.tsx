import React from 'react';
import CheckPermissions from './CheckPermissions.tsx';

class Authorized extends React.Component {
  private render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
