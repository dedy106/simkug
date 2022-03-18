//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_photoViewer = function(owner, options, requester){
    if (owner){		
        window.portalui_photoViewer.prototype.parent.constructor.call(this,owner,options);
        if (options !== undefined) this.updateByOptions(options);        
        this.requester = requester;
        this.closeToHide = false;
        uses("util_dbUtility");
        this.dbLib = new util_dbUtility();
        this.dbLib.addListener(this);
        this.ready = false;
        this.countJs = 0;
	    addJs("classes/addon/utilities.js",this.checkLoad);
	    addJs("classes/addon/canvasElement.js",this.checkLoad);
	    addJs("classes/addon/canvasImg.js",this.checkLoad);
	    addJs("classes/addon/canvas.text.js",this.checkLoad);
    }
};
window.portalui_photoViewer.extend(window.portalui_commonForm);
window.photoViewer = window.portalui_photoViewer;
window.portalui_photoViewer.implement({	    
    init: function(imgList, title){
        try{    
            this.imgList = imgList;
            this.titleList = title;
            if (!this.ready) return;
            this.errorDrawing = false;
            var html = "<div style='background:#555555;opacity:0.5;moz-opacity:0.5;filter:alpha(opacity=50);width:100%;height:100%'></div>"+
                        "<canvas style='width: 100%; height: 100%;' height='100%' width='100%' id='canvas-background'></canvas>"+
				        "<canvas style='width: 100%; height: 100%;' height='100%' width='100%' id='canvas-container'></canvas>"+
				        "<canvas style='width: 100%; height: 100%;' height='100%' width='100%' id='canvasimg' ></canvas>";			
    		for (var i=0; i < imgList.length;i++){			
				html += "<img id='"+this.getFullId()+"_img"+(i+1)+"' style='display:none' class='canvas-img' src='"+imgList[i]+"'/>";							
   			}						    		
    	    this.getClientCanvas().innerHTML = html;	    	
    		var YD = YAHOO.util.Dom;
    		var YE = YAHOO.util.Event;
    		this.setWidth(YD.getViewportWidth());
    		this.setHeight(YD.getViewportHeight());
    		var canvas1;
    		var img = [];		
    		canvas1 = new Canvas.Element();
            canvas1.init("canvasimg",  { width: YD.getViewportWidth(), height: YD.getViewportHeight()}, "system.getResource("+this.resourceId+").imgClick");					
    		for (var i=0; i < imgList.length;i++){
				img[img.length] = new Canvas.Img(this.getFullId()+'_img'+(i+1), {});    		    		
            }
    		// @param array of images ToDo: individual images
    		//canvas1.setCanvasBackground(img[3]);
    		for (var i=0; i < img.length;i++) canvas1.addImage(img[i],title[i]); 
    		for (var i = 0, l = canvas1._aImages.length; i < l; i += 1) {
    			canvas1._aImages[i].setPolaroidVisibility(true);
    		}
    		canvas1.renderAll();
    		this.errorDrawing = false;
    	}catch(e){
    		//alert("draw canvas : "+e);
    		this.errorDrawing = true;
    		systemAPI.alert(e);
    	}
    },
    imgClick: function(src,dbl){
        
    },
    doRequestReady: function(sender, methodName, result){
       if (sender == this.dbLib){          
          eval("result = "+result+";");
          if (typeof result != "string"){                
              
          }else systemAPI.alert(result);
       } 
        
    },
    checkLoad: function(event){
        this.countJs++;
        if (this.countJs == 4){
            this.ready = true;
            if (this.imgList !== undefined) this.init(this.imgList, this.titleList);
        }
    }
});
