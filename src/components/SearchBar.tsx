import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <Form className="d-flex my-4">
            <FormControl
                type="search"
                placeholder="Search products..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Button variant="outline-success">Search</Button>
        </Form>
    );
};

export default SearchBar;