import React from "react";
import {addItem} from "../model";

const style = {
    fontSize: 16,
    marginTop: 15,
};

const inputStyle = {
    marginLeft: 30,
};

const buttonStyle = {
    marginLeft: 10,
};

class AddItem extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ``,
        };
    }
    addTodoItem() {
        if (!this.state.text) {
            return;
        }
        addItem(this.state.text);
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
    render() {
        return (
            <div style={style} className="row">
                <div className="col-xs-12">
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
}

export default AddItem;
