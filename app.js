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

app.get('/project/:id', (req, res) => {
  const {id} = req.params;
  const project = jsonFile.projects[parseInt(id, 10) - 1];
  if (!project){

  }
  res.render('project', project);
});

app.use((req, res, next) => {
  console.log("404, error handler called");
});

app.use((err, req, res, next) => {
  if(err) {
    console.log('Global error handler called', err);
  }
});

app.listen(3000, () => console.log("App is running on Port:3000"));