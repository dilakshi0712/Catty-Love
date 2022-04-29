import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopCats } from '../actions/catActions'

const CatCarousel = () => {
  const dispatch = useDispatch()

  const catTopRated = useSelector((state) => state.catTopRated)
  const { loading, error, cats } = catTopRated

  useEffect(() => {
    dispatch(listTopCats())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {cats.map((cat) => (
        <Carousel.Item key={cat._id}>
          <Link to={`/cat/${cat._id}`}>
            <Image src={cat.image} alt={cat.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {cat.name} ({cat.age}Years)
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CatCarousel
