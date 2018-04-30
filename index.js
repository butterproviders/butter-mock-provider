const ButterProvider = require('butter-provider')
const debug = require('debug')('butter-mock-provider')

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
const mockData = Array.from(Array(99)).reduce((a, c ,i) => (
    Object.assign(a, {
        [i]: {
            id: i,
            type: ButterProvider.ItemType.MOVIE,
            title: `mock ${i}`,
            synopsis: `the marvelous adventure of the big break of mock ${i}`,
            year: 1970 + i,
            rating: i % 9,
            backdrop: `http://imgur.com/${i}`,
            poster: `http://imgur.com/${i*i}`,
            subtitle: [],
            trailer: `http://ytu.be/${i}`,
            torrents: {
                '720p': {
                    url: `https://tpb.me/${i}`,
                    size: 1024*i
                },
                '1080p': {
                    url: `https://tpb.me/${i}-big`,
                    size: 1024*1024*i
                },
                '4k': {
                    url: `https://tpb.me/${i}-very-big`,
                    size: 1024*1024*1024*i
                }
            },
            runtime: 100 + i,
            genres: [`${i}ism`]
        }
    })
), {})

const debugAndResolve = (context, ret) => {
    debug(context, 'delaying return of', JSON.stringify(ret, null, 2))
    return new Promise((accept) => (
        setTimeout(() => (
            accept(ret)
        ), 200)
    ))
}

module.exports = class MockProvider extends ButterProvider {
    constructor (args, config= defaultConfig) {
        super(args, config)
        this.mockData = mockData
    }

    fetch() {
        return debugAndResolve('fetch', {
            results: Object.values(mockData),
            hasMore: false
        })
    }

    detail(id, oldData) {
        return debugAndResolve('details', Object.assign({}, mockData[id], oldData))
    }

    random() {
        return debugAndResolve('random', mockData[42])
    }

    update(shouldSucceed=true) {
        if (! shouldSucceed) {
            return debugAndResolve('update', null)
        }

        return this.fetch().then(r => r.results)
    }
}
