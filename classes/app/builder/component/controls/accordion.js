//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_accordion = function(owner, options){
	window.app_builder_component_controls_accordion.prototype.parent.constructor.call(this,owner, options);	
	this.className = "portalui_accordion";
	this.width = 300;
	this.height = 130;		
	this.items = [];
	this.page = 0;
};
window.app_builder_component_controls_accordion.extend(window.app_builder_component_controls_control);