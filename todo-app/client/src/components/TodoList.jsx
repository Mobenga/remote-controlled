import React from "react";

import ListItem from "./ListItem.jsx";
import AddItem from "./AddItem.jsx";

class TodoList extends React.Component {
    render() {
        return (
            <div>
                {this.props.list.map(data => <ListItem key={data.index} data={data}/>)}
                <AddItem/>
            </div>
        )
    }
}

export default TodoList;
