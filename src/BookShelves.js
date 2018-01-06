import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toUsualText from './utils/TextFunction';
import BookGrid from './BookGrid';

class BookShelves extends Component {
  render() {
    const { shelfName, bookshelf, onChange, shelfArray } = this.props;

    return(
      <div className='shelf'>
      {/**
       * toUsualText is a function to turn camel case string to usual string with Uppercase.
       * example = currentlyReading will become Currently Reading
       * booshelf.length is for showing how many book is in each shelf.
       */}
        <h3 className='shelf-name'>{`${toUsualText(shelfName)} : ${bookshelf.length} ${bookshelf.length > 1 ? 'Books' : 'Book'}`}</h3>
        <hr />
        <ul className='books-list'>
        {/**
         * bookshelf array then map to BookGrid Component. This is because BookGrid component
         * could be reuse in Search Page / Search.js file
         */}
          {bookshelf.map((book) => (
            <BookGrid
            key={book.id}
            book={book}
            onChange={onChange}
            shelfName={shelfName}
            shelfArray={shelfArray}
             />
          ))}
        </ul>
      </div>      
    )
  }
}

BookShelves.propTypes = {
  bookshelf: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  shelfArray: PropTypes.array.isRequired
}

export default BookShelves;