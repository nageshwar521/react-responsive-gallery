import React, { useState } from 'react';
import { Card, Spinner, Badge } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';

interface ProductItemProps {
    product: {
        id: number;
        albumId: number;
        title: string;
        url: string;
        thumbnailUrl: string;
        cached?: boolean;
    };
    onClick: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
    const [loading, setLoading] = useState(true);
    const [imageFailed, setImageFailed] = useState(false);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleImageError = () => {
        setLoading(false);
        setImageFailed(true);
    };

    return (
        <Card onClick={onClick} className="product-item">
            <div className="product-image-container">
                {loading && (
                    <div className="spinner-container">
                        <Spinner animation="border" size="sm" />
                    </div>
                )}
                {!imageFailed ? (
                    <Card.Img
                        variant="top"
                        src={product.thumbnailUrl}
                        alt={product.title}
                        className="responsive-img"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={loading ? { visibility: 'hidden' } : {}}
                    />
                ) : (
                    <FaImage size={60} color="gray" />
                )}
            </div>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    Album ID: {product.albumId}
                </Card.Text>
                {product.cached && (
                    <Badge pill bg="info">
                        Cached
                    </Badge>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductItem;