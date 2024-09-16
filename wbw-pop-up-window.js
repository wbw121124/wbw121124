/*
wbw-pop-up-window.js
author: wbw121124
作者中文名: 吴邦玮
联系方式: wbw121124@outlook.com https://github.com/wbw121124
version: 1.0
code: UTF-8
codegeex ai支持//它根本想不出来了完整的，只能帮助我偷懒写一些（即使写出来，也是错的）
*/
/*
示例:
<script src="path/to/wbw-pop-up-window.js"></script>
<script>
	var hi=new wpuw();
	hi.init();
	var puw=hi.new("center","你好，世界","center");
</script>
*/
class wpuw_data {
	constructor(id, pos) {
	    this.id=id;
		this.pos=pos;
	}
	close() {
		document.getElementById(this.id).style.display = "none";
	}
	show() {
		document.getElementById(this.id).style.display = "block";
	}
	del() {
		document.getElementById(this.id).remove();
		~(this.id);
	}
	remove() {
		document.getElementById(this.id).remove();
		~(this.id);
	}
	style(s) {
		document.getElementById(this.id).style = "display:"+document.getElementById(this.id).style.display+";"+s;
	}
	pos(pos) {
		if(this.pos == "center") {
			console.log("wpuw:wpuw_data.pos()参数错误,pos为this.center不需要设置位置");
			return;
		}
		document.getElementById(this.id).classList.remove(".wpuw-"+this.pos);
		document.getElementById(this.id).classList.add(".wpuw-"+pos);
	}
	content(c) {
		document.getElementById(this.id).innerHTML = c;
	}
	getelement() {
		return document.getElementById(this.id);
	}
}
class wpuw {//pop-up-window
	init() {
		var style = document.createElement("style");
		style.innerHTML = `
		.wpuw-center-background {
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    position: fixed;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    background-color: rgba(0, 0, 0, 0.5);
		    z-index: 9999;
		}
		.wpuw-center-box {
		    position: relative;
			background-color: rgba(255, 255, 255, 0.75);
		    padding: 25px;
		    border-radius: 10px;
		    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			z-index: 99999;
			/*正中间*/
			/*transform: translate(-50%, -50%);*/
			/*left: 50%;
			top: 50%;*/
		}
		.wpuw-center-box-close {
		    cursor: pointer;
			context: "x";
		    position: absolute;
		    top: 10px; right: 10px;
			z-index: 999999;
		}
		.wpuw-other-background {
		    /*display: none;*//*不打扰客户*/
		    position: fixed;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    /*background-color: rgba(0, 0, 0, 0.5);*/
		    z-index: 9999;
		}
		.wpuw-other-box {
		    position: absolute;
			background-color: rgba(255, 255, 255, 0.75);
		    padding: 25px;
		    border-radius: 10px;
		    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			z-index: 99999;
			/*自定义位置（其他属性）*/
		}
		.wpuw-other-box-close {
			cursor: pointer;
			context: "x";
		    position: absolute;
		    top: 10px; right: 10px;
			z-index: 999999;
		}
		.wpuw-center-box-close:hover, .wpuw-other-box-close:hover {
		    color: red;
		}
		.wpuw-center-box-close:hover svg, .wpuw-other-box-close:hover svg {
		    color: red;
			stroke: red;
		}
		.wpuw-left-top {
		    top: 0;
		    left: 0;
		}
		.wpuw-right-top {
		    top: 0;
		    right: 0;
		}
		.wpuw-left-bottom {
		    bottom: 0;
		    left: 0;
		}
		.wpuw-right-bottom {
		    bottom: 0;
		    right: 0;
		}
		/*center会不准确，建议不使用*/
		.wpuw-left-center {
		    top: 50%;
		    left: 0;
		}
		.wpuw-right-center {
		    top: 50%;
		    right: 0;
		}
		.wpuw-top-center {
		    top: 0;
		    left: 50%;
		}
		.wpuw-bottom-center {
		    bottom: 0;
		    left: 50%;
		}
		`
		document.body.append(style);
		var close_svg = document.createElement("svg");
		//it is a × icon
		close_svg.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" stroke="black" class="bi bi-x" viewBox="0 0 16 16">
			<path d="M0 0 L16 16 M0 16 L16 0" stroke-width="1.5" />
		</svg>
		`
		close_svg.id="wpuw-close_svg";
		close_svg.style="display:none;"
		document.body.append(close_svg);
	}
	wpuw() {
		/*after the `new wpuw()`, you need `.init()`*/
	}
	cnt=0;
	new(type, content, pos, style="") {
		/*
		type: center, other
		content: 内容(可以使用html)
		pos: left-top, right-top, left-bottom, right-bottom(type为other时需要设置，center时任意设置)
		style: 样式
		*/
		if (type == "center") {
			var div = document.createElement("div");
			div.className = "wpuw-center-background";
			div.innerHTML = `
			<div class="wpuw-center-box" style="${style}">
				<div class="wpuw-center-box-close">x</div>
				<div class="wpuw-center-box-content">${content}</div>
			</div>
			`;
			div.id="wpuw-"+this.cnt;
			this.cnt++;
			div.children[0].children[0].innerHTML=document.getElementById("wpuw-close_svg").innerHTML;
			div.children[0].children[0].addEventListener("click", () => {
				div.remove();
			})
			document.body.append(div);
			return new wpuw_data(div.id, "center");
		}
		else {
			var div = document.createElement("div");
			div.className = "wpuw-other-background";
			div.innerHTML = `
			<div class="wpuw-other-box" style="${style}">
				<div class="wpuw-other-box-close">x</div>
				<div class="wpuw-other-box-content">${content}</div>
			</div>
			`;
			switch (pos) {
				case "left-top":
					div.children[0].className += " wpuw-left-top";
					break;
				case "right-top":
					div.children[0].className += " wpuw-right-top";
					break;
				case "left-bottom":
					div.children[0].className += " wpuw-left-bottom";
					break;
				case "right-bottom":
					div.children[0].className += " wpuw-right-bottom";
					break;
				default:
					//控制台警告
					console.warn("wpuw: 未知的pos参数");
					return null;
					break;
			}
			div.id="wpuw-"+this.cnt;
			this.cnt++;
			div.children[0].children[0]=document.getElementById("wpuw-close_svg").cloneNode(true);
			div.children[0].children[0].addEventListener("click", () => {
				div.remove();
			})
			document.body.append(div);
			return new wpuw_data(div.id, pos);
		}
	}
}