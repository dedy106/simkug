window.app_saku2_transaksi_aka_aka2_fProduk19 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fProduk19.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fProduk19";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Setting Produk Akademik", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.bTampil = new button(this,{bound:[10,10,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});					

		this.p1 = new panel(this,{bound:[10,23,1000,430],caption:"Daftar Parameter Produk"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,995,385],colCount:11,tag:0,
		            colTitle:["Kode Produk","Nama","Akun Piutang","Akun Pdpt","Akun PYT","Akun BP","Akun AP","Kode DRK","Kode Akt","Prodi","Kelas"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,80,120,80,80,80,80,80,150,70]],					
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:50,afterPaste:[this,"doAfterPaste"],
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
window.app_saku2_transaksi_aka_aka2_fProduk19.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fProduk19.implement({
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
					sql.add("delete from aka_produk where kode_lokasi='"+this.app._lokasi+"'");								
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into aka_produk(kode_produk,nama,kode_lokasi,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,no_urut,kode_pp,kode_drk,kode_akt,kode_jalur) values "+
										"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"',"+i+",'"+this.sg.cells(9,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(10,i)+"')");
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
					"select kode_produk,nama,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,kode_drk,kode_akt,kode_pp,kode_jalur "+
					"from aka_produk "+
					"where kode_lokasi='"+this.app._lokasi+"' order by no_urut",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_produk,line.nama,line.akun_piutang,line.akun_pdpt,line.akun_pdd,line.akun_bp,line.akun_ap,line.kode_drk,line.kode_akt,line.kode_pp,line.kode_jalur]);
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});