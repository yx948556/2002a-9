// 防抖
export function _debounce(fn,delay) {
  const delay = delay || 200;
  let timer;
  return function () {
    let th = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 节流
export function _throttle(fn, interval) {
  let last;
  let timer;
  const interval = interval || 200;
  return function () {
    let th = this;
    let args = arguments;
    let now = +new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              fn.apply(th, args);
          }, interval);
      } else {
          last = now;
          fn.apply(th, args);
      }
  }
}



// 在需要的组件中引用import { _debounce } from "@/utils/untils.js";