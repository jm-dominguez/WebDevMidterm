import React from "react";

export class Search extends React.Component{
    render(){
        return(
            <div className = "search">
            <form>
                <input type = "search" onChange={this.props.onInput}/>
                <br/>
                <input type = "submit" value="submit" onClick={this.props.onSubmit}/>
            </form>
            </div>
        );
    }
}