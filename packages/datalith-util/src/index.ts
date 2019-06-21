import { isFunction } from 'lodash'

export type Datum = any

type ContinuousAccessor = (d: Datum, i: number) => number
type DiscreteAccessor = (d: Datum, i: number) => string
type CoordsAccessor = (d: Datum, i: number) => [number, number]

export type Value = ContinuousAccessor | number
export type Color = DiscreteAccessor | string
export type Coords = CoordsAccessor | [number, number]

export function callOrGetValue<T>(funcOrValue: ((...args: any) => T) | T, ...args: any) {
  return isFunction(funcOrValue) ? funcOrValue(...args) : funcOrValue
}
