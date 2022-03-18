window.app_saku3_transaksi_sppd_fPerintah = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fPerintah.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fPerintah";
		this.itemsValue = new portalui_arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Surat Perintah SPPD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["Data Surat Perintah","List Surat Perintah"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["No. Surat Perintah","Tanggal","Maksud/Tujuan"],
					colWidth:[[2,1,0],[300,100,100]],				
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true, tag:2});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20], caption:"Pemberi Tugas", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_jab = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,300,20],caption:"Jabatan", maxLength:150});	
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,550,20],caption:"Maksud dan Tujuan", maxLength:150});						
		this.e_dasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,550,20],caption:"Dasar Perj. Dinas", maxLength:150});				
		this.cb_kategori = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Kategori", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_asal = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"Kota Asal", multiSelection:false, maxLength:10, tag:1});						
		this.e_tempat = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Kota Tujuan", multiSelection:false, maxLength:10, tag:1});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai - Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[240,11,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[370,11,200,20],caption:"Jumlah Hari",readOnly:true, tag:1, tipeText:ttNilai, text:"0"});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,40,995,215], childPage:["Detail SPPD","Dokumen Upload","Budget"]});		
		this.cb_unit = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Unit", readOnly:true, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_jum1 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Jum Karyawan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_jum2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Jum Driver",tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_jum3 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Tot Pengajuan",readOnly:true, tag:1, tipeText:ttNilai, text:"0"});								

		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Memo/Surat Tugas", readOnly:true, tag:1});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[1],{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		this.e_file2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.uploader2 = new uploader(this.pc1.childPage[1],{bound:[480,16,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad2"]});				
		this.bLihat2 = new button(this.pc1.childPage[1],{bound:[580,16,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		this.e_file3 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.uploader3 = new uploader(this.pc1.childPage[1],{bound:[480,17,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad3"]});				
		this.bLihat3 = new button(this.pc1.childPage[1],{bound:[580,17,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		this.e_file4 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.uploader4 = new uploader(this.pc1.childPage[1],{bound:[480,18,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad4"]});				
		this.bLihat4 = new button(this.pc1.childPage[1],{bound:[580,18,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		this.e_file5 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.uploader5 = new uploader(this.pc1.childPage[1],{bound:[480,19,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad5"]});				
		this.bLihat5 = new button(this.pc1.childPage[1],{bound:[580,19,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		this.cb_pp = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"PP",tag:7, multiSelection:false, change:[this,"doChange"]});   		
		this.cb_akun = new saiCBBL(this.pc1.childPage[2],{bound:[20,20,220,20],caption:"Akun PD", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this.pc1.childPage[2],{bound:[20,21,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_saldogar = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Saldo TW",readOnly:true, tag:1, tipeText:ttNilai, text:"0"});								
		this.e_alokasi = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Estimasi", tag:1, tipeText:ttNilai, text:"0"});						

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		setTipeButton(tbSimpan);
		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);

			var data = this.dbLib.getDataProvider("select distinct kode_induk from pp where kode_pp='"+this.app._kodePP+"' and kode_induk not in('-','00') and kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.ppInduk = line.kode_induk;
				}
			}
	
			this.cb_unit.setSQL("select kode_unit,nama from sp_unit where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_unit","nama"],false,["Kode","Nama"],"and","Data Unit",true);			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp in ('"+this.app._kodePP+"','"+this.ppInduk+"')",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			

			this.cb_kategori.setSQL("select kode_kategori, nama from sp_kategori where kode_lokasi='"+this.app._lokasi+"'",["kode_kategori","nama"],false,["Kode","Nama"],"and","Data Kategori",true);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "inner join sp_nik_perintah b on a.nik = b.nik and a.kode_lokasi = b.kode_lokasi "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.e_asal.setSQL("select kode_kota,nama from sp_kota where kode_lokasi ='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode","Nama"],"and","Data Kota",true);
			this.e_tempat.setSQL("select kode_kota,nama from sp_kota where kode_lokasi ='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode","Nama"],"and","Data Kota",true);

			this.cb_pp.setText(this.app._kodePP);		
			
			var data = this.dbLib.getDataProvider("select kode_unit from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_unit.setText(line.kode_unit);
				}
			}

			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fPerintah.extend(window.portalui_childForm);
window.app_saku3_transaksi_sppd_fPerintah.implement({	
	doLihat: function(sender){
		try{
			if (sender == this.bLihat) {
				if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
			}
			if (sender == this.bLihat2) {
				if (this.e_file2.getText() != "" || this.e_file2.getText() != "-") window.open("server/media/"+this.e_file2.getText());
			}			
			if (sender == this.bLihat3) {
				if (this.e_file3.getText() != "" || this.e_file3.getText() != "-") window.open("server/media/"+this.e_file3.getText());
			}
			if (sender == this.bLihat4) {
				if (this.e_file4.getText() != "" || this.e_file4.getText() != "-") window.open("server/media/"+this.e_file4.getText());
			}
			if (sender == this.bLihat5) {
				if (this.e_file5.getText() != "" || this.e_file5.getText() != "-") window.open("server/media/"+this.e_file5.getText());
			}
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
	doAfterLoad2:  function(sender, result, data, filename){
		try{
			if (result) this.e_file2.setText(data.filedest);
			this.dataUpload2 = data;
			if (this.dataUpload2.temporary !== undefined) this.dataUpload2.temporary += ";";
			else this.dataUpload2.temporary = "";
			this.dataUpload2.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload2.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad3:  function(sender, result, data, filename){
		try{
			if (result) this.e_file3.setText(data.filedest);
			this.dataUpload3 = data;
			if (this.dataUpload3.temporary !== undefined) this.dataUpload3.temporary += ";";
			else this.dataUpload3.temporary = "";
			this.dataUpload3.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload3.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad4:  function(sender, result, data, filename){
		try{
			if (result) this.e_file4.setText(data.filedest);
			this.dataUpload4 = data;
			if (this.dataUpload4.temporary !== undefined) this.dataUpload4.temporary += ";";
			else this.dataUpload4.temporary = "";
			this.dataUpload4.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload4.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad5:  function(sender, result, data, filename){
		try{
			if (result) this.e_file5.setText(data.filedest);
			this.dataUpload5 = data;
			if (this.dataUpload5.temporary !== undefined) this.dataUpload5.temporary += ";";
			else this.dataUpload5.temporary = "";
			this.dataUpload5.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload5.tmpfile;
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
						sql.add("delete from sp_perintah_m where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_perintah_d where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_gar_d where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					}
					
					sql.add("insert into sp_perintah_m (no_perintah,tgl_input,nik_user,periode,no_dokumen, tanggal, kode_lokasi,kode_pp,kode_akun,kode_drk,keterangan,dasar,asal,tempat,nik_buat,nik_app,jabatan,no_stugas, tgl_mulai,tgl_selesai, jum_hari,kode_kategori,saldo_budget,alokasi, akun_ref, no_batch  ) values "+
							"('"+this.e_nb.getText()+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-', '"+this.dp_d1.getDateString()+"', '"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"','"+this.e_dasar.getText()+"','"+this.e_asal.getText()+"', '"+this.e_tempat.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.e_jab.getText()+"','-', '"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"', "+nilaiToFloat(this.e_jml.getText())+",'"+this.cb_kategori.getText()+"',0,"+nilaiToFloat(this.e_alokasi.getText())+",'-','-' )");
					sql.add("insert into sp_perintah_d (no_perintah,kode_lokasi,kode_unit,nik,jumlah,jum_driver) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_unit.getText()+"','"+this.app._userLog+"',"+nilaiToFloat(this.e_jum1.getText())+","+nilaiToFloat(this.e_jum2.getText())+")");
					sql.add("insert into sp_gar_d(no_perintah,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_saldogar.getText())+","+nilaiToFloat(this.e_alokasi.getText())+")");

					sql.add("insert into sp_dok(no_bukti,nama_file,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file.getText()+"',1,'SP','"+this.app._lokasi+"')");					
					if (this.e_file2.getText() != "") sql.add("insert into sp_dok(no_bukti,nama_file,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file2.getText()+"',2,'SP','"+this.app._lokasi+"')");					
					if (this.e_file3.getText() != "") sql.add("insert into sp_dok(no_bukti,nama_file,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file3.getText()+"',3,'SP','"+this.app._lokasi+"')");					
					if (this.e_file4.getText() != "") sql.add("insert into sp_dok(no_bukti,nama_file,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file4.getText()+"',4,'SP','"+this.app._lokasi+"')");					
					if (this.e_file5.getText() != "") sql.add("insert into sp_dok(no_bukti,nama_file,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file5.getText()+"',5,'SP','"+this.app._lokasi+"')");					

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
					this.sg3.clear(1);
					this.stsSimpan = 1;
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);																		
				break;
			case "simpan" :									
			case "ubah" :
				this.preView = "1";
				/*
				var strSQL = "select datediff(day,getdate(),'"+this.dp_d2.getDateString()+"') as selisih ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						if (parseInt(line.selisih)<0) {
							system.alert(this," Transaksi tidak valid.","Tgl mulai kurang dari tanggal sistem hari ini.");
							return false;
						}
					}					
				}
				*/
				if (nilaiToFloat(this.e_jml.getText()) <= 0) {
					system.alert(this," Transaksi tidak valid.","Jumlah hari tidak valid. (Tidak boleh kurang dari nol)");
					return false;
				}

				if (nilaiToFloat(this.e_jum3.getText()) <= 0) {
					system.alert(this," Transaksi tidak valid.","Total Pengajuan tidak valid. (Tidak boleh kurang dari nol)");
					return false;
				}
				if (nilaiToFloat(this.e_saldogar.getText()) < nilaiToFloat(this.e_alokasi.getText())) {
					var k = i+1;
					system.alert(this,"Transaksi tidak valid.","Estimasi melebihi Saldo Budget (TW).");
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

				sql.add("delete from sp_perintah_m where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from sp_perintah_d where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from sp_gar_d where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from sp_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				
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
	doSelectDate2: function(sender, y,m,d){
		var data2 = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') + 1 as jumlah ",true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2 = data2.rs.rows[0];
			this.e_jml.setText(line2.jumlah);
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg3.clear(1); 
			this.bLihat.hide();
			this.bLihat2.hide();
			this.bLihat3.hide();
			this.bLihat4.hide();
			this.bLihat5.hide();
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_perintah_m","no_perintah",this.app._lokasi+"-SPR"+this.e_periode.getText().substr(2,4)+".","0000"));	
		this.cb_app.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){		
		try {	
			if (sender == this.cb_app && this.cb_app.getText()!="" && this.stsSimpan == 1) {			
				var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_app.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jab.setText(line2.jabatan);
				} 						
			}	
			
			if (sender == this.cb_kategori && this.cb_kategori.getText()!= "") {						
				//8 = RAPIM
				if (this.cb_kategori.getText() == "8") { 					
					this.cb_pp.setText("","");
					if (this.stsSimpan==1) {
						this.cb_akun.setText("","");										
						var data = this.dbLib.getDataProvider("select distinct kode_induk from pp where kode_pp='"+this.app._kodePP+"' and kode_induk not in('-','00') and kode_lokasi='"+this.app._lokasi+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								this.cb_pp.setText(line.kode_induk);
							}
						}
					}
					this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_akun='5311101' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);											
					this.cb_akun.setText("5311101");
				}
				else {
					if (this.stsSimpan==1) {
						this.cb_akun.setText("","");
						this.cb_pp.setText(this.app._kodePP);
					}
					this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '056' "+
										"where a.jenis = 'Beban' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
				}			
			}

			if ((sender == this.cb_akun || sender == this.cb_pp) && this.cb_akun.getText()!="" && this.cb_pp.getText()!="") {
				var vUnion = "";
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.status_gar != "1") vUnion = " union select '-','-' "; 
					} 
				}
				this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion,["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true );			
			}

			if ((sender == this.cb_akun || sender == this.cb_pp || sender == this.cb_drk) && this.cb_akun.getText()!="" && this.cb_pp.getText()!="" && this.cb_drk.getText()!="" ) {
				if (this.stsSimpan==1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);		
				else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);		

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					var sls = parseFloat(data[0]) - parseFloat(data[1]);			

					this.e_saldogar.setText(floatToNilai(sls));
					this.e_alokasi.setText(floatToNilai(sls));				
				}
			}

			if (sender == this.e_jum1 || sender == this.e_jum2) {
				var tot = nilaiToFloat(this.e_jum1.getText()) + nilaiToFloat(this.e_jum2.getText());
				this.e_jum3.setText(floatToNilai(tot));
			}
		}
		catch(e) {
			alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if(this.preView = "1"){

								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								if (this.fileBfr2 && this.dataUpload2) {
									if (this.fileBfr2 != this.e_file2.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr2);
								}									
								if (this.dataUpload2) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload2.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload2.filedest);
								
								if (this.fileBfr3 && this.dataUpload3) {
									if (this.fileBfr3 != this.e_file3.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr3);
								}									
								if (this.dataUpload3) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload3.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload3.filedest);
								
								if (this.fileBfr4 && this.dataUpload4) {
									if (this.fileBfr4 != this.e_file4.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr4);
								}									
								if (this.dataUpload4) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload4.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload4.filedest);
								
								if (this.fileBfr5 && this.dataUpload5) {
									if (this.fileBfr5 != this.e_file5.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr5);
								}									
								if (this.dataUpload5) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload5.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload5.filedest);

								this.nama_report="server_report_saku3_sppd_rptSurPerintah";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_perintah='"+this.e_nb.getText()+"' ";
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
							}else{
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								if (this.fileBfr2 && this.dataUpload2) {
									if (this.fileBfr2 != this.e_file2.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr2);
								}
								if (this.fileBfr3 && this.dataUpload3) {
									if (this.fileBfr3 != this.e_file3.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr3);
								}
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr4 != this.e_file4.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr4);
								}
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr5 != this.e_file5.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr5);
								}
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
			setTipeButton(tbSimpan);
			this.sg3.clear(1);
			this.stsSimpan = 1;
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);																		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){	
		var data = this.dbLib.getDataProvider("select distinct kode_induk from pp where kode_pp='"+this.app._kodePP+"' and kode_induk not in('-','00') and kode_lokasi='"+this.app._lokasi+"' ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.ppInduk = line.kode_induk;
			}
		}
		var strSQL = "select a.no_perintah, convert(varchar,a.tanggal,103) as tgl, a.keterangan  "+
					 "from sp_perintah_m a  "+
					 "left join ( "+
					 "			select distinct no_perintah "+
					 "			from sp_spj_m "+
					 "			where kode_lokasi='"+this.app._lokasi+"' and progress<>'Z' "+
					 "			) b on a.no_perintah=b.no_perintah "+
					 "where a.kode_kategori<>'8' and a.no_batch ='-' and b.no_perintah is null and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp in ('"+this.cb_pp.getText()+"','"+this.ppInduk+"') "+					
					 "union "+
					 "select a.no_perintah, convert(varchar,a.tanggal,103) as tgl, a.keterangan  "+
					 "from sp_perintah_m a  "+
					 "left join ( "+
					 "			select distinct no_perintah "+
					 "			from sp_spj_m "+
					 "			where kode_lokasi='"+this.app._lokasi+"' and progress<>'Z' "+
					 "			) b on a.no_perintah=b.no_perintah "+
					 "where a.kode_kategori='8' and a.no_batch ='-' and b.no_perintah is null and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.ppInduk+"' "+					
					 "order by a.no_perintah ";

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
			this.sg3.appendData([line.no_perintah,line.tgl,line.keterangan]); 
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
				this.bLihat.show();	
				this.bLihat2.show();	
				this.bLihat3.show();	
				this.bLihat4.show();	
				this.bLihat5.show();							
								
				var data = this.dbLib.getDataProvider(
							"select a.*,g.jumlah,g.jum_driver,g.kode_unit  "+
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
							"where a.no_perintah='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);

				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.dp_d1.setText(line.tanggal);						
						this.cb_kategori.setText(line.kode_kategori);	
						this.cb_app.setText(line.nik_app);						
						this.e_jab.setText(line.jabatan);															
						this.e_ket.setText(line.keterangan);								
						this.e_dasar.setText(line.dasar);																
						this.e_asal.setText(line.asal);	
						this.e_tempat.setText(line.tempat);		
						this.dp_d2.setText(line.tgl_mulai);		
						this.dp_d3.setText(line.tgl_selesai);						
						this.e_alokasi.setText(floatToNilai(line.alokasi));
						this.e_jum1.setText(floatToNilai(line.jumlah));
						this.e_jum2.setText(floatToNilai(line.jum_driver));
						this.cb_unit.setText(line.kode_unit);	

						this.cb_akun.setText(line.kode_akun);				
						this.cb_pp.setText(line.kode_pp);							
						this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true );			

						this.cb_drk.setText(line.kode_drk);				
						
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

					} 
				}								
			}						
		} catch(e) {alert(e);}
	}
});