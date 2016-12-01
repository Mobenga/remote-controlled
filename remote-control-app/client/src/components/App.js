import React from "react";
import {Router, Route, browserHistory} from "react-router";
import ClientList from "./ClientList/ClientList";
import Client from "./Client/Client";


class App extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <nav style={{marginBottom: 0}} className="navbar navbar-inverse navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a href="/" className="navbar-brand">Remote control client</a>
                        </div>
                    </div>
                </nav>
                <Router history={browserHistory}>
                    <Route path="/" component={ClientList} clients={this.props.clients}/>
                    <Route path="/client/:clientId" component={Client} />
                </Router>
            </div>
        );
    }
}

export default App;
