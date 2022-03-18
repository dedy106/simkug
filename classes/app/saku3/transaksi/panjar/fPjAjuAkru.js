window.app_saku3_transaksi_panjar_fPjAjuAkru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_panjar_fPjAjuAkru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_panjar_fPjAjuAkru";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Permohonan Panjar (Proses): Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["Data Panjar","List Panjar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Panjar","Tanggal","Jenis","No Dokumen","Deskripsi","Pemegang","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,200,210,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Panjar",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50,tag:9,visible:false});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,350], childPage:["Pemegang & Approval","Data BMHD","Data Anggaran","Cat. Approval"]});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tanggal Pakai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18]}); 										
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});								
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});								
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2});		
		this.cb_setuju = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.cb_vendor = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Mitra",tag:1,multiSelection:false,change:[this,"doChange"]}); 		
						
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["No Hutang","Keterangan","Akun Hutang","Saldo","Nilai Pakai"],
					colWidth:[[4,3,2,1,0],[100,100,80,300,100]],					
					columnReadOnly:[true,[0,1,2,3],[4]],					
					colFormat:[[3,4],[cfNilai,cfNilai]],checkItem:true,
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"No Approve/Ver", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[3],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);		
					
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
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
												
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}						
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang='"+this.app._kodeBidang+"' and tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag ='002' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_panjar_fPjAjuAkru.extend(window.childForm);
window.app_saku3_transaksi_panjar_fPjAjuAkru.implement({
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
						sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from panjar2_d where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PJ2'");
						sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					if (this.progSeb == "V") var vProg = "1"; else var vProg = "0";
					sql.add("insert into panjar2_m(no_panjar,kode_lokasi,no_dokumen,tanggal,due_date,keterangan,nik_buat,nik_setuju,kode_pp,nilai,periode,nik_user,tgl_input,no_app,no_ver,no_spb,no_kas,progress,akun_panjar,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.noAppLama+"','"+this.noVerLama+"','-','-','"+vProg+"','"+this.cb_akun.getText()+"','PJ2')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(4,i) != "0"){
								sql.add("insert into panjar2_d(no_panjar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(4,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','SPB','BBN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");							
								sql.add("insert into yk_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final) values  "+
										"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg.cells(4,i))+",'PBAKRU','X','"+this.cb_pp.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.sg.cells(0,i)+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.app._kodeBidang+"','"+this.app._lokasi+"',"+nilaiToFloat(this.sg.cells(4,i))+")");					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :								
				this.preView = "1";
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_panjar from panjar2_m where no_panjar <> '"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_panjar);
							return false;
						} 
					}
				}									
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(3,i)) < nilaiToFloat(this.sg.cells(4,i))) {
								var i = j+1;
								system.alert(this,"Pemakaian melebih saldo.","Baris "+j);
								return false;
							}
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Permohonan tidak boleh nol atau kurang.");
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
				sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from panjar2_d where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PJ2'");
				sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();				
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.e_total.setText("0");			
				this.noAppLama = "-";
				this.noVerLama = "-";
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjar2_m","no_panjar",this.app._lokasi+"-PJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doChange:function(sender){	
		if (sender == this.cb_vendor) {
			if (this.cb_vendor.getText()!="" && this.stsSimpan == 1) {				
				var strSQL = "select a.no_hutang,a.keterangan,a.akun_hutang,a.nilai-isnull(pb,0) as saldo  from hutang_m a "+
							 "                left join (select kode_lokasi,no_hutang,sum(nilai_final) as pb "+
							 "                           from yk_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='PBAKRU' "+
							 "                           group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
							 "where a.modul='AKRU' and a.nilai-isnull(pb,0) > 0 and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_vendor='"+this.cb_vendor.getText()+"' and a.periode<='"+this.e_periode.getText()+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_hutang,line.keterangan,line.akun_hutang,floatToNilai(line.saldo),"0"]);
					}
				}
				this.sg.validasi();								
			}
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 4 && this.sg.cells(4,row) != "") this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg.cells(4,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));
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
								this.nama_report="server_report_saku3_panjar_rptPjAjuForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_panjar='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
			this.progSeb = "";
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_panjar,convert(varchar,a.tanggal,103) as tgl,case a.progress when '0' then 'AJU' when 'R' then 'REVISI' when 'V' then 'REV.VER' end as jenis,a.no_dokumen,a.keterangan,a.nik_buat+' - '+b.nama as nama,a.nilai "+
		             "from panjar2_m a inner join karyawan b on a.nik_buat=b.nik "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R','V') and a.modul='PJ2'";		
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
			this.sg3.appendData([line.no_panjar,line.tgl,line.jenis.toUpperCase(),line.no_dokumen,line.keterangan,line.nama,floatToNilai(line.nilai)]); 
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
								
				var strSQL = "select keterangan,no_dokumen,tanggal,due_date,akun_panjar,nik_buat,nik_setuju,kode_pp,progress,no_app as no_applama,no_ver as no_verlama "+
							 "from panjar2_m "+							 
							 "where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_vendor.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);																		
						this.dp_d2.setText(line.due_date);
						this.cb_akun.setText(line.akun_panjar);
						this.cb_pp.setText(line.kode_pp);
						this.cb_buat.setText(line.nik_buat);
						this.cb_setuju.setText(line.nik_setuju);
						this.progSeb = line.progress;
						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;
						if (this.progSeb == "V") var modulApp = "PJ2_SPB";
						else var modulApp = "PJ2_APP"; 							
						var strSQL = "select a.no_app,a.catatan from app_d a inner join app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='"+modulApp+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								this.e_noapp.setText(line.no_app);					
								this.e_memo.setText(line.catatan);									
							}
						}
					}					
				}						
				var strSQL = "select a.no_hutang,a.keterangan,a.akun_hutang,a.nilai-isnull(pb,0) as saldo,x.nilai  "+
				             "from hutang_m a "+							 
							 "         		  inner join yk_pb_m x on a.no_hutang=x.no_hutang and a.kode_lokasi=x.kode_lokasi "+
							 "                left join (select kode_lokasi,no_hutang,sum(nilai_final) as pb "+
							 "                           from yk_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='PBAKRU' and no_pb <>'"+this.e_nb.getText()+"' "+
							 "                           group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
							 "where x.no_pb='"+this.e_nb.getText()+"' and a.modul='AKRU' and a.nilai-isnull(pb,0) > 0 and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_vendor='"+this.cb_vendor.getText()+"' and a.periode<='"+this.e_periode.getText()+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_hutang,line.keterangan,line.akun_hutang,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}
				}
				this.sg.validasi();								
				
				
				/*				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.no_panjar = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg.clear(1);
				*/
				
				
			}									
		} catch(e) {alert(e);}
	}
});