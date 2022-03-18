//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_clipboard = function()
{
    window.portalui_clipboard.prototype.parent.constructor.call(this);
    this.className = "portalui_clipboard";   
    if (systemAPI.browser.msie){
		this.clipboardObj = window.clipboardData;
	}
};
window.portalui_clipboard.extend(window.Function);
window.clipboard = window.portalui_clipboard;
window.portalui_clipboard.prototype.toString = function(){
	return "portalui_clipboard([])";
};
window.portalui_clipboard.implement({			
	setData: function(data){
		if (window.clipboardData){ 
			// IE 
			window.clipboardData.setData("Text", mytext); 
			// Netscape 
		}else if (window.netscape) { 
			netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect'); 
			var clip = components.classes['...@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIC lipboard); 
		    if (!clip) return; 		   
		    var trans = Components.classes['...@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.n sITransferable); 
			if (!trans) return; 
			trans.addDataFlavor('text/unicode'); 
		    var str = new Object(); 
		    var len = new Object(); 
		    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Compone nts.interfaces.nsISupportsString); 
		    var copytext=mytext; 
		    str.data=copytext; 
		    trans.setTransferData("text/unicode",str,copytext.length*2); 
		    var clipid=Components.interfaces.nsIClipboard; 
		    if (!clip) return false; 
		    clip.setData(trans,null,clipid.kGlobalClipboard); 
	    } 		
	},
	getData: function(){		
		if (systemAPI.browser.msie){
			return this.clipboardObj.getData("Text");
		}else {
			try {
				if (netscape.security.PrivilegeManager.enablePrivilege) {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				} else {
					return "error";
				}
			} catch (ex) {
				alert(ex);
				return "error";
			}
		 
			var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
			if (!clip) return false;
		 
			var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
			if (!trans) return false;
			trans.addDataFlavor("text/unicode");
		 
			clip.getData(trans, clip.kGlobalClipboard);
		 
			var str       = new Object();
			var strLength = new Object();
			var pastetext = "";
		 
			trans.getTransferData("text/unicode", str, strLength);
			if (str) str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
			if (str) pastetext = str.data.substring(0, strLength.value / 2);				
			return pastetext;
		}
	}
});
