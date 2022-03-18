window.app_hris_master_karyawan_fSkalaAbsen = function(owner)
{
	if (owner)
	{
		window.app_hris_master_karyawan_fSkalaAbsen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_karyawan_fSkalaAbsen";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Skala Absen", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Skala",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.cb_kategori = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kategori", multiSelection:false, maxLength:10});
		this.e_min = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Nilai Min", tipeText:ttNilai, maxLength:10, text:"0"});		
		this.e_max = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Maks", tipeText:ttNilai, maxLength:10, text:"0"});		
		
		this.bTampil = new button(this,{bound:[529,13,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,600,233],caption:"Daftar Skala Absensi"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,180],tag:9,readOnly:true,
				colTitle: ["Kode Skala","Kd Ktg","Nama Kategori","Nilai Min","Nilai Maks"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,208,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kategori.setSQL("select kode_kategori, nama from gr_kategori where kode_lokasi='"+this.app._lokasi+"' ",["kode_kategori","nama"],false,["Kode","Nama"],"and","Data Kategori",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_karyawan_fSkalaAbsen.extend(window.childForm);
window.app_hris_master_karyawan_fSkalaAbsen.implement({
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
					sql.add("insert into gr_skala_absen(kode_skala,kode_kategori,jml_min,jml_max,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_kategori.getText()+"',"+parseNilai(this.e_min.getText())+","+parseNilai(this.e_max.getText())+",'"+this.app._lokasi+"')");
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
					sql.add("update gr_skala_absen set kode_kategori= '"+this.cb_kategori.getText()+"',jml_min="+parseNilai(this.e_min.getText())+",jml_max="+parseNilai(this.e_max.getText())+" where kode_skala = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from gr_skala_absen where kode_skala = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var data = this.dbLib.getDataProvider("select a.kode_kategori,b.nama,a.jml_min,a.jml_max "+
				           " from gr_skala_absen a inner join gr_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi "+
						   " where a.kode_skala ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_kategori.setText(line.kode_kategori,line.nama);
						this.e_min.setText(floatToNilai(line.jml_min));
						this.e_max.setText(floatToNilai(line.jml_max));
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
			var temp = this.dbLib.runSQL("select a.kode_skala,a.kode_kategori,b.nama,a.jml_min,a.jml_max "+
			                             "from gr_skala_absen a inner join gr_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi "+
										 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_skala");
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
			    this.standarLib.showListData(this, "Daftar Skala Absen",sender,undefined, 
											  "select kode_skala, kode_kategori  from gr_skala_absen where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_skala) from gr_skala_absen where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_skala","kode_kategori"],"and",["Kode","Kategori"],false);				
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