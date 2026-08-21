import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";

const categories = [
  { type: "horizontal", category: "headphones", heading: "Top Headphones" },
  { type: "horizontal", category: "watches", heading: "Popular's Watches" },
  { type: "vertical", category: "mobiles", heading: "Most Selling Mobiles" },
  { type: "vertical", category: "mouse", heading: "mouse" },
  { type: "vertical", category: "televisions", heading: "televisions" },
  { type: "vertical", category: "camera", heading: "camera" },
  { type: "vertical", category: "earbuds", heading: "Earbuds" },
  { type: "vertical", category: "speakers", heading: "speakers" },
  { type: "vertical", category: "refrigerator", heading: "refrigerator" },
  { type: "vertical", category: "trimmers", heading: "trimmers" },
];

const Home = () => {
  const [emptyCategories, setEmptyCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAllCategoryProducts = async () => {
    const emptyList = [];

    for (const item of categories) {
      const response = await fetchCategoryWiseProduct(item.category);
      if (!response?.data || response.data.length === 0) {
        emptyList.push(item.category);
      }
    }

    setEmptyCategories(emptyList);
    setLoading(false);
  };

  useEffect(() => {
    checkAllCategoryProducts();
  }, []);

  const allAreEmpty = emptyCategories.length === categories.length;

  return (
    <div>
      <BannerProduct />
      <CategoryList heading={"All Categories"} />

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : allAreEmpty ? (
        <p className="text-center py-10">No product found</p>
      ) : (
        categories.map((item, index) =>
          !emptyCategories.includes(item.category) ? (
            item.type === "horizontal" ? (
              <HorizontalCardProduct
                key={index}
                category={item.category}
                heading={item.heading}
              />
            ) : (
              <VerticalCardProduct
                key={index}
                category={item.category}
                heading={item.heading}
              />
            )
          ) : null,
        )
      )}
    </div>
  );
};

export default Home;
