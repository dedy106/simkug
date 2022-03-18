window.app_saku3_transaksi_siaga_hris_adm_fApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fApp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Adm Personalia: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker");
		uses("saiGrid",true);

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Approval","List Approval"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		              	colTitle:["No. Approve","Tanggal","Keterangan","NIK Approve","Jenis"],
					  	colWidth:[[4,3,2,1,0],[100,100,420,120,100]],	
					  	readOnly:true,
						dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,202,20],caption:"No Approve",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2,readOnly:true});
		this.c_modul = new saiCB(this.pc1.childPage[0],{bound:[10,10,200,20],caption:"Jenis",items:["ABSEN","LEMBUR","CUTI","SPPD","SURAT","IJIN"], tag:2,readOnly:true,change:[this,"doChange"] });
		this.bTampil = new button(this.pc1.childPage[0],{bound:[380,10,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});			
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,21,995,325], childPage:["Data Approval"]});	
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:9,tag:9,
				colTitle:["Status","Catatan","No Absen","Tanggal","Keterangan","Jabatan","NIK","Nama Karyawan","Status Absen"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[220,200,60,200,200,70,120,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7,8],[1]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:10,tag:9,
				colTitle:["Status","Catatan","No Lembur","Tanggal","Jabatan","Karyawan","Tugas","Dilaporkan Kepada","Jam","PerHtng Jam Kerja"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,200,200,220,220,70,120,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7,8,9],[1]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});

		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:9,
				colTitle:["Status","Catatan","No Cuti","Tanggal","Jabatan","Karyawan","Status Cuti","Alasan Cuti","Alamat Cuti","Tgl Mulai","Tgl Selesai","Lama","Sisa Cuti"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[50,50,80,80,200,200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7,8,9,10,11,12],[1]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});
		
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:10,tag:9,
				colTitle:["Status","Catatan","No SPPD","Tanggal","Jabatan","NIK","Nama","Keterangan","Nilai Transport","Uang Harian"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,200,200,70,200,70,120,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7,8,9],[1]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				colFormat:[[9,8],[cfNilai,cfNilai]],
				buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});

		this.sg5 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
				colTitle:["Status","Catatan","No Surat","Tanggal","Jabatan","Karyawan","Untuk Keperluan","Ditujukan Kepada"],
				colWidth:[[7,6,5,4,3,2,1,0],[200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7],[1]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg5});
		
		this.sg6 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
				colTitle:["Status","Catatan","No Surat","Tanggal","Jabatan","Karyawan","Approved","Keterangan"],
				colWidth:[[7,6,5,4,3,2,1,0],[200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7],[1]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn6 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg6});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
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

			this.cb_app.setSQL("select a.nik, a.nama from gr_karyawan a "+
							"inner join gr_otorisasi b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and b.sts_oto='APP' ",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_app.setText(this.app._userLog);

			this.c_modul.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fApp.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fApp.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						if (this.c_modul.getText() == "ABSEN" && this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){														
									sql.add("update gr_absen set progress='1' where no_absen='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
								}
							}
						}				
						if (this.c_modul.getText() == "LEMBUR" && this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){									
									sql.add("update gr_lembur set progress='1' where no_lembur='"+this.sg2.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
								}
							}
						}				
						if (this.c_modul.getText() == "CUTI" && this.sg3.getRowValidCount() > 0){
							for (var i=0;i < this.sg3.getRowCount();i++){
								if (this.sg3.rowValid(i)){														
									sql.add("update gr_cuti set progress='1' where no_cuti='"+this.sg3.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
								}
							}
						}				
						if (this.c_modul.getText() == "SPPD" && this.sg4.getRowValidCount() > 0){
							for (var i=0;i < this.sg4.getRowCount();i++){
								if (this.sg4.rowValid(i)){							
									sql.add("update gr_spj_m set progress='1' where no_spj='"+this.sg4.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
						if (this.c_modul.getText() == "SURAT" && this.sg5.getRowValidCount() > 0){					
							for (var i=0;i < this.sg5.getRowCount();i++){
								if (this.sg5.rowValid(i)){														
									sql.add("update gr_surat set progress='1' where no_surat='"+this.sg5.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
								}
							}
						}
						if (this.c_modul.getText() == "IJIN" && this.sg6.getRowValidCount() > 0){
							for (var i=0;i < this.sg6.getRowCount();i++){
								if (this.sg6.rowValid(i)){														
									sql.add("update gr_ijin_m set progress='1' where no_ijin='"+this.sg6.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
								}
							}
						}
						sql.add("delete from gr_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from gr_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");	
					}

					
					sql.add("insert into gr_app_m(no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat,nik_app) values "+												  
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','2','"+this.c_modul.getText()+"','APPHRIS','X','"+this.e_ket.getText()+"','X','X','X','"+this.cb_app.getText()+"')");
					
					if (this.c_modul.getText() == "ABSEN" && this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_app_d(no_app,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','-')");									
									sql.add("update gr_absen set progress='"+vProgress+"' where no_absen='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("update gr_absen_harian_d set no_bukti='"+this.e_nb.getText()+"' where modul='ABSEN' and no_load='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
					}				
					if (this.c_modul.getText() == "LEMBUR" && this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (this.sg2.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg2.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_app_d(no_app,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-')");
									sql.add("update gr_lembur set progress='"+vProgress+"' where no_lembur='"+this.sg2.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
					}				
					if (this.c_modul.getText() == "CUTI" && this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								if (this.sg3.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg3.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_app_d(no_app,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"','"+this.sg3.cells(2,i)+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(1,i)+"','-')");
									sql.add("update gr_cuti set progress='"+vProgress+"' where no_cuti='"+this.sg3.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("update gr_absen_harian_d set no_bukti='"+this.e_nb.getText()+"' where modul='CUTI' and no_load='"+this.sg3.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
					}				
					if (this.c_modul.getText() == "SPPD" && this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								if (this.sg4.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg4.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_app_d(no_app,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"','-')");
									sql.add("update gr_spj_m set progress='"+vProgress+"' where no_spj='"+this.sg4.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("update gr_absen_harian_d set no_bukti='"+this.e_nb.getText()+"' where modul='SPJ' and no_load='"+this.sg4.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
					}
					if (this.c_modul.getText() == "SURAT" && this.sg5.getRowValidCount() > 0){
						for (var i=0;i < this.sg5.getRowCount();i++){
							if (this.sg5.rowValid(i)){
								if (this.sg5.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg5.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_app_d(no_app,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"','"+this.sg5.cells(2,i)+"','"+this.sg5.cells(0,i)+"','"+this.sg5.cells(1,i)+"','-')");
									sql.add("update gr_surat set progress='"+vProgress+"' where no_surat='"+this.sg5.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
					}
					if (this.c_modul.getText() == "IJIN" && this.sg6.getRowValidCount() > 0){
						for (var i=0;i < this.sg6.getRowCount();i++){
							if (this.sg6.rowValid(i)){
								if (this.sg6.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg6.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_app_d(no_app,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"','"+this.sg6.cells(2,i)+"','"+this.sg6.cells(0,i)+"','"+this.sg6.cells(1,i)+"','-')");
									sql.add("update gr_ijin_m set progress='"+vProgress+"' where no_ijin='"+this.sg6.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("update gr_absen_harian_d set no_bukti='"+this.e_nb.getText()+"' where modul='SPJ' and no_load='"+this.sg6.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
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
					this.sg.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					this.sg4.clear(1);
					this.sg5.clear(1);
					this.sg6.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.bTampil.show();
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				var jml = 0;
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (this.sg.cells(0,i).toUpperCase() == "APP") {
							jml = jml+1;
						}
					}
				}
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){
						if (this.sg2.cells(0,i).toUpperCase() == "APP") {
							jml = jml+1;
						}
					}
				}
				for (var i=0;i < this.sg3.getRowCount();i++){
					if (this.sg3.rowValid(i)){
						if (this.sg3.cells(0,i).toUpperCase() == "APP") {
							jml = jml+1;
						}
					}
				}
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						if (this.sg4.cells(0,i).toUpperCase() == "APP") {
							jml = jml+1;
						}
					}
				}
				for (var i=0;i < this.sg5.getRowCount();i++){
					if (this.sg5.rowValid(i)){
						if (this.sg5.cells(0,i).toUpperCase() == "APP") {
							jml = jml+1;
						}
					}
				}
				for (var i=0;i < this.sg6.getRowCount();i++){
					if (this.sg6.rowValid(i)){
						if (this.sg6.cells(0,i).toUpperCase() == "APP") {
							jml = jml+1;
						}
					}
				}				
				if (jml > 1) {
					system.alert(this,"Transaksi tidak valid.","Status APP hanya diperbolehkan untuk satu transaksi.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();										
				break;				
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				if (this.c_modul.getText() == "ABSEN" && this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){														
							sql.add("update gr_absen set progress='1' where no_absen='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}				
				if (this.c_modul.getText() == "LEMBUR" && this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){									
							sql.add("update gr_lembur set progress='1' where no_lembur='"+this.sg2.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}				
				if (this.c_modul.getText() == "CUTI" && this.sg3.getRowValidCount() > 0){
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)){														
							sql.add("update gr_cuti set progress='1' where no_cuti='"+this.sg3.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}				
				if (this.c_modul.getText() == "SPPD" && this.sg4.getRowValidCount() > 0){
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)){							
							sql.add("update gr_spj_m set progress='1' where no_spj='"+this.sg4.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
				}
				if (this.c_modul.getText() == "SURAT" && this.sg5.getRowValidCount() > 0){					
					for (var i=0;i < this.sg5.getRowCount();i++){
						if (this.sg5.rowValid(i)){														
							sql.add("update gr_surat set progress='1' where no_surat='"+this.sg5.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}
				if (this.c_modul.getText() == "IJIN" && this.sg6.getRowValidCount() > 0){
					for (var i=0;i < this.sg6.getRowCount();i++){
						if (this.sg6.rowValid(i)){														
							sql.add("update gr_ijin_m set progress='1' where no_ijin='"+this.sg6.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}
				sql.add("delete from gr_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
				sql.add("delete from gr_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");				
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
				break;									
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doChange:function(sender){
		if (sender == this.c_modul) {
			this.sg.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.sg4.clear(1);
			this.sg5.clear(1);
			this.sg6.clear(1);
			if (this.c_modul.getText() == "ABSEN") {
				this.sg.setTag("1");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.sg.setVisible(true);
				this.sg2.setVisible(false);
				this.sg3.setVisible(false);
				this.sg4.setVisible(false);
				this.sg5.setVisible(false);
				this.sg6.setVisible(false);
			}
			if (this.c_modul.getText() == "LEMBUR") {
				this.sg.setTag("9");
				this.sg2.setTag("1");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.sg.setVisible(false);
				this.sg2.setVisible(true);
				this.sg3.setVisible(false);
				this.sg4.setVisible(false);
				this.sg5.setVisible(false);
				this.sg6.setVisible(false);
			}
			if (this.c_modul.getText() == "CUTI") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("1");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.sg.setVisible(false);
				this.sg2.setVisible(false);
				this.sg3.setVisible(true);
				this.sg4.setVisible(false);
				this.sg5.setVisible(false);
				this.sg6.setVisible(false);
			}
			if (this.c_modul.getText() == "SPPD") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("1");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.sg.setVisible(false);
				this.sg2.setVisible(false);
				this.sg3.setVisible(false);
				this.sg4.setVisible(true);
				this.sg5.setVisible(false);
				this.sg6.setVisible(false);
			}
			if (this.c_modul.getText() == "SURAT") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("1");
				this.sg6.setTag("9");
				this.sg.setVisible(false);
				this.sg2.setVisible(false);
				this.sg3.setVisible(false);
				this.sg4.setVisible(false);
				this.sg5.setVisible(true);
				this.sg6.setVisible(false);
			}
			if (this.c_modul.getText() == "IJIN") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("1");
				this.sg.setVisible(false);
				this.sg2.setVisible(false);
				this.sg3.setVisible(false);
				this.sg4.setVisible(false);
				this.sg5.setVisible(false);
				this.sg6.setVisible(true);
			}			
		}
		if (sender == this.e_nb && this.e_nb.getText() != "" && this.stsSimpan==0) {
			this.e_ket.setFocus();
			this.sg.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.sg4.clear(1);
			this.sg5.clear(1);						
			this.sg6.clear(1);						
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.periode,a.nik_app,b.nama as nama_app,a.catatan,a.modul from gr_app_m a "+
					   "       inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_app='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);
					this.e_periode.setText(line.periode);
					this.e_ket.setText(line.catatan);					
					this.c_modul.setText(line.modul);					
					this.cb_app.setText(line.nik_app,line.nama_app);

					this.doTampilClick();
				} 
			}
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.bTampil.hide();
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_app,convert(varchar,a.tanggal,103) as tanggal,a.catatan,a.nik_app,a.modul "+
					 "from gr_app_m a "+
					 "where a.modul in ('ABSEN','LEMBUR','CUTI','SPPD','SURAT','IJIN') and "+
					 "	    a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' order by a.no_app desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_app,line.tanggal,line.catatan,line.nik_app,line.modul]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilClick:function(sender){
		if(this.stsSimpan == 1){
			if (this.c_modul.getText() == "ABSEN") {
				if (this.e_periode.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_absen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_loker+' - '+b.nama as loker,a.nik_buat,c.nama as karyawan,a.sts_absen+' - '+d.nama as absen "+
						"from gr_absen a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                inner join gr_status_absen d on a.sts_absen=d.sts_absen and a.kode_lokasi=d.kode_lokasi "+					
						"where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];														
							this.sg.appendData(["INPROG","-",line.no_absen,line.tanggal,line.keterangan,line.loker,line.nik_buat,line.karyawan,line.absen]);
						}
					} else this.sg.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "LEMBUR") {
				if (this.e_periode.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_lembur,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.tugas,a.keterangan,a.jam,a.jam_kerja "+
						"from gr_lembur a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg2.appendData(["INPROG","-",line.no_lembur,line.tanggal,line.loker,line.karyawan,line.tugas,line.keterangan,line.jam,line.jam_kerja]);
						}
					} else this.sg2.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "CUTI") {
				if (this.e_periode.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_cuti,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.sts_cuti+' - '+d.nama as cuti,a.alasan,a.alamat,convert(varchar,a.tgl_mulai,103) as mulai,convert(varchar,a.tgl_selesai,103) as selesai,a.lama+a.lama_lalu as lama,(a.sisa+a.sisa_lalu)-(a.lama+a.lama_lalu) as sisa "+
						"from gr_cuti a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"               inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"               left join gr_status_cuti d on a.sts_cuti=d.sts_cuti and a.kode_lokasi=d.kode_lokasi "+
						"where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg3.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg3.appendData(["INPROG","-",line.no_cuti,line.tanggal,line.loker,line.karyawan,line.cuti,line.alasan,line.alamat,line.mulai,line.selesai,floatToNilai(line.lama),floatToNilai(line.sisa)]);
						}
					} else this.sg3.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "SPPD") {
				if (this.e_periode.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_spj,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat,c.nama,a.keterangan,a.transport,a.harian  "+
						"from gr_spj_m a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                left join gr_status_spj d on a.sts_spj=d.sts_spj and a.kode_lokasi=d.kode_lokasi "+
						"where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg4.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg4.appendData(["INPROG","-",line.no_spj,line.tanggal,line.loker,line.nik_buat,line.nama,line.keterangan,floatToNilai(line.transport),floatToNilai(line.harian)]);
						}
					} else this.sg4.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "SURAT") {
				if (this.e_periode.getText() != "" && this.cb_app.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_surat,convert(varchar,a.tanggal,103) as tanggal,a.kode_dept+' - '+b.nama as dept,a.nik_buat+' - '+c.nama as karyawan,a.nik_app+' - '+d.nama as app,a.keterangan,a.kepada "+
						"from gr_surat a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
						"where  a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg5.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg5.appendData(["INPROG","-",line.no_surat,line.tanggal,line.dept,line.karyawan,line.keterangan,line.kepada]);
						}
					} else this.sg5.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Nik Approve,Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "IJIN") {
				if (this.e_periode.getText() != "" && this.cb_app.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_ijin,convert(varchar,a.tanggal,103) as tanggal,a.kode_dept+' - '+b.nama as dept,a.nik_buat+' - '+c.nama as karyawan,a.nik_app+' - '+d.nama as app,a.keterangan "+
						"from gr_ijin_m a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
						"                 inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                 inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
						"where  a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg6.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg6.appendData(["INPROG","-",line.no_ijin,line.tanggal,line.dept,line.karyawan,line.app,line.keterangan]);
						}
					} else this.sg6.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Nik Approve,Jenis dan Periode harus diisi.");
				}
			}		
		} 
		else {
			if (this.c_modul.getText() == "ABSEN") {
				if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_absen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.sts_absen+' - '+d.nama as absen,a.nik_buat as nik,f.status,f.catatan "+
						"from gr_absen a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                inner join gr_status_absen d on a.sts_absen=d.sts_absen and a.kode_lokasi=d.kode_lokasi "+					
						"				 inner join gr_app_d f on f.no_bukti=a.no_absen and a.kode_lokasi=f.kode_lokasi "+
						"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.status,line.catatan,line.no_absen,line.tanggal,line.keterangan,line.loker,line.nik,line.karyawan,line.absen]);
						}
					} else this.sg.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "LEMBUR") {
				if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_lembur,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.tugas,a.keterangan,a.jam,a.jam_kerja,f.status,f.catatan "+
						"from gr_lembur a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"				 inner join gr_app_d f on f.no_bukti=a.no_lembur and a.kode_lokasi=f.kode_lokasi "+
						"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg2.appendData([line.status,line.catatan,line.no_lembur,line.tanggal,line.loker,line.karyawan,line.tugas,line.keterangan,line.jam,line.jam_kerja]);
						}
					} else this.sg2.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "CUTI") {
				if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_cuti,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.sts_cuti+' - '+d.nama as cuti,a.alasan,a.alamat,convert(varchar,a.tgl_mulai,103) as mulai,convert(varchar,a.tgl_selesai,103) as selesai,f.status,f.catatan, a.lama+a.lama_lalu as lama,(a.sisa+a.sisa_lalu)-(a.lama+a.lama_lalu) as sisa "+
						"from gr_cuti a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"               inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"               inner join gr_status_cuti d on a.sts_cuti=d.sts_cuti and a.kode_lokasi=d.kode_lokasi "+
						"				inner join gr_app_d f on f.no_bukti=a.no_cuti and a.kode_lokasi=f.kode_lokasi "+
						"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg3.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];			
							this.sg3.appendData([line.status,line.catatan,line.no_cuti,line.tanggal,line.loker,line.karyawan,line.cuti,line.alasan,line.alamat,line.mulai,line.selesai,floatToNilai(line.lama),floatToNilai(line.sisa)]);
						}
					} else this.sg3.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "SPPD") {
				if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_spj,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,'-' as spj,a.keterangan,a.transport,a.harian,f.status,f.catatan  "+
						"from gr_spj_m a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"				 inner join gr_app_d f on f.no_bukti=a.no_spj and a.kode_lokasi=f.kode_lokasi "+
						"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg4.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg4.appendData([line.status,line.catatan,line.no_spj,line.tanggal,line.loker,line.karyawan,line.spj,line.keterangan,floatToNilai(line.transport),floatToNilai(line.harian)]);
						}
					} else this.sg4.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "SURAT") {
				if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_surat,convert(varchar,a.tanggal,103) as tanggal,a.kode_dept+' - '+b.nama as dept,a.nik_buat+' - '+c.nama as karyawan,a.nik_app+' - '+d.nama as app,a.keterangan,f.status,f.catatan "+
						"from gr_surat a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
						"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
						"				 inner join gr_app_d f on f.no_bukti=a.no_surat and a.kode_lokasi=f.kode_lokasi "+
						"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg5.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg5.appendData([line.status,line.catatan,line.no_surat,line.tanggal,line.dept,line.karyawan,line.keterangan,line.app]);
						}
					} else this.sg5.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Nik Approve,Jenis dan Periode harus diisi.");
				}
			}
			if (this.c_modul.getText() == "IJIN") {
				if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_ijin,convert(varchar,a.tanggal,103) as tanggal,a.kode_dept+' - '+b.nama as dept,a.nik_buat+' - '+c.nama as karyawan,a.nik_app+' - '+d.nama as app,a.keterangan,f.status,f.catatan "+
						"from gr_ijin_m a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
						"                 inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"                 inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
						"				  inner join gr_app_d f on f.no_bukti=a.no_ijin and a.kode_lokasi=f.kode_lokasi "+
						"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg6.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg6.appendData([line.status,line.catatan,line.no_ijin,line.tanggal,line.dept,line.karyawan,line.app,line.keterangan]);
						}
					} else this.sg6.clear(1);
				}
				else {
					system.alert(this,"Data tidak valid.","Nik Approve,Jenis dan Periode harus diisi.");
				}
			}
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.bTampil.show();
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});