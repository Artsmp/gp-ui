import { makeNumericProp, makeStringProp } from 'vant/es/utils';
import type { ExtractPropTypes } from 'vue';

export const backTopProps = {
    /** 显示高度 */
    visibilityHeight: makeNumericProp(200),
    /** 滚动容器 */
    target: makeStringProp(''),
    /** 距离右侧距离 */
    right: makeNumericProp(''),
    /** 距离底部距离 */
    bottom: makeNumericProp(''),
};

export type BackTopProps = ExtractPropTypes<typeof backTopProps>;
