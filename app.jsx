let initTodoList = [
        { id : 1 , todo :'todo 1' },
        { id : 2 , todo :'todo 2' },
        { id : 3 , todo :'todo 3' }
    ];
let nextTodoId = 4;

const mapStateToProps = (state) => {
    return { todos: state.todoList, nextTodoId: state.nextTodoId }
}

const getIndexByTodoId = (todos, id)  => {
    for(let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        if(todo.id === id) {
            return i;
        }
    }
    return -1;
};

const appReducer = (state = {todoList: [], nextTodoId: 1}, action) => {
    let todos = state.todoList.slice();
    let nextTodoId = state.nextTodoId;
    switch (action.type) {
        case 'ADD_TODO':
            let todo = {id : nextTodoId++, todo: "" };
            todos.push(todo);
            break;
        case 'REMOVE_TODO':
            var idx = getIndexByTodoId(todos, action.id);
            if(idx != -1)  {
                todos.splice(idx, 1);
            }
            break;
        case 'EDIT_TODO':
            var idx = getIndexByTodoId(todos, action.data.id);
            if(idx != -1)  {
                todos[idx].todo = action.data.todo;
            }
            break;
    }
    const newState = {
        todoList: todos,
        nextTodoId: nextTodoId
    }
    return newState;
}

let store = Redux.createStore(appReducer, { todoList: initTodoList, nextTodoId: nextTodoId }, window.devToolsExtension ? window.devToolsExtension() : undefined);

const MyApp = ReactRedux.connect(mapStateToProps)(Todo);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <MyApp />
    </ReactRedux.Provider>,
    document.getElementById('app')
);