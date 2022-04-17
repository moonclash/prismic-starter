import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

const repoName = process.env['PRISMIC_REPO_NAME'];
const accessToken =  process.env['PRISMIC_ACCESS_TOKEN'];

const endpoint = prismic.getEndpoint(repoName);

export const client = prismic.createClient(endpoint, {
    fetch,
    accessToken,
});