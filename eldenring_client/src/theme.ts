import { createTheme } from '@mui/material/styles';

interface CustomThemeStyle {
  letterSpacing: string,
  fontFamily: string,
  borderRadius: string,
  transition: string,
  bottomNavigationBarHeight: number,
  inputHeight: number,
  inputPadding: number,
  shadow: string,
}

interface CustomThemeColor {
  white: React.CSSProperties['color'],
  black: React.CSSProperties['color'],
  pri: {
    main: React.CSSProperties['color'],
    light: React.CSSProperties['color'],
    disabled: React.CSSProperties['color']
  },
  acc: React.CSSProperties['color'],
  suc: React.CSSProperties['color'],
  err: React.CSSProperties['color'],
  text: {
    main: React.CSSProperties['color'],
    sub: React.CSSProperties['color'],
    light: React.CSSProperties['color']
  },
  border: React.CSSProperties['color'],
  background: React.CSSProperties['color'],
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    inner: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    style: CustomThemeStyle,
    color: CustomThemeColor
  }
  interface ThemeOptions {
    style: CustomThemeStyle,
    color: CustomThemeColor
  }
  interface TypographyVariants {
    inner: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    inner: React.CSSProperties;
  }
}

const theme = createTheme({
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1280,
  //     xl: 1600
  //   }
  // },
  style: {
    letterSpacing: '-0.3px',
    fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
    borderRadius: '4px',
    transition: '0.3s ease-in-out',
    bottomNavigationBarHeight: 60,
    inputHeight: 46,
    inputPadding: 12,
    shadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  color: {
    white: '#ffffff',
    black: '#1e1e1e',
    pri: {
      main: 'rgba(32, 201, 151, 1)',
      light: 'rgba(32, 201, 151, 0.2)',
      disabled: 'rgba(32, 201, 151, 0.6)'
    },
    acc: '#ffc107',
    suc: '#0d6efd',
    err: '#dc3545',
    text: {
      main: '#e9ecef',
      sub: '#adb5bd',
      light: '#6c757d'
    },
    border: '#343a40',
    background: '#343a40'
  },
  palette: {
    primary: {
      main: 'rgba(32, 201, 151, 1)',
    }
  },
  typography: {
    allVariants: {
      wordBreak: 'break-word',
      letterSpacing: '-0.3px',
      lineHeight: 1.4,
      fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
      color: '#e9ecef'
    },
    inner: {
      wordBreak: 'break-word',
      letterSpacing: '-0.3px',
      lineHeight: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true
      }
    }
  }
});

export default theme;