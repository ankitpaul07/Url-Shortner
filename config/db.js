const mongoose= require('mongoose');
const config= require('config');

const db= config.get('mongoURI');

const connectDB=mongoose.connect(db,{ useNewUrlParser: true}).then(()=>{
    console.log('Connected DB');
}).catch((error)=>{
    console.log(console.error.message);
    process.exit(1);
})

module.exports=connectDB;