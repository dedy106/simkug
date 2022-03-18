window.app_saku3_transaksi_yakes21_bmhd_fVendor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_bmhd_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_bmhd_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,13,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Vendor","Data Vendor","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Alamat","Kelompok","Pilih"],
					colWidth:[[4,3,2,1,0],[70,150,350,200,80]],
					readOnly:true,
					colFormat:[[4],[cfButton]],
					click:[this,"doPilihClick"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1,change:[this,"doChange"]});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_mail = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,15,230,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_pictel = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,18,230,20],caption:"No Tel PIC", maxLength:50, tag:1});				
		this.cb_yam = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"NIK YAM", multiSelection:false, maxLength:10, tag:0});						

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,5,996,210], childPage:["Data Pelengkap","Rekening Bank"]});								
		this.cb_klp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Kelompok Vendor", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});								
		// this.cb_akun1= new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun Hutang1",  readOnly:true,tag:0});						
		// this.cb_akun2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Akun Hutang2", readOnly:true,tag:0});										
		this.cb_pph = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Akun Hut. PPh", multiSelection:false, maxLength:10, tag:0});						
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,22,200,20],caption:"Jenis Kapitasi",items:["NON","KAPITASI"], readOnly:true,tag:2});	
		
		this.sgRek = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:0,
					colTitle:["Bank Transfer","Bank","Cabang","No Rekening","Nama Rekening","Default"],
					colWidth:[[5,4,3,2,1,0],[80,200,200,200,150,100]],
					buttonStyle:[[0,5],[bsAuto,bsAuto]], 
					picklist:[[0,5],[new portalui_arrayMap({items:["MANDIRI","BNI","BRI","X-MANDIRI"]}), new portalui_arrayMap({items:["1-YA","0-TIDAK"]})]],checkItem: true,					
					defaultRow:1,autoAppend:true});
		this.sgnRek = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgRek});	

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			if (this.app._lokasi == "99") this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);						
			else this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);						
			
			// this.cb_akun1.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			// this.cb_akun2.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pph.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_yam.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.onClose.set(this,"doClose");			
			this.cb_lokasi.setText(this.app._lokasi);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_bmhd_fVendor.extend(window.childForm);
window.app_saku3_transaksi_yakes21_bmhd_fVendor.implement({
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

					sql.add("insert into vendor(kode_vendor,kode_lokasi,nama,alamat,no_tel,email,npwp,pic,alamat2,no_pictel,kode_klpvendor,akun_pph,jenis,nik_yam) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_pictel.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_pph.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_yam.getText()+"')"); 
					
					if (this.sgRek.getRowValidCount() > 0){
						for (var i=0;i < this.sgRek.getRowCount();i++){
							if (this.sgRek.rowValid(i)){								
								sql.add("insert into vendor_rek(kode_vendor,kode_lokasi,nu,bank_trans,bank,cabang,no_rek,nama_rek,status) values "+
										"('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"',"+i+",'"+this.sgRek.cells(0,i)+"','"+this.sgRek.cells(1,i)+"','"+this.sgRek.cells(2,i)+"','"+this.sgRek.cells(3,i)+"','"+this.sgRek.cells(4,i)+"','"+this.sgRek.cells(5,i).substr(0,1)+"')");
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
					
					sql.add("delete from vendor where kode_vendor = '"+this.cb_kode.getText()+"' ");			
					sql.add("delete from vendor_rek where kode_vendor = '"+this.cb_kode.getText()+"' ");			

					sql.add("insert into vendor(kode_vendor,kode_lokasi,nama,alamat,no_tel,email,npwp,pic,alamat2,no_pictel,kode_klpvendor,akun_pph,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.kdLokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_pictel.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_pph.getText()+"','"+this.c_jenis.getText()+"')"); 
					
					if (this.sgRek.getRowValidCount() > 0){
						for (var i=0;i < this.sgRek.getRowCount();i++){
							if (this.sgRek.rowValid(i)){								
								sql.add("insert into vendor_rek(kode_vendor,kode_lokasi,nu,bank_trans,bank,cabang,no_rek,nama_rek,status) values "+
										"('"+this.cb_kode.getText()+"','"+this.kdLokasi+"',"+i+",'"+this.sgRek.cells(0,i)+"','"+this.sgRek.cells(1,i)+"','"+this.sgRek.cells(2,i)+"','"+this.sgRek.cells(3,i)+"','"+this.sgRek.cells(4,i)+"','"+this.sgRek.cells(5,i).substr(0,1)+"')");
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from vendor where kode_vendor = '"+this.cb_kode.getText()+"'");			
					sql.add("delete from vendor_rek where kode_vendor = '"+this.cb_kode.getText()+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :	
				var jumDef = 0;
				for (var i=0;i < this.sgRek.getRowCount();i++){
					if (this.sgRek.rowValid(i)){								
						if (this.sgRek.cells(5,i).substr(0,1) == "1") jumDef = jumDef+1;												
					}
				}
				if (jumDef != 1) {
					system.alert(this,"Data tidak valid.","Jumlah rekening default harus ada 1.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				var jumDef = 0;
				for (var i=0;i < this.sgRek.getRowCount();i++){
					if (this.sgRek.rowValid(i)){								
						if (this.sgRek.cells(5,i).substr(0,1) == "1") jumDef = jumDef+1;						
					}
				}				
				if (jumDef != 1) {
					system.alert(this,"Data tidak valid.","Jumlah rekening default harus ada 1.");
					return false;
				}
				else 
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			// if (sender == this.cb_klp && this.cb_klp.getText() != ""){				
			// 	var strSQL = "select bp_hut,cc_hut  "+
			// 	             "from vendor_klp "+
			// 			     "where kode_klpvendor ='"+this.cb_klp.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' ";						   				
			// 	var data = this.dbLib.getDataProvider(strSQL,true);
			// 	if (typeof data == "object"){
			// 		var line = data.rs.rows[0];							
			// 		if (line != undefined){												
			// 			this.cb_akun1.setText(line.bp_hut);
			// 			this.cb_akun2.setText(line.cc_hut);
			// 		}
			// 	}				
			// }
			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {
				this.cb_klp.setSQL("select kode_klpvendor, nama from vendor_klp where kode_lokasi='"+this.cb_lokasi.getText()+"'",["kode_klpvendor","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);			
				this.doLoad();
			}
			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_lokasi,kode_vendor,nama,alamat,no_tel,email,npwp,alamat2,pic,bank,cabang,no_rek,nama_rek,no_fax,no_pictel,spek,kode_klpvendor,penilaian,bank_trans,akun_pph,jenis,kode_rek,kode_sap,nik_yam "+//,flag 
				             "from vendor "+
						     "where kode_vendor ='"+this.cb_kode.getText()+"' ";						   
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[strSQL]}),true);				
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					if (line != undefined){		
						//this.cb_lokasi.setText(line.kode_lokasi);				
						this.kdLokasi = line.kode_lokasi;				
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);						
						this.e_pictel.setText(line.no_pictel);
						this.cb_klp.setText(line.kode_klpvendor)
						this.cb_pph.setText(line.akun_pph)
						this.c_jenis.setText(line.jenis);
						this.cb_yam.setText(line.nik_yam)		
						
						var data = this.dbLib.getDataProvider("select *, case when status = '1' then '1-YA' else '0-TIDAK' end as sts from vendor_rek where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' order by nu",true);							
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgRek.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																				
								this.sgRek.appendData([line.bank_trans,line.bank,line.cabang,line.no_rek,line.nama_rek,line.sts.toUpperCase()]);
							}
						} else this.sgRek.clear(1);	
						
						setTipeButton(tbUbah);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
												
			}
			if (sender == this.e_alamat && this.e_alamat.getText() != ""){
				this.e_alamat2.setText(this.e_alamat.getText());
			}
			if (sender == this.e_nama && this.e_nama.getText() != ""){
				this.e_namarek.setText(this.e_nama.getText());
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
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " a.kode_vendor like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.kode_vendor,a.nama,a.alamat,a.kode_klpvendor+' - '+b.nama as klp,a.bank_trans,a.bank+' - '+a.cabang as bank,a.no_rek+' - '+a.nama_rek as rek,a.kode_klpvendor "+
						 "from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where "+filter+" a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_klpvendor,a.kode_vendor";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.kode_vendor,a.nama,a.alamat,a.kode_klpvendor+' - '+b.nama as klp,a.bank_trans,a.bank+' - '+a.cabang as bank,a.no_rek+' - '+a.nama_rek as rek,a.kode_klpvendor "+
						 "from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_klpvendor,a.kode_vendor";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
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
			this.sg1.appendData([line.kode_vendor,line.nama,line.alamat,line.klp,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doPilihClick: function(sender, col, row){
		try{
			if (col === 4) {
				this.doDoubleClick(this.sg1,0,row);
			}
		}catch(e){
			alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});