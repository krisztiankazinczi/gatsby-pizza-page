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
