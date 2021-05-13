import React from 'react'
import { BiRupee } from 'react-icons/bi'
import './style.css';

const ShowPrice = (props) => {
  return <div className="product_price">
    <BiRupee />
    {props.value}
  </div>
}

export default ShowPrice
