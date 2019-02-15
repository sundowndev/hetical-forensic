export const command = 'connect';
export const description = 'Log in to outils.hetic.net using email and password';

const { promptAction } = require('../../core/connect/prompt');

export const action = async ({ req, logger }) => {
    const creds = await promptAction();

    return req.login(creds, logger);
};
