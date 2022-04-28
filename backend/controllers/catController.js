import asyncHandler from 'express-async-handler'
import Cat from '../models/catModel.js'

// @desc    Fetch all cats
// @route   GET /api/cats
// @access  Public
const getCats = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Cat.countDocuments({ ...keyword })
  const cats = await Cat.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ cats, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single cat
// @route   GET /api/cats/:id
// @access  Public
const getCatById = asyncHandler(async (req, res) => {
  const cat = await Cat.findById(req.params.id)

  if (cat) {
    res.json(cat)
  } else {
    res.status(404)
    throw new Error('Cat not found')
  }
})

// @desc    Delete a cat
// @route   DELETE /api/cats/:id
// @access  Private/Admin
const deleteCat = asyncHandler(async (req, res) => {
  const cat = await Cat.findById(req.params.id)

  if (cat) {
    await cat.remove()
    res.json({ message: 'Cat removed' })
  } else {
    res.status(404)
    throw new Error('Cat not found')
  }
})

// @desc    Create a cat
// @route   POST /api/cats
// @access  Private/Admin
const createCat = asyncHandler(async (req, res) => {
  const cat = new Cat({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdCat = await cat.save()
  res.status(201).json(createdCat)
})

// @desc    Update a cat
// @route   PUT /api/cats/:id
// @access  Private/Admin
const updateCat = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const cat = await Cat.findById(req.params.id)

  if (cat) {
    cat.name = name
    cat.price = price
    cat.description = description
    cat.image = image
    cat.brand = brand
    cat.category = category
    cat.countInStock = countInStock

    const updatedCat = await cat.save()
    res.json(updatedCat)
  } else {
    res.status(404)
    throw new Error('Cat not found')
  }
})

// @desc    Create new review
// @route   POST /api/cats/:id/reviews
// @access  Private
const createCatReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const cat = await Cat.findById(req.params.id)

  if (cat) {
    const alreadyReviewed = cat.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Cat already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    cat.reviews.push(review)

    cat.numReviews = cat.reviews.length

    cat.rating =
      cat.reviews.reduce((acc, item) => item.rating + acc, 0) /
      cat.reviews.length

    await cat.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Cat not found')
  }
})

// @desc    Get top rated cats
// @route   GET /api/cats/top
// @access  Public
const getTopCats = asyncHandler(async (req, res) => {
  const cats = await Cat.find({}).sort({ rating: -1 }).limit(3)

  res.json(cats)
})

export {
  getCats,
  getCatById,
  deleteCat,
  createCat,
  updateCat,
  createCatReview,
  getTopCats,
}
