import React from "react";
import TodoList from "./TodoList";


const appStyle = {
    fontFamily: `Arial`,
    fontSize: 20,
};

class App extends React.Component {
    renderConnectedSymbol() {
        if (this.props.isConnected) {
            return <span className="glyphicon glyphicon-thumbs-up navbar-brand" />;
        } else {
            return <span className="glyphicon glyphicon-thumbs-down navbar-brand" />;
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <span className="navbar-brand">Project name</span>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li>{this.renderConnectedSymbol()}</li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <div style={appStyle}>
                        <TodoList list={this.props.list}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
