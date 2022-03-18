//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_progressForm = function(owner){
    if (owner){
        window.app_builder_component_controls_progressForm.prototype.parent.constructor.call(this, owner);
		this.className = "portalui_progressForm";		
		
		this.caption = " l o a d i n g ";
		this.incr = 0;
		this.setTop(0);
		uses("portalui_image");
		this.image = new portalui_image(this);
		this.image.setImage("image/loader.gif");
		this.image.setHeight(15);
		this.image.setWidth(210);
		this.image.setTop(2);
		this.image.setLeft(5);
		uses("portalui_label");
		this.lbl = new portalui_label(this);
		this.lbl.setTop(18);
		this.lbl.setWidth(80);
		this.lbl.setLeft((220 / 2) - 40);
		this.lbl.setCaption("l o a d i n g . . . . .");
		this.lbl.setColor("#033969");
		
    }
};
window.app_builder_component_controls_progressForm.extend(window.app_builder_component_controls_panel);
window.app_builder_component_controls_progressForm.implement({
	hide: function(){
		this.setVisible(false);		
	},
	show: function(){
		this.setVisible(true);
		this.bringToFront();
	}
});