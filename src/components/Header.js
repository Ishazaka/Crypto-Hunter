import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        mode: 'dark',
    },
});

const Header = () => {

    const { currency, setCurrency } = CryptoState();

    const navigate = useNavigate();

    console.log(currency);




    return (
        <ThemeProvider theme={darkTheme} >
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate('/')} className='typo-title' variant="h6">Crypto Hunter </Typography>
                        <Select variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                            }}
                            value={currency} onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"} >USD</MenuItem>
                            <MenuItem value={"EUR"}>EURO</MenuItem>
                            <MenuItem value={"GBP"}>Pound</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>

                </Container>

            </AppBar>
        </ThemeProvider>
    )
}

export default Header