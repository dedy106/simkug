window.app_saku2_transaksi_kopeg_sju_fQuoValue = function(owner, options)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fQuoValue.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_saku2_transaksi_kopeg_sju_fQuoValue";
		this.itemsValue = new arrayList();
		
		uses("saiCBBL;saiEdit;tinymceCtrl");
		this.mDesk = new tinymceCtrl(this,{bound:[2,0,this.width - 4,this.height - 25], withForm:false});
		this.p1 = new panel(this,{bound:[0, this.height - 25, this.width, 25]});
		this.bSubmit = new button(this.p1, {bound:[10,1,80,20], caption:"Ok", click:[this,"doClick"]});
		this.bCancel = new button(this.p1, {bound:[this.width - 90,1,80,20], caption:"Cancel", click:[this,"doClick"]});
		
		this.setTabChildIndex();
		try {		
			this.standarLib = new util_standar();
			this.onSubmit = new eventHandler();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fQuoValue.extend(window.frame);
window.app_saku2_transaksi_kopeg_sju_fQuoValue.implement({
	doClick: function(sender){
	    if (sender == this.bSubmit){
    		this.hide();
			this.onSubmit.call(sender, (this.mDesk.getCode()) ) ;
    	
    	}else {
    	    this.hide();
    	}
                
    	
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
		window.app_saku2_transaksi_kopeg_sju_fQuoValue.prototype.parent.setHeight.call(this, data);
		if (this.p1){
			this.p1.setTop(data - 25);
		}
	},
	setWidth: function(data) {
		window.app_saku2_transaksi_kopeg_sju_fQuoValue.prototype.parent.setWidth.call(this, data);
		if (this.p1){
			this.mDesk.setWidth(data - 6);
			this.p1.setWidth(data);
			this.bCancel.setLeft(data - 90);
		}
	}
});
