import React from "react";
import styles from "../Style/Hashtag.css"
import { Button } from 'reactstrap';

export class Hashtag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mostRepeated: ""
        }

        this.update = this.update.bind(this);
    }

    componentWillMount(){
        fetch("/mostRepeated")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                mostRepeated: json.message[0].tag
            });
        });
    }

    update(){
        fetch("/mostRepeated")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                mostRepeated: json.message[0].tag
            });
        });
    }

    render(){
        return(
            <div className="hash">
                <p> The Most Repeated Tag is: </p>
                <h2 id="hashtag"> {this.state.mostRepeated} </h2>
                <br/>
                <Button color="primary" onClick={this.update}>Update</Button>
            </div>
        );
    }
}