const fs = require('fs');
const compareImages = require("resemblejs/compareImages");

const cypressRootDir = '../CypressTest/cypress'
const integrationDir = `${cypressRootDir}/integration/`
const ghostScreenshotsDir = `${cypressRootDir}/screenshots/`;
const ghostOldVDir = 'ghost-v3-e2e/';
const ghostNewVDir = 'ghost-v4-e2e/';

const options = {
    "output": {
        "errorColor": {
            "red": 255,
            "green": 0,
            "blue": 255
        },
        "errorType": "movement",
        "largeImageThreshold": 1200,
        "useCrossOrigin": false,
        "outputDiff": true
    },
    "scaleToSameSize": true,
    "ignore": "antialiasing"
};

function getScreenshotFeatureDir(ghostVDir, specFileDir) {
    return `${ghostScreenshotsDir}${ghostVDir}${specFileDir}/`
}

function compareGhostScenarios() {
    // Se utilizan los archivos de la versión antigua de Ghost
    // ya que esta tendrá menos funcionalidades/escenarios/archivos
    let datetime = new Date().toISOString().replace(/:/g,".");
    if (!fs.existsSync(`./results/${datetime}`)) {
        fs.mkdirSync(`./results/${datetime}`, { recursive: true });
    }

    let specFiles = fs.readdirSync(`${integrationDir}${ghostOldVDir}`, { withFileTypes: true });
    specFiles.filter(dirent => dirent.isFile()).forEach(specFile => {
        // Se itera sobre los archivos .spec.js dado que en la carpeta
        // de screenshots estos son utilizados como subdirectorios

        let specSSDir = getScreenshotFeatureDir(ghostOldVDir, specFile.name);
        fs.readdirSync(specSSDir).forEach(scenarioDir => {
            // Se itera sobre los directorios de escenarios para cada funcionalidad
            // para obtener la dirección de sus screenshots

            let scenariosOldVDir = `${specSSDir}${scenarioDir}/`;
            let scenariosNewVDir = scenariosOldVDir.replace(ghostOldVDir, ghostNewVDir);

            let scenarioResultDir = `./results/${datetime}/${scenarioDir}`;
            fs.mkdirSync(scenarioResultDir, { recursive: true });
            fs.writeFileSync(
                `${scenarioResultDir}/report.json`, 
                `"options": ${JSON.stringify(options)}, "datetime": "${datetime}"`);

            let ssFiles = fs.readdirSync(scenariosOldVDir, { withFileTypes: true });
            ssFiles.filter(dirent => dirent.isFile()).forEach( async ssFile => {
                // Se itera sobre las imágenes tomadas durante los reportes
                let ghostV3Image = `${scenariosOldVDir}${ssFile.name}`;
                let ghostV4Image = `${scenariosNewVDir}${ssFile.name}`;
                let ghostComparedImage = `${scenarioResultDir}/${ssFile.name}`;

                const data = await compareImages(
                    await fs.readFileSync(ghostV3Image),
                    await fs.readFileSync(ghostV4Image),
                    options
                );

                const resultInfo = {
                    ghostV3Image: ghostV3Image,
                    ghostV4Image: ghostV4Image,
                    ghostComparedImage: ghostComparedImage,
                    compareResults:{
                        isSameDimensions: data.isSameDimensions,
                        dimensionDifference: data.dimensionDifference,
                        rawMisMatchPercentage: data.rawMisMatchPercentage,
                        misMatchPercentage: data.misMatchPercentage,
                        diffBounds: data.diffBounds,
                        analysisTime: data.analysisTime
                    }
                }

                fs.writeFileSync(ghostComparedImage, data.getBuffer());
                fs.appendFileSync(
                    `${scenarioResultDir}/report.json`, 
                    `,"${ssFile.name.replace('.png', '')}": ${JSON.stringify(resultInfo)}`
                );
            });
        });
    });
}

compareGhostScenarios();