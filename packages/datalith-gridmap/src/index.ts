export * from './components/GridMap'
export * from './components/GridMapUs'
export * from './components/GridMapWorld'

import { UsAtlas, WorldAtlas } from 'topojson'
import us from './json/us.json'
import world from './json/world.json'

export const usTopology = us as UsAtlas
export const worldTopology = world as WorldAtlas
