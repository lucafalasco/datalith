# \<DotMapWorld \/>

```sh
yarn add @datalith/dotmap
```

## Docs

```jsx
<DotMapWorld className="dot-map-world" side={5} data={data} projection={projection} />
```

| Name                  | Default              | Type                                                | Description                                                  |
| :-------------------- | :------------------- | :-------------------------------------------------- | :----------------------------------------------------------- |
| className             |                      | `string`                                            | Custom css classes to apply to the SVG                       |
| style                 |                      | `React.CSSProperties`                               | Custom style object to apply to the SVG                      |
| additionalElements    |                      | `JSX.Element`                                       | Optional elements to add to the SVG                          |
| size                  |                      | `{ width: number; height: number }`                 | Width and Height of the SVG. Default is parent node size.    |
| <b>data\*</b>         |                      | `Array<Datum>` or`Array<[number, number]>`          | Array of data                                                |
| coords                | `(Datum) => Datum`   | `(Datum) => [number, number]` or `[number, number]` | Coords accessor                                              |
| value                 | 10                   | `(Datum) => number` or`number`                      | Value accessor                                               |
| valueInactive         | `1`                  | `number`                                            | Value Inactive accessor                                      |
| fill                  |                      | `(Datum) => string` or `string`                     | Fill color accessor                                          |
| fillInactive          | `#000`               | `string`                                            | Fill Inactive accessor                                       |
| fillOpacity           |                      | `(Datum) => number` or `number`                     | Fill Opacity accessor                                        |
| fillOpacityInactive   | `0.3`                | `number`                                            | Fill Opacity Inactive accessor                               |
| fillInactive          | `#000`               | `string`                                            | Fill Inactive accessor                                       |
| stroke                |                      | `(Datum) => string` or `string`                     | Stroke color accessor                                        |
| strokeInactive        | `transparent`        | `string`                                            | Stroke Inactive accessor                                     |
| strokeOpacity         |                      | `(Datum) => number` or `number`                     | Stroke Opacity accessor                                      |
| strokeOpacityInactive | `0.3`                | `number`                                            | Stroke Opacity Inactive accessor                             |
| strokeInactive        | `transparent`        | `string`                                            | Stroke Inactive accessor                                     |
| projection            | `geoNaturalEarth1()` | `GeoProjection`                                     | D3 GeoProjection to map coordinates                          |
| side                  | `5`                  | `number`                                            | Grid cell dimension                                          |
| tooltip               |                      | `(Datum) => string`                                 | Return HTML or text as a string to show on element mouseover |
