import { PaletteMode } from '@mui/material';

const colors = {
  white: '#fff',
  grey: '#8f8f93',
  darkGrey: '#1e1e1e',
  lightGrey: '#f6f9ff',
  lightOpacityGrey: '#c4c4c4',
  blueLightGrey: '#252736',
  blueDarkGrey: '#1e1d2b',
  blueOpacityGrey: '#66677c',
  primary: '#27aefc',
  secondary: '#5ae1ff',
  tertiary: '#0177fb',
  quaternary: '#3e99ff',
  quiternary: '#42b8ff',
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: colors.primary,
          secondary: colors.secondary,
          tertiary: colors.tertiary,
          quaternary: colors.quaternary,
          quiternary: colors.quiternary,
          background: {
            default: colors.white,
            complement: colors.lightGrey,
          },
          text: {
            primary: colors.darkGrey,
            secondary: colors.lightOpacityGrey,
          },
        }
      : {
          // palette values for dark mode
          primary: colors.primary,
          secondary: colors.secondary,
          tertiary: colors.tertiary,
          quaternary: colors.quaternary,
          quiternary: colors.quiternary,
          background: {
            default: colors.blueLightGrey,
            complement: colors.blueDarkGrey,
          },
          text: {
            primary: colors.white,
            secondary: colors.blueOpacityGrey,
            tertiary: colors.grey,
          },
        }),
  },
});
