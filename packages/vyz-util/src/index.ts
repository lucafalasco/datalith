export type DatumNumeric = number
export interface DatumVyz {
  v?: any
  y: number
  z?: string
}

export type Datum = DatumNumeric | DatumVyz

export function isDatumVyz(datum: Datum): datum is DatumVyz {
  return (datum as DatumVyz).hasOwnProperty('y')
}
