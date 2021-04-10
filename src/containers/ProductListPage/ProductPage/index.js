import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../UI/Card';
import './style.css'

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products);

  useEffect(() => {
    const params = getParams(props.location.search);
    dispatch(getProductPage(params))
  }, []);


  const { page } = product

  return (
    <div className='container'>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => { }} autoPlay={true} className='carosel'>{
        page.banner && page.banner.map((banner, index) => (
          <a key={index} href={banner.naviageTo}>
            <img src={banner.img} alt='' />
          </a>
        ))
      }</Carousel>
      <div className='products'>
        {page.products && page.products.map((product, index) =>
          <div className='card' key={index} style={{ width: '400px', height: '200px', padding: '10px 0px', margin: '5px' }}>
            <center><img src={product.img} alt='' /></center>

          </div>)}
      </div>
    </div>
  )
}

export default ProductPage
