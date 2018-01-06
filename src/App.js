import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import BookShelves from './BookShelves';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: null //null instead of [] to get a falsy value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  /**
   * @description Update book shelf
   * @param {object contain a book id} id 
   * @param {string contain book shelf} shelf 
   */
  handleChange(id, shelf) {
    BooksAPI.update(id, shelf).then(() => {
      id.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== id.id).concat([ id ])
      }))
    });
  }

  render() {
    const { books } = this.state;
    //the shelf name is put into one single Array so it is easier to manage
    //and minimize bug
    const shelfArray = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className='books-app'>
        <div className='app-title'>My Reads</div>
        {/**
         * if books array still null/falsy then Loading...
         */}
        {!books ? <div style={{fontSize: 25, textAlign: 'center'}}>L o a d i n g</div> : 
        <Route exact path='/' render={() => (
          <div className='book-shelves'>
          {/**
           * filter the books array according to its shelf
           * shelfName is the shelfName in array Currently Reading, Want To Read or Read
           * shelfArray is passing down to children to render it in select Tag option value
           */}
            {shelfArray.map((shelf, idx) => 
              <BookShelves 
                key={idx}
                bookshelf={books.filter(
                  book => book.shelf === shelf)} 
                shelfName={shelf}
                shelfArray={shelfArray}
                onChange={this.handleChange} />
            )}
            <Link to='/search' className='search-books'>
              <p>Add a book</p>
            </Link>
          </div>          
        )}/>}
        {/**
         * myBooks return only id and shelf because this 2 parameter is important
         * to update the shelf in search page. it also for better performance.
         * shelfArray again passed to Search page then to BookGrid to render it in select tag option value.
         */}
        <Route path='/search' render={() => (
          <Search
            myBooks={books.map((b) => ({id: b.id, shelf: b.shelf}))}
            onChange={this.handleChange}
            shelfArray={shelfArray}
           />
        )}/>
      </div>
    );
  }
}

export default App;
