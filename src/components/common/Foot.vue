<template>
	<div :class="$style.footer">
        <div :class="$style.title">华中师范大学&nbsp;|&nbsp;木犀团队</div>
        <div :class="$style.links">
            <div :class="$style.row">
                <a href="http://muxistudio.com" :class="$style.item">关于木犀</a>
                <a href="http://form.mikecrm.com/GFFw2v" :class="$style.item">意见反馈</a>
                <a href="http://muxistudio.com" :class="[$style.item, $style.last]">加入我们</a>
            </div>
        </div>
        <div :class="$style.copyright">Proudly Prowered by Vue &amp; Flask</div>
    </div>
</template>
<style lang='sass' module>
.footer {
	width: 100%;
    min-height: 124px;
    background-color: #666;
    text-align: center;
    color: #999;
}
.title {
    font-size: 32px; /*px*/
    padding: 16px 0 18px;
}
.row {
    font-size: 0;
}
.last {
    border-right: 0;
}
.copyright {
    padding-top: 16px;
}
.item {
    display: inline-block;
    width: 33.3%;
    border-right: 2px solid #999; /*px*/
    box-sizing: border-box;
    font-size: 12px;
    color: #999;
}
</style>