const { resolve } = require('node:path');

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Server side values
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

app.use(cors());

// Endpoints
app.get('/cart-total', (req, res) => {
  const { newItemPrice, cartTotal } = req.query;

  return res.send(
    (parseFloat(newItemPrice) + parseFloat(cartTotal)).toString()
  );
});

app.get('/membership-discount', (req, res) => {
  const { cartTotal, isMember } = req.query;

  if (isMember === 'true') {
    const discountedVal =
      parseFloat(cartTotal) - parseFloat(cartTotal) * discountPercentage * 0.01;

    return res.send(discountedVal.toString());
  }

  return res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  const { cartTotal } = req.query;

  return res.send((parseFloat(cartTotal) * taxRate * 0.01).toString());
});

app.get('/estimate-delivery', (req, res) => {
  const { shippingMethod, distance } = req.query;

  const distanceFloat = parseFloat(distance);

  if (shippingMethod.toLowerCase() === 'standard') {
    let days = Math.floor(distanceFloat / 50);
    if (distanceFloat % 50 !== 0) days += 1;
    return res.send(days.toString());
  } else if (shippingMethod.toLowerCase() === 'express') {
    let days = Math.floor(distanceFloat / 100);
    if (distanceFloat % 100 !== 0) days += 1;
    return res.send(days.toString());
  }
});

app.get('/shipping-cost', (req, res) => {
  const { weight, distance } = req.query;

  return res.send((parseFloat(weight) * parseFloat(distance) * 0.1).toString());
});

app.get('/loyalty-points', (req, res) => {
  const { purchaseAmount } = req.query;

  return res.send((parseFloat(purchaseAmount) * loyaltyRate).toString());
});

app.listen(port, () => {
  console.log(`FlipDeal API running at http://localhost:${port}`);
});
