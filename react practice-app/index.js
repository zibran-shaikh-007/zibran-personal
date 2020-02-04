class Input extends React.Component {
    state = {
        title: "",
        deadline: '',
        getSelected: false
    }


    changeInputState = (event) => {
        this.setState({ title: event.target.value }
            , () => {
                console.log(this.state)
            }
            // async ...thats the reaon we console.log by creating a new fn in order to debug
        )
    }

    changeDateState = (event) => {
        this.setState({
            deadline: event.target.value
        }
            , () => { console.log(this.state) }
        )
    }

    sendData = () => {
        this.props.getDataFromInput(this.state)
    }

    updatedData = () => {
        this.props.getUpdatedDataFromInput(this.state)
    }

    componentDidMount = () => {
        // console.log('cdm', this.props)
    }

    componentDidUpdate = (prevProps) => {
        //console.log('cdu', this.props)
        if (prevProps.editTodoData !== this.props.editTodoData) {
            this.setState({
                title: this.props.editTodoData.title,
                deadline: this.props.editTodoData.deadline,
                getSelected: this.props.editTodoData.getSelected
            })
        }
    }
    render() {
        //console.log('edit props', this.props)
        //console.log('new data', this.state)
        const {title, deadline } = this.state
        const {isEdit } = this.props
        return (

            <React.Fragment>
                <div className="form-group card shadow w-50 mx-auto mt-5">
                    <div className="col-md-8 m-2 mx-auto">
                        <label >Title</label>
                        <input className="form-control"
                            onChange={this.changeInputState}
                            type='text'
                            value={title}
                            placeholder="Title" />
                        <label >Date</label>
                        <input className="form-control"
                            onChange={this.changeDateState}
                            type='date'
                            value={deadline} />
                        <button className="btn btn-primary my-2"
                            onClick={isEdit ? this.updatedData :  this.sendData}>
                            {isEdit ? 'Edit' : 'Save'}</button>

                    </div>
                </div>
            </React.Fragment>

        )

    }
}


class List extends React.Component {
    render() {
        //console.log('props', this.props)
        const {value, getEditFromList, getDeleteFromList} = this.props
        return (
               
            <React.Fragment>
                <div className="card shadow w-50 mx-auto mt-5">
                    <div className="col-md-8 m-2 mx-auto">
                        <ul >
                            {value.map((list, index) =>
                                <li key={index}>{list.title}, {list.deadline}, {list.getSelected.toString()}
                                    <button className="btn btn-warning btn-sm m-2"
                                        onClick={() => getEditFromList(index)}>
                                        Edit</button>
                                    <button className="btn btn-danger btn-sm "
                                        onClick={() => getDeleteFromList(index)}>
                                        Delete</button></li>
                            )}

                        </ul>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}

class Wrapper extends React.Component {
    state = {
        todos: [],
        isEdit: false,
        editTodoIndex: '',
        editTodoData: ''

    }

    renderListData = (todoData) => {
        //console.log('tododata', todoData)
        this.setState({ todos: [...this.state.todos, todoData] }, () => {
            console.log('update', this.state.todos)
        })

    }
    deleteTodo = (index) => {
        let todos = this.state.todos.slice()
        todos.splice(index)
        this.setState({ todos })
    }

    editTodo = (index) => {
        this.setState({
            isEdit: true,
            editTodoIndex: index,
            editTodoData: this.state.todos[index]
        })
    }
    updateDatafromInput = (newData) => {
        const { todos, editTodoIndex } = this.state

        if (todos[editTodoIndex] !== newData) {
            todos[editTodoIndex] = newData
        }
        this.setState({
            isEdit: false,
            todos
        })

    }

    render() {
        const {isEdit, editTodoData, todos} = this.state
        return (
            <React.Fragment>
                <Input isEdit={isEdit}
                    editTodoData={editTodoData}
                    getDataFromInput={(todoData) => this.renderListData(todoData)}
                    getUpdatedDataFromInput={this.updateDatafromInput} />
                <List getEditFromList={(index) => this.editTodo(index)}
                    getDeleteFromList={this.deleteTodo}
                    value={todos} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Wrapper />, document.getElementById('root'))