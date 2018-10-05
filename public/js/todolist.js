$(function () {

  const state = {
    toDoList: [],
  };

  const render = function () {
    $('#content').empty();
    runToDoQuery();
  }

  const renderToDo = function (outputElement, toDoList, _id) {
    const output = $(outputElement);

    const toDoListElement = $('<div>').addClass('toDo');

    const label = $('<label>').addClass('check-marker');
    const checkbox = $('<input type="checkbox">')
      .attr('checked', toDoList.completed)
      .addClass('completed')
      .attr('data-id', _id);


    label.append(checkbox);
    label.append('<i class="fas fa-check-square checked">');
    label.append('<i class="far fa-square unchecked">');

    toDoListElement.append(
      label,

      $('<span>').text(toDoList.thingToDo).addClass('textDisplay'),

      $('<button><i class="fas fa-ellipsis-h"></i></button>')
        .addClass('delete')
        .attr('data-id', _id)
        .append('<i>')
    );

    output.append(toDoListElement);
  }

  $('#options').on('click', function (event) {
    event.preventDefault();
const optionsElement = $('<div>').addClass('option box');
const div = $('<div>').addClass('option box label');

div.append('<div>"Edit"</div>')


  });

  const renderToDos = function (outputElement, toDoList) {
    const output = $(outputElement);
    output.empty();
    toDoList.forEach((todo, _id) => renderToDo(outputElement, todo, _id));
  }

  const runToDoQuery = function () {

    $.ajax({ url: "/api/toDoSchema", method: "GET" })
      .then(function (toDoList) {
        state.toDoList = toDoList
        renderToDos('#content', toDoList);
      });
  }


  $('.submit').on('click', function (event) {
    event.preventDefault();

    const newToDo = {
      thingToDo: $('#toDoInput').val().trim(),
      completed: false,
 
    };

    for (let key in newToDo) {
      if (newToDo[key] === '') {
        alert('Please Enter Something To Do!');
        return;
      }
    }

    $.ajax({ url: '/api/toDoSchema', method: 'POST', data: newToDo }).then(
      function (data) {

        if (data.success) {

          console.log('data', data)
          $('#content').val('');
          $('#content').focus();
        }
      })

    $.ajax({
      url: '/api/toDoSchema',
      method: 'POST',
      data: newToDo
    }).then(
      function (data) {
        if (data.success) {

          console.log('data', data)
          $('#toDoInput').val('');
          $('#toDoInput').focus();

          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }
      });

  })

  $('body').on('click', '.completed', function (event) {
    const thisId = $(this).attr('data-id');
    const completed = event.target.checked; 

  
    const toDoUpdate = state.toDoList[Number(thisId)];

    // update the competed field
    toDoUpdate.completed = completed;

    // Make the PUT request
    $.ajax({
        url: `/api/toDoSchema/${thisId}`,
        method: 'PUT',
        data: toDoUpdate
      })
      .then(function (data) {

        // If our PUT request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }


      });
  })


  $('body').on('click', '.delete', function (event) {
    const todoID = $(this).attr('data-id');

    console.log(state.toDoList[Number(todoID)])


    $.ajax({
        url: `/api/toDoSchema/${state.todoID}`,
        method: 'DELETE'
      })
      .then(function (data) {
        console.log(data.success);

        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }

      });
  });


  render();
});

