window.app_saku3_transaksi_siaga_hris_gaji_fNormaFix = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fNormaFix.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fNormaFix";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Norma Gaji per Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});		
		this.c_status = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"Jenis Gaji",readOnly:true,tag:2});

		this.p1 = new panel(this,{bound:[10,23,500,423],caption:"Daftar Tarif Norma Gaji per Karyawan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,495,370],colCount:4,tag:0,
		            colTitle:["Kode Param","Nama","DC","Tarif"],
					colWidth:[[3,2,1,0],[80,50,250,70]],
					columnReadOnly:[true,[0,1,2],[3]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[3],[cfNilai]],
					defaultRow:1,
					change:[this,"doCellChange"],ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,395,499,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select nik, nama from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fNormaFix.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fNormaFix.implement({
	loadParam : function() {
		var strSQL = "select a.kode_param,a.nama,a.dc,abs(isnull(b.nilai,0)) as tarif,isnull(b.nik,'-') as status_baru "+
					 "from gr_gaji_param a "+
					 "	 left join gr_gaji_nik b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.nik = '"+this.cb_kode.getText()+"' "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut,a.dc desc";
					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,line.dc,floatToNilai(line.tarif)]);
			}						
			this.stsSimpan = line.status_baru;			
		} else this.sg.clear(1);			
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					//jenis gaji bulanan ambil dr yg fixed, yg harian tarif dlm hari dikalikan dgn jumlah absensi
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(2,i) == "D") var nilai = nilaiToFloat(this.sg.cells(3,i));
								else var nilai = -nilaiToFloat(this.sg.cells(3,i));

								sql.add("insert into gr_gaji_nik(nik,kode_param,kode_lokasi,nilai,jenis_gaji) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+nilai+",'"+this.c_status.getText()+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_gaji_nik where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(2,i) == "D") var nilai = nilaiToFloat(this.sg.cells(3,i));
								else var nilai = -nilaiToFloat(this.sg.cells(3,i));

								sql.add("insert into gr_gaji_nik(nik,kode_param,kode_lokasi,nilai,jenis_gaji) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+nilai+",'"+this.c_status.getText()+"')");
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
					sql.add("delete from gr_gaji_nik where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {
				this.loadParam();					
				
				
				var data = this.dbLib.getDataProvider("select flag_gaji from gr_karyawan where nik='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.c_status.setText(line.flag_gaji);
					}
				}


				if (this.stsSimpan == "-" && this.c_status.getText() == "BULANAN") {			
					var strSQL = "select year(getdate()) as tahun,kode_grade,kode_kelas,lok_kantor from gr_karyawan where nik ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							var tahun = line.tahun;
							var grade = line.kode_grade;
							var kelas = line.kode_kelas;	
							var kodelokkantor = line.lok_kantor;	
						}					
					}
		
					var strSQL = "select a.kode_param,a.nama,a.dc,abs(isnull(b.nilai,0)) as tarif "+
								 "from gr_gaji_param a "+
								 "	 left join gr_gaji_lokkantor b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.tahun = '"+tahun+"' and kode_grade='"+grade+"' and kode_kelas='"+kelas+"' and kode_lokkantor='"+kodelokkantor+"' "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut,a.dc desc";							
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.kode_param,line.nama,line.dc,floatToNilai(line.tarif)]);
						}							
					} 
				}
			

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
						this.standarLib.showListDataForSG(this, "Daftar Parameter",this.sg, this.sg.row, this.sg.col, 
														"select kode_param, nama  from gr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_param) from gr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_param","nama"),"and",new Array("Kode","Nama"),false);					
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});