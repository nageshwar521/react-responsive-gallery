import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Row, Col, Spinner, Modal, Container, Alert, Button } from 'react-bootstrap';
import ProductItem from './ProductItem';
import useFetchProducts from '../hooks/useFetchProducts';
import { useToast } from '../context/ToastContext';
import { useLazyLoad } from '../hooks/useLazyLoad';
import Header from './Header';

// Lazy load the ProductDetails component
const ProductDetails = React.lazy(() => import('./ProductDetails'));

interface Product {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const ProductGallery: React.FC = () => {
    const { products, loading, error, fetchNextPage } = useFetchProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { showToast } = useToast();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortBy, setSortBy] = useState<'albumId' | 'title'>('albumId');
    const [showBackToTop, setShowBackToTop] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useLazyLoad({
        targetRef: loadMoreRef,
        onLoadMore: fetchNextPage,
    });

    useEffect(() => {
        if (error) {
            showToast('Error: Failed to load products');
        }
    }, [error, showToast]);

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.sort((a, b) => {
            if (sortBy === 'albumId') {
                const albumIdA = Number(a.albumId);
                const albumIdB = Number(b.albumId);
                return sortOrder === 'asc' ? albumIdA - albumIdB : albumIdB - albumIdA;
            } else {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
            }
        });
    }, [products, searchTerm, sortOrder, sortBy]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const totalProducts = products.length;
    const showingProducts = filteredProducts.length;

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Container fluid>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <div className="product-count">
                <div>Showing {showingProducts} of {totalProducts} products</div>
            </div>

            <div className="gallery-content">
                <Row>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <Col key={`${product.albumId}_${product.id}_${index}`} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: 20 }}>
                                <ProductItem product={product} onClick={() => handleProductClick(product)} />
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <Alert variant="info">No products available. Please adjust your search or sorting criteria.</Alert>
                        </Col>
                    )}
                </Row>

                {loading && (
                    <div className="loader">
                        <Spinner animation="border" size="sm" />
                        <span style={{ marginLeft: '10px' }}>Loading more products...</span>
                    </div>
                )}

                <div ref={loadMoreRef} style={{ height: '20px' }} />

                {selectedProduct && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <ProductDetails product={selectedProduct} onClose={handleCloseModal} />
                        </Modal>
                    </Suspense>
                )}

                {showBackToTop && (
                    <Button
                        variant="primary"
                        onClick={handleScrollToTop}
                        className="go-to-top"
                    >
                        Back to Top
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default ProductGallery;