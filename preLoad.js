;(function($) {

	$.extend($.fn, {
	    preLoading: function(opt){
			var defined = {
				imgList : {},
				imgready : function(){},
				allready : function(){},
				reloadCount : 1
			},
			option = $.extend(defined, opt),
			$scope = this,
			count = function(obj) {
		            var count = 0;
		            for(var item in obj) {
		                count ++;
		            }
		            return count;
		        }
	      	,len = count(option.imgList),
            readyCount = 0,
            noticeReady = function(errorList) {
                $scope.trigger('allready');
            };


	        // 进度显示demo
		    $scope.on('imgready', option.imgready).on('allready',option.allready);
	        // 图片加载完成后填充dom
		    $scope.on('allready', function() {
		        var $bgs = $('[data-res-bg]'),
		            $imgs = $('[data-res-img]');

		        for(var i = 0, bgLen = $bgs.length; i < bgLen; i++) {
		            var $bg = $bgs.eq(i);

		            $bg.css('background-image', 'url(' + IMG_LIST[$bg.data('res-bg')] + ')');
		        }

		        for(var j = 0, imgLen = $imgs.length; j < imgLen; j++) {
		            var $img = $imgs.eq(j);

		            $img.attr('src', IMG_LIST[$img.data('res-img')]);
		        }

		    });

            if(len) {
                for(var item in IMG_LIST) {
                    var img = new Image();
                    //如果图片请求错误也让他继续
                    $(img).on('load error', (function(item) {
                    	return function(e) {
							readyCount++;
	                        if(e.type == 'error') {
                        		var reload = new Image(),
                        			$reload = $(reload),
                        			isSuccess = false;

                        		$reload.on('error', function() {
                        			errFunc.call(this,e)
                        		})

                        		function errFunc() {
                        			console.log('尝试重新连接' + IMG_LIST[item]);
                        			if (--option.reloadCount && !isSuccess) {

                        				var _reload = new Image(),
                        				_$reload = $(_reload);
                        				_$reload.on('error', errFunc);
                        				_$reload.on('load', function() {
                        					isSuccess = true;
                        				})
                        				_reload.src = IMG_LIST[item]
                        			}
                        		}
 
                        		$reload.on('load', function() {
                        			$reload.off('load');
                        			isSuccess = true;
                        		})
                        		reload.src = IMG_LIST[item];
	                    	}
	                        $scope.trigger('imgready', readyCount/len);
	                        readyCount == len && noticeReady();
	                    }
                    })(item))
                    img.src = IMG_LIST[item];
                }
            }
            else {
                noticeReady();
            }
            
			return this;
		}
	})

		
})(Zepto);
