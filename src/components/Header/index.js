import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux'
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  MaterialDropdown
} from '../MaterialUI';
import { login, signout, signup } from '../../actions';


const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const userLogin = () => {
    if (signUp) {
      dispatch(signup({ email, password, firstName, lastName }))
    }
    dispatch(login({ email, password }));
  }

  const logout = () => {
    console.log("logout click");
    dispatch(signout());
  }

  const setSigmupform = () => {
    setSignUp(true)
    setLoginModal(true)
  }
  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false)
    }
  }, [auth.authenticate])

  const renderNonLogedInMenu = () => {
    return (
      <MaterialDropdown
        menu={
          <a className="loginButton" onClick={() => setLoginModal(true)}>
            Login
              </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: "", onClick: () => setLoginModal(true), icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a style={{ color: '#2874f0' }} onClick={setSigmupform}>Sign Up</a>
          </div>
        }
      />
    )
  }

  const renderLogedinMenu = () => {
    return <MaterialDropdown
      menu={
        <a className="more" >
          {auth.user.fullName}
        </a>
      }
      menus={[
        { label: 'My Profile', href: '', icon: null },
        { label: 'SuperCoin Zone', href: '', icon: null },
        { label: 'Flipkart Plus Zone', href: '', icon: null },
        { label: 'Orders', href: `/orders`, icon: null },
        { label: 'Wishlist', href: '', icon: null },
        { label: 'My Chats', href: '', icon: null },
        { label: 'Coupons', href: '', icon: null },
        { label: 'Rewards', href: '', icon: null },
        { label: 'Gift Cards', href: '', icon: null },
        { label: 'Notifications', href: '', icon: null },
        { label: 'Logout', href: '', icon: null, onClick: logout },
      ]}
    />
  }

  const numberOfCart = cart.cartItems ? Object.keys(cart.cartItems).length : 1
  console.log(numberOfCart)

  return (
    <div className="header">
      <Modal
        visible={loginModal}
        onClose={() => { setLoginModal(false); setSignUp(false) }}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              {signUp &&
                <MaterialInput
                  type="text"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setEmail(e.target.value)}
                />}
              {signUp &&
                <MaterialInput
                  type="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setEmail(e.target.value)}
                />}
              <MaterialInput
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={<a href="#">Forgot?</a>}
              />
              <br />
              <br />
              <MaterialButton
                title={signUp ? "Register" : "Login"}
                bgColor="#fb641b"
                textColor="#ffffff"
                onClick={userLogin}
              />
              <p>OR</p>

              <MaterialButton
                title="Request OTP"
                bgColor="#ffffff"
                textColor="#2874f0"
              />



            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px',
          flex: 2
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLogedinMenu() : renderNonLogedInMenu()}
          <MaterialDropdown
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart" href="/cart">
              {numberOfCart > 0 && <div className='cartNotification'>{numberOfCart}</div>}
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Header