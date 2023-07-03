const getProductById= async(req, res)=>{
  
    try {
        const result= await productSchema.find({});
        return  res.send({"data":result})
    } catch (error) {
        res.status(403).send(error)
    }
}
module.exports=getProductById;