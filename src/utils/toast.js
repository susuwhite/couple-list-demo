/**
 * 轻量级 Toast 提示
 * 替代原项目中的 UI 组件库 Toast
 */
const Toast = (message, duration = 2000) => {
    const existing = document.querySelector('.demo-toast');

    if (existing) existing.remove();

    const el = document.createElement('div');

    el.className = 'demo-toast';
    el.textContent = message;
    Object.assign(el.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0,0,0,0.7)',
        color: '#fff',
        padding: '0.2rem 0.4rem',
        borderRadius: '0.12rem',
        fontSize: '0.28rem',
        zIndex: '9999',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
    });
    document.body.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 300);
    }, duration);
};

export default Toast;
