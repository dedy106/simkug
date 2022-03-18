window.app_saku3_transaksi_sapyakes_if_fNikIF = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_if_fNikIF.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_if_fNikIF";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pemegang Imprest Fund", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");	
		this.cb_lokasi = new saiCBBL(this,{bound:[20,13,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});			
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Pemegang","Data I/F"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["NIK","Nama","PP","No Dokumen","Keterangan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,200,150,200,200,70]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_nik = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"NIK",tag:0,multiSelection:false,change:[this,"doChange"]});				
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,512,20],caption:"PP/Unit", readOnly:true});				
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Appr Pengajuan",tag:0,multiSelection:false,change:[this,"doChange"]});				
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,512,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,512,20],caption:"Keterangan", maxLength:200});	
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Kode Vendor SAP", maxLength:20,tag:2});			
		this.e_reksap = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Rekening SAP", maxLength:20, tag:2});			
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai IF", tag:1, tipeText:ttNilai, text:"0"});
		this.cb_rek = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Akun IF",tag:0,multiSelection:false});				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		
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

			if (this.app._userStatus == "A")
				this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			else this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);

			this.cb_lokasi.setText(this.app._lokasi);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_if_fNikIF.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_if_fNikIF.implement({
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
					sql.add("insert into if_m(nik,kode_lokasi,kode_pp,nilai,no_dokumen,keterangan,flag_aktif,kode_rek,kode_vendor,rek_sap, nik_app) values "+
						    "('"+this.cb_nik.getText()+"','"+this.cb_lokasi.getText()+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.cb_rek.getText()+"','"+this.e_vendor.getText()+"','"+this.e_reksap.getText()+"','"+this.cb_app.getText()+"')");
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
					sql.add("delete from if_m where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					sql.add("insert into if_m(nik,kode_lokasi,kode_pp,nilai,no_dokumen,keterangan,flag_aktif,kode_rek,kode_vendor,rek_sap,nik_app) values "+
						    "('"+this.cb_nik.getText()+"','"+this.cb_lokasi.getText()+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.cb_rek.getText()+"','"+this.e_vendor.getText()+"','"+this.e_reksap.getText()+"','"+this.cb_app.getText()+"')");
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
					sql.add("delete from if_m where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
					this.doLoad();
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
			if (sender == this.cb_lokasi && this.cb_lokasi.getText()!="") {
				this.doLoad();

				this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.cb_lokasi.getText()+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
				this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.cb_lokasi.getText()+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
				this.cb_rek.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								   "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' and b.kode_flag in ('001','009')",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);				
			}

			if (sender == this.cb_nik && this.cb_nik.getText() != ""){
				var strSQL = "select a.rek_sap,a.kode_rek,a.flag_aktif,a.nik,b.kode_pp,b.kode_pp+' - '+b.nama as pp,a.nilai,a.no_dokumen,a.keterangan,a.kode_vendor,a.nik_app "+
							 "from if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.nik ='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.kodePP = line.kode_pp;
						this.e_pp.setText(line.pp);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_rek.setText(line.kode_rek);
						this.cb_app.setText(line.nik_app);

						this.e_vendor.setText(line.kode_vendor);
						this.e_reksap.setText(line.rek_sap);
						
						if (line.flag_aktif == "1") this.c_status.setText("1. AKTIF"); 
						else this.c_status.setText("0. NONAKTIF"); 
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);						
						setTipeButton(tbSimpan);	
						
						var data = this.dbLib.getDataProvider("select flag,keterangan from spro where kode_spro = 'VENDORIF' and kode_lokasi='"+this.cb_lokasi.getText()+"'",true);			
						if (typeof data == "object"){
							var line = data.rs.rows[0];											
							//this.e_vendor.setText(line.flag);					
							this.e_reksap.setText(line.keterangan);										
						}
						

						var data = this.dbLib.getDataProvider("select a.kode_pp,b.kode_pp+' - '+b.nama as pp from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){													
								this.e_pp.setText(line.pp);													
								this.kodePP = line.kode_pp;
							}
						}					
						this.standarLib.clearByTag(this, new Array("1"),undefined);						
						this.e_dok.setText("");
						this.e_ket.setText("");
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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
		if (this.cb_lokasi.getText()!="") {							
			var strSQL = "select a.nik,a.nama,a.kode_pp+' - '+b.nama as pp,c.no_dokumen,c.keterangan,c.nilai "+
						 "from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+
						 "                inner join if_m c on a.nik=c.nik "+
					 	 "where c.flag_aktif ='1' and c.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nik";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
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
			this.sg1.appendData([line.nik,line.nama,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.cb_nik.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
	}
});