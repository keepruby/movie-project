import $ from 'jquery'
import styles from './index.module.less'
import videoSrc from '../assets/movie.mp4'
import audioSrc from '../assets/music.mp3'

function init() {
	const container = $('<div>').addClass(styles.container).appendTo('#app')
	const vid = $('<video>')
		.prop('src', videoSrc)
		.prop('autoplay', true)
		.prop('loop', true)
		.addClass(styles.video)
		.appendTo(container)
	const aud = $('<audio>')
		.prop('src', audioSrc)
		.prop('autoplay', true)
		.prop('loop', true)
		.appendTo(container)
	$('<h1>').text('豆瓣电影').addClass(styles.title).appendTo(container)
	$(window).on('scroll', function () {
		const scrollTop = document.documentElement.scrollTop
		const cliHeight = document.documentElement.clientHeight
		if (scrollTop >= cliHeight) {
			vid[0].pause()
			aud[0].pause()
			console.log('暂停')
		} else {
			console.log('播放')
			vid[0].play()
			aud[0].play()
		}
	})
}

init()
