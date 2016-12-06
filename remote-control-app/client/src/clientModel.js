
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

function addItem(clientId, text) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8100/add/${clientId}`, {
            method: `POST`,
            headers: {
                Accept: `application/json`,
                "Content-Type": `application/json`,
            },
            body: JSON.stringify({value: text}),
        }).then(response => {
            return response.json();
        })
        .then(response => resolve(response.list))
        .catch(reject);
    });
}

function pingClient(clientId) {
    fetch(`http://localhost:8100/ping/${clientId}`);
}

export {getTodoList, toggleItem, deleteItem, addItem, pingClient};
