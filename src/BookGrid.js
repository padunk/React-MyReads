import React from 'react';
import PropTypes from 'prop-types';
import toUsualText from './utils/TextFunction';

/**
 * @description BookGrid Component to show each book. this is just stateless function
 * component because it just render the UI and nothing else.
 * @param {*props from parent component} props 
 */
const BookGrid = (props) => {
  return(
  <div className='books-list-items'>
    <li>
      {/**
       * there is some books that don't have imageLinks or authors value, so if the books
       * don't have those keys it won't render it.
       * Again toUsualText function is use here to convert camelCase string to Camel Case.
       */}
      {props.book.imageLinks && <img className='img-responsive' src={props.book.imageLinks.thumbnail} alt={props.book.title} />}
        <div className='select-option'>
          <select defaultValue={props.book.shelf} onChange={event => {props.onChange(props.book, event.target.value)}}>
            <option value='none' disabled='true'>Move to...</option>
            {props.shelfArray.map((shelf, idx) => 
              <option key={idx} value={shelf}>{toUsualText(shelf)}</option>
            )}
            <option value='none'>None</option>
          </select>
        </div>
          <a href={props.book.infoLink} target='_blank'>
            <p className='book-title'><strong>{props.book.title}</strong></p>
          </a>
          {props.book.subtitle && <p className='book-title' style={{fontSize: 15}}><em>{props.book.subtitle}</em></p>}
          {/*author maybe more than 2*/}
          {props.book.authors && props.book.authors.map((author, idx) => (
            <p key={idx} className='book-author'>{author}</p>
          ))}
    </li>
  </div>
  )
}

BookGrid.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  shelfArray: PropTypes.array.isRequired
}

export default BookGrid;