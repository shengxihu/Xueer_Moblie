<template>
	<div :class="[$style.search_view, {[$style.search_active]: show_search}]">
		<div :class="[$style.warpper, $style.warpper_fadeIn, $style.warpper_fadeOut]">
			<div :class="$style.container">
				<div :class="[$style.search_box, $style.space]">
					<input v-model="info" type="text" :class="$style.search_input">
					<button @click="search" :class="$style.search_btn">搜索</button>
				</div>
				<div :class="$style.hot">
					<p :class="$style.title">大家都在搜</p>
					<div :class="[$style.items, $style.space]">
						<span @click="searchHot(e, item)" v-for='item in hot' :data-link="link" :class="$style.item">
							{{ item }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div @click="hiddenSearch" :class="[$style.circle, $style.circle_fadeIn]"></div>
	</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	data(){
		return {
			info: '',
		}
	},
	mounted() {
		this.fetchHot()
	},
	computed: {
		...mapGetters([
			'hot',
			'show_search',
			'snaps',
			'result',
			'txt',
		]),
		...mapState([
			'page_snaps',
			'search_page',
		]),
		link() {
			return 'search/?page=1&per_page=20&keywords=' + this.hot
		},
	},
	watch: {
		txt() {
			this.isLoading(false)
			this.hiddenSearch()
		}
	},
	methods: {
		...mapActions([
			'fetchHot',
			'hideSearch',
			'changePageFlagN',
			'changePageFlagY',
			'searchCourse',
			'isLoading',
			'initCourse'
		]),
		hiddenSearch() {
			this.hideSearch()
			this.changePageFlagN('is_search')
			for(var key in this.page_snaps) {
				if(this.page_snaps[key]) {
					this.changePageFlagY(key)
				} else {
					this.changePageFlagN(key)
				}
			}
		},
		search() {
			const info = encodeURIComponent(this.info)
			if (info == this.txt || !this.info) {
				this.hiddenSearch()
				return
			}
			this.isLoading(true)
			const option = {
				info: info,
				search: true
			}
			this.initCourse(option)
			this.$router.push({ name: 'all', params: { page: 'all', txt: this.txt }})
		},
		searchHot(e, item) {
			this.info = item
			this.search()
		}
	},
}
</script>

<style lang='sass' module>
.search_view {
	z-index: 100;
	position: fixed;
	width: 100%;
	top: 56px;
	left: 0;
	visibility: hidden;
	transition: all 1s;
}
.search_active {
	visibility: visible;
}
.search_active .warpper_fadeIn {
	opacity: 1;
	transition: all 1s;
}
.search_hidden .warpper_fadeOut {
	transition-delay: 0s;
	transition: all .6s;
}
.warpper {
	width: 100%;
	position: absolute;
	z-index: 300;
	left: 0;
	top: 0;
	opacity: 0;
	filter: alpha(opacity=0);
	transition: all .6s;
}
.container {
	width: 328px;
	margin: 0 auto;
}
.search_box {
	font-size: 0;
	padding-top: 16px;
}
.search_input {
	font-size: 32px; /*px*/
	display: inline-block;
	line-height: 34px;
	width: 215px;
	height: 38px;
	box-sizing: border-box;
	vertical-align: top;
	border: 2px solid #eeab5d;
	border-right: 0;
	padding-left: 10px;
	color: #333;
}
.search_btn {
	font-size: 32px; /*px*/
	border-radius: 0 4px 4px 0;  /*px*/
	display: inline-block;
	background-color: #eeab5d;
	width: 100px;
	height: 38px;
	vertical-align: top;
	color: #fff;
}
.title {
	font-size: 32px; /*px*/
	padding: 14px 0;
	color: #999;
}
.items {
	font-size: 0;
}
.item {
	font-size: 28px; /*px*/
	border-radius: 4px; /*px*/
	display: inline-block;
	line-height: 20px;
	background-color: #cdcdcd;
	padding: 0 3px;
	color: #fff;
	margin: 0 6px 16px 0;
}
.search_active .circle_fadeIn {
	transform: translate(-50%,-50%) scale(1);
	opacity: .8;
	transition: all 1s;
}
.circle {
	margin-left: 75%;
	width: 1400px;
	height: 1400px;
	border-radius: 50%;
	background-color: #fff;
	transform: translate(-50%,-50%) scale(0);
	opacity: 0;
	transition: all 1s;
}
</style>
