import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useAppTheme} from '../../context/ThemeContext';
import {Container, Title, ThemeToggle} from './styles';

function Header() {
  const {themeName, toggleTheme} = useAppTheme();

  return (
    <Container>
      <Title>doIt</Title>
      <ThemeToggle onPress={toggleTheme}>
        <Icon
          name={themeName === 'light' ? 'moon' : 'sun'}
          size={24}
          color='#fff'
        />
      </ThemeToggle>
    </Container>
  );
}

export default Header;
