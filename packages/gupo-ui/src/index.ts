import type { App } from 'vue';
import { BackTop } from './back-top';

export { BackTop };

const components = [BackTop];
function install(app: App) {
    components.forEach((item) => {
        if (item.install!) {
            app.use(item);
        } else if (item.name) {
            app.component(item.name, item);
        }
    });
}

export default {
    install,
    components,
};
