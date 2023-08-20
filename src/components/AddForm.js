import { Button, Flex, NumberInput, Text, TextInput, Textarea } from '@mantine/core';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBook } from '../store/bookSlice';

const Addform = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)

  // refs
  const title = useRef(null)
  const price = useRef(null)
  const description = useRef(null)

  const dispatch = useDispatch()

  const handelSubmit = (e) => {
    e.preventDefault();
    if (title.current.value === "" ||
      price.current.value === "" ||
      description.current.value === "") {
      throw new Error("Please fill in the fields")
    } else {
      const data = {
        title: title.current.value,
        price: price.current.value,
        description: description.current.value,
      }
      dispatch(insertBook(data))
      title.current.value = null;
      price.current.value = null
      description.current.value = null
    }
  }

  return (
    <Flex
      mt="1rem"
      mb="1rem"
      align="center"
      direction="column" >
      <Text fz="1.5rem" fw="600" mb="1rem">Insert Book</Text>
      <form onSubmit={handelSubmit}>
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <TextInput
            label="Title"
            withAsterisk
            ref={title}
            id='title'
            w="100%"
            htmlFor='title'
          />
          <NumberInput
            label="Price"
            withAsterisk
            w="100%"
            htmlFor='price'
            ref={price}
            min={0}
            id='price'
          />
          <Textarea
            label="Description"
            withAsterisk
            w="100%"
            htmlFor='Description'
            ref={description}
            id='Description'
          />
          <Button type='submit' disabled={!isLoggedIn}>
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Addform;
