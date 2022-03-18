window.app_saku3_transaksi_siaga_hris_fOtorisasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fOtorisasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_fOtorisasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Otorisasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,9,220,20],caption:"Otorisasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.pc1 = new pageControl(this,{bound:[20,12,800,450], childPage:["Data Otorisasi"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[300,100]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],
					appendRow:[this,"doAppendRow"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager"]});
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_kode.setSQL("select sts_oto, nama from gr_status_otorisasi where kode_lokasi='"+this.app._lokasi+"'",["sts_oto","nama"],false,["Kode","Nama"],"and","Data Status Otorisasi",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fOtorisasi.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_fOtorisasi.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_otorisasi(sts_oto,nik,kode_lokasi) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_otorisasi where sts_oto = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_otorisasi(sts_oto,nik,kode_lokasi) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"')");
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
					sql.add("delete from gr_otorisasi where sts_oto = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
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
			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nik,b.nama "+
						"from gr_otorisasi a "+
						"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						"where a.sts_oto='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																
						this.sg.appendData([line.nik,line.nama]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);
				setTipeButton(tbUbahHapus);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg, this.sg.row, this.sg.col, 
														"select a.nik,a.nama from gr_karyawan a where a.kode_lokasi='"+this.app._lokasi+"'  ",
														"select count(a.nik) from gr_karyawan a where a.kode_lokasi='"+this.app._lokasi+"'  ",
														 new Array("a.nik","a.nama"),"and",new Array("NIK","Keterangan"),false);					
						break;					
												
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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
