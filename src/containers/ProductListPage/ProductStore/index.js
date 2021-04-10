import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import Card from '../../../UI/Card'
import { Link } from 'react-router-dom'
import "./style.css"


const ProductStore = (props) => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000
  })
  useEffect(() => {
    dispatch(getProductBySlug(props.match.params.slug))
  }, [])

  const products = useSelector(state => state.products)
  return (
    <>
      {Object.keys(products.productsByPrice).map((key, index) => {
        console.log(priceRange[key], key);
        return (
          <Card key={index}
            headerLeft={`${props.match.params.slug} mobile ${key}`}
            headerRight={<button>view all</button>}
          >
            <div style={{ display: 'flex' }}>
              {products.productsByPrice[key].map(product => {
                return (
                  <Link
                    to={`/${product.slug}/${product._id}/p`}
                    style={{ display: 'block' }}
                    className="product_container" key={product._id}>
                    <div className="product_img_container">
                      <img src={generatePublicUrl(product.productPictures[0].img)} />
                    </div>
                    <div className="productInfo">
                      <div className="productTitle">{product.name}</div>
                      <div>
                        <span>5.4</span> &nbsp;
                      <span>3333</span>
                      </div>
                      <div className="product_price">{product.price}</div>
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
