import react, { useEffect, useState , useRef } from "react";
import './Header.css';
import { Link } from "react-router-dom";

function Header({ onSearch, searchQuery, onClearSearch }) {

    const [searchInput, setSearchInput] = useState(searchQuery || "");

    const inputRef = useRef(null);

    useEffect(()=>{
        setSearchInput(searchQuery || "");
    },[searchQuery]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        onSearch(searchInput)
    };

    function handleClear(){
        setSearchInput("");
        onClearSearch();
    }

    return (
    <div className="header">
        <h2>Products things company</h2>
       <form className="search" onSubmit={handleSubmit}>
            <input 
            ref = {inputRef}
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} 
            aria-label="search products" 
            title="search" 
            placeholder="Search products..." />
            <button type="submit" aria-label="search button">🔍</button>
            {searchInput && (
                <button type="button" onClick={handleClear} aria-label="Clear button" >
                   ✖ 
                </button>
            )}
        </form>
    <div className="autorize">
        <Link to ="/login">
            <button>Sign In</button>
        </Link>
        <Link to ="/login">
            <button>Registration</button>
        </Link>
        
    </div>
    </div>
    );
}

export default Header;