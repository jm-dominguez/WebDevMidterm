import React, { Component } from 'react';
import './App.css';
import {Search} from "./Components/Search.js"
import {Header} from "./Components/Header.js"
import {List} from "./Components/List.js"

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
  }
  componentDidMount(){
    fetch("/tags")
    .then(response => response.json())
    .then(json =>{
      console.log(json);
    });

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

        this.setState({
          list: bestTen
        });
        
      })
    }
    
    
  }
  render() {
    return (
      <div className="App">
        <Header />
        <br/>
        <br/>
        <Search onInput={this.searchInput} onSubmit={this.submit} />
        <br/>
        <br/>
        <div className = "col-sm-6">
          <List tags={this.state.list} />
        </div>
      </div>
    );
  }
}

export default App;
