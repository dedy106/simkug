window.app_saku3_transaksi_ppbs_aset_fUsulan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_aset_fUsulan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_aset_fUsulan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Usulan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Usulan","Data Usulan","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		             colTitle:["No Bukti","Tanggal","Kode PP","Nama PP","Kode Akun","Nama Akun","Keterangan","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,200,200,80,150,60,60,100]],readOnly:true,
					colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Kode MTA", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_pagu = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,17,200,20],caption:"Nilai Pagu", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_rkm = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Kode RKM", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_sisa = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,16,200,20],caption:"Sisa Pagu", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_drk = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,15,200,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,996,210], childPage:["Data Peruntukan","Detail Usulan","Cattn Memo"]});										
		//this.cb_peruntukan = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Kode Peruntukan", multiSelection:false, maxLength:10, tag:2});
		//this.cb_lab = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Kode Lab", multiSelection:false, maxLength:10, tag:2});
		this.cb_gedung = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Gedung", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_ruang = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Ruang", multiSelection:false, maxLength:10, tag:2});
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:9,tag:0,
		            colTitle:["Uraian Barang","Spesifikasi","Vol","Sat","Harga Sat","Bulan","Total","Keterangan","Prioritas"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,150,100,50,100,60,60,200,220]],					
					columnReadOnly:[true,[6],[0,1,2,3,4,7,8]],					
					colFormat:[[2,4,5,6],[cfNilai, cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.sgctt = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-12,this.pc2.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});

		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Tahun",readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_akun2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"Kode MTA", multiSelection:false, maxLength:10, tag:9});
		this.cb_rkm2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Kode RKM", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_drk2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:9});	
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150, tag:9});	
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.doLoadCtt(this.e_nb.getText());

			this.pp=this.dbLib.getPeriodeFromSQL("select kode_pp as periode from agg_user where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ");
			this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ");
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_pp.setSQL("select a.kode_pp, a.nama from agg_pp a inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi =b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' and a.tahun='"+this.tahun+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.pp);
			//this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='074' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join log_akun_pp b on a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.pp+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_rkm.setSQL("select kode_rkm, nama from agg_rkm where jenis='CAPEX' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.tahun+"' ",["kode_rkm","nama"],false,["Kode","Nama"],"and","Data RKM",true);
			
			this.cb_pp2.setSQL("select a.kode_pp, a.nama from agg_pp a inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi =b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' and a.tahun='"+this.tahun+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			//this.cb_akun2.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='074' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_akun2.setSQL("select a.kode_akun, a.nama from masakun a inner join log_akun_pp b on a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.pp+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_rkm2.setSQL("select kode_rkm, nama from agg_rkm where jenis='CAPEX' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.tahun+"'  ",["kode_rkm","nama"],false,["Kode","Nama"],"and","Data RKM",true);

			this.c_tahun.items.clear();
			//var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_usul_m order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}		
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_usul_m order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}
			

			//this.cb_peruntukan.setSQL("select kode_peruntukan, nama from log_peruntukan where kode_lokasi='"+this.app._lokasi+"'  ",["kode_peruntukan","nama"],false,["Kode","Nama"],"and","Data Peruntukan",true);
			//this.cb_lab.setSQL("select kode_lab, nama from log_lab where kode_lokasi='"+this.app._lokasi+"' ",["kode_lab","nama"],false,["Kode","Nama"],"and","Data Lab",true);
			this.cb_gedung.setSQL("select kode_gedung, nama from log_gedung where kode_lokasi='"+this.app._lokasi+"' ",["kode_gedung","nama"],false,["Kode","Nama"],"and","Data Gedung",true);
			
			this.doLoad();
			this.bulan = ["1","2","3","4","5","6","7","8","9","10","11","12"];

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_aset_fUsulan.extend(window.childForm);
window.app_saku3_transaksi_ppbs_aset_fUsulan.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var tahun=this.c_tahun.getText();
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"','"+this.cb_akun.getText()+"','"+this.cb_rkm.getText()+"','"+this.cb_drk.getText()+"')");
					
					//"+this.cb_lab.getText()+"
					sql.add("insert into log_usul_m(no_usul,kode_lokasi,kode_peruntukan,kode_lab,kode_gedung,kode_ruang,progress,no_app1,no_app2,no_app3,no_app4,no_app5,no_app6,no_app7) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_gedung.getText()+"','"+this.cb_ruang.getText()+"','0','-','-','-','-','-','-','-')");
							
					if (this.sg.getRowValidCount() > 0){
						var periode = bulan = "";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								bulan = (nilaiToFloat(this.sg.cells(5,i)) < 10) ? "0"+this.sg.cells(5,i) : this.sg.cells(5,i);
								periode = tahun + bulan;
								sql.add("insert into log_usul_d (nu,no_usul,kode_lokasi,periode,uraian,spek,vol,sat,harga,total,keterangan,prioritas) values "+
										"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+periode+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"')");	
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var tahun=this.c_tahun.getText();
					sql.add("delete from agg_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from log_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_usul_d where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"','"+this.cb_akun.getText()+"','"+this.cb_rkm.getText()+"','"+this.cb_drk.getText()+"')");
					
					//"+this.cb_lab.getText()+"		
					sql.add("insert into log_usul_m(no_usul,kode_lokasi,kode_peruntukan,kode_lab,kode_gedung,kode_ruang,progress,no_app1,no_app2,no_app3,no_app4,no_app5,no_app6,no_app7) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_gedung.getText()+"','"+this.cb_ruang.getText()+"','0','-','-','-','-','-','-','-')");
		
					if (this.sg.getRowValidCount() > 0){
						var periode = bulan = "";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								bulan = (nilaiToFloat(this.sg.cells(5,i)) < 10) ? "0"+this.sg.cells(5,i) : this.sg.cells(5,i);
								periode = tahun + bulan;
								sql.add("insert into log_usul_d (nu,no_usul,kode_lokasi,periode,uraian,spek,vol,sat,harga,total,keterangan,prioritas) values "+
										"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+periode+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"')");	
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from agg_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from log_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_usul_d where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.doLoad();
					this.doLoadCtt("-");
				}
				break;
			case "simpan" :	
				this.sg.validasi();
				var stsErr = false;
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){			
							if (! this.bulan.includes(this.sg.cells(5,i))) {
								stsErr = true;
								var k = i+1;
								system.alert(this,"Bulan tidak valid.","Data Bulan hanya untuk 1-12. (Baris : "+k+")");
								return false;								
							}
						}
					}
				}
				if (!stsErr) this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_pp && this.cb_pp.getText() != ""){				
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a "+
									"inner join log_akun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.tahun+"' "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_pp='"+this.cb_pp.getText()+"' ",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);								
				
			}
			if (sender == this.cb_rkm && this.cb_rkm.getText() != ""){
				this.cb_drk.setSQL("select kode_drk, nama from agg_drk where kode_lokasi='"+this.app._lokasi+"' and kode_rkm='"+this.cb_rkm.getText()+"' and tahun='"+this.c_tahun.getText()+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);

			}
			if (sender == this.cb_pp2 && this.cb_pp2.getText() != ""){
				this.cb_akun2.setSQL("select a.kode_akun, a.nama from masakun a "+
									"inner join log_akun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.tahun+"' "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_pp='"+this.cb_pp2.getText()+"' ",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);				

			}
			if (sender == this.cb_rkm2 && this.cb_rkm2.getText() != ""){
				this.cb_drk2.setSQL("select kode_drk, nama from agg_drk where kode_lokasi='"+this.app._lokasi+"' and kode_rkm='"+this.cb_rkm2.getText()+"' and tahun='"+this.c_tahun2.getText()+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);

			}

			if (sender == this.cb_gedung && this.cb_gedung.getText() != ""){
				this.cb_ruang.setSQL("select kode_ruang, nama from log_ruang where kode_lokasi='"+this.app._lokasi+"' and kode_gedung='"+this.cb_gedung.getText()+"'",["kode_ruang","nama"],false,["Kode","Nama"],"and","Data Ruang",true);
			}

			if ((sender == this.cb_pp || sender == this.cb_akun) && this.cb_pp.getText() != "" && this.cb_akun.getText() != ""){
				var strSQL = "select a.n_max "+
							"from agg_pagu_log a "+							
							"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"'";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_pagu.setText(floatToNilai(line.n_max));						
					} 
				}
				
				var strSQL = "select isnull(sum(a.total),0) as usulan "+
							"from log_usul_d a inner join agg_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi "+							
							"where b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.tahun='"+this.c_tahun.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						var sisa = nilaiToFloat(this.e_pagu.getText()) - parseFloat(line.usulan);										
						this.e_sisa.setText(floatToNilai(sisa));
					} 
				}

			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		//this.c_tahun.setText(y+1);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_usul_m","no_usul",this.app._lokasi+"-LOG"+this.c_tahun.getText()+".","0000"));
			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.cb_pp2.getText() != "") var filter = filter+" and a.kode_pp = '"+this.cb_pp2.getText()+"' ";
			if (this.cb_akun2.getText() != "") var filter = filter+" and a.kode_akun = '"+this.cb_akun2.getText()+"' ";
			if (this.cb_rkm2.getText() != "") var filter = filter+" and a.kode_rkm = '"+this.cb_rkm2.getText()+"' ";
			if (this.cb_drk2.getText() != "") var filter = filter+" and a.kode_drk = '"+this.cb_drk2.getText()+"' ";
			if (this.e_ket2.getText() != "") var filter = filter+" and a.keterangan like '%"+this.cb_drk2.getText()+"%' ";
			if (this.c_tahun2.getText() != "") var filter = filter+" and a.tahun = '"+this.c_tahun2.getText()+"' ";

			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,isnull(d.nilai,0) as nilai "+
		             "from agg_usul_m a "+
					 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
					 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "inner join log_usul_m e on a.no_usul=e.no_usul and a.kode_lokasi=e.kode_lokasi "+
					 "left join (select no_usul,kode_lokasi,sum(total) as nilai from log_usul_d where kode_lokasi='"+this.app._lokasi+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and e.progress='0' order by a.no_usul ";	

			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.doLoadCtt(this.e_nb.getText());
														
				var data = this.dbLib.getDataProvider(
								"select a.tanggal,a.tahun,a.keterangan,a.nik_app,a.kode_pp,a.kode_akun,a.kode_drk,a.kode_rkm, b.kode_peruntukan,b.kode_lab,b.kode_gedung,b.kode_ruang "+
								"from agg_usul_m a inner join log_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_usul='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.cb_rkm.setText(line.kode_rkm);
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.keterangan);
						this.cb_pp.setText(line.kode_pp);
						this.cb_akun.setText(line.kode_akun);
						this.cb_app.setText(line.nik_app);
						this.cb_drk.setText(line.kode_drk);

						//this.cb_peruntukan.setText(line.kode_peruntukan);
						//this.cb_lab.setText(line.kode_lab);
						this.cb_gedung.setText(line.kode_gedung);
						this.cb_ruang.setText(line.kode_ruang);
					
					} 
				}			
				var strSQL = "select *,substring(periode,5,2) as bulan from log_usul_d where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.uraian,line.spek,floatToNilai(line.vol),line.sat,floatToNilai(line.harga),floatToNilai(line.bulan),floatToNilai(line.total),line.keterangan,line.prioritas]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){	
		var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,isnull(d.nilai,0) as nilai "+
		             "from agg_usul_m a "+
					 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
					 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "inner join log_usul_m e on a.no_usul=e.no_usul and a.kode_lokasi=e.kode_lokasi "+
					 "left join (select no_usul,kode_lokasi,sum(total) as nilai from log_usul_d where kode_lokasi='"+this.app._lokasi+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.tahun+"' and a.kode_pp='"+this.pp+"' and e.progress in ('K','L','F','Y','S') order by a.no_usul ";		
		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_usul,line.tgl,line.kode_pp,line.nama_pp,line.kode_akun,line.nama_akun,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doNilaiChange: function(){
		try{
			var tot=0;
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
	doChangeCell: function(sender, col, row){		

		if (col == 2 || col == 4) {
			if (sender.cells(2,row) != "" && sender.cells(4,row) != "") {
				var tot = nilaiToFloat(sender.cells(2,row)) * nilaiToFloat(sender.cells(4,row));
				sender.cells(6,row,floatToNilai(tot));
			}
			sender.validasi();
		}	
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from log_usul_app "+
						 "where no_usul='"+kode+"' and kode_lokasi='"+this.app._lokasi+"'  "+
						"order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select keterangan as catatan,no_app, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from log_usul_app "+
								  "where no_usul='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"'  "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}					
	}
});