window.app_saku3_transaksi_tu_proyek_fDRKproyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fDRKproyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fDRKproyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data DRK Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.p1 = new panel(this,{bound:[20,23,600,450],caption:"Daftar DRK"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["Kode","Nama","Status"],
				colWidth:[[2,1,0],[100,300,120]],
				columnReadOnly:[true,[1,2],[0]],				
				buttonStyle:[[0,2],[bsEllips,bsAuto]], 
				picklist:[[2],[new portalui_arrayMap({items:["PDPT","BEBAN"]})]],
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
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from drk order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
			this.c_tahun.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fDRKproyek.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fDRKproyek.implement({
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
					sql.add("delete from tu_proyek_drk where tahun = '"+this.c_tahun.getText()+"'");								
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into tu_proyek_drk (tahun,kode_lokasi,kode_drk,status) values ('"+this.c_tahun.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.c_tahun);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.c_tahun.setText("");
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
			if (this.c_tahun.getText() != ""){	
				var sql = new server_util_arrayList();
				sql.add("select kode_drk,nama from drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
				this.dbLib.getMultiDataProviderA(sql);
			
									
				var strSQL = "select a.kode_drk,a.nama,b.status from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+						 
				 			 "where b.tahun='"+this.c_tahun.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_drk";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_drk,line.nama,line.status]);
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
				var drk = this.dataDRK.get(sender.cells(0,row));
				if (drk) sender.cells(1,row,drk);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode DRK "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
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
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
												  "select kode_drk,nama    from drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(*)  from drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.c_tahun.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataDRK = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataDRK.set(line.kode_drk, line.nama);										
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