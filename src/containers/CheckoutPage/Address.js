import React from 'react'
import { MaterialButton, Anchor } from '../../components/MaterialUI'
import AddressForm from './AddressForm'
import './style.css'

const Address = (props) => {
  const { adr, selectAddress, enableAddressEditForm, confirmDeliveryAddress, onAddressSubmit } = props
  return (
    <div className="flexRow addressContainer" key={adr._id}>
      <div>
        <input name="address" type="radio" onClick={() => selectAddress(adr)} />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (<div style={{ width: '100%' }}>
          <div className="addressDetails">
            <div>
              <span className="addressName">{adr.name}</span>
              <span className="addressType">{adr.addressType}</span>
              <span className="addressMobileNumber">{adr.mobileNumber}</span>
            </div>
            {adr.selected && <Anchor
              name="EDIT"
              onClick={() => enableAddressEditForm(adr)}
              style={{ fontWeight: '500', color: '#2874f0' }}
            />
            }
          </div>
          <div className="fullAddress">{adr.address} <br />{" "}
            {`${adr.state} - ${adr.pincode}`}
          </div>
          {adr.selected &&
            <MaterialButton
              title="DELIVERY HERE"
              style={{ width: '250px', paddingTop: '20px' }}
              onClick={() => confirmDeliveryAddress(adr)}
            />}
        </div>)
          : <AddressForm
            onSubmitForm={onAddressSubmit}
            onCancel={() => { }}
            withoutLayout={true}
            initialData={adr}
          />}
      </div>

    </div>
  )
}

export default Address
