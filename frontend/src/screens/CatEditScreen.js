import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listCatDetails, updateCat } from '../actions/catActions'
import { PRODUCT_UPDATE_RESET } from '../constants/catConstants'
import { DEFAULT_LOCATION } from '../constants/googleMapConstants'
import MapContainer from '../components/MapContainer'

const CatEditScreen = ({ match, history }) => {
  const catId = match.params.id

  const [name, setName] = useState('')
  const [age, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [gender, setBrand] = useState('')
  const [contactno, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [feature, setFeature] = useState('')
  const [address, setAddress] = useState('')
  const [uploading, setUploading] = useState(false)
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

  const catUpdate = useSelector((state) => state.catUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = catUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/catlist')
    } else {
      if (!cat.name || cat._id !== catId) {
        dispatch(listCatDetails(catId))
      } else {
        setName(cat.name)
        setPrice(cat.age)
        setImage(cat.image)
        setBrand(cat.gender)
        setCategory(cat.contactno)
        setCountInStock(cat.countInStock)
        setDescription(cat.description)
        setFeature(cat.feature)
        setAddress(cat.address)
        setLat(cat.lat)
        setLng(cat.lng)
      }
    }
  }, [dispatch, history, catId, cat, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCat({
        _id: catId,
        name,
        age,
        image,
        gender,
        contactno,
        description,
        feature,
        countInStock,
        address,
      })
    )
  }

  return (
    <>
      <Link to='/admin/catlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Cat</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter age'
                value={age}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter gender'
                value={gender}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='contactno'>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter number'
                value={contactno}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='feature'>
              <Form.Label>Features</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter features'
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <h6>Select your location!</h6>
            <MapContainer
              onMarkerDragEnd={markerDragEnd}
              location={LOCATION}
              draggable={true}
            />
            <Row>
              <Col md={6}>
                <Form.Group controlId='lat'>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='lat'
                    value={lat}
                    readOnly
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='lng'>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='lng'
                    value={lng}
                    readOnly
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CatEditScreen
