const { Router } = require("express")
const controller = require("../Controllers/controllers")

const router= Router();

router.post('/signup',controller.sign_up);
router.post('/login', controller.login);
router.post('/create-product', controller.create_products);
router.get('/get-products', controller.get_products);
router.get('/get-product/id', controller.get_product);
router.put('/update', controller.put_updateUserPassword);

module.exports =router;

