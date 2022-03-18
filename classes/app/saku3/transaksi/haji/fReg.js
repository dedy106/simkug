window.app_saku3_transaksi_haji_fReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_haji_fReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_haji_fReg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Registrasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image");
		uses("saiGrid",true);				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Registrasi","Data Registrasi","Biaya Tambahan","Data Quota","Filter"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:16,tag:9,
		            colTitle:["No Reg","Tanggal","No Peserta","Jadwal","ID Peserta","Nama","Nama Ayah","Nama Ibu","Tmp Lahir","Tgl Lahir","Sex","Gol Darah","Alamat","No HP","No Telpon","Kelas - Produk"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[200,80,80,300,80,60,70,100,150,150,200,80,200,80,80,100]],
					readOnly:true, 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"No Registrasi",readOnly:true,maxLength:10,change:[this,"doChange"]});		
		this.e_antri = new saiLabelEdit(this.pc1.childPage[1],{bound:[300,10,220,20],caption:"Antrian Ke-",tag:1, tipeText:ttNilai, text:"0",readOnly:true});							
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[245,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.cb_jadwal = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,240,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Tanggal",tag:1, readOnly:true});					
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[300,13,220,20],caption:"Due Date (Hari)",tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_kelas = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,500,20],caption:"Kelas - Produk",tag:1, readOnly:true});			
		this.e_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Currency",tag:1, readOnly:true});		
		this.e_lama = new saiLabelEdit(this.pc1.childPage[1],{bound:[300,19,220,20],caption:"Lama Hari",tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_harga = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Harga",tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[300,20,220,20],caption:"Diskon",tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_neto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,220,20],caption:"Netto",tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_tambah = new saiLabelEdit(this.pc1.childPage[1],{bound:[300,21,220,20],caption:"Biaya Tambahan",tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.cb_peserta = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,240,20],caption:"Peserta", multiSelection:false, maxLength:10, tag:1, rightLabelVisible:false, change:[this,"doChange"]});				
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Nama", tag:1, readOnly:true});							
		this.e_umur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"Umur",tag:1, readOnly:true,});							
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[280,18,240,20],labelWidth:80, caption:"Email", readOnly:true, tag:1});					
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Alamat",tag:1, readOnly:true});					
		this.e_mitra = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Mitra", tag:1, readOnly:true});					
		this.e_id = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"ID Peserta",  tag:1, readOnly:true});					
		this.e_ayah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"Ayah",  tag:1, readOnly:true});					
		this.e_ibu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Ibu", tag:1, readOnly:true});							
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,230,20],caption:"Tempat Lahir", tag:1, readOnly:true});					
		this.e_tgllahir = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,18,200,20],caption:"Tgl Lahir", tag:1, readOnly:true});									
		this.e_jk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,230,20],caption:"Sex", tag:1, readOnly:true});					
		this.e_goldar = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,15,200,20],caption:"Gol Darah", tag:1, readOnly:true});									
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,230,20],caption:"No HP", readOnly:true, tag:1});			
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,18,200,20],caption:"No Telpon", readOnly:true, tag:1});					
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[20,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"],visible:false});				
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama Biaya","Tarif","Volume","Nilai"],
					colWidth:[[4,3,2,1,0],[80,80,80,550,100]],
					columnReadOnly:[true,[0,1,2,4],[3]],					
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["Kode","Jadwal","Kelas","Produk","Quota","Jml Peserta"],
					colWidth:[[5,4,3,2,1,0],[80,80,200,200,200,100]],
					readOnly:true, colFormat:[[4,5],[cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager"]});
		this.i_load = new portalui_imageButton(this.sgn2,{bound:[200,2,18,18],hint:"Refresh",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doAntri"]});										
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);					
		this.img = new image(this.pc1.childPage[1],{bound:[550,200,160,180]});			
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
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			uses("util_standar");
			this.standarLib = new util_standar();						
					
			var data = this.dbLib.getDataProvider("select cast(year(getdate()) as varchar) + right('0' + RTRIM(MONTH(getdate())), 2) + right('0' + RTRIM(DAY(getdate())), 2) as periode ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.thnBln = line.periode.substr(2,6);
				this.periode = line.periode.substr(0,6);
			}								
			this.cb_peserta.setSQL("select no_peserta, nama from haj_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",true);
			this.cb_jadwal.setSQL("select no_jadwal, nama from haj_jadwal where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",["no_jadwal","nama"],false,["Kode","Nama"],"and","Data Jadwal",true);
			this.doLoad();
			this.stsEdit = "0";			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_haji_fReg.extend(window.childForm);
window.app_saku3_transaksi_haji_fReg.implement({
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
					var data = this.dbLib.getDataProvider("select  count(no_reg)+1 as jml from haj_reg where progress = '0' and no_jadwal='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];					
						this.e_antri.setText(floatToNilai(line.jml));							
					}
					sql.add("insert into haj_reg(no_reg,kode_lokasi,no_jadwal,no_peserta,tanggal,umur,progress,no_urut,kode_pp,periode,kode_curr,harga,diskon,tambah,no_akru) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_jadwal.getText()+"','"+this.cb_peserta.getText()+"',getdate(),'"+this.e_umur.getText()+"','0',"+nilaiToFloat(this.e_antri.getText())+",'"+this.app._kodePP+"','"+this.periode+"','"+this.e_curr.getText()+"',"+nilaiToFloat(this.e_harga.getText())+","+nilaiToFloat(this.e_diskon.getText())+","+nilaiToFloat(this.e_tambah.getText())+",'-')");
										
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){																							
								sql.add("insert into haj_reg_d(no_reg,kode_lokasi,kode_biaya,tarif,vol,nilai) values "+
								        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"',"+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+")");
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
					sql.add("delete from haj_reg where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("delete from haj_reg_d where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					
					sql.add("insert into haj_reg(no_reg,kode_lokasi,no_jadwal,no_peserta,tanggal,umur,progress,no_urut,kode_pp,periode,kode_curr,harga,diskon,tambah) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_jadwal.getText()+"','"+this.cb_peserta.getText()+"',getdate(),'"+this.e_umur.getText()+"','0',"+nilaiToFloat(this.e_antri.getText())+",'"+this.app._kodePP+"','"+this.periode+"','"+this.e_curr.getText()+"',"+nilaiToFloat(this.e_harga.getText())+","+nilaiToFloat(this.e_diskon.getText())+","+nilaiToFloat(this.e_tambah.getText())+")");					
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){																							
								sql.add("insert into haj_reg_d(no_reg,kode_lokasi,kode_biaya,tarif,vol,nilai) values "+
								        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"',"+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+")");
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
					sql.add("delete from haj_reg where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from haj_reg_d where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.sg3.clear(1);
				break;
			case "simpan" :	
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.preView = "1";
				this.ubah();
				break;				
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;				
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.stsEdit = "0";
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"haj_reg","no_reg",this.app._lokasi+"-RG"+this.thnBln+".","0000"));
			this.cb_jadwal.setFocus();			
		}
	},	
	doAntri:function(sender){		
		var strSQL = "select a.no_jadwal,a.nama,x.nama as kelas,y.nama as produk,a.quota,isnull(b.jml,0) as jml "+
		             "from haj_jadwal a "+
		             "        inner join haj_kelas x on a.kode_kelas=x.kode_kelas and a.kode_lokasi=x.kode_lokasi "+
					 "        inner join haj_produk y on x.kode_produk=y.kode_produk and x.kode_lokasi=y.kode_lokasi "+
					 "        left join ("+
					 "			select  kode_lokasi,no_jadwal,count(no_reg) as jml "+
					 "		    from haj_reg where progress = '0' and kode_lokasi='"+this.app._lokasi+"' "+
					 "          group by kode_lokasi,no_jadwal) b on a.no_jadwal=b.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
					 "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.sg2.appendData([line.no_jadwal,line.nama,line.kelas,line.produk,floatToNilai(line.quota),floatToNilai(line.jml)]);
			}
		} else this.sg2.clear(1);
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select no_peserta from haj_reg where no_reg ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																		
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						this.sg3.clear(1);
						setTipeButton(tbSimpan);
					}
				}
			}			
			if (sender == this.cb_peserta && this.cb_peserta.getText() != ""){
				var strSQL = "select a.foto,a.nama,a.alamat,a.kode_mitra+' - '+b.nama as mitra,a.jenis_id+' - '+id_peserta as id_peserta,a.ayah,a.ibu,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.jk,a.kode_goldar,a.no_hp,a.no_tel,a.email,a.tgl_lahir as tanggal "+
							 "from haj_peserta a inner join haj_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+							 
				             "where a.no_peserta='"+this.cb_peserta.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.img.setImage(this.uploader.param4+line.foto);				
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_mitra.setText(line.mitra);
						this.e_id.setText(line.id_peserta);
						this.e_ayah.setText(line.ayah);
						this.e_ibu.setText(line.ibu);
						this.e_tempat.setText(line.tempat);
						this.e_tgllahir.setText(line.tgl_lahir);
						this.e_jk.setText(line.jk);						
						this.e_goldar.setText(line.kode_goldar);
						this.e_hp.setText(line.no_hp);
						this.e_tel.setText(line.no_tel);
						this.e_email.setText(line.email);						
						if (this.stsEdit == "0") {
							var data = this.dbLib.getDataProvider("select fn_getUmur('"+line.tanggal+"') as umur ",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line = data.rs.rows[0];
								data = line.umur.split(";");
								this.e_umur.setText(data[0] + " Tahun "+data[1] + " Bulan "+data[2] + " Hari");							
							}
						}
					}
				}
			}
			if (sender == this.cb_jadwal && this.cb_jadwal.getText() != ""){				
				var data = this.dbLib.getDataProvider("select convert(varchar,a.tanggal,103) as tgl,b.nama+' - '+c.nama as nama, a.harga,a.diskon, a.harga-a.diskon as neto,a.kode_curr,a.lama_hari,datediff(day,getdate(),a.tanggal) as due_date,b.kode_kelas "+
				           "from haj_jadwal a "+
				           "inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi "+
						   "inner join haj_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi "+
				           "where a.no_jadwal='"+this.cb_jadwal.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.e_tgl.setText(line.tgl);					
					this.e_curr.setText(line.kode_curr);						
					this.e_kelas.setText(line.nama);						
					this.kodeKelas = line.kode_kelas;
					this.e_lama.setText(floatToNilai(line.lama_hari));													
					this.e_duedate.setText(floatToNilai(line.due_date));																		
					this.e_harga.setText(floatToNilai(line.harga));							
					this.e_diskon.setText(floatToNilai(line.diskon));							
					this.e_neto.setText(floatToNilai(line.neto));																								
				}
				
				if (this.stsEdit == "0") var strSQL = "select kode_biaya,nama,1 as vol, nilai as tarif, nilai from haj_biaya where kode_kelas='"+this.kodeKelas+"' and kode_lokasi='"+this.app._lokasi+"' order by kode_biaya";
				else var strSQL = "select a.kode_biaya,a.nama,b.tarif,b.vol,b.nilai from haj_biaya a inner join haj_reg_d b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi where b.no_reg='"+this.cb_kode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_biaya";				
				var data1 = this.dbLib.getDataProvider(strSQL,true);												
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg3.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg3.appendData([line1.kode_biaya,line1.nama,floatToNilai(line1.tarif),floatToNilai(line1.vol),floatToNilai(line1.nilai)]);
					}
					this.sg3.validasi();
				} else this.sg3.clear(1);																
								
				if (this.stsEdit == "0") {					
					var data2 = this.dbLib.getDataProvider("select  count(no_reg)+1 as jml from haj_reg where progress='0' and no_jadwal='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
						var line2 = data2.rs.rows[0];					
						this.e_antri.setText(floatToNilai(line2.jml));													
					}				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}  
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsEdit = "1";
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));																					
				this.cb_peserta.setText(this.sg1.cells(2,row));
				
				var strSQL = "select *,harga-diskon as neto from haj_reg where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.cb_jadwal.setText(line.no_jadwal);															
						this.antri = line.no_urut;
						this.umur = line.umur;						
						this.e_antri.setText(floatToNilai(line.no_urut));
						this.e_umur.setText(line.umur);
						this.e_harga.setText(floatToNilai(line.harga));							
						this.e_diskon.setText(floatToNilai(line.diskon));							
						this.e_neto.setText(floatToNilai(line.neto));							
					}
				}
			}
		} catch(e) {alert(e);}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.cb_kode.getText()+"' ";
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
								this.pc1.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_kode.getText()+")","");							
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  				
				this.clearLayar();								
			break;
		}
	},
	clearLayar : function(){
		try {
			    this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		var strSQL = "select x.no_reg,convert(varchar,x.tanggal,103) as tanggal,a.no_peserta,a.id_peserta,x.no_jadwal+' - '+c.nama as jadwal,a.nama,a.ayah,a.ibu,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.jk,a.kode_goldar,a.alamat,a.no_hp,a.no_tel,d.nama+' - '+e.nama as kelas "+
		             "from haj_reg x inner join haj_peserta a on a.no_peserta=x.no_peserta and a.kode_lokasi=x.kode_lokasi "+
					 "               inner join haj_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+					 
					 "				 inner join haj_jadwal c on x.no_jadwal=c.no_jadwal and x.kode_lokasi=c.kode_lokasi "+
					 "				 inner join haj_kelas d on c.kode_kelas=d.kode_kelas and c.kode_lokasi=d.kode_lokasi "+
					 "				 inner join haj_produk e on d.kode_produk=e.kode_produk and d.kode_lokasi=e.kode_lokasi "+
					 "where x.progress='0' and x.kode_lokasi='"+this.app._lokasi+"' order by x.tanggal";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.doAntri();
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.no_reg,line.tanggal,line.no_peserta,line.jadwal,line.id_peserta,line.nama,line.ayah,line.ibu,line.tempat,line.tgl_lahir,line.jk,line.kode_goldar,line.alamat,line.no_hp,line.no_tel,line.kelas]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCell: function(sender, col, row){		
		if (col == 3 ) this.sg3.validasi();
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(2,i) != "" && this.sg3.cells(3,i) != ""){
					this.sg3.cells(4,i,floatToNilai(Math.round(nilaiToFloat(this.sg3.cells(3,i)) * nilaiToFloat(this.sg3.cells(2,i)))));					
					tot += nilaiToFloat(this.sg3.cells(3,i)) * nilaiToFloat(this.sg3.cells(2,i));					
				}
			}
			this.e_tambah.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	}
});