import { Message } from 'element-ui';

export default {
    msg: function (message) {
        Message.success({
            message: message,
            type: "success"
        });
    }
}