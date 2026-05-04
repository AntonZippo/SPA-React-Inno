import react from "react";
import { useEffect,useState } from "react";
import './Aside.css';

function Aside({selectedCategory, onSelectCategory}){

const [categories,setCategories] = useState([]);


useEffect(()=>{
   
    async function GetCategories() {
        const response = await fetch("https://dummyjson.com/products/category-list");
        const data = await response.json();
        setCategories(data);  
    }
    
    GetCategories();
    console.log("render aside");

},[]);



    return (
    <div className="categories">
        <h3>Categories</h3>
      <button 
        className={selectedCategory === "all" ? "active" : ""}
        onClick={() => onSelectCategory("all")}
      >All</button>

      {categories.map(cat => (
        <button
          key={cat}
          className={selectedCategory === cat ? "active" : ""}
          onClick={() => onSelectCategory(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Aside;
