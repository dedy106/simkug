window.app_saku2_transaksi_kopeg_lab_fMhsLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fMhsLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fMhsLoad";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mahasiswa : Input-Edit/Load", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image;");
		this.c_menu = new saiCB(this,{bound:[20,12,200,20],caption:"Menu",readOnly:true,tag:2});
		
		this.bSave = new button(this,{bound:[835,12,80,18],caption:"Simpan Load",click:[this,"doSimpan"]});
		this.bUpload = new portalui_uploader(this,{bound:[720,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,370], childPage:["Data Mahasiswa"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:2,tag:9,
		            colTitle:["N I M","Nama"],
					colWidth:[[1,0],[300,80]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg, pager:[this,"selectPage"]});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_menu.items.clear();
			var data = this.dbLib.getDataProvider("select distinct kode_klp from menu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_menu.addItem(i,line.kode_klp);
				}
			}
			this.c_menu.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fMhsLoad.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fMhsLoad.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   		
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg.appendData([line.nim,line.nama]);
		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into lab_mhs(nim,kode_lokasi,nama) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"')");
					
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_kode.getText()+"','M','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");										
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update lab_mhs set nama='"+this.e_nama.getText()+"' "+
					        "where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update hakakses set nama='"+this.e_nama.getText()+"',kode_klp_menu='"+this.c_menu.getText()+"' "+
					        "where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from lab_mhs where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.sg.clear(1);
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
	doSimpan: function(sender){
		try {
			if (this.c_menu.getText()=="") {
				system.alert(this,"Transaksi tidak valid.","Kode Menu harus dipilih.");
				return false;
			}
			else {
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				for (var i=0; i < this.dataUpload.rows.length;i++){
					line = this.dataUpload.rows[i];								   			
					var strSQL = "select nim from lab_mhs where nim ='"+line.nim+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data1 = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data1 == "object"){
						var line1 = data1.rs.rows[0];							
						if (line1 != undefined){											
							sql.add("delete from lab_mhs where nim='"+line.nim+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from hakakses where nik='"+line.nim+"' and kode_lokasi='"+this.app._lokasi+"'");
						}				
					}			
					sql.add("insert into lab_mhs(nim,nama,kode_lokasi) values ('"+line.nim+"','"+line.nama+"','"+this.app._lokasi+"')");
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
							"('"+line.nim+"','"+line.nama+"','"+line.nim+"','M','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");										
				}
				this.dbLib.execArraySQL(sql);
			}
		} 
		catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select a.nama,b.kode_klp_menu from lab_mhs a inner join hakakses b on a.nim=b.nik and a.kode_lokasi=b.kode_lokasi where a.nim ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.c_menu.setText(line.kode_klp_menu);						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Mahasiswa",sender,undefined, 
											  "select nim, nama  from lab_mhs where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nim) from lab_mhs where kode_lokasi='"+this.app._lokasi+"'",
											  ["nim","nama"],"and",["Kode","Nama"],false);				
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

/*

format xls - txt
--------------------------------
     nim    |        nama
--------------------------------
  113       |     abu
  613       |     bahlul   

--------------------------------
*/