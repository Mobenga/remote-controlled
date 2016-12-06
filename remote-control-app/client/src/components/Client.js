import React from "react";
import * as client from "../clientModel";

const inputStyle = {
    marginLeft: 30,
};

const buttonStyle = {
    marginLeft: 10,
};
class Client extends React.Component {
    constructor() {
        super();
        this.state = {
            todoList: [],
            text: ``,
        };
    }

    componentWillMount() {
        client.getTodoList(this.props.params.clientId)
            .then(todoList => {
                this.setState({todoList});
            });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a
                                style={{cursor: `pointer`, fontFamily: `monospace`}}
                                className="navbar-brand"
                                onClick={() => this.pingClient()}>{this.props.params.clientId}</a>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div>
                        {this.state.todoList.map(client => this.renderTodoItem(client))}
                    </div>
                </div>
                <div style={{marginTop: 50, textAlign: `center`}}>
                    <input
                        size="18"
                        onKeyUp={this.keyUp.bind(this)}
                        onInput={this.inputChanged.bind(this)}
                        value={this.state.text}
                        style={inputStyle}></input>
                    <button
                        style={buttonStyle}
                        disabled={!this.state.text}
                        onClick={() => this.addTodoItem()}>Add item</button>
                </div>
            </div>
        );
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

    renderToggleButton(item) {
        return <button style={{marginRight: 10}} onClick={() => this.toggle(item)}>Toggle</button>;
    }

    renderRemoveButton(item) {
        return <button style={{marginRight: 10}} onClick={() => this.deleteItem(item)}>Delete</button>;
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
        client.toggleItem(clientId, item)
            .then(() => client.getTodoList(clientId))
            .then(todoList => {
                this.setState({todoList});
            });
    }

    deleteItem(item) {
        const clientId = this.props.params.clientId;
        client.deleteItem(clientId, item)
            .then(() => client.getTodoList(clientId))
            .then(todoList => {
                this.setState({todoList});
            });
    }

    addTodoItem() {
        if (!this.state.text) {
            return;
        }
        const clientId = this.props.params.clientId;
        client.addItem(clientId, this.state.text)
            .then(() => client.getTodoList(clientId))
            .then(todoList => {
                this.setState({todoList});
            });
        this.setState({
            text: ``,
        });
    }

    inputChanged(e) {
        this.setState({
            text: e.target.value,
        });
    }
    
    keyUp(e) {
        if (e.keyCode === 13) { //Enter
            this.addTodoItem();
        }
    }
    
    pingClient() {
        const clientId = this.props.params.clientId;
        client.pingClient(clientId);
    }
}

export default Client;
