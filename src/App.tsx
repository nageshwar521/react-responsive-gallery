import React from 'react';
import { ToastProvider } from './context/ToastContext';
import ProductGallery from './components/ProductGallery';
import './App.scss';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <div className="main-container">
        <ProductGallery />
      </div>
    </ToastProvider>
  );
};

export default App;