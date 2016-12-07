const baseUrl = `${document.location.href.split(/:\d/)[0]}:8100`;

function getTodoList(clientId) {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/get-list/${clientId}`)
            .then(response => {
                return response.json();
            })
            .then(response => resolve(response.list))
            .catch(reject);
    });
}

function toggleItem(clientId, item) {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/toggle/${clientId}/${item.index}`)
            .then(response => {
                return response.json();
            })
            .then(response => resolve(response.list))
            .catch(reject);
    });
}

function deleteItem(clientId, item) {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/delete/${clientId}/${item.index}`)
            .then(response => {
                return response.json();
            })
            .then(response => resolve(response.list))
            .catch(reject);
    });
}

function addItem(clientId, text) {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/add/${clientId}`, {
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
    fetch(`${baseUrl}/ping/${clientId}`);
}

export {getTodoList, toggleItem, deleteItem, addItem, pingClient};
