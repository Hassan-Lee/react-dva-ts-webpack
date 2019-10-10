import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import styles from './List.less';

interface IListProps {}

const mockData = [
  {
    name: '所有数据源',
    count: 29
  },
  {
    name: '关系数据源',
    count: 29
  },
  {
    name: '菲关系数据源',
    count: 29
  },
  {
    name: '文件数据源',
    count: 29
  },
  {
    name: '消息中间件',
    count: 29
  },
  {
    name: '搜索引擎',
    count: 29
  },
  {
    name: '接口数据源',
    count: 29
  }
];

export default class RelationList extends Component<IListProps> {
  public render() {
    return (
      <Fragment>
        {_.map(mockData, item => (
          <Row className={styles.listItem} key={item.name}>
            <Col span={20} className={styles.text}>
              {item.name}
            </Col>
            <Col span={4} className={styles.count}>
              {item.count}
            </Col>
          </Row>
        ))}
        <Row className={styles.listItem + styles.others}>
          <Col span={20}>未连通的数据源</Col>
          <Col span={4}>66</Col>
        </Row>
      </Fragment>
    );
  }
}
