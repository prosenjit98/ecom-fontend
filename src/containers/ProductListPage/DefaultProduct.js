import React, { useEffect } from 'react'
import { BiRupee } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getProductBySlug } from '../../actions';
import Card from '../../UI/Card';

const DefaultProduct = (props) => {
  const product = useSelector((state => state.product));
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);


  return (
    <div style={{ padding: "10px" }}>
      <Card style={{ boxSizing: "border-box", padding: "10px", display: 'flex' }}>
        {product.products.map((product) => (
          <div className="caContainer">
            <Link className="caImgContainer" to={`/${product.slug}/${product._id}/p`}>
              <img src={product.productPictures[0].img} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice"><BiRupee />{product.price}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default DefaultProduct
