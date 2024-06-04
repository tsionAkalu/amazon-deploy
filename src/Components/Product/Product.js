import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css' 
import Loader from '../Loader/Loader'

function Product() {
    const [Products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=> {
        axios.get('https://fakestoreapi.com/products')
        .then((res)=>{
            setProducts(res.data)
            setIsLoading (false)
        }).catch((err)=>{
            console.log(err)
            isLoading(false)
        })

    }, [])

  return (
    
    <>
    {
        isLoading?(<Loader/>): (<section className={classes.Products_container}>{
            Products?.map((singleProduct)=>{
                return (
                    <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id}/>) 
            })
    }
    </section>)
        
    }
    </>
  )
}

export default Product
