import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Likes from './Likes'

const Cat = ({ cat }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/cat/${cat._id}`}>
        <Card.Img src={cat.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/cat/${cat._id}`}>
          <Card.Title as='div'>
            <strong>{cat.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Likes
            value={cat.rating}
            text={`${cat.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${cat.age}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Cat
