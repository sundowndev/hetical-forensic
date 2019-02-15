export const command = 'disconnect';
export const description = 'Log out from outils.hetic.net';

export const action = async ({ req, logger }) => {
    if (!global.user.phpsessid) {
        logger.error('You are not logged');
    } else {
        global.user = {};
        
        logger.info('Successfully log out from outils.hetic.net');
    }
};
