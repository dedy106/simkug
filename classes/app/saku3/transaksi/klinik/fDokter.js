window.app_saku3_transaksi_klinik_fDokter = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fDokter.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fDokter";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Dokter", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Dokter","Data Dokter"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:17,tag:9,
		            colTitle:["ID Dokter","Nama","Poli","Nama Poli","Jenis","Alamat","No HP","No Telpon","Email","NPWP","Bank","Cabang","No Rekening","Nama Rekening","Bank Transfer","Tarif","Status"],
					colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[50,60,80,80,80,100,80,80,80,80,80,250,60,150,60,200,60]],
					readOnly:true, colFormat:[[15],[cfNilai]],								
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"ID Dokter",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});			
		this.cb_poli = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Klinik", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,150,20],caption:"Jenis", readOnly:true, tag:1});			
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:200, tag:1});			
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"No HP", maxLength:50, tag:1});			
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,300,20],caption:"No Telpon", maxLength:50, tag:1});			
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,300,20],caption:"Email", maxLength:50, tag:1});					
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,300,20],caption:"NPWP", maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,300,20],caption:"Bank", maxLength:50, tag:1});			
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,300,20],caption:"Cabang", maxLength:100, tag:1});			
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,300,20],caption:"No Rekening", maxLength:50, tag:1});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,300,20],caption:"Nama Rekening", maxLength:50, tag:1});			
		this.e_banktrans = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Bank Transfer", maxLength:50, tag:1});			
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Tarif", tipeText:ttNilai, text:"0", tag:1});			
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,202,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		
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
			this.doLoad();
			this.cb_poli.setSQL("select kode_klinik, nama from kli_klinik where kode_lokasi='"+this.app._lokasi+"'",["kode_klinik","nama"],false,["Kode","Nama"],"and","Data Klinik",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fDokter.extend(window.childForm);
window.app_saku3_transaksi_klinik_fDokter.implement({
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
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";					
					sql.add("insert into kli_dokter(kode_dokter,kode_lokasi,nama,kode_klinik,alamat,no_hp,no_telpon,email,npwp,bank,cabang,no_rek,nama_rek,bank_trans,tarif,flag_aktif) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_poli.getText()+"','"+this.e_alamat.getText()+"','"+this.e_hp.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_banktrans.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+vSts+"')");
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
					sql.add("delete from kli_dokter where kode_dokter = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";					
					sql.add("insert into kli_dokter(kode_dokter,kode_lokasi,nama,kode_klinik,alamat,no_hp,no_telpon,email,npwp,bank,cabang,no_rek,nama_rek,bank_trans,tarif,flag_aktif) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_poli.getText()+"','"+this.e_alamat.getText()+"','"+this.e_hp.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_banktrans.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+vSts+"')");
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
					sql.add("delete from kli_dokter where kode_dokter = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nama from kli_dokter where kode_dokter ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
			if (sender == this.cb_poli && this.cb_poli.getText() != ""){
				var strSQL = "select a.kode_jenis,a.nama from kli_klinik_jenis a inner join kli_klinik b on a.kode_jenis=b.kode_jenis where b.kode_klinik ='"+this.cb_poli.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jenis.setText(line.kode_jenis);																		
					}					
				}
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
				this.e_nama.setText(this.sg1.cells(1,row));									
				this.cb_poli.setText(this.sg1.cells(2,row),this.sg1.cells(3,row));
				this.e_jenis.setText(this.sg1.cells(4,row));
				this.e_alamat.setText(this.sg1.cells(5,row));
				this.e_hp.setText(this.sg1.cells(6,row));
				this.e_tel.setText(this.sg1.cells(7,row));
				this.e_email.setText(this.sg1.cells(8,row));
				this.e_npwp.setText(this.sg1.cells(9,row));
				this.e_bank.setText(this.sg1.cells(10,row));
				this.e_cabang.setText(this.sg1.cells(11,row));
				this.e_norek.setText(this.sg1.cells(12,row));
				this.e_namarek.setText(this.sg1.cells(13,row));
				this.e_banktrans.setText(this.sg1.cells(14,row));
				this.e_tarif.setText(this.sg1.cells(15,row));				
				if (this.sg1.cells(16,row) == "1") this.c_status.setText("1.AKTIF");
				else this.c_status.setText("0.NON");
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
		var strSQL = "select a.kode_dokter,a.nama as nama_dokter,a.kode_klinik,b.nama as nama_klinik,b.kode_jenis,a.alamat,a.no_hp,a.no_telpon,a.email,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek,a.bank_trans,a.tarif,a.flag_aktif "+
		             "from kli_dokter a inner join kli_klinik b on a.kode_klinik=b.kode_klinik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'";
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
			this.sg1.appendData([line.kode_dokter,line.nama_dokter,line.kode_klinik,line.nama_klinik,line.kode_jenis,line.alamat,line.no_hp,line.no_telpon,line.email,line.npwp,line.bank,line.cabang,line.no_rek,line.nama_rek,line.bank_trans,floatToNilai(line.tarif),line.flag_aktif]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});