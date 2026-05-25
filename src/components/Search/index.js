import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {
  SearchContainer,
  InputContainer,
  SearchInput,
  ClearButton,
} from './styles';

function Search({value, onChangeText}) {
  const theme = useTheme();

  return (
    <SearchContainer>
      <InputContainer>
        <Icon name='search' size={18} color={theme.colors.accent} />
        <SearchInput
          placeholder='Buscar tarefas...'
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          autoCapitalize='none'
        />
        {value.length > 0 && (
          <ClearButton
            onPress={() => onChangeText('')}
            testID='search-clear-button'>
            <Icon name='x' size={18} color={theme.colors.accent} />
          </ClearButton>
        )}
      </InputContainer>
    </SearchContainer>
  );
}

export default Search;
