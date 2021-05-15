require('dotenv').config()

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appuNfFT5TLfmXOHo')
  .table('products')
exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: `No product with id: ${id}`,
      }
    }
  }
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const {
        Name,
        images,
        price,
        desc,
        featured,
        category,
        company,
        review,
        stars,
        stock,
        delivery,
        colors,
      } = product.fields
      const url = images[0].url
      return {
        id,
        Name,
        url,
        price,
        desc,
        featured,
        category,
        company,
        review,
        stars,
        stock,
        delivery,
        colors,
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'server error',
    }
  }
}
