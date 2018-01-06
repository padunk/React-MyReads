import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';

const maxResult = 20; //maximum result capped at 20

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBooks: [],
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * clear the timeout for this.interval
   */
  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  /**
   * @description function to search for new books and also update the shelf.
   * updateShelf function is for update the shelf when user add the books to user's shelf
   * @param {*user input text to search for books} query 
   */
  updateSearch(query){
    let updateBooks = [];
    const { myBooks } = this.props; //an array contain collection of user's book's id and book's shelf

    BooksAPI.search(query, maxResult)
    .then((newBooks) => {
      updateBooks = updateShelf(newBooks, myBooks); //update the shelf before display the result
      this.setState({ allBooks: updateBooks });
    })
    .catch((e) => alert(`Something is Wrong! Here is the detail: ${e}`)) //if the api is error
  }

  /**
   * handle the random button to display random books
   */
  handleClick(){
    let updateBooks = [];    
    const { myBooks } = this.props; //an array contain collection of user's book's id and book's shelf
    const randomKeywords = [
      'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 
      'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 
      'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 
      'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 
      'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 
      'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 
      'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 
      'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 
      'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 
      'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ];
    let randomQuery = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];

    BooksAPI.search(randomQuery, maxResult)
    .then((newBooks) => {
      updateBooks = updateShelf(newBooks, myBooks); //update the shelf before display the result
      this.setState({ allBooks: updateBooks });
    })
    .catch((e) => alert(`Something is Wrong! Here is the detail: ${e}`)) //if the api is error    
  }

  render() {
    const {allBooks} = this.state;
    const { shelfArray, onChange } = this.props;

    return (
      <div className='book-shelves'>
        <div className='search-books-bar'>
          <Link to='/' className='back-to-home'><p>Back</p></Link>
          <div className='search-books-input-wrapper'>
          {/**
           * use onKeyUp and Timeout so user could finish type their keyword
           * and then start searching.
           */}
            <input 
              type='text'
              autoFocus='true'
              required='true'
              placeholder='Search by Title or Author'
              onKeyUp={event => {
                let query = event.target.value
                this.interval = setTimeout(() => 
                this.updateSearch(query.trim()), 2000)
              }} />
          </div>
          <div className='btn' >
            {/**
             * Random button to display random books based on keywords
             */}
            <button className='random-button' onClick={this.handleClick}>Random Books</button>
          </div>
        </div>
        <div className='shelf'>
          <ul className='books-list'>
          {/**
           * map the updated array
           * shelfArray is passed down to BookGrid for select tag option value
           */}
            {allBooks.map((book) => (
              <BookGrid
                key={book.id}
                book={book}
                onChange={onChange}
                shelfArray={shelfArray}
               />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

/**
 * @description because the shelf in the backend server is not update,
 * this function will compare and update the shelf if the book already in user shelf.
 * @param {*result from BookAPI.search (an Array)} addbook 
 * @param {*array contain id and shelf from user book shelf} collection 
 */
var updateShelf = (addbook, collection) => {
  addbook.map(b => b.shelf = 'none'); //set all the shelf to none first
  //update the result of search book. Compare the id and shelf with user's book.
  addbook.map(book =>
    collection.map(item => {return book.id === item.id ?
      book.shelf = item.shelf : null;
    })
  );
  return addbook;
}

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  shelfArray: PropTypes.array.isRequired
}

export default Search;