import * as React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
export interface IGlobalHeaderProps {}

export default class GlobalHeader extends React.Component<IGlobalHeaderProps> {
  public render() {
    return <Footer>footer</Footer>;
  }
}
