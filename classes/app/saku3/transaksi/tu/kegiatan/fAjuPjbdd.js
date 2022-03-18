window.app_saku3_transaksi_tu_kegiatan_fAjuPjbdd = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kegiatan_fAjuPjbdd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kegiatan_fAjuPjbdd";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Panjar Kegiatan - BDD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,12,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Pengajuan","Uraian","Kegiatan","Nilai"],
					colWidth:[[3,2,1,0],[100,350,300,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,12,98,18]}); 		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Kode Transaksi",items:["PANJAR"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"MTA BDD",tag:2,multiSelection:false});         				
		this.cb_keg = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"ID Kegiatan",tag:1,multiSelection:false,change:[this,"doChange"]});		
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Pemegang",tag:1,change:[this,"doChange"], readOnly:true});				
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve",tag:2,multiSelection:false});    		     				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,550,20],caption:"Uraian", maxLength:150});					
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Saldo Kegiatan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_dasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Dasar Permintaan", maxLength:150});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total Pengajuan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[2,12,995,235], childPage:["Item Pertanggungan","Panjar Terbuka","Data Rekening","Catatan Approval"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:0,
		            colTitle:["Kode PP","Nama PP","Nilai"],
					colWidth:[[2,1,0],[100,250,100]],					
					columnReadOnly:[true,[1],[0,2]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["No Agenda","Tanggal","Due Date","Keterangan","Nilai","Umur (Hari)"],					
					colWidth:[[5,4,3,2,1,0],[80,100,400,80,80,100]],readOnly :true,colFormat:[[4,5],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});		
		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,550,20],caption:"Nama Rekening", maxLength:50});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,550,20],caption:"No Rekening", maxLength:50});				
		this.e_bank = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,550,20],caption:"Bank - Cabang", maxLength:100});				
		
		this.e_nover = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,550,20],caption:"No Verifikasi", tag:9, readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[3],{bound:[20,18,550,60],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);			
		
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
			
			this.flagGarFree = "0"; 
			this.flagDokFree = "0";
			this.akunPJ = "-";	 
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('GARFREE','DOKFREE','ITPJR') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;		
					if (line.kode_spro == "ITPJR") this.akunPJ = line.flag;																
					
				}
			}
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			//nik ngambil dr nik panjar di form kegiatan
			this.cb_nik.setSQL("select a.nik,a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+								
								"where b.kode_flag in ('054') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
											
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kegiatan_fAjuPjbdd.extend(window.childForm);
window.app_saku3_transaksi_tu_kegiatan_fAjuPjbdd.implement({	
	doChangeCell1: function(sender, col, row){
		if ((col == 2) && (sender.cells(2,row) != "")) sender.validasi();
		sender.onChange.set(undefined,undefined);	    					
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(2,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(2,i));					
				}
			}						
			this.e_total.setText(floatToNilai(totD - totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick1: function(sender, col, row){
		try{									
			if (col == 0){
				this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
						"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",
						"select count(a.kode_pp)  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",
						["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
			}							
		}catch(e){
			systemAPI.alert(e);
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
						sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_multi where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");										
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}

					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,due_date,dasar,nik_app, no_ajukeg) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.akunPJ+"','"+this.app._kodePP+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','"+this.cb_nik.getText()+"','-','"+this.app._namaUser+"','PMULTIBDD','NON',0,'"+this.dp_d2.getDateString()+"','"+this.e_dasar.getText()+"','"+this.cb_app.getText()+"','"+this.cb_keg.getText()+"')");															
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','-',"+nilaiToFloat(this.e_total.getText())+",'-')");																				
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								                           
								sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
										"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.sg1.cells(0,i)+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+",'BEBAN')");

								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.sg1.cells(0,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.sg1.cells(2,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);											
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.sg1.clear(1);									
					this.sg3.clear(1);	
					this.sg.clear(1);		
					this.cb_keg.setSQL("select no_aju,keterangan from keg_aju_m where progress = '1' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);			
					this.doClick();
				break;
			case "simpan" :				
			case "ubah" :			
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);	
				
				this.preView = "1";
				if (this.akunPJ == "-") {
					system.alert(this,"Transaksi tidak valid.","Akun Panjar belum di setting di SPRO (Kode:ITPJR)");
					return false;						
				}	
				var data = this.dbLib.getDataProvider("select count(no_aju) as jml from it_aju_m where progress ='0' and nik_panjar ='"+this.cb_nik.getText()+"' and modul = 'PANJAR' and no_ptg='-' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					if (parseFloat(line.jml) + 1 >  this.maxPJ) {
						system.alert(this,"Transaksi tidak valid.","Panjar Outstanding sudah maksimal.");
						return false;						
					}
				}
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
					}										
				}				
			
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi saldo kegiatan.");
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
				sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_multi where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");														
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
		var data = this.dbLib.getDataProvider("select dateadd(day,14,'"+this.dp_d1.getDateString()+"') as due_date",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.dp_d2.setText(line.due_date);
			} 
		}
		if (this.stsSimpan == 1) {
			this.cb_keg.setSQL("select no_aju,keterangan from keg_aju_m where progress = '1' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);
			this.doClick();
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);
			this.sg3.clear(1);
			this.cb_keg.setSQL("select no_aju,keterangan from keg_aju_m where progress = '1' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);			
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_akun.setFocus();
		this.stsSimpan = 1;
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if (sender == this.cb_keg && this.cb_keg.getText()!= ""){			
			var data = this.dbLib.getDataProvider(
				      "select a.nik_panjar,a.nilai-isnull(b.pakai,0) as saldo "+
					  "from keg_aju_m a "+
						"left join (   "+
						"    select no_ajukeg,kode_lokasi,  sum(nilai)  as pakai "+
						"    from it_aju_m where kode_lokasi='"+this.app._lokasi+"' and no_aju <>'"+this.e_nb.getText()+"' and progress+modul <> '4PANJAR' "+
						"    group by no_ajukeg,kode_lokasi "+
						" ) b on a.no_aju = b.no_ajukeg and a.kode_lokasi=b.kode_lokasi "+
					  "where a.no_aju ='"+this.cb_keg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];												
				this.cb_nik.setText(line.nik_panjar);
				this.e_saldo.setText(floatToNilai(line.saldo));
			}
		}

		if (sender == this.cb_nik && this.cb_nik.getText()!= ""){			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			var data = this.dbLib.getDataProvider("select no_aju,convert(varchar,tanggal,103) as tgl,convert(varchar,due_date,103) as due_date,keterangan,nilai,DATEDIFF(DAY,tanggal,getdate()) as umur "+
			           "from it_aju_m where progress ='3' and nik_panjar ='"+this.cb_nik.getText()+"' and modul = 'PANJAR' and no_ptg='-' and kode_lokasi='"+this.app._lokasi+"' and no_aju <> '"+this.e_nb.getText()+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg3.appendData([line.no_aju,line.tgl,line.due_date,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.umur)]);
				}
			} else this.sg3.clear(1);
			
			var data = this.dbLib.getDataProvider("select isnull(jml,0) as jml from nik_panjar where nik ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];												
				this.maxPJ = parseFloat(line.jml);									
			}
		}
	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							this.nama_report="server_report_saku2_kopeg_kbitt_rptPanjarFormTu";
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
							this.pc1.hide();
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
							this.dataPP = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
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
			this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.sg1.clear(1);					
			this.sg3.clear(1);	
			this.sg.clear(1);		
			this.cb_keg.setSQL("select no_aju,keterangan from keg_aju_m where progress = '1' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);			
			this.doClick();			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){						
		if (this.app._userStatus == "A") 
			var strSQL = "select a.no_aju, a.keterangan, a.no_ajukeg+' | '+b.keterangan as kegiatan, a.nilai "+
						 "from it_aju_m a "+
						 "inner join keg_aju_m b on a.no_ajukeg=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where a.form = 'PMULTIBDD' and a.modul='PANJAR' and a.progress in ('A','K','R') and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"'";					 			
		else 
			var strSQL = "select a.no_aju, a.keterangan, a.no_ajukeg+' | '+b.keterangan as kegiatan, a.nilai "+
						 "from it_aju_m a "+
						 "  inner join keg_aju_m b on a.no_ajukeg=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "where c.kode_bidang ='" + this.app._kodeBidang + "' and a.form = 'PMULTIBDD' and a.modul='PANJAR' and a.progress in ('A','K','R') and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"'";					 			

		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {		
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg.appendData([line.no_aju,line.keterangan,line.kegiatan,floatToNilai(line.nilai)]); 							
			}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);											
				this.pc1.setActivePage(this.pc1.childPage[0]);		
				
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				
				this.e_nb.setText(this.sg.cells(0,row));		

				var data = this.dbLib.getDataProvider("select a.nik_app,b.kode_akun,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.nik_panjar,a.due_date,a.dasar, "+
						   "c.bank,c.no_rek,c.nama_rek, a.no_ajukeg "+
						   "from it_aju_m a "+						   
						   "inner join (select top 1 no_aju,kode_akun from it_aju_multi where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') b  on a.no_aju=b.no_aju "+
						   "inner join it_aju_rek c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi "+
						   "left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
						   "          from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
						   "          where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"') x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   					   
						   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];		
					this.cb_keg.setSQL("select no_aju,keterangan from keg_aju_m where no_aju='"+line.no_ajukeg+"' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);			
					this.cb_keg.setText(line.no_ajukeg);	

					this.dp_d1.setText(line.tanggal);
					this.dp_d2.setText(line.due_date);
					this.c_jenis.setText(line.modul);					
					this.cb_app.setText(line.nik_app);
					this.cb_akun.setText(line.kode_akun);
					this.cb_nik.setText(line.nik_panjar);
					this.e_ket.setText(line.keterangan);
					this.e_dasar.setText(line.dasar);
					this.e_total.setText(floatToNilai(line.nilai));										
					
					this.e_namarek.setText(line.nama_rek);
					this.e_norek.setText(line.no_rek);
					this.e_bank.setText(line.bank);

					this.e_nover.setText(line.no_ver);
					this.e_memo.setText(line.catatan);					

				}

				var data = this.dbLib.getDataProvider("select b.kode_pp,b.nama as nama_pp,a.nilai "+
													  "from it_aju_multi a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+														  													  
													  "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_pp,line.nama_pp,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);	

				
			}
		} catch(e) {alert(e);}
	}	
});