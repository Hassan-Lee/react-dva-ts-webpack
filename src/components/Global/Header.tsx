import * as React from 'react';
import { Layout } from 'antd';
import styles from './global.less';
const { Header } = Layout;
export interface IGlobalHeaderProps {}

export default class GlobalHeader extends React.Component<IGlobalHeaderProps> {
  public render() {
    return <Header className={styles.header}>header12121</Header>;
  }
}
