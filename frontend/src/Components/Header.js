import React from "react";
import { Jumbotron, Container } from "reactstrap";
import styles from "../Style/Header.css";

export class Header extends React.Component{
    render(){
        return(
            <div>
                <Jumbotron fluid id="header">
                <Container fluid>
                    <h1 className="display-3">InstaTag</h1>
                    <img id="logo" src="https://images.vexels.com/media/users/3/137197/isolated/preview/fb944c570182b6e89eb21f41f8c4522b-instagram-silueta-colorida-by-vexels.png" alt="InstagramLogo"/>
                    <p className="lead">This is a simple react app.</p>
                    <hr className="my-2" />
                    <p>It shows the tags that are used the most beside another tag</p>
                </Container>
                </Jumbotron>

            </div>
        );
    }
}