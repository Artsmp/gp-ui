import { parallel, series } from 'gulp';
import { buildModules, buildFull, genTypes, clean, buildStyle } from './tasks';

export default series(
    clean,
    parallel(buildModules, buildFull, genTypes, buildStyle)
);
