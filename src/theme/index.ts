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

const theme: Theme = {
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

export default theme;
