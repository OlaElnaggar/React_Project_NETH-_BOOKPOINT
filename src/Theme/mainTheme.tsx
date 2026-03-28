import { createTheme } from '@mui/material/styles';

 export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#CC9600",
      contrastText:"#000"
    },
    warning:{
     main: "#4B330B",
     contrastText:"#fff"
    }
    
  },
  typography:{
    fontFamily:"Bona Nova, serif;"
  }
});