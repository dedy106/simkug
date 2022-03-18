window.app_saku3_transaksi_kredit_fTTBDir = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fTTBDir.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fTTBDir";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Tanda Terima Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data TTB","Daftar TTB","Filter Data"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["No Kartu","No Agg","Nama","Alamat","N Angsuran"],
					colWidth:[[4,3,2,1,0],[100,300,250,100,100]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
			
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No TTB",maxLength:10});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal TTB", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]});
		this.e_lama = new portalui_saiLabelEdit(this.pc1.childPage[0], {bound:[550,13,200,20],caption:"Lama Bayar",tipeText:ttNilai, tag:2, text:"0", change:[this,"doChange"]});				
		this.e_bayar = new portalui_saiLabelEdit(this.pc1.childPage[0], {bound:[780,13,200,20],caption:"Nilai Bayar",tipeText:ttNilai, tag:1, text:"0", change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tanggal SO", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18],date:new Date().getDateStr()});
		this.e_nilai = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[550,14,200,20],caption:"Nilai Angsuran", tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});
		this.e_diskon = new portalui_saiLabelEdit(this.pc1.childPage[0], {bound:[780,14,200,20],caption:"Nilai Diskon",tipeText:ttNilai, tag:1, text:"0",readOnly:true});				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,348], childPage:["Data Atensi","Data Kredit","Schedule Angsuran"]});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Area Bisnis",multiSelection:false,tag:2,change:[this,"doChange"]});
		this.cb_agg = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Koordinator",multiSelection:false,tag:2});
		this.cb_promo = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Promotor",multiSelection:false,tag:2});
		this.cb_book = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Demo Booker",multiSelection:false,tag:2});
		this.cb_ss = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Sales Supervisor",multiSelection:false,tag:2});
		this.cb_driver = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Driver",multiSelection:false,tag:2});
		this.cb_survey = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Surveyor",multiSelection:false,tag:2});
		this.cb_kawil = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Ka Wilayah",multiSelection:false,tag:2});		
		this.cb_deliver = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Delivery",multiSelection:false,tag:2});
		this.cb_helper = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Helper",multiSelection:false,tag:2});
		this.cb_cc = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Credit Control",multiSelection:false,tag:2});
		this.cb_kawilcr = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"Ka Wil Credit",multiSelection:false,tag:2});		
		
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:0,
		            colTitle:["Kode","Nama","Satuan","Harga","Jumlah","Komisi / Bns","SubTtl"],					
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,300,100]],										
					columnReadOnly:[true,[1,2,3,6],[0,4,5]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});		
						
		this.sg = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:0,
				colTitle:["Saldo Awal","Angsuran","Saldo Akhir","Tgl Tagih"],
				colWidth:[[3,2,1,0],[100,100,100,100]],
				columnReadOnly:[true,[0,1,2,3],[]],				
				colFormat:[[0,1,2,3],[cfNilai,cfNilai,cfNilai,cfDate]],																
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg});
		
		this.cb_ttb = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"No TTB",multiSelection:false,tag:9,change:[this,"doChange"]});
		this.bCopy = new button(this.pc1.childPage[2],{bound:[120,13,100,18],caption:"Copy Data",click:[this,"doCopy"]});			
		
		
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
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
			this.stsSimpan = 1;			
			
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Area Bisnis",true);								
			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from kre_brg where flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			
			this.e_lama.setText("8");
			this.cb_pp.setText("");
			this.cb_pp.setText(this.app._kodePP);
			this.doClick();
			
			this.cb_ttb.setSQL("select no_ttb, keterangan from kre_ttb2_m where kode_pp='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",["no_ttb","keterangan"],false,["No TTB","Deskripsi"],"and","Data TTB",true);								
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fTTBDir.extend(window.portalui_childForm);
window.app_saku3_transaksi_kredit_fTTBDir.implement({
	doCopy: function(sender){
		var strSQL = "select a.no_ttb,a.no_agg,c.nama,c.alamat,a.nilai "+
		             "from kre_ttb2_m a "+					 					 
					 "                  inner join kre_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ttb='"+this.cb_ttb.getText()+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);	
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
			if (this.stsSimpan == 1) this.noDok = this.standarLib.noBuktiOtomatis(this.dbLib,"kre_ttb2_m","no_dok",this.periode.substr(2,2)+".","00000");		
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kre_ttb2_m where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_ttb2_sch where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_ttb2_d where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from kre_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_angsur_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into kre_ttb2_m (no_ttb,no_dok,keterangan,tanggal,tgl_so,periode,no_agg,nik_promo,nik_book,nik_ss,nik_survey,nik_kawil,nik_driver,   lama_bayar,nilai,status_aktif,nik_user,tgl_input,kode_lokasi,kode_pp,nik_sopir,nik_helper,nik_deliver,nik_cc,nik_kawilcr) values "+
					        "('"+this.e_nb.getText()+"','"+this.noDok+"','Kredit a.n "+this.cb_agg.rightLabelCaption+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.periode+"','"+this.cb_agg.getText()+"', '"+this.cb_promo.getText()+"',	'"+this.cb_book.getText()+"','"+this.cb_ss.getText()+"','"+this.cb_survey.getText()+"','"+this.cb_kawil.getText()+"','"+this.cb_driver.getText()+"',		"+nilaiToFloat(this.e_lama.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'1','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.cb_pp.getText()+"','-','"+this.cb_helper.getText()+"','"+this.cb_deliver.getText()+"','"+this.cb_cc.getText()+"','"+this.cb_kawilcr.getText()+"')");
					
					var j = 0; 	
					var cilKe = 9 -  nilaiToFloat(this.e_lama.getText());
					 
					for (var i=0; i < this.sg.rows.getLength(); i++){
					  j = i + cilKe;					
					  sql.add("insert into kre_ttb2_sch(no_ttb,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill,no_kas) values "+
						      "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+","+nilaiToFloat(this.sg.cells(1,i))+",0,"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.sg.getCell(3,i).substr(6,4)+'-'+this.sg.getCell(3,i).substr(3,2)+'-'+this.sg.getCell(3,i).substr(0,2)+"','"+this.sg.getCell(3,i).substr(6,4)+this.sg.getCell(3,i).substr(3,2)+"','-','-')");
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){	
								sql.add("insert into kre_ttb2_d(no_ttb,kode_lokasi,nu,kode_brg,jumlah,bonus,hjual,dc,no_batal) values "+  
									    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(3,i))+",'D','-')");
							}
						}						
					}	
					
					
					if (cilKe == 1) {
						//billing
						sql.add("insert into kre_bill_m (no_bill,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','Bill TTB "+this.e_nb.getText()+"','"+this.cb_pp.getText()+"','BILLTTB','BILL','"+this.periode+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-')");
						sql.add("update kre_ttb2_sch set no_bill='"+this.e_nb.getText()+"' where no_ttb = '"+this.e_nb.getText()+"' and cicilan_ke="+cilKe+" and kode_lokasi='"+this.app._lokasi+"'");
					
						//pembayaran
						if (this.e_bayar.getText() != "0" || this.e_diskon.getText() != "0") {
							sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','Angsuran Collector a.n "+this.cb_deliver.rightLabelCaption+"','"+this.cb_pp.getText()+"','ANGTTB','BM','"+this.periode+"','IDR',1,"+parseNilai(this.e_bayar.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_deliver.getText()+"','-','-')");																				
							sql.add("insert into kre_angsur_d (no_bukti,periode,kode_lokasi,no_ttb,cicilan_ke,no_bill,nilai,sisa,dc,tgl_lunas,nilai_bayar,nilai_diskon) values "+
									"('"+this.e_nb.getText()+"','"+this.periode+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"',"+cilKe+",'-',"+nilaiToFloat(this.e_nilai.getText())+",0,'D','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_bayar.getText())+","+nilaiToFloat(this.e_diskon.getText())+")"); 								
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);	
				}
				break;
			case "simpan" :	
			case "ubah" :	
					this.generateSch();
					this.preView = "1";
					var strSQL = "select no_dok "+
								 "from kre_ttb2_m "+							 
								 "where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){				
							if (line.no_dok != this.noDok) {
								system.alert(this,"No TTB tidak valid.","No TTB sudah terpakai. No Dok : "+line.no_dok);
								return false;
							}
						}
					}
			
					this.simpan();
				break;
			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kre_ttb2_m where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kre_ttb2_sch where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kre_ttb2_d where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				sql.add("delete from kre_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kre_angsur_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.e_nilai || sender == this.e_lama) {
				if ((this.e_lama.getText() != "0") && (this.e_nilai.getText() != "0") && (this.e_lama.getText() != "") && (this.e_nilai.getText() != "") ) 
					this.generateSch();	
			}
			
			if (sender == this.cb_pp && this.cb_pp.getText()!= "") {
				this.cb_agg.setSQL("select no_agg, nama from kre_agg where kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Koordinator",true);								
				this.cb_promo.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status='PROMOTOR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_book.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status='BOOKER' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_ss.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status='SUPERVISOR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_survey.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status='SURVEYOR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_kawil.setSQL("select nik, nama from karyawan where status='KAWIL' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_driver.setSQL("select nik, nama from karyawan where status='DRIVER' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_helper.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status='HELPER' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_deliver.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status='DELIVER' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_cc.setSQL("select nik, nama from karyawan where status='CC' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
				this.cb_kawilcr.setSQL("select nik, nama from karyawan where status='KAWILCR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
			}
			
			if (sender == this.e_nilai || sender == this.e_bayar) {
				if (this.e_nilai.getText() != "" && this.e_bayar.getText() != "") {
					var diskon = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_bayar.getText());
					this.e_diskon.setText(floatToNilai(diskon));
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.periode = y+""+m;
		else {
			if (m == "12") this.periode = this.app._periode;
			else this.periode = y+""+m;
		}
		this.sg.clear(1);
		if (this.stsSimpan == 1) {			
			this.doClick();					
		}
	},
	doClick:function(sender){
		try {			
			var thn = this.dp_d1.getDateString().substr(2,2);
			this.stsSimpan = 1;
			this.noDok = this.standarLib.noBuktiOtomatis(this.dbLib,"kre_ttb2_m","no_dok",this.periode.substr(2,2)+".","00000");		
		    this.e_nb.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
			alert(e);
		}
	},	
	doEllipseClick2: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item",sender,undefined, 
											  "select kode_brg,nama from kre_brg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from kre_brg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		try {
			if (col == 0 && this.sg2.cells(0,row)!="") {													
				sender.onChange.set(undefined,undefined);
				var brg = this.dataBRG.get(sender.cells(0,row));
				if (brg) sender.cells(1,row,brg);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRD");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}	
				sender.onChange.set(this,"doChangeCell2");
				
				var strSQL = "select satuan,hjual "+
							 "from kre_brg  "+
							 "where kode_brg='"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";						 					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.sg2.cells(2,row,line.satuan);	
						this.sg2.cells(3,row,parseFloat(line.hjual));		
						this.sg2.cells(4,row,"0");						
						this.sg2.cells(5,row,"0");
						this.sg2.cells(6,row,"0");
					} 				
				}			
			}		
			if (col == 4) {
				if (this.sg2.cells(4, row) != "" && this.sg2.cells(3, row) != "") {
					this.sg2.cells(6, row, Math.round(nilaiToFloat(this.sg2.cells(3, row)) * nilaiToFloat(this.sg2.cells(4, row))));
				}
			}			
			this.sg2.validasi();
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange2: function(){
		try{
			var tot = jml = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(6,i) != "" && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(6,i));		
					jml += nilaiToFloat(this.sg2.cells(4,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
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
								this.nama_report="server_report_saku3_kredit_rptTtb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ttb='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;	
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBRG = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBRG.set(line.kode_brg, line.nama);
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
				this.pc1.show();   
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
			this.sg1.clear(1); this.sg.clear(1); this.sg2.clear(1);
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																		
		var strSQL = "select a.no_ttb,a.no_agg,c.nama,c.alamat,a.nilai "+
		             "from kre_ttb2_m a "+					 					 
					 "                  inner join kre_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_ttb,line.no_agg,line.nama,line.alamat,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * "+
							 "from kre_ttb2_m "+							 
							 "where no_ttb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.noDok = line.no_dok;	
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_so);
						this.e_lama.setText(line.lama);
						
						this.cb_pp.setText(line.kode_pp);
						this.cb_agg.setText(line.no_agg);
						this.cb_promo.setText(line.nik_promo);
						this.cb_book.setText(line.nik_book);
						this.cb_ss.setText(line.nik_ss);
						this.cb_survey.setText(line.nik_survey);
						this.e_lama.setText(floatToNilai(line.lama_bayar));
						this.cb_kawil.setText(line.nik_kawil);
						this.cb_driver.setText(line.nik_driver);
						
						this.cb_helper.setText(line.nik_helper);
						this.cb_deliver.setText(line.nik_deliver);
						
						this.cb_cc.setText(line.nik_cc);
						this.cb_kawilcr.setText(line.nik_kawilcr);
					}
				}	
				
				
				var strSQL = "select nilai_bayar "+
							 "from kre_angsur_d "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.e_bayar.setText(floatToNilai(line.nilai_bayar));
					}
				}	
				
				
				
				var strSQL = "select a.kode_brg,b.nama,b.satuan,a.jumlah,a.bonus,a.hjual,a.jumlah*a.hjual as total "+
							 "from kre_ttb2_d a inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_ttb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg2.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg2.appendData([line1.kode_brg,line1.nama,line1.satuan,parseFloat(line1.hjual),parseFloat(line1.jumlah),parseFloat(line1.bonus),parseFloat(line1.total)]);
					}
				} else this.sg2.clear(1);
				
				this.generateSch();
			}									
		} catch(e) {alert(e);}
	},	
    generateSch: function(){
	    try{         
            var lm = nilaiToFloat(this.e_lama.getText());
    		var so = nilaiToFloat(this.e_nilai.getText()) * lm;
    		var pokok = Math.round(so / lm);
    		
			//var tglNext = perAwal = this.dp_d1.getThnBln();
			
			var tglNext = perAwal = this.dp_d1.getText().substr(6,4) + this.dp_d1.getText().substr(3,2);
			var tgl = tglTmp = this.dp_d1.getText().substr(0,2);
			
            this.dataAngsuran = [];
            this.sg.clear();
    		for (var i = 0;i < lm;i++){
    			if (perAwal.substr(4,2) == "02" && parseInt(tgl) > 28) tglTmp = "28";
    			if (perAwal.substr(4,2) == "04" && parseInt(tgl) > 30) tglTmp = "30";
    			if (perAwal.substr(4,2) == "06" && parseInt(tgl) > 30) tglTmp = "30";
    			if (perAwal.substr(4,2) == "09" && parseInt(tgl) > 30) tglTmp = "30";
    			if (perAwal.substr(4,2) == "11" && parseInt(tgl) > 30) tglTmp = "30";
    			
				tglNext = tglTmp + '/' + perAwal.substr(4,2) + '/' +  perAwal.substr(0,4);
    			
    			tglTmp = tgl;							
    			this.dataAngsuran.push([floatToNilai(so),floatToNilai(pokok),floatToNilai(so - pokok),tglNext]);
    			so = so - pokok;
    			if (so < pokok) pokok = so;
    			else if ( i == lm - 2) pokok = so; 
    			
                perAwal = getNextPeriode(perAwal);
				this.sg.appendData(this.dataAngsuran[i]);
    		}
   		}catch(e){
           alert(e);
        }
    }
});