import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddress } from '../../actions/user.actions'
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';

const AddressForm = (props) => {
  const user = useSelector(state => state.user);
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [mobileNumber, setMobileNumber] = useState(initialData ? initialData.mobileNumber : '');
  const [pincode, setPincode] = useState(initialData ? initialData.pincode : '');
  const [locality, setLocality] = useState(initialData ? initialData.locality : '');
  const [address, setAddress] = useState(initialData ? initialData.address : '');
  const [cityDestrictTown, setCityDestrictTown] = useState(initialData ? initialData.cityDestrictTown : '');
  const [state, setState] = useState(initialData ? initialData.state : '');
  const [landmark, setLandmark] = useState(initialData ? initialData.landmark : '');
  const [alternativePhone, setAlternativePhone] = useState(initialData ? initialData.alternativePhone : '');
  const [addressType, setAddressType] = useState(initialData ? initialData.addressType : '');
  const [id, setId] = useState(initialData ? initialData._id : '')
  const [submitFlag, setSetSubmitFlag] = useState(false);

  const dispatch = useDispatch();

  const onAddressSubmit = () => {
    const payload = {
      address: { name, mobileNumber, pincode, locality, address, cityDestrictTown, state, landmark, alternativePhone, addressType }
    }
    if (id) {
      payload.address._id = id
    }
    dispatch(addUserAddress(payload));
    setSetSubmitFlag(true);
  }

  useEffect(() => {
    if (submitFlag) {
      let _address = {}
      if (id) {
        _address = {
          _id: id, name, mobileNumber, pincode, locality, address, cityDestrictTown, state, landmark, alternativePhone, addressType
        }
      } else {
        _address = user.address.slice(user.address.length - 1)[0]
      }
      props.onSubmitForm(_address);
    }
  }, [user.address])


  return (
    <div className="checkoutStep" style={{ background: `${props.withoutLayout ? 'none' : '#f5faff'}`, boxShadow: `${props.withoutLayout ? 'none' : 'inherit'}` }} >
      {!props.withoutLayout && <div className="checkoutHeader">
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>}
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
              <input type="radio" name="addressType" defaultChecked="checked" value="home" onClick={() => setAddressType('home')} />
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
            style={{ width: '250px', margin: '20px 5px' }}
          />

          <MaterialButton
            title="CANCEL"
            onClick={props.onClick}
            style={{ width: '250px', margin: '20px 5px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default AddressForm
