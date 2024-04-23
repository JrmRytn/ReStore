import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemChange : () => void
}
export default function Header ({darkMode, handleThemChange} : Props) {
    return (
        <AppBar position="static" sx= {{mb: 4}}> 
                <Toolbar>
                    <Typography variant="h6">
                        RE-STORE
                    </Typography>
                    <Switch  checked ={darkMode} onChange={handleThemChange}/>
                </Toolbar>
        </AppBar>
    )
}