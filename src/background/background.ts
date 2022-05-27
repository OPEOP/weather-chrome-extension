import { setCitiesToStorage, setOptionsToStorage } from '../storage';
import { UNITS } from '../types';

chrome.runtime.onInstalled.addListener(() => {
    setCitiesToStorage([]);
    setOptionsToStorage({ units: UNITS.METRIC });
});
