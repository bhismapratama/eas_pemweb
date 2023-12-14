/** @type {import('payload/types').CollectionConfig} */

const Changelogs = {
    slug: 'changelogs',
    access: {
        create: () => false,
        read: () => true,
        update: () => false,
        delete: () => true,
    },
    fields: [
        {
            name: 'type',
            label: 'Type',
            type: 'text',
            required: true,
        },
        {
            name: 'name',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'action',
            type: 'text',
            required: true,
        },
    ],
};

export default Changelogs;
