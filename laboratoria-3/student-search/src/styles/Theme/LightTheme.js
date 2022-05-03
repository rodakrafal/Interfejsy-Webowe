import { createTheme } from "@mui/material";

const primaryColor = "#1565c0";

const secondaryColor = "#7081A6";

const primaryBackgroundColor = "#F5F5F5";

const lightTheme = createTheme({
    // palette: {
    //     primary: {
    //         main: primaryColor,
    //     },
    //     secondary: {
    //         main: secondaryColor,
    //     },
    // },
    components: {
        MuiAppBar: {
            styleOverrides:{
                root:{
                    backgroundColor: primaryBackgroundColor,
                    color: primaryColor,
                    border: "none",
                    boxShadow: "none",
                    padding: "0px 20px",
                }
            }

        },  
        // MuiButton: {
        //     styleOverrides:{
        //         root:{
        //             padding: "8px 24px",
        //             transition: "all 0.3s ease",
        //         },
        //         textPrimary:{
        //                 color: secondaryColor,
        //             '&:hover': {
        //                 backgroundColor: primaryColorHover,
        //                 color: primaryBackgroundColor,
        //                 // scale: "1.1",
        //                 transition: "all 0.5s ease",
        //             }

        //         },
        //         textSecondary:{
        //             backgroundColor: primaryColor,
        //             color: primaryBackgroundColor,
        //             '&:hover': {
        //                 backgroundColor: secondaryColorHover,
        //                 color: primaryBackgroundColor,
        //                 // scale: "1.05",
        //                 transition: "all 0.5s ease",
        //             }

        //         }
        //     }
        // }, 
        // MuiFormControl:{
        //     styleOverrides:{
        //         root:{
        //             width: "100%",
        //         }
        //     }
        // }
    }
});

export default lightTheme;