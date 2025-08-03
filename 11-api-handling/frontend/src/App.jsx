import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// import useCustomQuery from "./hooks/customQuery";
function App() {
  // const { products, error, loading } = useCustomQuery("/api/products");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // API call only when debouncedSearch changes
  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(
          "/api/products?search=" + debouncedSearch,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request canceled", error.message);
          return;
        }
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  if (error) {
    return <h1>Something went wrong</h1>;
  }
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
      <h1>hello world</h1>
      {/* {loading && <h1>Loading....</h1>} */}
      {/* {error && <h1>Something went wrong</h1>} */}
      <label htmlFor="search-input">Search Products:</label>
      <input
        id="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to search products..."
        autoFocus
      />
      <h1>Products Length :{products.length}</h1>
      <h2>Products Titles:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
