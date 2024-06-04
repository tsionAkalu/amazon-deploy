import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/EndPoints'
import Product from '../../Components/Product/Product'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'


function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const {categoryName} =useParams();
  useEffect(()=>{

  axios.get(`${productUrl}/products/category/${categoryName}`)
  .then ((res)=>{
    setResults(res.data)
    setIsLoading (false)
  }).catch((err)=>{
    console.log(err)
    // isLoading(false);
  })
}, [])

  return (
    <LayOut>
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{ padding: "30px"}}>category /{categoryName}</p>
        <hr />
       
        // setIsLoading?(
          <Loader />) :
        <div className={classes.Products_container}>
          {results?.map((Product)=>(
           <ProductCard 
            key={Product.id} 
            Product={Product}
            renderAdd={true} 
            renderDesc={false}
             />

          ))}

        </div>
        
      </section>


    </LayOut>
  );
};

export default Results
