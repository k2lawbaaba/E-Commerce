const mongoose =require("mongoose");
const {isEmail} =require('validator')
const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema({
    name:{
        type : String,
        required:[true, "This field is required"],
    },
    phone:{
        type:String,
        validate:{
            validator:(v)=> /^((\+234)+|0)[7-9]{1}[0-9]{9}$/.test(v),
            message: "Invalid phone number"
        },
        unique:true
    },
    email: {
        type: String,
        unique: true,
        require:[true, "This field is required"],
        validate:[isEmail,"Please enter a valid email"]
        
    },
    password: {
        type: String,
        require:[true, '{VALUE} is required'],
        minLength:[6,'password must be at least 6 characters, got{VALUE}'],
        validate:{
            validator:(v)=>/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/.test(v),
            message: " {VALUE} must contain atleast one capital letter and one special characters"
        }
        },
    createdAt: {
        type: Date,
        required: [true, 'Field can not be empty']
    },
})

const productSchema = new mongoose.Schema({
    Name:{
        type: String,
        require:[true, "Name is require"]
    },
    QuantityInStock: {
        type: Number,
        required:[true, 'Quantity is required'],
        default:0,

    },
    PricePerUnit:{
        type:Number,
        required:[true, "Price is required"],
        default:0,

    },
    Description: String,

    Category: {
        type:String,
        required:[true,"This field is required"],
        enum:  {
            values:[
            'Electronics',
            'Clothing',
            "Books",
            "Computers",
            "Sports"
        ],
        message:'{VALUE} is not category value.'
    } 
  },
  CreatedAt:{
    type : Date,
  }

});

//mongoose hooks for middleware
userSchema.pre('save', async function(){
   this.password= await bcrypt.hash(this.password, 10)

})
userSchema.post('save', async function(doc,res){
    await console.log(`New User created with id ${doc._id}`);
})

module.exports.user= new mongoose.model("user", userSchema)

module.exports.product = new mongoose.model('product', productSchema)