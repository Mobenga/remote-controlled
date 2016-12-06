import React from "react";
import {Link} from "react-router";
import {subscribe, getList} from "../clientListModel";
import {pingClient} from "../clientModel";

class ClientList extends React.Component {
    constructor() {
        super();
        this.state = {list: getList()};
        this.subscription = subscribe(list => {
            this.setState({list});
        });
    }

    componentWillUnmount() {
        this.subscription.dispose();
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

    renderElement(client) {
        return (
            <li key={client.id}>
                <Link style={{fontFamily: `monospace`}} to={`/client/${client.id}`}>{client.id}</Link>
                <button style={{marginLeft:20}} onClick={() => pingClient(client.id)}>Ping client</button>
            </li>
        );
    }
}

export default ClientList;
