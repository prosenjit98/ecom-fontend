import React, { useEffect } from 'react';
import { BiRupee } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions';
import Layout from '../../components/Layout'
import { Bread } from '../../components/MaterialUI';
import Card from '../../UI/Card';
import { generatePublicUrl } from '../../urlConfig';
import "./style.css"

const Orders = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(getOrder())
  }, [])

  return (
    <Layout >
      <div className="orderContainer">
        <Bread
          bread={[
            { name: "Home", href: "/" },
            { name: "My Accounts", href: "/account" },
            { name: "Orders", href: '/orders' }
          ]}
          breadIcon={<IoIosArrowForward />}
        />
        {user.orders.map(order => {
          return order.items.map(item => (
            <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
              <div className="orderItemsContainer flexRow">
                <div className="orderImg">
                  <img src={generatePublicUrl(item.productId.productPictures[0].img)} />
                </div>
                <div className="orderItemsSubContainer">
                  <div style={{ width: 300 }}>{item.productId.name}</div>
                  <div>
                    <BiRupee />
                    {item.payablePrice}</div>
                  <div>{order.paymentStatus}</div>
                </div>

              </div>
            </Card>
          ))
        })}
      </div>
    </Layout>
  )
}

export default Orders
