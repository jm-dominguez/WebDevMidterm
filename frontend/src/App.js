import React, { Component } from 'react';
import './App.css';
import {Container} from "reactstrap";
import {Search} from "./Components/Search.js"
import {Header} from "./Components/Header.js"
import {List} from "./Components/List.js"
import {Historic} from "./Components/Historic.js"
import {Hashtag} from "./Components/Hashtag.js"

var colors = ["white", "blue", "yellow", "pink"]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      list: [],
      history: []
    }

    this.searchInput = this.searchInput.bind(this);
    this.submit = this.submit.bind(this);
    this.sendMostVisited = this.sendMostVisited.bind(this);
  }

  sendMostVisited(pList){
    if(pList.length > 0){
      let ptag = pList[0].key;
      let pvalue = pList[0].value;
      fetch("/mostRepeated", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        "Content-Type": "application/json"},
        body: JSON.stringify({
          tag: ptag,
          value: pvalue
        })
      }).catch(err =>{
        alert("Se produjo un error");
      });
    }
  }
  
  searchInput(e){
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
  }
  submit(e){
    e.preventDefault();
    console.log(this.state.search);
    if(this.state.search.includes(" ")){
      alert("You can´t use spaces in a tag");
      return;
    }
    let allTags = {};
    if(this.state.search !== ""){
      let baseUrl = "https://instagram.com/explore/tags/" + this.state.search + "/?__a=1";
      fetch(baseUrl)
      .then(response => response.json())
      .then(json =>{
        let photos = json.graphql.hashtag.edge_hashtag_to_top_posts.edges;
        photos.map((photo, index)=>{
          let tags = photo.node.edge_media_to_caption.edges[0].node.text;
          let tagArray = tags.split(" ");
          for(let i = 0; i < tagArray.length; i++){
            if(tagArray[i].startsWith("#")){
              if(allTags[tagArray[i].toUpperCase()] !== undefined){
                allTags[tagArray[i].toUpperCase()] += 1;

              }
              else{
                allTags[tagArray[i].toUpperCase()] = 1;
              }
            }
          }
          
        })
        let array = Object.keys(allTags).map(function(k) { return {key: k, value: allTags[k]} });
        let orderedArray = array.sort(function(a,b){
          
          return b.value - a.value;
        });
        console.log(orderedArray);
        let bestTen = [];
        let max;
        if(orderedArray.length < 10){
          max = orderedArray.length;
        }
        else{
          max = 10;
        }
        for(let c = 0; c < max; c++){
          bestTen.push(orderedArray[c]);
        }

        console.log(bestTen);
        fetch("/tags", {
          method: "POST",
          headers: {
            "Accept": "application/json",
          "Content-Type": "application/json"},
          body: JSON.stringify({
            tag: this.state.search
          })
          }).catch(err =>{
            alert("Se produjo un error");

        }).then(
          fetch("/tags")
          .then(response => response.json())
          .then(json =>{
          this.sendMostVisited(bestTen);
          this.setState({history: json.tags, list: bestTen});
          })
        ).catch((error)=>{
          alert("There was an error");
        });

        
      })
      
    }
    
    
  }
  render() {
    let bgcolor = Math.random() * 3
    return (
      <Container fluid>
      <div className="App" style={{backgroundColor: "#f2f2f2"}}  >
        <Header />
        <br/>
        <br/>
        <div className = "row">
          <div className="col-sm-6">
          <Search onInput={this.searchInput} onSubmit={this.submit} />
          </div>
          <div className = "col-sm-6">
          <Hashtag />
          </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className = "col-sm-6">
            <List tags={this.state.list} />
          </div>
            <Historic tags={this.state.history} />
        </div>
      </div>
      </Container>
    );
  }
}

export default App;
