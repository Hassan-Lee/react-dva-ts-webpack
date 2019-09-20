import React from 'react';
import { message, notification } from 'antd';

import * as api from '@services/api';

/**
 * extends component
 *
 * @export
 * @class ComponentExt
 * @extends {React.Component<P, S>}
 * @template P
 * @template S
 */
export class ComponentExt<P = {}, S = {}> extends React.Component<P, S> {
  public readonly api = api;
  public readonly $message = message;
  public readonly $notification = notification;
}

/**
 * extends store
 *
 * @export
 * @class StoreExt
 */
export class StoreExt {
  public readonly api = api;
  public readonly $message = message;
  public readonly $notification = notification;
}
