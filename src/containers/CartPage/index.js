import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCard, getCartItem, removeCartItem } from '../../actions/cart.actions'
import Layout from '../../components/Layout'
import { MaterialButton } from '../../components/MaterialUI'
import Card from '../../UI/Card'
import CartItem from './CartItem'
import PriceDetails from '../../components/PriceDetails/PriceDetails'
import './style.css'

const CartPage = (props) => {
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch();
  // const cartItems = cart.cartItems

  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  useEffect(() => {
    dispatch(getCartItem())
  }, [auth.authenticate])

  const onQtyInc = (_id, qty) => {
    const item = cart.cartItems[_id]
    dispatch(addToCard({ _id, name: item.name, price: item.price, img: item.img }, 1))
  }

  const onQtyDec = (_id, qty) => {
    const item = cart.cartItems[_id]
    dispatch(addToCard({ _id, name: item.name, price: item.price, img: item.img }, -1))
  }

  const handleRemoveItemClick = (_id) => {
    const payload = { productId: _id }
    dispatch(removeCartItem(payload))
  }

  if (props.onlyProductCart) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) =>
          <CartItem
            key={key}
            cartItem={cartItems[key]}
            onQtyDec={onQtyDec}
            onQtyInc={onQtyInc}
            handleRemoveItemClick={handleRemoveItemClick}
          />
        )}
      </>
    )
  }
  return (
    <Layout>
      <div className="cartContainer">
        <Card
          headerLeft={'My Cart'}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) =>
            <CartItem
              key={key}
              cartItem={cartItems[key]}
              onQtyDec={onQtyDec}
              onQtyInc={onQtyInc}
              handleRemoveItemClick={handleRemoveItemClick}
            />
          )}

          <div className="cartCheckoutbtn">
            <div>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push('/checkout')}
              />
            </div>
          </div>

        </Card>
        {/* <Card style={{ width: '380px' }} headerLeft={'Price'}>
        </Card> */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce(((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty
          }), 0)}
        />
      </div>
    </Layout>
  )
}

export default CartPage
