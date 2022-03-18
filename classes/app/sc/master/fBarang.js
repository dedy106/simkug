window.app_sc_master_fBarang = function(owner)
{
	if (owner)
	{
		window.app_sc_master_fBarang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_master_fBarang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Barang", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50});		
		this.e_tipe = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Spesifikasi", maxLength:100});						
		this.e_satuan = new saiCB(this,{bound:[20,16,200,20],caption:"Satuan",tag:2,maxLength:10,checkItem:false});
		this.e_harga = new saiLabelEdit(this,{bound:[20,13,180,20],caption:"Harga", tipeText:ttNilai, text:"0"});		
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});
		this.cb_jenis = new saiCBBL(this,{bound:[20,15,200,20],caption:"Jenis", multiSelection:false, maxLength:10, tag:2});		
		/*
		this.bTampil = new button(this,{bound:[829,15,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});					
		this.p1 = new panel(this,{bound:[10,23,900,363],caption:"Daftar Barang"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,330],tag:9,readOnly:true,colTitle:["Kode","Nama","Spesifikasi","Satuan","Harga","Jenis","Vendor"]});
		this.sgn = new sgNavigator(this.p1,{bound:[0,358,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		*/
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.cb_jenis.setSQL("select kode_jenis, nama from sc_jenis",["kode_jenis","nama"],false,["Kode","Nama"],"where","Data Jenis Barang",true);
			this.cb_vendor.setSQL("select kode_vendor, nama from sc_vendor",["kode_vendor","nama"],false,["Kode","Nama"],"where","Data Vendor",true);
			this.e_satuan.items.clear();
			var data = this.dbLib.getDataProvider(
						"select distinct satuan from sc_barang",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.e_satuan.addItem(i,line.satuan);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_master_fBarang.extend(window.childForm);
window.app_sc_master_fBarang.implement({
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
					sql.add("insert into sc_barang(kode_brg,kode_jenis,nama,tipe,harga,kode_vendor,nik_user,tgl_input,satuan) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_jenis.getText()+"','"+this.e_nama.getText()+"','"+this.e_tipe.getText()+"',"+parseNilai(this.e_harga.getText())+",'"+this.cb_vendor.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_satuan.getText()+"')");
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
					sql.add("update sc_barang set satuan='"+this.e_satuan.getText()+"',nama='"+this.e_nama.getText()+"',kode_jenis='"+this.cb_jenis.getText()+"',tipe='"+this.e_tipe.getText()+"',harga="+parseNilai(this.e_harga.getText())+",kode_vendor='"+this.cb_vendor.getText()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate()  where kode_brg = '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from sc_barang where kode_brg = '"+this.cb_kode.getText()+"'");			
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
				var strSQL = "select a.nama,a.kode_jenis,a.tipe,a.satuan,a.harga,a.kode_vendor,b.nama as nama_jenis,c.nama as nama_vendor  "+
				             " from sc_barang a inner join sc_jenis b on a.kode_jenis=b.kode_jenis inner join sc_vendor c on a.kode_vendor=c.kode_vendor "+
						     " where a.kode_brg ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_tipe.setText(line.tipe);
						this.e_satuan.setText(line.satuan);
						this.e_harga.setText(floatToNilai(line.harga));
						this.cb_jenis.setText(line.kode_jenis,line.nama_jenis);
						this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
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
	/*
	doTampilClick: function(sender){
		try{						
			var strSQL = "select a.kode_brg,a.nama,a.tipe,a.satuan,a.harga,a.kode_jenis+' - '+b.nama as jenis,a.kode_vendor+' - '+c.nama as vendor  "+
				         "from sc_barang a inner join sc_jenis b on a.kode_jenis=b.kode_jenis "+
					     "                 inner join sc_vendor c on a.kode_vendor=c.kode_vendor "+
						 "order by b.kode_jenis,a.kode_brg";
			var temp = this.dbLib.runSQL(strSQL);
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
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	*/
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
											  "select kode_brg, nama  from sc_barang ",
											  "select count(kode_brg) from sc_barang ",
											  ["kode_brg","nama"],"where",["Kode","Nama"],false);				
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