import React from "react";

import ListItem from "./ListItem";
import AddItem from "./AddItem";

class TodoList extends React.Component {
    render() {
        return (
            <div>
                {this.props.list.map(data => <ListItem key={data.index} data={data}/>)}
                <AddItem/>
            </div>
        );
    }
}

export default TodoList;