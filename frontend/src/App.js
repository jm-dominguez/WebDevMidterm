import React, { Component } from 'react';
import './App.css';
import {Search} from "./Components/Search.js"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      list: ""
    }

    this.searchInput = this.searchInput.bind(this);
    this.submit = this.submit.bind(this);
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
              if(allTags[tagArray[i]] !== undefined){
                allTags[tagArray[i]] += 1;

              }
              else{
                allTags[tagArray[i]] = 1;
              }
            }
          }
          
        })
        let array = Object.keys(allTags).map(function(k) { return {key: k, value: allTags[k]} });
        let orderedArray = array.sort(function(a,b){
          
          return b.value - a.value;
        });
        let plist = [];
        orderedArray.map(object =>{
          plist.push(object);
        });
        console.log(plist);
        this.setState({
          list: plist
        });
      })
    }
    
    
  }
  render() {
    return (
      <div className="App">
        <Search onInput={this.searchInput} onSubmit={this.submit} />

      </div>
    );
  }
}

export default App;
