import { isFunction } from 'lodash'
import ResponsiveWrapper from './ResponsiveWrapper'

export type Datum = any

type AccessorFunction<T> = (d: Datum, i: number) => T
export type Accessor<T> = AccessorFunction<T> | T

export type CoordsAccessor = Accessor<[number, number]>
export type StringAccessor = Accessor<string>
export type NumberAccessor = Accessor<number>

export interface CommonAccessors {
  /** Fill color accessor */
  fill: StringAccessor
  /** Fill opacity accessor */
  fillOpacity: NumberAccessor
  /** Stroke color accessor */
  stroke: StringAccessor
  /** Stroke opacity accessor */
  strokeOpacity: NumberAccessor
}

export interface CommonProps extends CommonAccessors {
  /** Custom css classes to apply to the SVG */
  className?: string
  /** Custom style object to apply to the SVG */
  style?: React.CSSProperties
  /** Optional elements to add to the SVG */
  additionalElements?: JSX.Element
  /** Data array */
  data: Datum[]
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
