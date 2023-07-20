const { Router } = require("express")
const controller = require("../Controllers/controllers");
const verifyToken = require('../Validations/verifyToken');

const router= Router();

router.post('/signup',controller.sign_up);
router.post('/login', controller.login);
router.post('/create-product',verifyToken, controller.create_products);
router.get('/get_products',verifyToken, controller.get_products);
router.get('/get_product/:id',verifyToken, controller.get_productById);
router.put('/change_password',verifyToken, controller.put_changePassword);
router.put('/update_product', verifyToken, controller.updateProduct);
router.get("/logout",verifyToken, controller.logout);
router.delete('/delete_product/:id',verifyToken, controller.deleteProduct);


module.exports =router;

