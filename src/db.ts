import mongoose from 'mongoose';

export const connectDb = async (database: string) => {
  try {
    await mongoose.connect(database, {
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


