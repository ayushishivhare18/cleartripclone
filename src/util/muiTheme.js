import { createTheme } from "@mui/material";

export const CustomTheme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 300, //mobile
      smm: 450,
      sm: 600,
      md: 900,
      lg: 1024,
      xl: 1280,
    },
  },
});