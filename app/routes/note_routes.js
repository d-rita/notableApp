const objectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  // read a single note
  app.get('/notes/:id', (req, res)=> {
    const { id } = req.params;
    const noteDetails = { '_id': new objectID(id)};
    db.collection('notes').findOne(noteDetails, (err, note) => {
      if (err) {
        res.send({ 'error': err })
      } else {
        res.send(note)
      }
    })
  });

  // delete a note
  app.delete('/notes/:id', (req, res)=> {
    const { id } = req.params;
    const noteDetails = { '_id': new objectID(id) };
    db.collection('notes').deleteOne(noteDetails, (err, note)=> {
      if (err) {
        res.send({ 'error': err })
      } else {
        res.send({'message': 'Note '+ id + ' has been successfully deleted.'});
      }
    })
  });

  // update a note
  app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const noteDetails = { '_id': new objectID(id) };
    const editDetails = { title: req.body.title, body: req.body.body };
    db.collection('notes').update(noteDetails, editDetails, (err, note)=> {
      if (err) {
        res.send({ 'error': err })
      } else {
        res.send(note);
      }
    })
  })

  // create a note
  app.post('/notes', (req, res) => {
    // note created here
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insertOne(note, (err, results) => {
      if (err) {
        res.send({ 'error': err })
      } else {
        console.log(results);
        res.send(results.ops[0])
      }
    })
  });
}
