import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
};

export function useInView(options: UseInViewOptions = {}) {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.2,
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(entry.target);
          return;
        }

        if (!triggerOnce) setInView(false);
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [root, rootMargin, threshold, triggerOnce]);

  return { ref, inView };
}

export default useInView;
