import React from "react";
import {getTodoList, toggleItem, deleteItem} from "./clientModel";

class Client extends React.Component {
    constructor() {
        super();
        this.state = {
            todoList: [],
        };
    }
    componentWillMount() {
        getTodoList(this.props.params.clientId)
            .then(todoList => {
                this.setState({todoList});
            });
    }
    renderCheckbox(item) {
        if (item.checked) {
            return <span style={{display: `inline-block`, minWidth: 30}}>X</span>;
        } else {
            return <span style={{display: `inline-block`, minWidth: 30}}></span>;
        }
    }

    renderIndex(item) {
        return <span style={{
            display: `inline-block`,
            minWidth: 30,
        }}>{item.index}</span>;
    }

    toggle(item) {
        const clientId = this.props.params.clientId;
        toggleItem(clientId, item)
            .then(() => getTodoList(clientId))
            .then(todoList => {
                this.setState({todoList});
            });
    }

    del(item) {
        const clientId = this.props.params.clientId;
        deleteItem(clientId, item)
            .then(() => getTodoList(clientId))
            .then(todoList => {
                this.setState({todoList});
            });
    }

    renderToggleButton(item) {
        return <button style={{marginRight: 10}} onClick={() => this.toggle(item)}>Toggle</button>;
    }

    renderRemoveButton(item) {
        return <button style={{marginRight: 10}} onClick={() => this.del(item)}>Delete</button>;
    }

    renderTodoItem(item) {
        return (
            <div style={{
                border: `1px solid black`,
                marginBottom: 2,
                padding: `2px 5px`,
            }} key={item.index}>
                {this.renderToggleButton(item)}
                {this.renderRemoveButton(item)}
                {this.renderCheckbox(item)}
                {this.renderIndex(item)}
                {item.text}
            </div>
        );
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <span className="navbar-brand">Client: {this.props.params.clientId}</span>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div>
                        {this.state.todoList.map(client => this.renderTodoItem(client))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Client;
