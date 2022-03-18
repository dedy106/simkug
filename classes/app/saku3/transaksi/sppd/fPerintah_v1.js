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
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,465], childPage:["Data Surat Perintah","List Surat Perintah"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["No. Surat Perintah","Tanggal","Maksud/Tujuan"],
					colWidth:[[2,1,0],[300,100,100]],				
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"PP",tag:7, readOnly:true,change:[this,"doChange"]});   
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
		this.e_alokasi = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Estimasi",readOnly:true, tag:1, tipeText:ttNilai, text:"0"});						

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,40,995,200], childPage:["Detail SPPD","File Dokumen","Budget"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:1,
				    colTitle:["Unit", "Nama Unit","NIK Input SPPD", "Nama Petugas","Jml Pengajuan"],
					colWidth:[[4,3,2,1,0],[100,250,200,250,100]],
					colFormat:[[4],[cfNilai]],				
					columnReadOnly:[true,[3,1]],
					buttonStyle:[[2, 0],[bsEllips, bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Dokumen Upload", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[1],{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		this.cb_akun = new saiCBBL(this.pc1.childPage[2],{bound:[20,20,220,20],caption:"Akun PD", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:8,tag:0,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo TW","Estimasi"],
					colWidth:[[7,6,5,4,3,2,1,0],[90,90,170,80,170,80,170,80]],					
					columnReadOnly:[true,[1,3,5,6],[0,2,4,7]],
					buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]], 
					colFormat:[[6,7],[cfNilai,cfNilai]],checkItem: true,
					cellEnter:[this,"doCellEnter2"],ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
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
	
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_kategori.setSQL("select kode_kategori, nama from sp_kategori where kode_lokasi='"+this.app._lokasi+"'",["kode_kategori","nama"],false,["Kode","Nama"],"and","Data Kategori",true);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "inner join sp_nik_perintah b on a.nik = b.nik and a.kode_lokasi = b.kode_lokasi "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.e_asal.setSQL("select kode_kota,nama from sp_kota where kode_lokasi ='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode","Nama"],"and","Data Kota",true);
			this.e_tempat.setSQL("select kode_kota,nama from sp_kota where kode_lokasi ='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode","Nama"],"and","Data Kota",true);

			this.cb_pp.setText(this.app._kodePP);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fPerintah.extend(window.portalui_childForm);
window.app_saku3_transaksi_sppd_fPerintah.implement({	
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
						sql.add("delete from sp_perintah_m where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_perintah_d where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_gar_d where no_perintah = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						//--cuma ngecek doang sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}
					
					sql.add("insert into sp_perintah_m (no_perintah,tgl_input,nik_user,periode,no_dokumen, tanggal, kode_lokasi,kode_pp,kode_akun,kode_drk,keterangan,dasar,asal,tempat,nik_buat,nik_app,jabatan,no_stugas, tgl_mulai,tgl_selesai, jum_hari,kode_kategori,saldo_budget,alokasi, akun_ref, no_batch  ) values "+
							"('"+this.e_nb.getText()+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-', '"+this.dp_d1.getDateString()+"', '"+this.app._lokasi+"','"+this.cb_pp.getText()+"','-','-','"+this.e_ket.getText()+"','"+this.e_dasar.getText()+"','"+this.e_asal.getText()+"', '"+this.e_tempat.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.e_jab.getText()+"','-', '"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"', "+nilaiToFloat(this.e_jml.getText())+",'"+this.cb_kategori.getText()+"',0,"+nilaiToFloat(this.e_alokasi.getText())+",'"+this.cb_akun.getText()+"','-' )");

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into sp_perintah_d (no_perintah,kode_lokasi,kode_unit,nik,jumlah) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+")");
						}
					}
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){							
							sql.add("insert into sp_gar_d(no_perintah,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,saldo,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+")");

							//--cuma ngecek doang sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							//--cuma ngecek doang 		  "('"+this.e_nb.getText()+"','PDSUPER','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+")");		

						}
					}

					sql.add("insert into sp_dok(no_bukti,nama_file,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file.getText()+"',0,'SP','"+this.app._lokasi+"')");					

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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.stsSimpan = 1;
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);																		
				break;
			case "simpan" :									
			case "ubah" :
				this.preView = "1";

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

				if (nilaiToFloat(this.e_jml.getText()) <= 0) {
					system.alert(this," Transaksi tidak valid.","Jumlah hari tidak valid. (Tidak boleh kurang dari nol)");
					return false;
				}
				
				for (var i = 0; i < this.sg2.rows.getLength();i++){
					if (this.sg2.rowValid(i)){
						if (this.cb_akun.getText() != this.sg2.cells(0,i)) {
							m = i+1;
							system.alert(this," Transaksi tidak valid.","Akun tidak konsisten dengan referensinya. Baris = "+m);
							return false;
						}

						if (this.stsSimpan==1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);		
						else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);		

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];
							data = line.gar.split(";");
							var sls = parseFloat(data[0]) - parseFloat(data[1]);			
							this.sg2.cells(6,i,floatToNilai(sls));
						}
						
						//tetep protek meski gak dikeep, RAPIM tidak usah dicek
						if (this.cb_kategori.getText() != "8") {
							if (nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Alokasi melebihi budget.[Baris : "+k+"]");
								return false;		
							}
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
				//--cuma ngecek doang sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										

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
			this.sg.clear(1);	
			this.sg2.clear(1);			
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_perintah_m","no_perintah",this.app._lokasi+"-SPR"+this.e_periode.getText().substr(2,4)+".","0000"));	
		this.cb_app.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){	
		if (sender == this.cb_app && this.cb_app.getText()!="" && this.stsSimpan == 1) {			
			var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_app.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.e_jab.setText(line2.jabatan);
			} 						
		}	
		
		if (sender == this.cb_kategori && this.cb_kategori.getText()!= "") {
			var sql = new server_util_arrayList();
			sql.add("select kode_unit, nama from sp_unit where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1'");						
			sql.add("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1'");					
			sql.add("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '056' "+
					"where a.jenis = 'Beban' and a.kode_lokasi='"+this.app._lokasi+"'");							

			if (this.cb_kategori.getText() == "8") { //RAPIM
				if (this.stsSimpan==1) this.cb_akun.setText("","");
				sql.add("select a.kode_pp, a.nama from pp a  where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' and a.kode_pp in (select distinct kode_induk from pp where kode_induk not in('-','00') and kode_lokasi='"+this.app._lokasi+"') ");
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a "+
									"where a.kode_akun='5311101' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);											
			}
			else {
				if (this.stsSimpan==1) this.cb_akun.setText("","");
				sql.add("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'");								
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '056' "+
									"where a.jenis = 'Beban' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			}
			this.dbLib.getMultiDataProviderA(sql);
		}

		if (sender == this.cb_akun && this.cb_akun.getText()!="" && this.stsSimpan==1) {
			this.sg2.clear(1);
		}
	},		
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    				
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Unit "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var nik = this.dataNik.get(sender.cells(2,row));
				if (nik) sender.cells(3,row,nik);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"NIK "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","NIK");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipseClick: function(sender, col, row){
		try{		
			if (sender == this.sg) {
                if (col == 0){
                    this.standarLib.showListData(this, "Daftar Unit",sender,undefined, 
                            "select kode_unit,nama from sp_unit where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            "select count(*) from sp_unit where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            ["kode_unit","nama"],"and",["Kode","Nama"],false);				
                }		

                if (col == 2){
                    if(this.sg.cells(0, row) != ""){
                        this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
                            "select nik, nama from karyawan where kode_unit='"+this.sg.cells(0, row)+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            "select count(*) from karyawan where kode_unit='"+this.sg.cells(0, row)+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            ["nik","nama"],"and",["NIK","Nama"],false);	
                    }else{
                        system.alert(this,"Pilih Kode Unit Terlebih Dahulu", "");
                        return false;
                    }	
                }	
            }	
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doChangeCell2: function(sender, col, row){
		if (col == 7 && this.sg2.cells(7,row) != "") this.sg2.validasi();

		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) {
					sender.cells(1,row,akun);
					
					sender.cells(4,row,"");
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
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
							sender.cells(7,row,floatToNilai(sls));
						}
					}
					else {						
						sender.cells(4,row,"-");
						sender.cells(5,row,"-");
						sender.cells(6,row,"0");	
						sender.cells(7,row,"0");						
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell2");

	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0 && this.cb_akun.getText()!=""){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 									
							"select a.kode_akun, a.nama from masakun a where a.kode_akun = '"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from masakun a where a.kode_akun = '"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					if (this.cb_kategori.getText() == "8") {
						this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
								"select a.kode_pp, a.nama from pp a  where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' and a.kode_pp in (select distinct kode_induk from pp where kode_induk not in('-','00') and kode_lokasi='"+this.app._lokasi+"')",
								"select count(*) from pp a where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'",
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
					}
					else {
						this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
								"select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'",
								"select count(*) from (select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1') a",
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
					}
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
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(7,i));					
				}
			}
			this.e_alokasi.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("doNilaiChange2:"+e);
		}
	},
	doCellEnter2: function(sender, col, row){
		if (col == 0) this.sg2.cells(0,row,this.cb_akun.getText());				
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");		
								this.clearLayar();
							}						
						}else system.info(this,result,"");
	    			break;		
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPP = new portalui_arrayMap();
							this.dataNik = new portalui_arrayMap();		
							this.dataAkun = new portalui_arrayMap();														
							this.dataPP2 = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_unit, line.nama);										
								}					
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataNik.set(line.nik, line.nama);										
								}					
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}					
							}
							if (result.result[3]){	    			        
								var line;
								for (var i in result.result[3].rs.rows){
									line = result.result[3].rs.rows[i];									
									this.dataPP2.set(line.kode_pp, line.nama);										
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
			setTipeButton(tbSimpan);
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
			this.stsSimpan = 1;
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);																		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){		
		var strSQL = "select a.no_perintah, convert(varchar,a.tanggal,103) as tgl, a.keterangan  "+
					 "from sp_perintah_m a  "+
					 "left join ( "+
					 "			select distinct no_perintah "+
					 "			from sp_spj_m "+
					 "			where kode_lokasi='"+this.app._lokasi+"' and progress<>'Z' "+
					 "			) b on a.no_perintah=b.no_perintah "+
					 "where a.no_batch ='-' and b.no_perintah is null and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_perintah";
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
								
				var data = this.dbLib.getDataProvider(
							"select *,isnull(b.nama_file,'-') as nama_file "+
							"from sp_perintah_m a "+
							"	left join sp_dok b on a.no_perintah=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SP' "+							 
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
						
						this.e_file.setText(line.nama_file);
						this.fileBfr = line.nama_file;	

						this.e_alokasi.setText(floatToNilai(line.alokasi));

						this.cb_akun.setText(line.akun_ref);						
					} 
				}				
				
				var strSQL = "select a.kode_unit, b.nama, a.nik, c.nama as karyawan, a.jumlah "+
							 "from sp_perintah_d a "+
							 "inner join sp_unit b on a.kode_unit=b.kode_unit and a.kode_lokasi=b.kode_lokasi "+
							 "inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_perintah='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_unit,line.nama,line.nik,line.karyawan,floatToNilai(line.jumlah)]);
					}
				} else this.sg.clear(1);				
				this.sg.validasi();					

				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp, a.kode_drk,d.nama as nama_drk, a.saldo, a.nilai "+
							"from sp_gar_d a "+
							"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
							"where a.no_perintah='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk, floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);				
				this.sg2.validasi();					

			
			}						
		} catch(e) {alert(e);}
	}
});