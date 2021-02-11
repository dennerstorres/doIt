import React from 'react';

import { Container, TaskText } from './styles';

function Task({item}) {
  return(
    <Container>
      <TaskText>{item.task}</TaskText>
    </Container>
  );
}

export default Task;