/**
 * Mock 数据接口单元测试
 */
import { getCouponList, acceptCouponByCode } from '@/mock/couponData';

describe('couponData mock API', () => {
    describe('getCouponList', () => {
        it('应返回成功的优惠券列表', async () => {
            const result = await getCouponList({ productCode: 'TEST' });
            expect(result.succeed).toBe(true);
            expect(Array.isArray(result.list)).toBe(true);
            expect(result.list.length).toBeGreaterThan(0);
        });

        it('每个优惠券应包含必要字段', async () => {
            const { list } = await getCouponList();
            const requiredFields = ['couponId', 'couponName', 'couponAmountDesc', 'useMinAmountDesc', 'useDateRange', 'status'];

            list.forEach((coupon) => {
                requiredFields.forEach((field) => {
                    expect(coupon).toHaveProperty(field);
                });
            });
        });

        it('优惠券状态应为有效的状态码', async () => {
            const validStatuses = [0, 10, 20, 30, 40];
            const { list } = await getCouponList();

            list.forEach((coupon) => {
                expect(validStatuses).toContain(coupon.status);
            });
        });
    });

    describe('acceptCouponByCode', () => {
        it('正常券码应兑换成功', async () => {
            const result = await acceptCouponByCode({ couponCode: 'VALID_CODE' });
            expect(result.succeed).toBe(true);
            expect(result.data).toBeTruthy();
        });

        it('使用 "fail" 券码应兑换失败', async () => {
            const result = await acceptCouponByCode({ couponCode: 'fail' });
            expect(result.succeed).toBe(false);
            expect(result.msg).toBeTruthy();
        });
    });
});
