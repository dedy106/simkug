window.app_saku2_transaksi_aka_aka2_fProdukLain = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fProdukLain.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fProdukLain";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk Piutang", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.bTampil = new button(this,{bound:[10,10,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});					
		this.p1 = new panel(this,{bound:[10,23,1000,430],caption:"Daftar Parameter Produk Lain"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,995,385],colCount:6,tag:0,
		            colTitle:["Kode Produk","Nama","Akun Piutang","Akun Pdpt","Kode PP","Kode DRK"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,250,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
					defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPage"]});		
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbah);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fProdukLain.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fProdukLain.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from aka_produk_lain where kode_lokasi='"+this.app._lokasi+"'");								
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into aka_produk_lain(kode_produk,nama,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk) values "+
										"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"')");
							}
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
				this.sg.clear(1);
				break;
			case "ubah" :	
				this.ubah();
				break;								
		}
	},
	doTampilClick: function(sender){	
		var data = this.dbLib.getDataProvider(
					"select kode_produk,nama,akun_piutang,akun_pdpt,kode_pp,kode_drk "+
					"from aka_produk_lain "+
					"where kode_lokasi='"+this.app._lokasi+"' order by kode_produk",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_produk,line.nama,line.akun_piutang,line.akun_pdpt,line.kode_pp,line.kode_drk]);
			}
		} else this.sg.clear(1);			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");																					
							setTipeButton(tbUbahHapus);
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