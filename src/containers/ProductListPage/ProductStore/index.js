import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../../actions';
import Card from '../../../UI/Card'
import { Link } from 'react-router-dom'
import "./style.css"
import { MaterialButton } from '../../../components/MaterialUI';
import Price from '../../../components/ShowPrice'
import Rating from '../../../components/Rating'


const ProductStore = (props) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products)
  const priceRange = products.priceRange;
  // const [priceRange, setPriceRange] = useState({
  //   under5k: 5000,
  //   under10k: 10000,
  //   under15k: 15000,
  //   under20k: 20000
  // })
  useEffect(() => {
    dispatch(getProductBySlug(props.match.params.slug))
  }, [])


  return (
    <>
      {Object.keys(products.productsByPrice).map((key, index) => {
        console.log(priceRange, priceRange[key], typeof key);
        return (
          <Card key={index}
            headerLeft={`${props.match.params.slug} mobile ${key}`}
            headerRight={<MaterialButton
              title="VIEW ALL"
              style={{ width: '100px' }}
              bgColor="#2874f0"
              fontSize='12px'
            />}
          >
            <div style={{ display: 'flex' }}>
              {products.productsByPrice[key].map(product => {
                return (
                  <Link
                    to={`/${product.slug}/${product._id}/p`}
                    className="product_container" key={product._id}>
                    <div className="product_img_container">
                      <img src={product.productPictures[0].img} />
                    </div>
                    <div className="productInfo">
                      <div className="productTitle">{product.name}</div>
                      <div>
                        <Rating value={4.3} /> &nbsp;&nbsp;
                      <span>(3333)</span>
                      </div>

                      <Price value={product.price} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </Card>
        )
      }
      )}

    </>
  )
}

export default ProductStore
