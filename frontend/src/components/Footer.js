import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch(SummaryApi.categoryProduct.url);
    const data = await response.json();
    setCategories(data?.data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <footer className="bg-slate-200 mt-10 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-center mb-4">Explore Categories</h2>
        
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.category}
              to={`/product-category?category=${cat.category}`}
              className="text-xs md:text-sm px-4 py-2 bg-white text-slate-800 rounded-full shadow hover:bg-slate-800 hover:text-white transition-all capitalize"
            >
              {cat.category}
            </Link>
          ))}
        </div>

        <p className="text-center font-medium text-sm text-slate-600 mt-6">
          © {new Date().getFullYear()} Welcome to Mariam Amhan's shopping platform. I wish you happy shopping.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
