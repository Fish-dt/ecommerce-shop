'use client';

import { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function InfiniteScrollTrigger({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = '300px',
}: InfiniteScrollTriggerProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = observerRef.current;
    if (!element || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasMore, isLoading, onLoadMore, rootMargin]);

  return <div ref={observerRef} className="h-6" aria-hidden="true" />;
}

