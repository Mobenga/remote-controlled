import React from "react";
import {toggleCheckbox, deleteItem} from "../model";

const textStyle = {
    cursor: `pointer`,
};

const deleteIconStyle = {
    cursor: `pointer`,
};

const checkboxStyle = {
    width: 30,
    display: `inline-block`,
};

class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            hover: false,
        };
    }
    mouseEnter() {
        this.setState({
            hover: true,
        });
    }
    mouseLeave() {
        this.setState({
            hover: false,
        });
    }
    renderCheckbox() {
        if (this.props.data.checked) {
            return <span style={checkboxStyle} className="glyphicon glyphicon-ok" />;
        } else {
            return <span style={checkboxStyle} >&nbsp;</span>;
        }
    }
    renderDeleteIcon() {
        return <span
                style={deleteIconStyle}
                onClick={() => deleteItem(this.props.data.index)}
                className="glyphicon glyphicon-ban-circle"/>;
    }
    render() {
        return (
            <div className="row"> 
                <div className="col-xs-10">
                    {this.renderCheckbox()}
                    <a style={textStyle}
                        onClick={() => {
                            toggleCheckbox(this.props.data.index);
                        }}>{this.props.data.text}</a>
                </div>
                <div className="col-xs-2">
                    {this.renderDeleteIcon()}
                </div>
               
            </div>
        );
    }
}

export default ListItem;
