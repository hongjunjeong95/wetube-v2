import dotenv from 'dotenv';
import app from './app';
import './db';
import './models/user';
import './models/video';

dotenv.config();

const PORT = process.env.PORT | 5000;

const handleListening = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
