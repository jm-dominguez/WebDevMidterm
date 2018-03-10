import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';

export class Historic extends React.Component{
    render(){
        if(this.props.tags.length === 0){
            return (<div>
                </div>);
        }
        else{
            return(
                <div>
                <div className="row">
                    <div className="col-sm-5"></div>
                    <h2> Historical Queries </h2>
                </div>
                <div className="row">
                    <div className = "col-sm-2"> </div>
                    <ListGroup>
                        {
                            this.props.tags.map((tag,i) =>{
                                return <ListGroupItem key={"h" + tag.tag + i}> {tag.tag} </ListGroupItem>
                            })
                        }
                    </ListGroup>
            </div>
            </div>
            );
        }

    }
}