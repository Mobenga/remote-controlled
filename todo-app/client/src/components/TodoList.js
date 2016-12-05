import React from "react";

import ListItem from "./ListItem";

class TodoList extends React.Component {
    render() {
        return (
            <div>
                {this.props.list.map(data => <ListItem key={data.index} data={data}/>)}
            </div>
        );
    }
}

export default TodoList;
