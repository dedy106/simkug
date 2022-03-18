window.app_saku3_transaksi_optik_produksi_fKbBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_optik_produksi_fKbBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_optik_produksi_fKbBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Billing", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Bayar","List Bayar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Tagihan","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,200,150,80,100]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});									
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.cb_mitra = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Mitra", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.bTampil = new button(this.pc2.childPage[0],{bound:[590,19,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_lain = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Total Lainnya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,290], childPage:["Data Cabang","Data Bill"]});		
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:8,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],
				defaultRow:1,autoAppend:true});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});	
		this.bPP = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Cabang",click:[this,"doLoadPP"]});	
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
				colTitle:["No Bill","Dokumen","Tanggal","Deskripsi","Akun Piutang","Saldo Tagihan","Nilai Kas","Nilai Lain"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,80,230,100,150,120]],				
				columnReadOnly:[true,[0,1,2,3,4,5],[6,7]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
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
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);			
			this.sg4.appendData([this.app._kodePP,this.app._namaPP]);		
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('COLLFEE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "COLLFEE") this.akunLain = line.flag;											
				}
			}

			this.isiCbMitra();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_optik_produksi_fKbBill.extend(window.childForm);
window.app_saku3_transaksi_optik_produksi_fKbBill.implement({
	isiCbMitra: function(){
		this.cb_mitra.setSQL("select kode_mitra,nama from optik_mitra where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);						
	},
	doLoadPP : function() {
		var data = this.dbLib.getDataProvider("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sg4.appendData([line.kode_pp,line.nama]);
			}
		} else this.sg4.clear(1);
	},	
	doChangeCell4: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    			
		if (col == 0) {
			if (this.sg4.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Cabang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell4");		
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Cabang",sender,undefined, 
							"select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"') a",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad: function() {
		if (this.cb_mitra.getText()!="") {	
			var vPP = "";
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i)){
					vPP += ",'"+this.sg4.cells(0,i)+"'";
				}
			}
			vPP = vPP.substr(1);

			var strSQL = "select a.no_tagih,a.no_dokumen,CONVERT(varchar,a.tanggal,103) as tanggal,a.keterangan,a.akun_piutang,a.nilai-ISNULL(b.bayar,0) as saldo "+
						 "from optik_tagih_m a "+						 
						 "     left join ("+

						 "      select no_tagih,kode_lokasi,sum(case dc when 'D' then nilai+lain else -(nilai+lain) end) as bayar "+
						 "      from optik_tagih_bayar where kode_lokasi ='"+this.app._lokasi+"' group by no_tagih,kode_lokasi) b on a.no_tagih=b.no_tagih and a.kode_lokasi=b.kode_lokasi "+

						 "where a.tgl_del is null and a.kode_pp in ("+vPP+") and a.kode_mitra ='"+this.cb_mitra.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.nilai-ISNULL(b.bayar,0) >0 ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_tagih,line.no_dokumen,line.tanggal,line.keterangan,line.akun_piutang,floatToNilai(line.saldo),"0","0"]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from optik_tagih_bayar where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBBILL','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+","+parseNilai(this.e_lain.getText())+",0,'-','-','-','-','-','-','"+this.cb_mitra.getText()+"','"+this.cb_akun.getText()+"','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','KB','KAS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");														
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunLain+"','D',"+parseNilai(this.e_lain.getText())+","+
							parseNilai(this.e_lain.getText())+",'"+this.e_ket.getText()+"','KB','LAIN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");														

					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && (this.sg1.cells(6,i) != "0" || this.sg1.cells(6,i) != "0")){							
							sql.add("insert into optik_tagih_bayar(no_bukti,no_tagih,kode_lokasi,modul,periode,nik_user,tgl_input,dc,nilai,lain) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','KBBILL','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'D',"+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+")");	
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
					this.sg1.clear(1); this.sg3.clear(1); 
					setTipeButton(tbSimpan);
					this.isiCbMitra();
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();		
				
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){						
						var k = i+1;
						if ((nilaiToFloat(this.sg1.cells(6,i))+nilaiToFloat(this.sg1.cells(7,i))) > nilaiToFloat(this.sg1.cells(5,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai Bayar+Lain melebihi Saldo. Baris: "+k);
							return false;							
						}
						if (nilaiToFloat(this.sg1.cells(6,i)) < 0 || nilaiToFloat(this.sg1.cells(7,i)) < 0) {
							system.alert(this,"Transaksi tidak valid.","Nilai Bayar/Lain kurang dari nol. Baris: "+k);
							return false;							
						}
					}
				}	
				
				if (nilaiToFloat(this.e_total.getText()) + nilaiToFloat(this.e_lain.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar+Lain tidak boleh nol atau kurang.");
					return false;						
				}
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
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from optik_tagih_bayar where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){		
		if ((sender == this.e_periode) && this.stsSimpan==1) {
			this.doClick();
		}			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
				this.isiCbMitra();
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();				
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var bayar = saldo = lain = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "" && this.sg1.cells(6,i) != "" && this.sg1.cells(7,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(5,i));
					bayar += nilaiToFloat(this.sg1.cells(6,i));
					lain += nilaiToFloat(this.sg1.cells(7,i));					
				}
			}			
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));			
			this.e_total.setText(floatToNilai(Math.round(bayar * 100)/100));			
			this.e_lain.setText(floatToNilai(Math.round(lain * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 6 || col == 7) {				
			this.sg1.validasi();
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_sju_rptKbRincianHutangPremi";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg1.clear(1); this.sg3.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);		
			this.isiCbMitra();	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan, a.nilai1 "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBBILL' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai1)]); 
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
								
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.param2);				
						this.e_total.setText(floatToNilai(line.nilai1));				
						this.cb_mitra.setText(line.param1);				
						this.cb_mitra.setSQL("select kode_mitra, nama from optik_mitra where kode_mitra='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);									
					}
				}
				
				var strSQL = "select a.no_tagih,a.no_dokumen,CONVERT(varchar,a.tanggal,103) as tanggal,a.keterangan,a.akun_piutang,a.nilai-ISNULL(b.bayar,0) as saldo "+
							 "from optik_tagih_m a "+			
							 "	   inner join optik_tagih_bayar c on a.no_tagih=c.no_tagih and a.kode_lokasi=c.kode_lokasi "+			 
							 "     left join ("+

							 "      select no_tagih,kode_lokasi,sum(case dc when 'D' then nilai+lain else -(nilai+lain) end) as bayar "+
							 "      from optik_tagih_bayar where kode_lokasi ='"+this.app._lokasi+"' and no_bukti <>'"+this.e_nb.getText()+"' "+
							 "		group by no_tagih,kode_lokasi) b on a.no_tagih=b.no_tagih and a.kode_lokasi=b.kode_lokasi "+

							 "where a.tgl_del is null and c.no_bukti ='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.no_tagih,line.no_dokumen,line.tanggal,line.keterangan,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.lain)]);
					}
				} else this.sg1.clear(1);
			
		
				
			}						
		} catch(e) {alert(e);}
	}	
});