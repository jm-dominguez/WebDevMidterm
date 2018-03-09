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
    if(this.state.search !== ""){
      let baseUrl = "https://instagram.com/explore/tags/" + this.state.search + "/?__a=1";
      fetch(baseUrl)
      .then(response => response.json())
      .then(json =>{
        let photos = json.graphql.hashtag.edge_hashtag_to_top_spots;
        console.log(photos);
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
