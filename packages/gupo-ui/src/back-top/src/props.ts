import { makeNumericProp, makeStringProp } from 'vant/es/utils';
import { ExtractPropTypes } from 'vue';

export const backTopProps = {
    visibilityHeight: makeNumericProp(200),
    target: makeStringProp(''),
    right: makeNumericProp(''),
    bottom: makeNumericProp(''),
};

export type BackTopProps = ExtractPropTypes<typeof backTopProps>;
