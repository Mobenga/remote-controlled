import React from "react";
import {Link} from "react-router";
import {subscribe, get} from "./clientListModel";

class ClientList extends React.Component {
    constructor() {
        super();
        this.state = {list: get()};
        this.subscription = subscribe(list => {
            this.setState({list});
        });
    }
    componentWillUnmount() {
        this.subscription.dispose();
    }

    renderElement(client) {
        return (
            <li key={client.id}>
                <Link to={`/client/${client.id}`}>{client.id}</Link>
            </li>
        );
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <span className="navbar-brand">Connected clients</span>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <ul>
                        {this.state.list.map(client => this.renderElement(client))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ClientList;
