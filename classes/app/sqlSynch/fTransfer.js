window.app_sqlSynch_fTransfer = function(owner){
	if (owner instanceof portalui_application){
		window.app_sqlSynch_fTransfer.prototype.parent.constructor.call(this,owner);
		this.setWidth(600);
		this.setHeight(400);
		this.centerize();
		this.setCaption("Data Transfer");
		uses("portalui_groupBox;portalui_radioButton");
		this.gSvr = new portalui_saiGrid(this,{bound:[10,10,240,300], colCount:2,colTitle:["T/F","Table"], colWidth:[[0,1],[50,150]],colFormat:[[0],[cfBoolean]]});
		this.gLcl = new portalui_saiGrid(this,{bound:[350,10,240,300], colCount:2,colTitle:["T/F","Table"], colWidth:[[0,1],[50,150]],colFormat:[[0],[cfBoolean]]});
		this.bSvr = new portalui_button(this,{bound:[260,150,80,20],caption:"Ke Local ->"});
		this.bLcl = new portalui_button(this,{bound:[260,180,80,20],caption:"<- Ke Server"});
		this.bOk = new portalui_button(this,{bound:[20,340,80,20],caption:"OK",click:[this,"doClick"]});
		this.gb1 = new portalui_groupBox(this,{bound:[120,315,400,45],caption:"Setting transfer data table tujuan"});
		this.rb1 = new portalui_radioButton(this.gb1,{bound:[10,3,100,20],caption:"Dihapus"});
		this.rb2 = new portalui_radioButton(this.gb1,{bound:[170,3,100,20],caption:"Ditambahkan",selected:true});
	}else systemAPI.alert(owner +" is not application");
};
window.app_sqlSynch_fTransfer.extend(window.portalui_sysForm);
window.app_sqlSynch_fTransfer.implement({
	doClick: function(sender){
		this.close();
	}
});
