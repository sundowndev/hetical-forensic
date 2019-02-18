export const command = 'status';
export const description = 'Check authentication status';

export const action = async ({ req, logger }) => {
    if (!global.user.phpsessid) {
        logger.error('You are not logged');
    } else {
        logger.info(`You are logged as ${global.user.firstName} ${global.user.lastName}`);
        logger.info(`Cookie: ${global.user.phpsessid}`);
    }
};
