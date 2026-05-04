import react, { useEffect, useState } from "react";
import './CardList.css'

import Card from "../Card/Card";

function CardList({products}){

    if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

    return (
        <div className="card-list">
        {products.map(product => (
            <Card key={product.id} product={product}></Card>
        ))}
        </div>
    );
}

export default CardList;