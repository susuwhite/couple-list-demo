<template>
    <div class="exchange-coupon-wrap">
        <div class="exchange-coupon">
            <input
                class="coupon-code-input"
                type="text"
                v-model="couponCode"
                placeholder="请输入兑换码"
                @input="handleCodeInput"
            >
            <div class="divider"></div>
            <div
                class="exchange-btn"
                @click="handleExchangeClick"
            >
                <span v-if="!loading">兑换</span>
                <span v-else class="loading-spinner"></span>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watch } from 'vue';
import Toast from '@/utils/toast';

export default {
    name: 'ExchangeCoupon',
    props: {
        loading: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    setup(props, { emit }) {
        const couponCode = ref('');

        const handleCodeInput = (e) => {
            couponCode.value = e.target.value || '';
        };

        const handleExchangeClick = () => {
            if (!couponCode.value) {
                Toast('请输入券码');
                return;
            }
            emit('exchange', couponCode.value);
        };

        watch(() => props.loading, (val) => {
            if (!val) {
                couponCode.value = '';
            }
        });

        return {
            couponCode,
            handleCodeInput,
            handleExchangeClick,
        };
    },
};
</script>
<style lang="scss">
.exchange-coupon-wrap {
    margin: 0.08rem 0.32rem 0.16rem;
    .exchange-coupon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F5F5F8;
        height: 0.72rem;
        border-radius: 0.72rem;
        .coupon-code-input {
            flex: 1;
            font-size: 0.3rem;
            font-weight: 400;
            color: #222222;
            text-align: left;
            caret-color: rgba(0, 195, 168, 1);
            padding-left: 0.24rem;
        }
        .divider {
            margin: 0 0.2rem;
            height: 0.32rem;
            border-right: 1px solid rgba(234, 234, 234, 1);
        }
        .exchange-btn {
            font-size: 0.28rem;
            font-weight: 700;
            color: #00C3A8;
            margin-right: 0.32rem;
            cursor: pointer;
        }
    }
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
</style>
