const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/repprepanet',
    port: process.env.PORT || 8000,
    uri: process.env.URI || "localhost"
  };
  
  export default config;