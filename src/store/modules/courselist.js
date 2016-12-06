const state = {
	courses: [],
	page: 0,
	position: 0,
	scrollTop: 0,
	height: 0,
	back: false,
	isend: false,
}
const getters = {
	courses: () => state.courses,
	page: () => state.page,
	position: () => state.position,
	scrollTop: () => state.scrollTop,
	height: () => state.height,
	back: () => state.back,
	isend: () => state.isend,
}
/* eslint no-undef:0 */
const actions = {
	fetchCourse({
		commit,
	}) {
		commit('fetchCourse')
	},
	getPosition({
		commit,
	}, position) {
		commit('getPosition', position)
	},
	turnFlag({
		commit,
	}) {
		commit('turnFlag')
	},
	initCourse({
		commit,
	}, page) {
		commit('initCourse', page)
	},
	fetchCourseN({
		commit,
	}) {
		commit('fetchCourseN')
	},
}
const mutations = {
	/* eslint no-unused-vars:0 */
	initCourse(state, page) {
		state.page = 0
		state.courses = []
	},
	fetchCourse(state) {
		state.page += 1
		const url = 'api/v1.0/courses/?page=' + state.page + '&per_page=20&sort=view&null=asc'
		if (state.courses.length == 20) {
			const courses_list = document.getElementById('js_courses_list')
			if (courses_list) {
				state.height = courses_list.offsetHeight
			}
		}
		if (state.courses.length == 40) {
			state.scrollTop = document.body.scrollTop
		}
		fetch(url).then(response => {
			response.json().then(json => {
				state.courses = state.courses.concat(json)
				if (json.length == 0) {
					state.isend = true
				}
				if (state.courses.length >= 60) {
					state.courses.splice(0, 20)
					document.body.scrollTop = (state.scrollTop - state.height)
				}
			})
		})
	},
	getPosition(state, position) {
		state.position = position
	},
	turnFlag(state) {
		state.back = !state.back
	},
	fetchCourseN(state) {
		if (state.page >= 2) {
			state.page -= 1
		} else {
			return false
		}
		const url = 'api/v1.0/courses/?page=' + state.page + '&per_page=20&sort=view&null=asc'
		if (state.courses.length == 20) {
			const courses_list = document.getElementById('js_courses_list')
			if (courses_list) {
				state.height = courses_list.offsetHeight
			}
		}
		if (state.courses.length == 40) {
			state.scrollTop = document.body.scrollTop
		}
		fetch(url).then(response => {
			response.json().then(json => {
				state.courses = json.concat(state.courses)
				if (json.length == 0) {
					state.isend = true
				}
				if (state.courses.length >= 60) {
					state.courses.splice(state.courses.length - 20, 20)
					document.body.scrollTop = (state.scrollTop - state.height)
				}
			})
		})
		return true
	},
}
export default {
	state,
	getters,
	actions,
	mutations,
}
