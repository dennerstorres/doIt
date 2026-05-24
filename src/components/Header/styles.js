import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${props => props.theme.colors.primary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.size.xlarge};
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const ThemeToggle = styled.TouchableOpacity`
  position: absolute;
  right: ${props => props.theme.spacing.large};
`;
