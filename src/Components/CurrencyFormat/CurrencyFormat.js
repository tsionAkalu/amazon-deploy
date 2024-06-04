import React from 'react'
import numeral from 'numeral'

const CurrencyFormat =({amount})=> {
    const formattedAmount = numeral(amount).format("$0, 0.00")
     return <div>{formattedAmount} </div>
 } 
  
export default CurrencyFormat





// import React from "react";
// import numeral from 'numeral'


// const CurrencyFormat =({amaount})=>{
//     const formattedAmaount = numeral(amaount).format("$0,0.00")
//     return <div>{formattedAmaount}</div>
// }

// export default CurrencyFormat
