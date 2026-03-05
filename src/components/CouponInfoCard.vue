<template>
    <div
        :class="`coupon-info-card-wrap ${info.status === 10 ? 'coupon-active' : 'coupon-disabled'}`"
        @click="handleGoPayClick"
    >
        <div class="coupon-content">
            <div class="discount-wrap">
                <div class="coupon-amount">
                    <span v-if="returnIsPriceTagShow" class="coupon-amount-tag">¥</span>
                    <span class="coupon-amount-price">{{ info.couponAmountDesc }}</span>
                </div>
                <div class="coupon-amount-rules">{{ info.useMinAmountDesc }}</div>
            </div>
            <div class="coupon-line"></div>
            <div class="rules-wrap">
                <div class="coupon-title">{{ info.couponName }}</div>
                <div class="coupon-valid-period">{{ info.useDateRange }}</div>
            </div>
        </div>
        <div v-if="returnIsShowCommonBtn" class="coupon-btn-wrap">
            <div class="coupon-btn go-pay-page">{{ couponStatusMap[info.status] }}</div>
        </div>
        <div
            v-else
            :class="`check-btn ${activeIndex === index ? 'check-active' : 'check-common'}`"
            @click.stop="handleSelectClick"
        ></div>
    </div>
</template>
<script>
import { computed } from 'vue';
import { couponStatusMap, GO_PAGE_TRACK_DELAY } from '@/configs/const';

export default {
    name: 'CouponInfoCard',
    emits: ['update:activeIndex', 'select'],
    props: {
        info: {
            type: Object,
            default: () => ({}),
            required: true,
        },
        index: {
            type: Number,
            default: 0,
            required: true,
        },
        activeIndex: {
            type: Number,
            default: -1,
            required: false,
        },
        btnType: {
            type: String,
            default: '0',
            required: true,
        },
        productCode: {
            type: String,
            default: '',
            required: false,
        },
    },
    setup(props, { emit }) {
        const handleGoPayClick = () => {
            if (props.info.status !== 10) return;

            console.log('[点击] 去使用', props.info.couponId);
            emit('select', props.info);
        };

        const handleSelectClick = () => {
            console.log('[选择] 优惠券', props.info.couponId);

            setTimeout(() => {
                emit('update:activeIndex', props.index);
                emit('select', props.info);
            }, GO_PAGE_TRACK_DELAY);
        };

        const returnIsShowCommonBtn = computed(() => {
            return props.btnType === '1';
        });

        const returnIsPriceTagShow = computed(() => {
            const couponAmountDesc = props.info?.couponAmountDesc || '';
            return !couponAmountDesc.split('').find((item) => item === '折');
        });

        return {
            couponStatusMap,
            handleGoPayClick,
            handleSelectClick,
            returnIsShowCommonBtn,
            returnIsPriceTagShow,
        };
    },
};
</script>
<style lang="scss">
.coupon-active {
    background: linear-gradient(135deg, #ffffff 0%, #f0faf8 100%);
    border: 1px solid #d4f2ed;
    .coupon-amount, .coupon-title {
        color: #222222;
    }
    .coupon-amount-rules, .coupon-valid-period {
        color: #666666;
    }
    .coupon-btn-wrap {
        background-color: #00C3A8;
        color: #ffffff;
    }
}

.coupon-disabled {
    background: #f5f5f8;
    border: 1px solid #e5e5e6;
    .coupon-amount, .coupon-title {
        color: #95959C;
    }
    .coupon-amount-rules, .coupon-valid-period {
        color: #95959C;
    }
    .coupon-btn-wrap {
        background-color: rgba(149, 149, 156, 0.5);
        color: #ffffff;
    }
}

.coupon-info-card-wrap {
    width: 100%;
    height: 1.56rem;
    border-radius: 0.16rem;
    margin-top: 0.24rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .coupon-content {
        display: flex;
        align-items: center;
    }
    .discount-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1.6rem;
        .coupon-amount {
            .coupon-amount-tag {
                line-height: 0.36rem;
                font-size: 0.28rem;
                font-weight: 600;
            }
            .coupon-amount-price {
                margin-left: -0.04rem;
                line-height: 0.60rem;
                font-size: 0.56rem;
                font-weight: 700;
            }
        }
        .coupon-amount-rules {
            margin-top: 0.04rem;
            line-height: 0.28rem;
            font-size: 0.22rem;
        }
    }
    .coupon-line {
        width: 1px;
        height: 1.02rem;
        background: #e5e5e6;
    }
    .rules-wrap {
        margin-left: 0.32rem;
        .coupon-title {
            line-height: 0.36rem;
            font-size: 0.3rem;
            font-weight: 700;
        }
        .coupon-valid-period {
            margin-top: 0.16rem;
            font-size: 0.22rem;
            line-height: 0.3rem;
        }
    }
}

.coupon-btn-wrap {
    margin-right: 0.24rem;
    width: 1.48rem;
    height: 0.64rem;
    border-radius: 0.64rem;
    line-height: 0.64rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.28rem;
    font-weight: 700;
}

.check-btn {
    margin-right: 0.24rem;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    flex-shrink: 0;
}

.check-common {
    background: #fff;
    border-color: #ccc;
}

.check-active {
    background: #00C3A8;
    border-color: #00C3A8;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.16rem;
        height: 0.10rem;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: translate(-50%, -60%) rotate(-45deg);
    }
}
</style>
