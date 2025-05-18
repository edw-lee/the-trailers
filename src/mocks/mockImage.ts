const DELAY = 300;
const cache = new Set<string>();

export class MockImage extends EventTarget {
  _src: string = "";

  constructor() {
    super();
    return this;
  }

  get src() {
    return this._src;
  }

  set src(src: string) {
    if (!src) {
      return;
    }
    this._src = src;
    this.onSrcChange();
  }

  get complete() {
    return !this.src || cache.has(this.src);
  }

  get naturalWidth() {
    return this.complete ? 300 : 0;
  }

  onSrcChange() {
    setTimeout(() => {
      this.dispatchEvent(new Event("load"));
      cache.add(this.src);
    }, DELAY);
  }
}
