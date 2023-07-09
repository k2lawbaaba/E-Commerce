const { Router } = require("express")
const controller = require("../Controllers/controllers")

const router= Router();

router.post('/signup',controller.sign_up);
router.get('/login', controller.login);
router.post('/create-product', controller.create_products);
router.get('/get_products', controller.get_products);
router.get('/get_product/:id', controller.get_productById);
router.put('/update', controller.put_updateUserPassword);
router.get("/read_cookies", controller.read_cookies);
router.get('/set_cookies', controller.set_cookies);

module.exports =router;

