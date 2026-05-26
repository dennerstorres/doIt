import React from 'react';
import {Container, FilterButton, FilterText} from './styles';

const filters = [
  {id: 'all', label: 'Todas'},
  {id: 'pending', label: 'Pendentes'},
  {id: 'completed', label: 'Concluídas'},
];

function Filters({activeFilter, onFilterChange}) {
  return (
    <Container>
      {filters.map(filter => (
        <FilterButton
          key={filter.id}
          active={activeFilter === filter.id}
          onPress={() => onFilterChange(filter.id)}
          testID={`filter-button-${filter.id}`}>
          <FilterText active={activeFilter === filter.id}>
            {filter.label}
          </FilterText>
        </FilterButton>
      ))}
    </Container>
  );
}

export default Filters;
