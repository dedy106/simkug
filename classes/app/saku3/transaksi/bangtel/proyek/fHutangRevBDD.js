window.app_saku3_transaksi_bangtel_proyek_fHutangRevBDD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_proyek_fHutangRevBDD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_proyek_fHutangRevBDD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Hutang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","No Ref","Mitra","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,200,100,200,100,80,80,100]],
					colFormat:[[7],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,328], childPage:["Data Akru","Data Jurnal","Referensi Akru"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["No Hutang","Tanggal","Keterangan","Akun AP","Nilai","Saldo","Mitra","ID Proyek","Unit/Cabang"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,100,200,100,100,70,290,70,100]],					
					dblClick:[this,"doDoubleClick"],readOnly:true,colFormat:[[4,5],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.e_nohutang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"No Hutang", readOnly:true,tag:4});				
		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,18,200,20],caption:"Tanggal", readOnly:true,tag:4});								
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Kode Mitra", readOnly:true,tag:4});				
		this.e_namavendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,16,220,20],labelWidth:0, caption:"", readOnly:true,tag:4});						
		this.e_kethut = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Keterangan", readOnly:true,tag:4});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Akun Hutang", readOnly:true,tag:4});				
		this.e_namaakun = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,18,220,20],labelWidth:0, caption:"", readOnly:true,tag:4});									
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Saldo Hutang", tag:4, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_idproyek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"ID Proyek", readOnly:true,tag:4});				
		this.e_bdd = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Akun BDD", readOnly:true,tag:4});				
		this.e_namabdd = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,18,220,20],labelWidth:0, caption:"", readOnly:true,tag:4});								
		this.e_saldobdd = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Saldo BDD", tag:4, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Nilai Reklas", tag:4, tipeText:ttNilai, text:"0"});				
		
		this.sg5 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5});		
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
											
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_proyek_fHutangRevBDD.extend(window.childForm);
window.app_saku3_transaksi_bangtel_proyek_fHutangRevBDD.implement({		
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,4])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_proyek_reklas_m where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_proyek_reklas_d where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}								
					sql.add("insert into yk_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final,posted,kode_proyek) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'PBAKRU','X','"+this.kodePP+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.e_nohutang.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_nilai.getText())+",'X','-')");					
					
					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.e_vendor.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.kodePP+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_akun.getText()+"','X',0,'REV','"+this.e_nohutang.getText()+"')");	
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_akun.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.kodePP+"','-','"+this.app._lokasi+"','HUTREV','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_bdd.getText()+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.kodePP+"','-','"+this.app._lokasi+"','HUTREV','BDD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					//akun beban saat akru yg pertama yang dipakai acuan, meski akun debet jurnalnya nya adalah akun hutang 
					sql.add("insert into spm_proyek_reklas_m(no_reklas,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted ) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.kodePP+"','REKLAS','BDDHUT','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','X')");									
					sql.add("insert into spm_proyek_reklas_d(no_reklas,kode_lokasi,periode,kode_proyek,kode_akun,dc,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_idproyek.getText()+"','"+this.sg5.cells(0,0)+"','D',"+nilaiToFloat(this.e_nilai.getText())+")");							
																	
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) "+
							"select no_hutang,kode_lokasi,tgl_input,nik_user,periode,'AP',modul,'F',0,0,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai,nilai_ppn,0,'-','-','-','-','-','-','-','-','-' "+
							"from hutang_m "+
							"where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_hutang,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,no_urut,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from hutang_j "+
							"where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
					this.sg.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
					this.stsSimpan = 1;
					this.dataHutang();
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";																
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Reverse melebihi Saldo Hutang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldobdd.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Reverse melebihi Saldo BDD.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Reverse tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"AP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"AP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_proyek_reklas_m where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_proyek_reklas_d where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.dataHutang();
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.sg5.clear(1); this.sg3.clear(1); 
					this.standarLib.clearByTag(this, new Array("4"),this.e_nb);
					this.dataHutang();				
				}								
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_m","no_hutang",this.app._lokasi+"-RHU"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
			this.sg.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;
			this.dataHutang();
		} catch(e) {
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {		
		if (this.sg.cells(0,row) != "") {
			this.pc1.setActivePage(this.pc1.childPage[1]);																		
			this.e_nohutang.setText(this.sg.cells(0,row));
			this.e_tanggal.setText(this.sg.cells(1,row));
			this.e_kethut.setText(this.sg.cells(2,row));
			this.e_akun.setText(this.sg.cells(3,row));			
			this.e_saldo.setText(this.sg.cells(5,row));
			this.e_idproyek.setText(this.sg.cells(7,row));
			this.kodePP = this.sg.cells(8,row);
			
			var strSQL = "select b.kode_vendor,b.nama,c.nama as nama_akun "+
			             "from hutang_m a "+
			             "inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
			             "inner join masakun c on a.akun_hutang=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_hutang='"+this.e_nohutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.e_vendor.setText(line.kode_vendor);
					this.e_namavendor.setText(line.nama);
					this.e_namaakun.setText(line.nama_akun);
				}
			}						
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
						"from hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																			
						"where a.jenis='BBN' and a.no_hutang = '"+this.e_nohutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg5.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg5.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
				}
			} else this.sg5.clear(1);	
			
			var strSQL = "select b.akun_bdd,a.nilai_or,isnull(c.bdd,0)-isnull(e.beban,0) as saldo_bdd,x.nama as nama_bdd "+
						 "from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+	
						 "                  inner join masakun x on b.akun_bdd=x.kode_akun and b.kode_lokasi=x.kode_lokasi  "+							
						 "           	    left join ("+
						 "							select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
						 "                       	from spm_proyek_bdd "+
						 "							where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_proyek "+
						 "							  ) c on a.kode_proyek=c.kode_proyek "+						 
						
						 "					left join ( "+
						 "		select kode_proyek,SUM(case dc when 'D' then nilai else -nilai end) as beban "+
						 "		from spm_proyek_reklas_d  "+
						 "		where kode_lokasi='"+this.app._lokasi+"' and no_reklas <> '"+this.e_nb.getText()+"' "+
						 "		group by kode_proyek) e on a.kode_proyek = e.kode_proyek "+
						
						 "where a.kode_proyek= '"+this.e_idproyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	
						 										
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.e_bdd.setText(line.akun_bdd);
					this.e_namabdd.setText(line.nama_bdd);					
					this.e_saldobdd.setText(floatToNilai(line.saldo_bdd));
					this.e_nilai.setText("0");
				}
			}			
							
		}
	},
	dataHutang:function(sender){				
		if (this.e_periode.getText()!="") {
			var strSQL = "select a.kode_pp,a.kode_proyek,a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.akun_hutang,a.nilai,a.nilai-isnull(pb,0) as saldo,b.kode_vendor+' - '+b.nama as vendor "+
					 "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+				 
					 "                left join (select kode_lokasi,no_hutang,sum(nilai_final) as pb "+
					 "                           from yk_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='PBAKRU' "+
					 "                           group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
					 "where a.modul='AKRU' and a.nilai-isnull(pb,0) > 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_hutang,line.tgl,line.keterangan,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.saldo),line.vendor,line.kode_proyek,line.kode_pp]);
				}
			} else this.sg.clear(1);							
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.modul,a.no_dokumen,a.keterangan,a.no_ref,b.kode_vendor+' - '+b.nama as vendor,a.nilai "+
					 "from hutang_m a "+
					 "inner join trans_m z on a.no_hutang=z.no_bukti and a.kode_lokasi=z.kode_lokasi and z.posted='F' "+					 					 
					 "inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.modul = 'REV' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);							
		this.dataHutang();				
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_hutang,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.no_ref,line.vendor,floatToNilai(line.nilai)]); 
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
				this.noHut = this.sg3.cells(5,row);				
				this.e_dok.setText(this.sg3.cells(3,row));												
				this.e_ket.setText(this.sg3.cells(4,row));												
				this.dp_d1.setText(this.sg3.cells(1,row));
				
				var strSQL = "select a.kode_pp,a.kode_proyek,a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.akun_hutang,a.nilai,a.nilai-isnull(pb,0) as saldo,b.kode_vendor+' - '+b.nama as vendor "+
							 "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+				 
							 "                left join (select kode_lokasi,no_hutang,sum(nilai) as pb "+
							 "                           from yk_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='PBAKRU' and no_pb<>'"+this.e_nb.getText()+"' "+
							 "                           group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_hutang ='"+this.noHut+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sg.appendData([line.no_hutang,line.tgl,line.keterangan,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.saldo),line.vendor,line.kode_proyek,line.kode_pp]);
					}
					this.doDoubleClick(this.sg,0,0);
				} else this.sg.clear(1);						
																		
			}									
		} catch(e) {alert(e);}
	}
});