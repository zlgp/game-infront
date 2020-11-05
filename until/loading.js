import { Loading } from 'element-ui';
let loading
export default {
    //  开启加载提示
    start: (text) => {
        loading = Loading.service({
            lock: true,
            customClass: 'create-isLoading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            text: text
        });
    },
    // 关闭加载提示
    end: () => {
        loading.close()
    }
}

