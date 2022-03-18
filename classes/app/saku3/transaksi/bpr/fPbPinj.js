window.app_saku3_transaksi_bpr_fPbPinj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fPbPinj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fPbPinj";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Bayar Pencairan Pinjaman", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Permohonan","List Permohonan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai","Catatan"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,60,250,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[790,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[890,12,100,18]}); 		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total Pencairan", tag:1,  tipeText:ttNilai, readOnly:true, text:"0",change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[670,17,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});		
		this.e_totalDC = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total PB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,328], childPage:["Otorisasi","Atensi Pembayaran","Jurnal+","Controlling","Catatan"]});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tahu = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Akun BYMHD", multiSelection:false, maxLength:10, tag:2});						
		
		this.sg5 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
				colTitle:["Status","No Agg","Nama","No Kartu","Jenis","Akun AR","Nilai Pinj","Biaya","Kompensasi","Nilai Cair"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,80,80,100,70,60,100,210,80,70]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["CAIR","INPROG"]})]],
				colFormat:[[6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCell5"],nilaiChange:[this,"doNilaiChange5"],dblClick:[this,"doDoubleClick5"],
				defaultRow:1,autoAppend:false});
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5});

		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
					colTitle:["Kode MTA","Kode PP","Budget Tersedia","Tot Transaksi","Sisa Budget"],
					colWidth:[[4,3,2,1,0],[120,120,120,100,100]],					
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[960,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[20,10,450,60],caption:"Catatan",tag:9});		
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var strSQL = "select status_admin from hakakses where nik = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ";										
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.stsAdmin = line.status_admin;								
				}
			}	
			
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_tahu.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag = '004' and b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '051' "+					
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");												
			if (this.stsAdmin == "A") sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			else sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");												
			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.e_memo.setReadOnly(true);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BMHD','KOPMAT','KOPPRO','KOPASU') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "BMHD") this.cb_akun.setText(line.flag);		
					if (line.kode_spro == "KOPMAT") this.akunMat = line.flag;								
					if (line.kode_spro == "KOPPRO") this.akunPro = line.flag;			
					if (line.kode_spro == "KOPASU") this.akunAsu = line.flag;																
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fPbPinj.extend(window.childForm);
window.app_saku3_transaksi_bpr_fPbPinj.implement({		
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg5.clear(1);				
				var strSQL = "select a.no_agg,b.nama,a.no_pinj,a.kode_param,a.akun_piutang,a.nilai,nilai_mat+nilai_prov+nilai_asur as biaya,isnull(c.kompensasi,0) as kompensasi, nilai-(nilai_mat+nilai_prov+nilai_asur) nilai_cair "+
							 "from  kop_pinj_m a inner join kop_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+							 
							 "		left join (   "+

							 "           select a.param3, a.kode_lokasi, sum(a.nilai1) as kompensasi "+
							 "			 from trans_m a "+
							 "			 where a.param2='-' and a.no_ref1='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.form='PJKOMP' "+
							 "			 group by a.param3, a.kode_lokasi "+
							 "			 ) c on c.param3=a.no_agg and c.kode_lokasi=a.kode_lokasi "+

							 "where  a.no_kas ='-' and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_agg"; 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg5.appendData(["INPROG",line.no_agg,line.nama,line.no_pinj,line.kode_param,line.akun_piutang,floatToNilai(line.nilai),floatToNilai(line.biaya),floatToNilai(line.kompensasi),floatToNilai(line.nilai_cair)]);
					}
				} else this.sg5.clear(1);

				//kompensasi hanya utk satu pinjaman ( jika 1 agg >1 pinj, nilai_kompensasinya di nol-kan)
				//nilai cair hitung disini
				for (var i=0;i < this.sg5.getRowCount();i++){
					if (this.sg5.rowValid(i)) {

						if (this.sg5.cells(8,i) != "0") {
							var netTot = nilaiToFloat(this.sg5.cells(9,i)) - nilaiToFloat(this.sg5.cells(8,i));							
							this.sg5.cells(9,i,netTot);
						}

						if ( (i>=1) && this.sg5.cells(1,i) == this.sg5.cells(1,i-1)) {
							this.sg5.cells(8,i,0);							
						}

					}
				}

				this.sg5.validasi();

				this.pc1.setActivePage(this.pc1.childPage[1]);	
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doNilaiChange5: function(){
		try{			
			var saldo = 0;			
			for (var i = 0; i < this.sg5.getRowCount();i++) {
				if (this.sg5.rowValid(i) && this.sg5.cells(0,i)=="CAIR" && this.sg5.cells(9,i) != "") {
					saldo += nilaiToFloat(this.sg5.cells(9,i));
				}
			}			
			this.e_nilai.setText(floatToNilai(Math.round(saldo * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell5: function(sender, col, row){						
		if (col == 0) {				
			this.sg5.validasi();
		}
	},	
	doDoubleClick5: function(sender, col , row) {
		if (this.sg5.cells(0,row) == "INPROG") this.sg5.cells(0,row,"CAIR");
		else this.sg5.cells(0,row,"INPROG");
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("update kop_pinj_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("delete from pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pb_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}								
										
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,due_date,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AP','PBPIN','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_totalDC.getText())+","+nilaiToFloat(this.e_nilai.getText())+",0,'"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','-','-','-','-','-','-','"+this.cb_akun.getText()+"')");					
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','C',"+nilaiToFloat(this.e_totalDC.getText())+","+nilaiToFloat(this.e_totalDC.getText())+",'"+this.e_ket.getText()+"','PBPIN','BMHD','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																		
					
					for (var i=0;i < this.sg5.getRowCount();i++){
						if (this.sg5.rowValid(i) && this.sg5.cells(0,i) == "CAIR"){							
							sql.add("insert into pb_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,cabang,bruto,pajak,nilai, kode_vendor) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBPIN',nama_rek,no_rek,bank,cabang,"+nilaiToFloat(this.sg5.cells(9,i))+",0,"+nilaiToFloat(this.sg5.cells(9,i))+", no_agg "+
									"from kop_agg "+
									"where no_agg='"+this.sg5.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									
							//piutang pinj
							var nilaiPiu = nilaiToFloat(this.sg5.cells(6,i));							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg5.cells(3,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg5.cells(5,i)+"','D',"+nilaiPiu+","+nilaiPiu+",'Pencairan atas Pinj "+this.sg5.cells(3,i)+"','PINJCAIR','AR','IDR',1,'"+this.app._kodePP+"','-','"+this.sg5.cells(1,i)+"','-','-','-','-','-','-')");
							
							//pdpt atas materai
							var j = 100+i;							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',no_pinj,'"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunMat+"','C',nilai_mat,nilai_mat,'Beban Materai atas "+this.sg5.cells(3,i)+"','PINJCAIR','MATERAI','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
									"from kop_pinj_m "+
									"where no_pinj='"+this.sg5.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_mat<>0");
									
							//pdpt atas provisi
							var j = 200+i;
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',no_pinj,'"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunPro+"','C',nilai_prov,nilai_prov,'Beban Provisi atas "+this.sg5.cells(3,i)+"','PINJCAIR','PROVINSI','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
									"from kop_pinj_m "+
									"where no_pinj='"+this.sg5.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_prov<>0");
								
							//pdpt atas asuransi									
							var j = 300+i;							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',no_pinj,'"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunAsu+"','C',nilai_asur,nilai_asur,'Titipan Asuransi atas "+this.sg5.cells(3,i)+"','PINJCAIR','ASURANSI','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
									"from kop_pinj_m where no_pinj='"+this.sg5.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_asur<>0");
							
							sql.add("update kop_pinj_m set no_kas='"+this.e_nb.getText()+"' where no_pinj='"+this.sg5.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		

							//kompensasi sudah diflag, piuKOMP diselesaikan
							if (nilaiToFloat(this.sg5.cells(8,i)) != 0) {
								sql.add("update trans_m set param2='"+this.e_nb.getText()+"',no_ref1='"+this.sg5.cells(3,i)+"' where param3='"+this.sg5.cells(1,i)+"' and param2='-' and form='PJKOMP' and kode_lokasi='"+this.app._lokasi+"'");		
								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3)  "+
										"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',b.nu,b.kode_akun,'C',b.nilai,b.nilai_curr,'"+this.e_ket.getText()+"','PINJCAIR','PJKOMP_RV',b.kode_curr,b.kurs,b.kode_pp,'-','-','-','-',b.no_bukti,'-','-','-' "+
										"from trans_m a inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.jenis='PIUKOMP' "+
										"where a.param2='"+this.e_nb.getText()+"' and a.no_ref1='"+this.sg5.cells(3,i)+"' and a.form='PJKOMP' and a.kode_lokasi='"+this.app._lokasi+"'");																		
							}

						}
					}

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){		
								var k = i+1000;
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(3,i)+"','PBPIN','BEBAN','IDR',1,'"+this.sg1.cells(5,i)+"','-','-','-','-','-','-','-','-')");														
							}
						}
					}	

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
									var DC = "C"; 
									var nilai = nilaiToFloat(this.sg2.cells(3,i));
								} else {
									var DC = "D";
									var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
										"('"+this.e_nb.getText()+"','PBPIN','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+",0,0,0,'-','-','-')");
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg5.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);								
					setTipeButton(tbAllFalse);					
					this.progSeb ="";
					this.doClick();					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				
				this.sg1.validasi();					
				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}						
					}				
				}		

				for (var i=0;i < this.sg5.getRowCount();i++){
					if (this.sg5.rowValid(i)) {
						if (nilaiToFloat(this.sg5.cells(9,i)) <= 0) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Cair tidak boleh nol atau kurang (Baris "+k+").");
							return false;				
						}
					}
				}

				this.dataAkunGar = {rs:{rows:[]}};
				this.doHitungGar();
				var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				for (var i=0;i < this.sg2.getRowCount();i++) {
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_gar == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i)) < 0) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}							
						}
					}
				}	
				
				if (nilaiToFloat(this.e_totalDC.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("update kop_pinj_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("delete from pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from pb_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();

		if (sender == this.e_nilai && this.e_nilai.getText()!="") {
			this.sg1.validasi();
		}

	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg5.clear(1);																
				}
				this.noAppLama = "-";
				this.noVerLama = "-";
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PBP"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg1.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) sender.cells(1,row,akun);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));				
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange: function(){		
		try{
			var totDC = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			totDC += nilaiToFloat(this.e_nilai.getText());
			this.e_totalDC.setText(floatToNilai(totDC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},		
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"C");						
					}
				break;
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (this.sg1.cells(5,row) == "") {
						if (row == 0) this.sg1.setCell(5,row,this.app._kodePP);
						else {
							this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
							this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
						}
					}
				break;							
		}
	},		
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '051' "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '051' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					if (this.stsAdmin == "A") {
						var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					else {
						var strPP = "select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_hutang_rptPbForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
							this.dataAkun = new portalui_arrayMap();																					
							this.dataPP = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}							
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg5.clear(1); 					
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			setTipeButton(tbAllFalse);
			this.progSeb ="";
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.form as modul,a.no_dokumen,a.keterangan,a.progress,a.nilai1, "+
					 "case when progress = 'V' then isnull(e.catatan,'-') "+
					 "end as catatan "+
		             "from trans_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+					 					 
					 "			      left join pb_app_m e on a.no_bukti=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.no_flag='-' and e.form = 'APPVER' "+
					 "where a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'PBPIN' and a.progress in ('0','V') ";					 
					 
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai1),line.catatan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.e_memo.setText(this.sg3.cells(7,row));								
				
				var strSQL = "select * "+
							 "from trans_m a "+								 
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik1);
						this.cb_tahu.setText(line.nik2);	

																	
						this.cb_akun.setText(line.param3);							
						this.e_nilai.setText(floatToNilai(line.nilai2));							
						
					}
				}
				

				this.sg5.clear(1);				
				var strSQL = "select a.no_agg,b.nama,a.no_pinj,a.kode_param,a.akun_piutang,a.nilai,nilai_mat+nilai_prov+nilai_asur as biaya, isnull(c.kompensasi,0) as kompensasi, nilai-(nilai_mat+nilai_prov+nilai_asur+isnull(c.kompensasi,0)) nilai_cair "+
							 "from  kop_pinj_m a inner join kop_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+		
							 "		left join (   "+
							 
							 "           select a.param3, a.no_ref1, a.kode_lokasi, sum(a.nilai1) as kompensasi "+
							 "			 from trans_m a "+
							 "			 where a.param2='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form='PJKOMP' "+
							 "			 group by a.param3, a.no_ref1, a.kode_lokasi "+
							 "			 ) c on c.param3=a.no_agg and a.no_pinj = c.no_ref1 and a.kode_lokasi=c.kode_lokasi "+

							 "where  a.no_kas ='"+this.e_nb.getText()+"' and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_agg"; 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg5.appendData(["CAIR",line.no_agg,line.nama,line.no_pinj,line.kode_param,line.akun_piutang,floatToNilai(line.nilai),floatToNilai(line.biaya),floatToNilai(line.kompensasi),floatToNilai(line.nilai_cair)]);
					}
				} else this.sg5.clear(1);
				this.sg5.validasi();

				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='BEBAN' and a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);			

				var data = this.dbLib.getDataProvider( 
							"select a.kode_gar,a.kode_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+ 
							"from angg_r a inner join masgar b on a.kode_gar=b.kode_gar and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_gar",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_gar,line.kode_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);			
			}									
		} catch(e) {alert(e);}
	},
	doHitungGar: function(){
		this.dataAkunGar = {rs:{rows:[]}};		
		var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataAkunGar = data;
		}

		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			for (var n=0;n<this.dataAkunGar.rs.rows.length;n++) {
				var line = this.dataAkunGar.rs.rows[n];
				if (line.kode_gar == this.sg1.cells(0,i)) {		
					if (this.sg1.rowValid(i) && this.sg1.cells(2,i) != "-"){				
						if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
						else nilai = nilaiToFloat(this.sg1.cells(4,i)) * -1;				
						var isAda = false;
						var idx = total = 0;
						for (var j=0;j < this.sg2.getRowCount();j++){
							if (this.sg1.cells(0,i) == this.sg2.cells(0,j)) {
								isAda = true;
								idx = j;
								break;
							}
						}
						if (!isAda) {
							this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(5,i),"0",floatToNilai(nilai),"0"]);
						} 
						else { 
							total = nilaiToFloat(this.sg2.cells(3,idx));
							total = total + nilai;
							this.sg2.setCell(3,idx,total);
						}
					}
				}
			}
		}

		var sakhir = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_release1('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_release2('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");			
				this.sg2.cells(2,i,floatToNilai(parseFloat(data[0])));
				sakhir = parseFloat(data[0]) - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sakhir));
			}
		}					
	}
});