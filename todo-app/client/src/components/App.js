import React from "react";
import TodoList from "./TodoList";


const appStyle = {
    fontFamily: `Arial`,
    fontSize: 20,
};

class App extends React.Component {
    render() {
        return (
            <div style={appStyle}>
                <TodoList list={this.props.list}/>
            </div>
        );
    }
}

export default App;
