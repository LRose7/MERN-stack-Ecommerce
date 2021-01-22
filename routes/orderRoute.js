const { Router } = require('express');
const router = Router();
const Order = require('../models/orderModel');
const { isAdmin, isAuth, isSellerOrAdmin } = require('../utils');

router.get('/', isAuth, isSellerOrAdmin, async (req, res) =>{
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const orders = await Order.find({ ...sellerFilter }).populate(
        'user',
        'name'
    );
    res.send(orders);
});

router.get('/mine', isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
});

router.post('/', isAuth, async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = new Order({
          seller: req.body.orderItems[0].seller,
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
        });
        const createdOrder = await order.save();
        res
          .status(201)
          .send({ message: 'New Order Created', order: createdOrder });
      }
});

router.get('/:id', isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
    res.send(order);
    } else {
    res.status(404).send({ message: 'Order Not Found' });
    }
});

router.put('/:id/pay', isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
    res.status(404).send({ message: 'Order Not Found' });
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
    const deleteOrder = await order.remove();
    res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
    res.status(404).send({ message: 'Order Not Found' });
    }
});

router.put('/:id/deliver', isAuth, isAdmin, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
    res.status(404).send({ message: 'Order Not Found' });
    }
});

module.exports = router;