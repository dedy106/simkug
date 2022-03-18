window.app_saku3_transaksi_spm_fPbProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fPbProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fPbProyek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Bayar Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Permohonan","List Permohonan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai","Catatan"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,60,350,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[770,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[870,12,100,18]}); 		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_totalRek = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,220,20],caption:"Total Rekening", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_totalDC = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Total Jurnal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,338], childPage:["Data Proyek","Atensi Pembayaran","Detail Transaksi","Jurnal Tambahan","Catatan"]});
		this.cb_proyek = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Total RAB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_pakai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Real. Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tahu = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
						
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Mitra","Nama","Bank","Cabang","No Rekening","Nama Rekening","Nilai Bruto","Pajak","Keterangan"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[200,80,100,150,150,150,80,150,80]],					
					columnReadOnly:[true,[],[0,1,2,3,4,5,6,7,8]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[6,7],[cfNilai,cfNilai]],checkItem: true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],afterPaste:[this,"doAfterPaste"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPage"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,
		            colTitle:["ID","Deskripsi RAB","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,390,390,50]],					
					columnReadOnly:[true,[1],[0,2,3]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[3],[cfNilai]],checkItem: true,
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
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
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			
			this.cekRek = true;						
			
			this.e_memo.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fPbProyek.extend(window.childForm);
window.app_saku3_transaksi_spm_fPbProyek.implement({	
	doAfterPaste: function(sender,totalRow){
		try {			
			this.cekRek = false;
			var totRek = 0;
			for (var i=0;i < this.sg.getRowCount();i++){			
				if (this.sg.rowValid(i)){
					var data = this.dbLib.getDataProvider("select nama from vendor where kode_vendor='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {
							this.doChangeCell(this.sg,0,i);							
							if (this.sg.cells(6,i) != "" && this.sg.cells(7,i) != "") totRek += nilaiToFloat(this.sg.cells(6,i)) - nilaiToFloat(this.sg.cells(7,i));							
						}
						else {							
							var j = i+1;
							system.alert(this,"Data Atensi Transfer tidak valid.","Kode Mitra "+this.sg.cells(0,i)+" tidak terdaftar. (Baris : "+j+")");
							this.sg.clear(1);
							return false;
						}
					}
				}
			}
			this.e_totalRek.setText(floatToNilai(totRek));
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();			
		} catch(e) {alert(e);}
	},
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_proyek_bdd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}								
					
					sql.add("insert into yk_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final,posted,kode_proyek,no_app2,no_app3,no_fiat,no_kas,akun_hutang) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",'PBPR','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','-','-','-','-','"+this.app._kodePP+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_totalDC.getText())+",'F','"+this.cb_proyek.getText()+"','-','-','-','-','"+this.akunBMHD+"')");
					
					sql.add("insert into yk_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunBMHD+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_totalDC.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBPR','BMHD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into spm_proyek_bdd(no_bukti,modul,kode_proyek,nu,keterangan,dc,nilai,kode_lokasi,periode) values "+
										"('"+this.e_nb.getText()+"','PBPR','"+this.cb_proyek.getText()+"',"+this.sg1.cells(0,i)+",'"+this.sg1.cells(2,i)+"','D',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.app._lokasi+"','"+this.e_periode.getText()+"')");										
								
								sql.add("insert into yk_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunBDD+"','"+this.sg1.cells(2,i)+"','D',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBPR','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
							}
						}
					}														
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into yk_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','"+this.app._lokasi+"','PBPR','TAMBAH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
							}
						}
					}	
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into yk_pb_d(no_pb,kode_lokasi,kode_lokvendor,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,pajak,keterangan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(8,i)+"')");
								var neto = nilaiToFloat(this.sg.cells(6,i)) - nilaiToFloat(this.sg.cells(7,i));								
								sql.add("insert into spm_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,cabang,bruto,pajak,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBPR','"+this.sg.cells(5,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+",'"+neto+"')");
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
					this.sg.clear(1); this.sg1.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.cekRek = true;					
					setTipeButton(tbAllFalse);					
					this.progSeb ="";
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				this.sg.validasi();																
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Atensi Pembayaran.");
							return false;
						}
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Detail.");
							return false;
						}
					}										
				}	
				this.sg2.validasi();
				for (var i=0;i < this.sg2.getRowCount();i++){					
					if (!this.sg2.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg2.getColCount();j++){
							if (this.sg2.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal Tambahan.");
							return false;
						}
					}										
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_totalRek.getText()) != nilaiToFloat(this.e_totalDC.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Rekening Atensi Pembayaran dan Jurnal tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_totalRek.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if ((nilaiToFloat(this.e_pakai.getText()) + nilaiToFloat(this.e_totalRek.getText())) > nilaiToFloat(this.e_nilaior.getText())  ) {
					system.alert(this,"Transaksi tidak valid.","Total Biaya melebihi Total RAB.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_proyek_bdd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (sender == this.cb_proyek && this.cb_proyek.getText() != "")  {
			var sql = new server_util_arrayList();
			sql.add("select kode_vendor,nama from vendor where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1'");						
			sql.add("select nu,keterangan from spm_proyek_beban where kode_proyek='"+this.cb_proyek.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '052' "+					
			        "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			var strSQL = "select b.akun_bdd,b.akun_bmhd,a.nilai_or,isnull(c.bdd,0) as bdd "+
						 "from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+								
						 "           	    left join ("+
						 "							select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
						 "                       	from spm_proyek_bdd "+
						 "							where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_proyek "+
						 "							  ) c on a.kode_proyek=c.kode_proyek "+						 
						 "where a.kode_proyek= '"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.akunBDD = line.akun_bdd;
					this.akunBMHD = line.akun_bmhd;
					this.e_nilaior.setText(floatToNilai(line.nilai_or));
					this.e_pakai.setText(floatToNilai(line.bdd));
				}
			}			
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";
					this.sg.clear(1); this.sg1.clear(1); this.sg3.clear(1);					
					this.cekRek = true;
				}
				this.noAppLama = "-";
				this.noVerLama = "-";
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		try {
			if (col == 6 && this.sg.cells(6,row) != "") this.sg.validasi();		
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {						
				if (this.sg.cells(0,row) != "") {								
					var vendor = this.dataVendor.get(sender.cells(0,row));				
					if (vendor) {
						sender.cells(1,row,vendor);					
						if (this.cekRek) {
							var data = this.dbLib.getDataProvider("select bank,cabang,no_rek,nama_rek from vendor where kode_vendor='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined) {
									sender.cells(2,row,line.bank);
									sender.cells(3,row,line.cabang);
									sender.cells(4,row,line.no_rek);
									sender.cells(5,row,line.nama_rek);
								}
								else {
									sender.cells(2,row,"");
									sender.cells(3,row,"");
									sender.cells(4,row,"");
									sender.cells(5,row,"");
								}
							}
						}
					}
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Mitra "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkVendor");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
						sender.cells(2,row,"");
						sender.cells(3,row,"");
						sender.cells(4,row,"");
						sender.cells(5,row,"");						
					}				
				}
			}						
			sender.onChange.set(this,"doChangeCell");		
		}catch(e)
		{
			alert(e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if (col == 3 && sender.cells(3,row) != "") this.sg.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var rab = this.dataRAB.get(sender.cells(0,row));				
				if (rab) sender.cells(1,row,rab);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"ID "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange: function(){		
		try{
			var totRek = totDC = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(7,i) != ""){										
					totRek += nilaiToFloat(this.sg.cells(6,i)) - nilaiToFloat(this.sg.cells(7,i));					
				}
			}
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != ""){
					totDC += nilaiToFloat(this.sg1.cells(3,i));					
				}
			}
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_totalRek.setText(floatToNilai(totRek));
			this.e_totalDC.setText(floatToNilai(totDC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			this.cekRek = true;
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mitra",sender,undefined, 
						    "select kode_vendor,nama   from vendor where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_vendor) from vendor where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_vendor","nama"],"and",["Kode","Nama"],false);				
				}											
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar RAB",sender,undefined, 
						    "select nu,keterangan from spm_proyek_beban where kode_proyek='"+this.cb_proyek.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from spm_proyek_beban where kode_proyek='"+this.cb_proyek.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							["nu","keterangan"],"and",["ID","Deskripsi"],false);				
				}											
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '052' "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '052' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",
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
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
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
							this.dataVendor = new portalui_arrayMap();
							this.dataRAB = new portalui_arrayMap();	
							this.dataAkun = new portalui_arrayMap();	
							this.dataPP = new portalui_arrayMap();	
																																								
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataVendor.set(line.kode_vendor, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataRAB.set(line.nu, line.keterangan);										
								}								
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[3]){	    			        
								var line;
								for (var i in result.result[3].rs.rows){
									line = result.result[3].rs.rows[i];									
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
			this.sg.clear(1); this.sg1.clear(1); this.sg3.clear(1);					
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.cekRek = true;			
			setTipeButton(tbAllFalse);
			this.progSeb ="";
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
		var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.modul,a.no_dokumen,a.keterangan,a.progress,a.nilai, "+
					 "case when a.progress = 'C' then isnull(c.catatan,'-') "+
					 "     when a.progress = 'X' then isnull(f.catatan,'-') "+
					 "     when a.progress = 'S' then isnull(d.catatan,'-') "+
					 "     when a.progress = 'V' then isnull(e.catatan,'-') "+
					 "end as catatan "+
		             "from yk_pb_m a "+					 					 
					 "			      left join spm_app_m c on a.no_pb=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.no_flag='-' and c.form = 'APPCAB' "+
					 "			      left join spm_app_m f on a.no_pb=f.no_bukti and a.kode_lokasi=f.kode_lokasi and f.no_flag='-' and f.form = 'APPFIL' "+
					 "			      left join spm_app_m d on a.no_pb=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.no_flag='-' and d.form = 'APPSDM' "+
					 "			      left join spm_app_m e on a.no_pb=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.no_flag='-' and e.form = 'APPVER' "+
					 "where a.posted='F' and a.kode_pp = '"+this.app._kodePP+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PBPR' and a.progress in ('0','C','S','V') ";
					 
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
			this.sg3.appendData([line.no_pb,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai),line.catatan]); 
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
				this.cekRek = false;
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_tahu,a.nik_app,a.kode_proyek "+
							 "from yk_pb_m a "+								 
							 "where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik_app);
						this.cb_tahu.setText(line.nik_tahu);											
						this.cb_proyek.setText(line.kode_proyek);											
					}
				}								
				var data = this.dbLib.getDataProvider("select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
				                                      "from yk_pb_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi "+
													  "where a.no_pb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_vendor,line.nama,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai),floatToNilai(line.pajak),line.keterangan]);
					}
				} else this.sg.clear(1);							
				
				var data = this.dbLib.getDataProvider("select b.nu,b.keterangan,a.keterangan as uraian,a.nilai "+
													  "from spm_proyek_bdd a inner join spm_proyek_beban b on a.nu=b.nu and a.kode_lokasi=b.kode_lokasi and a.kode_proyek=b.kode_proyek "+
													  "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.nu,line.keterangan,line.uraian,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from yk_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='TAMBAH' and a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg2.clear(1);	
															
			}									
		} catch(e) {alert(e);}
	}	
});