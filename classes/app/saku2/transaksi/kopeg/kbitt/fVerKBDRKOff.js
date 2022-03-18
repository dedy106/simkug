window.app_saku2_transaksi_kopeg_kbitt_fVerKBDRKOff = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fVerKBDRKOff.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fVerKBDRKOff";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pengajuan DRK : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,460], childPage:["Data Pengajuan","Detail Pengajuan","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:0,
		            colTitle:["No Agenda","Tanggal","Modul","Bagian / Unit","Akun","DRK","Uraian","Nominal","Tgl Input","User","Status"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[70,150,60,80,200,60,150,150,60,60,80]],
					readOnly:true,colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.cb_jstatus = new saiCBBL(this.pc1.childPage[1],{bound:[230,10,220,20],caption:"Jenis Status", multiSelection:false});
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Agenda", readOnly:true});						
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Modul", readOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Akun", readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Bagian/Unit", readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_drk = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"DRK", readOnly:true});												
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Tanggal", readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Tgl Input", readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"User Input", readOnly:true});								
		this.e_nikpj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"NIK Panjar", readOnly:true, tag:9});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_npajak = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Nilai Pajak", tag:1, readOnly:true, tipeText:ttNilai, text:"0", tag:9});		
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,200,20],caption:"Nilai Panjar (Ptg)", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,60],caption:"Catatan",tag:9,readOnly:true});
		// this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:9});		
		// this.bLihat = new button(this.pc1.childPage[1],{bound:[480,15,80,18],caption:"Lihat File",click:[this,"doLihat"]});			
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,42,996,200], childPage:["Rekening","File Dok"]});    
		this.sgRek = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-10],colCount:10,tag:0,
				colTitle:["Kd Mitra","Bruto","Pot. Pajak","Netto","Berita/Penerima","Nama Rek","Bank","No Rekening","Kode Pajak","NPWP"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,150,150,150,150,80,80,80,60]],
				columnReadOnly:[true,[0,3,8,9],[1,2,4,5,6,7]],				
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCellRek"],
				defaultRow:1,autoAppend:false});
		
		this.sgUpld = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-10],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Nama File","DownLoad","Jenis"],
				colWidth:[[4,3,2,1,0],[50,80,300,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3],[cfButton]], 					
				click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]],
				readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No Agenda",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});		
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status Approval",items:["-","AJU","REVISI"], readOnly:true,tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[230,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_jstatus.setSQL("select kode_jenis, nama from jenis_app where kode_Lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"where","Daftar Jenis App",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fVerKBDRKOff.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fVerKBDRKOff.implement({
	// doLihat: function(sender){
	// 	try{
	// 		if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
	// 	}catch(e){
	// 		alert(e);
	// 	}
	// },

	doSgBtnClick: function(sender, col, row){
		try{
			// if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
			if (col === 3) {
				if(this.sgUpld.getCell(4,row) == "1"){
					window.open(this.sgUpld.getCell(2,row));
				}else{
					window.open("server/media/"+this.sgUpld.getCell(2,row));
				}
			}
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VKA"+this.e_periode.getText().substr(2,4)+".","00000"));		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "D";
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_noaju.getText()+"' and b.modul='ITKBAJU' and b.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("update it_aju_m set nilai="+nilaiToFloat(this.e_total.getText())+",progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb,kode_jenis) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','ITKBAJU','-','"+this.cb_jstatus.getText()+"')");
					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan,no_app) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','ITKBAJU','"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"','"+this.noAppAju+"')");					
					
					
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					for (var i=0;i < this.sgRek.getRowCount();i++){
						if (this.sgRek.rowValid(i)){
							/*
							if (this.sgRek.cells(0,i) != "-") {								
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita,kode_pajak,npwp) values "+
										"('"+this.e_noaju.getText()+"','"+this.app._lokasi+"','-','-','-','-',"+nilaiToFloat(this.sgRek.cells(3,i))+",'"+this.sgRek.cells(0,i)+"',"+nilaiToFloat(this.sgRek.cells(2,i))+",'"+this.sgRek.cells(4,i)+"','"+this.sgRek.cells(8,i)+"','"+this.sgRek.cells(9,i)+"')");
							}
							else {								
							*/
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita,kode_pajak,npwp) values "+
										"('"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.sgRek.cells(6,i)+"','"+this.sgRek.cells(7,i)+"','"+this.sgRek.cells(5,i)+"','-',"+nilaiToFloat(this.sgRek.cells(3,i))+",'"+this.sgRek.cells(0,i)+"',"+nilaiToFloat(this.sgRek.cells(2,i))+",'"+this.sgRek.cells(4,i)+"','"+this.sgRek.cells(8,i)+"','"+this.sgRek.cells(9,i)+"')");
							//}
						}
					}
					/*
					sql.add("update a set a.bank=b.bank,a.no_rek=b.no_rek,a.nama_rek=b.nama_rek,a.bank_trans=b.cabang "+
					        "from it_aju_rek a inner join it_dosen b on a.keterangan=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg.clear(1); 
					this.doClick();
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("APPROVE");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				if (this.e_memo.getText() == "") {
					system.alert(this,"Transaksi tidak valid.","Catatan tidak boleh kosong.");
					return false;
				}			
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VKA"+this.e_periode.getText().substr(2,4)+".","00000"));		
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);						
				this.e_noaju.setText(this.sg.cells(0,row));			
				this.e_modul.setText(this.sg.cells(2,row));			
				this.e_akun.setText(this.sg.cells(4,row));			
				this.e_pp.setText(this.sg.cells(3,row));			
				this.e_ket.setText(this.sg.cells(6,row));			
				this.e_drk.setText(this.sg.cells(5,row));			
				this.e_tgl.setText(this.sg.cells(1,row));			
				this.e_tglinput.setText(this.sg.cells(8,row));			
				this.e_user.setText(this.sg.cells(9,row));						
				this.e_total.setText(this.sg.cells(7,row));									
				this.e_memo.setText("-");

				var data = this.dbLib.getDataProvider("select npajak,no_app from it_aju_m where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.e_npajak.setText(floatToNilai(line.npajak));
						this.noAppAju = line.no_app;
					}
				}
				
				// var data = this.dbLib.getDataProvider("select no_gambar from it_aju_dok where no_bukti='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				// if (typeof data == "object"){
				// 	var line = data.rs.rows[0];							
				// 	if (line != undefined){										
				// 		this.e_file.setText(line.no_gambar);
				// 	}
				// }

				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(							 
							 "select a.kode_jenis,a.nama,b.no_gambar,b.jenis "+
							 "from dok_jenis a left join it_aju_dok b on a.kode_jenis='DOK' and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noaju.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and b.no_gambar is not null ",true);							 							 
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad",line.jenis]);						
					}
				} else this.sgUpld.clear(1);

								
				if (this.sg.cells(10,row) == "REVISI") this.e_total.setReadOnly(false); else this.e_total.setReadOnly(true);				
				if (this.e_modul.getText() == "PANJAR") {
					var strSQL = "select a.kode_drk+' - '+isnull(b.nama,'-') as drk "+						 
								 "from angg_r a left join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi "+						
								 "where a.no_bukti='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_drk.setText(line.drk);													
						} 
					}
				}
				/* 2019
				if (this.e_modul.getText() == "PJPTG") {
					var strSQL = "select a.nik_panjar+' - '+isnull(e.nama,'-') as nik_panjar "+						 
								 "from it_aju_m a left join karyawan e on a.nik_panjar=e.nik and a.kode_lokasi=e.kode_lokasi "+						
								 "				  left join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_nikpj.setText(line.nik_panjar);													
						} 
					}
					var data = this.dbLib.getDataProvider("select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj "+
			           "from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
					   "where b.no_ptg='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_nilaipj.setText(floatToNilai(line.nilai_pj));						
						} 
					}					
				}
				*/
				
				if (this.e_modul.getText() == "PJPTG") {
					var strSQL = "select a.nik_panjar+' - '+isnull(e.nama,'-') as nik_panjar "+						 
								 "from it_aju_m a left join karyawan e on a.nik_panjar=e.nik and a.kode_lokasi=e.kode_lokasi "+						
								 "				  left join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_nikpj.setText(line.nik_panjar);													
						} 
					}

					//jika close ambil nilai panjar, jika open ambil nilaiptg sbg npanjar
					var data = this.dbLib.getDataProvider(
						"select case when b.status_if='OPEN' then b.nilai else a.nilai-isnull(e.totptg,0) end as nilai_pj "+
			            "from it_aju_m a "+
						"inner join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
						
						"left join ("+
						"	select no_ptg as no_pj,kode_lokasi,sum(nilai+npajak) as totptg "+
						"	from it_aju_m where form='NTF21' and kode_lokasi='"+this.app._lokasi+"' and no_aju <>'"+this.e_noaju.getText()+"' "+
						"	group by	no_ptg,kode_lokasi "+
						")e on b.no_ptg=e.no_pj and b.kode_lokasi=e.kode_lokasi  "+	

					    "where b.no_aju='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);

					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_nilaipj.setText(floatToNilai(line.nilai_pj));						
						} 
					}					
				}

				var strSQL = "select isnull(b.kode_dosen,'-') as kode_dosen,a.nilai+isnull(a.pajak,0) as bruto,a.pajak,a.nilai,case when c.form <> 'NONPEG' then '"+this.e_ket.getText()+"' else a.berita end as berita,"+ //7-5-18 rudi....a.berita							
							 " a.bank as bank, a.no_rek as rek, a.nama_rek as nama, "+
							
							 // "isnull(b.nama,a.nama_rek) as nama, "+
							 //"case when isnull(b.kode_dosen,'-')='-' then a.bank else isnull(b.bank+' - '+b.cabang,a.bank) end as bank, "+
							 //"isnull(b.no_rek,a.no_rek) as rek, "+

							 "isnull(a.kode_pajak,'-') as kode_pajak,a.npwp "+
							 "from it_aju_rek a inner join it_aju_m c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi "+
							 "left join it_dosen b on a.keterangan=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";	
							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgRek.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sgRek.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.berita,line.nama,line.bank,line.rek,line.kode_pajak,line.npwp]);
					}
					this.sgRek.validasi();
				} else this.sgRek.clear(1);											
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){				
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user, case progress when '0' then 'AJU' when 'D' then 'REVISI' end as status "+
		             "from it_aju_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+		
                     "inner join it_ajuapp_m e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi and a.no_app=e.no_app "+		
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','F') and a.kode_lokasi='"+this.app._lokasi+"' and e.jenis='OFFLINE' ";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doCari:function(sender){				
		var filter = "";
		if (this.c_status2.getText()=="-") {
			if (this.e_nobukti.getText()!="") filter = " where a.progress in ('0','D') and a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " where a.progress in ('0','D') and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"'";		
		}
		else {
			if (this.c_status2.getText()=="APPROVE") filter = " where a.progress = '0' and a.kode_lokasi='"+this.app._lokasi+"'";
			else filter = " where a.progress = 'D' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user, case progress when '0' then 'AJU' when 'D' then 'REVISI' end as status "+
					 "from it_aju_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+		"inner join it_ajuapp_m e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi and a.no_app=e.no_app "+				 					 
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+filter+" and e.jenis='OFFLINE' ";					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_aju,line.tanggal,line.modul,line.pp,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.status.toUpperCase()]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}						
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCellRek: function(sender, col, row){
		if (col == 1 || col == 2) {			
			if (this.sgRek.cells(1,row) != "" && this.sgRek.cells(2,row) != "") {
				var neto = nilaiToFloat(this.sgRek.cells(1,row)) - nilaiToFloat(this.sgRek.cells(2,row));
				this.sgRek.cells(3,row,floatToNilai(neto));				
			}
		}		
	}
});