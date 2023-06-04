import Products from "../modals/BProducts.js"
export const addProduct = async(req, res) => {
    try {
        console.log(req.body)
        const { Name, Price, Image } = req.body;
        if(!Name) return res.send("Name is required")
        if(!Price)return res.send("Price is required")
        const product = new Products({
            name : Name,
            price : Price,
            image: Image
        })
        console.log(product, "product here");
        await product.save();
        return res.send(product);
        // res.send(`Hi  from add`)
    } catch (error) {
        console.log(error)
    }
}


export const getAllProducts = async (req, res) =>
{
    try{
        const response = await Products.find({}).exec();
        if(response){
            return res.send(response);
        }else{
            return res.send("No products found")
        }
    }catch (error){
        return res.send(error)
    }
}
