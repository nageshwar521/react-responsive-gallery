import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (order: 'asc' | 'desc') => void;
    sortBy: 'albumId' | 'title';
    setSortBy: (field: 'albumId' | 'title') => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, sortOrder, setSortOrder, sortBy, setSortBy }) => {
    const [showForm, setShowForm] = useState<boolean>(true);

    const toggleFormVisibility = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    return (
        <header className="header">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Product Gallery</h2>
                <Button variant="primary" onClick={toggleFormVisibility}>
                    {showForm ? 'Hide Search & Sort' : 'Show Search & Sort'}
                </Button>
            </div>

            {showForm && (
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Search by Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Sort by</Form.Label>
                            <Form.Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'albumId' | 'title')}
                            >
                                <option value="albumId">Album ID</option>
                                <option value="title">Title</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Order</Form.Label>
                            <Form.Select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            )}
        </header>
    );
};

export default Header;