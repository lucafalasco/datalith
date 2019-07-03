# @datalith/shutter

```sh
yarn add @datalith/shutter
```

## Docs

```jsx
<Shutter className="shutter" data={data} radiusOuter={100} radiusInner={80} />
```

| Name          | Default                               | Type                                | Description                                                  |
| :------------ | :------------------------------------ | :---------------------------------- | :----------------------------------------------------------- |
| className     |                                       | `string`                            | Custom css classes to apply to the SVG                       |
| style         |                                       | `React.CSSProperties`               | Custom style object to apply to the SVG                      |
| defs          |                                       | `JSX.Element`                       | Optional `<defs />` element to include in the SVG            |
| size          |                                       | `{ width: number; height: number }` | Width and Height of the SVG. Default is parent node size.    |
| <b>data\*</b> |                                       | `Array<Datum>` or `Array<string>`   | Array of data                                                |
| fill          | `rgb(0,0,0)`                          | `(Datum) => string` or `string`     | Fill color accessor                                          |
| stroke        |                                       | `(Datum) => string` or `string`     | Stroke color accessor                                        |
| center        | `{x: width / 2, y: height / 2}`       | `{x: number, y: number}`            | Center of the dataviz                                        |
| radiusOuter   | `(Math.min(width, height) / 2) * 0.7` | `number`                            | Outer radius                                                 |
| radiusInner   | `radiusInner * 0.8`                   | `number`                            | Inner radius                                                 |
| tooltip       |                                       | `(Datum) => string`                 | Return HTML or text as a string to show on element mouseover |
