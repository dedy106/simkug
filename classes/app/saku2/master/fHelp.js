window.app_rra_transaksi_fAbt = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fAbt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fAbt";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PRDRK ABT Anggaran: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;wysiwyg");
		this.cb_form = new saiCBBL(this,{bound:[20,10,200,20],caption:"Form", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});		
		this.ed_jdl = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Judul",maxLength:30,readOnly:true});	
		this.mDesk = new wysiwyg(this,{bound:[1,10,this.width-25,this.height-125], withForm:false});
		this.mDesk.display();
		this.mDesk.enable();		

		this.rearrangeChild(10, 22);		
		
		setTipeButton(tbSimpan);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			
			this.cb_form.setSQL("select a.kode_form, a.nama_form from m_form a inner join menu b on b.kode_menu = a.kode_menu where kode_klp='"+this.app._lokasi+"'",["kode_form","nama_form"],false,["Kode","Nama"],"and","Data Form",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fAbt.extend(window.childForm);
window.app_rra_transaksi_fAbt.implement({
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into help(kode_form,kode_lokasi,keterangan,judul, nik_user, tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+urlencode(this.mDesk.getCode())+"','"+this.ed_jdl.getText()+"','"+this.app._userLog+"',now())");				
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update help set keterangan = '"+urlencode(this.mDesk.getCode())+"',judul ='"+this.ed_jdl.getText()+"' where kode_form = '"+this.cb_form.getText()+"' and kode_lokasi = '"+ this.app._lokasi+"' ");				
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from help where kode_form = '"+this.cb_form.getText()+"' and kode_lokasi = '"+ this.app._lokasi+"' ");				
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){
		var dt = this.dbLib.getDataProvider("select judul, keterangan from help where kode_form = '"+this.cb_form.getText()+"' and kode_lokasi ='"+ this.app._lokasi+"' ");
		if (dt && dt.rs.rows[0]){
			setTipeButton(tbUbahHapus);
			this.ed_jdl.setText(dt.rs.rows[0].judul);
			this.mDesk.setCode(urldecode(dt.rs.rows[0].keterangan));			
		}else setTipeButton(tbSimpan);
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_form);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doCodeClick : function(sender)
	{
		try{		
			this.mDesk.toggleMode();			
			if (this.mDesk.viewMode == 2){
				sender.setHint("Preview");
			}else sender.setHint("Source Code (HTML)");
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_form.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
