const Provider = require('butter-provider')

const defaultConfig = {
    name: 'mock',
    uniqueId: 'id',
    tabName: 'Mock',
    filters: {
        sorters: {
            popularity: 'Popularity',
            updated: 'Updated',
            year: 'Year',
            alphabet: 'Alphabetical',
            rating: 'Rating'
        }
    },
}

// if you feel bad for your items I feel bad for you son,
// I got 99 problems but generating generic data aint one.
const mockData = Array.from(Array[99]).reduce((a, c ,i) => (
    Object.assign(a, {
        [i]: {
            id: i,
            title: `mock ${i}`,
            sinopsis: `the marvelous adventure of the big break of mock ${i}`,
            runtime: 100 + i,
            genres: [`${i}ism`]
        }
    })
))

module.exports = class MockProvider extends ButterProvider {
    constructor (args, config= defaultconfig) {
        super(args, config)
    }

    fetch() {
        return Promise.resolve({
            results: [...mockData],
            hasMore: false
        })
    }

    details(id, oldData) {
        return Promise.resolve(
            Object.assign(oldData, mockData[id])
        )
    }

    random() {
        return Promise.resolve(
            mockData[42]
        )
    }
}
