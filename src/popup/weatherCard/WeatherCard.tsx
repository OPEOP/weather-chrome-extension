import React, { useEffect, useState } from 'react';
import { Typography, CardContent, Card, CardActions, Button } from '@mui/material';

import { fetchWeatherCityData } from '../../api';
import { IOpenWeatherData, UNITS } from '../../types';

interface IWeatherCard {
    city: string;
    units: UNITS;
    onDelete?: (city: string) => void;
}

const WeatherCard = ({ city, units, onDelete }: IWeatherCard) => {
    const [weather, setWeather] = useState<IOpenWeatherData | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const unit = units === UNITS.METRIC ? '°C' : '°F';

    useEffect(() => {
        fetchWeatherCityData(city, units)
            .then((data) => {
                setWeather(data);
                setIsError(false);
            })
            .catch(() => setIsError(true));
    }, [units]);

    return (
        <Card sx={{ m: 1 }}>
            <CardContent>
                {weather && (
                    <>
                        <Typography variant='h5'>{weather.name}</Typography>
                        {!onDelete && <Typography variant='body2'>Home city</Typography>}
                        <Typography variant='body1'>
                            {Math.round(weather.main.temp)} {unit}
                        </Typography>
                        <Typography variant='body1'>
                            Feels like: {Math.round(weather.main.feels_like)} {unit}
                        </Typography>
                    </>
                )}
                {isError && <Typography variant='body1'>Error: Could not retrieve weather data</Typography>}
            </CardContent>
            {onDelete && (
                <CardActions>
                    <Button color='secondary' onClick={() => onDelete(city)}>
                        Delete
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default WeatherCard;
