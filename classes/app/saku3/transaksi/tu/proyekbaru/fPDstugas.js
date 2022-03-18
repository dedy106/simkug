window.app_saku3_transaksi_tu_proyekbaru_fPDstugas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fPDstugas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fPDstugas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Pengantar PD", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pembayaran","List Pembayaran"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Maksud/Tujuan", maxLength:200});						
		this.e_jenis = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,450,20],caption:"Jenis PD", maxLength:100});						
		this.e_lama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,450,20],caption:"Lama PD", maxLength:100});						
		this.e_kota = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,450,20],caption:"Kota", maxLength:100});						
		this.e_sarana = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,22,450,20],caption:"Sarana PD", maxLength:100});						
		this.e_catatan = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,23,450,20],caption:"Catatan", maxLength:200});						
		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Pemohon", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total PD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,200], childPage:["Agenda","Data Pengajuan PD"]});		
		this.e_agenda = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Agenda",maxLength:30,readOnly:true});			
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2});
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		// this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"MTA",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		// this.cb_drx = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"DRK",tag:1,multiSelection:false,change:[this,"doChange"]});         				
		// this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Saldo Budget TW", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["Status","No PD","NIK - Nama","Loker","Deskripsi","Tanggal","Nilai","NIK"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,100,80,300,100,250,120,80]],
				colHide:[[7],[true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				colFormat:[[6],[cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							"where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.cb_pp.setText(this.app._kodePP);

			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fPDstugas.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fPDstugas.implement({
	doLoad : function() {
		var strSQL = "select a.no_spj,b.nik+' - '+b.nama as nama,b.kode_pp,a.keterangan,CONVERT(varchar,a.tanggal,103) as tgl,a.nilai,b.nik "+
					 "from tu_pdaju_m a "+
					 "     inner join karyawan b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi "+	
					 "     inner join karyawan_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+				
					 "where a.progress in ('0') and a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.jenis_pd='PROYEK'";
					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				this.sg1.appendData(["INPROG",line.no_spj,line.nama,line.kode_pp,line.keterangan,line.tgl,floatToNilai(line.nilai),line.nik]);
			}
		} else this.sg1.clear(1);
		this.sg1.validasi();
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
						sql.add("delete from tu_pdapp_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update tu_pdaju_m set progress='0',no_app='-' where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					
						sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from angg_r where no_bukti = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");																
					
					} 
					
					sql.add("insert into tu_pdapp_m(no_app,kode_lokasi,nik_user,tgl_input,periode,tanggal,keterangan,jenis,lama,kota,sarana,catatan,nik_buat,nik_app,no_aju) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_jenis.getText()+"','"+this.e_lama.getText()+"','"+this.e_kota.getText()+"','"+this.e_sarana.getText()+"','"+this.e_catatan.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_agenda.getText()+"')");
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "APP"){
							sql.add("update tu_pdaju_m set progress='1',no_app='"+this.e_nb.getText()+"' where kode_lokasi='"+this.app._lokasi+"' and no_spj='"+this.sg1.cells(1,i)+"'");																															
							sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita) values "+
									"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','-','-','-','-',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.sg1.cells(7,i)+"',0,'"+this.sg1.cells(1,i)+"')");

							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
									"select '"+this.e_agenda.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"',kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"',dc,0,nilai "+
									"from prb_prbeban_d where no_bukti = '"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		

							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
									"select '"+this.e_agenda.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"',kode_akun,kode_pp,'-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"',dc,0,nilai "+
									"from prb_bmhd_d where no_bukti = '"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						}
					}	
					
					sql.add("update a set a.bank=b.bank,a.no_rek=b.no_rek,a.nama_rek=b.nama_rek,a.bank_trans=b.cabang "+
					        "from it_aju_rek a inner join karyawan b on a.keterangan=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_aju='"+this.e_agenda.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
						    "('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.cb_buat.getText()+"','PRBEBAN','NON',0,'"+this.cb_app.getText()+"')");	//form SPPD --> diganti prbeban (antisipasi load akun lebih dari 1)
							
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
					this.sg1.clear(1); 					
					setTipeButton(tbSimpan);	
					this.stsSimpan = 1;
					this.doClick();					
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				
				if (this.stsGar == "1") {
					// if (this.cb_drx.getText() == "-") {
					// 	system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.");
					// 	return false;						
					// }
					// else {
					// 	if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					// 		system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi saldo.");
					// 		return false;						
					// 	}
					// }
				}											
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from tu_pdapp_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update tu_pdaju_m set progress='0',no_app='-' where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					
					sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from angg_r where no_bukti = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");																
																
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);			
		if (this.stsSimpan == 1) {
			this.doClick();	
		}			
	},
	doChange:function(sender){		
		try	{
			if ((sender == this.e_periode) && this.stsSimpan==1) {
				this.doClick();			
			}			
					
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_pdapp_m","no_app",this.app._lokasi+"-PDA"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_agenda.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));	
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var total = 0;
						
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "") {
					if (this.sg1.cells(0,i)=="APP") {
						total += nilaiToFloat(this.sg1.cells(6,i));
					}
				}
			}			
			this.e_total.setText(floatToNilai(total));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 0) {				
			this.sg1.validasi();
		}
	},	
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "INPROG") this.sg1.cells(0,row,"APP");
		else this.sg1.cells(0,row,"INPROG");
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_spj_rptPdAppFormTu";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
								this.filter2 =this.e_periode.getText()+"/";
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
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.doClick();			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select distinct a.no_app,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.keterangan "+
		             "from tu_pdapp_m a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.progress in ('A','K','R','0') and b.form='PRBEBAN' "+
		             "                  inner join karyawan_pp c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'";
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
			this.sg3.appendData([line.no_app,line.tgl,line.jenis,line.keterangan]); 
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
								
				var strSQL = "select * from tu_pdapp_m "+
							 "where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_ket.setText(line.keterangan);
						this.e_jenis.setText(line.jenis);
						this.e_lama.setText(line.lama);
						this.e_kota.setText(line.kota);
						this.e_sarana.setText(line.sarana);
						this.e_catatan.setText(line.catatan);
						
						this.cb_buat.setText(line.nik_buat);				
						this.cb_app.setText(line.nik_app);
						this.e_agenda.setText(line.no_aju);
					}
				}
				
				var strSQL = "select a.no_spj,b.nik+' - '+b.nama as nama,b.kode_pp,a.keterangan,CONVERT(varchar,a.tanggal,103) as tgl,a.nilai,b.nik "+
							 "from tu_pdaju_m a "+
							 "     inner join karyawan b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.no_app='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sg1.appendData(["APP",line.no_spj,line.nama,line.kode_pp,line.keterangan,line.tgl,floatToNilai(line.nilai),line.nik]);
					}
				} else this.sg1.clear(1);
				
				
				var strSQL = "select * from it_aju_m "+
							 "where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText("UMUM");	
						this.cb_pp.setText(line.kode_pp);						
					}
				}
												
			}						
		} catch(e) {alert(e);}
	}
});