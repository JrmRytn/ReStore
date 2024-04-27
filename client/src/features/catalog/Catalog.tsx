import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
  fetchProductsAsync,
  productSelectors,
} from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);

  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <Loading message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
