window.app_saku3_transaksi_siaga_hris_gaji_fRefGajiLoker = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fRefGajiLoker.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fRefGajiLoker";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Norma Gaji per Lokasi Kantor", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");

		this.c_tahun = new saiCB(this,{bound:[20,13,200,20],caption:"Tahun",readOnly:true,change:[this,"doChange"]});
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Lokasi Kantor",maxLength:10,multiSelection:false,change:[this,"doChange"]});				
		this.cb_grade = new saiCBBL(this,{bound:[20,18,220,20],caption:"Grade", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_kelas = new saiCBBL(this,{bound:[20,19,220,20],caption:"Level", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});

		this.p1 = new panel(this,{bound:[10,23,500,410],caption:"Daftar Tarif"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,495,354],colCount:3,tag:0,
		            colTitle:["Kode Param","Nama","Tarif"],
					colWidth:[[2,1,0],[100,250,70]],
					columnReadOnly:[true,[0,1],[2]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]],
					defaultRow:1,
					change:[this,"doCellChange"],ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,380,499,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select kode_lokkantor, nama from gr_lokkantor where kode_lokasi='"+this.app._lokasi+"'",["kode_lokkantor","nama"],false,["Kode","Nama"],"and","Data Lokasi Kantor",true);
			this.cb_grade.setSQL("select kode_grade, nama from gr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_tahun.addItem(i,line.tahun);
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fRefGajiLoker.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fRefGajiLoker.implement({
	loadParam : function() {
		var strSQL = "select a.kode_param,a.nama,isnull(b.nilai,0) as tarif "+
					 "from gr_gaji_param a "+
					 "left join gr_gaji_lokkantor b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.kode_lokkantor = '"+this.cb_kode.getText()+"' and b.kode_grade='"+this.cb_grade.getText()+"' and b.kode_kelas='"+this.cb_kelas.getText()+"' and tahun='"+this.c_tahun.getText()+"' "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_rutin='1' order by a.no_urut desc";
					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif)]);
			}						
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

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var nilai = nilaiToFloat(this.sg.cells(2,i));
								
								sql.add("insert into gr_gaji_lokkantor(kode_lokkantor,kode_grade,kode_kelas,tahun, kode_param,kode_lokasi,nilai) values "+
										"	('"+this.cb_kode.getText()+"','"+this.cb_grade.getText()+"','"+this.cb_kelas.getText()+"','"+this.c_tahun.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+nilai+")");
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
					sql.add("delete from gr_gaji_lokkantor where kode_lokkantor = '"+this.cb_kode.getText()+"' and kode_grade = '"+this.cb_grade.getText()+"' and kode_kelas = '"+this.cb_kelas.getText()+"' and tahun = '"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var nilai = nilaiToFloat(this.sg.cells(2,i));
								
								sql.add("insert into gr_gaji_lokkantor(kode_lokkantor,kode_grade,kode_kelas,tahun, kode_param,kode_lokasi,nilai) values "+
										"	('"+this.cb_kode.getText()+"','"+this.cb_grade.getText()+"','"+this.cb_kelas.getText()+"','"+this.c_tahun.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+nilai+")");

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
					sql.add("delete from gr_gaji_lokkantor where kode_lokkantor = '"+this.cb_kode.getText()+"' and kode_grade = '"+this.cb_grade.getText()+"' and kode_kelas = '"+this.cb_kelas.getText()+"' and tahun = '"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (sender == this.cb_grade && this.cb_grade.getText()!= "") {
				this.cb_kelas.setSQL("select kode_kelas, nama from gr_kelas where kode_grade='"+this.cb_grade.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
			}
			
			if ((sender == this.cb_kode || sender == this.cb_grade || sender == this.cb_kelas || sender == this.c_tahun)  
			    && this.cb_kode.getText() != "" && this.cb_grade.getText() != "" && this.cb_kelas.getText() != "" && this.c_tahun.getText() != "") {					
				this.loadParam();					
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});