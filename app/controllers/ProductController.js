const Product = require('../models/Product')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while fetching products.' })
  }
}

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    res.status(200).json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the product.' })
  }
}

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body

  try {
    const newProduct = await Product.create({ name, price, description })
    res.status(201).json(newProduct)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while creating the product.' })
  }
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, price, description } = req.body

  try {
    const updatedProduct = await Product.update(
      { name, price, description },
      { where: { id } }
    )

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    res.status(200).json(updatedProduct[0])
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while updating the product.' })
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.destroy({ where: { id } })

    if (deletedProduct === 0) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    res.status(200).json({ message: 'Product deleted successfully.' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the product.' })
  }
}
