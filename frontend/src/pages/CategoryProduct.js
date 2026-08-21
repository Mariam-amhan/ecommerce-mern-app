import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const [sortBy, setSortBy] = useState("")

  console.log("sort by", sortBy)

  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }

        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    // format for url chnage when chnage on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target

    setSortBy(value)
    
    if(value === "asc"){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value === "dsc"){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }


  useEffect(()=> {

  },[sortBy])


  return (
    // params?.categoryName
    <div className=" container mx-auto p-4">
      {/** desltop version */}

      <div className=" hidden lg:grid grid-cols-[200px,1fr] ">
        {/** left side */}

        <div className=" bg-white p-2 min-h-[calc(100vh-150px)] overflow-y-scroll">
          {/** sort by */}
          <div className="">
            <h3 className=" text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Sort By
            </h3>

            <form className=" text-sm flex flex-col gap-2 py-2 px-1">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/** filter by  */}

          <div className="">
            <h3 className=" text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Category
            </h3>

            <form className=" text-sm flex flex-col gap-2 py-2 px-1">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className=" flex items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      value={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/** right side (product) */}

        <div className=" px-2">

          <p className=" py-4 font-medium text-slate-800">Search Results : {data.length}</p>
         <div className="  h-[calc(100vh-200px)] overflow-y-scroll scrollbar-none  ">
          {
            data.length !== 0 && (

              <VerticalCard data={data} />
            )
          }
         </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
