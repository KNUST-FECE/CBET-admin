import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

const connectToDB = async (): Promise<void> => {
    mongoose.set('strict', true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: "cbet-platform",
        } as ConnectOptions);

        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(error);
        throw new Error("Error occurred while connecting to the database");
    }
};

export default connectToDB;