const express        = require('express'),
      bodyParser     = require('body-parser'),
      cors           = require('cors'),
      app            = express();

// middleware

app.use(bodyParser.json());
app.use(cors());


const posts = require('./routes/api/posts');

app.use('/api/posts', posts);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));