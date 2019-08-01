<p align="center">
  <img src="./assets/logo.svg" width="300px" />
</p>

---

### **Datalith** is a collection of clean, lightweight and easily customizable React components for data visualization.

The purpose is to provide an easy way to integrate custom data visualizations in any React
project. The components were disigned with simplicity in mind, so the only thing required
for the charts to work is the actual _data_.

Some key features:

- Typed React components for optimal DX
- Simple, shared API
- Easy to integrate, customize, and enhance

## Installation

```sh
yarn add @datalith/shutter @datalith/hexmap @datalith/ripple
```

To install all modules as a single package:

```sh
yarn add datalith
```

Then in you React app:

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DotMap } from '@datalith/hexmap'

ReactDOM.render(
  <HexMap
    data={data}
    coords={d => [d.lng, d.lat]}
    value={d => d.value}
    side={5}
    featureCollection={featureCollection}
    projection={geoProjection}
  />,
  document.getElementById('root'),
)
```

## Development

### Getting Started

```bash
$ yarn
$ yarn bootstrap
```

### Start dev environment (Storybook)

```bash
$ yarn start
```

### Build for production

```bash
$ yarn build
```

## F.A.Q.

- The components don't have axis or labels or legends, what if I need those?

  > The purpose of the project is to provide an easy way to display data in a very straightforward and engaging way, that's why _datalith_ focuses on the shapes and the visual patterns rather then axis and labels. However, if you need to display them you can easily create your own components or integrate a library like [vx](https://github.com/hshoff/vx) which is great for that.

- Which packages do I have to use?

  > _datalith_ is meant to be extremly modular, so you can install only the charts you need by using the scoped package install:

  > > ```sh
  > > yarn add @datalith/hexmap
  > > ```

  > Optionally, you can also choose to insall the complete collection of charts:

  > > ```sh
  > > yarn add datalith
  > > ```

- What about animations/transitions?

  > As the charts are rendered using SVG, you can use any react animation library you prefer, I suggest [react-spring](https://github.com/react-spring/react-spring), which is the one used in the examples, but there are many other great alternatives as well.

- Does it come with types?

  > yes it does.

#### The project is still at an early stage
