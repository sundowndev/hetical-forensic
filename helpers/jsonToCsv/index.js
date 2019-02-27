const escapeCsv2 = async (x) => {
    if (x) {
        return ('' + x).replace( /[",\n\r]/gi, '' );
    }
    else {
        return ('');
    }
}

const jsonToCsv2 = async (data, cb) => {
    var keys = Object.keys(data[0]);
    var csv = [keys.join(",")];
    console.time("CSVGeneration");
    data.forEach(function (row) {
        var line = '';
        keys.forEach(function (key) {
            if (typeof row[key] === 'string') {
                row[key] = "" + escapeCsv(row[key]) + "";
            }
            line += row[key] + ",";
        });
        csv.push(line);
    });
    console.timeEnd("CSVGeneration");
    csv = csv.join("\n");
    return csv;
}

const escapeCsv = (x) => {
    if (x) return ('' + x.replace(/"/g, '').replace(/,/g, ' ').replace(/\n/g, " ").replace(/\r/g, " ") + '');
    else return ('');
}

const jsonToCsv = (data) => {
    var keys = Object.keys(data[0]),
        csv = [keys.join(",")];

    var row;
    for (var i = 0; i < data.length; i++) {
        row = [];
        for (var j = 0; j < keys.length; j++) {
            if (typeof data[i][keys[j]] === 'string') {
                row.push('"' + escapeCsv(data[i][keys[j]]) + '"');
            } else {
                row.push(data[i][keys[j]]);
            }
        }
        csv.push(row.join(','));
    }

    return csv.join("\n");
}

module.exports = () => ({
    parse: jsonToCsv,
});
