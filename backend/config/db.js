import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nkusuma892004:9jNL3XT9ystvxzoM@cluster0.vmny4.mongodb.net/swiftbites').then(() => console.log("DB Connected"));
}

export default connectDB