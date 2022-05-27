import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WeatherCard } from './weatherCard';
import { IconButton, InputBase, Paper, Stack, Switch, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './popup.css';
import { getCitiesFromStorage, getOptionsFromStorage, setCitiesToStorage, setOptionsToStorage } from '../storage';
import { UNITS } from '../types';

const App: React.FC<{}> = () => {
    const inputRef = useRef(null);
    const [cities, setCities] = useState<string[]>([]);
    const [units, setUnits] = useState<UNITS>(UNITS.METRIC);
    const [homeCity, setHomeCity] = useState<string>('');

    useEffect(() => {
        getCitiesFromStorage().then((cities) => setCities(cities));
        getOptionsFromStorage().then(({ units, homeCity }) => {
            setUnits(units);
            setHomeCity(homeCity);
        });
    }, []);

    const handleAddCityClick = async () => {
        const city = inputRef.current.value;

        if (!city) {
            return;
        }

        inputRef.current.value = '';

        const updatedCities = [...cities, city];

        try {
            await setCitiesToStorage(updatedCities);
            setCities(updatedCities);
        } catch (err) {}
    };

    const handleInputChange = (event) => {
        if (event.keyCode == 13) {
            handleAddCityClick();
        }
    };

    const handleDelete = async (city: string) => {
        const updatedCities = cities.filter((c) => c !== city);

        try {
            await setCitiesToStorage(updatedCities);
            setCities(updatedCities);
        } catch (err) {}
    };

    const handleUnitsToggle = (e): void => {
        const newUnits = e.target.checked ? UNITS.METRIC : UNITS.IMPERIAL;

        setOptionsToStorage({ units: newUnits }).then(() => setUnits(newUnits));
    };

    return (
        <div>
            <Paper sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                <InputBase
                    inputRef={inputRef}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Add city name'
                    onKeyDown={handleInputChange}
                />
                <IconButton sx={{ p: '10px' }} aria-label='add' onClick={handleAddCityClick}>
                    <AddIcon />
                </IconButton>
            </Paper>
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='center' sx={{ m: 1 }}>
                <Typography>°F</Typography>
                <Switch checked={units === UNITS.METRIC} onClick={handleUnitsToggle} />
                <Typography>°C</Typography>
            </Stack>
            {homeCity && <WeatherCard key={homeCity} city={homeCity} units={units} />}
            {cities.map((city) => (
                <WeatherCard key={city} city={city} units={units} onDelete={handleDelete} />
            ))}
        </div>
    );
};

const id = 'root';
const div = document.createElement('div');

div.setAttribute('id', id);
document.body.appendChild(div);
document.body.style.margin = '0';

const container = document.getElementById(id);
const root = createRoot(container);

root.render(<App />);
