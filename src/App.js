import React, { Component } from 'react';
import MainContainer from './components/MainContainer';
import PageHeader from './components/PageHeader';
import Searchbar from './components/Searchbar';
import axios from 'axios';

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

class App extends Component {
  state = {
    userInput: '',
    articles: [],
    isLoading: false,
  };

  componentDidMount() {
    // async function getArticles() {
    //   try {
    //     const response = await axios.get('https://hn.algolia.com/api/v1/search?query=react');
    //     console.log(response.data.hits);
    //     this.setState({ articles: response.data.hits });
    //   } catch (error) {
    //     console.error(error);
    //   };
    // };

    // getArticles();
    this.setState({ isLoading: true });

    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then(response =>
        this.setState({ articles: response.data.hits, isLoading: false }),
      )
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  whenSubmit = ({ userInput }) => {
    console.log(userInput);
  };

  render() {
    const { articles, isLoading } = this.state;

    return (
      <MainContainer>
        <PageHeader title="React Homework 03. Image Finder" />

        <Searchbar whenSubmit={this.whenSubmit} />

        {/* return articles.length > 0 ? <ArticleList articles={articles} /> : null; */}
        {isLoading ? <p>Is loading...</p> : <ArticleList articles={articles} />}
        {isLoading ? <p>Is loading...</p> : <ArticleList articles={articles} />}
        {isLoading ? <p>Is loading...</p> : <ArticleList articles={articles} />}
      </MainContainer>
    );
  }
}

// import { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import MainContainer from './components/MainContainer';
// import PageHeader from './components/PageHeader';
// import Section from './components/Section';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';
// import Filter from './components/Filter';

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contactsData = JSON.parse(localStorage.getItem('contacts'));
//     if (contactsData) this.setState({ contacts: contactsData });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts)
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   whenSubmit = ({ name, number }) => {
//     if (this.state.contacts.some(contact => contact.name === name))
//       return alert(`${name} is already in contacts`);

//     this.setState(prevState => ({
//       contacts: [{ id: uuidv4(), name, number }, ...prevState.contacts],
//     }));
//   };

//   whenDelete = idToDelete => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
//     }));
//   };

//   render() {
//     return (
//       <MainContainer>
//         <PageHeader title="React Homework 02. Phonebook" />

//         <Section title="Add Contact">
//           <ContactForm whenSubmit={this.whenSubmit} />
//         </Section>

//         <Section title="Contacts">
//           <Filter
//             filterValue={this.state.filter}
//             whenChange={this.handleChange}
//           />
//           <br />
//           <ContactList currentState={this.state} whenDelete={this.whenDelete} />
//         </Section>
//       </MainContainer>
//     );
//   }
// }

export default App;
