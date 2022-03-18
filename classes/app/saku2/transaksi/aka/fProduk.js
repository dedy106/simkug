window.app_saku2_transaksi_aka_fProduk = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fProduk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk Piutang", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[10,23,900,450],caption:"Daftar Produk Piutang"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,400],colCount:13,tag:0,
		            colTitle:["Kode Produk","Nama","Akun Piutang","Nama Akun","Akun Pdpt","Nama Akun","Akun PDD","Nama Akun","Akun BP","Nama Akun","Akun AP","Nama Akun","No Urut"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,150,70,150,70,150,70,150,70,150,70,150,70]],
					columnReadOnly:[true,[2,3,4,5,6,7,8,9,10,11],[0,1,12]],
					colFormat:[[12],[cfNilai]],
					buttonStyle:[[2,4,6,8,10],[bsEllips,bsEllips,bsEllips,bsEllips,bsEllips]], 
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,425,899,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider(
						"select a.kode_produk,a.nama,a.akun_piutang,b.nama as nama_ar,a.akun_pdpt,c.nama as nama_pdpt,a.akun_pdd,d.nama as nama_pdd,a.akun_bp,e.nama as nama_bp,a.akun_ap,f.nama as nama_ap,a.no_urut "+
						"from aka_produk a inner join masakun b on a.akun_piutang=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                  inner join masakun c on a.akun_pdpt=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						"                  inner join masakun d on a.akun_pdd=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						"                  inner join masakun e on a.akun_bp=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
						"                  inner join masakun f on a.akun_ap=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' order by kode_produk",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_produk,line.nama,line.akun_piutang,line.nama_ar,line.akun_pdpt,line.nama_pdpt,line.akun_pdd,line.nama_pdd,line.akun_bp,line.nama_bp,line.akun_ap,line.nama_ap,line.no_urut]);
				}
			} else this.sg.clear(1);	
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fProduk.extend(window.childForm);
window.app_saku2_transaksi_aka_fProduk.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from aka_produk where kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into aka_produk(kode_produk,nama,kode_lokasi,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,no_urut) values "+
										"	('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(10,i)+"',"+parseNilai(this.sg.cells(12,i))+")");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
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
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 2 :
				case 4 :
				case 6 :
				case 8 :
				case 10 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg, this.sg.row, this.sg.col, 
														"select kode_akun, nama  from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'",
														"select count(kode_akun) from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'",
														 new Array("kode_akun","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");														
							var data = this.dbLib.getDataProvider(
										"select a.kode_produk,a.nama,a.akun_piutang,b.nama as nama_ar,a.akun_pdpt,c.nama as nama_pdpt,a.akun_pdd,d.nama as nama_pdd,a.akun_bp,e.nama as nama_bp,a.akun_ap,f.nama as nama_ap,a.no_urut "+
										"from aka_produk a inner join masakun b on a.akun_piutang=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										"                  inner join masakun c on a.akun_pdpt=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
										"                  inner join masakun d on a.akun_pdd=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
										"                  inner join masakun e on a.akun_bp=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
										"                  inner join masakun f on a.akun_ap=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' order by kode_produk",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([line.kode_produk,line.nama,line.akun_piutang,line.nama_ar,line.akun_pdpt,line.nama_pdpt,line.akun_pdd,line.nama_pdd,line.akun_bp,line.nama_bp,line.akun_ap,line.nama_ap,line.no_urut]);
								}
							} else this.sg.clear(1);	
							setTipeButton(tbUbahHapus);
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