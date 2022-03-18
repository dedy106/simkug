window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafon = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_kesehatan_fPlafon";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Plafon Kesehatan dan Bantuan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.e_tahun = new saiLabelEdit(this,{bound:[20,09,200,20],caption:"Tahun", maxLength:4, change:[this,"doChange"],tag:2});	
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Jenis",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Jenis Plafon"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Grade","Nama","Kd KlpJab","Nama Loker","Tarif"],
					colWidth:[[4,3,2,1,0],[80,220,100,220,100]],
					columnReadOnly:[true,[0,1,2,3],[4]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],
					ellipsClick:[this,"doEllipsClick"],
					dblClick:[this,"doDoubleClick"],autoAppend:true,defaultRow:1});		
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
window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafon.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_kesehatan_fPlafon.implement({
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
								sql.add("insert into gr_kes_param(kode_jenis,kode_grade,kode_klpjab,kode_lokasi,nilai,tahun) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.e_tahun.getText()+"')");
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
					sql.add("delete from gr_kes_param where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'");;			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_kes_param(kode_jenis,kode_grade,kode_klpjab,kode_lokasi,nilai,tahun) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.e_tahun.getText()+"')");
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
					sql.add("delete from gr_kes_param where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'");			
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
			if (this.cb_kode.getText() != "" && this.e_tahun.getText() != ""){
				var data = this.dbLib.getDataProvider(
				            "select a.kode_grade,b.nama,a.kode_klpjab,c.nama as nama_jab,a.nilai "+
				            "from gr_kes_param a inner join gr_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join gr_klpjab c on a.kode_klpjab=c.kode_klpjab and a.kode_lokasi=c.kode_lokasi "+
							"where a.kode_jenis='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.e_tahun.getText()+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_grade,line.nama,line.kode_klpjab,line.nama_jab,floatToNilai(line.nilai)]);
						setTipeButton(tbUbahHapus);
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
						this.standarLib.showListDataForSG(this, "Daftar Loker",this.sg, this.sg.row, this.sg.col, 
														"select kode_klpjab, nama  from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_klpjab) from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",
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