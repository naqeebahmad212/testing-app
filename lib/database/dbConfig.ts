import mongoose from 'mongoose'



export async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('connected to db')
        })
        connection.on('error',(err)=>{
            console.log('connection err',err)
            process.exit();
        })
    } catch (err) {
        console.log(err)
        console.log('somethong went wrong')
    }
}