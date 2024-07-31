const { data } = require('./data.js');

const COMMAND_FILTER = '--filter';
const COMMAND_COUNT = '--count';
const INVALID_COMMAND = "Invalid command";
const MISSING_PATTERN = "Pattern is missing for filter command";
const MISSING_DATA = "Data is undefined";

/**
 * Filtre les données en fonction d'un motif.
 * @param {string} pattern - Le motif à rechercher.
 * @param {Array} ProvidedData - Les données à filtrer.
 * @returns {Array} - Les données filtrées.
 */
function filterData(pattern, ProvidedData) {
    if (!ProvidedData) {
        throw new Error(MISSING_DATA);
    }

    return ProvidedData
        .map(country => {
            const filteredPeople = country.people
                .map(person => {
                    const filteredAnimals = person.animals.filter(animal => animal.name.includes(pattern));
                    return filteredAnimals.length > 0 ? { ...person, animals: filteredAnimals } : null;
                })
                .filter(person => person !== null);

            return filteredPeople.length > 0 ? { ...country, people: filteredPeople } : null;
        })
        .filter(country => country !== null);
}

/**
 * Compte les éléments dans les données fournies.
 * @param {Array} ProvidedData - Les données à compter.
 * @returns {Array} - Les données comptées.
 */
function countData(ProvidedData) {
    if (!ProvidedData) {
        throw new Error(MISSING_DATA);
    }

    return ProvidedData.map(country => ({
        name: `${country.name} [${country.people.length}]`,
        people: country.people.map(person => ({
            name: `${person.name} [${person.animals.length}]`,
            animals: person.animals
        }))
    }));
}


// Exécute la commande passée en argument.
const args = process.argv.slice(2);
const command = args[0];
const pattern = args[1];

try {
    if (command === COMMAND_FILTER) {
        if (!pattern) {
            console.log(MISSING_PATTERN);
            process.exit(1);
        }
        console.log(JSON.stringify(filterData(pattern, data), null, 2));
    } else if (command === COMMAND_COUNT) {
        console.log(JSON.stringify(countData(data), null, 2));
    } else {
        console.log(INVALID_COMMAND);
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
}

module.exports = { filterData, countData };
