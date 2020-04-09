# @datalith/flower

```sh
yarn add @datalith/flower
```

## Docs

```jsx
<Flower className="flower" data={data} padding={50} />
```

| Name               | Default                         | Type                                | Description                                                  |
| :----------------- | :------------------------------ | :---------------------------------- | :----------------------------------------------------------- |
| className          |                                 | `string`                            | Custom css classes to apply to the SVG                       |
| style              |                                 | `React.CSSProperties`               | Custom style object to apply to the SVG                      |
| additionalElements |                                 | `JSX.Element`                       | Optional elements to add to the SVG                          |
| size               |                                 | `{ width: number; height: number }` | Width and Height of the SVG. Default is parent node size.    |
| <b>data\*</b>      |                                 | `Array<Datum>` or `Array<number>`   | Array of data                                                |
| value              | `(Datum) => Datum`              | `(Datum) => number` or `number`     | Value accessor                                               |
| fill               |                                 | `(Datum) => string` or `string`     | Fill color accessor                                          |
| fillOpacity        |                                 | `(Datum) => number` or `number`     | Fill opacity accessor                                        |
| stroke             |                                 | `(Datum) => string` or `string`     | Stroke color accessor                                        |
| strokeOpacity      |                                 | `(Datum) => number` or `number`     | Stroke opacity accessor                                      |
| center             | `{x: width / 2, y: height / 2}` | `{x: number, y: number}`            | Center of the dataviz                                        |
| padding            | `20`                            | `number`                            | Padding between elements                                     |
| tooltip            |                                 | `(Datum) => string`                 | Return HTML or text as a string to show on element mouseover |
