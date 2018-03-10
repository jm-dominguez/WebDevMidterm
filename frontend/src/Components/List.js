import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';

export class List extends React.Component{
    render(){
        console.log(this.props);
        if(this.props.tags.length === 0){
            return (<div>
                </div>);
        }
        else{
            return(
                <div>
                <div className="row">
                    <div className="col-sm-5"></div>
                    <h2> Search Results </h2>
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <ListGroup>
                        {
                            this.props.tags.map(tag =>{
                                return <ListGroupItem key={tag.key}> {tag.key} </ListGroupItem>
                            })
                        }
                    </ListGroup>
                </div>
                <div className="col-sm-6">
                <ListGroup>
                    {
                        this.props.tags.map(tag =>{
                            return <ListGroupItem key={"value" + tag.key}> {"Number of times repeated: " + tag.value} </ListGroupItem>
                        })
                    }
                </ListGroup>
            </div>
            </div>
            </div>
            );
        }
    }
}