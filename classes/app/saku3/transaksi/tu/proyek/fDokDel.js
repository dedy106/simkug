window.app_saku3_transaksi_tu_proyek_fDokDel = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fDokDel.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fDokDel";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penghapusan Kelengkapan Dokumen", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.cb_rab = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No RAB",tag:1,multiSelection:false,change:[this,"doChange"]}); 				

		this.pc1 = new pageControl(this,{bound:[10,18,1000,450], childPage:["Data Dokumen"]});				
		this.sg1mp2 = new saiGrid(this.pc1.childPage[0],{bound:[1,255,this.pc1.width-5,190],colCount:4,readOnly:true,tag:9,
					colTitle:["Status","Kd Jenis","Jenis Dokumen","Path File"],
					colWidth:[[3,2,1,0],[480,200,80,80]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["AKTIF","HAPUS"]})]],checkItem: true,
					rowCount:1,autoAppend:false});
		this.sgn2 = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, 
					grid:this.sg1mp2});            
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_rab.setSQL("select no_rab,keterangan from tu_rabapp_m a where kode_lokasi='"+this.app._lokasi+"'",["no_rab","keterangan"],false,["No RAB","Deskripsi"],"and","Data RAB",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fDokDel.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fDokDel.implement({	
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
					
					for (var i=0;i < this.sg1mp2.getRowCount();i++){
						if (this.sg1mp2.rowValid(i) && this.sg1mp2.cells(0,i) == "HAPUS"){								
							sql.add("delete from tu_rab_dok where kode_jenis='"+this.sg1mp2.cells(1,i)+"' and no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						}
					}

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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_rab);
					this.sg1mp2.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){					
		if (sender == this.cb_rab && this.cb_rab.getText()!="") {
			this.sg1mp2.clear();
			var data = this.dbLib.getDataProvider(
					"select b.kode_jenis,b.nama,a.no_gambar "+
					"from tu_rab_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_rab = '"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1mp2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													 
					this.sg1mp2.appendData(["AKTIF",line.kode_jenis, line.nama, line.no_gambar]);
				}
			} else this.sg1mp2.clear(1);
		}					
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_rab.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});