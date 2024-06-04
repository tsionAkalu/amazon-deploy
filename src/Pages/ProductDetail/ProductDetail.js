import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import axios from 'axios'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/EndPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {
  const [product, setproduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const {ProductId} = useParams()
  
  useEffect(()=>{
    setIsLoading(true)
    axios.get(`${productUrl}/products/${ProductId}`)
    .then ((res)=>{
      setproduct(res.data);
      setIsLoading (false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
}, [])
  return (
    <LayOut>
      {isLoading? (<Loader/>):(<ProductCard product={product}
      flex={true}
      renderDesc={true}
      renderAdd={true}
      />)}
      
    </LayOut>
  )
}

export default ProductDetail
