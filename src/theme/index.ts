export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    error: string;
    white: string;
    info: string;
    warning: string;
  };
  spacing: {
    nano: string;
    tiny: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    huge: string;
  };
  typography: {
    size: {
      nano: string;
      tiny: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    weight: {
      regular: string;
      bold: string;
    };
  };
}

const spacing = {
  nano: '2px',
  tiny: '5px',
  small: '8px',
  medium: '10px',
  large: '15px',
  xlarge: '20px',
  huge: '50px',
};

const typography = {
  size: {
    nano: '8px',
    tiny: '10px',
    small: '12px',
    medium: '14px',
    large: '16px',
    xlarge: '24px',
  },
  weight: {
    regular: '400',
    bold: '700',
  },
};

export const light: Theme = {
  colors: {
    primary: '#49a078',
    secondary: '#216869',
    background: '#dce1de',
    text: '#1f2421',
    accent: '#9cc5a1',
    error: '#FF0000',
    white: '#ffffff',
    info: '#4a90e2',
    warning: '#f5a623',
  },
  spacing,
  typography,
};

export const dark: Theme = {
  colors: {
    primary: '#49a078',
    secondary: '#9cc5a1',
    background: '#1f2421',
    text: '#dce1de',
    accent: '#216869',
    error: '#FF5555',
    white: '#ffffff',
    info: '#4a90e2',
    warning: '#f5a623',
  },
  spacing,
  typography,
};

const theme = light;
export default theme;
