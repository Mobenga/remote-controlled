import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {connect} from "./remoteControlClient";

import * as model from "./model";

render(model.getTodoList(), false);

model.onChange(render);

connect();


function render(todoList, isConnected) {
    ReactDOM.render(<App list={todoList} isConnected={isConnected}/>, document.getElementById(`root`));
}
