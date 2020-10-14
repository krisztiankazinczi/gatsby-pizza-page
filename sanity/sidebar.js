import React from 'react';
import S from '@sanity/desk-tool/structure-builder'; // ezzel csinalhatunk custom dolgokat a megjelenitesben egy react componentben

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>Hi</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new Document ID, so we dont have a string of numbers
            .documentId('downtown')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
