window.app_saku2_transaksi_kopeg_bengkel_fAppFinalE3 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fAppFinalE3.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fAppFinalE3";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Invoice: Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Final", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,10,182,20],caption:"Jenis KBM",items:["BUS","CAR"],readOnly:true,tag:2});
		this.e_nofaktur = new saiLabelEdit(this,{bound:[268,10,202,20],caption:"No Faktur",maxLength:6});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"Kode Customer",multiSelection:false,tag:2});	
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approval",multiSelection:false,tag:2});		
		this.e_memojasa = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan Jasa"});	
		this.e_memo = new saiMemo(this,{bound:[20,12,450,50],caption:"Catatan",tag:2});
		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,21,202,20],caption:"Total Part", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_diskon = new saiLabelEdit(this,{bound:[268,21,202,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ppn = new saiLabelEdit(this,{bound:[520,21,202,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_service = new saiLabelEdit(this,{bound:[20,22,202,20],caption:"Service Charge", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_sblm = new saiLabelEdit(this,{bound:[268,22,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_total = new saiLabelEdit(this,{bound:[520,22,202,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc2 = new pageControl(this,{bound:[20,20,950,380], childPage:["Item Barang","Barang Support"]});
				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,20,this.pc2.width-10,this.pc2.height-45],colCount:8,tag:9,
		            colTitle:["Kode","Nama","No Brg","Tipe","Satuan","Jumlah","Harga","Total"],					
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,40,150,150,200,100]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					columnReadOnly:[true,[1,2,3,4,7],[5,6]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg1});
				
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,10,this.pc2.width-5,this.pc2.height-45],colCount:5,tag:9,
		            colTitle:["Item","Satuan","Jumlah","Harga","SubTtl"],
					colWidth:[[4,3,2,1,0],[100,80,80,100,300]],
					columnReadOnly:[true,[4],[0,1,2,3]],
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});		
	
		
		
		this.rearrangeChild(10, 23);
		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbUbahHapus);
		this.hitPPN = "1";
		this.maximize();		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);							
			this.cb_nik.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BKLAIM','PIUCAR','PIUBUS','PGANTI','PINSTAL','PJASA','HUTPPN','BRGPOT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "BKLAIM") this.akunBeban = line.flag;
					if (line.kode_spro == "PIUCAR") this.piuCar = line.flag;
					if (line.kode_spro == "PIUBUS") this.piuBus = line.flag;
					if (line.kode_spro == "PGANTI") this.akunGanti = line.flag;			
					if (line.kode_spro == "PINSTAL") this.akunInstal = line.flag;			
					if (line.kode_spro == "PJASA") this.akunJasa = line.flag;			
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;								
					if (line.kode_spro == "BRGPOT") this.akunPot = line.flag;			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fAppFinalE3.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fAppFinalE3.implement({
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
					sql.add("delete from fri_jual_m where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_d where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_j where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.c_jenis.getText() == "BUS") var akunInv = this.piuBus; else var akunInv = this.piuCar; 
					if (this.status == "INSTALASI") var akunPdpt = this.akunInstal; else var akunPdpt = this.akunGanti;
					
					var noKas = "-";                //<---------------- dijurnal sebagai piutang
					
					sql.add("insert into fri_jual_m(no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,nilai_service,kode_cust,no_kas,posted,catatan,jenis,ket_jasa,km,akun_piutang,nik_app,no_faktur) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','-','-','"+this.kodeGudang+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+","+nilaiToFloat(this.e_service.getText())+",'"+this.cb_cust.getText()+"','"+noKas+"','F','"+this.e_memo.getText()+"','"+this.c_jenis.getText()+"','"+this.e_memojasa.getText()+"',0,'"+akunInv+"','"+this.cb_nik.getText()+"','"+this.e_nofaktur.getText()+"')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){																			
								sql.add("insert into fri_jual_d(no_jual,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah,bonus,harga,hpp,diskon,item,jenis) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.kodeGudang+"','"+this.sg1.cells(4,i)+"',"+nilaiToFloat(this.sg1.cells(5,i))+",0,"+nilaiToFloat(this.sg1.cells(6,i))+",0,0,'"+this.sg1.cells(1,i)+"','INV')");
							}
						}						
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																			
								sql.add("insert into fri_jual_d(no_jual,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah,bonus,harga,hpp,diskon,item,jenis) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'-','"+this.kodeGudang+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+",0,"+nilaiToFloat(this.sg2.cells(3,i))+",0,0,'"+this.sg2.cells(0,i)+"','NON')");
							}
						}						
					}
					var ket="";
					ket="Penjualan Parts "+this.cb_cust.rightLabelCaption+" ("+this.cb_cust.getText() +")";
					
					//hanya yg cash yg dijurnal; cancel = batal transaksi tp tidak dihapus;  noncash = klaim = tidak dijurnal di FO tp dibagian akuntansi menjurnal harga pokok (sistem hanya jurnal harga jual); 
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+akunInv+"','"+ket+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPot+"','"+ket+"','D',"+nilaiToFloat(this.e_diskon.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','POT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+akunPdpt+"','"+ket+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunJasa+"','"+ket+"','C',"+nilaiToFloat(this.e_service.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','JASA','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+this.akunPPN+"','"+ket+"','C',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
				
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); 					
															
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :
				this.lapView = "1";
				this.hitPPN = "0";
				this.sg1.validasi();				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :						
				this.lapView = "0";
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fri_jual_m where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_d where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_j where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}				
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.lapView == "1") {
								this.nama_report="server_report_saku2_kopeg_bengkel_rptFaktur";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCell: function(sender, col, row){			
		if (col == 6) {
			if (this.sg1.cells(5,row) != "" && this.sg1.cells(6,row) != "" ) {
				this.sg1.cells(7,row,floatToNilai(Math.round(nilaiToFloat(this.sg1.cells(5,row)) * nilaiToFloat(this.sg1.cells(6,row)))));
			}
		}
		this.sg1.validasi();
	},	
	doChangeCell3: function(sender, col, row){
		if (col == 0 && this.sg3.cells(0,row)!="") {
			if (this.sg3.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var mekanik = this.dataMekanik.get(sender.cells(0,row));
				if (mekanik) sender.cells(1,row,mekanik);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Mekanik "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBrg");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell3");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell3");
			}					
		}		
	},
	doChangeCell2: function(sender, col, row){			
		if (col == 2 || col == 3) {
			if (this.sg2.cells(2,row) != "" && this.sg2.cells(3,row) != "" ) {
				this.sg2.cells(4,row,floatToNilai(Math.round(nilaiToFloat(this.sg2.cells(2,row)) * nilaiToFloat(this.sg2.cells(3,row)))));
			}
		}
		this.sg.validasi();
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(7,i));										
				}
			}			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(4,i));										
				}
			}	
			this.e_nilai.setText(floatToNilai(tot));						
			this.e_sblm.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())-nilaiToFloat(this.e_diskon.getText())));	
			if (this.hitPPN=="1") this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_sblm.getText()) * 0.1)));
			this.e_total.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doNilaiChange2: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(7,i));										
				}
			}	
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(4,i));										
				}
			}	
			
			this.e_nilai.setText(floatToNilai(tot));						
			this.e_sblm.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())-nilaiToFloat(this.e_diskon.getText())));	
			if (this.hitPPN=="1") this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_sblm.getText()) * 0.1)));
			this.e_total.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){			
		if (sender == this.e_periode && this.e_periode.getText() != "") {	
			this.e_nb.setSQL("select a.no_jual,a.keterangan from fri_jual_m a "+
							 "      left join fri_jualbayar_d c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
							 "where (c.no_bukti is null or a.no_kas=a.no_jual or a.no_kas='CANCEL') and a.no_dokumen='-' and a.kode_gudang='"+this.kodeGudang+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_jual","keterangan"],false,["No Final","Keterangan"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
				var strSQL = "select a.periode,a.tanggal as tgl,a.catatan,a.nilai_service,a.nilai_diskon,a.nilai_ppn,a.kode_cust,a.nik_app,a.no_faktur, "+
							 "convert(varchar,a.tanggal,103) as tanggal,a.jenis,a.ket_jasa  "+ 
							 "from fri_jual_m a "+
							 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){			
					this.perLama = line.periode;
					this.dp_d1.setText(line.tgl);															
					this.c_jenis.setText(line.jenis);
					this.e_nofaktur.setText(line.no_faktur);
					
					this.cb_cust.setText(line.kode_cust);
					this.cb_nik.setText(line.nik_app);
					this.e_memojasa.setText(line.ket_jasa);
					this.e_memo.setText(line.catatan);
					
					this.e_service.setText(floatToNilai(line.nilai_service));
					this.e_diskon.setText(floatToNilai(line.nilai_diskon));
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
				} 
			}				
			var strSQL = "select case when a.kode_brg='-' then 'NON' else 'INV' end as jenis,a.kode_brg,a.item as nama,isnull(b.no_brg,'-') as no_brg,isnull(b.tipe,'-') as tipe,a.satuan,a.jumlah as jml,a.harga as hj,(a.jumlah*a.harga) as total "+
						 "from fri_jual_d a left join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_brg<>'-' order by a.nu ";							 				
			var data1 = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];							
					this.sg1.appendData([line1.kode_brg,line1.nama,line1.no_brg,line1.tipe,line1.satuan,floatToNilai(line1.jml),floatToNilai(line1.hj),floatToNilai(line1.total)]);
				}
			}
			this.sg1.validasi();
			
			var strSQL = "select case when a.kode_brg='-' then 'NON' else 'INV' end as jenis,a.kode_brg,a.item as nama,isnull(b.no_brg,'-') as no_brg,isnull(b.tipe,'-') as tipe,a.satuan,a.jumlah as jml,a.harga as hj,(a.jumlah*a.harga) as total "+
						 "from fri_jual_d a left join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_brg='-' order by a.nu ";						 				
			var data1 = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg2.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];							
					this.sg2.appendData([line1.nama,line1.satuan,floatToNilai(line1.hj),floatToNilai(line1.jml),floatToNilai(line1.total)]);
				}
			}
			this.sg2.validasi();
			
			
				
		}		
		if (sender == this.e_ppn) {						
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_sblm.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}		
		if (sender == this.e_service || sender == this.e_diskon) {						
			if (this.e_service.getText()!="") {
				this.e_sblm.setText(floatToNilai(nilaiToFloat(this.e_service.getText()) + nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_diskon.getText()))); 				
				//this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_sblm.getText()) * 0.1)));
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_sblm.getText()) + nilaiToFloat(this.e_ppn.getText())));
			}
		}				
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); 					
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});