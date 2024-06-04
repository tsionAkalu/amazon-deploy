import React, {useContext, useState} from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard";
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/FireBase';
import { useNavigate } from 'react-router-dom';
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);
  
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
},0);

const total = basket?.reduce((amount, item) => {
  return item.price * item.amount + amount;
}, 0);

const [cardError, setCardError] = useState(null);
const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e)=> {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message): setCardError("")
  };

  const handlePayment = async(e) => {
    e.preventDefault();

    try {
      setProcessing(true)
       // backend || function contate to the clieint
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total= ${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // client side confirmation (react side confirmation)

      const { paymentIntent} = await stripe.confirmCardPayment(
        clientSecret, 
        {
          payment_method: {
            card: elements.getElement(CardElement)
        },
        });
        // console.log(paymentIntent);

   
    // after confermation  --> order firestore database save, clear basket

    await db.collection("users")
    .doc(user.uid)
    .collection("orders")
    .doc(paymentIntent.id)

    .set({
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });

    // empty basket
    dispatch({
      type: Type.EMPTY_BASKET,
    });


    
      navigate("/orders", { state: { msg: "you have placed a new order" } });
      setProcessing(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (

   <LayOut>
    {/* Header */}
    <div className={classes.Payment_header}>
      Checkout({totalItem}) items
    </div>
    {/* payment method */}
    <section className={classes.Payment}>
      {/* address */}
      <div className={classes.flex}>
        <h3>Delivery Address</h3>
        <div>
          <div>{user?.email}</div>
          <div>4105 Nancy PL</div>
          <div>Shoreview, MN</div>
        </div>
      </div>
      <hr />

      {/* product */}
      <div className={classes.flex}>
      <h3>Review item and delivery</h3>
      <div>
        {
          basket?.map((item) => (
          <ProductCard product={item} flex={true}/>
        ))}
      </div>
      </div>
      <hr />

      {/* card form */}
      <div className={classes.flex}>
        <h3>Payment methods</h3>
        <div className={classes.Payment_card_container}>
          <div className={classes.Payment_details}>
            <form onSubmit={handlePayment}  action=""> 
              {/* error */}
              {cardError && (
                <small style={{color: "red"}}>{cardError}</small>)}

                {/* card element */}
              <CardElement onChange={handleChange} />

              {/* price */}
              <div className={classes.payment_price}>
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order |</p> <CurrencyFormat amount={total} />
                  </span>
                </div>
                <button type="submit">
                  {processing ? (

                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ): (
                      "Pay Now"
                  )}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
   </LayOut>
  );
}




export default Payment;
