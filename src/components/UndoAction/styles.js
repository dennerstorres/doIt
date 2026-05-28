import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom: ${({theme, $bottomInset}) => {
    const base = parseInt(theme.spacing.xlarge, 10);
    const inset = $bottomInset || 0;
    return `${base + inset}px`;
  }};
  left: ${({theme}) => theme.spacing.xlarge};
  right: ${({theme}) => theme.spacing.xlarge};
  background-color: ${({theme}) => theme.colors.text};
  border-radius: ${({theme}) => theme.spacing.small};
  padding: ${({theme}) => `${theme.spacing.medium} ${theme.spacing.large}`};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const Message = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.typography.size.medium};
  font-weight: ${({theme}) => theme.typography.weight.regular};
`;

export const UndoButton = styled.TouchableOpacity`
  padding: ${({theme}) => `${theme.spacing.tiny} ${theme.spacing.small}`};
`;

export const UndoText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${({theme}) => theme.typography.size.medium};
  font-weight: ${({theme}) => theme.typography.weight.bold};
  text-transform: uppercase;
`;
