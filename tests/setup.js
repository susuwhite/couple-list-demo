// Jest 测试环境 setup
// 模拟浏览器 API

// 模拟 localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = String(value);
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 模拟 URLSearchParams
Object.defineProperty(window, 'location', {
    value: {
        search: '',
        href: '',
        origin: 'http://localhost',
    },
    writable: true,
});
