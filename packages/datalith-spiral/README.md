# @datalith/spiral

```sh
yarn add @datalith/spiral
```

## Docs

```jsx
<Spiral className="spiral" data={data} />
```

| Name               | Default                         | Type                                | Description                                                  |
| :----------------- | :------------------------------ | :---------------------------------- | :----------------------------------------------------------- |
| className          |                                 | `string`                            | Custom css classes to apply to the SVG                       |
| style              |                                 | `React.CSSProperties`               | Custom style object to apply to the SVG                      |
| additionalElements |                                 | `JSX.Element`                       | Optional elements to add to the SVG                          |
| size               |                                 | `{ width: number; height: number }` | Width and Height of the SVG. Default is parent node size.    |
| <b>data\*</b>      |                                 | `Array<Datum>` or `Array<number>`   | Array of data                                                |
| value              | `(Datum) => Datum`              | `(Datum) => number` or `number`     | Value accessor                                               |
| fill               | `rgb(0,0,0)`                    | `(Datum) => string` or `string`     | Fill color accessor                                          |
| stroke             |                                 | `(Datum) => string` or `string`     | Stroke color accessor                                        |
| center             | `{x: width / 2, y: height / 2}` | `{x: number, y: number}`            | Center of the dataviz                                        |
| tooltip            |                                 | `(Datum) => string`                 | Return HTML or text as a string to show on element mouseover |
