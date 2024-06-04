import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import CarouselEffect from '../../Components/Carousel/Carousel'
import Category from '../../Components/Categories/Category'
import Product from '../../Components/Product/Product'


function Landing() {
  return (
   <LayOut>
        <CarouselEffect />
        <Category />
        <Product />

    </LayOut>
  )
}

export default Landing
