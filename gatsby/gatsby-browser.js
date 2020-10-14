// ez a root element. Ez barhova navigalunk is az oldalomn belul, nem fog kirenderelodni!!

import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// wrapRootElement egy gatsby function akarcsak a wrapPageElement
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
