window.app_saku2_transaksi_kopeg_sju_fQuoViewer = function(owner, options)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fQuoViewer.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_saku2_transaksi_kopeg_sju_fQuoViewer";
		this.itemsValue = new arrayList();
		
		uses("saiCBBL;saiEdit");
		this.ctrlViewer = new control(this, {bound:[0,0,this.width, this.height - 25]});
		this.p1 = new panel(this,{bound:[0, this.height - 25, this.width, 25]});
		this.bSubmit = new button(this.p1, {bound:[10,1,80,20], caption:"Ok", click:[this,"doClick"]});
		this.ctrlViewer.addStyle("background:#fff");
		this.setTabChildIndex();
		try {		
			this.standarLib = new util_standar();
			this.onSubmit = new eventHandler();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fQuoViewer.extend(window.frame);
window.app_saku2_transaksi_kopeg_sju_fQuoViewer.implement({
	doClick: function(sender){
	    this.hide();
    	        
    	
	},
	
	doModalResult: function(event, modalResult){
		//alert(event);
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
				break;
			case "submit" :	
				this.simpan();
				break;				
			
		}
	},
	setHeight: function(data) {
		window.app_saku2_transaksi_kopeg_sju_fQuoViewer.prototype.parent.setHeight.call(this, data);
		if (this.p1){
			this.p1.setTop(data - 25);
		}
	},
	setWidth: function(data) {
		window.app_saku2_transaksi_kopeg_sju_fQuoViewer.prototype.parent.setWidth.call(this, data);
		if (this.p1){
			this.mDesk.setWidth(data - 6);
			this.p1.setWidth(data);
			this.bCancel.setLeft(data - 90);
		}
	}
});
