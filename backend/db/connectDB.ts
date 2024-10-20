// mongopass=NgJgMkS1oxfXaImd
// username=asharma19042007
import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Data base connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;