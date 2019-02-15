const { prompt } = require('enquirer');

export const promptAction = () => {
    return prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Email'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password'
        }
    ]);
};