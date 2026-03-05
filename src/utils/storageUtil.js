/**
 * localStorage 工具函数
 */

export const getLocalStorage = (key) => {
    try {
        return localStorage.getItem(key) || '';
    } catch (e) {
        return '';
    }
};

export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // ignore
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        // ignore
    }
};
