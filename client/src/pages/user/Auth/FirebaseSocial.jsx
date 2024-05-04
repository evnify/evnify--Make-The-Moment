import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import Google from "../../../assets/icons/google.svg";
import Facebook from "../../../assets/icons/facebook.svg";


const FirebaseSocial = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    
    

    return (
        <Stack
            direction="row"
            spacing={matchDownSM ? 1 : 2}
            justifyContent={matchDownSM ? "space-around" : "space-between"}
            sx={{
                "& .MuiButton-startIcon": {
                    mr: matchDownSM ? 0 : 1,
                    ml: matchDownSM ? 0 : -0.5,
                },
            }}
        >
            
        </Stack>
    );
};

export default FirebaseSocial;
