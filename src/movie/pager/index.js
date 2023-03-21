import $ from 'jquery'
import styles from './index.module.less'
import { getMovieLists } from '@/api/movie'
import { createList } from '../list/index'
let container
function init() {
	container = $('<div>').addClass(styles.pager).appendTo('#app')
}

init()

/**
 * 根据传入的页码、页容量、总记录数，创建分页区域的标签
 * @params page 页码
 * @params limit 页容量
 * @params total 总页数
 */
export function createPagers(page, limit, total) {
	container.empty()
	console.log(page, limit, total)
	/**
	 * 辅助函数，负责帮忙创建一个页码标签
	 * @params text 标签的文本
	 * @params status 标签的状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
	 */
	async function createTag(text, status, targetPage) {
		const span = $('<span>')
			.appendTo(container)
			.text(text)
			.addClass(styles[status])

		if (status === '') {
			span.on('click', async function () {
				const resp = await getMovieLists(targetPage, limit)
				createList(resp.data.movieList)
				createPagers(targetPage, limit, resp.data.movieTotal)
			})
		}
	}
	const pageNum = Math.floor(total / limit)

	//1. 创建首页标签
	createTag('首页', page === 1 ? 'disabled' : '', 1)
	//2. 创建上一页标签
	createTag('上一页', page === 1 ? 'disabled' : '', page - 1)
	//3. 创建数字页码标签
	const maxCount = 10
	let min = Math.floor(page - maxCount / 2)
	min < 1 && (min = 1)
	let max = min + maxCount - 1
	max > pageNum && (max = pageNum)
	for (let i = min; i <= max; i++) {
		createTag(i, i === page ? 'active' : '', i)
	}
	//4. 创建下一页标签
	createTag('下一页', page === pageNum ? 'disabled' : '', page + 1)
	//5. 创建尾页标签
	createTag('尾页', page === pageNum ? 'disabled' : '', pageNum)
}
