//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_pageControl = function(owner,options){
	window.portalui_pageControl.prototype.parent.constructor.call(this, owner,options);
	this.className = "portalui_pageControl";
	this.activePage = undefined;
	this.owner = owner;	
	this.onPageChange = new portalui_eventHandler();
	this.childPage = [];
	this.activePageIndex = -1;
	uses("portalui_childPage");
	
	if (options !== undefined){
		this.updateByOptions(options);
		if (options.color !== undefined) this.setBGColor(options.color);
		if (options.pageChange != undefined) this.onPageChange.set(options.pageChange[0],options.pageChange[1]);
		if (options.childPage !== undefined){						
			for (var i in options.childPage)
				if (typeof options.childPage[i] == "string")
					this.childPage[this.childPage.length] = new portalui_childPage(this,{caption:options.childPage[i]},i);			
		}
	}
};
window.portalui_pageControl.extend(window.portalui_containerControl);
window.pageControl = window.portalui_pageControl;
window.portalui_pageControl.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.background = "";
		var html = "<div id='"+n+"_lHeader' style='{position:absolute; left: 0;top: 0; width: 20px; height:20px;}'> </div>"+
					"<div id='"+n+"_header' style='{position:absolute; left: 0;top: 0; width: 100%; height:20px;background:transparent;}'></div>"+
					"<div id='"+n+"_rHeader' style='{position:absolute; left: 0;top: 0; width: 20px; height:20px;}'> </div>"+
					"<div id='"+n+"form' style='{position:absolute; left: 0;top: 20; width: 100%; height:100%;}' ></div>";
					
		this.setInnerHTML(html, canvas);
	},
	setWidth: function(data){
		window.portalui_pageControl.prototype.parent.setWidth.call(this, data);				
		if (this.getClientCanvas() != undefined) this.getClientCanvas().style.width = data - 2; 	
	},
	setHeight: function(data){
		window.portalui_pageControl.prototype.parent.setHeight.call(this, data);	
		if (this.getClientCanvas() != undefined) this.getClientCanvas().style.height = data - 22; 	
	},
	addChild: function(child){
		if (child instanceof portalui_childPage){
	        window.portalui_pageControl.prototype.parent.addChild.call(this, child);        
	        child.onChange.set(this, "pageChange");
	        this.addPage(child);
	        if (this.activePage == undefined){
    			this.setActivePage(child);
    			this.activePageIndex = 0;
    		}else this.deActivedPage(child);
    		this.rearrangeIndex();
	    }
	},
	addPage: function(child){
		var left = 0;
	    var n = this.getFullId();

	    var node = $(n + "_header");
	    var childNode = node.firstChild;
	    
	    while ((childNode != undefined) && (childNode != ""))
	    {
	        left += parseInt(childNode.style.width, 10) - 24;
	        childNode = childNode.nextSibling;
	    }

	    n += "_" + child.getResourceId();
	    var imageAddress ="url(images/themes/bheader.png)";		
	    var html =  "<div id='" + n + "' style='{position: absolute;top: 0;height: 20;left:" + left + ";width: 86;cursor:pointer}' " +
	                        "onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event, " + child.getResourceId() + ");' " +
	                        "onMouseOut='window.system.getResource(" + this.resourceId + ").eventMouseOut(event, " + child.getResourceId() + ");' " +
	                        "onMouseDown='window.system.getResource(" + this.resourceId + ").eventMouseDown(event, " + child.getResourceId() + ");' " +
	                        ">" +
						//"<div id='"+n+"_lbtn' style='{position: absolute;width: 20px; height: 20px;left: 10;top: 0;background:url(image/themes/"+system.getThemes()+"/pageControlLact.png) no-repeat top left;}'></div>"+
						"<div id='"+n+"_btn' style='{position: absolute;width: 100px; height: 20px;left: 0px;top: 0;background: #8c8c8c;}'></div>"+
						//"<div id='"+n+"_rbtn' style='{position: absolute;width: 4px; height: 20px;left: 94;top: 0;background: url(image/themes/"+system.getThemes()+"/pageControlR.png)0 0 no-repeat ;}'></div>"+
	                    "<div id='" + n + "_caption' style='{white-space: nowrap;position: absolute;width: auto; height: 20px;left: 0;top: 0;font-family: Arial;font-size: 8pt;text-align: center;overflow: hidden;color:#ffffff}'>" + child.getCaption() + "</div>" +
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
			left += parseInt(childNode.style.width, 10) - 10;
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

	        if (activePage instanceof portalui_childPage)
	        {
	            this.deActivedPage(activePage);
	        }

	        this.activePage = child.getResourceId();

	        activePage = window.system.getResource(this.activePage);

	        if (activePage instanceof portalui_childPage)
	        {
	            n = this.getFullId() + "_" + activePage.getResourceId();
				$(n+"_caption").style.color = "#ffffff";
				
				//node = $(n+"_lbtn");
	            //if (node != undefined)
	            //    node.style.background = "url(image/themes/"+system.getThemes()+"/pageControlLact.png) no-repeat top left ";
	            
				node = $(n+"_btn");

	            if (node != undefined)
	                node.style.background = "#19acf5";//"url(image/themes/"+system.getThemes()+"/pageControlMact.png) repeat-x top left ";
				//node = $(n+"_rbtn");
	            //if (node != undefined)
	            //    node.style.background = "url(image/themes/"+system.getThemes()+"/pageControlR.png) 0 0 no-repeat ";

	            node = $(n);
				//var zIndex = this.getNextZIndex();
				node.style.zIndex = 1;//this.childs.getLength()

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
	    if (sender instanceof portalui_childPage)
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

	        if (child instanceof portalui_childPage)
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

	        if (child instanceof portalui_childPage)
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

	        if (child instanceof portalui_childPage)
	        {
				this.setActivePage(child);
			    this.owner.setActiveControl(this);
			    this.rearrangeIndex();
	        }
	    }
	},
	deActivedPage: function(activePage){
		n = this.getFullId() + "_" + activePage.getResourceId();
		//node = $(n+"_lbtn");
		//if (node != undefined)
		//	node.style.background = "url(image/themes/"+system.getThemes()+"/lheaderDeact.png) no-repeat top left ";		
		node = $(n+"_btn");
		if (node != undefined)
			node.style.background = "#8c8c8c";//"url(image/themes/"+system.getThemes()+"/bheaderDeact.png) repeat-x top left ";
		//node = $(n+"_rbtn");
		//if (node != undefined)
		//	node.style.background = "url(image/themes/"+system.getThemes()+"/rheaderDeact.png) no-repeat top right ";			
		node = $(n + "_caption");
		if (node != undefined){
			node.style.top = 2;
			node.style.color = "#ffffff";
		}
		node = $(n);
		if (node != undefined)
			node.style.zIndex = 0;
		activePage.setVisible(false);
	},
	setBGColor: function(color){
		var cnv = $(this.getFullId() + "_header");
		if (cnv != undefined)
			cnv.style.background = color;
	},
	doKeyDown: function(keyCode,buttonState){
		var page = window.system.getResource(this.activePage);
		if (page instanceof portalui_childPage)
			page.doKeyDown(keyCode, buttonState);
	},
	rearrangeIndex: function(){
		var cnv, child,zIndex = this.childs.getLength(); 
		var maxIndex = zIndex;
		//zIndex = 0;
		for (var i in this.childs.objList){						
			child = window.system.getResource(i);
			cnv = $(this.getFullId() + "_" + child.getResourceId());
			if (cnv){
				if (this.childs.objList[i] == this.activePage)
					cnv.style.zIndex = 1;//maxIndex
				else cnv.style.zIndex = 0;//zIndex
				zIndex--;
			}
		}		
	},
	rearrangeHeader: function(){
	    var left = 0;
	    var n = this.getFullId();
	    try
	    {
	      var lengthCap = 0;
	      var child,cnv, first = true;
	      var zIndex = this.childs.getLength();       
	      var maxIndex = zIndex;
	      for (var i in this.childs.objList)
	      {
		  	 //if (!first) left-= 30;
	         child = system.getResource(this.childs.objList[i]);
	         lengthCap = child.getCaption().length;
	         n = this.getFullId() + "_" + child.getResourceId();
	         cnv = $(n);	         
	         //lengthCap = parseFloat($(n+"_caption").offsetWidth);
	         cnv.style.left = left;			                  
	         //if (lengthCap > 66)
	         {
	            cnv.style.width = (lengthCap  * 10 ) + 10;            
	            cnv = $(n+"_btn");
	            cnv.style.width = (lengthCap  * 10 ) + 10;
	            //cnv = $(n+"_rbtn");
	            //cnv.style.left = lengthCap + 50;
	            cnv = $(n+"_caption");
	            cnv.style.left = 20;
	            left += (lengthCap * 10) + 10;
	         }//else left += parseInt(cnv.style.width,10);			 
			 first = false;
	      }            
	    }catch(e){
	      alert(e);
	    }
	}
});
