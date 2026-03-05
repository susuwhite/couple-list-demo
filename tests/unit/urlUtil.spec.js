/**
 * 工具函数单元测试 - urlUtil
 */
import { getUrlQuery, goback } from '@/utils/urlUtil';

describe('urlUtil', () => {
    describe('getUrlQuery', () => {
        it('应正确获取 URL 查询参数', () => {
            delete window.location;
            window.location = { search: '?coupontype=1&cityId=110100' };

            expect(getUrlQuery('coupontype')).toBe('1');
            expect(getUrlQuery('cityId')).toBe('110100');
        });

        it('当参数不存在时应返回空字符串', () => {
            delete window.location;
            window.location = { search: '?coupontype=1' };

            expect(getUrlQuery('nonexistent')).toBe('');
        });

        it('当 search 为空时应返回空字符串', () => {
            delete window.location;
            window.location = { search: '' };

            expect(getUrlQuery('anykey')).toBe('');
        });
    });

    describe('goback', () => {
        it('当有历史记录时应调用 history.back()', () => {
            const backSpy = jest.fn();
            delete window.history;
            window.history = { length: 3, back: backSpy };

            goback();
            expect(backSpy).toHaveBeenCalled();
        });

        it('当没有历史记录时不应调用 history.back()', () => {
            const backSpy = jest.fn();
            delete window.history;
            window.history = { length: 1, back: backSpy };

            goback();
            expect(backSpy).not.toHaveBeenCalled();
        });
    });
});
