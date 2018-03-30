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
      date: { type: String },
      dateMs: { type: Number },
      number: { type: Number },
      rate: { type: Number },
      isThread: { type: Boolean },
      threadPosts:  [Schema.Types.Mixed]
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

  let dataNote = (findOptions) => { 
    return Note.find(findOptions);
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
    dataNote({ isThread: true }).then(data => res.send(data));
  });


  // add new post and set number and date

  app.post('/postsData', function(req, res, next) {

    // case if add new post
    // check amount of posts 
    numberForEmptyData().then(data => {
        const saveAmount = data[data.length - 1].amount + 1 
        const amount = new Amount({
          amount: saveAmount,
        }); 
        clearAmount().then(() => amount.save());
        return saveAmount;
      }).then((saveAmount) => {
         // set date
         const dateNow = new Date();
         const dateNowString = dateNow.getFullYear() + '-' + dateNow.getMonth() + '-' +
         dateNow.getDate() + ' ' + dateNow.getHours() + ':' + (dateNow.getMinutes() < 10 ? '0': '')
          + dateNow.getMinutes() + ':' + dateNow.getSeconds();
         // create new post
         // if it is new thread make a new post
          if (req.body.isThread === true) {
           const note = new Note({
                name: req.body.name,
                text: req.body.text,
                date: dateNowString,
                dateMs: Date.now(), 
                number: saveAmount,
                rate: 0,
                isThread: req.body.isThread,
                threadPosts: []
            });

            note.save().then( () => dataNote({ isThread: true }) )
              .then(data => { 
                if (data.length > 5) { // removing last thread
                    Note.find({})
                } else {
                  return data;
                }
              })
              .then(data => res.send(data));
          }

        // if post is not new thread, search "thread post" and add answer to them
          if (!req.body.isThread) {
            Note.findOne({ number: req.body.threadNumber }).then((data) => {
              data.threadPosts.push({
                name: req.body.name,
                text: req.body.text,
                date: dateNowString,
                dateMs: Date.now(), 
                number: saveAmount,
                rate: 0,
                isThread: req.body.isThread,               
              });
              data.save().then( () => dataNote({ isThread: true }) ).then(data => res.send(data));
              return data
            })
          }
        });
    });

  app.delete('/postsData/:id', function (req, res, next) {
    // console.log(req.params);
    delNote(req.params.id).then( () => dataNote({ isThread: true }) ).then(data => res.send(data));
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
