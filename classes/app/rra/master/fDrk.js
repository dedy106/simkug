window.app_rra_master_fDrk = function(owner)
{
	if (owner)
	{
		window.app_rra_master_fDrk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_master_fDrk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data DRK", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Kode",maxLength:18,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:250});
		this.e_tahun = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"Tahun", maxLength:4, tag:2});		
		this.bTampil = new button(this,{bound:[539,11,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[20,23,600,433],caption:"Daftar DRK"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,380],tag:9,readOnly:true,colTitle: ["Kode","Nama"], dblClick:[this,"doDblClick"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,408,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		this.e_cari = new saiLabelEdit(this.sgn,{bound:[308,2,220,20],caption:"Cari", labelWidth:50,tag:100, keyDown:[this,"doCariKeyDown"] } );
		this.ib_cari = new button(this.sgn,{bound:[560,2,25,20],icon:"image/cursor.gif",caption:" ", click:[this,"doFind"]});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);		
			this.standarLib = new util_standar();
			
			var tgl = new Date();
			this.e_tahun.setText(tgl.getFullYear());			
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_master_fDrk.extend(window.childForm);
window.app_rra_master_fDrk.implement({
	doClose: function(){
		this.dbLib.delListener(this);
	},
	doDblClick:function(sender, col, row)
	{
		this.cb_kode.setText(sender.cells(0,row));
		this.e_nama.setText(sender.cells(1,row));
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into rra_drk(kode_drk,nama,kode_lokasi,tahun) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					sql.add("update rra_drk set nama='"+this.e_nama.getText()+"' where kode_drk = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					sql.add("delete from rra_drk where kode_drk = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select nama "+
				           " from rra_drk where tahun = '"+this.e_tahun.getText()+"' and kode_drk ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_drk,nama from rra_drk where tahun = '"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by kode_drk");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
											  "select kode_drk, nama  from rra_drk where tahun = '"+this.e_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_drk) from rra_drk where tahun = '"+this.e_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result, callObj){
		if (sender == this.dbLib && this == callObj){
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
	},	
	doFind: function(){
		try{			
			var temp = this.dbLib.runSQL("select kode_drk,nama from rra_drk  "+
				" where ( upper(nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(kode_drk) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				" ) order by kode_drk ");
			
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCariKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13){
			this.doFind();
			return false;
		}
	}
});
