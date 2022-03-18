window.app_saku3_transaksi_cianjur_hutang_fPbNonAkruPro = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_hutang_fPbNonAkruPro.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_hutang_fPbNonAkruPro";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Bayar Non Akru Proyek", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Permintaan","List Permintaan"]});
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Total"],
					colWidth:[[4,3,2,1,0],[100,250,200,80,100]],colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Permintaan",click:[this,"doLoad3"]});

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No PB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18]}); 
        this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});						
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun Hutang", multiSelection:false, maxLength:10, tag:2});
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,210,20],caption:"Saldo OR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		this.cb_project = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"ID Project", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});	
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,210,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,15,210,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});		
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Vendor",multiSelection:false, maxLength:10, tag:2});											
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,19,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,190], childPage:["Data Item Jurnal"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,250,40,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			this.stsSimpan = 1;					
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '024' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Hutang",true);		
			this.cb_project.setSQL("select kode_proyek, nama from pr_proyek where kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);					
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);						
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);						
						
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','PPNM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;			
				}
			}
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();			
			sql.add("select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_hutang_fPbNonAkruPro.extend(window.childForm);
window.app_saku3_transaksi_cianjur_hutang_fPbNonAkruPro.implement({
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
					if(this.stsSimpan == 0){
						sql.add("delete from pb_m where no_pb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_m where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}					

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AP','PBNONHUTPR','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_ppn.getText())+",0,'"+this.cb_app.getText()+"','-','-', '-','-','-', '"+this.cb_project.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_akun.getText()+"')");

					sql.add("insert into pb_m (no_pb,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_tahu,kode_vendor,no_hutang,no_spb,nilai,progress,no_ver) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.cb_vendor.getText()+"','"+this.e_nb.getText()+"','-',"+nilaiToFloat(this.e_total.getText())+",'0','-')");

					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_project.getText()+"','"+this.cb_vendor.getText()+"','IDR',1,'"+this.cb_app.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','X',"+parseNilai(this.e_ppn.getText())+")");									
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PBNONHUTPR','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunPPN+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PBNONHUTPR','PPNM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','IDR',1,"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','PBNONHUTPR','BBN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");	
								sql.add("insert into pr_beban_d(no_bukti,kode_akun,keterangan,dc,nilai,kode_pp,kode_proyek,kode_lokasi,modul) values "+
										"('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.cb_project.getText()+"','"+this.app._lokasi+"','PBNONHUTPR')");							
							}
						}
					}

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_hutang,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,no_urut,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					setTipeButton(tbSimpan);
					this.doClick();
				break;
			case "simpan" :		
			case "ubah"	:	
				this.preView = "1";																		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
				if (this.flagGarFree == "0") {
									
					for (var i=0;i < this.sg.getRowCount();i++){
						if (!this.sg.rowValid(i)){
							var isKosong = true;
							for (var j=0;j < this.sg.getColCount();j++){
								if (this.sg.cells(j,i) != "") {
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
					
				}							
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
                }
                if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh lebih dari Saldo OR.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}						  	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from pb_m where no_pb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_m where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;		
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		if(this.stsSimpan == 1) this.doClick();		
				
	},
	doChange:function(sender){		
		if (sender == this.e_ppn && this.e_ppn.getText()!="") {
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
        }
        if (sender == this.cb_project && this.cb_project.getText()!="" && this.stsSimpan == 1) {
			var strSQL = "select a.kode_proyek,a.nama,a.nilai_or, a.nilai_or-isnull(b.tot_beban,0) as saldo_or "+
			"from pr_proyek a "+
			"left join "+
			"(select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_beban "+
			"from pr_beban_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_project.getText()+"' "+
			"group by kode_proyek) b on a.kode_proyek=b.kode_proyek "+
			"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek='"+this.cb_project.getText()+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.e_saldo.setText(floatToNilai(line.saldo_or));					
				} 
			}
		}
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {				
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "") {							
				this.sg.validasi();			
			}
		}
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
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){										
					if (this.sg.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg.cells(4,i));
					else tot += nilaiToFloat(this.sg.cells(4,i));									
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
			this.e_total.setText(floatToNilai(Math.round(tot + nilaiToFloat(this.e_ppn.getText()))));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"D");						
					}
				break;			
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
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
							if (this.cb1.isSelected()) {	
								if(this.preView == "1"){
									this.nama_report="server_report_saku3_cianjur_rptHutangPb";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
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
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
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
			this.sg.clear(1); 											
			setTipeButton(tbSimpan);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select distinct a.no_hutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai "+
					"from hutang_m a inner join trans_m b on a.no_hutang=b.no_bukti  and a.kode_lokasi=b.kode_lokasi "+
					"inner join pb_m c on a.no_hutang=c.no_pb and a.kode_lokasi=c.kode_lokasi "+
					"where b.posted='F' and a.periode='"+this.e_periode.getText()+"' and c.progress='0' and a.kode_project <> '-' and a.kode_lokasi='"+this.app._lokasi+"' and b.form = 'PBNONHUTPR'";						
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
			this.sg3.appendData([line.no_hutang,line.tanggal,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
								
				var strSQL = "select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_pp,a.akun_hutang,a.nik_app,a.kode_vendor,a.kode_project,c.nama as nama_vendor,nilai_ppn "+						 
						 "from hutang_m a inner join pb_m b on a.no_hutang=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_hutang='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);					
						this.dp_d2.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
                        this.e_ket.setText(line.keterangan);
                        this.cb_project.setText(line.kode_project);
						this.cb_pp.setText(line.kode_pp);
						this.cb_app.setText(line.nik_app);
						this.cb_akun.setText(line.akun_hutang);					
						this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);					
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));					
					} 
                }	
                var strSQL = "select a.kode_proyek,a.nama,a.nilai_or, a.nilai_or-isnull(b.tot_beban,0)+isnull(c.tot_beban,0) as saldo_or "+
				"from pr_proyek a "+
				"left join "+
				"(select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_beban "+
				"from pr_beban_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_project.getText()+"' "+
				"group by kode_proyek) b on a.kode_proyek=b.kode_proyek "+
				"left join "+
				"(select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_beban "+
				"from pr_beban_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_project.getText()+"' and no_bukti='"+this.e_nb.getText()+"' "+
				"group by kode_proyek) c on a.kode_proyek=c.kode_proyek "+
				"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek='"+this.cb_project.getText()+"' ";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line3 = data.rs.rows[0];							
					if (line3 != undefined){		
						this.e_saldo.setText(floatToNilai(line3.saldo_or));					
					} 
				}		
				strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(a.kode_drk,'-') as kode_drk,isnull(e.nama,'-') as nama_drk  "+
							"from hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"             		 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
							"             		 left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and substring(a.periode,1,4)=e.tahun "+
							"where a.jenis = 'BBN' and a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.kode_akun,line2.nama_akun,line2.dc,line2.keterangan,floatToNilai(line2.nilai),line2.kode_pp,line2.nama_pp]);
					}
				} else this.sg.clear(1);						
				this.sg.validasi();
				}									
		} catch(e) {alert(e);}
	}
});