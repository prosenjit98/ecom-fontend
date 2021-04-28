import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddress } from '../../actions'
import Layout from '../../components/Layout'
import { MaterialButton } from '../../components/MaterialUI'
import AddressForm from './AddressForm'
import Card from '../../UI/Card'
import './style.css'


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
  const [newAddress, setNewAddres] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const dispatch = useDispatch();
  const onAddressSubmit = () => {

  }

  useEffect(() => {
    auth.authenticate && dispatch(getUserAddress())
  }, [auth.authenticate])

  useEffect(() => {
    const address = user.address.map(adr => ({ ...adr, selected: false, edit: false }))
    setAddress(address);
  }, [user.address])

  const selectAddress = (addr) => {
    const updatedAddr = address.map(adr => adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false })
    setAddress(updatedAddr)
  }

  const confirmDelivaryAddress = (addr) => {
    setConfirmAddress(true);
    setSelectedAddress(addr);
  }

  if (!user) return <div />

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: 'flex-start', padding: '5px 40px' }}>
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
            active={!confirmAddress}
            body={
              <>{
                confirmAddress ? "we are going to show address" :
                  address.map(adr =>
                    <div className="flexRow addressContainer" key={adr._id}>
                      <div>
                        <input name="address" type="radio" onClick={() => selectAddress(adr)} />
                      </div>
                      <div className="flexRow sb addressinfo">
                        <div style={{ paddingLeft: "20px" }}>
                          <div>
                            <span>{adr.name}</span>
                            <span>{adr.addressType}</span>
                            <span>{adr.mobileNumber}</span>
                          </div>
                          <div>{adr.address}</div>
                          {adr.selected &&
                            <MaterialButton
                              title="DELIVERY HERE"
                              style={{ width: '250px', paddingTop: '20px' }}
                              onClick={() => confirmDelivaryAddress(adr)}
                            />}
                        </div>
                        {adr.selected && <div>edit</div>}
                      </div>

                    </div>
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
            title={'ORDER SUMMARY'}
          />
          <CheckoutStep
            stepNumber={4}
            title={'PAYMENT OPTIONS'}
          />
        </div>
        <Card style={{ width: '380px' }} headerLeft={'Price'}>
        </Card>
      </div>
    </Layout>
  )
}

export default CheckoutPage
