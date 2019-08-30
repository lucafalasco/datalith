import { isFunction } from 'lodash'
import ResponsiveWrapper from './ResponsiveWrapper'

export type Datum = any

type ContinuousAccessor = (d: Datum, i: number) => number
type DiscreteAccessor = (d: Datum, i: number) => string
type CoordsAccessor = (d: Datum, i: number) => [number, number]

export type Value = ContinuousAccessor | number
export type Color = DiscreteAccessor | string
export type Coords = CoordsAccessor | [number, number]

export interface CommonProps {
  /** Custom css classes to apply to the SVG */
  className?: string
  /** Custom style object to apply to the SVG */
  style?: React.CSSProperties
  /** Optional elements to add to the SVG */
  additionalElements?: JSX.Element
  /** Data array */
  data: Datum[]
  /** Fill color accessor */
  fill: Color
  /** Stroke color accessor */
  stroke: Color
  /** Width and Height of the SVG */
  size: { width: number; height: number }
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: Datum) => string
}

export { ResponsiveWrapper }

export function callOrGetValue<T>(funcOrValue: ((...args: any) => T) | T, ...args: any) {
  return isFunction(funcOrValue) ? funcOrValue(...args) : funcOrValue
}

export function normalize(n: number, min: number, max: number) {
  return (n - min) / (max - min)
}
