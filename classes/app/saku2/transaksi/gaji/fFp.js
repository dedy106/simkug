window.app_saku2_transaksi_gaji_fFp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fFp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fFp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Faktor Posisi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[10,23,700,450],caption:"Daftar Faktor Posisi"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,695,400],colCount:4,tag:0,
		            colTitle:["Kode Grade","Nama","Prosentase","Tarif"],
					colWidth:[[3,2,1,0],[80,60,220,80]],
					colFormat:[[2,3],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1],[2,3]],
					buttonStyle:[[0],[bsEllips]], 
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],
					autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,425,699,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select a.kode_grade,b.nama,a.persen,a.tarif_pos "+
												"from hr_dplk_fp a "+
												"inner join hr_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
												"where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_grade",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.persen),floatToNilai(line.tarif_pos)]);
				}
			} else this.sg.clear(1);				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fFp.extend(window.childForm);
window.app_saku2_transaksi_gaji_fFp.implement({
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
					sql.add("delete from hr_dplk_fp where kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into hr_dplk_fp(kode_grade,kode_lokasi,persen,tarif_pos) values "+
										"	('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+")");
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
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Grade Posisi",this.sg, this.sg.row, this.sg.col, 
														"select kode_grade, nama  from hr_grade where kode_lokasi='"+this.app._lokasi+"' ",
														"select count(kode_grade) from hr_grade where kode_lokasi='"+this.app._lokasi+"' ",
														 new Array("kode_grade","nama"),"and",new Array("Kode","Nama"),false);					
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
							var data = this.dbLib.getDataProvider("select a.kode_grade,b.nama,a.persen,a.tarif_pos "+
												"from hr_dplk_fp a "+
												"inner join hr_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
												"where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_grade",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.persen),floatToNilai(line.tarif_pos)]);
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