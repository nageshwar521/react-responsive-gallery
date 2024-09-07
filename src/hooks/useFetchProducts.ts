import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL, PHOTO_ENDPOINT } from '../config';

interface Product {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    cached?: boolean;
}

interface UseFetchProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchNextPage: () => void;
}

const useFetchProducts = (): UseFetchProductsResult => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);

    const LOCAL_STORAGE_KEY = 'product_cache';

    const getCachedProducts = (page: number) => {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedData) {
            const parsedCache = JSON.parse(cachedData);
            return parsedCache[page] || null;
        }
        return null;
    };

    const updateCache = (page: number, data: Product[]) => {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        let parsedCache = cachedData ? JSON.parse(cachedData) : {};
        parsedCache[page] = data;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedCache));
    };

    const fetchProducts = async (page: number) => {
        setLoading(true);
        try {
            setError(null);
            const cachedPageData = getCachedProducts(page);
            if (cachedPageData) {
                const cachedProducts = cachedPageData.map((product: Product) => ({
                    ...product,
                    cached: true
                }));
                setProducts((prevProducts) => [...prevProducts, ...cachedProducts]);
                setLoading(false);
                return;
            }

            const response = await axios.get<Product[]>(`${API_BASE_URL}${PHOTO_ENDPOINT}?_page=${page}&_limit=20`);
            updateCache(page, response.data);
            setProducts((prevProducts) => [...prevProducts, ...response.data]);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchNextPage = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
    }, []);

    return { products, loading, error, fetchNextPage };
};

export default useFetchProducts;