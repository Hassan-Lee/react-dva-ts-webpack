import React from 'react';
import Authorized from './Authorized';
import { Route, Redirect } from 'react-router-dom';

interface AuthorizedProps {
  component: any;
  render: Function;
  authority?: any;
  redirectPath?: string;
  childRoutes?: [];
}

class AuthorizedRoute extends React.Component<AuthorizedProps> {
  public render() {
    const {
      component: Component,
      render,
      authority = ['admin'],
      redirectPath,
      childRoutes,
      ...rest
    } = this.props;
    return (
      <Authorized
        authority={authority}
        noMatch={
          <Route
            {...rest}
            render={() => {
              console.log('auth2');
              return <Redirect to={{ pathname: redirectPath }} />;
            }}
          />
        }
      >
        <Route
          {...rest}
          render={props =>
            Component ? (
              <Component {...props} childRoutes={childRoutes} lalla />
            ) : (
              render(props)
            )
          }
        />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
