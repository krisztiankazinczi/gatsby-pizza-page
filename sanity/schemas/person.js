import { MdPerson as icon } from 'react-icons/md';

// gatsbyben a graphqlben allSanityPerson neven keresd majd, noha Sanity CMSben a localhost:3333-on Slicemasters neven nevezem
export default {
  name: 'person',
  title: 'Slicemasters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a bit about this',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

// a hotspot true nagyon hasznos, hogyha a weboldalon ugye majd centraljuk a kepeket es valamelyikben hianyzik a lenyeg, akkor majd mi kijelolhetjuk h hova fokuszaljon
