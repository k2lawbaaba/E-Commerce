
 // handle errors
 const handleMongooseErrors = (err) => {
    // console.log(err.message, err.code, err.index, err.keyPattern);
    let errors = { email: '', phone: '' };
    const key=Object.keys(err.keyPattern)
  
        switch (key[0]) {
            case "phone":
                errors.phone = 'Phone number already exist';
                return errors;
                break;
            case "email":
                errors.email= "Email already exist";
                return errors
        break;
            default:
                if (err.message.includes('user validation failed')) {
                    
                    Object.values(err.errors).forEach(({ properties }) => {
                      errors[properties.path] = properties.message;
                    });
                  }
  
    return errors;
  }}

  const handleJoiErrors=(err)=>{
    let errors={email:"", password:"", name:"", phone:""};
    Object.values(err.details).forEach(({path, message})=>{
        errors[path]= message
    });
    return errors;
  }
  module.exports.handleMongooseErrors=handleMongooseErrors;
  module.exports.handleJoiErrors=handleJoiErrors;