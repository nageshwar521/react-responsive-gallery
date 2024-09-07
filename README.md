# Product Gallery

A responsive product gallery with features like search, sort, lazy loading, infinite scrolling, image loading with a fallback icon, and a back-to-top button. Built with React and Bootstrap.

## Features

- Search products by name
- Sort products by album ID or title
- Lazy loading for better performance
- Infinite scrolling for seamless browsing
- Image loading with fallback icon when images fail to load
- Back-to-top button for easy navigation

## Technologies Used

- React
- React.lazy() and Suspense for code splitting
- Bootstrap
- React-Bootstrap
- Custom Hooks (for fetching and filtering products)
- Intersection Observer for infinite scrolling
- LocalStorage for caching API data

## Installation

```bash
git clone https://github.com/pnr-freelancer/react-responsive-gallery.git
cd react-responsive-gallery
npm install
npm start