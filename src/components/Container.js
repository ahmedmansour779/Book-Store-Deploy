import { Container } from '@mantine/core';
import React from 'react';

const ContainerApp = ({ children }) => {
  return <Container size="xl">{children}</Container>;
};

export default ContainerApp;
