//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_flashObj = function(owner, options){	
	try
	{
		window.app_builder_component_controls_system.prototype.parent.constructor.call(this,owner, options);
		this.className = "portalui_flashObj";							
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.flashFile !== undefined) this.loadFlash(options.flashFile);
		}
		this.addProperty({className:this.className,flashFile:this.flashFile});	
		this.addEvent({});
	}catch(e){
	}
};
window.app_builder_component_controls_flashObj.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_flashObj.implement({
	doDraw: function(canvas){
		var html = "<div id='"+this.getFullId() +"_swf' stlye='width:100%;height:100%'></div>";					
		canvas.innerHTML = html;
	},
	loadFlash : function(flash){
		try{
			this.flashFile = flash;
			this.setProperty("fashFile",flash)
			var obj = $(this.getFullId() +"_swf");						
			swfobject.embedSWF(flash, this.getFullId()+"_swf", "100%", "100%", "9.0.0", "expressInstall.swf",{},{wmode:"transparent",quality:"high"},{id:this.getFullId()+"_swf",name:this.getFullId()+"_swf"});								
		}catch(e){
			alert(e);
		}
	},
	setFlashFile : function(flash){
		try{
			this.flashFile = flash;
			this.setProperty("fashFile",flash)
			var obj = $(this.getFullId() +"_swf");						
			swfobject.embedSWF(flash, this.getFullId()+"_swf", "100%", "100%", "9.0.0", "expressInstall.swf",{},{wmode:"transparent",quality:"high"},{id:this.getFullId()+"_swf",name:this.getFullId()+"_swf"});								
		}catch(e){
			alert(e);
		}
	}
});
