export interface DatumVyz {
  v?: any
  y?: number
  z?: string
}

export type DatumContinuous = DatumVyz | number
export type DatumDiscrete = DatumVyz | string

export function isDatumVyz(datum: DatumContinuous | DatumDiscrete): datum is DatumVyz {
  return (
    (datum as DatumVyz).hasOwnProperty('v') ||
    (datum as DatumVyz).hasOwnProperty('y') ||
    (datum as DatumVyz).hasOwnProperty('z')
  )
}
