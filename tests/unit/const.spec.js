/**
 * 常量配置单元测试
 */
import { GO_PAGE_TRACK_DELAY, couponStatusMap } from '@/configs/const';

describe('configs/const', () => {
    it('GO_PAGE_TRACK_DELAY 应为合理的延迟值', () => {
        expect(GO_PAGE_TRACK_DELAY).toBe(300);
        expect(typeof GO_PAGE_TRACK_DELAY).toBe('number');
    });

    describe('couponStatusMap', () => {
        it('应包含所有预期的状态码', () => {
            expect(couponStatusMap).toHaveProperty('0');
            expect(couponStatusMap).toHaveProperty('10');
            expect(couponStatusMap).toHaveProperty('20');
            expect(couponStatusMap).toHaveProperty('30');
            expect(couponStatusMap).toHaveProperty('40');
        });

        it('状态描述应符合预期', () => {
            expect(couponStatusMap[0]).toBe('已过期');
            expect(couponStatusMap[10]).toBe('去使用');
            expect(couponStatusMap[20]).toBe('已使用');
            expect(couponStatusMap[30]).toBe('已核销');
            expect(couponStatusMap[40]).toBe('不可使用');
        });

        it('所有状态值应为字符串', () => {
            Object.values(couponStatusMap).forEach((value) => {
                expect(typeof value).toBe('string');
            });
        });
    });
});
