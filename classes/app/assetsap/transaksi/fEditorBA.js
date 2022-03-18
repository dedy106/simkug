/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fEditorBA = function(owner, ba, klpfa, fa, formView) {
	if (owner){
		
		window.app_assetsap_transaksi_fEditorBA.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fEditorBA";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Editor", 0);	
		uses("wysiwyg;saiCBBL;checkbox");			
			
		this.wsg = new wysiwyg(this,{bound:[20,10,this.width - 40,this.height - 150]});
		this.wsg.enable();
		this.wsg.display();
			
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");					
		this.cekStatus = 0;				
		
	}
};
window.app_assetsap_transaksi_fEditorBA.extend(window.childForm);
window.app_assetsap_transaksi_fEditorBA.implement({
	doClose: function(sender){				
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);								
					}
				break;
				case "simpan" :					
					alert(this.wsg.getCode());
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{			
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){		
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{									
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();                            
						}else system.info(this,result,"");
	    			break;	    
	    			case "getDataProvider":
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							this.ed_jns.addItem(line.kode_klp, line.nama);
						}						
						this.doChange(this.ed_jns);
	    			break;			
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	     			
       }
        
	},				
	doEllipsClick:function(sender, col ,row){		
		try{						
		}catch(e){
			alert(e);
		}
	}	
});
