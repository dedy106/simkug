window.app_hris_transaksi_karyawan_fRwyDidik = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_karyawan_fRwyDidik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_karyawan_fRwyDidik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pendidikan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.p1 = new panel(this,{bound:[10,23,900,433],caption:"Daftar Riwayat Pendidikan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,380],colCount:8,tag:0,
		            colTitle:["Kode Strata","Nama Strata","Kode Jur.","Nama Jurusan","Institusi","Tahun","Keterangan","Dana"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,190,60,100,100,80,150,70]],
					columnReadOnly:[true,[0,1],[2,3,4,5,6,7]],
					buttonStyle:[[0,2,7],[bsEllips,bsEllips,bsAuto]], 
					defaultRow:1,
					picklist:[[7],[new portalui_arrayMap({items:["Perusahaan","Pribadi"]})]],
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,410,899,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Karyawan",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_karyawan_fRwyDidik.extend(window.childForm);
window.app_hris_transaksi_karyawan_fRwyDidik.implement({
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
					sql.add("delete from gr_rwypddk where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_rwypddk(nik,no_urut,kode_lokasi,kode_strata,kode_jur,institusi,tahun,keterangan,setara,dana,nik_user,tgl_input) values "+
										"	('"+this.cb_kode.getText()+"',"+i+",'"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"',"+parseNilai(this.sg.cells(5,i))+",'"+this.sg.cells(6,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(7,i)+"','"+this.app._userLog+"',getdate())");
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
					sql.add("delete from gr_rwypddk where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.kode_strata, b.nama as nama_strata, a.kode_jur, c.nama as nama_jur, a.institusi,a.tahun, a.keterangan,a.dana "+
					  "from gr_rwypddk a inner join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi "+
					  "                   inner join gr_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
					  "where a.nik = '"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_strata,line.nama_strata,line.kode_jur,line.nama_jur,line.institusi,line.tahun,line.keterangan,line.dana]);
					}
				} else this.sg.clear(1);	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Strata",this.sg, this.sg.row, this.sg.col, 
														"select kode_strata, nama  from gr_strata where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_strata) from gr_strata where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_strata","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 2 :
						this.standarLib.showListDataForSG(this, "Daftar Jurusan",this.sg, this.sg.row, this.sg.col, 
														"select kode_jur, nama  from gr_jur where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_jur) from gr_jur where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_jur","nama"),"and",new Array("Kode","Nama"),false);					
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
