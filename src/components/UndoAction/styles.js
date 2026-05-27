import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background-color: ${({theme}) => theme.colors.text};
  border-radius: 8px;
  padding: 12px 16px;
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
  padding: 4px 8px;
`;

export const UndoText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${({theme}) => theme.typography.size.medium};
  font-weight: ${({theme}) => theme.typography.weight.bold};
  text-transform: uppercase;
`;
