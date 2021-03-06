const state = {
	info: {},
	hot_tags: [],
	comments: [],
	hot_comments: [],
	page: 0,
	more: true,
	course_id: '',
}
const getters = {
	info: () => state.info,
	hot_tags: () => state.hot_tags,
	comments: () => state.comments,
	hot_comments: () => state.hot_comments,
	more: () => state.more,
	loctime: () => {
		return state.info.loctime ? state.info.loctime.split(',') : ''
	},
}
const actions = {
	fetchInfo({
		commit,
	}, id) {
		commit('fetchInfo', id)
	},
	fetchComments({
		commit,
	}, id) {
		commit('fetchComments', id)
	},
	fetchHotComments({
		commit,
	}, id) {
		commit('fetchHotComments', id)
	},
	commentsLike({
		commit,
	}, id) {
		commit('commentsLike', id)
	},
	courseLike({
		commit,
	}, id) {
		commit('courseLike', id)
	},
}
/* eslint no-underscore-dangle:0 */
const preprocess = (json) => {
	json.forEach(element => {
		if (element.body.length >= 60) {
			element._body = element.body
			element.body = element.body.substr(0, 60)
		}
	})
	return json
}
const Like = function (url, id) {
	this.url = url
	this.id = id
}
Like.prototype.fetch = function () {
	const payload = {
		c_id: this.id,
	}
	const HEADERS = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Basic ' + btoa('eyJpZCI6MTg5fQ.NtSg3Sn00SNOa_MsOabYxN78oJg:'),
	}
	const data = JSON.stringify(payload)
	fetch(this.url, {
		method: 'POST',
		headers: new Headers(HEADERS),
		body: data,
	}).then(response => {
		response.json().then(json => {
			
		})
	})
}
const mutations = {
	fetchInfo(state, id) {
		state.course_id = id
		const url = '/api/v1.0/courses/' + state.course_id
		fetch(url).then(response => {
			response.json().then(json => {
				state.info = json
				state.views = json.views
				let hot_tags
				json.hot_tags ? hot_tags = json.hot_tags.split(' ') : hot_tags=[]
				hot_tags.unshift(json.main_category)
				state.hot_tags = hot_tags
			})
		})
	},
	fetchComments(state, id) {
		state.course_id = id
		state.page += 1
		const url = '/api/v1.0/courses/' + state.course_id + '/comments/?page=' + state.page + '&per_page=10'
		fetch(url).then(response => {
			response.json().then(json => {
				preprocess(json)
				if (json.length == 0) {
					state.more = false
					return
				}
				state.comments = state.comments.concat(json)
				if (state.comments.length >= state.views || state.comments.length <= 10) {
					state.more = false
				}
			})
		})
	},
	fetchHotComments(state, id) {
		state.course_id = id
		const url = '/api/v1.0/courses/' + state.course_id + '/comments/hot/'
		fetch(url).then(response => {
			response.json().then(json => {
				preprocess(json)
				state.hot_comments = state.hot_comments.concat(json)
			})
		})
	},
	courseLike(state, id) {
		id = 591
		const url = 'api/v1.0/courses/' + id + '/like/'
		const fetchLike = new Like(url, id)
		fetchLike.fetch()
	},
	commentsLike(state, id) {
		id = 1201
		const url = '/api/v1.0/comments/' + id + '/like/'
		const fetchLike = new Like(url, id)
		fetchLike.fetch()
	},
}
export default {
	state,
	getters,
	actions,
	mutations,
}
