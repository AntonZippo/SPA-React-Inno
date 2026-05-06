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


function App(){

const [selectedCategory, setSelectedCategory] = useState("all");
const [searchQuery, setSearchQuery] = useState("");
const [maxPrice, setMaxPrice] = useState(10000)
const [minPrice, setMinPrice] = useState(0)
const [minRate, setMinRating] = useState(0)
const [filterState , setFilterState] = useState(null)


const { data: allData } = useGetAllProductsQuery();
const { data: searchData } = useSearchProductsQuery(searchQuery, {
  skip: !searchQuery, 
});

async function fetchAllProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=0");
  const data = await response.json();
  setProducts(data.products);
}


function filteredProducts(products){
  return products.filter(product => {
  if (selectedCategory !== "all" && product.category !== selectedCategory) {
    return false;
  }
  return true;
});
};

function handleCategoryChange(category) {
  setSelectedCategory(category);
  setSearchQuery(""); 
}

function clearSearch() {
  setSearchQuery("");
}

function filterSet(topPrice,lowRate){
  setFilterState({topPrice : topPrice , lowRate : lowRate})
  console.log(topPrice,lowRate);
}




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
                <CardList products={finalProduct} />
              </div>
            </div>
          }/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

      <Footer />  
    </div>
  </BrowserRouter>
  );
};


export default App;