const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toDoSchema = new Schema({
  todoID: {
    type: Schema.Types.ObjectId,
  },
  thingToDo: {
    type: String,
  },
  completed: {
    type: Boolean,
  },

});

const toDoList = mongoose.model('toDoList', toDoSchema);

module.exports = toDoList;