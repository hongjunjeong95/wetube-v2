import app from './app';
import './db';
import './models/User';
import './models/Video';

const PORT = process.env.PORT || 5000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
