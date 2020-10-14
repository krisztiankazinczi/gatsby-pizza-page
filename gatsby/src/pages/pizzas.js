import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  // pageContext-et a gatsby-node page creatorbol kuldtuk ide. A kivalasztott toppingot fogja jelenteni ha van
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export default PizzasPage;

// gatsby will know that we exported a graphquery, so in the background it will be executed
// topping a gatsby-node filebol jon. itt nem kotelezo a toppingot megadni, ha nincs akkor mindent megkpunk, ha van topping parameter akkor csak a megfelelo pizzakat
export const pageQuery = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
