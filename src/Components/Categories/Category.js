import React from 'react'
import {Categoriesinfo} from './CategoriesfullInfo'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'

function Category() {
  return (
    <section className={classes.category_container}>
      {
        Categoriesinfo.map((info)=>(
          
          <CategoryCard data ={info} />
        ))
      }
    </section>
  )
}

export default Category

