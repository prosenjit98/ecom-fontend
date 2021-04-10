import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCard } from '../../actions/cart.actions'
import Layout from '../../components/Layout'
import Card from '../../UI/Card'
import CartItem from './CartItem'
import './style.css'

const CartPage = (props) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  const onQtyInc = (_id, qty) => {
    const item = cart.cartItems[_id]
    dispatch(addToCard({ _id, name: item.name, price: item.price, img: item.img }, 1))
  }

  const onQtyDec = (_id, qty) => {
    const item = cart.cartItems[_id]
    dispatch(addToCard({ _id, name: item.name, price: item.price, img: item.img }, -1))
  }
  return (
    <Layout>
      <div className="cartContainer">
        <Card
          headerLeft={'My Cart'}
          headerRight={<div>Deliver to</div>}>
          {Object.keys(cartItems).map((key, index) =>
            <CartItem
              key={key}
              cartItem={cartItems[key]}
              onQtyDec={onQtyDec}
              onQtyInc={onQtyInc}
            />
          )}

        </Card>
        <Card style={{ width: '500px' }} headerLeft={'Price'}>
        </Card>
      </div>
    </Layout>
  )
}

export default CartPage
