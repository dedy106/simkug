//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_pageControl = function(owner,options){
	window.app_builder_component_controls_pageControl.prototype.parent.constructor.call(this, owner,options);
	this.className = "portalui_pageControl";
	this.activePage = undefined;
	this.owner = owner;	
	this.onPageChange = new portalui_eventHandler();
	this.addProperty({className:this.className});	
	this.addEvent({pageChange:""});
};
window.app_builder_component_controls_pageControl.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_pageControl.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.background = "";
		var html = "<div id='"+n+"_lHeader' style='{position:absolute; left: 0;top: 0; width: 20px; height:20px;}'> </div>"+
					"<div id='"+n+"_header' style='{position:absolute; left: 0;top: 0; width: 100%; height:20px;background:"+window.system.color+";}'></div>"+
					"<div id='"+n+"_rHeader' style='{position:absolute; left: 0;top: 0; width: 20px; height:20px;}'> </div>"+
					"<div id='"+n+"form' style='{position:absolute; left: 0;top: 20; width: 100%; height:100%;}' ></div>";
					
		this.setInnerHTML(html, canvas);
	},
	addChild: function(child){
		if (child instanceof app_builder_component_controls_childPage){
	        window.app_builder_component_controls_pageControl.prototype.parent.addChild.call(this, child);        
	        child.onChange.set(this, "pageChange");
	        this.addPage(child);
	        if (this.activePage == undefined)
	            this.setActivePage(child);
			else this.deActivedPage(child);
	    }
	},
	addPage: function(child){
		var left = 0;
	    var n = this.getFullId();

	    var node = $(n + "_header");
	    var childNode = node.firstChild;
	    
	    while ((childNode != undefined) && (childNode != ""))
	    {
	        left += parseInt(childNode.style.width, 10) - 14;
	        childNode = childNode.nextSibling;
	    }

	    n += "_" + child.getResourceId();;
	    var imageAddress ="url(images/themes/bheader.png)";

	    var html =  "<div id='" + n + "' style='{position: absolute;top: 0;height: 20;left:" + left + ";width: 86;}' " +
	                        "onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event, " + child.getResourceId() + ");' " +
	                        "onMouseOut='window.system.getResource(" + this.resourceId + ").eventMouseOut(event, " + child.getResourceId() + ");' " +
	                        "onMouseDown='window.system.getResource(" + this.resourceId + ").eventMouseDown(event, " + child.getResourceId() + ");' " +
	                        ">" +
						"<div id='"+n+"_lbtn' style='{position: absolute;width: 20px; height: 20px;left: 10;top: 0;background:url(image/themes/"+system.getThemes()+"/lheader.png) no-repeat top left;}'></div>"+
						"<div id='"+n+"_btn' style='{position: absolute;width: 64px; height: 20px;left: 30px;top: 0;background: url(image/themes/"+system.getThemes()+"/bheader.png) repeat-x top center;}'></div>"+
						"<div id='"+n+"_rbtn' style='{position: absolute;width: 2px; height: 20px;left: 94;top: 0;background: url(image/themes/"+system.getThemes()+"/rheader.png) no-repeat top right;}'></div>"+
	                    "<div id='" + n + "_caption' style='{position: absolute;width: 66px; height: 20px;left: 30;top: 0;font-family: Arial;font-size: 8pt;text-align: center;cursor: pointer; overflow: hidden;color:#ffffff}'>" + child.getCaption() + "</div>" +
	                "</div>";

	    node.innerHTML += this.remBracket(html);	    
	},
	delPage: function(child){
		if (child == undefined) child = system.getResource(this.activePage);
		var left = 0;
	    var n = this.getFullId();	
	    var node = $(n + "_header");    
	    n += "_" + child.getResourceId();;
		var childHeader = $(n);
		node.removeChild(childHeader);
		
		var childNode = node.firstChild;       	
		while ((childNode != undefined) && (childNode != ""))
	    {
	        childNode.style.left = left;
			left += parseInt(childNode.style.width, 10) - 14;
	        childNode = childNode.nextSibling;
	    }
		this.deActivedPage(child);
		this.childs.del(child.resourceId);
		child.free();
		this.activePage = undefined;
		var tmp;
		for (var i in this.childs.objList){
			tmp = i;
			break;
		}
		if 	(tmp != undefined) {
			child = system.getResource(tmp);
			this.setActivePage(child);
		}
	},
	setActivePage: function(child){
	    if (this.activePage != child.getResourceId())
	    {
	        var node = undefined;
	        var n =  undefined;
	        
	        var activePage = window.system.getResource(this.activePage);

	        if (activePage instanceof app_builder_component_controls_childPage)
	        {
	            this.deActivedPage(activePage);
	        }

	        this.activePage = child.getResourceId();

	        activePage = window.system.getResource(this.activePage);

	        if (activePage instanceof app_builder_component_controls_childPage)
	        {
	            n = this.getFullId() + "_" + activePage.getResourceId();

				 node = $(n+"_lbtn");

	            if (node != undefined)
	                node.style.background = "url(image/themes/"+system.getThemes()+"/lheader.png) no-repeat top left ";
	            
				node = $(n+"_btn");

	            if (node != undefined)
	                node.style.background = "url(image/themes/"+system.getThemes()+"/bheader.png) repeat-x top left ";
				node = $(n+"_rbtn");

	            if (node != undefined)
	                node.style.background = "url(image/themes/"+system.getThemes()+"/rheader.png) no-repeat top right ";

	            node = $(n);
				var zIndex = this.getNextZIndex();
				node.style.zIndex = zIndex;

	            if (node != undefined)
	            {
	               // node.style.background = "url(images/themes/styledTabSelect.png) top left no-repeat";
	              //  node.style.height = 64;
	            }
	            
	            node = $(n + "_caption");

	            if (node != undefined)
	                node.style.top = 2;

	            activePage.setVisible(true);
	        }
			this.onPageChange.call(this,activePage);
	    }
	},
	pageChange: function(sender, field){
	    if (sender instanceof app_builder_component_controls_childPage)
	    {
	        switch (field)
	        {
	            case "caption" :
	                            var n = this.getFullId() + "_" + sender.getResourceId();
	                           
	                            node = $(n + "_caption");

	                            if (node != undefined)
	                                node.innerHTML = sender.getCaption();  
	                            this.rearrangeHeader();    
	                            break;
	            case "image" :
	                            var n = this.getFullId() + "_" + sender.getResourceId();

	                            node = $(n + "_image");

	                            if (node != undefined)
	                            {
	                                var imageAddress = sender.getImage();

	                                node.style.background = "url(" + imageAddress + ") top center no-repeat";
	                            }
	                            break;
	        }
	    }
	},
	eventMouseOver: function(event, childId){
	    if (childId != this.activePage){
	        var child = window.system.getResource(childId);

	        if (child instanceof app_builder_component_controls_childPage)
	        {
	            var n = this.getFullId() + "_" + child.getResourceId();
	           
	            node = $(n);

	            //if (node != undefined)
	              //  node.style.background = "url(image/themes/styledTabOver.png) top left repeat-x";
	        }
	    }
	},
	eventMouseOut: function(event, childId){
	    if (childId != this.activePage)
	    {
	        var child = window.system.getResource(childId);

	        if (child instanceof app_builder_component_controls_childPage)
	        {
	            var n = this.getFullId() + "_" + child.getResourceId();
	           

	            node = $(n);

	            if (node != undefined)
	                node.style.background = "";
	        }
	    }
	},
	eventMouseDown: function(event, childId){
	    if (childId != this.activePage)
	    {
	        var child = window.system.getResource(childId);

	        if (child instanceof app_builder_component_controls_childPage)
	        {
	           this.setActivePage(child);
			       this.owner.setActiveControl(this);
	        }
	    }
	},
	deActivedPage: function(activePage){
		n = this.getFullId() + "_" + activePage.getResourceId();
		node = $(n+"_lbtn");
		if (node != undefined)
			node.style.background = "url(image/themes/"+system.getThemes()+"/lheaderDeact.png) no-repeat top left ";		
		node = $(n+"_btn");
		if (node != undefined)
			node.style.background = "url(image/themes/"+system.getThemes()+"/bheaderDeact.png) repeat-x top left ";
		node = $(n+"_rbtn");
		if (node != undefined)
			node.style.background = "url(image/themes/"+system.getThemes()+"/rheaderDeact.png) no-repeat top right ";			
		node = $(n + "_caption");
		if (node != undefined)
			node.style.top = 2;
		activePage.setVisible(false);
	},
	setBGColor: function(color){
		var cnv = $(this.getFullId() + "_header");
		if (cnv != undefined)
			cnv.style.background = color;
	},
	doKeyDown: function(keyCode,buttonState){
		var page = window.system.getResource(this.activePage);
		if (page instanceof app_builder_component_controls_childPage)
			page.doKeyDown(keyCode, buttonState);
	},
	rearrangeHeader: function(){
	    var left = 0;
	    var n = this.getFullId();
	    try
	    {
	      var lengthCap = 0;
	      var child = undefined;
	      var cnv = undefined;       
	      for (var i in this.childs.objList)
	      {
	         child = system.getResource(this.childs.objList[i]);
	         lengthCap = child.getCaption().length * 6;
	         n = this.getFullId() + "_" + child.getResourceId();
	         cnv = $(n);
	         cnv.style.left = left;                  
	         if (lengthCap > 66)
	         {
	            cnv.style.width = 86 + (lengthCap - 66);            
	            cnv = $(n+"_btn");
	            cnv.style.width = lengthCap - 2;
	            cnv = $(n+"_rbtn");
	            cnv.style.left = lengthCap + 28;
	            cnv = $(n+"_caption");
	            cnv.style.width = lengthCap;
	            left += parseInt(lengthCap, 10) + 5;
	         }else left += parseInt(cnv.style.width, 10) - 14;
	      }            
	    }catch(e){
	      alert(e);
	    }
	}
});

