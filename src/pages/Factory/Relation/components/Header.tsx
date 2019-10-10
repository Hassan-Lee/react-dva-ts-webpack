import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import styles from './Header.less';

interface IRelationHeaderProps {}

class RelationHeader extends Component<IRelationHeaderProps> {
  public render() {
    return (
      <Row className={styles.header}>
        <Col span={4} className={styles.title}>
          关系数据源
        </Col>
        <Col span={16} className={styles.opera}>
          <Button>新增</Button>
          <Button>测试连通性</Button>
          <Button>删除</Button>
        </Col>
        <Col span={4} className={styles.search}>
          <Button>搜索</Button>
          <Button>排序</Button>
        </Col>
      </Row>
    );
  }
}

export default RelationHeader;
