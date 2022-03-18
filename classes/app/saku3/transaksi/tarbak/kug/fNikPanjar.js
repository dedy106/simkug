window.app_saku3_transaksi_tarbak_kug_fNikPanjar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_kug_fNikPanjar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_kug_fNikPanjar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan Panjar", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[20,23,600,450],caption:"Daftar Karyawan Panjar"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["NIK","Nama","Jml PJ"],
				colWidth:[[2,1,0],[100,300,80]],
				columnReadOnly:[true,[1],[0]],
				colFormat:[[2],[cfNilai]],				
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
			
			this.doLoad();
			
			var sql = new server_util_arrayList();
			sql.add("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_kug_fNikPanjar.extend(window.childForm);
window.app_saku3_transaksi_tarbak_kug_fNikPanjar.implement({
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
					sql.add("delete from nik_panjar where kode_lokasi='"+this.app._lokasi+"'");
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into nik_panjar (nik,kode_lokasi,jml) values ('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+nilaiToFloat(this.sg.cells(2,i))+")");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.doLoad();
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doLoad: function(sender){
		try{
			var strSQL = "select a.nik,a.nama,b.jml from karyawan a inner join nik_panjar b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+						 
			 			 "where b.kode_lokasi = '"+this.app._lokasi+"' order by b.nik";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.nik,line.nama,floatToNilai(line.jml)]);
				}
			} else this.sg.clear(1);												
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var nik = this.dataNIK.get(sender.cells(0,row));
				if (nik) sender.cells(1,row,nik);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"NIK "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
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
					this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
												  "select nik,nama   from karyawan where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(nik) from karyawan where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["nik","nama"],"and",["NIK","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNIK = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataNIK.set(line.nik, line.nama);
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