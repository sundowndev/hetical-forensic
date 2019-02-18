export const command = 'show <data>';
export const description = 'Display module data';

export const action = async ({ args, logger }) => {
    const [data] = args._

    switch (data) {
        case 'students':
            logger.table({ rows: global.data.students.slice(0, 50) || [], name: 'Students' });
            break;
        case 'enterprises':
            logger.table({ rows: global.data.enterprises.slice(0, 50) || [], name: 'Enterprises' });
            break;
        default:
            logger.error('You need to specify a valid module');
            logger.info('Modules : students, enterprises');
    }
};
