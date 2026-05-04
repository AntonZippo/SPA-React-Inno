import react from "react";
import './Filters.css'
import { useRef } from "react";


function Filters({setFilterState}){

    const priceRef = useRef(null);
    const rateRef = useRef(null);

    function giveFilterProp(e){
        
        e.preventDefault();

        const topPrice = priceRef.current ? Number(priceRef.current.value) : 0;
        const lowRate = rateRef.current ? Number(rateRef.current.value) : 0;
        
        setFilterState(topPrice,lowRate)
    }

    return (
        <div className="filters">
        <h3>Filters</h3>
        <form onSubmit={giveFilterProp} >
            <p>Price less then</p>
            <input 
            ref={priceRef}
            aria-label="set Highest Price" 
            title="Price filter input" 
            placeholder="Write price"/>
            <p>Rate more then</p>
            <input 
            ref={rateRef}
            aria-label="search products" 
            title="Rate filter input" 
            placeholder="From 0 to 5"/>
            <button type="submit">Apply Filters</button>
        </form>
        
        </div>
    )
}

export default Filters;