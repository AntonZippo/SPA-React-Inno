import React, { useEffect, useState } from "react";
import Aside from "../components/Aside/Aside";
import CardList from "../components/CardList/CardList";
import {
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} from "../store/api";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minPrice, setMinPrice] = useState(0);
  const [minRate, setMinRating] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 12;
  const skip = (page - 1) * limit;

  const { data: allData } = useGetAllProductsQuery(
    { limit, skip },
    { skip: searchQuery !== "" || selectedCategory !== "all" },
  );

  const { data: searchData } = useSearchProductsQuery(
    { query: searchQuery, limit, skip },
    { skip: !searchQuery },
  );

  const { data: categoryData } = useGetProductsByCategoryQuery(
    { category: selectedCategory, limit, skip },
    { skip: selectedCategory === "all" || searchQuery !== "" },
  );

  let products = [];
  let total = 0;

  if (searchQuery) {
    products = searchData?.products ?? [];
    total = searchData?.total ?? 0;
  } else if (selectedCategory !== "all") {
    products = categoryData?.products ?? [];
    total = categoryData?.total ?? 0;
  } else {
    products = allData?.products ?? [];
    total = allData?.total ?? 0;
  }

  const filteredProducts = products.filter((product) => {
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (product.rating < minRate) return false;
    return true;
  });

  const totalPages = Math.ceil((total || 0) / limit);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, minRate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <Aside
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          minRating={minRate}
          setMinRating={setMinRating}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
        />
      </aside>
      <div className="content">
        <CardList products={filteredProducts} />
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              ← Back
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              Forward →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
