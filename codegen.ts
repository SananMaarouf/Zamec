import { CodegenConfig } from '@graphql-codegen/cli';

const endpointOverride = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;
const productionEndpoint = 'https://graphql.contentful.com/content/v1/spaces';
console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID);
export const endpoint = `${endpointOverride || productionEndpoint}/${process.env.CONTENTFUL_SPACE_ID}`;
console.log('Endpoint:', endpoint);
export const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [endpoint || '']: {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      },
    },
  ],
  generates: {
    'src/lib/__generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
    'src/lib/__generated/graphql.schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/lib/__generated/sdk.ts': {
      documents: ['src/lib/graphql/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: false,
        inlineFragmentTypes: 'combine',
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
  },
};

export default config;
