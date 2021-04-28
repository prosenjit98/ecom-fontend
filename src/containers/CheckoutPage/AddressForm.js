import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUserAddress } from '../../actions/user.actions'
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';

const AddressForm = (props) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [cityDestrictTown, setCityDestrictTown] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [alternativePhone, setAlternativePhone] = useState('');
  const [addressType, setAddressType] = useState('');

  const dispatch = useDispatch();

  const onAddressSubmit = () => {
    console.log("000000000000000");
    const payload = {
      address: { name, mobileNumber, pincode, locality, address, cityDestrictTown, state, landmark, alternativePhone, addressType }
    }
    dispatch(addUserAddress(payload))
  }


  return (
    <div className="checkoutStep" style={{ background: '#f5faff' }} >
      <div className="checkoutHeader">
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div style={{ padding: '0 60px', paddingBottom: "20px", boxSizing: 'border-box' }}>
        <div className="flexRow inputRowContainer">
          <div className="AddInputContainer">
            <MaterialInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="AddInputContainer">
            <MaterialInput
              label="10 digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow inputRowContainer">
          <div className="AddInputContainer">
            <MaterialInput
              label="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className="AddInputContainer">
            <MaterialInput
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow inputRowContainer">
          <div className="AddInputContainer">
            <MaterialInput
              label="Adress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow inputRowContainer">
          <div className="AddInputContainer">
            <MaterialInput
              label="City/District/Town"
              value={cityDestrictTown}
              onChange={(e) => setCityDestrictTown(e.target.value)}
            />
          </div>
          <div className="AddInputContainer ">
            <MaterialInput
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow inputRowContainer">
          <div className="AddInputContainer">
            <MaterialInput
              label="Landmark (optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div className="AddInputContainer">
            <MaterialInput
              label="Alternative Phone (optional)"
              value={alternativePhone}
              onChange={(e) => setAlternativePhone(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Address Type</label>
          <div className="flexRow inputRowContainer">
            <div>
              <input type="radio" name="addressType" value="home" onClick={() => setAddressType('home')} />
              <span>Home</span>
            </div>
            <div>
              <input type="radio" name="addressType" value="work" onClick={() => setAddressType('work')} />
              <span>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow inputRowContainer">
          <MaterialButton
            title="SAVE AND DELIVER HERE"
            onClick={onAddressSubmit}
            style={{ width: '250px', margin: '20px 0' }}
          />

          <MaterialButton
            title="CANCEL"
            onClick={props.onClick}
            style={{ width: '250px', margin: '20px 0' }}
          />
        </div>
      </div>
    </div>
  )
}

export default AddressForm
