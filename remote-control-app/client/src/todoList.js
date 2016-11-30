let list = [
    {checked: false, text:`Fix all TODO:s`, index: 0},
    {checked: true, text: `Write tests`, index: 1},
    {checked: false, text: `Write README.md`, index: 2},
];

function get() {
    return list;
}


function deleteItem(index) {
    list = list.filter(item => item.index !== index);
}

function toggleItem(index) {
    const item = list.filter(item => item.index === index)[0];
    if (item) {
        item.checked = !item.checked;
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
}

export {get, deleteItem, toggleItem, addItem};

