# @datalith/flower

```
yarn add @datalith/flower
```

```jsx
<Flower
  className="flower"
  width={width}
  height={height}
  data={data}
  center={x: width / 2, y: height / 2}
  padding={50}
  fill
  stroke
  tooltip={({ v, y, z }) => `<p>${v} ${y} ${z}</p>`}
/>
```

### \<Flower \/>

| Name             | Default                                                            | Type                                                                                                  | Description                                                  |
| :--------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| className        |                                                                    | <pre><code>string</code></pre>                                                                        | Custom css classes to pass to the SVG                        |
| <b>width \*</b>  |                                                                    | <pre><code>number</code></pre>                                                                        | Width of the SVG                                             |
| <b>height \*</b> |                                                                    | <pre><code>number</code></pre>                                                                        | Height of the SVG                                            |
| <b>data \*</b>   |                                                                    | <pre><code>Array<{<br> v?: any,<br> y?: number,<br> z?: string <br>}><br>Array\<number\></code></pre> | Array of data                                                |
| center           | <pre><code>{<br> x: width / 2,<br> y: height / 2<br>}</code></pre> | <pre><code>{<br> x: number;<br> y: number<br>}</code></pre>                                           | Center of the dataviz                                        |
| padding          | <pre><code>40</code></pre>                                         | <pre><code>number</code></pre>                                                                        | Padding between elements                                     |
| fill             | <pre><code>true</code></pre>                                       | <pre><code>boolean</code></pre>                                                                       | Whether to add the fill color                                |
| stroke           | <pre><code>false</code></pre>                                      | <pre><code>boolean</code></pre>                                                                       | Whether to add the stroke color                              |
| tooltip          |                                                                    | <pre><code>(datum) => string</code></pre>                                                             | Return HTML or text as a string to show on element mouseover |
