# @datalith/shutter

```
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
  fill
  stroke
  tooltip={({ v, y, z }) => `<p>${v} ${y} ${z}</p>`}
/>
```

| Name             | Default                                                                  | Type                                                                                                  | Description                                                  |
| :--------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className        |                                                                          | <pre><code>string</code></pre>                                                                        | Custom css classes to pass to the SVG                        |
| <b>width \*</b>  |                                                                          | <pre><code>number</code></pre>                                                                        | Width of the SVG                                             |
| <b>height \*</b> |                                                                          | <pre><code>number</code></pre>                                                                        | Height of the SVG                                            |
| <b>data \*</b>   |                                                                          | <pre><code>Array<{<br> v?: any,<br> y?: number,<br> z?: string <br>}><br>Array\<string\></code></pre> | Array of data                                                |
| center           | <pre><code>{<br> x: width / 2,<br> y: height / 2<br>}</code></pre>       | <pre><code>{<br> x: number;<br> y: number<br>}</code></pre>                                           | Center of the dataviz                                        |
| radiusOuter      | <pre><code>Math.min(<br> width,<br> height<br>) / 2) \* 0.7</code></pre> | <pre><code>number</code></pre>                                                                        | Outer radius                                                 |
| radiusInner      | <pre><code>radiusInner \* 0.8</code></pre>                               | <pre><code>number</code></pre>                                                                        | Inner radius                                                 |
| fill             | <pre><code>true</code></pre>                                             | <pre><code>boolean</code></pre>                                                                       | Whether to add the fill color                                |
| stroke           | <pre><code>false</code></pre>                                            | <pre><code>boolean</code></pre>                                                                       | Whether to add the stroke color                              |
| tooltip          |                                                                          | <pre><code>(datum) => string</code></pre>                                                             | Return HTML or text as a string to show on element mouseover |
