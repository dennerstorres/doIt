/* eslint-disable no-undef */
jest.mock(
  'react-native-gesture-handler',
  () => {
    const View = require('react-native').View;
    return {
      Swipeable: View,
      DrawerLayout: View,
      State: {},
      ScrollView: View,
      Slider: View,
      Switch: View,
      TextInput: View,
      ToolbarAndroid: View,
      ViewPagerAndroid: View,
      DrawerLayoutAndroid: View,
      WebView: View,
      NativeViewGestureHandler: View,
      TapGestureHandler: View,
      FlingGestureHandler: View,
      ForceTouchGestureHandler: View,
      LongPressGestureHandler: View,
      PanGestureHandler: View,
      PinchGestureHandler: View,
      RotationGestureHandler: View,
      RawButton: View,
      BaseButton: View,
      RectButton: View,
      BorderlessButton: View,
      Directions: {},
    };
  },
  {virtual: true},
);

jest.mock(
  'react-native-gesture-handler/Swipeable',
  () => {
    const View = require('react-native').View;
    return View;
  },
  {virtual: true},
);

jest.mock(
  'react-native-reanimated',
  () => {
    const View = require('react-native').View;
    return {
      Value: jest.fn(),
      event: jest.fn(),
      add: jest.fn(),
      eq: jest.fn(),
      set: jest.fn(),
      cond: jest.fn(),
      interpolate: jest.fn(),
      View: View,
      Extrapolate: {CLAMP: 'clamp'},
      Transition: {
        Together: jest.fn(),
        Out: jest.fn(),
        In: jest.fn(),
      },
    };
  },
  {virtual: true},
);

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Global mock for LayoutAnimation and UIManager as identified in project memories
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  ...jest.requireActual(
    'react-native/Libraries/LayoutAnimation/LayoutAnimation',
  ),
  configureNext: jest.fn(),
  Presets: {
    easeInEaseOut: 'easeInEaseOut',
    linear: 'linear',
    spring: 'spring',
  },
  Types: {
    spring: 'spring',
    linear: 'linear',
    easeInEaseOut: 'easeInEaseOut',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    keyboard: 'keyboard',
  },
  Properties: {
    opacity: 'opacity',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    scaleXY: 'scaleXY',
  },
}));

// Mocking Linking to avoid errors during Navigation unmounting
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  addEventListener: jest.fn().mockReturnValue({remove: jest.fn()}),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn().mockResolvedValue(null),
}));

const {UIManager} = require('react-native');
if (UIManager) {
  UIManager.configureNextLayoutAnimation = jest.fn();
}

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const View = require('react-native').View;
  return {
    SafeAreaProvider: ({children}) => children,
    SafeAreaConsumer: ({children}) =>
      children({top: 0, left: 0, right: 0, bottom: 0}),
    useSafeAreaInsets: () => ({top: 0, left: 0, right: 0, bottom: 0}),
    useSafeAreaFrame: () => ({x: 0, y: 0, width: 390, height: 844}),
  };
});
