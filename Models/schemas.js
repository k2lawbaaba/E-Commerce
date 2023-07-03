const mongoose =require("mongoose");

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
        unique:[true,"Phone number already exist"]
    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        require:[true, "This field is required"]
        
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
    Quantity: {
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
  }
});



module.exports.user= new mongoose.model("user", userSchema)

module.exports.product = new mongoose.model('product', productSchema)