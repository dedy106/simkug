window.app_saku3_transaksi_dago_fPaket = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fPaket.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fPaket";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Paket", 0);	
		this.maximize();
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Paket","Data Paket"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode Paket","Nama Paket","Curr","Jenis"],
					colWidth:[[3,2,1,0],[150,70,300,80]],						
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Paket",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Nama Paket", maxLength:50,tag:1});
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Currency",readOnly:true,tag:2});
		this.cb_produk = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Jenis", multiSelection:false, maxLength:10, tag:2});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Jenis", tag:9, items:["REGULER","PLUS"],visible:false}); //gak dipake	
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Tarif Min Agen USD", tag:1, tipeText:ttNilai, text:"0"});

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,30,990,300], childPage:["Data Harga","Data Jadwal"]});					
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:2,
		            colTitle:["Kode","Keterangan ","Harga Std","Harga Semi Eks.","Harga Eks.","Fee Agen"],
					colWidth:[[5,4,3,2,1,0],[110,110,110,110,300,80]],
					columnReadOnly:[true,[0,1]],					
					colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:2,
		            colTitle:["Tanggal","Lama Hari","Q Std","Q Semi Eks.","Q Eks."],
					colWidth:[[4,3,2,1,0],[100,100,100,100,200]],					
					colFormat:[[1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsDate]],
					autoAppend:true,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg3});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doLoad();

			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("USD");
			
			this.cb_produk.setSQL("select kode_produk, nama from dgw_jenis_produk where kode_lokasi='"+this.app._lokasi+"'",["kode_produk","nama"],false,["Kode","Nama"],"and","Data Jenis Produk",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fPaket.extend(window.childForm);
window.app_saku3_transaksi_dago_fPaket.implement({
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
		
					sql.add("insert into dgw_paket(no_paket,kode_lokasi,nama,kode_curr,jenis,kode_produk,tarif_agen) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_curr.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_produk.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+")");

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_harga(no_paket,kode_harga,harga,harga_se,harga_e,fee,kode_lokasi) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+","+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(5,i))+",'"+this.app._lokasi+"')");
							}
						}						
					}

					var strSQL = "select isnull(max(no_jadwal),0) + 1 as id_jadwal from dgw_jadwal where no_paket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						var idJadwal = parseInt(line.id_jadwal);
					} 

					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								idJadwal = idJadwal + 1;
								sql.add("insert into dgw_jadwal(no_paket,no_jadwal,tgl_berangkat,lama_hari,quota,quota_se,quota_e,kode_lokasi, no_closing,kurs_closing,id_pbb) values "+
										"('"+this.cb_kode.getText()+"',"+idJadwal+",'"+this.sg3.getCellDateValue(0,i)+"',"+nilaiToFloat(this.sg3.cells(1,i))+","+
										nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+",'"+this.app._lokasi+"','-',0,'-')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from dgw_paket where no_paket = '"+this.cb_kode.getText()+"'");			
										
					sql.add("insert into dgw_paket(no_paket,kode_lokasi,nama,kode_curr,jenis,kode_produk,tarif_agen) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_curr.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_produk.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+")");

					sql.add("delete from dgw_harga where no_paket = '"+this.cb_kode.getText()+"'");
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_harga(no_paket,kode_harga,harga,harga_se,harga_e,fee,kode_lokasi) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+","+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(5,i))+",'"+this.app._lokasi+"')");
							}
						}						
					}

					var strSQL = "select isnull(max(no_jadwal),0) + 1 as id_jadwal from dgw_jadwal where no_paket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						var idJadwal = parseInt(line.id_jadwal);
					} 

					sql.add("delete from dgw_jadwal where no_paket = '"+this.cb_kode.getText()+"' and no_closing='-'");
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								idJadwal = idJadwal + 1;
								sql.add("insert into dgw_jadwal(no_paket,no_jadwal,tgl_berangkat,lama_hari,quota,quota_se,quota_e,kode_lokasi, no_closing,kurs_closing,id_pbb) values "+
										"('"+this.cb_kode.getText()+"',"+idJadwal+",'"+this.sg3.getCellDateValue(0,i)+"',"+nilaiToFloat(this.sg3.cells(1,i))+","+nilaiToFloat(this.sg3.cells(2,i))+","+
										nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+",'"+this.app._lokasi+"','-',0,'-')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					var strSQL = "select count(*) as jml from dgw_jadwal where no_closing <> '-' and  no_paket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						if (line.jml != 0) {
							system.alert(this,"Paket tidak dapat dihapus.","Terdapat jadwal yang sudah di closing.");
							return false;		
						}
					} 
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("delete from dgw_paket where no_paket = '"+this.cb_kode.getText()+"'");	
					sql.add("delete from dgw_harga where no_paket = '"+this.cb_kode.getText()+"'");
					sql.add("delete from dgw_jadwal where no_paket = '"+this.cb_kode.getText()+"' and no_closing='-'");		
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
					this.sg3.clear(1);
					this.sg4.clear(1);
				}
				break;
			case "simpan" :	
				this.simpan();
				this.sg4.clear(1);
				this.sg3.clear(1);
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
				var strSQL = "select kode_harga, nama from dgw_jenis_harga where kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_harga,line.nama,"0","0","0","0"]);
					}
				} 
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from dgw_paket where no_paket ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_nama.setText(line.nama);
						this.c_curr.setText(line.kode_curr);
						this.c_jenis.setText(line.jenis);
						this.cb_produk.setText(line.kode_produk);
						this.e_tarif.setText(floatToNilai(line.tarif_agen));
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
				var strSQL = "select a.no_paket,b.kode_harga,a.harga,a.harga_se,a.harga_e,a.fee, b.nama "+
							 "from dgw_harga a "+
							 "inner join dgw_jenis_harga b on a.kode_harga = b.kode_harga and a.kode_lokasi = b.kode_lokasi "+
							 "where no_paket='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_harga,line.nama,floatToNilai(line.harga),floatToNilai(line.harga_se),floatToNilai(line.harga_e),floatToNilai(line.fee)]);
					}
				} 
				var strSQL = "select no_jadwal,convert (varchar, tgl_berangkat,103) as tgl_berangkat,lama_hari,quota,quota_se, quota_e from dgw_jadwal where no_closing = '-' and no_paket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.tgl_berangkat,line.lama_hari,line.quota,line.quota_se,line.quota_e]);
					}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.no_paket, a.nama, a.kode_curr, b.nama as jenis from dgw_paket a inner join dgw_jenis_produk b on a.kode_produk = b.kode_produk where a.kode_lokasi='"+this.app._lokasi+"'" ;			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_paket,line.nama,line.kode_curr,line.jenis]); 							
			}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));
			}			
		} catch(e) {alert(e);}
	}
});