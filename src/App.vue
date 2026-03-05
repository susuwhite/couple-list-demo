<template>
    <div class="coupon-list-wrap">
        <!-- 顶部导航栏 -->
        <TopNavbar
            :title="returnIsShowAllCoupon ? '优惠券' : '可用优惠券'"
            @back="handleTopNavBack"
        />
        <!-- 兑换券输入 -->
        <ExchangeCoupon
            v-if="returnIsShowAllCoupon"
            :loading="exchangeLoading"
            @exchange="handleExchangeClick"
        />
        <div v-else class="cancel-use-coupon" @click="handleCancelCouponClick">不使用优惠券</div>
        <!-- 优惠券列表 -->
        <div class="coupon-list-scroll-wrap">
            <div class="coupon-refresh-wrap">
                <div class="flat-list-wrap">
                    <!-- 下拉刷新提示 -->
                    <div v-if="listRefreshing" class="refresh-tip">刷新中...</div>
                    <!-- 列表内容 -->
                    <template v-if="couponList.length">
                        <CouponInfoCard
                            v-for="(couponInfo, couponIndex) in couponList"
                            :key="couponInfo.couponId"
                            :index="couponIndex"
                            :activeIndex.sync="activeIndex"
                            :info="couponInfo"
                            :productCode="productCode"
                            :btnType="couponType"
                            @select="handleGoBackToPayClick"
                        />
                        <div class="list-finished-text">没有更多了</div>
                    </template>
                    <!-- 空状态 -->
                    <div v-else-if="!listLoading" class="empty-wrap">
                        <div class="empty-icon">📭</div>
                        <div class="empty-text">{{ returnIsShowAllCoupon ? '暂无优惠券' : '暂无可用优惠券' }}</div>
                    </div>
                    <!-- 加载中 -->
                    <div v-if="listLoading" class="loading-wrap">
                        <span class="loading-spinner"></span>
                        <span>加载中...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';

import TopNavbar from '@/components/TopNavbar.vue';
import ExchangeCoupon from '@/components/ExchangeCoupon.vue';
import CouponInfoCard from '@/components/CouponInfoCard.vue';
import { GO_PAGE_TRACK_DELAY } from '@/configs/const';
import { getUrlQuery, goback } from '@/utils/urlUtil';
import { getLocalStorage, setLocalStorage } from '@/utils/storageUtil';
import Toast from '@/utils/toast';

import { getCouponList, acceptCouponByCode } from '@/mock/couponData';

export default {
    name: 'CouponList',
    components: {
        TopNavbar,
        ExchangeCoupon,
        CouponInfoCard,
    },
    setup() {
        const couponList = ref([]);
        const couponInfo = ref({ couponId: '' });

        const listRefreshing = ref(false);
        const listLoading = ref(false);
        const listFinished = ref(false);
        const listError = ref(false);

        const couponType = getUrlQuery('coupontype') || '1'; // 默认展示全部优惠券模式
        const couponId = getLocalStorage('coupon_selected_id') || '';
        const productCode = getLocalStorage('coupon_product_code') || '';
        const cityId = getUrlQuery('cityId');

        const activeIndex = ref(-1);
        const exchangeLoading = ref(false);

        const initPage = async () => {
            listLoading.value = true;
            await queryCouponList();
        };

        const handleRefresh = async () => {
            listRefreshing.value = true;
            await queryCouponList();
        };

        const queryCouponList = async () => {
            listError.value = false;

            try {
                const { succeed, list, msg } = await getCouponList({ productCode });

                if (!succeed) {
                    Toast(msg || '获取列表失败');
                    listError.value = true;
                } else {
                    couponList.value = list || [];
                    listFinished.value = true;
                }

                findSelectedCoupon();
            } catch (error) {
                console.error(error);
            } finally {
                listLoading.value = false;
                listRefreshing.value = false;
            }
        };

        const queryCouponByCode = async (couponCode) => {
            try {
                const { succeed, data, msg } = await acceptCouponByCode({ couponCode });

                if (!succeed) {
                    Toast(msg || '兑换失败');
                } else {
                    Toast(data || '兑换成功');
                    await handleRefresh();
                }
            } catch (error) {
                console.error(error);
            } finally {
                exchangeLoading.value = false;
            }
        };

        const findSelectedCoupon = () => {
            if (!couponId) return;
            const index = couponList.value.findIndex((item) => item.couponId === couponId);

            if (index !== -1) {
                activeIndex.value = index;
                couponInfo.value = couponList.value[index];
            }
        };

        const handleExchangeClick = async (couponCode) => {
            if (listLoading.value || exchangeLoading.value) return;
            exchangeLoading.value = true;
            await queryCouponByCode(couponCode);
        };

        const handleTopNavBack = () => {
            if (returnIsShowAllCoupon.value) {
                goback();
            } else {
                handleGoBackToPayClick();
            }
        };

        const handleCancelCouponClick = () => {
            console.log('[操作] 不使用优惠券');

            setTimeout(() => {
                couponInfo.value = { couponId: '' };
                handleGoBackToPayClick();
            }, GO_PAGE_TRACK_DELAY);
        };

        const handleGoBackToPayClick = (info = { couponId: '' }) => {
            if (returnIsShowAllCoupon.value) {
                // 演示模式：仅打印日志
                console.log('[跳转] 前往支付页', {
                    couponId: info.couponId || '',
                    cityId,
                });
                Toast(`已选择优惠券: ${info.couponId || '无'}`);
            } else {
                info = info.couponId ? info : couponInfo.value;
                setLocalStorage('coupon_selected_id', info.couponId);
                setLocalStorage('coupon_product_code', productCode);
                console.log('[返回] 携带优惠券ID:', info.couponId);
                Toast(`返回并携带优惠券: ${info.couponId || '无'}`);
            }
        };

        const returnIsShowAllCoupon = computed(() => {
            return couponType === '1';
        });

        initPage();

        return {
            couponList,
            listRefreshing,
            listLoading,
            listFinished,
            listError,

            couponType,
            couponId,
            couponInfo,
            productCode,
            cityId,

            activeIndex,
            exchangeLoading,

            handleRefresh,
            handleTopNavBack,
            handleExchangeClick,
            handleGoBackToPayClick,
            handleCancelCouponClick,

            returnIsShowAllCoupon,
        };
    },
};
</script>

<style lang="scss">
.coupon-list-wrap {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;

    .coupon-list-scroll-wrap {
        margin: 0 0.32rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .coupon-refresh-wrap {
        flex: 1;
    }
    .flat-list-wrap {
        position: relative;
        width: 100%;
        min-height: 100%;
    }
    .cancel-use-coupon {
        height: 0.8rem;
        background-color: #F5F5F8;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #95959C;
        font-weight: 700;
        font-size: 0.28rem;
        margin: 0.12rem 0.32rem 0.12rem;
        cursor: pointer;
    }
    .list-finished-text {
        text-align: center;
        color: #999;
        font-size: 0.24rem;
        padding: 0.32rem 0;
    }
    .refresh-tip {
        text-align: center;
        color: #00C3A8;
        font-size: 0.24rem;
        padding: 0.16rem 0;
    }
    .empty-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;
        .empty-icon {
            font-size: 1rem;
        }
        .empty-text {
            margin-top: 0.24rem;
            font-size: 0.28rem;
            color: #999;
        }
    }
    .loading-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.32rem 0;
        font-size: 0.26rem;
        color: #999;
        gap: 0.12rem;
    }
    .loading-spinner {
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        border: 2px solid #00C3A8;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
}
</style>
