import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';

interface ProductDetailsProps {
    product: {
        id: number;
        albumId: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    };
    onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
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
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="image-container">
                    {loading && (
                        <div className="spinner-container">
                            <Spinner animation="border" size="sm" />
                        </div>
                    )}
                    {!imageFailed ? (
                        <img
                            src={product.url}
                            alt={product.title}
                            className="img-fluid responsive-img"
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={loading ? { visibility: 'hidden' } : {}}
                        />
                    ) : (
                        <FaImage size={100} color="gray" />
                    )}
                </div>
                <h5>{product.title}</h5>
                <p><strong>Album ID:</strong> {product.albumId}</p>
                <p><strong>Photo ID:</strong> {product.id}</p>
            </Modal.Body>
        </Modal>
    );
};

export default ProductDetails;