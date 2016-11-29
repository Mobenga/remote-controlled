import React from "react";
import ReactDOM from "react-dom";
import {subscribe} from "./messageBus";
import App from "./components/App";

let list = [
    {checked: false, text:`Fix all TODO:s`, index: 0},
    {checked: true, text: `Write tests`, index: 1},
    {checked: false, text: `Write README.md`, index: 2},
];


render();

subscribe((name, value) => {
    switch (name) {
        case `DELETE`: 
            deleteItem(value);
            break;
        case `TOGGLE`:
            toggleItem(value);
            break;
        case `ADD`:
            addItem(value);
            break;
        default:
            console.error(`Unknown command`, name);
            break;
    }
});

function deleteItem(index) {
    list = list.filter(item => item.index !== index);
    render();
}

function toggleItem(index) {
    const item = list.filter(item => item.index === index)[0];
    if (item) {
        item.checked = !item.checked;
        render();
    }
}

function addItem(text) {
    let index;
    if (list.length === 0) {
        index = 0;
    } else {
        index = list[list.length - 1].index + 1;
    }
    list.push({
        checked: false,
        text,
        index,
    });
    render();
}

function render() {
    ReactDOM.render(<App list={list}/>, document.getElementById(`root`));
}

