window.app_saku3_transaksi_ginas_barang_fJualHarian = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ginas_barang_fJualHarian.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ginas_barang_fJualHarian";
		this.itemsValue = new portalui_arrayList(); 
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Batching Penjualan Harian", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Batching"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]], readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"No Dokumen", maxLength:150});				
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,305], childPage:["Data Penjualan","Data Rekon","Err Msg"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
		            colTitle:["Faktur","No SKU","Satuan","Qty","Total"],					
					colWidth:[[4,3,2,1,0],[100,100,50,200,100]],			
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,colFormat:[[3,4],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});		
				
		this.c_persetor = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});	
		this.cb_setor = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"No Setor",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_titip = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Akun Titipan", maxLength:10, tag:2,readOnly:true});							
		this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"NIK Setor", maxLength:10, tag:2,readOnly:true});							
		this.cb_terima = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"NIK Terima", maxLength:10, tag:2,readOnly:true});							
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Saldo Setoran", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:1,tag:9,
					colTitle:["Baris INVALID"],
					colWidth:[[0],[200]],autoAppend:false,
					readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	

			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			this.cb_terima.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						

			this.isiCBGudang();		
			var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.cb_gudang.setText(line.kode_gudang); 										
			}

			this.c_persetor.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from brg_setor_d where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_persetor.addItem(i,line.periode);
				}
			} 

			this.c_persetor.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ginas_barang_fJualHarian.extend(window.portalui_childForm);
window.app_saku3_transaksi_ginas_barang_fJualHarian.implement({
	isiCBGudang: function() {
		this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
							  "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
							  "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
	},
	doValidasi: function() {
		var strSQL = "select kode_barang as id,kode_barang from brg_barang where kode_lokasi ='"+this.app._lokasi+"' "+
					 "union "+
					 "select barcode as id,kode_barang from brg_barang where kode_lokasi ='"+this.app._lokasi+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataBrg = data;
		}

		this.inValid = false;		
		var tot = 0;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(1,i,"INVALID | "+this.sg1.cells(1,i));				
			for (var j=0;j < this.dataBrg.rs.rows.length;j++){
				if (this.sg1.cells(1,i).substr(10,20) == this.dataBrg.rs.rows[j].id) {	
					this.sg1.cells(1,i,this.dataBrg.rs.rows[j].kode_barang);					
				}
			}			
			if (this.sg1.cells(1,i).substr(0,7) == "INVALID") this.inValid = true;				
			tot +=  nilaiToFloat(this.sg1.cells(4,i));							
		}	

		if (!this.inValid) {
			setTipeButton(tbSimpan);	
			this.e_total.setText(floatToNilai(tot));
		}
		else {
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[2]);	
			this.sg2.clear();
			for (var i=0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.cells(1,i).substr(0,7) == "INVALID" ) {
					var j = i+1;
					this.sg2.appendData([j]);						
				}
			}
		}
	},	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();		
			
			this.doValidasi();

		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	cekSaldoTitip: function() {
		var strSQL = "select a.no_bukti,a.nilai-isnull(b.pakai,0) as saldo, a.akun_titip,a.nik_setor,a.nik_terima  "+						  
					 "from brg_setor_d a "+

					 "     left join ("+
					 "          select no_setor,sum(case dc when 'D' then nilai else -nilai end) as pakai  "+
					 "          from brg_jualbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and no_setor='"+this.cb_setor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					 "			group by no_setor "+
					 ") b on a.no_bukti=b.no_setor "+
				
					 "where a.no_bukti='"+this.cb_setor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 

		var data = this.dbLib.getDataProvider(strSQL,true);			
		if (typeof data == "object"){
			var line = data.rs.rows[0];					
			this.cb_titip.setText(line.akun_titip);
			this.cb_nik.setText(line.nik_setor);
			this.cb_terima.setText(line.nik_terima);
			this.e_saldo.setText(floatToNilai(line.saldo));
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
					if (this.stsSimpan == 1) this.doClick();	

					var data = this.dbLib.getDataProvider("select akun_piutang from cust where kode_cust ='BATCH' and kode_lokasi = '"+this.app._lokasi+"'",true);			
					if (typeof data == "object"){
						var line = data.rs.rows[0];					
						this.akunPiutang = line.akun_piutang;										
					}					
					var strSQL = "select kode_pp from brg_gudang where kode_gudang = '"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var vKodePP = line.kode_pp;											
						}
					}	

					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from brg_jualpiu_d where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from brg_jualbayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					}										

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){		
								var hargasat = nilaiToFloat(this.sg1.cells(4,i)) / nilaiToFloat(this.sg1.cells(3,i));																																								
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGJUAL','JUALBATCH',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"','"+this.sg1.cells(2,i)+"','C',0,"+
										nilaiToFloat(this.sg1.cells(3,i))+",0,"+hargasat+",0,0,0,0,"+nilaiToFloat(this.sg1.cells(4,i))+")");
							}
						}						
					}	

					sql.add("insert into brg_jualpiu_d(no_jual,kode_lokasi,tanggal,keterangan,kode_cust,kode_curr,kurs,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,nilai_ppn,nilai_pph,no_fp,diskon,kode_gudang) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','Batch No: "+this.e_nb.getText()+"','BATCH','IDR',1,'"+vKodePP+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunPiutang+"',0,0,'-',0,'"+this.cb_gudang.getText()+"')");
												
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','JUALBATCH','F','-','-','"+vKodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','Batch No: "+this.e_nb.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_gudang.getText()+"','"+this.c_persetor.getText()+"','"+this.cb_setor.getText()+"')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','D',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','JUALBATCH','PIUTANG','IDR',1,'"+vKodePP+"','-','BATCH','-','-','-','-','-','-')");							
		
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,c.akun_pdpt,'C',sum(a.total),sum(a.total),'"+this.e_ket.getText()+"','JUALBATCH','PDPT','IDR',1,'"+vKodePP+"','-','BATCH','-','-','-','-','-','-' "+
							"from brg_trans_d a "+
							"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							"inner join brg_barangklp c on b.kode_klp=c.kode_klp and b.kode_lokasi=c.kode_lokasi "+
							"where a.no_bukti ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by c.akun_pdpt ");	
							
							
					//------------------------------------------------ rekon ------------------------------------------------------------		
					//no_setor --> untuk flag modul setoran titipan fKbSetor.js

					if (nilaiToFloat(this.e_total.getText() > nilaiToFloat(this.e_saldo.getText()))) 
						var nilaiPakai = nilaiToFloat(this.e_saldo.getText());					
					else var nilaiPakai = nilaiToFloat(this.e_total.getText());

					sql.add("insert into brg_jualbayar_d(no_bukti,no_jual,kode_cust,kode_lokasi,modul,periode,nik_user,tgl_input,dc,nilai,no_setor) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','BATCH','"+this.app._lokasi+"','JUALBATCH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'D',"+nilaiPakai+",'"+this.cb_setor.getText()+"')");					

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',444,'"+this.cb_titip.getText()+"','D',"+nilaiPakai+","+nilaiPakai+",'"+this.e_ket.getText()+"','JUALBATCH','TITIP','IDR',1,'"+vKodePP+"','-','BATCH','-','-','-','-','-','-')");									
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',555,'"+this.akunPiutang+"','C',"+nilaiPakai+","+nilaiPakai+",'"+this.e_ket.getText()+"','JUALBATCH','REKONPIU','IDR',1,'"+vKodePP+"','-','BATCH','-','-','-','-','-','-')");							

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);		
					setTipeButton(tbAllFalse);								
					this.isiCBGudang();
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";						
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from brg_jualpiu_d where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					sql.add("delete from brg_jualbayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1);				
				this.isiCBGudang();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BC"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);
			
			if (this.stsSimpan == 1) this.doClick();			
		}catch(e) {alert(e);}
	},		
	doChange:function(sender){
		if (sender == this.c_persetor && this.c_persetor.getText()!="") {
			var strSQL = "select a.no_bukti,a.keterangan "+						  
						 "from brg_setor_d a "+
						 "     left join ("+
						 "          select no_setor,sum(case dc when 'D' then nilai else -nilai end) as pakai  "+
						 "          from brg_jualbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and no_setor='"+this.cb_setor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "			group by no_setor "+
						 ") b on a.no_bukti=b.no_setor "+					
						 "where a.nilai > isnull(b.pakai,0) and a.periode = '"+this.c_persetor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			

			this.cb_setor.setSQL(strSQL,["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Setoran",true);							
		}
		if (sender == this.cb_setor && this.cb_setor.getText()!="") {
			this.cekSaldoTitip();
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_rptStok";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_sop='"+this.e_nb.getText()+"' ";
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
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
				this.pc2.show();   
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);		
			setTipeButton(tbAllFalse);
			this.isiCBGudang();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='IV' and a.form='JUALBATCH'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,line.nilai1,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from trans_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																		
						this.e_ket.setText(line.keterangan);	
						this.e_dok.setText(line.no_dokumen);																								
						this.e_total.setText(floatToNilai(line.nilai1));																														
						this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_gudang='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);															
						this.cb_gudang.setText(line.param1);
						
						this.c_persetor.setText(line.param2);
						this.cb_setor.setText(line.param3);
					}
				}						
										
				var strSQL = "select top 20 no_batch,kode_barang,satuan,jumlah,total "+
							 "from brg_trans_d "+
							 "where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg1.appendData([line1.no_batch,line1.kode_barang,line1.satuan,parseFloat(line1.jumlah),parseFloat(line1.total)]);
					}
				} else this.sg1.clear(1);												
				this.sg1.validasi();	

			}									
		} catch(e) {alert(e);}
	}
});