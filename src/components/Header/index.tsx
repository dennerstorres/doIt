import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  ActionButton,
  BackButton,
  RightActions,
  ThemeToggle,
} from './styles';
import {RootStackParamList} from '../../types';
import {useTheme} from '../../context/ThemeContext';

interface HeaderProps {
  showBackButton?: boolean;
  showStatsButton?: boolean;
  showHistoryButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  showStatsButton = true,
  showHistoryButton = false,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {themeMode, toggleTheme} = useTheme();

  return (
    <Container $topInset={insets.top}>
      {showBackButton ? (
        <BackButton onPress={onBack} testID='header-back-button'>
          <Icon name='arrow-left' size={24} color='#fff' />
        </BackButton>
      ) : (
        showHistoryButton && (
          <BackButton
            onPress={() => navigation.navigate('History')}
            testID='header-history-button'>
            <Icon name='archive' size={24} color='#fff' />
          </BackButton>
        )
      )}

      <Title>doIt</Title>

      <RightActions>
        {!showBackButton && (
          <ThemeToggle
            onPress={toggleTheme}
            testID='header-theme-toggle'
            $hasMargin={showStatsButton}>
            <Icon
              name={themeMode === 'light' ? 'moon' : 'sun'}
              size={24}
              color='#fff'
            />
          </ThemeToggle>
        )}
        {!showBackButton && showStatsButton && (
          <ActionButton
            onPress={() => navigation.navigate('Statistics')}
            testID='header-stats-button'>
            <Icon name='bar-chart-2' size={24} color='#fff' />
          </ActionButton>
        )}
      </RightActions>
    </Container>
  );
};

export default Header;
