import { Flex } from '@mantine/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, getBook, getBooks } from '../../store/bookSlice';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';

const PostContainer = () => {
  const [selectedBook, setSelectedBook] = useState({})
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { isLoading, books, bookInfo } = useSelector((state) => state.books)
  // const { title, description, price } = useSelector((state) => state.read)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks({ id: 1 }))
  }, [dispatch])



  const getBookId = (id) => {
    const selectedBook = books.find((item) => item.id === id)
    setSelectedBook((prev) => {
      return { ...prev, ...selectedBook }
    })
  }

  return (
    <Fragment>
      <hr />
      <div >
        <Flex
          mih={50}
          gap="lg"
          justify="space-around"
          align="flex-start"
          direction="row"
          wrap="wrap"
          mt="1rem"
        >
          <div className='col'>
            <BooksList
              isLoading={isLoading}
              books={books}
              isLoggedIn={isLoggedIn}
              deleteBook={deleteBook}
              getBook={getBook}
              dispatch={dispatch}
              getBookId={getBookId} />
          </div>
          <hr />
          <div className='col side-line'>
            <BookInfo bookInfo={bookInfo} info={selectedBook} />
          </div>
        </Flex>
      </div>
    </Fragment>
  );
};

export default PostContainer;
