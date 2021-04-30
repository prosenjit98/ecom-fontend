import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddress } from '../../actions'
import { getCartItem } from '../../actions/cart.actions'
import Layout from '../../components/Layout'
import AddressForm from './AddressForm'
import PriceDetails from '../../components/PriceDetails/PriceDetails'

import './style.css'
import Address from './Address'
import CartPage from '../CartPage'


const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep" onClick={props.onClick}>
      <div className={`checkoutHeader ${props.active ? 'active' : ''}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  )
}

const CheckoutPage = (props) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);

  const [newAddress, setNewAddres] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [orderSummary, setOderSummary] = useState(false)

  const dispatch = useDispatch();
  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOderSummary(true);
  }

  useEffect(() => {
    auth.authenticate && dispatch(getUserAddress());
    auth.authenticate && dispatch(getCartItem());
  }, [auth.authenticate])

  useEffect(() => {
    const address = user.address.map(adr => ({ ...adr, selected: false, edit: false }))
    setAddress(address);
  }, [user.address])

  const selectAddress = (addr) => {
    const updatedAddr = address.map(adr => adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false })
    setAddress(updatedAddr)
  }

  const confirmDeliveryAddress = (addr) => {
    setConfirmAddress(true);
    setSelectedAddress(addr);
    setOderSummary(true);
  }

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map(adr => adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false })
    setAddress(updatedAddress)
  }

  if (!user) return <div />

  return (
    <Layout>
      <div className="cartContainer">
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={'1'}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate &&
              <div className="logedInId">
                <span style={{ fontWeight: 600 }}>{auth.user.fullName}</span>
                <span style={{ margin: '0 5px' }}>{auth.user.email}</span>
              </div>
            }
          />
          <CheckoutStep
            stepNumber={'2'}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>{
                confirmAddress ? <div>{`${selectedAddress.address} - ${selectedAddress.pincode}`}</div>
                  : address.map(adr =>
                    <Address
                      adr={adr}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      key={adr._id}
                    />
                  )}

              </>
            }
          />

          {!confirmAddress && (auth.authenticate && newAddress ?
            <AddressForm
              onSubmitForm={onAddressSubmit}
              onCancel={() => { }}
              onClick={() => setNewAddres(prev => !prev)}
            /> :
            <CheckoutStep
              stepNumber={'+'}
              title={'ADD NEW ADDRESS'}
              active={false}
              onClick={() => setNewAddres(prev => !prev)}
            />)
          }



          <CheckoutStep
            stepNumber={3}
            active={orderSummary}
            title={'ORDER SUMMARY'}
            body={
              orderSummary && <CartPage onlyProductCart={true} />
            }
          />
          <CheckoutStep
            stepNumber={4}
            title={'PAYMENT OPTIONS'}
          />
        </div>
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

export default CheckoutPage
