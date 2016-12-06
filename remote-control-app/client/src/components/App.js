import React from "react";
import {Router, Route, browserHistory} from "react-router";
import ClientList from "./ClientList";
import Client from "./Client";


class App extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <nav style={{marginBottom: 0}} className="navbar navbar-inverse navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a href="/" className="navbar-brand">Remote Control App</a>
                        </div>
                    </div>
                </nav>
                <Router history={browserHistory}>
                    <Route path="/" component={ClientList} clients={this.props.clients}/>
                    <Route path="/client/:clientId" component={Client} />
                </Router>
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <h5 style={{
                        textAlign: `right`,
                        marginRight: 20,
                        marginTop: 15,
                    }}>A Playtech Sports&copy; product</h5>
                </nav>
            </div>
        );
    }
}

export default App;
