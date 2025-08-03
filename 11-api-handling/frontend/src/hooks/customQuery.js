import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const useCustomQuery =(urlPath)=>{
  const [products, setProducts] = useState([])
  const [error,setError]= useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    (async()=> {
      try {
        setError(false)
        setLoading(true)
        const response = await axios.get(urlPath)
        console.log(response.data)
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    })()

  },[urlPath])
  return {
    products,
    error,
    loading,
  }
}

export default useCustomQuery;