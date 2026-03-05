/**
 * 工具函数单元测试 - toast
 */
import Toast from '@/utils/toast';

describe('Toast', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('应创建 toast 元素并添加到 body', () => {
        Toast('测试消息');
        const toastEl = document.querySelector('.demo-toast');
        expect(toastEl).not.toBeNull();
        expect(toastEl.textContent).toBe('测试消息');
    });

    it('应在指定时间后移除 toast', () => {
        Toast('临时消息', 1000);
        expect(document.querySelector('.demo-toast')).not.toBeNull();

        jest.advanceTimersByTime(1000);
        jest.advanceTimersByTime(300); // 等待 fade out 动画
        expect(document.querySelector('.demo-toast')).toBeNull();
    });

    it('当已有 toast 时应先移除旧的', () => {
        Toast('消息1');
        Toast('消息2');
        const toasts = document.querySelectorAll('.demo-toast');
        expect(toasts.length).toBe(1);
        expect(toasts[0].textContent).toBe('消息2');
    });

    it('默认 duration 应为 2000ms', () => {
        Toast('默认时长');
        const toastEl = document.querySelector('.demo-toast');
        expect(toastEl).not.toBeNull();

        jest.advanceTimersByTime(1999);
        expect(document.querySelector('.demo-toast')).not.toBeNull();

        jest.advanceTimersByTime(1);
        jest.advanceTimersByTime(300);
        expect(document.querySelector('.demo-toast')).toBeNull();
    });
});
