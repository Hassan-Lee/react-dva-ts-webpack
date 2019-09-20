import React from 'react';

interface Size {
  width: number;
  height: number;
}

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  children?: (props: Size) => React.ReactNode;
}

interface IS {
  height: number;
  width: number;
}

class AutoSizer extends React.Component<IP, IS> {
  private state = { height: 0, width: 0 };

  private containerRef: HTMLDivElement = null;
  private timer: NodeJS.Timer = null;

  public listenResize = (): void => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setSize();
    }, 100);
  };

  public setSize = (): void => {
    if (this.containerRef) {
      const { clientHeight, clientWidth } = this.containerRef;
      this.setState({ height: clientHeight, width: clientWidth });
    }
  };

  public setRef = (ref: HTMLDivElement): void => {
    this.containerRef = ref;
    this.setSize();
  };

  public bindOrUnbindResize = (type: 'bind' | 'unbind'): void => {
    const listener = type === 'bind' ? window.addEventListener : window.removeEventListener;
    listener('resize', this.listenResize, false);
  };

  private componentDidMount(): void {
    this.bindOrUnbindResize('bind');
  }

  private componentWillUnmount(): void {
    this.bindOrUnbindResize('unbind');
  }

  public render(): ReactNode {
    const { className, style, children } = this.props;
    const { width, height } = this.state;
    return (
      <div className={className} style={style} ref={this.setRef}>
        {children({ width, height })}
      </div>
    );
  }
}

export default AutoSizer;
