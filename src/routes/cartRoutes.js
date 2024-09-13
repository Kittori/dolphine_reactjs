const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Fish = require('../models/Fish');

// Tạo giỏ hàng mới
// 1. Sửa đổi tên trường `accID` thành `userID` trong CartItem và Cart

// 2. Sửa đổi các endpoint trong cartRoutes

router.post('/', async (req, res) => {
    try {
        const newCart = new Cart(); // Không cần `userID`
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/item', async (req, res) => {
    const { accID, fishID, quantity } = req.body; // Sử dụng `accID` thay vì `cartID`
    try {
        const newItem = new CartItem({ accID, fishID, quantity });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post('/cart', async (req, res) => {
    const { accID, fishID, quantity } = req.body;

    try {
        // Check if the item already exists in the cart
        let cartItem = await CartItem.findOne({ accID, fishID });
        if (cartItem) {
            // If it exists, update the quantity
            cartItem.quantity += quantity;
        } else {
            // If it doesn't exist, create a new cart item
            cartItem = new CartItem({ accID, fishID, quantity });
        }

        // Save the cart item
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the fish to the cart.' });
    }
});
router.get('/:userID', async (req, res) => {
    const { userID } = req.params; // Sử dụng `userID` thay vì `cartID`
    try {
        const cartItems = await CartItem.find({ accID: userID }).populate('fishID');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:userID/item/:fishID', async (req, res) => {
    const { userID, fishID } = req.params;
    try {
        const deletedItem = await CartItem.findOneAndDelete({ accID: userID, fishID });
        if (deletedItem) {
            res.status(200).json({ message: 'Item removed from cart successfully.' });
        } else {
            res.status(404).json({ message: 'Item not found in cart.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
