import React from 'react'
import './style.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';

const renderCategories = (categories) => {
  let myCategories = []
  categories.map(category => {
    myCategories.push(
      <li key={category.slug}>
        {category.parentId ? <a href={category.slug}>{category.name}</a> :
          <span>{category.name}</span>}
        {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
      </li>
    )
  })
  return myCategories
}


const MenuHeader = () => {
  const category = useSelector(state => state.category)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  return (
    <div className="menu_header">
      <ul>
        {category.categories.length > 0 && renderCategories(category.categories)}
      </ul>
    </div>
  )
}

export default MenuHeader
