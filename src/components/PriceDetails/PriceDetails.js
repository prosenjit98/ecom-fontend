import React from 'react'
import Card from '../../UI/Card'
import './style.css'

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Price Details"} style={{ maxWidth: '380px' }}>
      <div style={{ padding: '20px', boxSizing: 'border-box' }}>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Price ({props.totalItem} items)</div>
          <div>{props.totalPrice}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Delivery Charge</div>
          <div>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Total Amount</div>
          <div>{props.totalPrice}</div>
        </div>
      </div>
    </Card>
  )
}

export default PriceDetails
