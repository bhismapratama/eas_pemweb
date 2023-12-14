import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */

const Form = {
    slug: 'form',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'nama',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'text',
            required: true,
        },
        {
            name: 'alamat_sekolah',
            type: 'text',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'waiting',
                    label: 'waiting',
                },
                {
                    value: 'rejected',
                    label: 'rejected',
                },
                {
                    value: 'accept',
                    label: 'accept',
                },
            ],
            defaultValue: 'not started',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedDate',
            type: 'date',
            label: 'Published Date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'd MMM yyy h:mm:ss a',
                },
            },
        },
    ],
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == 'create') {
                    payload.create({
                        collection: 'changelog',
                        data: {
                            type: 'form',
                            name: args.result.title,
                            action: 'Created',
                        },
                    });
                }
            },
        ],
        afterChange: [
            async (args) => {
                if (args.operation == 'update') {
                    payload.create({
                        collection: 'changelog',
                        data: {
                            type: 'form',
                            name: args.doc.title,
                            action: 'Updated',
                        },
                    });
                }
            },
        ],
        afterDelete: [
            async (args) => {
                payload.create({
                    collection: 'changelog',
                    data: {
                        type: 'form',
                        name: args.doc.title,
                        action: 'Deleted.',
                    },
                });
            },
        ],
    },
};

export default Form;
