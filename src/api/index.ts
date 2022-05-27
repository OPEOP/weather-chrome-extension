import { WEATHER_API_KEY } from '../constants';
import { IOpenWeatherData, UNITS } from '../types';

export const fetchWeatherCityData = async (city: string, units: UNITS): Promise<IOpenWeatherData> => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=${units}`);

    if (!res.ok) {
        throw new Error("Wrong city");
    }

    return await res.json();
};