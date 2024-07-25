const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AdminSchema  = new mongoose.Schema({

    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {

            token:{

                type:String
            }
        }
    ]
}, {timestamps:true})


// Method for generating the Auth Token for Adminwhich is being called by the function of login and signup from Router files
AdminSchema.methods.generateAuthToken = async function() {
    const admin = this
    const token = jwt.sign({_id: admin._id} , process.env.AdminTokenKey);
    admin.tokens = admin.tokens.concat({token});
    await admin.save()
    console.log(token)  // consoling the token
    return token;

}

// Finding the Admin by its credentials and checking the password with our hashed one
AdminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email });
    console.log("jcbdhjeceh", admin)
  
    if (!Admin) {
      throw new Error("Unable To Find Admin");
    }
  
    const isMatch = await bcrypt.compare(password, admin.password);
  
    if (!isMatch) {
      throw new Error("Password didn't Match");
    }
    return admin;
  };


  // to hash the Admin passsword for security
AdminSchema.pre("save", async function (next) {
    const Admin = this;
  
    if (Admin.isModified("password")) {
      Admin.password = await bcrypt.hash(Admin.password, 8);
    }
  
    next();
  });


const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin