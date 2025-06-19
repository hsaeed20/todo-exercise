$(document).ready(function() {
    const $addForm = $('.add');
    const $list = $('.todos');
    const $search = $('.search input');

    function checkTodos() {
        if ($list.children('li').length === 0) {
          $('.no-todos').show();
        } else {
          $('.no-todos').hide();
        }
      }

      const generateTemplate = todo => {
        const html = `
          <li class="list-group-item d-flex justify-content-between align-items-center${todo.completed ? ' completed' : ''}" data-id="${todo.id}">
            <span>${todo.title}</span>
            <div class="todo-actions">
              <i class="fa fa-check-square complete-cx" aria-hidden="true"></i>
              <i class="far fa-trash-alt delete"></i>
            </div>
          </li>
        `;
      
        const $todoItem = $(html);
      
        if (todo.completed) {
            // Completed todos always go to the bottom
            $list.append($todoItem);
        } else {
            // Incomplete todos always go to the top
            $list.prepend($todoItem);
        }
    };

    //Create todo
    $addForm.on('submit', function(e) {
        e.preventDefault();
        const $this = $(this);
        const todoTitle = $this.find('input[name="add"]').val().trim();

        if (todoTitle.length) {
            $.ajax({
                url: '/api/todos',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ title: todoTitle }),
                success: function(newTodo) {
                    const title = newTodo.title;
                    if (title) {
                        generateTemplate(newTodo);
                        checkTodos();
                        $this[0].reset();
                    } else {
                        alert('Unexpected server response!');
                    }
                }
            });
        }
    });

     // Grabs all todos
     const getAllTodos = () => {
        $.ajax({
            url: '/api/todos',
            method: 'GET',
            success: function(todos) {
              todos.forEach(todo => {
                generateTemplate(todo);
              });
              checkTodos();
            },
            error: function(err) {
              console.error('Failed to fetch todos:', err);
            }
          });
    }

    //Updating Todo as Complete
    $list.on('click', '.complete-cx', function () {
        const $todo = $(this).closest('li');
        const id = $todo.data('id');
        const title = $todo.find('span').text();
        const isCompleted = !$todo.hasClass('completed');
      
        // toggle class locally for instant UI update
        $todo.toggleClass('completed');
      
        $.ajax({
          url: `/api/todos/${id}`,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ title, completed: isCompleted }),
          success: function (updatedTodo) {
            console.log('Updated!', updatedTodo);
            
            // Move to top or bottom depending on state
            if (isCompleted) {
                $todo.appendTo($list); 
            } else {
                $todo.prependTo($list); 
            }
          },
          error: function (err) {
            console.error('Failed to update', err);
            alert('Could not update todo. Try again.');
          }
        });
      });

    // Delete todo
    $list.on('click', '.delete', function() {
        const id = $(this).closest('li').data('id');
      
        $.ajax({
          url: `/api/todos/${id}`,
          method: 'DELETE',
          success: function() {
            $(this).closest('li').remove();
            checkTodos();
          }.bind(this),
          error: function(err) {
            console.error('Failed to delete:', err);
            alert('Could not delete. Try again.');
          }
        });
      });

    // Filter todos
    const filterTodos = term => {
        $list.children('li').filter(function() {
            return !$(this).text().toLowerCase().includes(term);
        }).addClass('filtered');
    
        $list.children('li').filter(function() {
            return $(this).text().toLowerCase().includes(term);
        }).removeClass('filtered');
    };
  
    $search.on('keyup', function(e) {
        const term = $search.val().trim().toLowerCase();
        filterTodos(term);
    });

    //Gets all the todos
    getAllTodos();
});