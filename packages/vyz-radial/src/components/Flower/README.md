# \<Flower \/>

```jsx
<Flower
  className="flower"
  width={width}
  height={height}
  data={data}
  center={x: width / 2, y: height / 2}
  padding={50}
  stroke
  fill
  sortFn={sortFn}
  tooltip={({ v, y, z }) => `<p>${v} ${y} ${z}</p>`}
/>
```

| Name      | Default | Type     | Description                                               |
| :-------- | :------ | :------- | :-------------------------------------------------------- |
| className |         | string   | Custom css classes to pass to the SVG                     |
| width     |         | number   | Width of the SVG                                          |
| height    |         | number   | Height of the SVG                                         |
| data      |         | array    | An array of objects: { v?: any, y: number, z?: string }   |
| center    |         | object   | Center of the data-viz { x: number; y: number }           |
| padding   | 40      | number   | Padding between elements and from the center              |
| sortFn    | d => d  | function | Function to sort elements                                 |
| fill      | true    | boolean  | Whether to add the fill color                             |
| stroke    | false   | boolean  | Whether to add the stroke color                           |
| tooltip   |         | function | Return an HTML string to be shown when element is hovered |
