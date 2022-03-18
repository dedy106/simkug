window.app_saku3_transaksi_tu_proyekbaru_fPrAjuBeban = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fPrAjuBeban.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fPrAjuBeban";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Beban Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,460], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
				colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Jenis"],
							colWidth:[[4,3,2,1,0],[80,100,500,80,100]],
							colFormat:[[3],[cfNilai]],readOnly:true,
							dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});				
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 					
		this.cb_id = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"ID Proyek",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_uraian = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi Proyek", readOnly:true});				
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Akun Beban",tag:1,readOnly:true});         						
		this.cb_drk = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"DRK",tag:1,readOnly:true});         						
		this.e_saldobmhd = new saiLabelEdit(this.pc2.childPage[0],{bound:[370,15,200,20],caption:"Saldo BMHD", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_nsaldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Saldo OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_saldosch = new saiLabelEdit(this.pc2.childPage[0],{bound:[370,19,200,20],caption:"Saldo Schedule", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai Bruto", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"], readOnly:true});
		this.e_tgladm = new saiLabelEdit(this.pc2.childPage[0],{bound:[370,17,200,20],caption:"TglMax Adminstrsi", tag:1, readOnly:true});				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Status Pajak",items:["NON","P21","P23"], readOnly:true,tag:2, change:[this,"doChange"]});						
		this.e_npajak = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Potongan Pajak", tag:0, tipeText:ttNilai, text:"0", readOnly:true , change:[this,"doChange"], readOnly:true});
		this.e_netto = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Total Netto", tag:0, tipeText:ttNilai, text:"0" , readOnly:true});		
		
		this.e_file = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:0});		
		this.uploader = new uploader(this.pc2.childPage[0],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});					

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,174], childPage:["Rekening Penerima","User & Verifikasi"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
		            colTitle:["Nama Rek","No Rek","Bank-Cabang","Nilai Bruto","Nilai Pajak"],
								colWidth:[[4,3,2,1,0],[100,100,250,200,250]],					
								colFormat:[[3,4],[cfNilai,cfNilai]],checkItem: true,
								change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],					
								afterPaste:[this,"doAfterPaste"],
								pasteEnable:true,autoPaging:true,rowPerPage:500,
								autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,550,20],caption:"User input", maxLength:50,tag:2});						
		this.e_nover = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,550,20],caption:"No Verifikasi", tag:9, readOnly:true, visible:false});										
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,550,80],caption:"Catatan",tag:9, readOnly:true, visible:false});
		this.e_memo.setReadOnly(true);		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
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

			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Beban",true);												
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							  "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.c_jenis.setText("UMUM");
			this.e_user.setText(this.app._namaUser);
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fPrAjuBeban.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fPrAjuBeban.implement({
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {			
			this.doNilaiChange1();
		} catch(e) {alert(e);}
	},
	doChangeCell1: function(sender, col, row){
		if (col == 3 || col == 4) this.sg1.validasi();
	},
	doNilaiChange1: function(){		
		try{
			var totD = pajak = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != "" && this.sg1.cells(4,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(3,i));					
					pajak += nilaiToFloat(this.sg1.cells(4,i));					
				}
			}						
			this.e_nilai.setText(floatToNilai(totD));
			this.e_npajak.setText(floatToNilai(pajak));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doChange:function(sender){		
		if ((sender==this.cb_pp || this.e_periode.getText()) && this.cb_pp.getText()!="" && this.e_periode.getText()!="" && this.stsSimpan == 1) {						
			this.cb_id.setSQL("select kode_proyek, nama from prb_proyek where versi='PRO20' and substring(convert(varchar,tgl_mulai,112),1,6) <= '"+this.e_periode.getText()+"' and progress in ('1','2') and modul='PROYEK' and pp_rab='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Proyek","Keterangan"],"and","Data Proyek",true);												
		}

		if ((sender == this.e_nilai || this.e_npajak) && this.e_nilai.getText()!="" && this.e_npajak.getText()!="") {
			var netto = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText());
			this.e_netto.setText(floatToNilai(netto));
		}

		if (sender==this.cb_id && this.cb_id.getText()!="") {	
			//utk OR total nilaior adalah jenis modul = seluruhnya [AJUBEBAN + BDD]
			var strSQL =  "select a.kode_pp,convert(varchar,a.tgl_admin,103) as tgl_admin,a.nama,b.kode_drkb,b.akun_beban,b.akun_bdd,(a.nilai_or - a.pph42) - isnull(c.beban,0) as saldo_or, b.akun_bmhd,isnull(d.bmhd,0) as saldo_bmhd "+
			              "from prb_proyek a "+			             
			              "   inner join prb_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            
						 
						  "   left join ( "+			             
						  "		select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as beban "+
						  "		from prb_prbeban_d where kode_lokasi='"+this.app._lokasi+"' and "+
						  "		no_bukti <> '"+this.e_nb.getText()+"' "+
						  "		group by kode_proyek,kode_lokasi "+			             
						  "   ) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+

						  "   left join ( "+
                    	  "      select kode_proyek, kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bmhd "+ 
						  "      from prb_bmhd_d a "+
						  "      group by kode_proyek,kode_lokasi "+                
						  ") d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+
									
						  "where a.versi='PRO20' and a.kode_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			 			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];		
				this.ppKelola = line.kode_pp;		
				this.e_nsaldo.setText(floatToNilai(line.saldo_or));				
				this.e_saldobmhd.setText(floatToNilai(line.saldo_bmhd));				
				this.e_uraian.setText(line.nama);	
				this.cb_akun.setText(line.akun_beban);
				this.akunBDD = line.akun_bdd;
				this.cb_drk.setText(line.kode_drkb);
				this.e_tgladm.setText(line.tgl_admin);
				var d = new Date();	
				this.d1 = d.strToDate(line.tgl_admin);				
				if (this.stsSimpan == 1) this.e_uraian.setFocus();				
			}

			if (nilaiToFloat(this.e_nsaldo.getText()) == 0 && nilaiToFloat(this.e_saldobmhd.getText()) != 0) {
				this.modeBMHD = "BMHD";				
				this.cb_akun.setText(line.akun_bmhd);				
				this.cb_drk.setText("-","-");
			}
			else this.modeBMHD = "NON";

		}	
		
		if ((sender == this.e_periode || sender == this.cb_id) && this.e_periode.getText()!="" && this.cb_id.getText()!="") {			
			//hanya yang modulnya = AJUBEBAN sebagai pengurang nilai beban sch
			this.e_saldosch.setText("0");
			var strSQL = "select b.nilai_beban-isnull(c.totbeban_sch,0) as saldo_beban_sch "+
						"from prb_proyek_d b "+

						"left join ("+
						"		select kode_proyek,kode_lokasi,periode_sch,sum(case dc when 'D' then nilai else -nilai end) as totbeban_sch "+
						"		from prb_prbeban_d "+
						"		where modul = 'AJUBEBAN' and kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_id.getText()+"' and no_bukti<>'"+this.e_nb.getText()+"' "+
						"		group by kode_proyek,kode_lokasi,periode_sch "+
						") c on b.kode_proyek=c.kode_proyek and b.periode=c.periode_sch and b.kode_lokasi=c.kode_lokasi "+

						"where b.kode_proyek='"+this.cb_id.getText()+"' and b.periode='"+this.e_periode.getText()+"' and b.kode_lokasi ='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.e_saldosch.setText(floatToNilai(line.saldo_beban_sch));									
			}	
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.stsSimpan == 0) {					
						sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PRBEBAN'");																						
						sql.add("delete from it_aju_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						//jika sbg transaksi BMHD
						sql.add("delete from prb_bmhd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,no_ref1,dasar) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','"+this.cb_drk.getText()+"','"+this.cb_id.getText()+" | "+this.e_ket.getText()+"',"+nilaiToFloat(this.e_netto.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','A','-','-','"+this.e_user.getText()+"','PRBEBAN','"+this.c_status.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.modeBMHD+"','"+this.cb_pp.getText()+"')");				
					
					//jurnal bisa lebih dari satu akun (it_aju_d), akun_beban proyek dan akun_bdd 
					//(jika nilai pengajuan melebihi saldo schedule,kelebihan nilai pengajuan (nilai aju-saldo sch) di BDD-kan)		

					if (this.modeBMHD == "NON") {
						var nilaiBeban = nilaiBDD = 0;
						if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldosch.getText()))	{
							nilaiBeban = nilaiToFloat(this.e_saldosch.getText());
							nilaiBDD = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_saldosch.getText());						
							sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.ppKelola+"','-','"+this.e_ket.getText()+"','D',"+nilaiBDD+",getdate(),'"+this.cb_id.getText()+"','BDD','-','ITAJU')");									
							sql.add("insert into it_aju_d (no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,akun_seb) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunBDD+"','"+this.cb_id.getText()+" | "+this.e_ket.getText()+"','D','IDR',1,"+nilaiBDD+","+nilaiBDD+",'"+this.ppKelola+"','-','"+this.app._lokasi+"','PRBEBAN','BDD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-')");		
						}
						else {
							nilaiBeban = nilaiToFloat(this.e_nilai.getText());						
						}
						
						if (nilaiBeban != 0) {
							sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','"+this.cb_drk.getText()+"','"+this.cb_id.getText()+" | "+this.e_ket.getText()+"','D',"+nilaiBeban+",getdate(),'"+this.cb_id.getText()+"','AJUBEBAN','-','ITAJU')");												
							sql.add("insert into it_aju_d (no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,akun_seb) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.cb_id.getText()+" | "+this.e_ket.getText()+"','D','IDR',1,"+nilaiBeban+","+nilaiBeban+",'"+this.ppKelola+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','PRBEBAN','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-')");		
							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
									"('"+this.e_nb.getText()+"','PRBEBAN','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiBeban+")");
						}

					}					
					else {
						//BMHD
						sql.add("insert into it_aju_d (no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,akun_seb) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.ppKelola+"','-','"+this.app._lokasi+"','PRBEBAN','BMHD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-')");		
						sql.add("insert into prb_bmhd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.cb_id.getText()+"','AJUBMHD','-')");	
					}

					//nyimpen kode_pp transaksi
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){				
								var nbersih = 	nilaiToFloat(this.sg1.cells(3,i)) - nilaiToFloat(this.sg1.cells(4,i));
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','-',"+nbersih+",'"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'-')");																						
							}
						}
					}

					sql.add("insert into it_aju_dok(no_bukti,modul,no_gambar,kode_lokasi)values('"+this.e_nb.getText()+"','PRBEBAN','"+this.e_file.getText()+"','"+this.app._lokasi+"')");

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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.sg1.clear(1); this.sg3.clear(1);
					this.e_nover.hide();
					this.e_memo.hide();
					if (this.stsSimpan == 1) this.doClick();
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";							
				this.c_jenis.setText("UMUM");

				var d = new Date();
				this.d2 = d.strToDate(this.dp_d1.getText());
				var jumlah = this.d2.DateDiff(this.d1);
				if (jumlah > 0) {
					system.alert(this,"Transaksi tidak valid.","Tanggal Transaksi melebihi Tgl Maksimal Administrasi");
					return false;
				}
				if (nilaiToFloat(this.e_npajak.getText()) != 0 && this.c_status.getText()=="NON") {
					system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak sesuai dengan status pajak.");
					return false;
				}
				if (nilaiToFloat(this.e_npajak.getText()) == 0 && this.c_status.getText()!="NON") {
					system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak sesuai dengan status pajak.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (this.modeBMHD == "NON" && (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nsaldo.getText()))) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo OR.");
					return false;
				}
				if (this.modeBMHD == "BMHD" && (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldobmhd.getText()))) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo BMHD.");
					return false;
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PRBEBAN'");																
				
				//jika sbg transaksi BMHD
				sql.add("delete from prb_bmhd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		
		if (this.stsSimpan == 1) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun ='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' union select '-','-'",["kode_drk","nama"],false,["Kode","Nama"],"and","Akun DRK",true);												
			this.doClick();
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);			
			this.e_nilai.setText("0");	
			this.e_nover.hide();
			this.e_memo.hide();					
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_id.setFocus();
		setTipeButton(tbSimpan);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if (this.dataUpload && this.stsSimpan==1) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							if (this.stsSimpan==0) {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							}

							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_proyek_rptAgenda";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.e_nover.hide();
			this.e_memo.hide();
			this.sg1.clear(1); this.sg3.clear(1);
			if (this.stsSimpan == 1) this.doClick();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){		
		var strSQL = "select distinct a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.no_ref1 "+
					 "from it_aju_m a "+					 
					 "	  inner join karyawan_pp b on a.dasar=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
		             "where  a.form = 'PRBEBAN' and a.modul='UMUM' and a.progress in ('0','A','R') and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'";	
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
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),line.no_ref1]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);		
				
				this.e_nover.show();
				this.e_memo.show();
				
				this.stsSimpan = 0;					
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.modeBMHD =  this.sg3.cells(4,row);
				
				if (this.modeBMHD == "BMHD")
					var strSQL = "select distinct aa.kode_proyek,a.progress,a.modul,a.tanggal,a.periode,substring(a.keterangan,18,200) as keterangan,a.nilai+a.npajak as bruto,a.npajak,a.sts_pajak,a.dasar as kode_pp,a.kode_akun,a.kode_drk,"+
								 "isnull(x.no_ver,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.user_input "+
								 "from it_aju_m a "+
								 "				inner join prb_bmhd_d aa on a.no_aju=aa.no_bukti and a.kode_lokasi=aa.kode_lokasi and aa.modul in ('AJUBMHD') "+						     
								 "				left join ver_d x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
								 "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				else 
					var strSQL = "select distinct aa.kode_proyek,a.progress,a.modul,a.tanggal,a.periode,substring(a.keterangan,18,200) as keterangan,a.nilai+a.npajak as bruto,a.npajak,a.sts_pajak,a.dasar as kode_pp,a.kode_akun,a.kode_drk,"+
								"isnull(x.no_ver,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.user_input , isnull(o.no_gambar,'') as no_gambar  "+						     
								"from it_aju_m a "+
								"				inner join prb_prbeban_d aa on a.no_aju=aa.no_bukti and a.kode_lokasi=aa.kode_lokasi and aa.modul in ('AJUBEBAN','BDD') "+						     
								"				left join ver_d x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
								"				left join it_aju_dok o on a.no_aju=o.no_bukti and a.kode_lokasi=o.kode_lokasi "+					   
								"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_akun.setText(line.kode_akun);
						this.cb_pp.setText(line.kode_pp);	
						this.cb_drk.setText(line.kode_drk);					
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.bruto));				
						this.e_npajak.setText(floatToNilai(line.npajak));							
						this.e_user.setText(line.user_input);
						this.e_nover.setText(line.no_ver);					
						this.c_status.setText(line.sts_pajak);								

						this.e_memo.setText(line.catatan);					
						this.cb_id.setSQL("select kode_proyek, nama from prb_proyek where kode_proyek='"+line.kode_proyek+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Deskripsi"],"and","Data Proyek",true);												
						this.cb_id.setText(line.kode_proyek);

						this.e_file.setText(line.no_gambar);
						this.fileBfr = line.no_gambar;
					} 
				}	
				
				var data = this.dbLib.getDataProvider("select *,nilai+pajak as bruto from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.nama_rek,line.no_rek,line.bank,floatToNilai(line.bruto),floatToNilai(line.pajak)]);
					}
				} else this.sg1.clear(1);	
															
			}									
		} catch(e) {alert(e);}
	}	
});