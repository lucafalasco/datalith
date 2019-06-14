export interface Datumdatalith {
  v?: any
  y?: number
  z?: string
}

export type DatumContinuous = Datumdatalith | number
export type DatumDiscrete = Datumdatalith | string

export function isDatumdatalith(datum: DatumContinuous | DatumDiscrete): datum is Datumdatalith {
  return (
    (datum as Datumdatalith).hasOwnProperty('v') ||
    (datum as Datumdatalith).hasOwnProperty('y') ||
    (datum as Datumdatalith).hasOwnProperty('z')
  )
}
