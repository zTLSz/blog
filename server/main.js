const express = require('express')
const path = require('path')
const webpack = require('webpack')
const logger = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const project = require('../project.config')
const compress = require('compression')
const fs = require('fs');
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const app = express();
app.use(compress());


// ------------------------------------
// DB
// ------------------------------------
  mongoose.connect('mongodb://localhost:27017/test');

  //creating model 
  app.use( bodyParser.json() );

  const Schema = mongoose.Schema;

  const NoteSchema = new Schema({
      name: { type: String },
      text: { type: String },
      date: { type: Date },
      number: { type: Number },
      rate: { type: Number }
  });

  // model for posts amount
  const AmountSchema = new Schema({
      amount: { type: Number },
  });

  mongoose.model('Note', NoteSchema);
  mongoose.model('Amount', AmountSchema)

  const Note = mongoose.model('Note');
  const Amount = mongoose.model('Amount');

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal',
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  app.use(express.static(path.resolve(project.basePath, 'public')))

  // add methods for the Notes page

  let dataNote = () => { 
    return Note.find();
  };

  let delNote = (id) => { 
    return Note.findById(id).remove();
  };

  let numberForEmptyData = () => {
    return Amount.find();
  };

  let clearAmount = () => {
    return Amount.remove({});
  }


  app.get('/postsData', function (req, res, next) {
    dataNote().then(data => res.send(data));
  });


  // add new post and set number and date

  app.post('/postsData', function(req, res, next) {
    // check amount of posts 
    numberForEmptyData().then(data => {
        const saveAmount = data[data.length - 1].amount + 1 
        const amount = new Amount({
          amount: saveAmount,
        }); 
        clearAmount().then(() => amount.save());
        return saveAmount;
      }).then((saveAmount) => {
         const note = new Note({
              name: req.body.name,
              text: req.body.text,
              date: Date.now(),
              number: saveAmount,
              rate: 0,
          });
          note.save().then( () => dataNote() ).then(data => res.send(data));
        });
    });

  app.delete('/postsData/:id', function (req, res, next) {
    // console.log(req.params);
    delNote(req.params.id).then( () => dataNote() ).then(data => res.send(data));
  });


  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    console.log('Time:', Date.now());
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })


} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))




}

module.exports = app
