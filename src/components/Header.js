import { Alert, Button, Container, Flex, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInOut } from '../store/authSlice';


const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.books)

  return (
    <Fragment>
      {error && <Alert icon={<IconAlertCircle size="1rem" />} title={error} color="red" withCloseButton />}
      <Container size="xl" bg="#212529">
        <Flex
          mih={50}
          bg="none"
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
          p="1rem"
        >
          <Text fz="2rem" fw="600" color='white'>My Books</Text>
          <Button variant="outline" type='submit' onClick={() => dispatch(logInOut())}>
            {isLoggedIn ? 'Logout' : 'login'}
          </Button>
        </Flex>
      </Container>
    </Fragment>
  );
};

export default Header;
