import React, { useState } from 'react'
import { generatePublicUrl } from '../../../urlConfig'
import "../style.css"

const CartItem = (props) => {
  const { _id, name, price, qty, img } = props.cartItem;
  const [quanity, setQty] = useState(qty);

  const incrementQuatity = () => {
    setQty(prevQty => prevQty + 1)
    props.onQtyInc(_id, quanity + 1)
  }

  const decrementQuatity = () => {
    if (quanity <= 1) return;
    setQty(prevQty => prevQty - 1)
    props.onQtyDec(_id, quanity - 1)
  }
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={''} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>delivery with in 3-4 days</div>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '5px 0' }}>
        <div className="quanityControl">
          <button onClick={decrementQuatity} disabled={quanity <= 1}>-</button>
          <input readOnly value={quanity} />
          <button onClick={incrementQuatity}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button className="cartActionBtn">Remove</button>
      </div>

    </div>
  )
}

export default CartItem
