import React from "react";
import { Jumbotron, Button } from "reactstrap";

export class Header extends React.Component{
    render(){
        return(
            <div>
                <Jumbotron>
                    <h1 className="display-3">InstaTag</h1>
                    <p className="lead">This is a simple react app.</p>
                    <hr className="my-2" />
                    <p>It shows the tags that are used the most beside another tag</p>
                </Jumbotron>

            </div>
        );
    }
}