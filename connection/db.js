import mongoose from "mongoose";


const db=async ()=>{
try {
    const conn=await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to db",conn.connection.host)
} catch (error) {
    console.log(error)
}
}
export default db;
