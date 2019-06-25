# @datalith/shutter

```sh
yarn add @datalith/shutter
```

## Docs

```jsx
<Shutter
  className="shutter"
  width={width}
  height={height}
  data={data}
  center={x: width / 2, y: height / 2}
  radiusOuter={100}
  radiusInner={80}
/>
```

| Name             | Default                               | Type                              | Description                                                  |
| :--------------- | :------------------------------------ | :-------------------------------- | :----------------------------------------------------------- |
| className        |                                       | `string`                          | Custom css classes to pass to the SVG                        |
| <b>width \*</b>  |                                       | `number`                          | Width of the SVG                                             |
| <b>height \*</b> |                                       | `number`                          | Height of the SVG                                            |
| <b>data \*</b>   |                                       | `Array<Datum>` or `Array<string>` | Array of data                                                |
| color            | `(Datum) => Datum`                    | `(Datum) => string` or `string`   | Color accessor                                               |
| center           | `{x: width / 2, y: height / 2}`       | `{x: number, y: number}`          | Center of the dataviz                                        |
| radiusOuter      | `(Math.min(width, height) / 2) * 0.7` | `number`                          | Outer radius                                                 |
| radiusInner      | `radiusInner * 0.8`                   | `number`                          | Inner radius                                                 |
| fill             | `true`                                | `boolean`                         | Whether to add the fill color                                |
| stroke           | `false`                               | `boolean`                         | Whether to add the stroke color                              |
| tooltip          |                                       | `(Datum) => string`               | Return HTML or text as a string to show on element mouseover |
