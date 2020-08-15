import mongoose from 'mongoose';

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL : process.env.MONGO_ATLAS_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connted to DB');
const handleError = (error) => console.log(`❌ Connecion ${error}`);

db.on('error', handleError);
db.once('open', handleOpen);
