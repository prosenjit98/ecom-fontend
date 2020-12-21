import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../actions';
import Layout from '../../components/Layout'
import { generatePubicUrl } from '../../urlConfig';
import "./style.css"

const ProductListPage = (props) => {
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
    <Layout>
      {Object.keys(products.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{props.match.params.slug} mobile {priceRange[key]}</div>
              <button>view all</button>
            </div>
            <div style={{ display: 'flex' }}>
              {products.productsByPrice[key].map(product => {
                return (
                  <div className="product_container">
                    <div className="product_img_container">
                      <img src={generatePubicUrl(product.productPictures[0].img)} />
                    </div>
                    <div className="productInfo">
                      <div className="productTitle">{product.name}</div>
                      <div>
                        <span>5.4</span> &nbsp;
                      <span>3333</span>
                      </div>
                      <div className="product_price">{product.price}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
      )}

    </Layout>
  )
}

export default ProductListPage
