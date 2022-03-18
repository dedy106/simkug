window.app_saku3_transaksi_investasi_invest2_fSahamPindahMI = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fSahamPindahMI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fSahamPindahMI";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pindah Kelola Saham: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Progress","Catatan"],
					colWidth:[[4,3,2,1,0],[200,80,350,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_nsaham = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Nilai Saham", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		 
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Pengelola Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nbuku = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Nilai Buku", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		 
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,300], childPage:["Data Saham"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,				
				colTitle:["Kd Saham","Nama Saham","Lbr Unit","Harga Oleh","Harga Buku","Lbr Pindah","MI Tujuan","Nama","Kd Broker","Nama Broker"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,60,100,60,80,100,100,80,200,60]],				
				columnReadOnly:[true,[1,2,3,4,7,9],[0,5,6,8]],
				colFormat:[[2,3,4,5,],[cfNilai,cfNilai,cfNilai,cfNilai]],								
				buttonStyle:[[0,6,8],[bsEllips,bsEllips,bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true,
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"] 
				});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPage"]});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);			
					
			var sql = new server_util_arrayList();
			sql.add("select kode_saham, nama from inv_saham where flag_aktif='1'");	
			sql.add("select kode_kelola, nama from inv_kelola where flag_aktif='1'");			
			sql.add("select kode_broker, nama from inv_broker where flag_aktif='1'");
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fSahamPindahMI.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fSahamPindahMI.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			for (var i = 0; i < this.sg.rows.getLength();i++){
				this.doChangeCell(this.sg, 0, i);
				this.doChangeCell(this.sg, 6, i);
				this.doChangeCell(this.sg, 8, i);
			}			
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_shmbeli_m where no_shmbeli='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_shmbeli_d where no_shmbeli='"+this.e_nb.getText()+"'");					
						sql.add("delete from inv_shmpindah_d where no_bukti='"+this.e_nb.getText()+"'");					
					}
					
					//jual_m progress=1; no_app1='SAP'---> modul pindah ke sap
					//beli_m no_app1='SAP'---> modul pindah ke sap
					
					sql.add("insert into inv_shmjual_m(no_shmjual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,akun_piutang,akun_piugl,nilai_piutang,nilai_piugl,modul,kode_pp,no_app1,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'X','-','"+this.app._userLog+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','"+this.cb_kelola.getText()+"','"+this.dp_d1.getDateString()+"',0,0,0,0,'-','-',"+nilaiToFloat(this.e_nsaham.getText())+","+nilaiToFloat(this.e_nbuku.getText())+",'JPINDAH','"+this.kodepp+"','SAP','1')");					
					sql.add("insert into inv_shmbeli_m(no_shmbeli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,  no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,modul,nilai,no_app1,no_spb,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'X','-','X','"+this.app._userLog+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','-','"+this.dp_d1.getDateString()+"',0,0,0,0,'BPINDAH',"+nilaiToFloat(this.e_nsaham.getText())+",'SAP','-','"+this.kodepp+"')");
							
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(5,i)) != 0 ) {
								var strSQL = "select kode_saham from inv_saham_d where kode_saham='"+this.sg.cells(0,i)+"' and kode_kelola='"+this.sg.cells(6,i)+"'";
								var data = this.dbLib.getDataProvider(strSQL,true);
								if (typeof data == "object" && data.rs.rows[0] == undefined){
									sql.add("insert into inv_saham_d (kode_saham,kode_kelola,jumlah,h_oleh,h_buku) values "+
											"('"+this.sg.cells(0,i)+"','"+this.sg.cells(6,i)+"',0,0,0)");
								}								
								var njual = nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(5,i));								
								sql.add("insert into inv_shmjual_d (no_shmjual,kode_kelola,kode_saham,h_oleh,h_buku,h_jual,jumlah,n_jual,gainlos, komisi,vat,levi,pph,kode_broker) values "+
								        "('"+this.e_nb.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+njual+",0,0,0,0,0,'"+this.sg.cells(8,i)+"')");																
								
								var nbeli = nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(5,i));								
								sql.add("insert into inv_shmbeli_d (no_shmbeli,kode_kelola,kode_saham,h_oleh,h_buku,harga,jumlah,n_beli,  komisi,vat,levi,pph,kode_broker,h_buku2) values "+
								        "('"+this.e_nb.getText()+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nbeli+",0,0,0,0,'"+this.sg.cells(8,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+")");																
														
								sql.add("insert into inv_shmpindah_d (no_bukti,kode_lokasi,kode_kelola_asal,kode_kelola_tuj,kode_saham,jumlah,kode_broker) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(8,i)+"')");

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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					this.sg.clear(1);
					this.sg3.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :				
			case "ubah" :							
				this.preView = "1";
				this.doValidStok();
				var line = undefined;
				for (var i in this.gridAR.objList){					
					line = this.gridAR.get(i);
					if ((parseFloat(line.get("stok")) > 0) && (parseFloat(line.get("stok")) != parseFloat(line.get("jumlah")))) {
						system.alert(this,"Transaksi tidak valid.","Total Lbr Pindah tidak sama dengan Lbr Unit ("+line.get("kode_saham")+").");
						return false;						
					}			
				}								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				for (var i = 0; i < this.sg.rows.getLength();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(5,i)) > nilaiToFloat(this.sg.cells(2,i))) {
							system.alert(this,"Transaksi tidak valid.","Jml unit dipindah melebihi stok.");
							return false;												
						}
					}
				}				
				if (nilaiToFloat(this.e_nsaham.getText()) <= 0 || nilaiToFloat(this.e_nbuku.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai (Saham/Buku) tidak boleh nol atau kurang.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_shmbeli_m where no_shmbeli='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_shmbeli_d where no_shmbeli='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_shmpindah_d where no_bukti='"+this.e_nb.getText()+"'");					
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
			if (this.stsSimpan == 1) this.sg.clear(1);			
		}				
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg3.clear(1);			
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmjual_m","no_shmjual",this.app._lokasi+"-SPK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}			
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_kelola.getText()!=""){
					this.standarLib.showListData(this, "Daftar Saham",sender,undefined, 
						"select a.kode_saham, a.nama from inv_saham a inner join inv_saham_d b on a.kode_saham=b.kode_saham and b.kode_kelola='"+this.cb_kelola.getText()+"' where a.flag_aktif='1'",
						"select count(a.kode_saham)  from inv_saham a inner join inv_saham_d b on a.kode_saham=b.kode_saham and b.kode_kelola='"+this.cb_kelola.getText()+"' where a.flag_aktif='1'",
						["a.kode_saham","a.nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 6){
					this.standarLib.showListData(this, "Daftar Kelola",sender,undefined, 
												  "select kode_kelola, nama from inv_kelola where flag_aktif='1'",
												  "select count(kode_kelola) from inv_kelola where flag_aktif='1'",
												  ["kode_kelola","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 8){
					this.standarLib.showListData(this, "Daftar Broker",sender,undefined, 
												  "select kode_broker, nama from inv_broker where flag_aktif='1'",
												  "select count(kode_broker) from inv_broker where flag_aktif='1'",
												  ["kode_broker","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){					
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var saham = this.dataSaham.get(sender.cells(0,row));
				if (saham) sender.cells(1,row,saham);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Saham "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkSaham");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}
				sender.onChange.set(this,"doChangeCell");
			}
			
			this.nik_user=this.app._nikUser;						
			if (this.stsSimpan == 1) var sql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			else var sql = "call sp_saham_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";			
			this.dbLib.execQuerySync(sql);	
			
			var strSQL = "select a.jumlah,a.h_oleh,a.h_buku from inv_saham_tmp a inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
						 "where a.kode_saham='"+this.sg.cells(0,row)+"' and a.kode_kelola = '"+this.cb_kelola.getText()+"' and a.nik_user='"+this.nik_user+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.sg.cells(2,row,parseFloat(line.jumlah));
				this.sg.cells(3,row,parseFloat(line.h_oleh));				
				this.sg.cells(4,row,parseFloat(line.h_buku));									
			} 
		}
		
		if (col == 6 && this.sg.cells(6,row)!=""){			
			sender.onChange.set(undefined,undefined);
			var kelola = this.dataKelola.get(sender.cells(6,row));
			if (kelola) sender.cells(7,row,kelola);
			else {                                    
				if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode Kelola "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBroker");                
				sender.cells(6,row,"");
				sender.cells(7,row,"");
				sender.onChange.set(this,"doChangeCell");
				return false;
			}
			sender.onChange.set(this,"doChangeCell");			
		}
		
		if (col == 8 && this.sg.cells(8,row)!=""){			
			sender.onChange.set(undefined,undefined);
			var broker = this.dataBroker.get(sender.cells(8,row));
			if (broker) sender.cells(9,row,broker);
			else {                                    
				if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode Broker "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBroker");                
				sender.cells(8,row,"");
				sender.cells(9,row,"");
				sender.onChange.set(this,"doChangeCell");
				return false;
			}
			sender.onChange.set(this,"doChangeCell");			
		}				
		if (col == 5) this.sg.validasi();
	},		
	doNilaiChange: function(){
		try{						
			var totSaham = totBuku = 0 ;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(3,i) != "" && this.sg.cells(4,i) != ""){					
					totSaham += nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(3,i));				
					totBuku += nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(4,i));									
				}
			}			
			this.e_nsaham.setText(floatToNilai(Math.round(totSaham)));			
			this.e_nbuku.setText(floatToNilai(Math.round(totBuku)));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataSaham = new portalui_arrayMap();
							this.dataKelola = new portalui_arrayMap();
							this.dataBroker = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataSaham.set(line.kode_saham, line.nama);
								}
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataKelola.set(line.kode_kelola, line.nama);
								}
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];
									this.dataBroker.set(line.kode_broker, line.nama);
								}
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doValidStok: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i = 0; i < this.sg.rows.getLength();i++){		
			if (nilaiToFloat(this.sg.cells(5,i)) != 0){
				var kdSaham = this.sg.cells(0,i)
				var nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdSaham == dtJurnal.get(j).get("kode_saham")) ){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_saham",kdSaham);
					row.set("stok",nilaiToFloat(this.sg.cells(2,i)));
					row.set("jumlah",nilaiToFloat(this.sg.cells(5,i)));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);
				}
				else dtJurnal.get(ix).set("jumlah",row.get("jumlah") + nilaiToFloat(this.sg.cells(5,i)));
			}
		}
		this.gridAR = dtJurnal;	
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
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg3.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_shmjual,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,b.catatan "+
		             "from inv_shmjual_m a "+
					 "     left join inv_app2_m b on a.no_app1=b.no_app  and b.no_flag='-' and b.form='APPMAN' "+					 
					 "where a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='JPINDAH'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_shmjual,line.tgl,line.keterangan,line.progress,line.catatan]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_shmjual_m where no_shmjual= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);							
						this.e_dok.setText(line.keterangan);												
						this.e_ket.setText(line.keterangan);						
						this.cb_kelola.setText(line.kode_kelola);						
					}
				}
				
				this.nik_user=this.app._nikUser;						
				var sql = "call sp_saham_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";			
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select b.kode_saham,b.nama,a.jumlah as jumlah,a.h_oleh,a.h_buku,  f.jumlah as jml,f.kode_broker,e.nama as broker,f.kode_kelola_tuj,c.nama as nama_kelola "+
							"from inv_shmpindah_d f "+
							"inner join inv_saham_tmp a on a.kode_saham=f.kode_saham and f.kode_kelola_asal=a.kode_kelola "+
							"inner join inv_saham b on a.kode_saham=b.kode_saham "+
							"inner join inv_broker e on f.kode_broker=e.kode_broker "+ 
							"inner join inv_kelola c on f.kode_kelola_tuj=c.kode_kelola "+ 
							"where f.no_bukti ='"+this.e_nb.getText()+"' and a.nik_user='"+this.nik_user+"'"; 

				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																													
						this.sg.appendData([line.kode_saham,line.nama,floatToNilai(line.jumlah),floatToNilai(line.h_oleh),floatToNilai(line.h_buku),floatToNilai(line.jml),line.kode_kelola_tuj,line.nama_kelola,line.kode_broker,line.broker]);
					}					
				} else this.sg.clear(1);															
				 
			}
		} catch(e) {alert(e);}
	}
});