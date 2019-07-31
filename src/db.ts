import mongoose from 'mongoose';
import config from 'config';
const mongoURI: string = config.get('mongoURI');

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to mongoDB...');
  } catch (err) {
    console.error(`Error connecting to mongoDB: `, err.message);
    //exit process with failure after error
    process.exit(1);
  }
};


