const express = require('express');
const app = express();

const jsonFile = require('./data.json');

app.set('view engine', 'pug');

app.use("/static", express.static('./public'))
app.use("/images", express.static('./images'))

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res, next) => {

  const {id} = req.params;
  const project = jsonFile.projects[parseInt(id, 10) - 1];

  if (!project){
    const err = new Error('This page does not exist.');
    return next(err);
  }

  res.render('project', project);
});

app.listen(3000, () => console.log("App is running on Port:3000"));