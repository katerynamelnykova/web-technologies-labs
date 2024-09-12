import { connect } from 'mongoose';

const uri = "mongodb://localhost:27017/web-technologies-labs";

export default () => connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });;