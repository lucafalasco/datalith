# \<GridMapWorld \/>

```jsx
<GridMapWorld className="grid-map-world" side={5} data={data} projection={projection} />
```

| Name               | Default              | Type                                                                                                             | Description                                                  |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className          |                      | `string`                                                                                                         | Custom css classes to apply to the SVG                       |
| style              |                      | `React.CSSProperties`                                                                                            | Custom style object to apply to the SVG                      |
| additionalElements |                      | `JSX.Element`                                                                                                    | Optional elements to add to the SVG                          |
| size               |                      | `{ width: number; height: number }`                                                                              | Width and Height of the SVG. Default is parent node size.    |
| <b>data\*</b>      |                      | `Array<Datum>` or`Array<[number, number]>`                                                                       | Array of data                                                |
| projection         | `geoNaturalEarth1()` | `GeoProjection`                                                                                                  | D3 GeoProjection to map coordinates                          |
| customRender       |                      | `(d: { x: number; y: number; i: number; j: number; value: number; datum?: Datum }, props: any, ) => JSX.Element` | Return custom element to render as data point                |
| side               | `5`                  | `number`                                                                                                         | Grid cell dimension                                          |
| tooltip            |                      | `(Datum) => string`                                                                                              | Return HTML or text as a string to show on element mouseover |
