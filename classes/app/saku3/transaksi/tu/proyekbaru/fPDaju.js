window.app_saku3_transaksi_tu_proyekbaru_fPDaju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fPDaju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fPDaju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pegajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Agenda","Tanggal","Deskripsi","Nilai","NIK/NAMA SPPD"],
					colWidth:[[4,3,2,1,0],[200,100,300,80,100]],
					colFormat:[[3],[cfNilai]],												
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data by PP",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});				
		this.cb_buat = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Pembuat",tag:2,multiSelection:false});         				
		this.cb_spj = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK SPPD",tag:1,multiSelection:false,change:[this,"doChange"]});         						
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Jenis PD",items:["PROYEK"], readOnly:true,tag:2});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,314], childPage:["Data Proyek","Detail PD","Rekening"]});	
		this.cb_id = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"ID Proyek",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_uraian = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi Proyek", readOnly:true});				
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akun Beban",tag:1,readOnly:true});         						
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"DRK",tag:1,readOnly:true});         						
		this.e_saldobmhd = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Saldo BMHD", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_nsaldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_saldosch = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Saldo Schedule", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
				colTitle:["Kd Param","Nama Parameter","Jumlah","Nilai","Total"],
				colWidth:[[4,3,2,1,0],[100,100,100,300,100]],
				columnReadOnly:[true,[1,4],[0,2,3]],				
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],		
				buttonStyle:[[0],[bsEllips]], 										
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,22,300,20],caption:"Bank", maxLength:100, readOnly:true});						
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,23,450,20],caption:"Cabang", maxLength:100, readOnly:true});						
		this.e_norek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,24,300,20],caption:"No Rekeking", maxLength:100, readOnly:true});						
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,25,300,20],caption:"Nama Rekening", maxLength:100, readOnly:true});						

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		
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
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							"where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.cb_pp.setText(this.app._kodePP);
			this.cb_spj.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);				
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			this.cb_buat.setText(this.app._userLog);
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Beban",true);												
			
			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from tu_pd_param where kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

			this.c_jenis.setText("");

			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fPDaju.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fPDaju.implement({		
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
						sql.add("delete from tu_pdaju_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from tu_pdaju_d where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from prb_bmhd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into tu_pdaju_m (no_spj,tanggal,kode_lokasi,kode_pp,kode_akun,kode_drk,keterangan,nik_buat,nik_spj,periode,tgl_input,progress,no_app,nilai,jenis_pd,sts_bmhd,kode_proyek) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','-','-','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_spj.getText()+"','"+this.e_periode.getText()+"',getdate(),'0','-',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.c_jenis.getText()+"','"+this.modeBMHD+"','"+this.cb_id.getText()+"')");

					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							sql.add("insert into tu_pdaju_d (no_spj,kode_lokasi,kode_param,jumlah,nilai,total) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(4,i))+")");
						}
					}
					
					//proyek
					if (this.modeBMHD == "NON") {
						var nilaiBeban = nilaiBDD = 0;

						if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldosch.getText()))	{
							nilaiBeban = nilaiToFloat(this.e_saldosch.getText());
							nilaiBDD = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_saldosch.getText());						
							sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"','D',"+nilaiBDD+",getdate(),'"+this.cb_id.getText()+"','BDD','-','ITAJU')");																
						}
						else {
							nilaiBeban = nilaiToFloat(this.e_nilai.getText());						
						}					
						if (nilaiBeban != 0) {
							sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiBeban+",getdate(),'"+this.cb_id.getText()+"','AJUBEBAN','-','ITAJU')");																			
						}

					}					
					else {
						//BMHD
						sql.add("insert into prb_bmhd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.cb_id.getText()+"','AJUBMHD','-')");	
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
					setTipeButton(tbSimpan);
					this.sg1.clear(1);
					this.sg3.clear(1);
					this.stsSimpan = 1;
				break;
			case "simpan" :									
			case "ubah" :			
											
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						if (this.sg1.cells(0,i) == "12" && this.c_jenis.getText()!="LN") {
							system.alert(this,"Jenis PD tidak valid.","Kode Param 12 berjenis PD = LN.");
							return false;
						}
					}
				}

				var d = new Date();
				this.d2 = d.strToDate(this.dp_d1.getText());
				var jumlah = this.d2.DateDiff(this.d1);
				if (jumlah > 0) {
					system.alert(this,"Transaksi tidak valid.","Tanggal Transaksi melebihi Tgl Maksimal Administrasi");
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

				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();

				sql.add("delete from tu_pdaju_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from tu_pdaju_d where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_bmhd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun ='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' union select '-','-'",["kode_drk","nama"],false,["Kode","Nama"],"and","Akun DRK",true);												
			this.doClick();
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);				
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_pdaju_m","no_spj",this.app._lokasi+"-PD"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){	
		try {
			if (sender == this.cb_spj && this.cb_spj.getText()!="") {
				var strSQL = "select * from karyawan "+
							"where nik = '"+this.cb_spj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);						
					}
				}
			}

			if ((sender==this.cb_pp || sender == this.e_periode) && this.cb_pp.getText()!="" && this.e_periode.getText()!="" && this.stsSimpan == 1) {						
				this.cb_id.setSQL("select kode_proyek, nama from prb_proyek where versi='PRO20' and substring(convert(varchar,tgl_mulai,112),1,6) <= '"+this.e_periode.getText()+"' and progress in ('1','2') and modul='PROYEK' and kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Proyek","Keterangan"],"and","Data Proyek",true);												
			}

			if (sender==this.cb_id && this.cb_id.getText()!="") {	
				//utk OR total nilaior adalah jenis modul = seluruhnya [AJUBEBAN + BDD]
				var strSQL =  "select convert(varchar,a.tgl_admin,103) as tgl_admin,a.nama,b.kode_drkb,b.akun_beban,b.akun_bdd,(a.nilai_or - a.pph42) - isnull(c.beban,0) as saldo_or, b.akun_bmhd,isnull(d.bmhd,0) as saldo_bmhd "+
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
					this.e_nsaldo.setText(floatToNilai(line.saldo_or));				
					this.e_saldobmhd.setText(floatToNilai(line.saldo_bmhd));				
					this.e_uraian.setText(line.nama);	
					this.cb_akun.setText(line.akun_beban);
					this.akunBDD = line.akun_bdd;
					this.cb_drk.setText(line.kode_drkb);					
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
		}
		catch(e) {
			alert(e);
		}

	},	
	doNilaiChange1: function(){
		try{
			var tot  = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
				  tot += nilaiToFloat(this.sg1.cells(4,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 3) && (this.sg1.cells(3,row) != "" && this.sg1.cells(2,row) != "")) {
			var total = nilaiToFloat(this.sg1.cells(2,row)) * nilaiToFloat(this.sg1.cells(3,row));
			this.sg1.cells(4,row,total);	
			this.sg1.validasi();
		}
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {				
				var param = this.dataParam.get(sender.cells(0,row));				
				if (param) sender.cells(1,row,param);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Param "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}			
		sender.onChange.set(this,"doChangeCell1");		
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
						    "select kode_param,nama from tu_pd_param where kode_lokasi='"+this.app._lokasi+"' order by jenis",
							"select count(*) from tu_pd_param where kode_lokasi='"+this.app._lokasi+"'",
							["kode_param","nama"],"and",["Kode","Nama"],false);				
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
							this.nama_report="server_report_saku3_spj_rptPdFormTu";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
							this.filter2 = this.app._lokasi+"/"+this.e_periode.getText();
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
						}else system.info(this,result,"");
	    			break;		
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataParam.set(line.kode_param, line.nama);										
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
			setTipeButton(tbSimpan);
			this.sg1.clear(1);this.sg3.clear(1);
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){		
		//tu_pdaju_m (no_spj,tanggal,kode_lokasi,kode_pp,kode_akun,kode_drk,keterangan,nik_buat,nik_spj,periode,tgl_input,progress,no_app) values "+														
		var strSQL = "select a.no_spj, convert(varchar,a.tanggal,103) as tgl, a.keterangan, a.nilai, c.nik+' | '+c.nama as spj "+
					 "from tu_pdaju_m a "+
					 "		inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "		inner join karyawan c on a.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where b.nik='"+this.app._userLog+"' and a.progress in ('0') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"; //b.kode_pp='"+this.cb_pp.getText()+"'
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
			this.sg3.appendData([line.no_spj,line.tgl,line.keterangan,floatToNilai(line.nilai),line.spj]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var data = this.dbLib.getDataProvider("select * from tu_pdaju_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);						
						this.cb_buat.setText(line.nik_buat);	
						this.cb_spj.setText(line.nik_spj);	
						this.cb_pp.setText(line.kode_pp);	
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText(line.jenis_pd);
						this.cb_id.setText(line.kode_proyek);
						this.modeBMHD = line.sts_bmhd;
					} 
				}				
				
				var strSQL = "select a.*,b.nama from tu_pdaju_d a inner join tu_pd_param b on a.kode_param=b.kode_param "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_param,line.nama,floatToNilai(line.jumlah),floatToNilai(line.nilai),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);
				
				this.sg1.validasi();
					
			}						
		} catch(e) {alert(e);}
	}
	
});