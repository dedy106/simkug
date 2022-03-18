window.app_saku3_transaksi_tu_bmhd_fAjuBMHDju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_bmhd_fAjuBMHDju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_bmhd_fAjuBMHDju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian BMHD-JU", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Usulan","Data BMHD","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		             colTitle:["No Bukti","No Agenda","Tanggal","Kode Vendor","Nama Vendor","Keterangan","Nilai","Kode PP"],
					 colWidth:[[7,6,5,4,3,2,1,0],[60,100,250,200,80,60,100,100]],readOnly:true,
					 colFormat:[[6],[cfNilai]],
					 dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2,visible:false});		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true,change:[this,"doChange"]});	
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Bagian / Unit",tag:1,readOnly:true}); 		
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"NIK Approver",tag:1, multiSelection:false});         				
		this.cb_vendor = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Kode Vendor", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_kb = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"No BuktiKas",tag:1,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun BMHD",tag:1,readOnly:true});         				
		this.cb_lawan = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Akun Penyelesaian",tag:1,multiSelection:false,change:[this,"doChange"]});         						
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"DRK",tag:1,multiSelection:false});         						
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Saldo BMHD", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Due Date", readOnly:true});										
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Penyelesaian", tag:1, tipeText:ttNilai, text:"0"});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,550,20],caption:"Uraian", maxLength:150});										
		
		this.cb_bukti = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9});
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);
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
		this.preView = "1";
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif ='1'  and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_lawan.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag ='034' where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.doLoad();			


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_bmhd_fAjuBMHDju.extend(window.childForm);
window.app_saku3_transaksi_tu_bmhd_fAjuBMHDju.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();			
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_kb.getText()+"','"+this.e_ket.getText()+"','-','BMHDREKLAS','"+this.c_jenis.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F','-','"+this.cb_drk.getText()+"','"+this.cb_lawan.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"	('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BMHDREKLAS','BMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"	('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_lawan.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','-','-','-','-','-','-','"+this.app._lokasi+"','BMHDREKLAS','LAWAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					

					sql.add("insert into bmhd_bayar (no_aju,no_bmhd,kode_lokasi,akun_bmhd,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','BMHDREKLAS','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','"+this.cb_vendor.getText()+"','NON',0)");
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','BMHDREKLAS','"+this.app._lokasi+"','"+this.cb_lawan.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+nilaiToFloat(this.e_nilai.getText())+")");								
					
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from bmhd_bayar where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_kb.getText()+"','"+this.e_ket.getText()+"','-','BMHDREKLAS','"+this.c_jenis.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','"+this.cb_drk.getText()+"','"+this.cb_lawan.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"	('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BMHDREKLAS','BMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"	('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_lawan.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','-','-','-','-','-','-','"+this.app._lokasi+"','BMHDREKLAS','LAWAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					

					sql.add("insert into bmhd_bayar (no_aju,no_bmhd,kode_lokasi,akun_bmhd,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','BMHDREKLAS','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','"+this.cb_vendor.getText()+"','NON',0)");
										
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','BMHDREKLAS','"+this.app._lokasi+"','"+this.cb_lawan.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+nilaiToFloat(this.e_nilai.getText())+")");								
					
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from bmhd_bayar where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.doLoad();
					this.cb_bukti.setSQL("select no_ju, keterangan from ju_m where periode='"+this.e_periode.getText()+"' and modul = 'BMHDREKLAS' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :		
				this.preView = "1";

				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.e_duedate.getText());
				if (d1 > d2) {							
					var k = i+1;
					system.alert(this,"Tanggal tidak valid.","Tanggal Penyelesaian harus lebih rendah dari Due Date.");
					return false;
				}

				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai Bruto melebih saldo.");
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
			case "ubah" :	
				this.preView = "1";
				this.ubah();
				break;				
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;		
			case "simpancek" : this.simpan();			
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

		this.cb_bukti.setSQL("select no_ju, keterangan from ju_m where periode='"+this.e_periode.getText()+"' and modul = 'BMHDREKLAS' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);
		this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_akun.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){		
		if (sender == this.cb_kb && this.cb_kb.getText() != "") {
			var strSQL =  "select c.kode_akun,c.nama,a.nilai-isnull(b.pakai,0) as saldo,convert(varchar,a.due_date,103) as due_date "+ 
						  "from bmhd_m a "+
						  "    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+	
						  
						  "    left join "+
						  "       (select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as pakai "+
						  "        from bmhd_bayar where kode_lokasi='"+this.app._lokasi+"' and no_aju<>'"+this.e_nb.getText()+"' group by no_bmhd,kode_lokasi "+
						  "       ) b on a.no_bmhd=b.no_bmhd and a.kode_lokasi=b.kode_lokasi "+

						  "where a.no_bmhd='"+this.cb_kb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.cb_akun.setText(line.kode_akun,line.nama);											
					this.e_saldo.setText(floatToNilai(line.saldo));		
					this.e_nilai.setText(floatToNilai(line.saldo));	
					this.e_duedate.setText(line.due_date);
				}
			}

		}

		if (sender == this.cb_lawan && this.cb_lawan.getText() != "") {
			var vSts = "0";
			var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_lawan.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.jml != 0) var vSts = "1"; 
				} 
			}

			if (vSts == "1") var strSQL = "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_lawan.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			else var strSQL = "select '-' as kode_drk, '-'  as nama ";

			this.cb_drk.setSQL(strSQL,["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		}
	},		
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tu_bmhd_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(1,row) == "-") {			
				setTipeButton(tbSimpan);
				this.stsSimpan = 1;
				this.pc1.setActivePage(this.pc1.childPage[1]);

				this.cb_kb.setText(this.sg1.cells(0,row),this.sg1.cells(5,row));	
				this.cb_vendor.setText(this.sg1.cells(3,row),this.sg1.cells(4,row));
				this.e_ket.setText(this.sg1.cells(5,row));
				this.cb_pp.setText(this.sg1.cells(7,row));
				this.tglAkru = this.sg1.cells(2,row);
			}
			if (this.sg1.cells(1,row) != "-") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(1,row));
				this.cb_kb.setText(this.sg1.cells(0,row),this.sg1.cells(5,row));	
				this.cb_vendor.setText(this.sg1.cells(3,row),this.sg1.cells(4,row));
				this.e_ket.setText(this.sg1.cells(5,row));	
				this.cb_pp.setText(this.sg1.cells(7,row));	
				this.tglAkru = this.sg1.cells(2,row);	
				
				var strSQL = "select ref1,nik_setuju,no_link from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.cb_lawan.setText(line.ref1);
						this.cb_drk.setText(line.no_link);	
						this.cb_app.setText(line.nik_setuju);	
					}
				}
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.cb_bukti.getText() != "") var filter = filter+" and d.no_aju = '"+this.cb_bukti.getText()+"' ";

			var strSQL = "select a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor,b.nama as nama_vendor,d.nilai,d.no_aju as no_aju,a.kode_pp "+
					 "from bmhd_m a "+
					//rudi-23/9/19 "inner join karyawan_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi and x.nik='"+this.app._userLog+"' "+
					 "inner join it_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join bmhd_bayar d on a.no_bmhd=d.no_bmhd and a.kode_lokasi=d.kode_lokasi and d.modul='BMHDREKLAS' "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_bmhd ";	
			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){	
		var strSQL = "select a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor,b.nama as nama_vendor,a.nilai-isnull(d.bayar,0) as nilai,'-' as no_aju,a.kode_pp "+
					 "from bmhd_m a "+
					 "inner join karyawan_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi and x.nik='"+this.app._userLog+"' "+
					 "inner join it_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
					 "left join ("+
					 "			select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
					 "			from  bmhd_bayar "+
					 "			where kode_lokasi='"+this.app._lokasi+"' group by no_bmhd,kode_lokasi "+
					 ") d on a.no_bmhd=d.no_bmhd and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai > isnull(d.bayar,0) order by a.no_bmhd ";		

		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bmhd,line.no_aju,line.tgl,line.kode_vendor,line.nama_vendor,line.keterangan,floatToNilai(line.nilai),line.kode_pp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
				this.pc1.setActivePage(this.pc1.childPage[0]);				
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
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doLoad();			
			this.cb_bukti.setSQL("select no_ju, keterangan from ju_m where periode='"+this.e_periode.getText()+"' and modul = 'BMHDREKLAS' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});