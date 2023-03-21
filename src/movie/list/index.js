import $ from 'jquery'
import styles from './index.module.less'

let container
function init() {
	container = $('<div>').addClass(styles.container).text(666).appendTo('#app')
}

init()

export function createList(movies) {
	console.log(movies)
	const result = movies
		.map((e) => {
			const html = `
            <div>
            <a src=${e.url} target="_blank"><img src=${e.cover}></img></a>
            <a src=${e.url} target="_blank"><p class=${styles.title}>${e.title}</p></a>
            <p class=${styles.rate}>${e.rate}</p>
            </div>
        `
			return html
		})
		.join('')
	container.html(result)
}
