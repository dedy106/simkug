window.app_saku3_transaksi_yakes21_simlog_fSpk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fSpk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fSpk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","S P K", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data SPK","List SPK"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Vendor","Nilai"],
					colWidth:[[4,3,2,1,0],[100,200,310,80,100]],readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Perihal", maxLength:150});						
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK TTD", multiSelection:false, maxLength:10, tag:2});				
		this.cb_spph = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"No SPPH", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total SPK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,292], childPage:["Vendor","Item Barang","File Dok"]});						
		this.e_notap = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"No Penetapan", readOnly:true});										
		this.e_kettap = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", readOnly:true});										
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Vendor", readOnly:true});								
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Alamat", readOnly:true});								
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag: 0,
		            colTitle:["ID","Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Harga","Total","Kode Brg","Nama"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,70,80,80,60,170,170,170,170,30]],															
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});		
			
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK",true);			
								
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fSpk.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fSpk.implement({	
	isiCBspph: function() {
		//TL- PL
		this.cb_spph.setSQL("select a.no_spph, a.keterangan from log_spph_m a "+
							"inner join log_pesan_m b on a.no_spph=b.no_spph "+
							"inner join log_justerima_m c on b.no_terima=c.no_terima and c.jenis='TL' "+
							"where a.periode>'202110' and a.periode<='"+this.e_periode.getText()+"' and a.no_tap='-' and a.kode_lokasi='"+this.app._lokasi+"' "+
							
							"union all "+
							"select a.no_spph, a.keterangan from log_spph_m a "+
							"inner join log_pesan_m b on a.no_spph=b.no_spph "+
							"inner join log_justerima_m c on b.no_terima=c.no_terima and c.jenis='PL' "+
							"inner join log_tap_m d on a.no_tap=d.no_tap and no_spk='-' "+
							"where a.periode>'202110' and a.periode<='"+this.e_periode.getText()+"' and a.no_tap<>'-' and a.kode_lokasi='"+this.app._lokasi+"' "
							
							,["no_spph","keterangan"],false,["No SPPH","Deskripsi"],"and","Data SPPH",true);			
	},
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
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
						sql.add("delete from log_spk_m where no_spk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_spk_d where no_spk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");						
						
						if (this.jenis == "TL") {
							sql.add("update log_spph_m set no_tap = '-' where no_tap='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
							sql.add("delete from log_tap_m where no_tap = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("update log_nego_m set no_tap= '-' where no_tap='"+this.e_nb.getText()+"'");
						}
						else {
							sql.add("update log_tap_m set no_spk= '-' where no_spk='"+this.e_nb.getText()+"'");
						}
					}					
					
					sql.add("insert into log_spk_m(no_spk,no_pks,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,keterangan,no_tap,kode_vendor,total,no_dokumen,modul,no_sanggup) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_buat.getText()+"','"+this.e_ket.getText()+"','"+this.e_notap.getText()+"','"+this.kodeVendor+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_dok.getText()+"','"+this.jenis+"','-')");					
					
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)){
							sql.add("insert into log_spk_d(no_spk,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,harga,kode_klpfa) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+this.sg4.cells(0,i)+",'"+this.sg4.cells(1,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(4,i)+"',"+nilaiToFloat(this.sg4.cells(5,i))+","+nilaiToFloat(this.sg4.cells(6,i))+",'"+this.sg4.cells(8,i)+"')");
						}
					}	
					
					if (this.jenis == "TL") {
						//dummy penetapan
						sql.add("update log_spph_m set no_tap = '"+this.e_nb.getText()+"' where no_spph='"+this.cb_spph.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into log_tap_m(no_tap,no_spk,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,keterangan,no_spph,alasan,no_dokumen,modul,no_sanggup) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_buat.getText()+"','"+this.e_ket.getText()+"','"+this.cb_spph.getText()+"','-','"+this.e_dok.getText()+"','"+this.jenis+"','-')");										
						sql.add("update log_nego_m set no_tap= '"+this.e_nb.getText()+"' where no_nego='"+this.noNego+"'");
					}
					else {
						sql.add("update log_tap_m set no_spk= '"+this.e_nb.getText()+"' where no_tap='"+this.e_notap.getText()+"'");
					}
					
					// koreksi ke angg_r pakai periode pemesanan
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select '"+this.e_nb.getText()+"','SPK',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,'D',saldo,nilai "+
							"from angg_r where no_bukti='"+this.noPesan +"'");					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select '"+this.e_nb.getText()+"','SPK',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,'C',0,"+nilaiToFloat(this.e_total.getText())+" "+
							"from angg_r where no_bukti='"+this.noPesan +"'");

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SPK','"+this.e_nb.getText()+"')");															
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
					this.sg4.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbAllFalse);			
					this.isiCBspph();
				break;
			case "simpan" :															
			case "ubah" :																											
				this.preView = "1";												
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai harus lebih besar dari nol.");
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
				sql.add("delete from log_spk_m where no_spk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from log_spk_d where no_spk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");						
				
				if (this.jenis == "TL") {
					sql.add("update log_spph_m set no_tap = '-' where no_tap='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("delete from log_tap_m where no_tap = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_nego_m set no_tap= '-' where no_tap='"+this.e_nb.getText()+"'");
				}
				else {
					sql.add("update log_tap_m set no_spk= '-' where no_spk='"+this.e_nb.getText()+"'");
				}
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
		if (this.stsSimpan == 1) {
			this.isiCBspph();
			this.doClick();				
		}
	},
	doChange:function(sender){
		try {
			if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();	

			if (sender == this.cb_spph && this.cb_spph.getText()!="") {			
				var strSQL = "select no_pesan from log_pesan_m where no_spph='"+this.cb_spph.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.noPesan =  line.no_pesan;
					}
				}
				
				var strSQL = "select no_nego,modul,modul from log_sph_m where no_spph='"+this.cb_spph.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.noNego =  line.no_nego;
						this.jenis = line.modul;
						if (this.jenis == "PL") var filterNoTap = "		inner join log_tap_m d on b.no_tap=d.no_tap ";
						else  var filterNoTap = "		left join log_tap_m d on b.no_tap=d.no_tap ";
					}
				}
				
				
				var strSQL = "select a.kode_vendor,a.nama,a.alamat,b.nilai+b.ppn as total, isnull(d.no_tap,'-') as no_tap,d.keterangan "+
							"from vendor a "+
							"		inner join log_nego_m b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+						 
							"		inner join log_sph_m c on b.no_nego=c.no_nego "+filterNoTap+
							"where c.no_spph='"+this.cb_spph.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.kodeVendor = line.kode_vendor;
						this.e_notap.setText(line.no_tap);
						this.e_kettap.setText(line.keterangan);
						this.e_vendor.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_total.setText(floatToNilai(line.total));
						
					}
				}

				if (this.stsSimpan == 1) {			
					if (this.jenis == "PL" ) var filterNoTap = " and b.no_tap <> '-' ";
					else var filterNoTap = " ";
					var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai_nego,a.jumlah * a.nilai_nego as total, e.kode_klpfa, e.nama "+
								"from log_sph_d a inner join log_nego_m b on a.no_sph=b.no_sph and a.kode_lokasi=b.kode_lokasi "+filterNoTap+						 
								"                 inner join log_sph_m c on a.no_sph=c.no_sph "+
								"                 inner join log_spph_d d on c.no_spph=d.no_spph and a.no_urut=d.no_urut "+							
								"                 inner join log_pesan_m x on d.no_spph=x.no_spph "+							
								"                 inner join fa_klp e on d.kode_klpfa=e.kode_klpfa and e.kode_klpakun=x.kode_akun and d.kode_lokasi=e.kode_lokasi  "+
								"where d.no_spph='"+this.cb_spph.getText()+"'  "+
								"order by a.no_urut";		
								
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line2;
						this.sg4.clear();
						for (var i in data.rs.rows){
							line2 = data.rs.rows[i];												
							this.sg4.appendData([line2.no_urut,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai_nego),floatToNilai(line2.total),line2.kode_klpfa,line2.nama]);
						}
					} else this.sg4.clear(1);										
				}
			}	
		}
		catch(e){
			alert(e);
		}

	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg4.clear(1);				
				this.cb_spph.setText("");				
				this.isiCBspph();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_spk_m","no_spk",this.app._lokasi+"-SPK"+this.e_periode.getText().substr(2,4)+".","000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg4.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.isiCBspph();
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																				
		var strSQL = "select a.no_spk,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama,a.total as nilai "+
		             "from log_spk_m a "+
					 "inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi "+					 
					 "where a.no_sanggup='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_pks='-' and a.modul in ('TL','PL')";		
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
			this.sg3.appendData([line.no_spk,line.tgl,line.keterangan,line.nama,floatToNilai(line.nilai)]); 
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
																
				var strSQL = "select a.modul,a.keterangan,a.tanggal,a.nik_buat,a.kode_vendor,c.no_spph,a.no_dokumen "+
							 "from log_spk_m a "+
							 "     inner join log_tap_m c on a.no_spk=c.no_spk "+
							 "where a.no_spk = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.jenis = line.modul;						
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.e_dok.setText(line.no_dokumen);						
						this.cb_buat.setText(line.nik_buat);						
						this.cb_spph.setSQL("select a.no_spph, a.keterangan from log_spph_m a inner join log_tap_m b on a.no_tap=b.no_tap where b.no_spk='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["no_spph","keterangan"],false,["No SPPH","Deskripsi"],"and","Data SPPH",true);												
						this.cb_spph.setText(line.no_spph);
					}
				}												
				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.jumlah * a.harga as total,a.kode_klpfa,b.nama "+
							 "from log_spk_d a "+							
							 "		inner join log_tap_m c on a.no_spk=c.no_spk "+
							 "		inner join log_pesan_m d on c.no_spph=d.no_spph "+
							 "		inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and d.kode_akun=b.kode_klpakun "+							
							 "where a.no_spk ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg4.appendData([line2.no_urut,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total),line2.kode_klpfa,line2.nama]);
					}
				} else this.sg4.clear(1);	
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(							 
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

			}									
		} catch(e) {alert(e);}
	}
});