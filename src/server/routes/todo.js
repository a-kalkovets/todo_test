const router = require('express').Router();
const validation = require('./validations/todo');
const validate = require('./validations/validate');
const db = require('../db');

router.get('/',
  (request, response) => response.json({
    tasks: db.todo,
  })
);

router.post('/',
  validation.create_todo(),
  validate,
  (request, response) => response.json({
    tasks: db.todo.push({
      title: request.body.title,
      status: 0,
      color: '#000',
    }),
  })
);

router.patch('/',
  validation.update_todo(),
  validate,
  (request, response) => {
    const id = request.body.id;
    const title = request.body.title || null;
    const status = request.body.status || null
    const color = request.body.color || null
    const task = db.todo[id];
    if (task) {
      task.title = title || task.title;
      task.status = status || task.status;
      task.color = color || task.color;
      db.todo[id] = task;
      return response.status(204).send();
    } else {
      return response.status(404).json({
        errors: {
          message: `Task ${title} not found`,
        },
      })
    }
  }
);

router.delete('/',
  (request, response) => {
    const id = request.query.id;
    const task = db.todo[id];
    if (task) {
      db.todo.splice(id, 1);
      return response.status(204).send();
    } else {
      return response.status(404).json({
        errors: {
          message: 'Task not found',
        },
      })
    }
  }
);

module.exports = router;
