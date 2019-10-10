import React, { Component } from 'react';

import RelationHeader from './components/Header';
import RelationList from './components/List';
import RelationContent from './components/Content';
import styles from './Container.less';

interface IRelationProps {}

class RelationContainer extends Component<IRelationProps> {
  public render() {
    return (
      <dl className={styles.container}>
        <dt className={styles.list}>
          <RelationList />
        </dt>
        <dd className={styles.content}>
          <RelationHeader />
          <RelationContent />
        </dd>
      </dl>
    );
  }
}
export default RelationContainer;
