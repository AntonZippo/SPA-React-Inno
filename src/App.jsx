import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Aside from './components/Aside/Aside';
import Filters from './components/Aside/Filters';
import CardList from './components/CardList/CardList';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';


function App(){

const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("all");
const [searchResults, setSearchResults] = useState(null);
const [searchQuery, setSearchQuery] = useState("");
const [filterState , setFilterState] = useState(null)



  useEffect(()=>{
    fetchAllProducts();
  },[]);


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

  async function querySearch(query){
    setSearchQuery(query)

    if(!query){
      setSearchResults(null);
      return;
    }
    try{
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.products);
    }catch (error){
      console.error("Seach Error", error);
      setSearchResults([]);
    }
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setSearchResults(null);
    setSearchQuery(""); 
  }

  function clearSearch() {
    setSearchQuery("");
    setSearchResults(null);
  }

  function filterSet(topPrice,lowRate){
    setFilterState({topPrice : topPrice , lowRate : lowRate})
    console.log(topPrice,lowRate);
  }

  let displayProducts = [];
  if (searchResults !== null) {
    displayProducts = searchResults;  
  } else {
    displayProducts = filteredProducts(products); 
  }


  


  

  return (

     <BrowserRouter>
    <div className='app'>

      <Header 
        onSearch={querySearch}           
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
                />
                <Filters setFilterState={filterSet} />
              </aside>
              <div className="content">
                <CardList products={displayProducts} />
              </div>
            </div>
          } />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

      <Footer />  
    </div>
    </BrowserRouter>
  );
};


export default App;