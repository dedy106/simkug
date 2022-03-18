//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************

window.portalui_tinymceCtrl = function(owner, options){
	window.portalui_tinymceCtrl.prototype.parent.constructor.call(this, owner, options);
	try{
		this.className = "portalui_tinymceCtrl";
		this.filePath = "";	
		this.hint = "image";        
		this.showHint = false;
		this.autoView = false;	
		this.viewType = 0;	
		this.readOnly = false;
		if (options !== undefined){
			this.updateByOptions(options);		
			if (options.readOnly != undefined) this.readOnly = options.readOnly;
		}
		script =  "try {classExist = (tinyMCE != undefined); } catch (e) {classExist = false;}";				   						   
		eval(script);					
		if (!classExist) addJs("office/js/tiny_mce_src.js",curvyBrowser.isIE ? new Function("$$("+this.resourceId+").onLoad(event)") : new Function("event","$$("+this.resourceId+").onLoad(event)"));
		else this.init();
	}catch(e){
		alert(e);
	}
};
window.portalui_tinymceCtrl.extend(window.portalui_control);
window.tinymceCtrl = window.portalui_tinymceCtrl;
window.portalui_tinymceCtrl.implement({
	onLoad: function(e){		
		try{			
			window.tinymceloaded = true;
			this.init();						
			//getTinyMCECtrl(system.getActiveApplication()._mainForm);
		}catch(e){
			alert(e);
		}
	},
	init: function(){
		try{			
			if (tinyMCE !== undefined)
			{										
				tinyMCE.init({
						mode:"exact", 
						elements:this.getFullId()+"_container",						
						theme : "advanced",
						skin : "o2k7",
						readonly: this.readOnly ? 1 : 0,						
						oninit: curvyBrowser.isIE ? new Function("$$("+this.resourceId+").doEditorReady(event)") : new Function("event","$$("+this.resourceId+").doEditorReady(event)"),
						plugins : "style,table,save,advhr,advimage,advlink,iespell,inlinepopups,insertdatetime,preview,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave",

						// Theme options
						theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect,|,print",
						theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
						theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,advhr,|,ltr,rtl",
						//theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft",
						theme_advanced_toolbar_location : "top",
						theme_advanced_toolbar_align : "left",
						theme_advanced_statusbar_location : "bottom",
						theme_advanced_resizing : false,

						// Example content CSS (should be your site CSS)
						content_css : "css/content.css",

						// Drop lists for link/image/media/template dialogs
						//template_external_list_url : "lists/template_list.js",
						//external_link_list_url : "lists/link_list.js",
						//external_image_list_url : "lists/image_list.js",
						//media_external_list_url : "lists/media_list.js",
						readonly: this.readOnly ? 1 : 0,
						// Style formats
						style_formats : [
							{title : 'Bold text', inline : 'b'},
							{title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
							{title : 'Red header', block : 'h1', styles : {color : '#ff0000'}},
							{title : 'Example 1', inline : 'span', classes : 'example1'},
							{title : 'Example 2', inline : 'span', classes : 'example2'},
							{title : 'Table styles'},
							{title : 'Table row 1', selector : 'tr', classes : 'tablerow1'}
						],

						formats : {
							alignleft : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
							aligncenter : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
							alignright : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
							alignfull : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
							bold : {inline : 'span', 'classes' : 'bold'},
							italic : {inline : 'span', 'classes' : 'italic'},
							underline : {inline : 'span', 'classes' : 'underline', exact : true},
							strikethrough : {inline : 'del'}
						}
						
				});								
			}
		}catch(e){
			alert(e);
		}
	},
	doEditorReady: function(e){		
		//this.setReadOnly(this.readOnly);
	},
	doDraw: function(canvas){		
		canvas.style.background = "#ff9900";
		var html = "<div id ='"+ this.getFullId() +"_container' name='"+ this.getFullId() +"_container' style='position:absolute;left:0;top:0;width:100%;height:100%;' "+					
					"></div>";
		this.setInnerHTML(html, canvas);
		this.cnv = $(this.getFullId() +"_container");
	},	
	getCode: function(){
		return tinyMCE.get(this.getFullId() +"_container").getContent();
	},
	setCode: function(code){
		tinyMCE.get(this.getFullId() +"_container").setContent(code);
	},
	setReadOnly: function(readonly){
		try{
			this.readOnly = readonly;
			var t = tinyMCE.get(this.getFullId() +"_container");
			var d = t.getDoc();
			if (!t.isIE) {
				try {
					if (!readonly){						
						d.designMode = 'On';
					}else {
						d.designMode = 'Off';
					}
					b = t.getBody();
					if (b.contentEditable){						
						DOM.hide(b);
						if (!readonly)
							b.contentEditable = true;
						else b.contentEditable = false;
						DOM.show(b);
					}
				} catch (ex) {
					// Will fail on Gecko if the editor is placed in an hidden container element
					// The design mode will be set ones the editor is focused
				}
			}

			// IE needs to use contentEditable or it will display non secure items for HTTPS
			if (t.isIE) {
				// It will not steal focus if we hide it while setting contentEditable
				b = t.getBody();
				DOM.hide(b);

				if (!readonly)
					b.contentEditable = true;
				else b.contentEditable = false;

				DOM.show(b);
			}
		}catch(e){
			alert(e);
		}
	}
});
