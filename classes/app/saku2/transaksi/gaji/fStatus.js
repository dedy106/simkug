window.app_saku2_transaksi_gaji_fStatus = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fStatus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fStatus";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data struk", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:50});		
		this.e_idx = new saiLabelEdit(this,{bound:[20,13,180,20],caption:"Idx Tarif Posisi %", tipeText:ttNilai,text:0});		
		this.cb_aktif = new portalui_checkBox(this,{bound:[120,11,100,20],caption:"Status Aktif", selected:false});	
		this.bTampil = new button(this,{bound:[529,11,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,600,401],caption:"Daftar Lokasi Kerja"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,350],tag:9,readOnly:true,colTitle: ["Kode","Nama","Status","Flag Aktif","Index Posisi"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,375,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fStatus.extend(window.childForm);
window.app_saku2_transaksi_gaji_fStatus.implement({
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
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					sql.add("insert into hr_status_sdm(sts_sdm,nama,kode_lokasi,flag_aktif,idx) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+flag_aktif+"',"+parseNilai(this.e_idx.getText())+")");
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
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					sql.add("update hr_status_sdm set idx="+parseNilai(this.e_idx.getText())+",nama = '"+this.e_nama.getText()+"',flag_aktif='"+flag_aktif+"' where sts_sdm = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from hr_status_sdm where sts_sdm = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				this.cb_aktif.setSelected(false);
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
				this.cb_aktif.setSelected(false);
				var data = this.dbLib.getDataProvider("select nama,flag_aktif,idx "+
				           " from hr_status_sdm where sts_sdm ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_idx.setText(floatToNilai(line.idx));
						if (line.flag_aktif=="1")
						{
							this.cb_aktif.setSelected(true);
						}
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
			var temp = this.dbLib.runSQL("select sts_sdm,nama,flag_aktif,idx from hr_status_sdm where kode_lokasi='"+this.app._lokasi+"' order by sts_sdm");
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
			    this.standarLib.showListData(this, "Daftar Lokasi Kerja",sender,undefined, 
											  "select sts_sdm, nama  from hr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(sts_sdm) from hr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["sts_sdm","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
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