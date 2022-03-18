window.app_saku3_transaksi_travel_prod_fTiket = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fTiket.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fTiket";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tiket Mitra", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Tiket","Data Tiket"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		            colTitle:["ID PNR","Deskripsi","Vendor","Curr","Nilai","PAX"],
					colWidth:[[5,4,3,2,1,0],[100,100,70,250,250,100]],
					readOnly:true,
					colFormat:[[5,4],[cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"ID PNR",maxLength:10,change:[this,"doChange"]});		
		this.cb_jenis = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Jenis Tiket", multiSelection:false, tag:2});												
		this.cb_vendor = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Mitra", multiSelection:false, tag:2});												
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:200, tag:1});
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,22],caption:"Kurs", tag:2,readOnly:true, tipeText:ttNilai, text:"0"});								
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Berangkat", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_jml = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Jumlah PAX", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_harga = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Harga", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.iFoto = new image(this.pc1.childPage[1],{bound:[700,20,160,180]});

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			this.cb_jenis.setSQL("select kode_jenis, nama from dgw_jenis_tiket where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);

			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr where kode_curr in ('IDR','USD')",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			
			this.c_curr.setText("IDR");		
			this.doChange(this.c_curr);

			this.doLoad();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fTiket.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fTiket.implement({	
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
					//kurs yg dicatat adalah kurs acuan.. kurs sebetulnya adalah saat closing sbg saldo hutang awal (jika ada tiket yg belum dibayar lunas ke mitra)	
					sql.add("insert into dgw_tiket(kode_tiket,kode_lokasi,nik_user,tgl_input,kode_vendor,tgl_berangkat,nama,jumlah,harga,nilai,kode_curr,kurs,no_closing,sawal_hutang,kode_jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"',"+nilaiToFloat(this.e_jml.getText())+","+nilaiToFloat(this.e_harga.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'-',0,'"+this.cb_jenis.getText()+"')");		
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
					sql.add("delete from dgw_tiket where kode_tiket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("insert into dgw_tiket(kode_tiket,kode_lokasi,nik_user,tgl_input,kode_vendor,tgl_berangkat,nama,jumlah,harga,nilai,kode_curr,kurs,no_closing,sawal_hutang,kode_jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"',"+nilaiToFloat(this.e_jml.getText())+","+nilaiToFloat(this.e_harga.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'-',0,'"+this.cb_jenis.getText()+"')");		
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
					sql.add("delete from dgw_tiket where kode_tiket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				else this.simpan();
				break;							
			case "ubah" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				else this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from dgw_tiket where kode_tiket ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.cb_jenis.setText(line.kode_jenis);
						this.cb_vendor.setText(line.kode_vendor);
						this.c_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.dp_d1.setText(line.tgl_berangkat);
						this.e_jml.setText(floatToNilai(line.jumlah));
						this.e_harga.setText(floatToNilai(line.harga));
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}

			if (sender == this.c_curr && this.c_curr.getText() != ""){
				if (this.c_curr.getText() == "IDR") {					
					this.e_kurs.setReadOnly(true);
					this.e_kurs.setText("1");					
				}
				else {
					this.e_kurs.setReadOnly(false);
					var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = 'USD' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_kurs.setText(floatToNilai(line.kurs));	
						}					
					}
				}
			}

			if ((sender == this.e_jml || sender == this.e_harga) && this.e_jml.getText() != "" && this.e_harga.getText() != ""){
				var tot = nilaiToFloat(this.e_jml.getText()) * nilaiToFloat(this.e_harga.getText());
				this.e_nilai.setText(floatToNilai(tot));
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));									
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
		var strSQL = "select a.*,b.kode_vendor+' | '+b.nama as  vendor from dgw_tiket a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_closing='-'";
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_tiket,line.nama,line.vendor,line.kode_curr,floatToNilai(line.nilai),floatToNilai(line.jumlah)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
