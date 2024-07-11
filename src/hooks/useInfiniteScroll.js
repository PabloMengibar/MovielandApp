import { useCallback, useEffect } from "react";

const useInfiniteScroll = ({ ref, keepLoading }) => {
  const callBackFn = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
        keepLoading();
    }
  }, [keepLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFn, {
      root: null,
      rootMargin: "100px",
      threshold: 1.0, 
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, callBackFn]);
};

export default useInfiniteScroll;
