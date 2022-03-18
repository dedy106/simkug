window.portalui_datePickerForm = function(owner){
    if (owner){
        window.portalui_datePickerForm.prototype.parent.constructor.call(this, owner);
		this.className = "portalui_datePickerForm";
        this.width = 140;
        this.height = 132;
        this.onSelect = new portalui_eventHandler();        
        this.monthName = [];
        this.monthName["01"] = "January";
        this.monthName["02"] = "Febuary";
        this.monthName["03"] = "March";
        this.monthName["04"] = "April";
        this.monthName["05"] = "May";
        this.monthName["06"] = "June";
        this.monthName["07"] = "July";
        this.monthName["08"] = "Augustus";
        this.monthName["09"] = "Sepember";
        this.monthName["10"] = "October";
        this.monthName["11"] = "November";
        this.monthName["12"] = "December";
    }
};
window.portalui_datePickerForm.extend(window.portalui_commonForm);
window.datePickerForm = window.portalui_datePickerForm;
//---------------------------- Function ----------------------------------------
window.portalui_datePickerForm.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    var r = this.resourceId;
	    var t = window.system.getName();

	    canvas.style.width = "140";
	    canvas.style.height = "132";
	    canvas.style.background = "#FFFFFF";

	    canvas.style.display = "none";
	    canvas.style.zIndex = "999999";

	    var html = "";
	    var left = 0;

	    if (document.all)
	    {
	        html =  "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                    "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                "</div>" +
	                "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 8}' ></div>" +
	                "<div style='{position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                    "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                "</div>" +
	                "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: 100%; top: 100%; width: 8; height: 12}' ></div>" +
	                "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12;}' >" +
	                    "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12}' ></div>" +
	                "</div>" +
	                "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;}' >" +
	                    "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%}' ></div>" +
	                "</div>" +
	                "<div style='{position: absolute; left: 0;top: 0;width: 100%;height: 100%;background-color: #FFFFFF;border: 1px solid black;}' >" +
	                    "<div align='center' id='" + n + "_caption' style='{position: absolute;left: 0;top: 0;width: 100%;height: 19;color: #000000;font-weight: bold;padding-top: 2;background: "+system.getConfig("app.color.panel")+";}' >January 2005</div>" +
	                    "<div class='control' id='" + n + "_prev' style='{position: absolute; background: url(icon/"+system.getThemes()+"/bleft.png) top left no-repeat; left: 2;top: 1;width: 17;height: 17;cursor: pointer;}' onMouseOver='$$(" + r + ").doButtonMouseOver(event, \"prev\")' onMouseDown='$$(" + r + ").doButtonMouseDown(event, \"prev\")' onMouseOut='$$(" + r + ").doButtonMouseOut(event, \"prev\")' onMouseUp='$$("  + r + ").doButtonMouseOver(event, \"prev\")' onClick='$$(" + r + ").doButtonClick(event, \"prev\")' ></div>" +
	                    "<div id='" + n + "_next' style='{position: absolute; background: url(icon/"+system.getThemes()+"/bright.png) top left no-repeat; left: 119;top: 1;width: 17;height: 17;cursor: pointer;}' onMouseOver='$$(" + r + ").doButtonMouseOver(event, \"next\")' onMouseDown='$$(" + r + ").doButtonMouseDown(event, \"next\")' onMouseOut='$$(" + r + ").doButtonMouseOut(event, \"next\")' onMouseUp='$$(" + r + ").doButtonMouseOver(event, \"next\")' onClick='$$(" + r + ").doButtonClick(event, \"next\")' ></div>";
	    }
	    else
	    {
	        html =  "<div style='{position: absolute;left: 1; top: 0; width: 100%; height: 100%}'>" +
	                    "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left; position: absolute; left: 100%; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left; position: absolute; left: 100%; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                "</div>" +
	                "<div style='{position: absolute; left: 0;top: 0;width: 100%;height: 100%;background-color: #FFFFFF;border: 1px solid black;}' >" +
	                    "<div align='center' id='" + n + "_caption' style='{position: absolute;left: 0;top: 0;width: 100%;height: 17;color: #000000;font-weight: bold;padding-top: 2;background: "+system.getConfig("app.color.panel")+";}' >January 2005</div>" +
	                    "<div class='control' id='" + n + "_prev' style='{position: absolute; background: url(icon/"+system.getThemes()+"/bleft.png) top left no-repeat; left: 2;top: 1;width: 17;height: 17;cursor: pointer;}' onMouseOver='$$(" + r + ").doButtonMouseOver(event, \"prev\")' onMouseDown='$$(" + r + ").doButtonMouseDown(event, \"prev\")' onMouseOut='$$(" + r + ").doButtonMouseOut(event, \"prev\")' onMouseUp='$$("  + r + ").doButtonMouseOver(event, \"prev\")' onClick='$$(" + r + ").doButtonClick(event, \"prev\")' ></div>" +
	                    "<div id='" + n + "_next' style='{position: absolute; background: url(icon/"+system.getThemes()+"/bright.png) top left no-repeat; left: 121;top: 1;width: 17;height: 17;cursor: pointer;}' onMouseOver='$$(" + r + ").doButtonMouseOver(event, \"next\")' onMouseDown='$$(" + r + ").doButtonMouseDown(event, \"next\")' onMouseOut='$$(" + r + ").doButtonMouseOut(event, \"next\")' onMouseUp='$$(" + r + ").doButtonMouseOver(event, \"next\")' onClick='$$(" + r + ").doButtonClick(event, \"next\")' ></div>";
	    }
	    html +=         "<div align='center' style='{position: absolute;left: 0;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;}' >M</div>" +
	                    "<div align='center' style='{position: absolute;left: 20;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;}' >T</div>" +
	                    "<div align='center' style='{position: absolute;left: 40;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;}' >W</div>" +
	                    "<div align='center' style='{position: absolute;left: 60;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;}'>T</div>" +
	                    "<div align='center' style='{position: absolute;left: 80;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;}'>F</div>" +
	                    "<div align='center' style='{position: absolute;left: 100;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;}'>S</div>" +
	                    "<div align='center' style='{position: absolute;left: 120;top: 20;width: 20;height: 16;padding-top: 2;font-weight: bold;color: red;}'>S</div>" +
	                    "<div align='center' id='" + n + "_1' style='{position: absolute;left: 1;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(1)' onDblClick='$$(" + r + ").doDblClick(1)'>1</div>" +
	                    "<div align='center' id='" + n + "_2' style='{position: absolute;left: 20;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(2)' onDblClick='$$(" + r + ").doDblClick(2)'>2</div>" +
	                    "<div align='center' id='" + n + "_3' style='{position: absolute;left: 40;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(3)' onDblClick='$$(" + r + ").doDblClick(3)'>3</div>" +
	                    "<div align='center' id='" + n + "_4' style='{position: absolute;left: 60;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(4)' onDblClick='$$(" + r + ").doDblClick(4)'>4</div>" +
	                    "<div align='center' id='" + n + "_5' style='{position: absolute;left: 80;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(5)' onDblClick='$$(" + r + ").doDblClick(5)'>5</div>" +
	                    "<div align='center' id='" + n + "_6' style='{position: absolute;left: 100;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(6)' onDblClick='$$(" + r + ").doDblClick(6)'>6</div>" +
	                    "<div align='center' id='" + n + "_7' style='{position: absolute;left: 120;top: 36;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(7)' onDblClick='$$(" + r + ").doDblClick(7)'>7</div>" +
	                    "<div align='center' id='" + n + "_8' style='{position: absolute;left: 1;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(8)' onDblClick='$$(" + r + ").doDblClick(8)'>8</div>" +
	                    "<div align='center' id='" + n + "_9' style='{position: absolute;left: 20;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(9)' onDblClick='$$(" + r + ").doDblClick(9)'>9</div>" +
	                    "<div align='center' id='" + n + "_10' style='{position: absolute;left: 40;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(10)' onDblClick='$$(" + r + ").doDblClick(10)'>10</div>" +
	                    "<div align='center' id='" + n + "_11' style='{position: absolute;left: 60;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(11)' onDblClick='$$(" + r + ").doDblClick(11)'>11</div>" +
	                    "<div align='center' id='" + n + "_12' style='{position: absolute;left: 80;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(12)' onDblClick='$$(" + r + ").doDblClick(12)'>12</div>" +
	                    "<div align='center' id='" + n + "_13' style='{position: absolute;left: 100;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(13)' onDblClick='$$(" + r + ").doDblClick(13)'>13</div>" +
	                    "<div align='center' id='" + n + "_14' style='{position: absolute;left: 120;top: 52;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(14)' onDblClick='$$(" + r + ").doDblClick(14)'>14</div>" +
	                    "<div align='center' id='" + n + "_15' style='{position: absolute;left: 1;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(15)' onDblClick='$$(" + r + ").doDblClick(15)'>15</div>" +
	                    "<div align='center' id='" + n + "_16' style='{position: absolute;left: 20;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(16)' onDblClick='$$(" + r + ").doDblClick(16)'>16</div>" +
	                    "<div align='center' id='" + n + "_17' style='{position: absolute;left: 40;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(17)' onDblClick='$$(" + r + ").doDblClick(17)'>17</div>" +
	                    "<div align='center' id='" + n + "_18' style='{position: absolute;left: 60;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(18)' onDblClick='$$(" + r + ").doDblClick(18)'>18</div>" +
	                    "<div align='center' id='" + n + "_19' style='{position: absolute;left: 80;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(19)' onDblClick='$$(" + r + ").doDblClick(19)'>19</div>" +
	                    "<div align='center' id='" + n + "_20' style='{position: absolute;left: 100;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(20)' onDblClick='$$(" + r + ").doDblClick(20)'>20</div>" +
	                    "<div align='center' id='" + n + "_21' style='{position: absolute;left: 120;top: 68;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(21)' onDblClick='$$(" + r + ").doDblClick(21)'>21</div>" +
	                    "<div align='center' id='" + n + "_22' style='{position: absolute;left: 1;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(22)' onDblClick='$$(" + r + ").doDblClick(22)'>22</div>" +
	                    "<div align='center' id='" + n + "_23' style='{position: absolute;left: 20;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(23)' onDblClick='$$(" + r + ").doDblClick(23)'>23</div>" +
	                    "<div align='center' id='" + n + "_24' style='{position: absolute;left: 40;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(24)' onDblClick='$$(" + r + ").doDblClick(24)'>24</div>" +
	                    "<div align='center' id='" + n + "_25' style='{position: absolute;left: 60;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(25)' onDblClick='$$(" + r + ").doDblClick(25)'>25</div>" +
	                    "<div align='center' id='" + n + "_26' style='{position: absolute;left: 80;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(26)' onDblClick='$$(" + r + ").doDblClick(26)'>26</div>" +
	                    "<div align='center' id='" + n + "_27' style='{position: absolute;left: 100;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(27)' onDblClick='$$(" + r + ").doDblClick(27)'>27</div>" +
	                    "<div align='center' id='" + n + "_28' style='{position: absolute;left: 120;top: 84;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(28)' onDblClick='$$(" + r + ").doDblClick(28)'>28</div>" +
	                    "<div align='center' id='" + n + "_29' style='{position: absolute;left: 1;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(29)' onDblClick='$$(" + r + ").doDblClick(29)'>29</div>" +
	                    "<div align='center' id='" + n + "_30' style='{position: absolute;left: 20;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(30)' onDblClick='$$(" + r + ").doDblClick(30)'>30</div>" +
	                    "<div align='center' id='" + n + "_31' style='{position: absolute;left: 40;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(31)' onDblClick='$$(" + r + ").doDblClick(31)'>31</div>" +
	                    "<div align='center' id='" + n + "_32' style='{position: absolute;left: 60;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(32)' onDblClick='$$(" + r + ").doDblClick(32)'>32</div>" +
	                    "<div align='center' id='" + n + "_33' style='{position: absolute;left: 80;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(33)' onDblClick='$$(" + r + ").doDblClick(33)'>33</div>" +
	                    "<div align='center' id='" + n + "_34' style='{position: absolute;left: 100;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(34)' onDblClick='$$(" + r + ").doDblClick(34)'>34</div>" +
	                    "<div align='center' id='" + n + "_35' style='{position: absolute;left: 120;top: 100;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(35)' onDblClick='$$(" + r + ").doDblClick(35)'>35</div>" +
	                    "<div align='center' id='" + n + "_36' style='{position: absolute;left: 1;top: 115;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(36)' onDblClick='$$(" + r + ").doDblClick(36)'>36</div>" +
	                    "<div align='center' id='" + n + "_37' style='{position: absolute;left: 20;top: 115;width: 20;height: 16;cursor: pointer;padding-top: 2;}' onMouseDown='$$(" + r + ").doClick(37)' onDblClick='$$(" + r + ").doDblClick(37)'>37</div>" +
	                "</div>";

	    this.setInnerHTML(html, canvas);
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
			var b1 = $( n +"_sLeftTop");
			var b2 = $( n +"_sLeft");
			var b3 = $( n +"_sEdgeLeft");
			var b4 = $( n +"_sBottomLeft");
			var b5 = $( n +"_sRightTop");
			var b6 = $( n +"_sRight");
			var b7 = $( n +"_sEdgeRight");
			var b8 = $( n +"_sBottomRight");
			var b9 = $( n +"_sBottom");		
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4,b5,b6,b7,b8,b9]);
		}
	},
	show: function(){
		window.portalui_datePickerForm.prototype.parent.show.call(this);
	    var dt = new Date();

	    this.todayDay = dt.getDate();
	    this.todayMonth = dt.getMonth() + 1;
	    this.todayYear = dt.getFullYear();
	    
	    this.month = this.selectedMonth;
	    this.year = this.selectedYear;
	    
	    this.rearrange();       
	},
	rearrange: function(){
		try{
		    var dt = new Date(this.year, this.month-1, 1);
		    this.startPos = dt.getDay();

		    if (this.startPos == 0)
		        this.startPos = 7;

		    var obj;
		    var strMonth = dt.getMonth();
		    var n = this.getFullId();

		    i = 1;
		    if (this.month < 10)
		        $(n + "_caption").innerHTML = this.monthName["0" + this.month] + " " + this.year;
		    else
		        $(n + "_caption").innerHTML = this.monthName[this.month] + " " + this.year;

		    while(i < this.startPos)
		    {
		        obj = $(n + "_" + i);
		        obj.innerHTML = "";		
		        obj.style.cursor = "default";
		        obj.style.backgroundColor = "#FFFFFF";
		        i++;
		    }

		    var cont = true;
		    var change = false;

		    while(cont)
		    {
		        obj = $(n + "_" + i);
		        obj.innerHTML = dt.getDate();
		        obj.style.cursor = "pointer";
				obj.style.width = 17;
		        if ((dt.getDate() == this.todayDay) && (this.year == this.todayYear) && (this.month == this.todayMonth))
		        {
		            obj.style.backgroundColor="#b7b50c";
		            change = true;
		        }

		        if ((dt.getDate() == this.selectedDay) && (this.year == this.selectedYear) && (this.month == this.selectedMonth))
		        {
		            obj.style.backgroundColor ="#40abc6";
		            change = true;
		        }

		        if (!change)
		            obj.style.backgroundColor = "";

		        if ((i%7) == 0)
		            obj.style.color = "red";
		        else
		            obj.style.color = "black";

		        dt.setTime(dt.getTime() + 86400000);

		        if (dt.getMonth() != strMonth)
		        {
		            cont = false;
		        }

		        i++;
		        change = false;
		    }

		    this.stopPos = i-1;

		    while (i <= 37)
		    {
		        obj = $(n + "_" + i);
		        obj.innerHTML = "";
		        obj.style.cursor = "default";
		        obj.style.backgroundColor = "";
		        i++;
		    }
		}
		catch (e){
			    alert("[datePicker] :: rearrange: " + e);
		}
	},
	doClick: function(button){	
		try{
			if ((button >= this.startPos) && (button <= this.stopPos)){
				var day = button - this.startPos + 1;        
				this.onSelect.call(this, this.year, this.month, day);
				this.setSelectedDate(this.year, this.month, day);
			}
			this.close();
		}catch(e){
			systemAPI.alert(this+"$doClick()",e);
		}
	},
	doDblClick: function(button){	
		try{		
			this.close();
						
		}catch(e){
			systemAPI.alert(this+"$doDblClick()",e);
		}
	},
	doButtonMouseOver: function(event, id){
	    var htmlObj = $(this.getFullId() + "_" + id);
	    htmlObj.style.backgroundPosition = "center left";
	},
	doButtonMouseDown: function(event, id){
	    var htmlObj = $(this.getFullId() + "_" + id);
	    htmlObj.style.backgroundPosition = "bottom left";
	},
	doButtonMouseOut: function(event, id){
	    var htmlObj = $(this.getFullId() + "_" + id);
	    htmlObj.style.backgroundPosition = "top left";
	},
	doButtonClick: function(event, button){
	    if (button == "prev"){
	        if (this.month > 1)
	            this.setMonth(this.month-1);
	        else{
	            this.setMonth(12);
	            this.setYear(this.year - 1);
	        }
	    }
	    else{
	        if (this.month < 12)
	            this.setMonth(this.month + 1);
	        else{
	            this.setMonth(1);
	            this.setYear(this.year + 1);
	        }
	    }
	},
	doDeactivate: function(){
		window.portalui_datePickerForm.prototype.parent.doDeactivate.call(this);
	},
	setDate: function(yy, mm, dd){
	    this.year = yy;
	    this.month = mm;
	    this.day = dd;
	},
	setSelectedDate: function(year, month, day){
	    this.selectedDay = day;
	    this.selectedMonth = month;
	    this.selectedYear = year;
		this.year = year;
	    this.month = month;
	    this.day = day;
		this.rearrange();
	},
	getMonth: function(){
		return this.month;
	},
	setMonth: function(data){
	    this.month = data;
	    this.rearrange();
	},
	getYear: function(){
		return this.year;
	},
	setYear: function(data){
	    this.year = data;
	    this.rearrange();
	}
});
