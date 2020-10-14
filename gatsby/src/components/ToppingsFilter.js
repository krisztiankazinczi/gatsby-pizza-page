import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap; // amennyi kifer, annyi fer ki helyfoglalas alapjan
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center; // itt is osszes gyermeket centralja!!!
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

// ezeket a html attibutumokat nezegesd a html kodban a bongeszoben, mert iyu nem kell uj classt letrehozni a felteteles formazashoz, stb stb

const countPizzasInToppings = (pizzas) => {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat() // tobb dimenzios arrayunk volt, de mivel csak darabszamra vagyunk kivancsiak siman flattelheto
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        acc[topping.id].count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {}); // {} lesz az acc!!
  // order by count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
};

function ToppingsFilter({ activeTopping }) {
  // igy lehet static graphql queryket irni egy komponensbe
  // jo pelda h 2 endpointrol egyszerre szerzunk infot
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // countr how many pizzas are in each toppings
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // loop over on toppings and display them and the counts of them

  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}

export default ToppingsFilter;
