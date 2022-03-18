window.app_saku3_transaksi_sppd_fSurTgs = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fSurTgs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fSurTgs";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Tugas PD", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Surat Tugas","List Surat Tugas"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","No Perintah","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:200});	
		
		this.e_pp = new saiLabelEdit(this.pc2.childPage[0],{bound:[520,19,200,20],caption:"Bagian / PP",readOnly:true,tag:2,change:[this,"doChange"],visible:false}); 		
		this.e_unit = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Unit",readOnly:true,tag:2,change:[this,"doChange"],visible:true}); 		

		this.e_alokasi = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Budget Terpakai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		this.cb_super = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Surat Perintah", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});							
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total PD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,305], childPage:["Data Surat Perintah","Data Pengajuan PD","Rekening PP","Agenda - Budget","Dokumen Upload"]});		
		this.e_asal = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,20,220,20],caption:"Kota Asal",tag:2,readOnly:true});         		
		this.e_tempat = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Kota Tujuan",tag:2,readOnly:true});         		
		this.e_perintah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,450,20],caption:"NIP Perintah", maxLength:100,readOnly:true});						
		this.e_maksud = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,450,20],caption:"Maksud/Tujuan", maxLength:100, readOnly:true});						
		this.cb_buat = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"NIP Pembuat",tag:2,readOnly:true});         		
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,22,220,20],caption:"Pemberi Tugas",tag:2,readOnly:true});         		
		this.e_catatan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,450,20],caption:"Catatan", maxLength:200});		

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
				colTitle:["Status","No PD","NIP - Nama","PP/Unit","Nilai PD","Kode PP","Kota"],
				colWidth:[[6,5,4,3,2,1,0],[150,80,100,280,280,120,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colHide:[[5],[true]],	
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]],
				colFormat:[[4],[cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
				colTitle:["Bagian/Unit","Bank","Cabang","No Rekening","Nama Rekening","Nilai"],
				colWidth:[[5,4,3,2,1,0],[100,200,200,150,120,150]],
				columnReadOnly:[true,[1,2,3,4,5],[]],
                colFormat:[[5],[cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.e_agenda = new portalui_saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No Agenda",maxLength:30,readOnly:true});			
		this.c_jenis = new saiCB(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2});					
		
		this.sg22 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,217],colCount:8,tag:0,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo TW","Terpakai PD"],
					colWidth:[[7,6,5,4,3,2,1,0],[90,90,170,80,170,80,170,80]],					
					columnReadOnly:[true,[0,1,3,5,6],[2,4,7]],
					buttonStyle:[[2,4],[bsEllips,bsEllips]], 
					colFormat:[[6,7],[cfNilai,cfNilai]],checkItem: true,
					ellipsClick:[this,"doEllipsClick22"],change:[this,"doChangeCell22"],nilaiChange:[this,"doNilaiChange22"],					
					autoAppend:false,defaultRow:1});
		this.sgn22 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg22});		
		this.bHitung = new portalui_imageButton(this.sgn22,{bound:[this.sgn22.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Hitung",click:[this,"doHitung"]});				

		this.e_file = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,450,20],caption:"Memo/Surat Tugas", readOnly:true, tag:9});		
		this.bLihat = new button(this.pc1.childPage[4],{bound:[480,15,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat2 = new button(this.pc1.childPage[4],{bound:[480,16,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file3 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat3 = new button(this.pc1.childPage[4],{bound:[480,17,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file4 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,18,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat4 = new button(this.pc1.childPage[4],{bound:[480,18,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file5 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,19,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat5 = new button(this.pc1.childPage[4],{bound:[480,19,80,18],caption:"Lihat File",click:[this,"doLihat"]});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);
		
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
			var strSQL = "select kode_unit from karyawan where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kodeUnit = line.kode_unit;
					this.e_unit.setText(line.kode_unit);
				}					
			}
			var strSQL = "select kode_pp from sp_unit where kode_lokasi='"+this.app._lokasi+"' and kode_unit='"+this.kodeUnit+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kodePPfromUnit = line.kode_pp;
				}					
			}
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
			var data = this.dbLib.getDataProvider("select distinct kode_induk from pp where kode_pp='"+this.app._kodePP+"' and kode_induk not in('-','00') and kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.ppInduk = line.kode_induk;
				}
			}
	
			
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a where nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIP","Nama"],"and","Data Karyawan",true);											
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where  a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIP","Nama"],"and","Data Karyawan",true);											
			
			this.e_asal.setSQL("select kode_kota,nama from sp_kota where kode_lokasi ='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode","Nama"],"and","Data Kota",true);
			this.e_tempat.setSQL("select kode_kota,nama from sp_kota where kode_lokasi ='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode","Nama"],"and","Data Kota",true);
			
			this.e_pp.setText(this.app._kodePP);
			this.cb_buat.setText(this.app._userLog);

			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fSurTgs.extend(window.childForm);
window.app_saku3_transaksi_sppd_fSurTgs.implement({
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},
	doLoad : function() {
		this.sg1.validasi();
	},
	doHitung: function(sender){
		this.sg22.cells(7,0,this.e_total.getText());
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
						sql.add("update sp_spj_m set progress='3',no_stugas='-' where kode_lokasi='"+this.app._lokasi+"' and no_stugas='"+this.e_nb.getText()+"'");	
						sql.add("delete from sp_stugas_m where no_stugas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
						sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_multi where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
												
						sql.add("delete from angg_r where no_bukti = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");																

					} 
					
					sql.add("insert into sp_stugas_m(no_stugas,no_perintah,kode_lokasi,nik_user,tgl_input,periode,tanggal,keterangan,kode_akun,kode_pp,kode_drk,catatan,nik_buat,nik_app,no_aju, kode_kategori,kode_unit) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_super.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.akunPertama+"','"+this.ppBudget+"','"+this.drkPertama+"','"+this.e_catatan.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_agenda.getText()+"','"+this.kodeKategori+"','"+this.kodeUnit+"')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							if(this.sg1.cells(0,i) == "APP") var status = "4";
							else var status = "Z";
							
							sql.add("update sp_spj_m set progress='"+status+"',no_stugas='"+this.e_nb.getText()+"' where kode_lokasi='"+this.app._lokasi+"' and no_spj='"+this.sg1.cells(1,i)+"'");																																						
						}
					}	

					//agenda					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
							"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.akunPertama+"','"+this.ppPertama+"','"+this.drkPertama+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._namaUser+"','SPPD2','NON',0,'-')");					
									
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) {
							if (nilaiToFloat(this.sg2.cells(5,i)) > 0) {
								//colTitle:["Bagian/Unit","Bank","Cabang","No Rekening","Nama Rekening","Nilai"],
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita) values "+
										"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(5,i))+",'"+this.e_ket.getText()+"',0,'"+this.e_nb.getText()+"')");
							}
						}
					}	
					
					for (var i=0;i < this.sg22.getRowCount();i++){
						if (this.sg22.rowValid(i)){	
							if (nilaiToFloat(this.sg22.cells(7,i)) >= 0) { //nol  tetep kesimpen buat koreksi
								sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
										"('"+this.e_agenda.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.e_periode.getText()+"','"+this.sg22.cells(0,i)+"','"+this.sg22.cells(2,i)+"','"+this.sg22.cells(4,i)+"','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg22.cells(7,i))+",'BEBAN')");
								
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_agenda.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.sg22.cells(0,i)+"','"+this.sg22.cells(2,i)+"','"+this.sg22.cells(4,i)+"','"+this.periodeSuper+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.sg22.cells(6,i))+","+nilaiToFloat(this.sg22.cells(7,i))+")");		
								
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
					this.sg1.clear(1); 					
					this.sg2.clear(1); 					
					setTipeButton(tbSimpan);	
					this.stsSimpan = 1;
					this.doChange(this.e_pp);
					this.doClick();					
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();
				this.sg22.validasi();								
				
				var d = new Date();
				var d1 = d.strToDate(this.tglSuper);
				var d2 = d.strToDate(this.dp_d1.getText());
				if (d1 > d2) {												
					system.alert(this,"Tanggal tidak valid.","Tanggal Surat Perintah mendahului Tgl Surat Tugas. (Tgl Surat Perintah: "+this.tglSuper+")");
					return false;
				}

				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_alokasi.getText())) {					
					system.alert(this,"Transaksi tidak valid.","Total PD melebihi Budget Terpakai.");
					return false;		
				}

				for (var i = 0; i < this.sg22.rows.getLength();i++){
					if (this.sg22.rowValid(i)){
						//utk kebutuhan it_aju_m
						if (i==0) {
							this.akunPertama = this.sg22.cells(0,i);
							this.ppPertama = this.sg22.cells(2,i);
							this.drkPertama = this.sg22.cells(4,i);
						}

						if (nilaiToFloat(this.sg22.cells(6,i)) < nilaiToFloat(this.sg22.cells(7,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Pemakaian PD melebihi Budget.[Baris : "+k+"]");
							return false;		
						}
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
					sql.add("update sp_spj_m set progress='3',no_stugas='-' where kode_lokasi='"+this.app._lokasi+"' and no_stugas='"+this.e_nb.getText()+"'");	
					sql.add("delete from sp_stugas_m where no_stugas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_multi where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										

					sql.add("delete from angg_r where no_bukti = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");																					
																
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
		if (this.stsSimpan == 1) {
			this.doLoad();			
			this.doClick();	
		}			
	},
	doChange:function(sender){		
		try	{			
			if (sender == this.e_pp && this.e_pp.getText()!="" && this.stsSimpan==1) {						
				this.cb_super.setSQL("select distinct a.no_perintah,a.keterangan,convert(varchar,a.tanggal,103) as tgl "+
									 "from sp_perintah_m a "+

									 //"inner join karyawan_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.nik='"+this.app._userLog+"' "+

									 "inner join (select kode_pp,kode_lokasi from pp "+
									 "			  where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp in ('"+this.e_pp.getText()+"','"+this.ppInduk+"')) c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+
									 
									 "left join ( "+
									 "			select distinct no_perintah "+
									 "			from sp_spj_m "+
									 "			where no_stugas<>'-' and kode_lokasi='"+this.app._lokasi+"' and progress<>'Z' "+
									 "			) b on a.no_perintah=b.no_perintah "+

									 "where b.no_perintah is null and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_kategori<>'8' and a.nik_buat='"+this.app._userLog+"' "+

									 "union all "+
									 
									 "select  a.no_perintah,a.keterangan ,convert(varchar,a.tanggal,103) as tgl "+
									 "from sp_perintah_m a "+
									 "inner join ( "+									 
									 "		select distinct a.no_perintah "+
									 "		from sp_perintah_d a "+
									 "		where a.kode_lokasi='"+this.app._lokasi+"' "+ 
									 " ) b on a.no_perintah=b.no_perintah "+

									 "inner join ( "+
									 "			select distinct no_perintah "+
									 "			from sp_spj_m "+
									 "			where no_stugas='-' and kode_lokasi='"+this.app._lokasi+"' and progress<>'Z' "+
									 "			) c on b.no_perintah=c.no_perintah "+

									 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_kategori='8' "

									 ,["no_perintah","keterangan","tgl"],false,["No Perintah","Keterangan","Tanggal"],"and","Data Surat Perintah",true);							
			}
			
            if(sender == this.cb_super && this.cb_super.getText()!=""){	
				var data = this.dbLib.getDataProvider(
							"select a.* "+
							",isnull(b.nama_file,'') as nama_file1 "+
							",isnull(c.nama_file,'') as nama_file2 "+
							",isnull(d.nama_file,'') as nama_file3 "+
							",isnull(e.nama_file,'') as nama_file4 "+
							",isnull(f.nama_file,'') as nama_file5 "+

							"from sp_perintah_m a "+
							"	inner join sp_perintah_d g on a.no_perintah=g.no_perintah and a.kode_lokasi=g.kode_lokasi "+
							"	left join sp_dok b on a.no_perintah=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SP' and b.nu = 1 "+							 
							"	left join sp_dok c on a.no_perintah=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.kode_jenis='SP' and c.nu = 2 "+							 
							"	left join sp_dok d on a.no_perintah=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.kode_jenis='SP' and d.nu = 3 "+							 
							"	left join sp_dok e on a.no_perintah=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.kode_jenis='SP' and e.nu = 4 "+							 
							"	left join sp_dok f on a.no_perintah=f.no_bukti and a.kode_lokasi=f.kode_lokasi and f.kode_jenis='SP' and f.nu = 5 "+							 
							"where a.no_perintah='"+this.cb_super.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);

				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_file.setText(line.nama_file1);
						this.fileBfr = line.nama_file1;	
						this.e_file2.setText(line.nama_file2);
						this.fileBfr2 = line.nama_file2;	
						this.e_file3.setText(line.nama_file3);
						this.fileBfr3 = line.nama_file3;	
						this.e_file4.setText(line.nama_file4);
						this.fileBfr4 = line.nama_file4;	
						this.e_file5.setText(line.nama_file5);
						this.fileBfr5 = line.nama_file5;	

						this.ppBudget = line.kode_pp;
					} 
				}	
							
				var strSQL = "select a.asal, a.tempat,b.nik+' - '+b.nama as perintah,a.keterangan,a.nik_app, c.nama_file,a.periode,a.kode_kategori, convert(varchar,a.tanggal,103) as tgl_super "+
							 "from sp_perintah_m a "+
							 "	   inner join  sp_dok c on a.no_perintah=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
							 "inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_perintah = '"+this.cb_super.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.kodeKategori = line.kode_kategori;
						this.periodeSuper = line.periode;			
						this.e_asal.setText(line.asal);
						this.e_tempat.setText(line.tempat);
						this.e_maksud.setText(line.keterangan);
						this.e_perintah.setText(line.perintah);
						this.e_file.setText(line.nama_file);
						this.tglSuper = line.tgl_super;

						if (this.stsSimpan == 1) {
							this.cb_app.setText(line.nik_app);
							this.e_catatan.setText("-");
						}

						if (this.stsSimpan == 1) {
							if (this.kodeKategori == "8") { //RAPIM	
								var strSQL = "select a.* from sp_unit a "+
										"inner join ("+
										"		select distinct kode_unit "+
										"		from sp_spj_m where kode_unit='"+this.kodeUnit+"' and kode_lokasi='"+this.app._lokasi+"' and progress='3' and no_perintah='"+this.cb_super.getText()+"' "+
										") b  on a.kode_unit=b.kode_unit "+
										"where a.kode_lokasi='"+this.app._lokasi+"'";   
							}
							else {
								var strSQL = "select a.* from sp_unit a "+
										"inner join ("+
										"		select distinct kode_unit "+
										"		from sp_spj_m where kode_lokasi='"+this.app._lokasi+"' and progress='3' and no_perintah='"+this.cb_super.getText()+"' "+
										") b  on a.kode_unit=b.kode_unit "+
										"where a.kode_lokasi='"+this.app._lokasi+"'";   
							}

							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line2;
								this.sg2.clear();                    
								for (var i in data.rs.rows){
									line2 = data.rs.rows[i];		
									this.sg2.appendData([line2.kode_unit,line2.bank,line2.cabang,line2.no_rek,line2.nama_rek,"0"]);
								}
							} else this.sg2.clear(1);	
						}


						var sql = new server_util_arrayList();						
						if (this.kodeKategori == "8") { //RAPIM							
							sql.add("select a.kode_pp, a.nama from pp a  where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'");
							sql.add("select a.kode_akun, a.nama from masakun a where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' and a.kode_akun='5311101' ");							
						}
						else {
							sql.add("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'");								
							sql.add("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '056' "+
									"where a.jenis = 'Beban' and a.kode_lokasi='"+this.app._lokasi+"'");							
						}
						this.dbLib.getMultiDataProviderA(sql);


					}
				}
				

				if (this.stsSimpan == 1) {							
					var strSQL = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp, a.kode_drk,d.nama as nama_drk, 0 as nilai "+
								 "from sp_gar_d a "+								 
								 "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+								 
								 "inner join pp c on a.kode_pp=c.kode_induk and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.kodePPfromUnit+"' "+
								 "inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
								 "inner join sp_perintah_m e on a.no_perintah=e.no_perintah and a.kode_lokasi=e.kode_lokasi and e.kode_kategori='8' "+                          								 
								 "where a.no_perintah='"+this.cb_super.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+

								 "union "+

								 "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp, a.kode_drk,d.nama as nama_drk, 0 as nilai "+
								 "from sp_gar_d a "+								 
								 "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								 "inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
								 "inner join sp_perintah_m e on a.no_perintah=e.no_perintah and a.kode_lokasi=e.kode_lokasi and e.kode_kategori<>'8' "+                          
								 "where a.no_perintah='"+this.cb_super.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and e.kode_kategori<>'8' ";

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg22.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg22.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk, "0",floatToNilai(line.nilai)]);
							this.doChangeCell22(this.sg22,4,i);
						}
					} else this.sg22.clear(1);									
					this.sg22.validasi();
					
					//kategori 8 = rapim = hanya yang se-unit; <> 8 bisa langsung all unit										
					var strSQL = "select a.no_spj,a.nik_spj+' - '+a.nama_spj as nama,a.kode_unit+' - '+b.nama as pp,a.nilai_trans+a.nilai_uhar as nilai,a.kode_unit,a.tempat "+
								 "from sp_spj_m a "+
								 "inner join sp_unit b on a.kode_unit = b.kode_unit and a.kode_lokasi=b.kode_lokasi "+   
								 "inner join sp_perintah_m c on a.no_perintah=c.no_perintah and a.kode_lokasi=c.kode_lokasi "+                          
								 "where a.progress='3' and a.no_perintah = '"+this.cb_super.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'  and c.kode_kategori='8' "+ //and a.kode_unit='"+this.kodeUnit+"'
								 
								 "union "+
								 
								 "select a.no_spj,a.nik_spj+' - '+a.nama_spj as nama,a.kode_unit+' - '+b.nama as pp,a.nilai_trans+a.nilai_uhar as nilai,a.kode_unit,a.tempat "+
								 "from sp_spj_m a "+
								 "inner join sp_unit b on a.kode_unit = b.kode_unit and a.kode_lokasi=b.kode_lokasi "+   
								 "inner join sp_perintah_m c on a.no_perintah=c.no_perintah and a.kode_lokasi=c.kode_lokasi "+                          
								 "where a.progress='3' and a.no_perintah = '"+this.cb_super.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.kode_kategori<>'8' ";								
								 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg1.clear();                    
						for (var i in data.rs.rows){
							line = data.rs.rows[i];		
							this.sg1.appendData(["APP",line.no_spj,line.nama,line.pp,floatToNilai(line.nilai),line.kode_unit,line.tempat]);
						}
					} else this.sg1.clear(1);					
										
					
				}
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
				this.doChange(this.e_pp);
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_stugas_m","no_stugas",this.app._lokasi+"-STG"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_agenda.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));	
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			//colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo TW","Terpakai PD"],			
			var total = nilai = 0;			
			for (var j = 0; j < this.sg2.getRowCount();j++) {
				this.sg2.cells(5,j,floatToNilai(nilai));	
			}			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "") {
					if (this.sg1.cells(0,i)=="APP") {
						total += nilaiToFloat(this.sg1.cells(4,i));
					}

					//rekap di rekening=
					for (var j = 0; j < this.sg2.getRowCount();j++) {
						if (this.sg1.cells(5,i) == this.sg2.cells(0,j) && this.sg1.cells(0,i)=="APP") {
							nilai = nilaiToFloat(this.sg2.cells(5,j)) + nilaiToFloat(this.sg1.cells(4,i));
							this.sg2.cells(5,j,floatToNilai(nilai));	
						}
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
		if (this.sg1.cells(0,row) == "NONAPP") this.sg1.cells(0,row,"APP");
		else this.sg1.cells(0,row,"NONAPP"); 
	},	
	doChangeCell22: function(sender, col, row){
		if (col == 7 && this.sg22.cells(7,row) != "") this.sg22.validasi();
		sender.onChange.set(undefined,undefined);	    
			
		if (col == 2) {
			if (sender.cells(2,row) != "") {
				var pp = this.dataPP2.get(sender.cells(2,row));
				if (pp) {
					sender.cells(3,row,pp);
					
					sender.cells(4,row,"");
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		
		if (col == 4) {
			if (sender.cells(4,row) != "") {											
				var data = this.dbLib.getDataProvider(
						   "select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk "+
						   "where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+
						   "%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and b.kode_drk = '"+sender.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {
						sender.cells(5,row,line.nama);
						
						if (this.stsSimpan==1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+sender.cells(2,row)+"','"+this.app._lokasi+"','"+sender.cells(0,row)+"','"+sender.cells(4,row)+"','"+this.e_periode.getText()+"') as gar ",true);		
						else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+sender.cells(2,row)+"','"+this.app._lokasi+"','"+sender.cells(0,row)+"','"+sender.cells(4,row)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);		

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];
							data = line.gar.split(";");
							var sls = parseFloat(data[0]) - parseFloat(data[1]);			
							sender.cells(6,row,floatToNilai(sls));
						}
					}
					else {						
						sender.cells(4,row,"-");
						sender.cells(5,row,"-");
						sender.cells(6,row,"0");						
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell22");
	},
	doEllipsClick22: function(sender, col, row){
		try{			
			if (sender == this.sg22) {				
				if (col == 2){					
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
						"select a.kode_pp, a.nama from pp a  where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' and a.kode_pp='"+this.kodePPfromUnit+"'",
						"select count(*) from pp a where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' and a.kode_pp='"+this.kodePPfromUnit+"'",
						["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);									
				}				
				if (col == 4){					
					var vUnion = "";
					var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange22: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg22.rows.getLength();i++){
				if (this.sg22.rowValid(i) && this.sg22.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg22.cells(7,i));					
				}
			}
			this.e_alokasi.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("doNilaiChange2:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sppd_rptSurTgs";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_stugas='"+this.e_nb.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPP = new portalui_arrayMap();
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}					
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
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
			this.sg1.clear(1); this.sg2.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.stsSimpan = 1;
			this.doClick();		
			this.doChange(this.e_pp);
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select distinct a.no_stugas,convert(varchar,a.tanggal,103) as tgl,a.no_perintah,a.keterangan "+
		             "from sp_stugas_m a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.progress in ('A','K','R') "+
		             "                   inner join karyawan_pp c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+					 
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
			this.sg3.appendData([line.no_stugas,line.tgl,line.no_perintah,line.keterangan]); 
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
								
				var strSQL = "select a.*,b.modul as jenis,c.asal,c.tempat from sp_stugas_m a "+
							 "inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sp_perintah_m c on a.no_perintah=c.no_perintah and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_stugas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText(line.jenis);						
						this.e_asal.setText(line.asal);
						this.e_tempat.setText(line.tempat);
						this.e_catatan.setText(line.catatan);
						this.e_agenda.setText(line.no_aju);
						this.cb_super.setSQL("select no_perintah,keterangan from sp_perintah_m where no_perintah='"+line.no_perintah+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_perintah","keterangan"],false,["No Perintah","Keterangan"],"and","Data Surat Perintah",true);							
						this.cb_super.setText(line.no_perintah);

						this.e_pp.setText(line.kode_pp);
						this.cb_app.setText(line.nik_app);
					}
				}
				
				var strSQL = "select case a.progress when '4' then 'APP' else 'NONAPP' end as sts ,a.no_spj,a.nik_spj+' - '+a.nama_spj as nama,a.kode_unit+' - '+b.nama as pp,a.nilai_trans+a.nilai_uhar as nilai,a.kode_unit,a.tempat "+
							"from sp_spj_m a "+
							"inner join sp_unit b on a.kode_unit = b.kode_unit and a.kode_lokasi=b.kode_lokasi "+                             
							"where a.no_stugas= '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";   

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();                    
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sg1.appendData([line.sts.toUpperCase(),line.no_spj,line.nama,line.pp,floatToNilai(line.nilai),line.kode_unit,line.tempat]);
					}
				} else this.sg1.clear(1);					
				

				var strSQL = "select a.* from sp_unit a "+
							"inner join ("+
							"		select distinct kode_unit "+
							"		from sp_spj_m where kode_lokasi='"+this.app._lokasi+"' and no_stugas='"+this.e_nb.getText()+"' "+
							") b  on a.kode_unit=b.kode_unit "+
							"where a.kode_lokasi='"+this.app._lokasi+"'";                            
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();                    
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];		
						this.sg2.appendData([line2.kode_unit,line2.bank,line2.cabang,line2.no_rek,line2.nama_rek,"0"]);
					}
				} else this.sg2.clear(1);
				this.sg1.validasi();

				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp, a.kode_drk,d.nama as nama_drk, a.nilai,e.nilai as pakai "+
							 "from sp_gar_d a "+
							 "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							 "inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
							 "inner join angg_r e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk and e.no_bukti='"+this.e_agenda.getText()+"' "+
							 "where a.no_perintah='"+this.cb_super.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg22.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																		
						this.sg22.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk, "0",floatToNilai(line.pakai)]);						
						this.doChangeCell22(this.sg22,4,i);
						var saldoGar = nilaiToFloat(this.sg22.cells(6,i)) + parseFloat(line.pakai);
						this.sg22.cells(6,i,floatToNilai(saldoGar));
					}
				} else this.sg22.clear(1);									
				this.sg22.validasi();
												
			}						
		} catch(e) {alert(e);}
	}
});