const express = require('express');
const app = express();

const jsonFile = require('./data.json');

app.set('view engine', 'pug');

app.use("/static", express.static('./public'))
app.use("/images", express.static('./images'))

app.get('/', (req, res) => {
  res.render('index', jsonFile);
});

app.get('/about', (req, res, next) => {
  res.render('about');
});

app.get('/project/:id', (req, res, next) => {
  const {id} = req.params;
  const project = jsonFile.projects[parseInt(id, 10) - 1];
  if (!project){
    next();
  }
  res.render('project', project);
});

app.use((req, res, next) => {
  const err = new Error('Page not found!');
  err.status = 404;
  throw err;
});

app.use((err, req, res, next) => {
  if(!err.status) {
    err.status = 500;
  }
  console.error(err.message, err.status);
  res.status(err.status);
  res.render(err.status === 404 ? 'page-not-found' : 'error', {err});
});

app.listen(3000, () => console.log("App is running on Port:3000"));