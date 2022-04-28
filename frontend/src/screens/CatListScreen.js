import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listCats,
  deleteCat,
  createCat,
} from '../actions/catActions'
import { PRODUCT_CREATE_RESET } from '../constants/catConstants'

const CatListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const catList = useSelector((state) => state.catList)
  const { loading, error, cats, page, pages } = catList

  const catDelete = useSelector((state) => state.catDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = catDelete

  const catCreate = useSelector((state) => state.catCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    cat: createdCat,
  } = catCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/cat/${createdCat._id}/edit`)
    } else {
      dispatch(listCats('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCat,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCat(id))
    }
  }

  const createCatHandler = () => {
    dispatch(createCat())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Cats</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCatHandler}>
            <i className='fas fa-plus'></i> Create Cat
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>NO OF LIKES</th>
                <th>DESCRIPTION</th>
                <th>GENDER</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cats.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.likes}</td>
                  <td>{cat.descriptions}</td>
                  <td>{cat.gender}</td>
                  <td>
                    <LinkContainer to={`/admin/cat/${cat._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(cat._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default CatListScreen
