import { Button, Flex, Paper, Skeleton, Text } from '@mantine/core';
import { IconBook, IconTrash } from '@tabler/icons-react';
import React from 'react';


const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  getBook,
  getBookId
}) => {


  const BookList = books.length > 0 ? books.map((item) => (
    <>
      <Paper shadow="sm" p="md" withBorder>
        <Flex
          direction="row"
          justify="space-between"
          wrap="wrap"
          align="center"
          gap="1rem">
          <Text>{item.title}</Text>
          <Button.Group miw="5rem">
            <Button
              leftIcon={<IconBook />}
              variant="filled"
              color='blue'
              // ! first way
              // onClick={() => dispatch(getBook(item))}
              // !second way
              onClick={() => getBookId(item.id)}
            >Read</Button>
            <Button
              type='button'
              className='btn btn-danger'
              disabled={!isLoggedIn}
              onClick={() => dispatch(deleteBook(item))
                .unwrap()
                .then((originalPromiseResult) => {
                  console.log(originalPromiseResult)
                })
                .catch((rejectedValueOrSerializedError) => {
                  console.log(rejectedValueOrSerializedError)
                })}
              variant="filled"
              color="red"
              rightIcon={<IconTrash />}>Delete</Button>
          </Button.Group>
        </Flex>
      </Paper>
    </>
  )) : "There is no Books available"

  return (
    <div>
      {/* {console.log(title, price, description)} */}
      <Text fz="2rem" fw="600" mb="1rem">Books List</Text>
      {
        isLoading ?
          <>
            <Skeleton height={10} radius="xl" />
            <Skeleton height={10} mt={6} radius="xl" />
            <Skeleton height={10} mt={6} width="70%" radius="xl" />
          </>
          :
          (
            <>
              <div>
                {BookList}
              </div>
            </>
          )}

    </div>
  );
};

export default BooksList;
