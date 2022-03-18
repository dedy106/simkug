window.app_saku3_transaksi_siaga_simlog_fVendor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_simlog_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_simlog_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Vendor","Data Vendor"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode","Nama","Alamat","Kelompok","Bank Transfer","Bank","Rekening"],
					colWidth:[[6,5,4,3,2,1,0],[150,200,80,150,250,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Kelompok Vendor", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});						
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",readOnly:true, maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1,change:[this,"doChange"]});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"No Faximile", maxLength:50, tag:1});
		this.e_mail = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,15,230,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_pictel = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,18,230,20],caption:"No Tel PIC", maxLength:50, tag:1});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,250,20],caption:"Bank", maxLength:50, tag:1});			
		this.c_btrans = new saiCB(this.pc1.childPage[1],{bound:[290,12,230,20],caption:"Bank Transfer",items:["MANDIRI","BNI"], readOnly:true,tag:2});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Cabang", maxLength:50, tag:1});			
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"No Rekening", maxLength:50, tag:1});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Nama Rekening", maxLength:50, tag:1});							
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,250,20],caption:"Penilaian", maxLength:50, tag:1});
		this.e_spek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Spesifikasi", maxLength:200, tag:1});				
		this.cb_pph = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,270,20],caption:"Akun Hut. PPh", multiSelection:false, maxLength:10, tag:0});						
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,22,202,20],caption:"Jenis Kapitasi",items:["NON","KAPITASI"], readOnly:true,tag:2});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
			
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.cb_klp.setSQL("select kode_klpvendor, nama from vendor_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klpvendor","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);			
			this.cb_pph.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.onClose.set(this,"doClose");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.doLoad();
			this.stsSimpan = 1;
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fVendor.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fVendor.implement({
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
					sql.add("insert into vendor(kode_vendor,kode_lokasi,nama,alamat,no_telp,email,npwp,pic,alamat2,bank,cabang,no_rek,nama_rek,no_fax,no_pictel,spek,kode_klpvendor,penilaian,bank_trans,pph,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_fax.getText()+"','"+this.e_pictel.getText()+"','"+this.e_spek.getText()+"','"+this.cb_klp.getText()+"','"+this.e_nilai.getText()+"','"+this.c_btrans.getText()+"','"+this.cb_pph.getText()+"','"+this.c_jenis.getText()+"')"); //,'"+this.c_flag.getText().substr(0,1)+"'
					
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
					
					sql.add("update vendor set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',no_telp='"+this.e_tel.getText()+"',email='"+this.e_mail.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',alamat2='"+this.e_alamat2.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',no_fax='"+this.e_fax.getText()+"',no_pictel='"+this.e_pictel.getText()+"',spek='"+this.e_spek.getText()+"',kode_klpvendor='"+this.cb_klp.getText()+"',penilaian='"+this.e_nilai.getText()+"',bank_trans='"+this.c_btrans.getText()+"',akun_pph='"+this.cb_pph.getText()+"',jenis='"+this.c_jenis.getText()+"' "+ //,flag='"+this.c_flag.getText().substr(0,1)+"'
					        "where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					sql.add("delete from vendor_dok where kode_vendor='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					//this.sgUpld.clear(1); this.sg2.clear(1); this.sgFile.clear(1);
					this.doLoad();
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;
				}
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
			if (sender == this.cb_klp && this.cb_klp.getText()!="" && this.stsSimpan==1) {
				var kodevendor = this.standarLib.noBuktiOtomatis(this.dbLib,"vendor","kode_vendor",this.cb_klp.getText(),"000");				
				this.cb_kode.setText(kodevendor);
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_vendor,nama,alamat,no_telp,email,npwp,alamat2,pic,bank,cabang,no_rek,nama_rek,no_fax,no_pictel,spek,kode_klpvendor,penilaian,bank_trans,akun_pph,jenis "+//,flag 
				             "from vendor "+
						     "where kode_vendor ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);				   			
				if (typeof data == "object"){
					var line = data.rs.rows[0];								
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_telp);						
						this.e_fax.setText(line.no_fax);						
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);						
						this.e_pictel.setText(line.no_pictel);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.cb_klp.setText(line.kode_klpvendor)
						this.cb_pph.setText(line.akun_pph)
						this.e_spek.setText(line.spek);
						this.e_nilai.setText(line.penilaian);
						this.c_btrans.setText(line.bank_trans);
						this.c_jenis.setText(line.jenis);
												
						setTipeButton(tbUbah);
						this.stsSimpan = 0;
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
						this.stsSimpan = 1;
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
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
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
	
	doLoad:function(sender){								
		try {
			var strSQL = "select a.kode_vendor,a.nama,a.alamat,a.kode_klpvendor+' - '+b.nama as klp,a.bank_trans,a.bank+' - '+a.cabang as bank,a.no_rek+' - '+a.nama_rek as rek,a.kode_klpvendor "+
						 "from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_klpvendor,a.kode_vendor";				
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
			this.sg1.appendData([line.kode_vendor,line.nama,line.alamat,line.klp,line.bank_trans,line.bank,line.rek]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				//this.e_nama.setText(this.sg1.cells(1,row));	
				this.stsSimpan = 0;				
			}
		} catch(e) {alert(e);}
	}
});