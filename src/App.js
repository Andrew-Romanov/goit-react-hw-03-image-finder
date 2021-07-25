import React, { Component } from 'react';
import MainContainer from './components/MainContainer';
import PageHeader from './components/PageHeader';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
// import axios from 'axios';

// const ArticleList = ({ articles }) => (
//   <ul>
//     {articles.map(({ objectID, url, title }) => (
//       <li key={objectID}>
//         <a href={url} target="_blank" rel="noreferrer noopener">
//           {title}
//         </a>
//       </li>
//     ))}
//   </ul>
// );

class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
  };

  componentDidMount() {}

  whenSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    // const { articles, isLoading } = this.state;

    return (
      <MainContainer>
        <PageHeader title="React Homework 03. Image Finder" />

        <Searchbar whenSubmit={this.whenSubmit} />

        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>

        {/* {isLoading ? <p>Is loading...</p> : <ArticleList articles={articles} />} */}
      </MainContainer>
    );
  }
}

export default App;
