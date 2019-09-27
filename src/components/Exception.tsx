import * as React from 'react';

interface IAppProps {
  text: string | number;
}

const Exception: React.FunctionComponent<IAppProps> = props => {
  return <div>{props.text || 404}</div>;
};

export default Exception;
