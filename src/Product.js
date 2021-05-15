import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
const Product = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(true)
  const { productID } = useParams()

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/products?id=${productID}`)
      setProduct(data)
    } catch (error) {}
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  if (loading) {
    return (
      <section className='section section-center'>
        <h2>Loading..</h2>
      </section>
    )
  }
  const { fields } = product
  const { Name, desc, price, images } = fields

  return (
    <section className='section section-center'>
      <Link to='/' className='link'>
        back home
      </Link>
      <div>
        <div className='title'>
          <h2>{Name}</h2>
          <div className='title-underline'></div>
        </div>
        <article className='single-product'>
          <img className='sngle-product-img' src={images[0].url} alt={Name} />
          <div>
            <h5>{Name}</h5>
            <h5 className='price'>{price}</h5>
            <p>{desc}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
export default Product
