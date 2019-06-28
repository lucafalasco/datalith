# \<GridMapUs \/>

```jsx
<GridMapUs
  className="grid-map-us"
  width={width}
  height={height}
  side={5}
  data={data}
  projection={projection}
/>
```

| Name             | Default                                                      | Type                                                                                                                     | Description                                                  |
| :--------------- | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className        |                                                              | `string`                                                                                                                 | Custom css classes to pass to the SVG                        |
| style            |                                                              | `React.CSSProperties`                                                                                                    | Custom style object to apply to the SVG                      |
| <b>width \*</b>  |                                                              | `number`                                                                                                                 | Width of the SVG                                             |
| <b>height \*</b> |                                                              | `number`                                                                                                                 | Height of the SVG                                            |
| <b>data \*</b>   |                                                              | `Array<Datum>` or`Array<[number, number]>`                                                                               | Array of data                                                |
| projection       | `geoAlbersUsa()`                                             | `GeoProjection`                                                                                                          | D3 GeoProjection to map coordinates                          |
| customRender     | `props => <circle cx={d.x} cy={d.y} r={value} {...props} />` | `(d: { x: number; y: number; i: number; j: number; value: number; datum?: Datumdatalith }, props: any, ) => JSX.Element` | Return custom element to render as data point                |
| side             | `5`                                                          | `number`                                                                                                                 | Grid cell dimension                                          |
| fill             | `true`                                                       | `boolean`                                                                                                                | Whether to add the fill color                                |
| stroke           | `false`                                                      | `boolean`                                                                                                                | Whether to add the stroke color                              |
| tooltip          |                                                              | `(Datum) => string`                                                                                                      | Return HTML or text as a string to show on element mouseover |
