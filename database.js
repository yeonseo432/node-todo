const fs = require(`fs`);

function loadData(fileName) {
    if(!fs.existsSync(fileName)) return console.log("존재하지 않는 파일입니다.");
    const fileData = fs.readFileSync(fileName, `utf-8`);
    return JSON.parse(fileData);
}

function saveData(fileName, data) {
    const rows = data.map( item => `  ${JSON.stringify(item)}`);
    const customJson = `[\n${rows.join(`,\n`)}\n]`;
    fs.writeFileSync(fileName, customJson);
}

module.exports = {
    loadData,
    saveData
};