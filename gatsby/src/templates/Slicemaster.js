import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

// nezd meg a pageResources props-ot a react dev toolsal es annak a json objektumat megkapjat a komponensek, ezert tudomdestructurolni a data  objektumot ami a lenti query eredmenye
export default function Slicemaster({ data: { person } }) {
  return (
    <>
      <SEO title={person.name} image={person.image.asset.src} />
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <h2>
          <span className="mark">{person.name}</span>
          <p>{person.description}</p>
        </h2>
      </div>
    </>
  );
}

// ezt a queryt nem muszaj itt megirni, hiszen a gatsby-node fileban lekerjuk a query. De fejlesztes alatt ha valtoztatni kell eleg lassu folyton ujrainditani
// es igy barmikor kell az adatszerkezeten valtoztatni minden itt lesz egy helyen. De le is passzolhatnank a gatsby-node filebol actions.createPagebol
// a slug a context-bol jon a gatsby-nodebol
export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
