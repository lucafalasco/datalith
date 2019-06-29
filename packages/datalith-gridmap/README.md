# @datalith/gridmap

```sh
yarn add @datalith/gridmap
```

## Docs

# \<GridMap \/>

| Name                        | Default              | Type                                                                                                             | Description                                                  |
| :-------------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className                   |                      | `string`                                                                                                         | Custom css classes to apply to the SVG                        |
| style                       |                      | `React.CSSProperties`                                                                                            | Custom style object to apply to the SVG                      |
| size                        |                      | `{ width: number; height: number }`                                                                              | Width and Height of the SVG                                  |
| <b>data \*</b>              |                      | `Array<Datum>` or `Array<[number, number]>`                                                                      | Array of data                                                |
| <b>featureCollection \*</b> |                      | `FeatureCollection`                                                                                              | GeoJson object                                               |
| projection                  | `geoNaturalEarth1()` | `GeoProjection`                                                                                                  | D3 GeoProjection to map coordinates                          |
| customRender                |                      | `(d: { x: number; y: number; i: number; j: number; value: number; datum?: Datum }, props: any, ) => JSX.Element` | Return custom element to render as data point                |
| side                        | `5`                  | `number`                                                                                                         | Grid cell dimension                                          |
| fill                        | `true`               | `boolean`                                                                                                        | Whether to add the fill color                                |
| stroke                      | `false`              | `boolean`                                                                                                        | Whether to add the stroke color                              |
| tooltip                     |                      | `(Datum) => string`                                                                                              | Return HTML or text as a string to show on element mouseover |

# \<GridMapUs \/>

| Name           | Default          | Type                                                                                                             | Description                                                  |
| :------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className      |                  | `string`                                                                                                         | Custom css classes to apply to the SVG                        |
| style          |                  | `React.CSSProperties`                                                                                            | Custom style object to apply to the SVG                      |
| size           |                  | `{ width: number; height: number }`                                                                              | Width and Height of the SVG                                  |
| <b>data \*</b> |                  | `Array<Datum>` or `Array<[number, number]>`                                                                      | Array of data                                                |
| projection     | `geoAlbersUsa()` | `GeoProjection`                                                                                                  | D3 GeoProjection to map coordinates                          |
| customRender   |                  | `(d: { x: number; y: number; i: number; j: number; value: number; datum?: Datum }, props: any, ) => JSX.Element` | Return custom element to render as data point                |
| side           | `5`              | `number`                                                                                                         | Grid cell dimension                                          |
| fill           | `true`           | `boolean`                                                                                                        | Whether to add the fill color                                |
| stroke         | `false`          | `boolean`                                                                                                        | Whether to add the stroke color                              |
| tooltip        |                  | `(Datum) => string`                                                                                              | Return HTML or text as a string to show on element mouseover |

# \<GridMapWorld \/>

| Name           | Default              | Type                                                                                                             | Description                                                  |
| :------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className      |                      | `string`                                                                                                         | Custom css classes to apply to the SVG                        |
| style          |                      | `React.CSSProperties`                                                                                            | Custom style object to apply to the SVG                      |
| size           |                      | `{ width: number; height: number }`                                                                              | Width and Height of the SVG                                  |
| <b>data \*</b> |                      | `Array<Datum>` or `Array<[number, number]>`                                                                      | Array of data                                                |
| projection     | `geoNaturalEarth1()` | `GeoProjection`                                                                                                  | D3 GeoProjection to map coordinates                          |
| customRender   |                      | `(d: { x: number; y: number; i: number; j: number; value: number; datum?: Datum }, props: any, ) => JSX.Element` | Return custom element to render as data point                |
| side           | `5`                  | `number`                                                                                                         | Grid cell dimension                                          |
| fill           | `true`               | `boolean`                                                                                                        | Whether to add the fill color                                |
| stroke         | `false`              | `boolean`                                                                                                        | Whether to add the stroke color                              |
| tooltip        |                      | `(Datum) => string`                                                                                              | Return HTML or text as a string to show on element mouseover |
