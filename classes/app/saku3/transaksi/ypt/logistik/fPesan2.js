window.app_saku3_transaksi_ypt_logistik_fPesan2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fPesan2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fPesan2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Request", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Request","List Request"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No Request","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,22,202,20],caption:"Jenis",items:["CAPEX","OPEX"], readOnly:true,tag:2, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Request",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,360], childPage:["Anggaran","Detail","Otorisasi","Maksud-Tujuan","Aspek Strategis"]});			
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"PP Budget", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akun Anggaran", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});		
		this.cb_lokproses = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Lokasi Proses", readOnly:true, maxLength:10, tag:2,visible:false});		
		this.e_gar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Sisa Anggaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[0],{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		this.e_catatan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Catatan App",visible:false,readOnly:true,tag:9});				

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,
		            colTitle:["Item Barang","Merk","Tipe","Spesifikasi","Volume","Harga","Jumlah"],
								colWidth:[[6,5,4,3,2,1,0],[80,80,60,180,180,180,180]],															
								colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
								columnReadOnly:[true,[6],[0,1,2,3,4,5]],
								change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
								autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
			
		this.mDesk1 = new tinymceCtrl(this.pc1.childPage[3],{bound:[1,5,990,343], withForm:false});
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[4],{bound:[1,5,990,343], withForm:false});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
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
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.flagDokFree = "0"; this.minCapex = 0;
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('MINCAPEX','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "MINCAPEX") this.minCapex = parseFloat(line.value1);			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}			
			
			this.cb_pp.setSQL("select distinct a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_buat.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a  "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);					
			this.cb_lokproses.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('"+this.app._lokasi+"','"+this.app._kodeLokasiPusat+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Proses",true);			
		
			this.c_jenis.setText("CAPEX");	
			this.cb_pp.setText(this.app._kodePP);
			this.cb_lokproses.setText(this.app._lokasi);
			this.cb_buat.setText(this.app._userLog);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fPesan2.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fPesan2.implement({	
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
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
						sql.add("delete from log_pesan_m where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into log_pesan_m(no_pesan,kode_lokasi,tgl_input,nik_user,periode,jenis,tanggal,no_dokumen,keterangan,kode_pp,kode_drk,kode_akun,saldo_gar,nilai,nik_buat,nik_app,kode_dana,no_app,progress,maksud,aspek,no_terima,no_spph,lok_proses,kode_ppaju) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"',"+nilaiToFloat(this.e_gar.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-','-','1','"+urlencode(this.mDesk1.getCode())+"','"+urlencode(this.mDesk2.getCode())+"','-','-','"+this.cb_lokproses.getText()+"','"+this.cb_pp.getText()+"')"); 							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into log_pesan_d(no_pesan,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,nilai,harga,no_po,no_ba,kode_dana,jum_po,kode_klpfa,ppn) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+",0,'-','-','-',0,'-',0)");
							}
						}
					}							
					sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file.getText()+"',0,'PESAN','"+this.app._lokasi+"')");					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','LOGREQ','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_gar.getText())+","+nilaiToFloat(this.e_total.getText())+")");
										
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
					this.sg.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
					this.bLihat.hide();
					this.stsSimpan = 1;
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_pesan from log_pesan_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di No Request : "+line.no_pesan);
							return false;
						} 
					}
				}						
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);									
				this.doHitungGar();													
				
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(5,i)) < this.minCapex && (this.c_jenis.getText() == "CAPEX" || this.cb_akun.getText().substr(0,1) == "1")) {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Harga kurang dari "+floatToNilai(this.minCapex)+" memakai anggaran OPEX.(Baris : "+k+")");
								return false;						
							}
						}
					}
				}
								
				if (nilaiToFloat(this.e_gar.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total melebihi saldo anggaran.");
					return false;						
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
					sql.add("delete from log_pesan_m where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {					
			this.sg.clear(1); this.sg3.clear(1); 
			this.e_nilai.setText("0");				
			this.bLihat.hide();
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_pesan_m","no_pesan",this.app._lokasi+"-RQ"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);
			
	},	
	doChangeCell: function(sender, col, row){
		if (col == 4 || col == 5 ) {
			if (this.sg.cells(4,row) != "" && this.sg.cells(5,row) != "") {
				this.sg.cells(6,row,floatToNilai(nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(5,row))));
				this.sg.validasi();		
			}
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(6,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doChange: function(sender){						
		if (sender == this.c_jenis) {			
			this.cb_akun.setText("","");
			this.e_gar.setText("0");
			if (this.c_jenis.getText() == "CAPEX") 
				this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '038' "+			                        
									"where a.modul='A' and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			else this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '038' "+
			                         "where a.modul<>'A' and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
		}				
		if (sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) {	
			if (this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {				
				this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi "+
								   "where substring(b.periode,1,4)='"+this.e_periode.getText().substr(0,4)+"' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp='"+this.cb_pp.getText()+"' and a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_drk","a.nama"],false,["Kode","Nama"],"and","Data DRK",true);
			}
		}		
		if (sender == this.cb_pp || sender == this.cb_drk || sender == this.cb_akun || sender == this.e_periode) {	
			this.e_gar.setText("0");			
			this.doHitungGar();
		}
	},
	doHitungGar: function(){				
		if (this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
			var sisa = 0;		
			
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2Thn('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3Thn('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sisa = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_gar.setText(floatToNilai(sisa));
			}
						
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								this.nama_report="server_report_saku3_ypt_logistik_rptPesan";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pesan='"+this.e_nb.getText()+"' ";
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
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								system.info(this,"Transaksi telah sukses tereksekusi (No Request : "+ this.e_nb.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_jenis.setText("CAPEX");			
			setTipeButton(tbSimpan);
			this.bLihat.hide();
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_pesan,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
		             "from log_pesan_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+					 					 
							   "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress ='1' ";							 
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
			this.sg3.appendData([line.no_pesan,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.bLihat.show();
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.*,b.no_gambar,isnull(c.catatan,'-') as catatan from log_pesan_m a "+
							 "inner join log_pesan_dok b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+
							 "left join (select x.no_app,x.kode_lokasi,x.modul,x.no_appseb,y.catatan "+
							 "			 from app_m x inner join app_d y on x.no_app=y.no_app and x.kode_lokasi=y.kode_lokasi "+
							 "			 where x.no_appseb='-' and x.kode_lokasi='"+this.app._lokasi+"') c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi and c.modul='LOGREQ_APP'  "+
							 "where a.no_pesan = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);																								
						this.cb_pp.setText(line.kode_pp);												
						this.cb_akun.setText(line.kode_akun);												
						this.cb_drk.setText(line.kode_drk);												
						this.cb_app.setText(line.nik_app);												
						this.cb_lokproses.setText(line.lok_proses);												
						this.mDesk1.setCode(urldecode(line.maksud));
						this.mDesk2.setCode(urldecode(line.aspek));
						this.e_file.setText(line.no_gambar);	
						this.e_catatan.setText(line.catatan);	
						if (line.progress=="0") this.e_catatan.hide();
						else this.e_catatan.show();						
						this.fileBfr = line.no_gambar;
					}
				}													
				var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg.appendData([line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total)]);
					}
				} else this.sg.clear(1);				
			}									
		} catch(e) {alert(e);}
	}
});