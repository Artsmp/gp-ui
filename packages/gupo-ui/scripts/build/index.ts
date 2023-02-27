import { parallel } from 'gulp';
import { buildModules, buildFull, genTypes } from './tasks';

export default parallel(buildModules, buildFull, genTypes);
