import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToWishList, removeFromWishList } from '../actions/wishListActions'
import Likes from '../components/Likes'

const WishListScreen = ({ match, location, history }) => {
  const catId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const wishList = useSelector((state) => state.wishList)
  const { wishListItems } = wishList

  useEffect(() => {
    if (catId) {
      dispatch(addToWishList(catId, qty))
    }
  }, [dispatch, catId, qty])

  const removeFromWishListHandler = (id) => {
    dispatch(removeFromWishList(id))
  }

  return (
    <Row>
      <Col md={12}>
        <h1>Shopping WishList</h1>
        {wishListItems.length === 0 ? (
          <Message>
            Your wishList is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {wishListItems.map((item) => (
              <ListGroup.Item key={item.cat}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/cat/${item.cat}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.age}Years</Col>
                  <Col md={2}>
                  <Col md={2}>
                  <Likes
            value={item.rating}
            text={`${item.numReviews} likes`}/>
            </Col>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromWishListHandler(item.cat)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default WishListScreen
