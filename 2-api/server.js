const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: 5432
});

app.get('/customers', (req, res) => {
    pool
        .query(`select * from customers`)
        .then((result) => res.json(result.rows))
        .catch(() => res.status(404).json({ msg: 'Not Found' }))
})

app.get('/customers/:customerId', (req, res) => {
    const id = Number(req.params.id)
    pool
        .query('select * from customers where id = $1', [id])
        .then((result) => res.json(result.rows))
        .catch(() => res.status(404).json({ id: 'Not Found' }))
})

app.get('/customers/:customerId/orders', (req, res) => {
    const id = Number(req.params.id)
    pool.query(`read what this needs to be 
  where id = $1`, [id])
})

app.get('/suppliers', (req, res) => {
    pool
        .query(`select * from suppliers`)
        .then((result) => res.json(result.rows))
        .catch(() => res.status(404).json({ msg: 'Not Found' }))
})

app.get('/products', (req, res) => {
    let urlQuery = url.parse(req.url, true)
    let userQuery = urlQuery.query

    pool
        .query(
            `
      select * from products
      inner join suppliers on suppliers.id=products.id;
      `
        )
        .then((result) => res.json(result.rows))
        .catch((err) => {
            console.log(err)
            res.status(404).json({ msg: 'Not Found' })
        })
})

app.post('/customers', (req, res) => {
    const newCustomer = req.body
})

app.post('/customers/:customerId/orders', (req, res) => {
    const id = Number(req.params.id)
    pool.query(`read what this needs to be 
  where id = $1`, [id])
})

app.post('/products', (req, res) => {
    const newProduct = req.body
})

app.post('/availabilty', (req, res) => {
    const available = req.body
})

app.put('/customers/:customerId', (req, res) => {
    const id = req.body.id
})

app.delete('orders/:orderId', (req, res) => {
    const id = Number(req.params.id)
})
app.delete('customers/:customerId', (req, res) => {
    const id = Number(req.params.id)
})

const listener = app.listen(PORT, () => {
    console.log(`App listening on port:${PORT}`)
});