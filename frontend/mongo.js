const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/login-aut')
    .then(()=>{
        console.log("DB Connection success");
        // app.listen(PORT, () => {
        //     console.log(`http://localhost:4000`);
        // })
    })
    .catch(err=>console.log(err))

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const users = mongoose.model("users",newSchema);
module.exports = users;