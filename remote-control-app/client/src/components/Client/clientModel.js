
function getTodoList(clientId) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8100/get-list/${clientId}`)
            .then(response => {
                return response.json();
            })
            .then(response => resolve(response.list))
            .catch(reject);
    });
}

function toggleItem(clientId, item) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8100/toggle/${clientId}/${item.index}`)
            .then(response => {
                return response.json();
            })
            .then(response => resolve(response.list))
            .catch(reject);
    });
}

function deleteItem(clientId, item) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8100/delete/${clientId}/${item.index}`)
            .then(response => {
                return response.json();
            })
            .then(response => resolve(response.list))
            .catch(reject);
    });
}

export {getTodoList, toggleItem, deleteItem};
