import React, { useState,useContext } from 'react';
import classes from './SignUp.module.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {auth } from "../../Utility/FireBase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {CircleLoader } from "react-spinners"
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type';
 
function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp:false,

  });

  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  // console.log(user);

  const authHandler = async(e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if(e.target.name == "signin"){

    // firebase auth

        setLoading({...loading, signIn: true})
        signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
         
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user,

          });
          setLoading({...loading, signIn: false});
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err)=> {
          setError(err.message);
          setLoading(false);
        });

    }else {
      setLoading({...loading, signUp: true});
      createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo)=> {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
    });
    setLoading({...loading, signUp: false });
    navigate(navStateData?.state?.redirect || "/");
  })
  .catch((err)=> {
    setError(err.message);
    setLoading(false);

    });
  } 

  };
  return (
  <section className={classes.login}>

  {/* logo */}
  <Link to={"/"}>
  <img src="https://pngimg.com/uploads/amazon/amazon_PNG1.png" alt="amazon logo" />

  </Link>
  {/* form */}
  <div className={classes.login_container}>
    <h1>Sign In</h1>
    {navStateData?.state?.msg && (
      <small 
        style={{
          padding: "5px",
          textAlign: "center",
          color: "red",
          fontWeight: "bold",
        }}
        >
          {navStateData?.state?.msg}
        </small>
    )}
    <form action="">
      <div>
        <label htmlFor='email'>Email</label>
        <input 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)} 
        type="email" 
        id="email" />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input value={password} 
        onChange={(e)=>setPassword(e.target.value)} 
        type="password" 
        id="password" />
      </div>
      <button 
      type="submit" 
      onClick={authHandler} 
      name="signin"
      className={classes.login_signInButton} >
        {loading.signIn ? (
          <CircleLoader color="#000" size={15}></CircleLoader>
        ) : (
        "Sign In"
        )}
        </button>
    </form>

    {/* agreement */}
    <p>By signing-in you agree to the AMAZON FAKE   CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice. 
    </p> 

    {/* create account btn */}
    <button 
    type="submit" 
    onClick={authHandler} 
    name="signup"
    
    className={classes.login_registerButton}>
      {loading.signUp ? (
          <CircleLoader color="#000" size={15}></CircleLoader>
        ) : (
          "Create your Amazon Account"
        )}
    </button>
    {error && ( 
      <small style={{paddingTop: "5px", color: "red"}}>{error}</small>)}
  </div>
  </section>
    
  );   
}

export default Auth
