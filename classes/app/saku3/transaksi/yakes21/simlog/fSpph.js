window.app_saku3_transaksi_yakes21_simlog_fSpph = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fSpph.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fSpph";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","S P P H", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal SPPH", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,435], childPage:["Data SPPH","List SPPH"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No SPPH","Tanggal","Deskripsi","Pilih"],
					colWidth:[[3,2,1,0],[70,400,80,100]],readOnly:true,
					colFormat:[[3],[cfButton]],				
					click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No SPPH",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Perihal", maxLength:150});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal SPH", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18]}); 		
		this.cb_pesan = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"No Juskeb", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});												
		this.e_jenis = new saiLabelEdit(this.pc2.childPage[0],{bound:[680,14,300,20],caption:"Jenis Pengadaan", readOnly:true});						
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,285], childPage:["Just. Kebutuhan","Daftar Vendor","Lampiran"]});				
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Kegiatan", readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,220,20],caption:"Tgl Pengajuan", readOnly:true});
		this.e_akun = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Mata Anggaran", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"PP / Unit", readOnly:true});		
		this.e_drk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"DRK", readOnly:true});
		this.e_anggaran = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Anggaran", maxLength:200,readOnly:true});					
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai Kebutuhan", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_jenisgar = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,17,200,20],caption:"Jenis Budget", maxLength:200,readOnly:true});		
		this.e_penutup = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,450,20],caption:"Penutup", maxLength:200,readOnly:true});		
		this.e_waktu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Waktu Penggunaan", maxLength:200,readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,450,20],caption:"Dibuat Oleh", readOnly:true});		
		this.e_maksud = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Maksud/Tujuan", maxLength:200,readOnly:true});				
		this.e_periksa = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"Diperiksa Oleh", readOnly:true});		
		this.e_latar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Latar Belakang", maxLength:200,readOnly:true});		
		this.e_sah = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Disahkan Oleh", readOnly:true});			
		this.e_aspek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Aspek Strategis", maxLength:200,readOnly:true});		
		this.e_appvp = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,450,20],caption:"Disetujui Oleh", readOnly:true});
		this.e_spek = new saiMemo(this.pc1.childPage[0],{bound:[20,130,450,60],caption:"Spesifikasi",readOnly:true});		

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:0,
		            colTitle:["Kode Vendor","Nama","Alamat"],
					colWidth:[[2,1,0],[500,300,80]],					
					columnReadOnly:[true,[1,2],[0]],
					buttonStyle:[[0],[bsEllips]], checkItem: true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.cb_app = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"TTD SPPH", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});												
		this.e_jabat = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,450,20],caption:"Jabatan", maxLength:50,tag:2});		
		this.e_poin1 = new saiMemo(this.pc1.childPage[2],{bound:[20,11,450,60],caption:"Poin 1 SPPH"});						
		this.e_poin2 = new saiMemo(this.pc1.childPage[2],{bound:[20,12,450,60],caption:"Poin 2 SPPH"});						

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
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			
			this.e_spek.setReadOnly(true);

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			

			var sql = new server_util_arrayList();						
			sql.add("select kode_vendor,nama from vendor where kode_klpvendor = '100'");									
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);							   
						

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fSpph.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fSpph.implement({		
	isiCBpesan: function() {
		try {
			this.cb_pesan.setSQL("select a.no_pesan,a.keterangan "+
								"from log_pesan_m a "+
								"inner join log_justerima_m c on a.no_pesan=c.no_pesan "+							 
								"where a.progress='4' and c.progress='2' and a.lok_proses = '"+this.app._lokasi+"' and c.jenis in ('TL','PL') and a.periode<='"+this.e_periode.getText()+"' ",
			["no_pesan","keterangan"],false,["No Request","Deskripsi"],"and","Data Request",true);	
		}
		catch(e) {
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
						sql.add("delete from log_spph_m where no_spph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_spph_vendor where no_spph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update log_justerima_m set progress='2',no_spph='-' where no_spph='"+this.e_nb.getText()+"'");	
					}					
					
					sql.add("update log_justerima_m set progress='3',no_spph='"+this.e_nb.getText()+"' where no_pesan='"+this.cb_pesan.getText()+"'");														
					
					sql.add("insert into log_spph_m(no_spph,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,nik_app,keterangan,no_tap,no_dokumen,due_date,modul,no_sanggup,poin1,poin2,jabat_app) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','-','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"','"+this.jenispeng+"','-','"+this.e_poin1.getText()+"','"+this.e_poin2.getText()+"','"+this.e_jabat.getText()+"')");					
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){								
							sql.add("insert into log_spph_vendor(no_spph,kode_lokasi,kode_vendor,no_sph) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-')");
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
					this.sg2.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
					this.isiCBpesan();					
				break;
			case "simpan" :															
			case "ubah" :	
				this.preView = "1";					
				
				var jmlVendor = 0;
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){								
						jmlVendor +=1;
					}
				}
				if (jmlVendor <= 1 && this.e_jenis.getText().substr(0,2) == "PL"){
					system.alert(this,"Transaksi tidak valid.","Vendor untuk jenis PL - Pemilihan Langsung harus lebih dari 1.");
					return false;						
				}
				if (jmlVendor != 1 && this.e_jenis.getText().substr(0,2) == "TL"){
					system.alert(this,"Transaksi tidak valid.","Vendor untuk jenis TL - Penunjukan Langsung harus 1.");
					return false;						
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
				sql.add("delete from log_spph_m where no_spph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from log_spph_vendor where no_spph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																					
				sql.add("update log_justerima_m set progress='2',no_spph='-' where no_spph='"+this.e_nb.getText()+"'");	
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
								
		if (this.stsSimpan == 1) {
			this.isiCBpesan();
			this.doClick();				
		}
	},
	doChange:function(sender){
		try {
			if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();						

			if (sender == this.cb_app  && this.cb_app.getText()!="") {				
				var jabat =this.dbLib.getPeriodeFromSQL("select jabatan as periode from karyawan where nik='"+this.cb_app.getText()+"'");
				this.e_jabat.setText(jabat);
			}
			
			if (sender == this.cb_pesan && this.cb_pesan.getText()!="") {
				var strSQL = "select convert(varchar,a.tanggal,103) as tgl,a.*,b.nama as lokproses,c.nama as nama_sah,d.nama as pp_log,cc.nama as nama_periksa, ccc.nama as nama_buat,isnull(cccc.nama,'-') as nama_vp "+
							" ,e.nama as nama_akun,f.nama as nama_pp, g.nama as nama_drk, h.jenis as jenis_juspeng,a.jenis as jenis_gar "+
							"from log_pesan_m a "+
							"	inner join lokasi b on a.lok_proses=b.kode_lokasi "+
							"	inner join karyawan c on a.nik_sah=c.nik  "+
							"	inner join karyawan cc on a.nik_app=cc.nik  "+
							"	inner join karyawan ccc on a.nik_buat=ccc.nik  "+							
							"	inner join pp d on a.kode_pplog=d.kode_pp and d.kode_lokasi <>'00' "+						 
							"	inner join masakun e on a.kode_akun=e.kode_akun and e.kode_lokasi=a.kode_lokasi "+
							"	inner join pp f on a.kode_pp=f.kode_pp and f.kode_lokasi=a.kode_lokasi "+
							"	inner join drk g on a.kode_drk=g.kode_drk and g.kode_lokasi=a.kode_lokasi and substring(a.periode,1,4) = g.tahun "+							
							"	inner join log_justerima_m h on a.no_pesan=h.no_pesan "+							
							"	left join karyawan cccc on a.nik_vp=cccc.nik  "+
							"where a.no_pesan = '"+this.cb_pesan.getText()+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_tgl.setText(line.tgl);						
						this.jenispeng = line.jenis_juspeng;
						if (this.jenispeng == "PL") this.e_jenis.setText("PL - PEMILIHAN LANGSUNG");			
						if (this.jenispeng == "TL") this.e_jenis.setText("TL - PENUNJUKAN LANGSUNG");			

						this.e_akun.setText(line.kode_akun+" - "+line.nama_akun);																						
						this.e_pp.setText(line.kode_pp+" - "+line.nama_pp);																						
						this.e_drk.setText(line.kode_drk+" - "+line.nama_drk);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_jenisgar.setText(line.jenis_gar);
						
						this.e_sah.setText(line.nik_sah+" - "+line.nama_sah);
						this.e_periksa.setText(line.nik_app+" - "+line.nama_periksa);
						this.e_buat.setText(line.nik_buat+" - "+line.nama_buat);
						this.e_appvp.setText(line.nik_vp+" - "+line.nama_vp);
						
						this.e_ket2.setText(line.keterangan);						
						this.e_waktu.setText(line.waktu);
						this.e_spek.setText(line.spek);
						this.e_maksud.setText(line.maksud);
						this.e_latar.setText(line.latar);
						this.e_aspek.setText(line.aspek);
						this.e_anggaran.setText(line.anggaran);
						this.e_penutup.setText(line.penutup);
					}
				}

				this.pc1.setActivePage(this.pc1.childPage[0]);
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg2.clear(1); this.sg3.clear(1); 										
				this.isiCBpesan();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_spph_m","no_spph",this.app._lokasi+"-SPPH"+this.e_periode.getText().substr(2,4)+".","000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doChangeCell2: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var vendor = this.dataVendor.get(sender.cells(0,row));				
				if (vendor) {
					sender.cells(1,row,vendor);
					var strSQL = "select alamat from vendor where kode_vendor='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							sender.cells(2,row,line.alamat);
						}
					}
					
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Vendor "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell2");		
	},						
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
							"select kode_vendor, nama  from vendor where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_vendor) from vendor where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_vendor","nama"],"and",["Kode","Nama"],false);				
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
								this.nama_report="server_report_saku3_logistik_rptSpph";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and f.no_spph='"+this.e_nb.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataVendor = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataVendor.set(line.kode_vendor, line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.dataJU5 = {rs:{rows:[]}};
			this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.isiCBpesan();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select distinct a.no_spph,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from log_spph_m a left join log_sph_m b on a.no_spph=b.no_spph "+					 					 
					 "where b.no_sph is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tap='-' and a.modul in ('TL','PL') ";		
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
			this.sg3.appendData([line.no_spph,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 3) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.keterangan,a.tanggal,a.nik_app,a.no_dokumen,c.no_pesan,a.due_date,a.poin1,a.poin2  "+
							 "from log_spph_m a "+
							 "          inner join log_justerima_m b on a.no_spph=b.no_spph "+							 
							 "          inner join log_pesan_m c on b.no_pesan=c.no_pesan "+							 
							 "where a.no_spph = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.e_dok.setText(line.no_dokumen);						
						this.e_ket.setText(line.keterangan);						
						this.cb_app.setText(line.nik_app);	
						this.e_poin1.setText(line.poin1);
						this.e_poin2.setText(line.poin2);																
						this.cb_pesan.setSQL("select no_pesan,keterangan from log_pesan_m where no_pesan='"+line.no_pesan+"'",["no_pesan","keterangan"],false,["No Request","Deskripsi"],"and","Data Request",true);			
						this.cb_pesan.setText(line.no_pesan);																								
					}
				}										
				
				var data = this.dbLib.getDataProvider("select a.kode_vendor,b.nama,b.alamat from log_spph_vendor a inner join vendor b on a.kode_vendor=b.kode_vendor where a.no_spph='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_vendor,line.nama,line.alamat]);
					}
				} else this.sg2.clear(1);	
				
			}									
		} catch(e) {alert(e);}
	}
});