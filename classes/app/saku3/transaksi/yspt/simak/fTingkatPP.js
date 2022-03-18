window.app_saku3_transaksi_yspt_simak_fTingkatPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fTingkatPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fTingkatPP";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mapping Tingkat - PP", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_pp = new saiCBBL(this,{bound:[20,15,200,20],caption:"Sekolah", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,500,450],caption:"Daftar Tingkat"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

			var sql = new server_util_arrayList();
			sql.add("select a.kode_tingkat,a.nama from sis_tingkat a where a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fTingkatPP.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fTingkatPP.implement({
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

					sql.add("delete from sis_tingkat_pp where kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into sis_tingkat_pp (kode_pp,kode_lokasi,kode_tingkat) values ('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_pp);
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
			if (this.cb_pp.getText() != ""){						
				var strSQL = "select a.kode_tingkat,a.nama from sis_tingkat a inner join sis_tingkat_pp b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi "+						 
				 "where b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_tingkat";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_tingkat,line.nama]);
					}
				} else this.sg.clear(1);									
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var tingkat = this.dataTingkat.get(sender.cells(0,row));
				if (tingkat) sender.cells(1,row,tingkat);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tingkat "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Tingkat",sender,undefined, 
												  "select kode_tingkat,nama    from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_tingkat)  from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_tingkat","nama"],"and",["Kode","Nama"],false);				
				}				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_pp.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;	    
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataTingkat = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataTingkat.set(line.kode_tingkat, line.nama);										
								}								
							}							
						}else throw result;
					break;  		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});