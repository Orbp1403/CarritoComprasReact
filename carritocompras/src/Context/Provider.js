import ProductosContext from "./index";

export default function ProductosProvider({ children }) {
  return <ProductosContext.Provider>{children}</ProductosContext.Provider>;
}
