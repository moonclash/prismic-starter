import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import * as prismicH from '@prismicio/helpers';
import { client } from './config/prismicConfig.js';

const app = express();
const port = 8000;

app.set('view engine', 'ejs')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'views')));

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }
  next()
});

// Query for the root path.
app.get('/', async (req, res) => {
    const document = await client.getSingle('homepage');
    console.log(document.data);
    res.render('home', { document });
  });

// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${process.env['PORT']}`);
});