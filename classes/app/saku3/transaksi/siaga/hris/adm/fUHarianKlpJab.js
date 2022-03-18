window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlpJab = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlpJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fUHarianKlpJab";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Uang Harian SPPD", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Jenis SPPD",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.cb_klpjab = new saiCBBL(this,{bound:[20,11,220,20],caption:"Klp Jabatan",maxLength:10,multiSelection:false,change:[this,"doChange"]});

		this.p1 = new panel(this,{bound:[10,23,900,433],caption:"Daftar Tarif Uang Harian per Grade"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,380],colCount:3,tag:0,
		            colTitle:["Kode Grade","Nama","Tarif"],
								colWidth:[[2,1,0],[100,300,80]],
								columnReadOnly:[true,[0,1],[2]],					
								colFormat:[[2],[cfNilai]],
								defaultRow:1,
								ellipsClick:[this,"doEllipsClick"],autoAppend:false});
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
			this.cb_klpjab.setSQL("select kode_klpjab, nama from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",["kode_klpjab","nama"],false,["Kode","Nama"],"and","Data Kelompok Jabatan",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlpJab.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fUHarianKlpJab.implement({
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

					sql.add("delete a from gr_spj_harian a inner join gr_klpjab_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi and b.kode_klpjab='"+this.cb_klpjab.getText()+"' "+
							"where a.sts_spj = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");			

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_spj_harian(sts_spj,kode_grade,kode_klpjab,kode_lokasi,nilai, kode_kelas,kode_so) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_klpjab.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(2,i))+", '-','-')");
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

					sql.add("delete a from gr_spj_harian a inner join gr_klpjab_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi and b.kode_klpjab='"+this.cb_klpjab.getText()+"' "+
							"where a.sts_spj = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");			
					
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
			if ((sender == this.cb_klpjab || sender == this.cb_kode) && this.cb_klpjab.getText() != "" && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(
							"select a.kode_grade,a.nama,isnull(c.nilai,0) as nilai from gr_grade a "+
							"inner join gr_klpjab_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
							"left join gr_spj_harian c on a.kode_grade=c.kode_grade and a.kode_lokasi=c.kode_lokasi and c.sts_spj='"+this.cb_kode.getText()+"' and c.kode_klpjab='"+this.cb_klpjab.getText()+"' "+
							"where b.kode_klpjab='"+this.cb_klpjab.getText()+"' and  a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);	
			}
		}catch(e){
			systemAPI.alert(e);
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