import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import Google from "../../../assets/icons/google.svg";
import Facebook from "../../../assets/icons/facebook.svg";


const FirebaseSocial = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const googleHandler = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        );
    };

    const facebookHandler = async () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/facebook/callback`,
            "_self"
        );
    };

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
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Google} alt="Google" />}
                onClick={googleHandler}
                size="large"
            >
                {!matchDownSM}
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Facebook} alt="Facebook" />}
                onClick={facebookHandler}
                size="large"
            >
                {!matchDownSM}
            </Button>
        </Stack>
    );
};

export default FirebaseSocial;
