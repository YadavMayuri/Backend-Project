import express from "express";
import { buyProducts, loginOTPchechForNumber, otpEmailVerification, otpLogin, otpNumberVerification, otpRegistration, removeproduct,  } from "../controllers/OtpControllers.js";
import { checkEmail, checkName } from "../middlewares/authMiddleware.js";
import { addProduct, getAllProducts } from "../controllers/ProductControllers.js";

var router = express.Router();

router.post('/add-product', addProduct);
router.get('/get-all-products', getAllProducts);

router.post('/otpRegistration',checkEmail,otpRegistration);
router.post('/otpNumberVerify',otpNumberVerification);
router.post('/otpEmailVerify',otpEmailVerification);
router.post('/login', otpLogin)
router.post('/loginOTPcheckForNumber', loginOTPchechForNumber);
// router.post('/loginOTPcheckForEmail', loginOTPchechForEmail)
router.post('/buyProducts', buyProducts),
router.post('/removeProducts', removeproduct)



export default router;

