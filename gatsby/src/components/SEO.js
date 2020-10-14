import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ children, location, description, title, image }) {
  // ezt a gatsby-config.jsbol kerjuk le
  // mas projektekbol ez johet valami sima js config filebol ahol az odlal alap adatait taroljuk
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {/* enelkul a bongeszo a favicon.ico filet fogja hasznalni alapbol!!!! ezt a public folderben keresi!! */}
      <link rel="alternate icon" href="/favicon.ico" />
      {/* some meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open graph - specification for meta tags for big companies like facebook, pinterest, and so on */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
    </Helmet>
  );
}

export default SEO;
