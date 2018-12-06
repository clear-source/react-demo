(function(){
	var fontSizeMatchDeviceWidth = function(){
		var deviceWidth = document.documentElement.clientWidth || window.screen.width || 320,
			devicePixelRatio = window.devicePixelRatio || 1,
			fontSize = (Math.ceil(deviceWidth * 16 / 320)),
			scale = 1 / devicePixelRatio; // 默认的缩放
		document.documentElement.style.fontSize = fontSize + 'px';
		document.querySelector('meta[name="viewport"]').setAttribute('content','width=device-width,initial-scale='+'scale'+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=no,viewport-fit=cover'); // 增加viewport-fit=cover适配iphone x
	};
	
	(function(){
		var ua = navigator.userAgent;
		if(/android/i.test(ua) || /ipad|itouch|iphone/i.test(ua)|| /tianqi/i.test(ua)){
			fontSizeMatchDeviceWidth();
		} else { // pc端优雅降级
			document.documentElement.style.fontSize = '14px';
		}
	})();
})();
