export interface IOpenWeatherData {
    name: string;
    main: {
        feels_like: number;
        temp: number;
    };
    wind: {
        speed: number;
    };
}

export enum UNITS {
    METRIC = 'metric',
    IMPERIAL = 'imperial',
}

export interface IOptions {
    units?: UNITS;
    homeCity?: string;
}
