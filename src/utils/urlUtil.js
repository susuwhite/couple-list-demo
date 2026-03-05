/**
 * URL 工具函数
 */

/**
 * 获取 URL 查询参数
 */
export const getUrlQuery = (key) => {
    const params = new URLSearchParams(window.location.search);

    return params.get(key) || '';
};

/**
 * 页面跳转
 */
export const goPage = (url) => {
    window.location.href = url;
};

/**
 * 返回上一页
 */
export const goback = () => {
    if (window.history.length > 1) {
        window.history.back();
    }
};
