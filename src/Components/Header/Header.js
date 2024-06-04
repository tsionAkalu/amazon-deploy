import React, { useContext } from 'react'
import classes from "./Header.module.css";
import { Link } from 'react-router-dom';
import {SlLocationPin} from "react-icons/sl";
import {BsSearch } from "react-icons/bs";
import LowerHeader from './LowerHeader';
import { BiCart } from "react-icons/bi";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/FireBase"


const Header=()=> {

    const [{user, basket},dispatch]=useContext(DataContext)
    const totalItem = basket?.reduce((amount, item)=>{
        return item.amount + amount;
    },0);
    
    console.log(basket.length)


  return (
    <>
        <section className={classes.fixed}>
            <div className={classes.header_container}>
              {/* logo section */}
              <div className= {classes.logo_container}>
                <Link to='/'>
                    <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazon logo' />
                </Link>

                <div className={classes.delivery}>
                    <span>
                        <SlLocationPin />
                    </span>
                    <div>
                        <p>Deliver to</p>
                        <span>USA</span>
                    </div>
            </div>

            </div>
            {/* search section */}

            <div className={classes.search}>
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" />
                <BsSearch size={38} />
            </div>
            <div className={classes.order_container}>
                <Link to="" className={classes.language}>            
                <img src="https://img.freepik.com/premium-vector/vector-american-flag-background_921039-1687.jpg?w=1060" alt="flag" />

                <select name="" id="">
                    <option value="">EN</option>
                </select>
                </Link>
                {/* {three components} */}
            <Link to={!user && "/auth"}>
                <div>
                    {user ? (
                        <>
                        <p>Hello, {user?.email?.split("@")[0]}</p>
                        <span onClick={()=>auth.signOut()}>Sign Out</span>
                        </>
                
                    ) : (
                        <>
                        <p>Hello, Sign In</p>
                        <span>Account & Lists</span>
                        
                        </>
                        
                    )}
                   
                    </div>
               
            </Link>
            {/* order */}
            <Link to="/orders">
                <p>Return</p>
                <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
            <span>{totalItem}</span>

            </Link>

            </div>
            </div>
            
            </section>
        <LowerHeader />
            </>
  );
};

export default Header
