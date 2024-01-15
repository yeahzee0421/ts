interface Todo{
  id: number,
  title: string,
  done: boolean
}

let todoItems: Todo[]; //안에 object가 들어가는 배열

// api
function fetchTodoItems(): Todo[] {
  const todos = [
    { id: 1, title: '안녕', done: false },
    { id: 2, title: '타입', done: false },
    { id: 3, title: '스크립트', done: false },
  ];
  return todos;
}

// crud methods
function fetchTodos(): object[] {
  const todos = fetchTodoItems();
  return todos;
}

//함수에 반환값이 없을 때 void 지정 
function addTodo(todo: Todo): void {
  todoItems.push(todo);
}

function deleteTodo(index: number): void {
  todoItems.splice(index, 1);
}

function completeTodo(index: number, todo: Todo): void {
  todo.done = true;
  todoItems.splice(index, 1, todo);
}

// business logic
function logFirstTodo(): object {
  return todoItems[0];
}

function showCompleted(): object[] {
  return todoItems.filter(item => item.done);
}

function addTwoTodoItems(): void {
  const item1 = {
    id: 4,
    title: 'item 4',
    done: false
  };
  addTodo(item1);
  addTodo({
    id: 5,
    title:'item 5',
    done: false
  })
}

// NOTE: 유틸 함수
function log(): void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
