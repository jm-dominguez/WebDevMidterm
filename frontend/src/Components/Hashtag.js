import React from "react";
import styles from "../Style/Hashtag.css"

export class Hashtag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mostRepeated: ""
        }
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

    render(){
        return(
            <div className="hash">
                <p> The Most Repeated Tag is: </p>
                <h2 id="hashtag"> # {this.state.mostRepeated} </h2>
            </div>
        );
    }
}