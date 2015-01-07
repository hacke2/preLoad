preLoad
=======

一款基于Zepto的预加载插件，提供进度回调


# 介绍 
##独立页图片预加载
某些独立页、活动页由于图片众多，为了良好的交互，一般会设置一个`加载页`来加载图片资源，待图片加载完成后渲染到对应的DOM中。

# 参数说明
```
imgList：图片的别名和地址
imgready：图片正在加载中执行的回调函数，接受两个参数：e和进度（注：进度为0-1之间的小数）
allready：图片全加载完成后执行的回调函数
reloadCount: 如果图片请求失败再次请求的次数，默认为0 

```

# 绘制到DOM元素上

```
给对应的dom挤在标签：
1.data-res-bg="s_1_1" 标示将别名为s_1_1的资源加到这个元素的背景上
2.data-res-img="s_1_2" 标示将别名为s_1_2的资源加到这个元素的src地址上，一般为img标签
```

# 注意事项

```
1.为了图片不失效，建议放到cdn上
2.设置背景前需在对应元素吧样式设置好，如宽和高
```

# Example

```html
<body id="novelAcheieve">
	<div data-res-bg="s_1_1">
		加载
		<div id="loading"></div>
	</div>
	<div data-res-bg="s_1_2">
		第一屏
	</div>
	<div data-res-bg="s_2_4">
		第二屏
	</div>
</body>
```
```js
var IMG_LIST = {
	's_1_1':'http://cdn.s.aliyun.com/L1/272/6837/static/wap/img/novel/activity/2014year-endInventory/dist/cloud_white.png',
    's_1_2':'http://cdn.s.aliyun.com/L1/272/6837/static/wap/img/novel/activity/2014year-endInventory/dist/homes_bg.png',
    's_2_1':'http://cdn.s.aliyun.com/L1/272/6837/static/wap/img/novel/activity/2014year-endInventory/dist/stars.png',
    's_2_2':'http://cdn.s.aliyun.com/L1/272/6837/static/wap/img/novel/activity/2014year-endInventory/dist/liuxing.png',
    's_2_3':'http://cdn.s.aliyun.com/L1/272/6837/static/wap/img/novel/activity/2014year-endInventory/dist/moon.png',
    's_2_4':'http://cdn.s.aliyun.com/L1/272/6837/static/wap/img/novel/activity/2014year-endInventory/dist/cloud_black.png1'
};

$('#novelAcheieve').preLoading({
    imgList : IMG_LIST,
    imgready : function (e, value) {
        console.log(~~(value * 100))
    },
    allready : function(e) {
    }
});
```
