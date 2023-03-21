import { createList } from './list/index'
import { createPagers } from './pager/index'
import { getMovieLists } from '../api/movie'

async function init() {
	const resp = await getMovieLists(1, 30)
	createList(resp.data.movieList)
	createPagers(1, 30, resp.data.movieTotal)
}
init()
