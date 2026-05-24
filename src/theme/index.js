const common = {
  spacing: {
    nano: '2px',
    tiny: '5px',
    small: '8px',
    medium: '10px',
    large: '15px',
    xlarge: '20px',
    huge: '50px',
  },
  typography: {
    size: {
      small: '12px',
      medium: '14px',
      large: '16px',
      xlarge: '24px',
    },
    weight: {
      regular: '400',
      bold: '700',
    },
  },
};

export const light = {
  ...common,
  colors: {
    primary: '#49a078',
    secondary: '#216869',
    background: '#dce1de',
    text: '#1f2421',
    accent: '#9cc5a1',
    error: '#FF0000',
    white: '#ffffff',
  },
};

export const dark = {
  ...common,
  colors: {
    primary: '#216869',
    secondary: '#49a078',
    background: '#1f2421',
    text: '#dce1de',
    accent: '#9cc5a1',
    error: '#FF0000',
    white: '#ffffff',
  },
};

export default light;
