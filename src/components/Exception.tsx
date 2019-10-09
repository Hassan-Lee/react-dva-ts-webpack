import * as React from 'react';

interface IExceptionProps {
  text: string | number;
}

export default function Exception(props: IExceptionProps) {
  return <div>{props.text || 404}</div>;
}
