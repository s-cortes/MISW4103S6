const argv = require('node:process').argv;
const fs = require('fs');

const reportsDir = './results/';

function createReport() {
    const specificReport = argv[2] === 'results-from';
    if(specificReport) {
        const reportsFrom = argv[3];
        console.log(`Generating Reports from ${reportsFrom}...`);
        createReportForSpecificDate(reportsFrom);
        console.log('Done!');
    } else {
        console.log('Coming Soon: Reports for all subdirectories');
    }
}

function createReportForSpecificDate(reportsFrom) {
    const reportsFromDir = `${reportsDir}${reportsFrom}`;
    console.log()
    let scenarioDirs = fs.readdirSync(reportsFromDir, { withFileTypes: true });
    scenarioDirs.filter(dirent => !dirent.isFile()).forEach(scenarioDir => {
        const scenarioReportPath = `${reportsFromDir}/${scenarioDir.name}/report.json`
        console.log('Report Path', scenarioReportPath)
        let reportData = JSON.parse(`{${fs.readFileSync(scenarioReportPath, 'utf8')}}`);

        fs.writeFileSync(
            `${reportsFromDir}/${scenarioDir.name}/index.html`,
            createScenarioReport(reportData)
        );
        fs.copyFileSync(
            './index.css',
            `${reportsFromDir}/${scenarioDir.name}/index.css`
        );
    });
}

function createScenarioReport(reportData){
    let {options, datetime} = reportData;
    delete reportData.options;
    delete reportData.datetime;
    return `
    <html>
        <head>
            <title> Cypress VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for Cypress Tests on Ghost versions</h1>
            <h2>Execution: ${datetime}</h2>
            <p>Comparisson Options: ${JSON.stringify(options)}</p>
            <div id="visualizer">
                ${Object.entries(reportData).map(([key, value]) => stepReport(key, value))}
            </div>
        </body>
    </html>`
}

function stepReport(stepName, stepData){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Step Identifier: ${stepName}</h2>
        <p>Data: ${stepData.compareResults}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="../../../${stepData.ghostV3Image}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="../../../${stepData.ghostV4Image}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="../../.${stepData.ghostComparedImage}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

createReport();