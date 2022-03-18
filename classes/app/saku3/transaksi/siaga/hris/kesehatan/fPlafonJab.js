window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafonJab = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafonJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_kesehatan_fPlafonJab";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Plafon Kesehatan dan Bantuan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.e_tahun = new saiLabelEdit(this,{bound:[20,09,200,20],caption:"Tahun", maxLength:4, change:[this,"doChange"],tag:2});	
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Jenis",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.cb_klpjab = new saiCBBL(this,{bound:[20,11,220,20],caption:"Klp Jabatan",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.cb_sts = new saiCBBL(this,{bound:[20,13,220,20],caption:"Status Pegawai",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,380], childPage:["Daftar Jenis Plafon"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode Grade","Nama","Tarif"],
					colWidth:[[2,1,0],[100,300,100]],
					columnReadOnly:[true,[0,1],[2]],
					colFormat:[[2],[cfNilai]],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 23);

		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select kode_jenis, nama from gr_kes_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis Plafon",true);
			this.cb_klpjab.setSQL("select kode_klpjab, nama from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",["kode_klpjab","nama"],false,["Kode","Nama"],"and","Data Kelompok Jabatan",true);
			this.cb_sts.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);
						
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_tahun.setText(line.tahun);		
			} 
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafonJab.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafonJab.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_kes_param(kode_jenis,kode_grade,kode_klpjab,kode_lokasi,nilai,tahun,sts_sdm) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_klpjab.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(2,i))+",'"+this.e_tahun.getText()+"','"+this.cb_sts.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_kes_param where kode_klpjab='"+this.cb_klpjab.getText()+"' and sts_sdm='"+this.cb_sts.getText()+"' and kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'");;			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_kes_param(kode_jenis,kode_grade,kode_klpjab,kode_lokasi,nilai,tahun,sts_sdm) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_klpjab.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(2,i))+",'"+this.e_tahun.getText()+"','"+this.cb_sts.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_kes_param where kode_klpjab='"+this.cb_klpjab.getText()+"' and sts_sdm='"+this.cb_sts.getText()+"' and kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'");;			
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
	doChange: function(sender){
		try{
			if ((sender == this.cb_kode || sender == this.cb_klpjab || sender == this.cb_sts || sender == this.e_tahun) && this.cb_kode.getText() != "" && this.cb_klpjab.getText() != "" && this.cb_sts.getText() != "" && this.e_tahun.getText() != ""){
				var data = this.dbLib.getDataProvider(
				            "select b.kode_grade,b.nama,a.nilai "+
							"from gr_klpjab_grade c inner join gr_grade b on c.kode_grade=b.kode_grade and c.kode_lokasi=b.kode_lokasi "+
							" 						left join gr_kes_param a on c.kode_klpjab=a.kode_klpjab and c.kode_grade=a.kode_grade and a.kode_jenis='"+this.cb_kode.getText()+"' and a.sts_sdm='"+this.cb_sts.getText()+"' and a.tahun='"+this.e_tahun.getText()+"' "+							
							"where c.kode_klpjab='"+this.cb_klpjab.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.nilai)]);
						setTipeButton(tbUbahHapus);
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