import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CU2rL05J.mjs';
import { manifest } from './manifest_ev-_kdN2.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/admin/promotions.astro.mjs');
const _page5 = () => import('./pages/admin/vehicles.astro.mjs');
const _page6 = () => import('./pages/carcon.astro.mjs');
const _page7 = () => import('./pages/policy.astro.mjs');
const _page8 = () => import('./pages/promotions.astro.mjs');
const _page9 = () => import('./pages/trucks.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/admin/promotions.astro", _page4],
    ["src/pages/admin/vehicles.astro", _page5],
    ["src/pages/carcon.astro", _page6],
    ["src/pages/policy.astro", _page7],
    ["src/pages/promotions.astro", _page8],
    ["src/pages/trucks.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "c8ee5e57-422b-40c9-bbaf-afd060e997c7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
