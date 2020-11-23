class Todo extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            edit: -1
        }
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter' || e.key === 'Escape'){
            this.setState({edit: -1});
        }
    }

    handleBlur = (e) => {
        this.setState({edit: -1});
    }

    editTodo = (todoId, event) => {
        var newTodo =  event.target.value;
        var action = {
            type: 'EDIT_TODO',
            data: {
                id: todoId,
                todo: newTodo
            }
        };
        this.props.dispatch(action);
    }

    editTodoViewInput = (todoId) => {
        this.setState({edit: todoId});
    }

    removeTodo = (todoId) => {
        var action = {
            type: 'REMOVE_TODO',
            id: todoId
        };
        this.props.dispatch(action);
    }

    addTodo = () => {
        const action = {
            type: 'ADD_TODO'
        };
        this.props.dispatch(action);
        this.editTodoViewInput(this.props.nextTodoId);
    }

    render () {        
        const todos = this.props.todos;
    
        var trList = todos.map( todo => {

            const viewTodo = (this.state.edit === todo.id ) ?
                <td><input autoFocus type="text" onChange={this.editTodo.bind(null, todo.id)} onKeyUp={this.handleKeyPress} value={todo.todo} onBlur={this.handleBlur}/></td> :
                <td onClick={this.editTodoViewInput.bind(null, todo.id)}>{todo.todo}</td>;

            return (<tr key={todo.id}>
                <td>{todo.id}</td>
                    {viewTodo}
                <td>
                    <button onClick={this.removeTodo.bind(null, todo.id)}>
                        Remove
                    </button>
                </td>
            </tr>);
        });
   
   
        return (<div>
            <table border="1">
            <thead>
                <th>ID</th>
                <th>Todo</th>
                <th>Remove</th>
            </thead>
            <tbody>
                {trList}
            </tbody>
            </table>
            <br/>
            <button onClick={this.addTodo}>
                Create
            </button>
        </div>);
    }
}