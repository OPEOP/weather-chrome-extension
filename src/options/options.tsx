import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { createRoot } from 'react-dom/client';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import './options.css';
import { getOptionsFromStorage, setOptionsToStorage } from '../storage';

const App: React.FC<{}> = () => {
    const savedHomeCityRef = useRef<string>('');
    const [homeCity, setHomeCity] = useState<string>('');

    useEffect(() => {
        getOptionsFromStorage().then((options) => {
            const city = options.homeCity || '';
            setHomeCity(city);
            savedHomeCityRef.current = city;
        });
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setHomeCity(value);
    };

    const handleSaveBtnClick = () => {
        setOptionsToStorage({ homeCity }).then(() => {
            savedHomeCityRef.current = homeCity;
            setHomeCity('');
        });
    };

    const handleClearBtnClick = () => {
        setOptionsToStorage({ homeCity: '' }).then(() => {
            savedHomeCityRef.current = '';
            setHomeCity('');
        });
    };

    return (
        <Box mx='10%' my='5%'>
            <Card sx={{p: 1}}>
                <Typography variant='h3'>Weather Options</Typography>
                <Stack direction='column' spacing={2} alignItems='flex-start' sx={{ m: 1 }}>
                    <Typography>Home City: {savedHomeCityRef.current}</Typography>
                    <TextField
                        label='Home City'
                        value={homeCity}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LocationCityIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction='row' spacing={2}>
                        <Button variant='contained' onClick={handleSaveBtnClick}>
                            Save
                        </Button>
                        <Button variant='outlined' color='warning' onClick={handleClearBtnClick}>
                            Clear
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};

const id = 'root';
const div = document.createElement('div');

div.setAttribute('id', id);
document.body.appendChild(div);

const container = document.getElementById(id);
const root = createRoot(container);

root.render(<App />);
