'use client';

import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';
import React from 'react';

let EdgeStoreProvider: React.FC<{ children: React.ReactNode }>;
let useEdgeStore: () => any;

try {
  if (typeof navigator === 'undefined' || navigator.onLine) {
    const provider = createEdgeStoreProvider<EdgeStoreRouter>();
    EdgeStoreProvider = provider.EdgeStoreProvider;
    useEdgeStore = provider.useEdgeStore;
  } else {
    console.warn('EdgeStore is disabled: No internet connection.');
    EdgeStoreProvider = ({ children }) => React.createElement(React.Fragment, {}, children);
    useEdgeStore = () => null;
  }
} catch (error) {
  console.error('Failed to initialize EdgeStore:', error);
  EdgeStoreProvider = ({ children }) => React.createElement(React.Fragment, {}, children);
  useEdgeStore = () => null;
}

export { EdgeStoreProvider, useEdgeStore };