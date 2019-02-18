const rp = require("request-promise");
const cheerio = require('cheerio');

const j = rp.jar();

const login = async (creds, logger) => {
  let options = {
    followAllRedirects: true,
    method: 'POST',
    url: 'https://outils.hetic.net/login.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0',
      'Cache-Control': 'no-cache',
    },
    form: {
      ide: creds.email,
      pwd: creds.password,
    },
    jar: j,
  }

  await rp(options)
    .then(function (body) {
      logger.info('Successfully fetched outils.hetic.net');

      const $ = cheerio.load(body);

      if ($('input#user').html() !== null) {
        return logger.error('Bad credentials.');
      }

      logger.info('Credentials are correct');

      const sessionID = j.getCookieString(options.url);
      const cookieHeader = `Cookie: ${sessionID}`;
      const fullName = $('a[href="/ogi/profil/"]').text();

      logger.info(`Logged as ${fullName}`);

      return global.user = {
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ')[1],
        phpsessid: sessionID,
        cookieHeader: cookieHeader,
      };
    });
}

const isLogged = async () => {}

const getHeaders = async () => {
  return {
    followAllRedirects: true,
    method: 'GET',
    url: 'https://outils.hetic.net/ogi/students',
    headers: {
      'cache-control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0',
      'Cache-Control': 'no-cache',
      'Cookie': `${global.user.phpsessid || ''}`,
    },
    transform: function (body) {
      return cheerio.load(body);
    },
  };
}

module.exports = () => ({
  login: login,
  getHeaders: getHeaders,
  isLogged: isLogged,
});
