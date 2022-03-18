//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_feed = function(owner,options){
    if (owner)
    {

		this.withImage = false;
		this.color = system.getConfig("form.button.color");;//"#57A9FF";//62b4c3 "#f6b354";
		this.borderColor =system.getConfig("form.button.color");//417983"#d98815";
		window.portalui_feed.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_feed";	
		this.owner = owner;				
        this.setWidth(73);
        this.setHeight(20);	
        this.onClick = new portalui_eventHandler();
        this.onIconClick = new portalui_eventHandler();
		this.tabStop = true;
		this.itemWidth = 300;
		this.itemHeight = 150;
		this.url = "";
		this.items = new arrayMap();
		if (options !== undefined){				
			this.updateByOptions(options);
			if (options.color) this.setColor(options.color);				
			if (options.borderColor) this.setBorderColor(options.borderColor);
		}

    }
};
window.portalui_feed.extend(window.portalui_control);
window.feed = window.portalui_feed;
//---------------------------- Function ----------------------------------------
window.portalui_feed.implement({
	doDraw: function(canvas){
		try{	    
			eventOn(canvas,"mouseover","$$$(" + this.resourceId + ").eventMouseOver(event);");
			eventOn(canvas,"mousemove","$$$(" + this.resourceId + ").eventMouseMove(event);");
			eventOn(canvas,"mouseout","$$$(" + this.resourceId + ").eventMouseOut(event);");
			this.canvas = canvas;
			
		}catch(e){
			systemAPI.alert(this+"$doDraw()",e);
		}
	},
	eventMouseOver: function(event){
	   
	},
	eventMouseOut: function(event){	    
	    
	},
	eventMouseDown: function(event){
	
	},
	setColor: function(data){
		
	},
	setBorderColor: function(data){
		
	},
	eventMouseClick: function(event){		
	    this.onClick.call(this);
	},
	doKeyDown: function(charCode, buttonState, keyCode){				
		
	},
	setHeight: function(data){	
		try{
            window.portalui_feed.prototype.parent.setHeight.call(this, data);
		}catch(e){
		  systemAPI.alert(this+"$setHeight("+this.name+")",e);
        }            
	},
	eventMouseMove: function(event){
		if (this.showHint)
			window.system.showHint(event.clientX, event.clientY, this.hint,true);
	},
	
	doRequestReady: function(sender, methodName, result, errorCode, xhr){
		try{
			result = JSON.parse(result);
			this.nodeNotifikasi.innerHTML = result.message;
		}catch(e){
			error_log(e);
		}

	},
	setUrl : function(url){
		this.url = url;
	},
	itemClick: function(event, item){
		this.onClick.call(this, item,this.items.get(item).index ); 
	},
	iconClick: function(event, item){
		this.onIconClick.call(this, item);
	},
	addItem: function(item){
		this.items.set(item.id, item);
		var node = document.createElement("div");
		node.style.cssText= "position:absolute;left:0; top:0; width:"+this.itemWidth+";height:"+this.itemHeight+";color:#fff;background:"+item.color;
		
		var content = item.content;

		if (typeof content == "string"){
			item.index = 0;
			node.innerHTML = "<div id='"+this.getFullId() +"_"+item.id+"_content' style='cursor:pointer;font-size:14;position:absolute;left:5;top:30;height:"+(this.itemHeight - 30).toString()+"px;width:100%;'>"+item.content+"</div>"+
						 "<div style='position:absolute;left:0;top:0;height:30px;width:100%;background:"+item.color+";color:rgba(255,255,255,0.5)'><span style='position:absolute;left:20;top:7;font-size:18;'>"+item.caption+"</span></div>"+
						 (item.icon1 === undefined ? "" : "<img id='"+this.getFullId() +"_"+item.id+"_icon1' src='"+item.icon1+"' style='position:absolute;left:"+(this.itemWidth - 30).toString()+";top:5;height:20px;width:20px;' />")+
						(item.icon2 === undefined ? "" :"<img id='"+this.getFullId() +"_"+item.id+"_icon2' src='"+item.icon2+"' style='position:absolute;left:"+(this.itemWidth - 60).toString()+";top:5;height:20px;width:20px;' />");
		
		}else {
			item.index = 0;
			node.innerHTML = "<div id='"+this.getFullId() +"_"+item.id+"_content' style='cursor:pointer;font-size:14;position:absolute;left:5;top:30;height:"+(this.itemHeight - 30).toString()+"px;width:100%;'>"+item.content[0]+"</div>"+
						 "<div style='position:absolute;left:0;top:0;height:30px;width:100%;background:"+item.color+";color:rgba(255,255,255,0.5)'><span style='position:absolute;left:20;top:7;font-size:18;'>"+item.caption+"</span></div>"+
						 (item.icon1 === undefined ? "" : "<img id='"+this.getFullId() +"_"+item.id+"_icon1' src='"+item.icon1+"' style='position:absolute;left:"+(this.itemWidth - 30).toString()+";top:5;height:20px;width:20px;' />")+
						(item.icon2 === undefined ? "" :"<img id='"+this.getFullId() +"_"+item.id+"_icon2' src='"+item.icon2+"' style='position:absolute;left:"+(this.itemWidth - 60).toString()+";top:5;height:20px;width:20px;' />");
		}
		node.id = this.getFullId() +"_"+item.id;
		this.canvas.appendChild(node);
		item.container = $(this.getFullId() +"_"+item.id+"_content");
		if (item.icon1){
			eventOn($(this.getFullId() +"_"+item.id+"_icon1"),"click","$$(" + this.resourceId + ").iconClick(event,'"+item.id+"');");
		}
		eventOn(item.container,"click","$$(" + this.resourceId + ").itemClick(event,'"+item.id+"','"+item.index+"');");
		this.rearrange();
		if (item.animated){
			if (item.interval != 0){
				item.timer = new timer(this);
				item.timer.setContext(item);
				item.timer.setInterval(item.interval);
				item.timer.onTimer.set(this,"doTimer");
				item.timer.start();
			}
		}
	},
	getItem: function(id){
		return this.items.get(id);
	},
	updateItemContent: function(id){
		var item = this.items.get(id);
		var content = item.content[0];
		item.container.innerHTML = content; 
	},
	updateNotifikasi: function(content){
		this.nodeNotifikasi.innerHTML = content;
	},
	doTimer: function(sender, item){
		try{
			var top = parseFloat(item.container.style.top);
			if (top + this.itemHeight - 25< this.itemHeight){
				if (typeof item.content != "string"){
					if (item.index < item.content.length-1 ){
						item.index++;
					}else{
						item.index = 0;
					}
					var content = item.content[item.index];
					item.container.innerHTML = content; 
				}
				top = this.itemHeight;
			}else {
				top--;
				if ( top == 35){
					item.timer.delay(5000);
				}
			}
			item.container.style.top = top;
		}catch(e){
			error_log(e);
		}
	},
	rearrange: function(){
		var index = 0,
			top = 10;
		for (var i in this.items.objList){
			var node = $(this.getFullId() + "_"+i);
			index++;
			node.style.top = top;
			if (index % 2 == 1){
				node.style.left = 10;
			}else {
				node.style.left = 10 + this.itemWidth + 10;
				top += this.itemHeight + 10;
			}
			
		}
	},
	showNotifikasi: function(){
		if (this.nodeNotifikasi === undefined){
			var node = document.createElement("div");
			node.style.cssText= "position:absolute;left:"+(this.itemWidth * 2 + 30).toString()+"; top:10; width:"+(this.width - (this.itemWidth * 2 + 30)).toString()+";height:100%;color:#fff;background:#2099FB";
			node.innerHTML = "<div style='position:absolute;left:0;top:0;height:30px;width:100%;background:#2099FB'><span style='position:absolute;left:20;top:7;font-size:18;color:rgba(255,255,255,0.5)'>NOTIFIKASI</span></div>"+
							 "<div style='position:absolute;left:100%;top:0;height:30px;width:30;'><img  src='icon/sai/info.png'style='position:absolute;left:-50px;top:5;height:20px;width:20px;' /></div>"+
							 "<div id='"+this.getFullId() +"_notifikasi_content'style='position:absolute;left:0;top:30;height:auto;width:100%;background:#2099FB'></div>";
			node.id = this.getFullId() +"_notifikasi";
			this.canvas.appendChild(node);
			this.nodeNotifikasi = $(this.getFullId() +"_notifikasi_content");
			this.notifikasiContainer = node;
		}
	},
	setWidth: function(data){
		window.portalui_feed.prototype.parent.setWidth.call(this,data);
		if (this.nodeNotifikasi){
			this.notifikasiContainer.style.width = data - (this.itemWidth * 2 + 30);
		}
	}
});
