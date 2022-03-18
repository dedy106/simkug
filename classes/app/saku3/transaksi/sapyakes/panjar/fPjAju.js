window.app_saku3_transaksi_sapyakes_panjar_fPjAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_panjar_fPjAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_panjar_fPjAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permohonan Panjar", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,435], childPage:["Data Panjar","List Panjar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["No Panjar","Tanggal","Jenis","No Dokumen","Deskripsi","Pemegang","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,200,210,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Panjar",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,330], childPage:["Pemegang & Approval","Item Akun","Cat. Approval"]});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tgl Maks Ptg", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18]}); 										
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});								
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});								
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		//this.e_jum = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Jml PJ Aktif", tag:8, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_noaktif = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"No PJ Aktif", tag:8, readOnly:true});		
		this.cb_setuju = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_jab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Jabatan", maxLength:50});				

		this.cb_pp2 = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"PP",tag:8,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_beban= new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Mata Anggaran", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});								
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"DRK",tag:8,multiSelection:false}); 				
		this.c_dc = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Debit/Credit",items:["D","C"], readOnly:true,tag:8,visible:false});							
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Keterangan", maxLength:150,tag:8});										
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Saldo Budget", tag:8, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai", tag:8, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.bTampil = new button(this.pc1.childPage[1],{bound:[250,17,80,18],caption:"OK",click:[this,"doOK"]});			

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,150],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Budget"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,150,80,150,80,100,200,50,150,80]],					
					readOnly:true,					
					colFormat:[[4,9],[cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sgtmp = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,150],colCount:3,tag:9,visible:false,
			colTitle:["Kode Akun","Kode PP","Nilai"],
			colWidth:[[2,1,0],[100,100,100]],					
			readOnly:true,					
			colFormat:[[2],[cfNilai]],			
			autoAppend:false,defaultRow:1});

		this.e_noapp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"No Approve/Ver", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
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
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			
			var data = this.dbLib.getDataProvider("select flag,keterangan from spro where kode_spro='VENDORPJ'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				//this.kodeVendor = line.flag;

				if (this.app._kodeBidang == "1") this.kodeVendor = "6060030";
				if (this.app._kodeBidang == "2") this.kodeVendor = "6060028";
				if (this.app._kodeBidang == "3") this.kodeVendor = "6060014";
				if (this.app._kodeBidang == "4") this.kodeVendor = "6060029";
				if (this.app._kodeBidang == "5") this.kodeVendor = "6060031";
				if (this.app._kodeBidang == "6") this.kodeVendor = "6060032";

				this.akunHutang = line.keterangan;
			} 
		
			var strSQL = "select a.nik from karyawan a inner join sap_nik_post b on a.nik=b.nik where a.kode_lokasi='"+this.app._lokasi+"'";							  
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.nikPosting = line.nik;					
				}
			}
			var data = this.dbLib.getDataProvider("select sap_user,sap_pwd from hakakses where nik='"+this.nikPosting+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];		
				this.sapUser = line.sap_user;
				this.sapPwd = line.sap_pwd;	
			}		
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang='"+this.app._kodeBidang+"' and tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.kode_bidang='"+this.app._kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_setuju.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag ='002' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.cb_beban.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data MTA",true);
			this.cb_pp2.setSQL("select kode_pp, nama  from pp where kode_bidang='"+this.app._kodeBidang+"' and kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_drk.setSQL("select a.kode_drk, a.nama from drk a where a.tahun = '"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			
			this.cb_pp2.setText(this.app._kodePP);
			this.c_dc.setText("D");
			
			this.cb_akun.setText("11020101");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_panjar_fPjAju.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_panjar_fPjAju.implement({
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
						var strSQL = "select kode_akun,kode_pp,periode, sum(nilai) as nilai "+
									"from panjar2_d "+
									"where no_panjar='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc = 'D' and jenis='BEBAN' "+
									"group by kode_akun,kode_pp,periode";
						var databudget = this.dbLib.getDataProvider(strSQL,true);
						if (typeof databudget == "object" && databudget.rs.rows[0] != undefined){
							var data = databudget.rs.rows;
							this.app.services.releaseSAP(data, this.e_periode.getText().substr(0,4), this.sapUser, this.sapPwd, 
							function(data) { 
								alert(data);  
							});
						}
						
						sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from panjar2_d where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																								
						sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}				

					var vProg = "0";
					sql.add("insert into panjar2_m(no_panjar,kode_lokasi,no_dokumen,tanggal,due_date,keterangan,nik_buat,nik_setuju,kode_pp,nilai,periode,nik_user,tgl_input,no_app,no_ver,no_spb,no_kas,progress,akun_panjar,modul, kode_vendor,akun_hutang,nik_posting,jabatan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','-','-','-','"+vProg+"','"+this.cb_akun.getText()+"','PJ2', '"+this.kodeVendor+"','"+this.akunHutang+"','"+this.nikPosting+"','"+this.e_jab.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into panjar2_d(no_panjar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','PJAJU','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}		
					
					//akun panjar tidak bisa masuk budget--- solusinya akun beban yg masuk dulu					
					//yang masuk harus akun beban dulu untuk keep budget,, tidak bisa akun panjar(akun neraca)
					//akun beban diubah/dihapus saat mau posting
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_panjar,no_urut,kode_lokasi,'PJAJU','PJ',no_panjar,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-','-','-','E' "+
							"from panjar2_d where jenis='BEBAN' and no_panjar='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");


					//untuk jurnal saat posting ke SAP pakai yg jenisnya JURNAL		
					sql.add("insert into panjar2_d(no_panjar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',998,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJAJU','PANJAR','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("insert into panjar2_d(no_panjar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJAJU','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

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
					this.sg.clear(1); this.sg3.clear(1); this.sgtmp.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
					this.c_dc.setText("D");
				break;
			case "simpan" :	
			case "ubah" :								
				this.preView = "1";												
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
						else  {
							if (nilaiToFloat(this.sg.cells(4,i)) > nilaiToFloat(this.sg.cells(9,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}
						}
					} 															
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				
				if (this.e_noaktif.getText() != "-") {
					system.alert(this,"Transaksi tidak valid.","Terdapat panjar aktif yang belum final pertanggungan.");
					return false;						
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
				
				var strSQL = "select kode_akun,kode_pp,periode, sum(nilai) as nilai "+
							 "from panjar2_d "+
							 "where no_panjar='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc = 'D' and jenis='BEBAN' "+
							 "group by kode_akun,kode_pp,periode";
				var databudget = this.dbLib.getDataProvider(strSQL,true);
				if (typeof databudget == "object" && databudget.rs.rows[0] != undefined){
					var data = databudget.rs.rows;
					this.app.services.releaseSAP(data, this.e_periode.getText().substr(0,4), this.sapUser, this.sapPwd, 
					function(data) { 
						alert(data);  
					});
				}
				
				sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from panjar2_d where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
				sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		/*
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		*/
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) {		
			
			var d = new Date();
			var d1 = d.strToDate(this.dp_d1.getText());
			var d2 = d1.DateAdd("d",25);			
			//alert( d2.getDateStr()  );

			this.dp_d2.setText(d2.getDateStr());	
			this.doClick();				
		}
	},	
	doChange: function(sender) {
		if (sender == this.cb_buat && this.cb_buat.getText()!="") {			
			/*
			this.e_jum.setText("0");			
			var data = this.dbLib.getDataProvider("select a.jumlah-isnull(b.jum,0) as sisa "+
					   "from panjar2_nik a "+
					   "left join (select nik_buat,count(*) as jum "+
					   "		   from panjar2_m "+
					   "		   where progress<>'6' and nik_buat='"+this.cb_buat.getText()+"' and no_panjar<>'"+this.e_nb.getText()+"' and periode>'201801' "+
					   "		   group by nik_buat) b on a.nik=b.nik_buat "+
					   "where a.nik='"+this.cb_buat.getText()+"'",true);
			*/			
			var data = this.dbLib.getDataProvider("select a.no_panjar "+
					   "		   from panjar2_m a left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi=b.kode_lokasi "+
					   "		   where a.nik_buat='"+this.cb_buat.getText()+"' and a.no_panjar<>'"+this.e_nb.getText()+"' and a.periode>'201801' and b.no_pj is null ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_noaktif.setText(line.no_panjar);
				} 				
				else this.e_noaktif.setText("-");
			}
		}

		if (sender == this.cb_setuju && this.cb_setuju.getText()!="" && this.stsSimpan==1) {			
			var data = this.dbLib.getDataProvider("select jabatan "+
						"from karyawan where nik='"+this.cb_setuju.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jab.setText(line.jabatan);
				} 				
			}
		}
		if ((sender == this.cb_beban || sender == this.cb_pp2 || sender == this.e_periode) && this.cb_beban.getText()!="" && this.cb_pp2.getText()!="" && this.e_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
				
			this.totPakai = 0;
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					if (this.sg.cells(0,i) == this.cb_beban.getText() && this.sg.cells(5,i) == this.cb_pp2.getText() ) {
						this.totPakai += nilaiToFloat(this.sg.cells(4,i)); 
					}
				}
			}

			//data sebelumnya (saat koreksi) di kembalikan sbg tambahan saldo
			for (var i=0;i < this.sgtmp.getRowCount();i++){
				if (this.sgtmp.rowValid(i)){
					if (this.sgtmp.cells(0,i) == this.cb_beban.getText() && this.sgtmp.cells(1,i) == this.cb_pp2.getText() ) {
						this.totPakai -= nilaiToFloat(this.sgtmp.cells(2,i)); 
					}
				}
			}

			var akun = this.cb_beban.getText();
			var pp = this.cb_pp2.getText();
			var periode = this.e_periode.getText();
			
			var self = this;			
			this.app.services.getSaldo(akun, pp, periode, function(data) {
				self.e_saldo.setText(floatToNilai(data - self.totPakai));
			});						
		}
	},
	doOK:function(sender){		
		try {
			if (this.cb_pp.getText()=="" || this.cb_beban.getText()=="" || this.cb_drk.getText()=="" || this.e_ket2.getText()=="") {
				system.alert(this,"Transaksi tidak valid.","Data tidak lengkap.");
				return false;
			}
			if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
				system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang atau sama dengan nol.");
				return false;
			}
			if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
				system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh melebihi Saldo Budget.");
				return false;
			}
			this.sg.appendData([this.cb_beban.getText(),this.cb_beban.rightLabelCaption,this.c_dc.getText(),this.e_ket2.getText(),this.e_nilai.getText(),this.cb_pp2.getText(),this.cb_pp2.rightLabelCaption,this.cb_drk.getText(),this.cb_drk.rightLabelCaption,this.e_saldo.getText()]);
			
			this.cb_beban.setText("","");
			this.cb_drk.setText("","");
			this.e_saldo.setText("0");
			this.e_nilai.setText("0");
			this.cb_beban.setFocus();

			this.sg.validasi();
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); 	this.sgtmp.clear(1);			
				this.e_total.setText("0");							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjar2_m","no_panjar",this.app._lokasi+"-PJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}			
			this.e_total.setText(floatToNilai(totD - totC));
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
								this.nama_report="server_report_saku3_sapyakes_rptPjAjuForm";
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

								this.app.services.keepBudget(this.e_nb.getText(), function(data){ alert(data); });

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
			this.sg.clear(1); this.sg3.clear(1); this.sgtmp.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);			
			this.c_dc.setText("D");
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_panjar,convert(varchar,a.tanggal,103) as tgl,case a.progress when '0' then 'AJU' when 'C' then 'RETURN' end as jenis,a.no_dokumen,a.keterangan,a.nik_buat+' - '+b.nama as nama,a.nilai "+
		             "from panjar2_m a inner join karyawan b on a.nik_buat=b.nik "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','C') and a.modul='PJ2'";		
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
								
				var strSQL = "select a.keterangan,a.no_dokumen,a.tanggal,a.due_date,a.akun_panjar,a.nik_buat,a.nik_setuju,a.kode_pp,a.progress,a.jabatan, "+
							 "isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan "+
							 "from panjar2_m a "+

							 "	left join ( "+
							 "        select kode_lokasi,no_app,catatan "+
							 "		  from yks_app_m "+
							 "        where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_flag='-' and modul='PJAJU' and form='APPGAR' "+							 							 
							 "		  ) b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+							 
							 
							 "where a.no_panjar = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);																		
						this.dp_d2.setText(line.due_date);
						this.cb_akun.setText(line.akun_panjar);
						this.cb_pp.setText(line.kode_pp);
						this.cb_buat.setText(line.nik_buat);
						this.cb_setuju.setText(line.nik_setuju);
						this.e_jab.setText(line.jabatan);
						
						this.e_noapp.setText(line.no_app);					
						this.e_memo.setText(line.catatan);							
					}					
				}		
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.no_panjar = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='BEBAN' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,"0"]);
					}
				} else this.sg.clear(1);

				var data = this.dbLib.getDataProvider("select kode_akun,kode_pp,sum(nilai) as nilai "+
													  "from panjar2_d "+
													  "where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='BEBAN' "+
													  "group by kode_akun,kode_pp ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgtmp.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgtmp.appendData([line.kode_akun,line.kode_pp,floatToNilai(line.nilai)]);
					}
				} else this.sgtmp.clear(1);

			}									
		} catch(e) {alert(e);}
	}
});