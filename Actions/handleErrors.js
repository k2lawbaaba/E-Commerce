
 // handle errors
 const handleErrors = (err) => {
    // console.log(err.message, err.code, err.index, err.keyPattern);
    let key= Object.keys(err.keyPattern);
    let errors = { email: '', phone: '' };
  
        switch (key[0]) {
            case "phone":
                errors.phone = 'Phone number already exist';
                return errors;
                // break;
            case "email":
                errors.email= "Email already exist";
                return errors
        
            default:
                break;
        }
    // validation errors
    if (err.message.includes('user validation failed')) {
      console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        console.log(val);
        console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
  module.exports=handleErrors