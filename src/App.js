import React, { Component } from "react";

import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    filteredAuthors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      let response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      let authors = response.data;
      this.setState({
        loading: false,
        authors: authors,
        filteredAuthors: authors
      });
      console.log(authors);
    } catch (error) {
      console.log(error);
    }
  }

  checkLoading = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return <div className="content col-10">{this.getContentView()}</div>;
    }
  };

  selectAuthor = async author => {
    const authorID = author.id;
    console.log(authorID);
    this.setState({ loading: true });
    try {
      let response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${authorID}`
      );
      let author = response.data;
      this.setState({
        currentAuthor: author,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.checkLoading()}</div>;
        </div>
      </div>
    );
  }
}

export default App;
