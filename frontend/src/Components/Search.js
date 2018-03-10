import React from "react";
import styles from "../Style/Search.css"

export class Search extends React.Component{
    render(){
        return(
            <div className = "search">
            <form>
                <input type = "search" onChange={this.props.onInput} id="search" placeholder="Insert Tag"/>
                <br/>
                <br/>
                <input type = "submit" value="Explore Tag" onClick={this.props.onSubmit} id="btn"/>
            </form>
            </div>
        );
    }
}