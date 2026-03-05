/**
 * Mock 数据 - 模拟优惠券列表接口返回
 */

const mockCouponList = [
    {
        couponId: 'CPN20260301001',
        couponName: '新用户专享优惠',
        couponAmountDesc: '50',
        useMinAmountDesc: '满200元可用',
        useDateRange: '2026.03.01 - 2026.06.30',
        status: 10,
    },
    {
        couponId: 'CPN20260301002',
        couponName: '春季活动立减券',
        couponAmountDesc: '8.8折',
        useMinAmountDesc: '满100元可用',
        useDateRange: '2026.03.01 - 2026.04.30',
        status: 10,
    },
    {
        couponId: 'CPN20260301003',
        couponName: '限时满减优惠券',
        couponAmountDesc: '30',
        useMinAmountDesc: '满150元可用',
        useDateRange: '2026.02.01 - 2026.03.31',
        status: 10,
    },
    {
        couponId: 'CPN20260301004',
        couponName: '会员专属折扣券',
        couponAmountDesc: '9折',
        useMinAmountDesc: '无门槛',
        useDateRange: '2026.01.01 - 2026.03.01',
        status: 20,
    },
    {
        couponId: 'CPN20260301005',
        couponName: '节日特惠红包',
        couponAmountDesc: '100',
        useMinAmountDesc: '满500元可用',
        useDateRange: '2025.12.01 - 2026.01.31',
        status: 0,
    },
    {
        couponId: 'CPN20260301006',
        couponName: '老客户回馈券',
        couponAmountDesc: '25',
        useMinAmountDesc: '满80元可用',
        useDateRange: '2026.03.05 - 2026.09.05',
        status: 10,
    },
];

/**
 * 模拟网络延迟
 */
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 获取优惠券列表
 */
export const getCouponList = async (params = {}) => {
    await delay(600);

    return {
        succeed: true,
        list: mockCouponList,
        msg: '',
    };
};

/**
 * 兑换优惠券
 */
export const acceptCouponByCode = async (params = {}) => {
    await delay(800);

    const { couponCode } = params;

    // 模拟：输入 "fail" 则返回失败，其他均成功
    if (couponCode === 'fail') {
        return {
            succeed: false,
            data: null,
            msg: '兑换码无效或已过期',
        };
    }

    return {
        succeed: true,
        data: '兑换成功，优惠券已发放至您的账户',
        msg: '',
    };
};
