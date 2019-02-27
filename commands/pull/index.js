export const command = 'pull';
export const description = 'Pull data from outils.hetic.net';

const rp = require("request-promise");
const cheerio = require('cheerio');

export const action = async ({ logger }) => {
    const options = {
        followAllRedirects: true,
        method: 'GET',
        url: 'https://outils.hetic.net/ogi/students',
        headers: {
            'cache-control': 'no-cache',
            'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0',
            'Cookie': `${global.user.phpsessid};`,
        },
        transform: function (body) {
            return cheerio.load(body);
        },
    };

    const promotions = [];

    await rp(options)
        .then(function ($) {
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
                'Cookie': `${global.user.phpsessid};`,
            },
            transform: function (body) {
                return cheerio.load(body);
            },
        };

        await rp(options)
            .then(async ($) => {
                logger.info(`Fetching students from ${promotion} promotion...`);

                $('table.liste_insertions.liste_insertions_stage tbody tr').each(async function () {
                    $('td a', this).each(function (index, col) {
                        if ($(col).text().slice(-1) === ' ') $(col).text($(col).text().slice(0, -1));
                        else if ($(col).text() === ' ') $(col).text('');
                    });

                    const student = {};
                    student.uid = $('td:nth-child(1) a', this).attr('href').replace('/ogi/profil/', '');
                    student.lastName = $('td:nth-child(1)', this).text();
                    student.firstName = $('td:nth-child(2)', this).text();
                    student.heticEmail = `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@hetic.net`
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(new RegExp(' ', 'g'), '');
                    student.email = null;
                    student.birthdate = null
                    student.phone = null;
                    student.cursus = null;
                    student.picture = `https://outils.hetic.net/external/picture/${student.uid}`;
                    student.enterprise = $('td:nth-child(3)', this).text() || null;
                    student.country = $('td:nth-child(4)', this).text() || 'France';
                    student.promotion = parseInt(promotion);

                    await rp({
                        followAllRedirects: true,
                        method: 'GET',
                        url: 'https://outils.hetic.net/ogi/profil/' + student.uid,
                        headers: {
                            'cache-control': 'no-cache',
                            'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0',
                            'Cookie': `${global.user.phpsessid};`,
                        },
                        transform: function (body) {
                            return cheerio.load(body);
                        },
                    })
                        .then(function ($) {
                            let secondLi = $('.left .item:nth-child(1) ul li:nth-child(2)').text();

                            student.email = $('.left .item:nth-child(1) ul li:nth-child(1)').text() || null;
                            student.cursus = $('.right.right_first .infos h3').text().replace(` P${student.promotion}`, '') || null;

                            if (secondLi.match(/^(?:n\é\(e\)\ le\ )(?:.*)/)) {
                                secondLi = secondLi.replace('né(e) le ', '') || null;
                                secondLi = secondLi.split('/');

                                student.birthdate = new Date(`${secondLi[2]}-${secondLi[1]}-${secondLi[0]}`);
                            } else if (secondLi.match(/^[0-9]{8,}/)) {
                                student.phone = secondLi || null;
                            }
                        })

                    let studentObj = {
                        uid: student.uid,
                        firstName: student.firstName,
                        lastName: student.lastName,
                        heticEmail: student.heticEmail,
                        email: student.email,
                        phone: student.phone,
                        cursus: student.cursus,
                        birthdate: student.birthdate,
                        picture: student.picture,
                        promotion: student.promotion,
                        enterprise: student.enterprise,
                        country: student.country,
                    };

                    students.push(studentObj);
                });
            });
    };

    global.data = {};
    global.data.students = students;
    logger.info(`Harvested ${students.length} students`);
};