import "./App.css";

import useCustomQuery from "./hooks/customQuery";
function App() {
  const { products, error, loading } = useCustomQuery("/api/products");

  if (error) {
    return <h1>Something went wrong</h1>;
  }
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
      <h1>hello world</h1>
      <h2>Number of products : {products.length}</h2>
    </>
  );
}

export default App;
