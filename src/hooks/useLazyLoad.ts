import { RefObject, useEffect } from "react";

interface UseLazyLoadProps {
    targetRef: RefObject<Element>;
    threshold?: number;
    rootMargin?: string;
    onLoadMore: () => void;
}

export const useLazyLoad = ({ targetRef, threshold = 0, rootMargin = '0px', onLoadMore }: UseLazyLoadProps) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onLoadMore();
            }
        }, { threshold, rootMargin });

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        }
    }, [targetRef, threshold, rootMargin, onLoadMore]);
};