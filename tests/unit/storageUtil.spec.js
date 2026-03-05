/**
 * 工具函数单元测试 - storageUtil
 * DeepSource 会分析覆盖率并检测测试质量
 */
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/storageUtil';

describe('storageUtil', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('getLocalStorage', () => {
        it('应返回已存储的值', () => {
            localStorage.getItem.mockReturnValueOnce('test-value');
            const result = getLocalStorage('test-key');
            expect(result).toBe('test-value');
            expect(localStorage.getItem).toHaveBeenCalledWith('test-key');
        });

        it('当 key 不存在时应返回空字符串', () => {
            localStorage.getItem.mockReturnValueOnce(null);
            const result = getLocalStorage('non-existent');
            expect(result).toBe('');
        });

        it('当 localStorage 抛出异常时应返回空字符串', () => {
            localStorage.getItem.mockImplementationOnce(() => {
                throw new Error('Storage error');
            });
            const result = getLocalStorage('error-key');
            expect(result).toBe('');
        });
    });

    describe('setLocalStorage', () => {
        it('应正确设置值', () => {
            setLocalStorage('key', 'value');
            expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value');
        });

        it('当 localStorage 抛出异常时不应崩溃', () => {
            localStorage.setItem.mockImplementationOnce(() => {
                throw new Error('QuotaExceeded');
            });
            expect(() => setLocalStorage('key', 'value')).not.toThrow();
        });
    });

    describe('removeLocalStorage', () => {
        it('应正确移除值', () => {
            removeLocalStorage('key');
            expect(localStorage.removeItem).toHaveBeenCalledWith('key');
        });

        it('当 localStorage 抛出异常时不应崩溃', () => {
            localStorage.removeItem.mockImplementationOnce(() => {
                throw new Error('Error');
            });
            expect(() => removeLocalStorage('key')).not.toThrow();
        });
    });
});
