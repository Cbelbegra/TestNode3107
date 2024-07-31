const assert = require('assert');
const { filterData, countData } = require('./app');

const testData = [
    {
        name: 'Country1',
        people: [
            {
                name: 'Person1',
                animals: [
                    { name: 'Cat' },
                    { name: 'Dog' }
                ]
            },
            {
                name: 'Person2',
                animals: [
                    { name: 'Bat' },
                    { name: 'Rat' }
                ]
            }
        ]
    },
    {
        name: 'Country2',
        people: [
            {
                name: 'Person3',
                animals: [
                    { name: 'Elephant' }
                ]
            }
        ]
    }
];

describe('Filter Function', () => {
    it('should filter animals by pattern', function () {
        const result = filterData('at', testData);
        assert.deepStrictEqual(result, [
            {
                name: 'Country1',
                people: [
                    {
                        name: 'Person1',
                        animals: [
                            { name: 'Cat' }
                        ]
                    },
                    {
                        name: 'Person2',
                        animals: [
                            { name: 'Bat' },
                            { name: 'Rat' }
                        ]
                    }
                ]
            }
        ]);
    });

    it('should return an empty array if no match is found', function () {
        const result = filterData('fox', testData);
        assert.deepStrictEqual(result, []);
    });

    it('should be case sensitive', function () {
        const result = filterData('cat', testData);
        assert.deepStrictEqual(result, []);
    });

    it('should return an empty array if the pattern is empty', function () {
        const result = filterData('', testData);
        assert.deepStrictEqual(result, testData);
    });

    it('should return an empty array if the data is empty', function () {
        const result = filterData('cat', []);
        assert.deepStrictEqual(result, []);
    });

    it('should throw an error if the data is null', function () {
        assert.throws(() => filterData('cat', null), Error, "Data is undefined");
    });
});

describe('Count Function', () => {
    it('should count the number of items in the array', function () {
        const result = countData(testData);
        assert.deepStrictEqual(result, [
            {
                name: 'Country1 [2]',
                people: [
                    {
                        name: 'Person1 [2]',
                        animals: [
                            { name: 'Cat' },
                            { name: 'Dog' }
                        ]
                    },
                    {
                        name: 'Person2 [2]',
                        animals: [
                            { name: 'Bat' },
                            { name: 'Rat' }
                        ]
                    }
                ]
            },
            {
                name: 'Country2 [1]',
                people: [
                    {
                        name: 'Person3 [1]',
                        animals: [
                            { name: 'Elephant' }
                        ]
                    }
                ]
            }
        ]);
    });

    it('should return 0 for an empty array', function () {
        const result = countData([]);
        assert.deepStrictEqual(result, []);
    });
});
