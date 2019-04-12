import React, { Component } from 'react';
import './lazyimg.css';
export class LazyImg extends Component<{ src: string; alt: string }> {
  observer: IntersectionObserver | null = null;
  componentDidMount() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.onObserve.bind(this));
      this.observer.observe(this.refs.img as Element);
    } else {
      setTimeout(() => this.preload(this.refs.img as Element), 200);
    }
  }

  onObserve(data: IntersectionObserverEntry[]) {
    if (data[0].isIntersecting) {
      // console.log('intersection')
      this.preload(data[0].target).then(() => {
        if (this.observer) this.observer.disconnect();
      });
    }
    return;
  }

  applyImage(target: HTMLImageElement, src: string) {
    return new Promise(resolve => {
      target.src = src;
      resolve();
    });
  }

  fetchImage(url: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  preload(targetEl: Element) {
    return this.fetchImage(this.props.src)
      .then(() => this.applyImage(targetEl as HTMLImageElement, this.props.src))
      .then(() => (this.refs.img as HTMLImageElement).classList.add('loaded'));
  }

  render() {
    return <img ref="img" alt={this.props.alt} />;
  }
}
