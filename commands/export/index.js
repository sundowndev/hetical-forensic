const fs = require('fs');

export const command = 'export <type>';
export const description = 'Export data to json or csv';

export const action = async ({ args, jsonToCsv, logger }) => {
    const [type] = args._
    const dataDir = global.rootPath + "/data";

    // if data directory doesn't exists, create it
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    switch (type) {
        case 'json':
            fs.writeFile(dataDir + "/db.json", JSON.stringify(global.data), function (err) {
                if (err) {
                    return logger.error(err);
                }
            });

            logger.info('Successfully exported data.');
            break;
        case 'csv':
            const csv = await jsonToCsv.parse(global.data.students);

            fs.writeFile(dataDir + "/students.csv", csv, function (err) {
                if (err) {
                    return logger.error(err);
                }
            });

            logger.info('Successfully exported data.');
            break;
        default:
            logger.error('You need to specify a valid type (json or csv).');
    }
};
