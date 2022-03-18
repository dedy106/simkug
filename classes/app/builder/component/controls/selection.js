//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_selection = function(owner, options){
    if (owner){
		this.color      = "#ffffff";		
		this.fontColor  = "#000000";		
		this.isFocused = false;
		window.app_builder_component_controls_selection.prototype.parent.constructor.call(this, owner, options);
		this.className = "portalui_selection";
		this.setWidth(80);
		window.app_builder_component_controls_selection.prototype.parent.setHeight.call(this, 20);
		this.wantTab = false;
		this.tabStop = true;		
		this.text = "selection";
		this.onChange = new portalui_eventHandler();
		this.multiple = "";
		this.size = 10;
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.items !== undefined) this.setItems(options.items);													
			if (options.multiple !== undefined) this.setMultiple(options.multiple);
			if (options.size !== undefined) this.setSize(options.size);
		}
		this.addProperty({className:this.className,color:this.color, fontColor:this.fontColor,  text:this.text, multiple:"", size:this.size});	
		this.addEvent({change:""});
    }
};
window.app_builder_component_controls_selection.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_selection.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    canvas.style.background = " ";
	    canvas.style.overflow = "hidden";
		var html = "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'></div>";
	    this.setInnerHTML(html, canvas);
	},
	doChange: function(sender){
		this.onChange.call(this);
	},
	setHeight: function(data){
		window.app_builder_component_controls_selection.prototype.parent.setHeight.call(this, data);
		var nd = $(this.getFullId()+"_selection");	
		if (nd != undefined)
			nd.style.height = data;
	},
	doLostFocus: function(){
	    if (this.activeChar != undefined)
	        this.activeChar.style.background = "";
	    this.isFocused = false;
	    this.onDefocus.call(this);
	},
	doSetFocus: function(){	
	    var nd = $(this.getFullId()+"_selection");
		if (nd != undefined)
			nd.focus();
		this.isFocused = true;	
	},
	doFocus: function(){
		this.getForm().setActiveControl(this);
		var input = $(this.getFullId()+"_selection");		
		this.isFocused = true;
	},
	getText: function(){
	 	var nd = $(this.getFullId()+"_selection");	
		this.text ="";
		if (nd != undefined)
		{
			if (nd.selectedIndex > -1)
				this.text = nd.options[nd.selectedIndex].value;		
		}
	    return this.text;	
	},
	getTextAndId: function(){
	 	var nd = $(this.getFullId()+"_selection");	
		var ret = "";
		if (nd != undefined)
		{
			if (nd.selectedIndex > -1)
				ret = nd.options[nd.selectedIndex].value+";"+nd.options[nd.selectedIndex].innerHTML;		
		}
	    return ret;	
	},
	getSelectedTextAndId: function(){ 	
		var nd = $(this.getFullId()+"_selection");	
		var ret = new portalui_arrayMap();
		if (nd != undefined)
		{		
			for (var i in nd.options)		
			{
				if (nd.options[i].selected)
					ret.set(nd.options[i].value,nd.options[i].innerHTML);		
			}
		}
	    return ret;	
	},
	setSelectedItems: function(items){
		var nd = $(this.getFullId()+"_selection");		
		if (nd != undefined)
		{		
			for (var i in nd.options)		
			{
				for (var j in items){					
					if (nd.options[i].value == j)
						nd.options[i].selected = true;				
				}
			}
		}    
	},
	getId: function(){
	 	var nd = $(this.getFullId()+"_selection");	
		var ret = "";
		if (nd != undefined)
		{	
			if (nd.selectedIndex > -1)
				ret = nd.options[nd.selectedIndex].value;				
		}
	    return ret;	
	},
	setText: function(data){
	    this.text = data;
		this.setProperty("text",data);
	    var nd = $(this.getFullId()+"_selection");
		for (var i in nd.options)
		{
			if (nd.options[i].value == data)
			{
				nd.selectedIndex = i;
				return false;
			}
		}
	},
	isWantTab: function(){
		return this.wantTab;
	},
	setWantTab: function(data){
		this.wantTab = data;
	},
	setWidth: function(data){
		var n = this.getFullId();
		var nd = $(n);
		window.app_builder_component_controls_selection.prototype.parent.setWidth.call(this,data); 	
		this.doDraw(nd);	
	},
	eventMouseOut: function(){
		var input = $(this.getFullId()+"_selection");
		if (this.isFocused)
		{
			input.style.background = "#ff9900";
			input.style.color = "#000000";
		}else {
			if (this.readOnly)
			{
				input.style.background = "#aaa5a5";
				input.style.color = "#ffffff";
			}
			else
			{
				input.style.background = "#ff9900";
				input.style.color = "#000000";
			}
		}
	},
	eventMouseOver: function(){
		var input = $(this.getFullId()+"_selection");
		if (this.isFocused)
		{
			input.style.background = "#ff9900";
			input.style.color = "#000000";
		}else {
			input.style.background = "#ffffff";
			input.style.color = "#000000";
		}
	},
	setColor: function(data){
		this.color = data;
		this.setProperty("color",data);
		var selectionObj = $(this.getFullId()+"_selection");
			if(selectionObj != undefined)
			{
	        selectionObj.style.background = data;		  
	    }      
	},
	getColor: function(){
		return this.color;
	},
	setItems: function(item){
			this.setProperty("items",item);
		  var cnv = $(this.getFullId() + "_frame");
		  if (this.multiple == "")
		  {
			var html = "<select id='"+this.getFullId()+"_selection' value='"+this.text+"' "+
				" onchange='system.getResource("+this.resourceId+").doChange(event)'"+
				"style='{width:"+this.width+"px;height:20px;position:absolute;top:0; "+
				"border:1px solid #058fad;background:"+this.color+";color:"+this.fontColor+";font-size:11;font-family:arial;}' "+		
				">Pilih item";
		  }else 
			var html = "<select id='"+this.getFullId()+"_selection' value='"+this.text+"'  multiple='multiple' size='"+this.size+"' "+
				" onchange='system.getResource("+this.resourceId+").doChange(event)'"+
				"style='{width:"+this.width+"px;position:absolute;top:0; "+
				"border:1px solid #058fad;background:"+this.color+";color:"+this.fontColor+";font-size:11;font-family:arial;}' "+		
				">Pilih item";
		  for (var i in item)
		  {
		     html +="<option value='"+i+"'>"+item[i]+"</option>" ;
		  }  
		  html += "</select>";
		  cnv.innerHTML = this.remBracket(html);
	},
	setItemsWithId: function(item){
		  var cnv = $(this.getFullId() + "_frame");
		  if (this.multiple == "")
		  {
			var html = "<select id='"+this.getFullId()+"_selection' value='Pilih item' "+
				" onchange='system.getResource("+this.resourceId+").doChange(event)'"+
				"style='{width:"+this.width+"px;height:20px;position:absolute;top:0; "+
				"border:1px solid #058fad;background:"+this.color+";color:"+this.fontColor+";font-size:12;font-family:arial;}' "+		
				">Pilih item";
		  } else 
			var html = "<select id='"+this.getFullId()+"_selection' value='Pilih item' multiple='multiple' size='"+this.size+"' "+
				" onchange='system.getResource("+this.resourceId+").doChange(event)'"+
				"style='{width:"+this.width+"px;position:absolute;top:0; "+
				"border:1px solid #058fad;background:"+this.color+";color:"+this.fontColor+";font-size:12;font-family:arial;}' "+		
				">Pilih item";
		  for (var i in item)
		  {
		     html +="<option value='"+i+"'>"+item[i]+"</option>" ;
		  }
		  html += "</select>";
		  cnv.innerHTML = this.remBracket(html);
	},
	setMultiple: function(data){
		this.multiple = data;	
		this.setProperty("multiple",data);
	},
	setSize: function(data){
		this.size = data;	
		this.setProperty("size",data);
	},
	setUnselect: function(){
		var nd = $(this.getFullId()+"_selection");	
		if (nd != undefined)
			nd.selectedIndex = -1;
	}
});