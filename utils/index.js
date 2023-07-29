export function debounce(fn, timeout = 300) {
  let timer;
  return function debouncedFn(...args) {
    console.log(args)
    const later = () => {
      clearTimeout(timer);
      fn(...args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, timeout);
  };
}
