window.app_saku3_transaksi_sapyakes_fReim = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fReim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fReim";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Reimburse I/F", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Reimburse","List Reimburse"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Progress"],
					colWidth:[[4,3,2,1,0],[60,100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 								
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Status",items:["IFREIM","TUTUP"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});									
		this.bTampil = new button(this.pc2.childPage[0],{bound:[590,16,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_Reim = new portalui_imageButton(this.pc2.childPage[0],{bound:[690,16,20,20],hint:"Reim All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doReim"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,322], childPage:["Data Reimburse","Penutupan","Cat. Approval"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Status","No Pengajuan","Tanggal","Akun","DRK","Uraian","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,260,150,150,80,100,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[6],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["REIMBURSE","INPROG"]})]], dblClick:[this,"doDoubleClick"],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.cb_kas = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun KasBank",tag:9,multiSelection:false}); 						
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai KB", tag:9, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"No Approve/Ver", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
					
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
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where b.flag_aktif='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			this.cb_nik.setText(this.app._userLog);
			
			this.cb_kas.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                   "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009')",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'SAPHIF'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																						
				this.akunHutIF = line.flag;								
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fReim.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fReim.implement({	
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
						sql.add("delete from if_reim_m where no_reim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from if_reim_j where no_reim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update if_aju_m set no_reim='-',progress='2' where no_reim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update if_m set flag_aktif='1' where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						
						sql.add("update if_ganti_m set no_reim='-' where no_reim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						
						sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
									
					}					
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REIMBURSE"){
							sql.add("update if_aju_m set no_reim='"+this.e_nb.getText()+"',progress='3' where no_aju='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"' and no_reim='-' and no_ganti <> '-'");
						}
					}
					sql.add("update a set a.no_reim='"+this.e_nb.getText()+"' "+
							"from if_ganti_m a inner join if_aju_m b on a.no_ganti=b.no_ganti and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_reim ='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");					
												
					//progress langsung 1 langsung ke verifikator (jika IFREIM --> ver spb, TUTUP --> ver terima uang)
					if (this.c_status.getText() == "TUTUP") sql.add("update if_m set flag_aktif='0' where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into if_reim_m (no_reim,no_ver,no_spb,no_kas,no_dokumen,tanggal,keterangan,kode_curr,kurs,akun_hutang,nik_buat,kode_lokasi,kode_pp,modul,nilai,progress,posted,periode,nik_user,tgl_input) values "+
					        "('"+this.e_nb.getText()+"','-','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,'"+this.akunHutIF+"','"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.c_status.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'1','T','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())")
					
					sql.add("insert into if_reim_j(no_reim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_rek) values "+
							"('"+this.e_nb.getText()+"','"+this.kodeVendor+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunHutIF+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.kodeRekSAP+"')");								
					
					if (this.c_status.getText() == "IFREIM") {
						sql.add("insert into if_reim_j(no_reim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_rek) values "+
								"('"+this.e_nb.getText()+"','"+this.kodeVendor+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutIF+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','HUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.kodeRekSAP+"')");					
					}
					else {	
						// kalo di TUTUP
						sql.add("insert into if_reim_j(no_reim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_rek) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',998,'"+this.cb_kas.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilaikb.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','KASBACK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");										
						sql.add("insert into if_reim_j(no_reim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_rek) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akunIF+"','"+this.e_ket.getText()+"','C',"+this.nilaiIF+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','IF','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");										
					}
					
				/*
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_reim,no_urut,kode_lokasi,'IFREIM',jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-',no_dokumen,'-','-','-',kode_rek,'-',case when dc = 'D' then 'E' else 'T' end "+
						    "from if_reim_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_reim='"+this.e_nb.getText()+"'");
				*/	
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
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.sg3.clear(1);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.sg.validasi();
				if (this.c_status.getText() != "TUTUP") {
					if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
						system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
						return false;
					}
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
					sql.add("delete from if_reim_m where no_reim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from if_reim_j where no_reim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update if_aju_m set no_reim='-',progress='2' where no_reim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update if_m set flag_aktif='1' where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("update if_ganti_m set no_reim='-' where no_reim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);				
				this.sg3.clear(1);
				this.bTampil.show();				
				this.e_nilai.setText("0");
				this.cb_nik.setText("","");
				this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where b.flag_aktif='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_reim_m","no_reim",this.app._lokasi+"-IFR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_nik.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doReim:function(sender){
		for (var i = 0; i < this.sg.rows.getLength();i++){
			if (this.sg.rowValid(i)){
				this.sg.cells(0,i,"REIMBURSE");
			}
		}
	},
	doChange:function(sender){		
		if (sender == this.cb_nik && this.cb_nik.getText()!="") {
			var strSQL = "select a.kode_pp,a.kode_rek,a.nilai,a.kode_vendor,a.rek_sap from if_m a where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_pp.setText(line.kode_pp);	
					this.akunIF = line.kode_rek;	
					this.nilaiIF = parseFloat(line.nilai);	
					
					this.kodeVendor = line.kode_vendor;	
					this.kodeRekSAP = line.rek_sap;		
				}
			}
			
			
		}
		if (sender == this.c_status && this.c_status.getText()!="" && this.cb_nik.getText()!="") {
			if (this.c_status.getText() == "TUTUP") {	
				this.cb_kas.setTag("1");
				var strSQL = "select (a.nilai - "+nilaiToFloat(this.e_nilai.getText())+") as kasbank "+ 
							 "from if_m a "+
							 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_nilaikb.setText(floatToNilai(line.kasbank));											
					}
				}
			}
			else {
				this.cb_kas.setTag("9");
				this.e_nilaikb.setText("0");
			}		
		}
	},	
	doLoad:function(sender){		
		if (this.cb_nik.getText() != "" && this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select 'INPROG' as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,b.kode_akun+' - '+b.nama as akun,c.kode_drk+' - '+c.nama as drk,a.keterangan,a.nilai-a.npajak as nilai "+
					   "from if_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "                inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+					   
					   "                inner join if_ganti_m e on a.no_ganti=e.no_ganti and a.kode_lokasi=e.kode_lokasi "+					   
					   "				left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and substring(a.periode,1,4)=c.tahun "+
					   "where e.nik ='"+this.cb_nik.getText()+"' and a.no_ganti <> '-' and a.no_reim='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					this.sg.appendData([line.status.toUpperCase(),line.no_aju,line.tgl,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);									
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"REIMBURSE");
		else this.sg.cells(0,row,"INPROG");		
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(0,i) == "REIMBURSE"){
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}			
			this.e_nilai.setText(floatToNilai(tot));	
			this.doChange(this.c_status);		
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
								//this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanForm";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
								
								//this.app.services.postSAP(this.e_nb.getText(),"IFREIM", function(data){ alert(data); });
								
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
			setTipeButton(tbAllFalse);
			this.sg.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_reim,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.progress "+
		             "from if_reim_m a "+
		              "       inner join (select distinct no_bukti,kode_lokasi from glsap where no_doksap='-' and modul='IFREIM' and kode_lokasi='"+this.app._lokasi+"' ) c on a.no_reim=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+			 					 					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and progress in ('1','V')";	//prog = 1 karn tanpa approve atasan langsung ke verifikator
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
			this.sg3.appendData([line.no_reim,line.tgl,line.keterangan,floatToNilai(line.nilai),line.progress]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.bTampil.hide();				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
				var strSQL = "select a.keterangan,a.tanggal,a.kode_pp,a.nik_buat,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan,a.modul "+
				             "from if_reim_m a "+
				             "left join ("+
							 "        select a.kode_lokasi,a.no_app,a.catatan from app_d a inner join app_m b "+
							 "        on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul in ('IFREIM_SPB','IFTUTUP_SPB') ) b on a.no_ver=b.no_app and a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.no_reim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_nik.setText(line.nik_buat);
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);														
						this.e_noapp.setText(line.no_app);					
						this.e_memo.setText(line.catatan);	
						this.c_status.setText(line.modul);						
					}
				}																
				var data = this.dbLib.getDataProvider("select 'REIMBURSE' as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,b.kode_akun+' - '+b.nama as akun,c.kode_drk+' - '+c.nama as drk,a.keterangan,a.nilai "+
						    "from if_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						    "                inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+					   						    
						    "				 left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and substring(a.periode,1,4)=c.tahun "+
						    "where a.no_ganti <> '-' and a.no_reim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);					   				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.status.toUpperCase(),line.no_aju,line.tgl,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);												
			}									
		} catch(e) {alert(e);}
	}
});