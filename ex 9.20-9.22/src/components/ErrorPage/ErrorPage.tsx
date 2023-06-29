import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";


const ErrorPage = () => {

    return (
        <Stack sx={{m: 5}} spacing={3}>
            <Typography variant="h4">Oops!</Typography>
            <Typography variant="h6">This page does not exist :(</Typography>
            <Button sx={{width: 'max-content'}} variant="contained" component={Link} to="/">Go home</Button>
        </Stack>
    )
}

export default ErrorPage;