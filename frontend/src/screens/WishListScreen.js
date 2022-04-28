import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToWishList, removeFromWishList } from '../actions/wishListActions'

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
                  <Col md={2}>${item.age}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToWishList(item.cat, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
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
