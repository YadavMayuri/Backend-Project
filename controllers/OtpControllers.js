import { v4 as uuidv4 } from 'uuid';
import Users from '../modals/Users.js';


export const otpRegistration = async (req, res) => {
    try {
        const { number, email } = req.body;
        if (!number) return res.send("number not found.")
        if (!email) return res.send("email not found.")
        var codeForNumber = uuidv4();
        var codeForEmail = uuidv4();
        // res.send(code);

        const isNummberPresent = await Users.find({ number }).exec();
        if (isNummberPresent.length) return res.send("Number already used")

        const isEmailPresent = await Users.find({ email }).exec();
        if (isEmailPresent.length) return res.send("Email already used")

        const user = new Users({
            email: email,
            number: number,
            otpForNumber: codeForNumber,
            otpForEmail: codeForEmail,
            isNumberVerified: false,
            // isEmailVerified: false

        })
        await user.save();
        res.send("Check your mobile number and Email for OTP.")

    } catch (error) {
        return res.send(error);
    }
}

export const otpNumberVerification = async (req, res) => {
    try {
        const { number, otpForNumber } = req.body;
        if (!number) return res.send("number is required");
        // if (!email) return res.send("email is required");
        if (!otpForNumber) return res.send("OTP is required");

        const user = await Users.find({ number }).exec();
        if (!user.length) return res.send("user not found");

        if (user[0].otpForNumber == otpForNumber) {

            const user = await Users.findOneAndUpdate({ number }, { isNumberVerified: true }).exec();
            await user.save();
            return res.send("Number is verified through OTP");

        }
        return res.send("OTP wrong!");

    } catch (error) {
        return res.send(error);
    }
}


export const otpEmailVerification = async (req, res) => {
    try {
        const { email, otpForEmail } = req.body;
        if (!email) return res.send("email is required");
        if (!otpForEmail) return res.send("OTP is required");

        const user = await Users.find({ email }).exec();
        if (!user.length) return res.send("User not found")

        if (user[0].otpForEmail == otpForEmail) {
            const user = await Users.findOneAndUpdate({ email }, { isEmailVerified: true }).exec();
            await user.save();
            return res.send("Email is verified through OTP");

        }
        return res.send("otp wrong!");

    } catch (error) {
        return res.send(error)
    }
}



// -------------------------------------------


export const otpLogin = async (req, res) => {
    try {
        const { email, number } = req.body;
        if (!email) return res.send("Email is required!")
        if (!number) return res.send("Number is required!")

        const user = await Users.find({ email, number }).exec();
        if (!user) return res.send("User is not found!");
        console.log(user, "user")
        const userId = user[0]?._id;
        const codeForNum = uuidv4();
        const codeForEmail = uuidv4();
        // crate another code
        const updateUser = await Users.findByIdAndUpdate({ _id: userId }, { loginOTPforNumber: codeForNum ,
            isLoginNumberVerified: false }).exec(); // update the 2 scheamas

            await updateUser.save();
      

        res.send("Check you email or number for otp.");

    } catch (error) {
        res.send(error)
    }
}

export const loginOTPchechForNumber = async (req, res) => {
    try {
        const { loginOTPforNumber, number, email } = req.body;
        if (!loginOTPforNumber) return res.send("Otp not found!")
        if (!number) return res.send("Number not found!")
        if (!email) return res.send("Email not found!")

        const user = await Users.find({ number, email }).exec();

        if (user[0].loginOTPforNumber == loginOTPforNumber) {

            const user = await Users.findOneAndUpdate({ number }, { isLoginNumberVerified: true }).exec();
            await user.save();

            return res.send("Login Successful through Number")
        }
        return res.send('Otp is wrong!');
    } catch (error) {
        return res.send(error)
    }
    
}



// export const loginOTPchechForEmail = async (req, res) => {
//     try {
//         const { loginOTPforEmail, number, email } = req.body;
//         if (!loginOTPforEmail) return res.send("Otp not found!")
//         if (!number) return res.send("Number not found!")
//         if (!email) return res.send("Email not found!")

//         const user = await Users.find({ number, email }).exec();

//         if (user[0].loginOTPforEmail == loginOTPforEmail) {

//             const user = await Users.findOneAndUpdate({ email }, { isLoginEmailVerified: true }).exec();
//             await user.save();

//             return res.send("Login Successful through email")
//         }
//         return res.send('Otp is wrong!');
//     } catch (error) {
//         return res.send(error)
//     }
    
// }


//buy products

export const buyProducts = async(req, res) =>{
    try{
        const { email,pname,price,image } = req.body;
        if (!email) return res.send("Email is required!")
        if (!pname) return res.send("Name is required!")
        if (!price) return res.send("price is required!")
        if (!image) return res.send("image is required!")


        const user = await Users.find({ email}).exec();
        if (!user) return res.send("User is not found!");
        console.log(user, "user")
        const userId = user[0]?._id;
       
        const updateUser = await Users.findByIdAndUpdate({ _id: userId },
            {
                $push :{
                     products :{
                        $each:[{pname:pname, price:price, image:image}]
                    }
                
            }}).exec();
            console.log(updateUser);
            // { products :[{pname:pname, price:price, image:image}]}).exec(); 

            await updateUser.save();
      

        res.send("Product is added");

    }catch(error){
        return res.send(error)
    }
}


//remove products

export const removeproduct = async(req,res) => {
    try{
        const {email} = req.body;
        if(!email) return res.send("Email is required");

        const user = await Users.find({ email}).exec();
        if (!user) return res.send("User is not found!");
        console.log(user, "user")
        const userId = user[0]?._id;

        const updateUser = await Users.findByIdAndUpdate({ _id: userId },
            {
                $unset :{
                     products :{
                       pname:"", price:"", image:""
                    }
                
            }}).exec();
            console.log(updateUser);

            await updateUser.save();
      
            res.send("Products are removed");
    }catch(error){
        return res.send(error)
    }
}







