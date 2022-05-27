import { IOptions, UNITS } from './types';

enum LocalStorageKeys {
    CITIES = 'cities',
    UNITS = 'units',
    HOME_CITY = 'homeCity',
}

export const setCitiesToStorage = (cities: string[]): Promise<void> => {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set({ [LocalStorageKeys.CITIES]: cities }, () => {
            resolve();
        });
    });
};

export const getCitiesFromStorage = (): Promise<string[]> => {
    return new Promise<string[]>((resolve) => {
        chrome.storage.local.get([LocalStorageKeys.CITIES], (result) => {
            resolve(result[LocalStorageKeys.CITIES]);
        });
    });
};

export const setOptionsToStorage = (options: IOptions): Promise<void> => {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set(
            {
                ...(options.units && { [LocalStorageKeys.UNITS]: options.units }),
                ...(options.homeCity !== undefined && { [LocalStorageKeys.HOME_CITY]: options.homeCity }),
            },
            () => resolve()
        );
    });
};

export const getOptionsFromStorage = (): Promise<IOptions> => {
    return new Promise<IOptions>((resolve) => {
        chrome.storage.local.get([LocalStorageKeys.UNITS, LocalStorageKeys.HOME_CITY], (result: IOptions) => {
            resolve(result);
        });
    });
};
