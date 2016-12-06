let subscriber;

let list = [
    {checked: false, text:`Fix all TODO:s`, index: 0},
    {checked: true, text: `Write tests`, index: 1},
    {checked: false, text: `Write README.md`, index: 2},
];

let isConnected = false;

function getTodoList() {
    return list;
}

function deleteItem(index) {
    list = list.filter(item => item.index !== index);
    notify();
}

function toggleCheckbox(index) {
    const item = list.filter(item => item.index === index)[0];
    if (item) {
        item.checked = !item.checked;
    }
    notify();
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
    notify();
}

function setConnected() {
    isConnected = true;
    notify();
}

function notify() {
    if (subscriber) {
        subscriber(list, isConnected);
    }
}

function onChange(cb) {
    subscriber = cb;
};



export {getTodoList, deleteItem, toggleCheckbox, addItem, setConnected, onChange};

