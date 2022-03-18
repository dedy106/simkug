window.app_saku3_transaksi_yakes21_simlog_fBast = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fBast.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fBast";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","BAST dan Akru Hutang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Mitra","Nilai"],
					colWidth:[[5,4,3,2,1,0],[90,200,300,180,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Akun Hutang", multiSelection:false, maxLength:10, tag:2});										
		this.e_adk = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,220,20],caption:"Nilai UM / ADK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_spk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"SPK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});										
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Nilai Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,305], childPage:["Data SPK","Data Penerimaan","Data Barang"]});
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Mitra", readOnly:true, tag:2});														
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Bank", readOnly:true});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Rekening", readOnly:true});				
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Nama Rekening", readOnly:true});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-32],colCount:8,
		            colTitle:["Status","No Terima","Tanggal","Keterangan","Kode Akun","Kode PP","Kode DRK","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,80,300,80,120,80]],
					colFormat:[[7],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP"]})]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});			
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-32],colCount:11,
		            colTitle:["ID","Item Barang","Merk","Tipe","Harga","Jml SPK","Jml Terima","Kode Akun","Kode Klp","Nama Klp","Jenis"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,150,80,80,80,80,80,150,150,200,110]],
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]], 					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		
			
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LOGADK','HUTLOG','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "HUTLOG") this.AkunHut = line.flag;		
					if (line.kode_spro == "LOGADK") this.akunADK = line.flag;	
				}
			}			
						
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' "+					
								"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
						
			this.cb_akun.setText(this.AkunHut);

			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fBast.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fBast.implement({	
	isiCBSpk: function() {
		this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a left join hutang_m b on a.no_spk=b.no_dokumen and a.kode_lokasi=b.kode_lokasi "+
						   "where b.no_hutang is null and a.periode<='"+this.e_periode.getText()+"' and a.no_pks <> '-' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);		
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
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update fa_asset set progress='1',catatan='-' where catatan='"+this.e_nb.getText()+"'");
						sql.add("update log_pbadk_d set no_bast='-' where no_bast='"+this.e_nb.getText()+"'");
					}										

					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_vendor.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','F',0,'LOGBAST','-')");
					
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBAST','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (this.e_adk.getText() != "0") {
						sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							    "('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',777,'"+this.akunADK+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_adk.getText())+","+parseNilai(this.e_adk.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBAST','ADK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(0,i) == "APP"){								
								sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(4,i)+"','"+this.sg2.cells(3,i)+"','D','IDR',1,"+parseNilai(this.sg2.cells(7,i))+","+parseNilai(this.sg2.cells(7,i))+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','LOGBAST','AKTAP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								sql.add("update fa_asset set tgl_perolehan='"+this.dp_d1.getDateString()+"',tgl_susut='"+this.dp_d1.getDateString()+"',periode='"+this.e_periode.getText()+"',periode_susut='"+this.e_periode.getText()+"',progress='2',catatan='"+this.e_nb.getText()+"',kode_pp_susut='"+this.app._kodePP+"' where no_baps='"+this.sg2.cells(1,i)+"'");
							}
						}
					}
						
					sql.add("update log_pbadk_d set no_bast='"+this.e_nb.getText()+"' where no_spk='"+this.cb_spk.getText()+"'");														
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
					this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.isiCBSpk();					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";
				this.sg2.validasi();																
				
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						var j = i+1;					
						if (nilaiToFloat(this.sg4.cells(5,i)) != nilaiToFloat(this.sg4.cells(6,i)) ) {
							system.alert(this,"Transaksi tidak valid.","Jumlah Barang SPK tidak sama dengan yang diterima.(Tab Data Barang - Baris : "+j+")");
							return false;
						}
					}					
				}	
											
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Hutang tidak boleh nol atau kurang.");
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
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update fa_asset set progress='1',catatan='-' where catatan='"+this.e_nb.getText()+"'");
					sql.add("update log_pbadk_d set no_bast='-' where no_bast='"+this.e_nb.getText()+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
			this.isiCBSpk();
			this.doClick();		
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_spk && this.cb_spk.getText() != "") {
			
			if (this.stsSimpan ==1) {
				var strSQL = "select b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek "+
							"from log_spk_m a "+
							"inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_spk='"+this.cb_spk.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_vendor.setText(line.kode_vendor,line.nama);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
					}
				}
				
				var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kode_akun,b.kode_pp,b.kode_drk,b.total "+
							"from log_terima_m a inner join ( "+
							"		select no_baps,kode_akun,kode_pp,kode_drk,sum(nilai) as total  "+
							"		from fa_asset where catatan='-' group by kode_akun,kode_pp,kode_drk,no_baps) b on a.no_terima=b.no_baps "+
							"where a.no_po='"+this.cb_spk.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg2.appendData(["APP",line2.no_terima,line2.tgl,line2.keterangan,line2.kode_akun,line2.kode_pp,line2.kode_drk,floatToNilai(line2.total)]);
					}
				} else this.sg2.clear(1);	
			}
			
			var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as adk "+
						 "from log_pbadk_d  "+
						 "where no_spk='"+this.cb_spk.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.e_adk.setText(floatToNilai(line.adk));
				}
				else this.e_adk.setText("0");
			}
			else this.e_adk.setText("0");
			
			var strSQL = "select a.no_spk+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga as harga,a.jumlah,isnull(d.jml_terima,0) as jum_terima,bb.kode_akun,c.kode_klpfa,c.nama as nama_klpfa,z.jenis "+
			             "from log_spk_d a inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi "+
						 
						 "                 inner join log_tap_m aa on b.no_spk=aa.no_spk "+
						 "				   inner join log_spph_m xx on xx.no_spph=aa.no_spph and xx.kode_lokasi=aa.kode_lokasi "+
						 "				   inner join log_pesan_m xxx on xxx.no_spph=xx.no_spph and xx.kode_lokasi=xxx.kode_lokasi "+
						 
						 "                 inner join fa_klp c on a.kode_klpfa = c.kode_klpfa and c.kode_klpakun=xxx.kode_akun "+ 
						 "                 inner join fa_klpakun z on z.kode_klpakun = c.kode_klpakun "+ 
						
						 "                 inner join log_pesan_m bb on aa.no_spph=bb.no_spph "+						 
						 "                 left join  (select id_pesan,no_po,count(no_fa) as jml_terima from fa_asset where no_po='"+this.cb_spk.getText()+"' group by id_pesan,no_po) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk "+
						 "where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "order by a.item";		
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg4.appendData([line2.id,line2.item,line2.merk,line2.tipe,floatToNilai(line2.harga),floatToNilai(line2.jumlah),floatToNilai(line2.jum_terima),line2.kode_akun,line2.kode_klpfa,line2.nama_klpfa,line2.jenis]);
				}
			} else this.sg4.clear(1);				
											
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
				this.isiCBSpk();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_m","no_hutang",this.app._lokasi+"-HU"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},		
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(0,i) == "APP"){					
					tot += nilaiToFloat(this.sg2.cells(7,i));					
				}
			}
			tot = tot - nilaiToFloat(this.e_adk.getText());
			this.e_total.setText(floatToNilai(tot));			
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
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
			this.sg4.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.isiCBSpk();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.kode_vendor+' - '+b.nama as vendor,a.nilai "+
		             "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "                left join (select distinct kode_lokasi,no_hutang from hutang_bayar where kode_lokasi='"+this.app._lokasi+"') c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
					 "where c.no_hutang is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='LOGBAST'";		
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
			this.sg3.appendData([line.no_hutang,line.tgl,line.no_dokumen,line.keterangan,line.vendor,floatToNilai(line.nilai)]); 
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
												
				var strSQL = "select keterangan,no_dokumen,tanggal,kode_vendor,akun_hutang,kode_pp "+
							 "from hutang_m "+							 
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.cb_spk.setSQL("select no_spk, keterangan from log_spk_m where no_spk='"+line.no_dokumen+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);		
						this.cb_spk.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.cb_akun.setText(line.akun_hutang);												
					}
				}								
				
				var strSQL = "select b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek "+
							 "from log_spk_m a "+
							 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_spk='"+this.cb_spk.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_vendor.setText(line.kode_vendor,line.nama);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
					}
				}
				
				var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as adk "+
							 "from log_pbadk_d  "+
							 "where no_bast='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_adk.setText(floatToNilai(line.adk));
					}
					else this.e_adk.setText("0");
				}				
				
				var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kode_akun,b.kode_pp,b.kode_drk,b.total "+
							 "from log_terima_m a inner join ( "+
							 "		select no_baps,kode_akun,kode_pp,kode_drk,sum(nilai) as total  "+
							 "		from fa_asset where catatan='"+this.e_nb.getText()+"' group by kode_akun,kode_pp,kode_drk,no_baps) b on a.no_terima=b.no_baps "+
							 "where a.no_po='"+this.cb_spk.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg2.appendData(["APP",line2.no_terima,line2.tgl,line2.keterangan,line2.kode_akun,line2.kode_pp,line2.kode_drk,floatToNilai(line2.total)]);
					}
				} else this.sg2.clear(1);														
				
			}									
		} catch(e) {alert(e);}
	}
});