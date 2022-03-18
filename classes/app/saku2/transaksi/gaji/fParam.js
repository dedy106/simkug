window.app_saku2_transaksi_gaji_fParam = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fParam";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Gaji", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[10,23,900,450],caption:"Daftar Parameter Gaji"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,400],colCount:6,tag:0,
		            colTitle:["Kode Param","Nama","Jenis","Kode Akun","Nama Akun","DC"],
					colWidth:[[5,4,3,2,1,0],[70,200,80,80,330,70]],
					columnReadOnly:[true,[2,3,4,5],[0,1]],
					buttonStyle:[[2,3],[bsAuto,bsEllips]], 
					picklist:[[2],[new portalui_arrayMap({items:["F","T","S"]})]],
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
						"select a.kode_param,a.nama,a.jenis,a.kode_akun,b.nama as nama_akun,a.dc "+
						"from hr_gaji_param a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' order by dc desc,no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_param,line.nama,line.jenis.toUpperCase(),line.kode_akun,line.nama_akun,line.dc.toUpperCase()]);
				}
			} else this.sg.clear(1);	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fParam.extend(window.childForm);
window.app_saku2_transaksi_gaji_fParam.implement({
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
					sql.add("delete from hr_gaji_param where kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into hr_gaji_param(kode_param,nama,kode_lokasi,jenis,kode_akun,dc,no_urut) values "+
										"	('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"',"+i+")");
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
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg, this.sg.row, this.sg.col, 
														"select kode_akun, nama  from masakun where kode_lokasi='"+this.app._lokasi+"' and jenis='Beban' and block='0'",
														"select count(kode_akun) from masakun where kode_lokasi='"+this.app._lokasi+"' and jenis='Beban' and block='0'",
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
										"select a.kode_param,a.nama,a.jenis,a.kode_akun,b.nama as nama_akun,a.dc "+
										"from hr_gaji_param a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' order by dc desc,no_urut",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([line.kode_param,line.nama,line.jenis.toUpperCase(),line.kode_akun,line.nama_akun,line.dc.toUpperCase()]);
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