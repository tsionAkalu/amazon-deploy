import React from 'react'
import classes from "./Category.module.css"
import { Link } from 'react-router-dom'

function CategoryCard({data}) {
  // console.log (data) *16 { title: 'Jewelery', name: 'Jewelery', imgLink:}
  return (
    <div className={classes.Category}>

        <a href={`/category/:categor${data.name}`}>
            <span>
                <h2>{data?.title}</h2>
            </span>
            <img src={data?.imgLink} alt='' />
            <p>Shop now</p>
        </a>
      
    </div>
  )
}

export default CategoryCard
