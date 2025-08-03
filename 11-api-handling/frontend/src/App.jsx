
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
function App() {
 
  const [products, setProducts] = useState([])

  useEffect(()=>{
    (async()=> {
      const response = await axios.get("/api/products")
      console.log(response.data)
      setProducts(response.data)
    })()

  },[])

  return (
   <>
   <h1>hello world</h1>
   <h2>Number of products : {products.length}</h2>
   </>
  )
}

export default App
