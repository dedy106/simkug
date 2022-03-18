window.app_saku3_transaksi_ppbs_aset_fAkunPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_aset_fAkunPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_aset_fAkunPP";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mapping Akun PP", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.c_tahun = new saiCB(this,{bound:[20,22,200,20],caption:"Tahun",tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,15,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,500,430],caption:"Daftar Akun - PP"});
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
		
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}	

			this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ");
			this.c_tahun.setText(""); 
			this.c_tahun.setText(this.tahun); 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_aset_fAkunPP.extend(window.childForm);
window.app_saku3_transaksi_ppbs_aset_fAkunPP.implement({
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
					
					sql.add("delete from log_akun_pp where tahun='"+this.c_tahun.getText()+"' and kode_pp = '"+this.cb_pp.getText()+"'");								
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into log_akun_pp (kode_pp,kode_lokasi,kode_akun,tahun) values ('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.c_tahun.getText()+"')");
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
			if ((sender == this.cb_pp || sender == this.c_tahun) && this.cb_pp.getText() != "" && this.c_tahun.getText() != ""){						
				var strSQL = "select a.kode_akun,a.nama from masakun a inner join log_akun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.c_tahun.getText()+"' "+						 
				 			 "where b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_akun";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama]);
					}
				} else this.sg.clear(1);									
			}

			if (sender == this.c_tahun && this.c_tahun.getText() != ""){						
				this.cb_pp.setSQL("select kode_pp, nama from agg_pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
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
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});