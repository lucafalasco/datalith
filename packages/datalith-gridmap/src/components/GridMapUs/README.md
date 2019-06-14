# \<GridMapUs \/>

```jsx
<GridMapUs
  className="grid-map-us"
  width={width}
  height={height}
  side={5}
  data={data}
  projection={projection}
  tooltip={({ v, y, z }) => `<p>${v} ${y} ${z}</p>`}
/>
```

| Name             | Default                                                                             | Type                                                                                                                                      | Description                                                  |
| :--------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className        |                                                                                     | <pre><code>string</code></pre>                                                                                                            | Custom css classes to pass to the SVG                        |
| <b>width \*</b>  |                                                                                     | <pre><code>number</code></pre>                                                                                                            | Width of the SVG                                             |
| <b>height \*</b> |                                                                                     | <pre><code>number</code></pre>                                                                                                            | Height of the SVG                                            |
| <b>data \*</b>   |                                                                                     | <pre><code>Array<{<br> v: [number, number],<br> y?: number,<br> z?: string <br>}><br>Array\<string\></code></pre>                         | Array of data                                                |
| projection       | <pre><code>geoAlbersUsa()</code></pre>                                              | <pre><code>GeoProjection</code></pre>                                                                                                     | D3 GeoProjection to map coordinates                          |
| customRender     | <pre><code>props => <circle cx={d.x} cy={d.y} r={value} {...props} /> </code></pre> | <pre><code>(d: { x: number; y: number; i: number; j: number; value: number; datum?: Datumdatalith }, props: any, ) => JSX.Element</code></pre> | Return custom element to render as data point                |
| side             | <pre><code>5</code></pre>                                                           | <pre><code>number</code></pre>                                                                                                            | Grid cell dimension                                          |
| fill             | <pre><code>true</code></pre>                                                        | <pre><code>boolean</code></pre>                                                                                                           | Whether to add the fill color                                |
| stroke           | <pre><code>false</code></pre>                                                       | <pre><code>boolean</code></pre>                                                                                                           | Whether to add the stroke color                              |
| tooltip          |                                                                                     | <pre><code>(datum) => string</code></pre>                                                                                                 | Return HTML or text as a string to show on element mouseover |
