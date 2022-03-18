window.app_saku3_transaksi_tm_fHutUmumLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fHutUmumLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fHutUmumLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Hutang Umum [Load]", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[720,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false}); 
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_total = new saiLabelEdit(this,{bound:[790,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Akru","Data Validasi"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:15,tag:9,
				colTitle:["Kode PBF","Nama PBF","Kode PP","Tgl Invoice","No Invoice","No FPajak","Tgl FPajak","Kredit","Harga","Diskon","Hrg Diskon","PPN","Hrg +PPN","Tgl JthTempo","Jenis Trans"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,80,80,80,80,80,80,80,150,150,80,80,200,80]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});	

		this.rearrangeChild(10, 23);		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPNM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;		
				}
			}			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fHutUmumLoad.extend(window.childForm);
window.app_saku3_transaksi_tm_fHutUmumLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
			this.doValid();

			var tot = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){
				if (this.sg1.cells(12,i) != "") {
					tot += nilaiToFloat(this.sg1.cells(12,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));
			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValid: function() {
		try {
			this.inValid = false;	
			
			//cek duplikasi no invoice
			for (var i=0; i < this.sg1.getRowCount();i++){
				for (var j=0; j < this.sg1.getRowCount();j++){
					if (this.sg1.cells(4,i) == this.sg1.cells(4,j) && i!=j) {
						this.sg1.cells(4,j,"INVALID||"+this.sg1.cells(4,j));
						this.inValid = true;
					}												
				}									
			}

			//data pp dan periode invoice
			var strSQL = "select kode_pp from pp where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'";			
			var dataTmp = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
				this.dataPP = dataTmp;
			}		
						
			for (var i=0; i < this.sg1.getRowCount();i++){
				//cek tgl masuk periode
				if (this.sg1.cells(3,i).substr(0,4)+this.sg1.cells(3,i).substr(5,2) != this.e_periode.getText()) {
					this.sg1.cells(3,i,"INVALID||"+this.sg1.cells(3,i));
					this.inValid = true;
				}
				this.sg1.cells(2,i,"INVALID||"+this.sg1.cells(2,i));

				for (var j=0;j < this.dataPP.rs.rows.length;j++){
					if (this.sg1.cells(2,i).substr(9,10) == this.dataPP.rs.rows[j].kode_pp) {
						this.sg1.cells(2,i,this.sg1.cells(2,i).substr(9,10));				
					}
				}	
				if (this.sg1.cells(2,i).substr(0,7) == "INVALID") this.inValid = true;									
			}

			//data vendor
			var strSQL = "select kode_vendor from vendor where kode_lokasi='"+this.app._lokasi+"'";			
			var dataTmp = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
				this.dataVendor = dataTmp;
			}								
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(0,i,"INVALID||"+this.sg1.cells(0,i));
				for (var j=0;j < this.dataVendor.rs.rows.length;j++){
					if (this.sg1.cells(0,i).substr(9,10) == this.dataVendor.rs.rows[j].kode_vendor) {
						this.sg1.cells(0,i,this.sg1.cells(0,i).substr(9,10));				
					}
				}	
				if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;									
			}

			//data jenis
			var strSQL = "select kode_pp, kode_jenis, akun_debet,akun_kredit from tm_hutang_jenis where kode_lokasi='"+this.app._lokasi+"'";			
			var dataTmp = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
				this.dataJenis = dataTmp;
			}		
						
			for (var i=0; i < this.sg1.getRowCount();i++){				
				this.sg1.cells(14,i,"INVALID||"+this.sg1.cells(14,i));
				for (var j=0;j < this.dataJenis.rs.rows.length;j++){
					if (this.sg1.cells(14,i).substr(9,10) == this.dataJenis.rs.rows[j].kode_jenis && this.sg1.cells(2,i) == this.dataJenis.rs.rows[j].kode_pp ) {
						this.sg1.cells(14,i,this.sg1.cells(14,i).substr(9,10));				
					}
				}	
				if (this.sg1.cells(14,i).substr(0,7) == "INVALID") this.inValid = true;									
			}

			//rekap
			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(2,i).substr(0,7) == "INVALID" || this.sg1.cells(0,i).substr(0,7) == "INVALID" || this.sg1.cells(4,i).substr(0,7) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);						
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					var IDdok = this.standarLib.noBuktiOtomatis(this.dbLib,"tm_hutang_m","no_dokumen",this.app._lokasi+"-HL"+this.e_periode.getText().substr(2,4)+".","0000");						
					
					for (var i=0;i < this.sg1.getRowCount();i++){									
						if (this.sg1.rowValid(i)){	

							for (var j=0;j < this.dataJenis.rs.rows.length;j++){
								if (this.sg1.cells(14,i) == this.dataJenis.rs.rows[j].kode_jenis) {
									this.akunDebet = this.dataJenis.rs.rows[j].akun_debet;
									this.akunKredit = this.dataJenis.rs.rows[j].akun_kredit;
								}
							}	
								
							sql.add("insert into tm_hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_jenis,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref,no_fp,no_spb, bruto,diskon,due_date, nilai_pph,tgl_fp,lama) values  "+
									"('"+this.sg1.cells(4,i)+"','"+this.app._lokasi+"','"+IDdok+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(14,i)+"','"+this.sg1.cells(0,i)+"','IDR',1,'"+this.app._userLog+"','"+this.sg1.cells(2,i)+"',"+nilaiToFloat(this.sg1.cells(12,i))+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunKredit+"','F',"+nilaiToFloat(this.sg1.cells(11,i))+",'HUTUM','-','"+this.sg1.cells(5,i)+"','-',"+nilaiToFloat(this.sg1.cells(8,i))+","+nilaiToFloat(this.sg1.cells(9,i))+",'"+this.sg1.cells(13,i)+"',0,'"+this.sg1.cells(6,i)+"',"+nilaiToFloat(this.sg1.cells(7,i))+")");

							sql.add("insert into tm_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.sg1.cells(4,i)+"','"+IDdok+"','"+this.sg1.cells(3,i)+"',0,'"+this.akunDebet+"','"+this.sg1.cells(4,i)+"' ,'D','IDR',1,"+parseNilai(this.sg1.cells(10,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+this.sg1.cells(2,i)+"','-','"+this.app._lokasi+"','HUTUM','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							sql.add("insert into tm_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.sg1.cells(4,i)+"','"+IDdok+"','"+this.sg1.cells(3,i)+"',2,'"+this.akunKredit+"','"+this.sg1.cells(4,i)+"','C','IDR',1,"+parseNilai(this.sg1.cells(12,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+this.sg1.cells(2,i)+"','-','"+this.app._lokasi+"','HUTUM','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

							sql.add("insert into tm_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.sg1.cells(4,i)+"','"+IDdok+"','"+this.sg1.cells(3,i)+"',1,'"+this.akunPPN+"','"+this.sg1.cells(4,i)+"','D','IDR',1,"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(11,i))+",'"+this.sg1.cells(2,i)+"','-','"+this.app._lokasi+"','HUTUM','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg1.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
				break;
			case "simpan" :		
				
				this.dataINV = {rs:{rows:[]}};																							
				var strSQL = "select no_hutang from tm_hutang_m where kode_lokasi='"+this.app._lokasi+"'";
				var dataTmp = this.dbLib.getDataProvider(strSQL,true);
				if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
					this.dataINV = dataTmp;
				}									
				for (var i=0; i < this.sg1.getRowCount();i++){					
					for (var j=0;j < this.dataINV.rs.rows.length;j++){
						if (this.sg1.cells(4,i) == this.dataINV.rs.rows[j].no_hutang) {
							system.alert(this,"No Invoice sudah terpakai.","No Invoice : "+this.sg1.cells(4,i));
							return false;
						}
					}						
				}
			
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Hutang tidak boleh nol atau kurang.");
					return false;						
				}
				// if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
				// 	system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				// 	return false;
				// }
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;									
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});