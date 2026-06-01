import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Title} from './styles';

const Header: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container $topInset={insets.top}>
      <Title>doIt</Title>
    </Container>
  );
};

export default Header;
