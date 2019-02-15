export const command = 'pull';
export const description = 'Pull data from outils.hetic.net';

const rp = require("request-promise");
const cheerio = require('cheerio');

export const action = async ({ req, logger }) => {
    const options = {
        followAllRedirects: true,
        method: 'GET',
        url: 'https://outils.hetic.net/ogi/students',
        headers: {
            'cache-control': 'no-cache',
            'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0',
            'Cookie': `PHPSESSID=${global.user.phpsessid};`,
        },
        transform: function (body) {
            return cheerio.load(body);
        },
    };

    const promotions = [];

    await rp(options)
        .then(function ($) {
            // logger.log(options.headers);
            logger.info('Successfully fetched outils.hetic.net');

            $('select#select_list_promo_students option').each(function (i, elem) {
                promotions.push($(this).attr('value'));
            });

            logger.info(`Fetched existing promotions : ${promotions.join(', ')}`);
        })

    const students = [];

    for (const promotion of promotions) {
        const options = {
            followAllRedirects: true,
            method: 'GET',
            url: 'https://outils.hetic.net/ogi/students/' + promotion,
            headers: {
                'cache-control': 'no-cache',
                'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0',
                'Cookie': `PHPSESSID=${global.user.phpsessid};`,
            },
            transform: function (body) {
                return cheerio.load(body);
            },
        };

        await rp(options)
            .then(async ($) => {
                // logger.debug($('body'));
                logger.info(`Fetching students from ${promotion} promotion...`);

                await $('table.liste_insertions.liste_insertions_stage tbody tr').each(function (i, student) {
                    $('td a', this).each(function (index, col) {
                        if ($(col).text().slice(-1) === ' ') $(col).text($(col).text().slice(0, -1));
                        else if ($(col).text() === ' ') $(col).text('');
                    });

                    let uid = $('td:nth-child(1) a', this).attr('href').replace('/ogi/profil/', '');
                    let lastName = $('td:nth-child(1)', this).text();
                    let firstName = $('td:nth-child(2)', this).text();
                    let heticEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hetic.net`
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(new RegExp(' ', 'g'), '');

                    let studentObj = {
                        uid: uid,
                        firstName: firstName,
                        lastName: lastName,
                        heticEmail: heticEmail,
                        email: null,
                        phone: null,
                        cursus: null,
                        birthdate: null,
                        picture: `https://outils.hetic.net/external/picture/${uid}`,
                        promotion: promotion,
                        enterprise: $('td:nth-child(3)', this).text() || null,
                        country: $('td:nth-child(4)', this).text() || 'France',
                    };

                    students.push(studentObj);

                    // logger.debug(studentObj);
                });
            });
    };

    global.data = {};
    global.data.students = students;
    logger.info(`Harvested ${students.length} students`);
    // logger.debug(global.data);
};