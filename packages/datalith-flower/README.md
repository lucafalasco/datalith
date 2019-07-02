# @datalith/flower

```sh
yarn add @datalith/flower
```

## Docs

```jsx
<Flower className="flower" data={data} padding={50} />
```

| Name           | Default                         | Type                                | Description                                                  |
| :------------- | :------------------------------ | :---------------------------------- | :----------------------------------------------------------- |
| className      |                                 | `string`                            | Custom css classes to apply to the SVG                       |
| style          |                                 | `React.CSSProperties`               | Custom style object to apply to the SVG                      |
| defs           |                                 | `JSX.Element`                       | Optional `<defs />` element to include in the SVG            |
| size           |                                 | `{ width: number; height: number }` | Width and Height of the SVG                                  |
| <b>data \*</b> |                                 | `Array<Datum>` or `Array<number>`   | Array of data                                                |
| value          | `(Datum) => Datum`              | `(Datum) => number` or `number`     | Value accessor                                               |
| color          | `rgb(0,0,0)`                    | `(Datum) => string` or `string`     | Color accessor                                               |
| center         | `{x: width / 2, y: height / 2}` | `{x: number, y: number}`            | Center of the dataviz                                        |
| padding        | `40`                            | `number`                            | Padding between elements                                     |
| fill           | `true`                          | `boolean`                           | Whether to add the fill color                                |
| stroke         | `false`                         | `boolean`                           | Whether to add the stroke color                              |
| tooltip        |                                 | `(Datum) => string`                 | Return HTML or text as a string to show on element mouseover |
