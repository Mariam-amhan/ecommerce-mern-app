import SummaryApi from "../common";
import { toast } from "react-toastify";
const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const response = await fetch(SummaryApi.addToCartPrpduct.url,{
    method: SummaryApi.addToCartPrpduct.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
  const responseData = await response.json();
  if (responseData.success) {
    toast.success(responseData.message);
  }
  if (responseData.error) {
    toast.warning(responseData.message);
  }
  return responseData
};
export default addToCart;
