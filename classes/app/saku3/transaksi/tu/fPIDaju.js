window.app_saku3_transaksi_tu_fPIDaju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_fPIDaju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_fPIDaju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Kas PID: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Agenda","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,400,80,100]],
					colFormat:[[3],[cfNilai]],												
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data by PP",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"MTA",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_drk = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"DRK",tag:1,multiSelection:false,change:[this,"doChange"]});         				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Saldo Budget TW", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai Bruto", tag:1, tipeText:ttNilai, readOnly:true, text:"0"});
			
		this.cb_sk = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No SK",tag:1,multiSelection:false,change:[this,"doChange"]});
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"NIP",tag:1,readOnly:true}); 	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,220], childPage:["Data Tarif","Rekening"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode Param","Deskripsi","Satuan","Nilai"],
					colWidth:[[3,2,1,0],[100,80,450,100]],					
					columnReadOnly:[true,[0,1,2],[3]],
					colFormat:[[3],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,550,20],caption:"User input", maxLength:50});						
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,550,20],caption:"Nama Rekening", maxLength:50});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,550,20],caption:"No Rekening", maxLength:50});				
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,550,20],caption:"Bank - Cabang", maxLength:100});				
		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
	
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
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			else this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
								   "where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_sk.setSQL("select no_sk, keterangan from tu_pid_sk where kode_lokasi='"+this.app._lokasi+"'",["no_sk","keterangan"],false,["No SK","Deskripsi"],"and","Data SK",true);
			this.cb_nik.setSQL("select kode_dosen, nama from tu_dosen where kode_lokasi='"+this.app._lokasi+"'",["kode_dosen","nama"],false,["Kode","Nama"],"and","Data Dosen",true);
			
			this.e_user.setText(this.app._namaUser);
			this.e_namarek.setText("-");
			this.e_norek.setText("-");
			this.e_bank.setText("-");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_fPIDaju.extend(window.childForm);
window.app_saku3_transaksi_tu_fPIDaju.implement({	
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
						sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");																
						sql.add("delete from tu_pid_aju where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}
					
					
					var netto = nilaiToFloat(this.e_nilai.getText()) ;
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"',"+netto+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.e_user.getText()+"','PID','NON',0)");					
					
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
					         "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','-',"+netto+",'-')");										
					
					if (this.stsGar == "1") {
						var nilaiGar = nilaiToFloat(this.e_nilai.getText());
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_saldo.getText())+","+nilaiGar+")");
					}					
					sql.add("insert into it_aju_dok(no_bukti,modul,no_gambar,kode_lokasi)values('"+this.e_nb.getText()+"','AJUBBN','"+this.e_file.getText()+"','"+this.app._lokasi+"')");
					
					
					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								                           
								sql.add("insert into tu_pid_aju (no_bukti,no_sk,kode_lokasi,kode_param,tarif,no_kapital) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_sk.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+",'-')");
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
					setTipeButton(tbSimpan);
					this.e_namarek.setText("-");
					this.e_norek.setText("-");
					this.e_bank.setText("-");
					this.sg.clear(1);
					this.sg3.clear(1);
				break;
			case "simpan" :		
			case "ubah" :	
				this.preView = "1";						
				if (this.stsGar == "1") {
					if (this.cb_drk.getText() == "-") {
						system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.");
						return false;						
					}
					else {
						var nilaiGar = nilaiToFloat(this.e_nilai.getText());
						if (nilaiGar > nilaiToFloat(this.e_saldo.getText())) {
							system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi saldo.");
							return false;						
						}
					}
				}									
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");				
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
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);				
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if (sender == this.cb_sk && this.cb_sk.getText() != "") {
			var data = this.dbLib.getDataProvider("select kode_dosen  "+
			           "from tu_pid_sk  "+
			           "where no_sk='"+this.cb_sk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_nik.setText(line.kode_dosen);
				} 
			}
			if (this.stsSimpan == 1) {
				var data = this.dbLib.getDataProvider("select a.kode_param,a.nama,a.sat,b.tarif "+
													  "from tu_param_pid a inner join tu_pid_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
													  "where b.no_sk='"+this.cb_sk.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_param,line.nama,line.sat,floatToNilai(line.tarif)]);
					}
				} else this.sg.clear(1);
			}
		}
		if ((sender == this.cb_pp ||sender == this.e_periode)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="") {
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.cb_pp.getText()+"' and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
									"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
			if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);											
			else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"where","Data DRK",true);											
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				var sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_saldo.setText(floatToNilai(sls));				
			}
		}
	},
	doChangeCell: function(sender, col, row){											
		if (col == 3) this.sg.validasi();				
	},
	doNilaiChange: function(){
		try{			
			var total =  0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != ""){
					total += nilaiToFloat(this.sg.cells(3,i));				
				}
			}									
			this.e_nilai.setText(floatToNilai(total));						
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
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
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
			setTipeButton(tbSimpan);
			this.e_namarek.setText("-");
			this.e_norek.setText("-");
			this.e_bank.setText("-");
			this.stsSimpan = 1;
			this.sg.clear(1);this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	
	doLoad3:function(sender){																
		var strSQL = "select no_aju, convert(varchar,tanggal,103) as tgl, keterangan, nilai "+
					 "from it_aju_m "+
					 "where kode_pp='"+this.cb_pp.getText()+"' and form = 'PID' and modul='UMUM' and progress in ('A','K','R') and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
								
				var data = this.dbLib.getDataProvider("select a.nik_app,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,a.kode_akun,a.kode_drk,isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan, r.bank,r.no_rek,r.nama_rek,a.user_input,a.sts_pajak,a.npajak,isnull(c.no_gambar,'') as no_gambar   "+
						   "from it_aju_m a inner join it_aju_rek r on a.no_aju=r.no_aju and a.kode_lokasi=r.kode_lokasi "+
						   "left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
						   "          from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
						   "          where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"') x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
						   "left join it_aju_dok c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+					   
						   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_akun.setText(line.kode_akun);
						this.cb_pp.setText(line.kode_pp);
						this.cb_drk.setText(line.kode_drk);					
						this.e_ket.setText(line.keterangan);						
					} 
				}				
				var strSQL = "select b.kode_dosen,a.nilai+a.pajak as bruto,a.pajak,a.nilai,b.nama,b.gelar,b.bank+' - '+b.cabang+' - '+b.no_rek+' - '+b.nama_rek as rek,a.berita "+
				             "from it_aju_rek a inner join it_dosen b on a.keterangan=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.berita,line.nama,line.gelar,line.rek]);
					}
				} else this.sg.clear(1);											
				
				var totBruto =  0;			
				for (var i=0;i < this.sg.getRowCount();i++){			
					if (this.sg.rowValid(i)){
						totBruto += nilaiToFloat(this.sg.cells(1,i));										
					}
				}
				this.e_nilai.setText(floatToNilai(totBruto));
				
				var data = this.dbLib.getDataProvider("select b.no_sk,a.kode_param,a.nama,a.sat,b.tarif "+
													  "from tu_param_pid a inner join tu_pid_aju b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
													  "where b.no_bukti='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_param,line.nama,line.sat,floatToNilai(line.tarif)]);
					}
				} else this.sg.clear(1);
				this.cb_sk.setText(line.no_sk);
				
			}						
		} catch(e) {alert(e);}
	}
});