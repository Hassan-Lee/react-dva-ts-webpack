import React from 'react';
import { Route } from 'react-router-dom';
import Exception from '../Exception';

class AuthorizedTab extends React.Component {
  private permissionCheck = () => {
    return true;
  };

  private render() {
    const {
      component: Component,
      render,
      authority,
      redirectPath,
      ...rest
    } = this.props;
    if (this.permissionCheck()) {
      return (
        <Route
          {...rest}
          render={props =>
            Component ? <Component {...props} /> : render(props)
          }
        />
      );
    } else {
      return <Exception type="403" style={{ minHeight: 500, height: '80%' }} />;
    }
  }
}

export default AuthorizedTab;
