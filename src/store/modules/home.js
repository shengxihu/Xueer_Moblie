const state = {
	tips: '',
}
const getters = {
	tips: () => state.tips,
}
const actions = {
	fetchData({
		commit,
	}) {
		commit('fetchData')
	},
}
const mutations = {
	fetchData(state) {
		fetch('/api/v1.0/tips/').then((response) => {
			response.json().then((json) => {
				state.tips = json
			})
		})
	},
}
export default {
	state,
	getters,
	actions,
	mutations,
}
