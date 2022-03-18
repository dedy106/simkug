window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fUHarianKlp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Uang Harian SPPD", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Jenis SPPD",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.p1 = new panel(this,{bound:[10,23,900,433],caption:"Daftar Tarif Uang Harian per Grade"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,380],colCount:7,tag:0,
		            colTitle:["Kode Grade","Nama","Kode Level","Nama Level","Kode KlpJab","Nama Klp Jabatan","Tarif"],
					colWidth:[[6,5,4,3,2,1,0],[100,200,70,200,70,200,70]],
					columnReadOnly:[true,[0,1,2,3,4,5],[6]],
					buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]], 
					colFormat:[[6],[cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,405,899,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select sts_spj, nama from gr_status_spj where kode_lokasi='"+this.app._lokasi+"'",["sts_spj","nama"],false,["Kode","Nama"],"and","Data Jenis SPPD",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlp.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlp.implement({
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
					sql.add("delete from gr_spj_harian where sts_spj = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_spj_harian(sts_spj,kode_grade,kode_klpjab,kode_lokasi,nilai, kode_kelas,kode_so) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(6,i))+", '"+this.sg.cells(2,i)+"','-')");
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
									
					//setTipeButton(tbAllFalse);
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
					sql.add("delete from gr_spj_harian where sts_spj = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				//setTipeButton(tbUbahHapus);
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
				var data = this.dbLib.getDataProvider(
				            "select a.kode_grade,b.nama,a.nilai,a.kode_klpjab,c.nama as nama_jab,d.kode_kelas,d.nama as nama_kelas "+
				            "from gr_spj_harian a "+
							"inner join gr_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
							"inner join gr_klpjab c on a.kode_klpjab=c.kode_klpjab and a.kode_lokasi=c.kode_lokasi "+
							"inner join gr_kelas d on a.kode_grade=d.kode_grade and a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi "+
							"where a.sts_spj='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_grade,line.nama,line.kode_kelas,line.nama_kelas, line.kode_klpjab,line.nama_jab,floatToNilai(line.nilai)]);
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
						this.standarLib.showListDataForSG(this, "Daftar Grade",this.sg, this.sg.row, this.sg.col, 
														"select kode_grade, nama  from gr_grade where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_grade) from gr_grade where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_grade","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 2 :
						this.standarLib.showListDataForSG(this, "Daftar Level",this.sg, this.sg.row, this.sg.col, 
														"select kode_kelas, nama  from gr_kelas where kode_grade = '"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",
														"select count(*) from gr_kelas where kode_grade = '"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_kelas","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 4 :
						this.standarLib.showListDataForSG(this, "Daftar  Kelompok Jabatan",this.sg, this.sg.row, this.sg.col, 
														"select kode_klpjab, nama  from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",
														"select count(*) from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_klpjab","nama"),"and",new Array("Kode","Nama"),false);					
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