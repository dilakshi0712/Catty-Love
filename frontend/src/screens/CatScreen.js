import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Likes from '../components/Likes'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listCatDetails,
  createCatReview,
} from '../actions/catActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/catConstants'
import MapContainer from '../components/MapContainer'
import { DEFAULT_LOCATION } from '../constants/googleMapConstants'

const CatScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setLikes] = useState(0)
  const [comment, setComment] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const LOCATION = {
    lat: lat ? lat : DEFAULT_LOCATION.lat,
    lng: lng ? lng : DEFAULT_LOCATION.lng,
  }

  const markerDragEnd = (coord) => {
    const { latLng } = coord
    setLat(latLng.lat())
    setLng(latLng.lng())
  }

  const dispatch = useDispatch()

  const catDetails = useSelector((state) => state.catDetails)
  const { loading, error, cat } = catDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const catReviewCreate = useSelector((state) => state.catReviewCreate)
  const {
    success: successCatReview,
    loading: loadingCatReview,
    error: errorCatReview,
  } = catReviewCreate

  useEffect(() => {
    if (successCatReview) {
      setLikes(0)
      setComment('')
    }
    if (!cat._id || cat._id !== match.params.id) {
      dispatch(listCatDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    } else {
      setLat(cat.lat)
      setLng(cat.lng)
    }
  }, [dispatch, match, successCatReview])

  const addToWishListHandler = () => {
    history.push(`/wishList/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCatReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={cat.name} />
          <Row>
            <Col md={6}>
              <Image src={cat.image} alt={cat.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{cat.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Likes
                    value={cat.rating}
                    text={`${cat.numReviews} likes`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Age: {cat.age}Years</ListGroup.Item>
                <ListGroup.Item>
                  Description: {cat.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Age:</Col>
                      <Col>
                        <strong>{cat.age}Years</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

            
                  <ListGroup.Item>
                    <Row>
                      <Col>Gender:</Col>
                      <Col>
                        <strong>{cat.gender}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>


                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {cat.countInStock > 0 ? 'Abandoend' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Features:</Col>
                      <Col>
                        <strong>{cat.feature}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Contact No:</Col>
                      <Col>
                        <strong>{cat.contactno}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Address:</Col>
                      <Col>
                        <strong>{cat.address}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>


                  <ListGroup.Item>
                    <Button
                      onClick={addToWishListHandler}
                      className='btn-block'
                      type='button'
                      disabled={cat.countInStock === 0}
                    >
                      Add To WishList
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            </Col>
            <Col md={6}>
              <MapContainer
                onMarkerDragEnd={markerDragEnd}
                location={LOCATION}
                draggable={false}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {cat.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {cat.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Likes value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successCatReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingCatReview && <Loader />}
                  {errorCatReview && (
                    <Message variant='danger'>{errorCatReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Likes</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setLikes(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingCatReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CatScreen
