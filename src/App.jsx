import React, { use, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Aside from './components/Aside/Aside';
import CardList from './components/CardList/CardList';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import { useGetAllProductsQuery, useSearchProductsQuery } from './store/api';
import NotFound from './pages/NotFound';

function App(){

const [selectedCategory, setSelectedCategory] = useState("all");
const [searchQuery, setSearchQuery] = useState("");
const [maxPrice, setMaxPrice] = useState(10000)
const [minPrice, setMinPrice] = useState(0)
const [minRate, setMinRating] = useState(0)
const [filterState , setFilterState] = useState(null)
const [page, setPage] = useState(1);

const limit = 12;
const skip = (page - 1) * limit;

const { data: allData } = useGetAllProductsQuery({ limit: 0, skip: 0 });
const { data: searchData } = useSearchProductsQuery(
  { query: searchQuery, limit: 0, skip: 0 },
  { skip: !searchQuery }
);

let rawProducts = [];

  if (searchQuery) {
    rawProducts = searchData?.products ?? [];
  }else{
    rawProducts = allData?.products ?? [];
  };

const finalProduct = rawProducts.filter((product) => {
  if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
  if (product.price < minPrice || product.price > maxPrice) return false;
  if (product.rating < minRate) return false;
  return true;
});

const totalPages = Math.ceil(finalProduct.length / limit);
const paginatedProducts = finalProduct.slice(skip, skip + limit);

useEffect(() => {
  setPage(1);
}, [searchQuery, selectedCategory, minPrice, maxPrice, minRate]);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [page]);

function handleCategoryChange(category) {
  setSelectedCategory(category);
  setSearchQuery(""); 
}

function clearSearch() {
  setSearchQuery("");
}

return (

  <BrowserRouter>
    <div className='app'>
      <Header 
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
      onClearSearch={clearSearch}
      /> 
        <Routes>
          <Route path="/" element={
            <div className="main-layout">
              <aside className="sidebar">
                <Aside
                  selectedCategory={selectedCategory}      
                  onSelectCategory={handleCategoryChange}
                  maxPrice = {maxPrice} 
                  setMaxPrice = {setMaxPrice}
                  minPrice = {minPrice}
                  setMinPrice = {setMinPrice}
                  minRating = {minRate}
                  setMinRating = {setMinRating}
                />
              </aside>
              <div className="content">
                <CardList products={paginatedProducts} />
                {totalPages > 1 && (
                  <div className="pagination">
                    <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                      ← Back
                    </button>
                    <span>Page {page} from {totalPages}</span>
                    <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                      Forward →
                    </button>
                  </div>
                )}
              </div>
            </div>
          }/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      <Footer />  
    </div>
  </BrowserRouter>
  );
};


export default App;