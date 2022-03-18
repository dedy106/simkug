window.app_saku3_transaksi_siaga_simlog_fBasttu = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_simlog_fBasttu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_simlog_fBasttu";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BAST", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
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
		
		this.cb_spk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No PO / SPK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});										
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total BAST", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Mt Uang", readOnly:true,change:[this,"doChange"]});									
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,18,200,20],caption:"Kurs BAST", tag:1, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});					
		this.e_totalidr = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Tot BAST IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,280], childPage:["Data Mitra","Data Penerimaan","Detail Item"]});
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Mitra", readOnly:true, tag:2});														
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Alamat", readOnly:true});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-32],colCount:6,
		            colTitle:["Status","No Terima","Tanggal","Keterangan","Kode Akun","Nilai Curr"],
					colWidth:[[5,4,3,2,1,0],[100,100,350,100,150,80]],
					colFormat:[[5],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP"]})]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});			
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-32],colCount:11,
		            colTitle:["ID","Item Barang","Merk","Tipe","Harga Curr","Jml SPK","Jml Terima","Kode Akun","Kode Klp","Nama Klp","Jenis"],
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
						
			this.flagGarFree = "0"; this.flagDokFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTLOG','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
					if (line.kode_spro == "HUTLOG") this.AkunHut = line.flag;							
				}
			}			
						
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' "+					
								"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		

			this.cb_akun.setText(this.AkunHut);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fBasttu.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fBasttu.implement({	
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
						sql.add("update fa_asset set progress='1',catatan='-' where catatan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	

					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref, nilai_curr) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_vendor.getText()+"','"+this.e_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_totalidr.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','F',0,'LOGBAST','-', "+nilaiToFloat(this.e_total.getText())+")");					
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C','"+this.e_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+","+parseNilai(this.e_totalidr.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBAST','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(0,i) == "APP"){															
								var nilaiIDR = nilaiToFloat(this.sg2.cells(5,i)) * nilaiToFloat(this.e_kurs.getText());
								sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(4,i)+"','"+this.sg2.cells(3,i)+"','D','"+this.e_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+parseNilai(this.sg2.cells(5,i))+","+nilaiIDR+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBAST','AKTAP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								sql.add("update fa_asset "+
										"set tgl_perolehan='"+this.dp_d1.getDateString()+"',tgl_susut='"+this.dp_d1.getDateString()+"',periode='"+this.e_periode.getText()+"',periode_susut='"+this.e_periode.getText()+"',progress='2',catatan='"+this.e_nb.getText()+"',kode_pp_susut='"+this.app._kodePP+"', "+
										"	 kurs="+nilaiToFloat(this.e_kurs.getText())+",nilai=nilai_curr * "+nilaiToFloat(this.e_kurs.getText())+" "+
										"where no_baps='"+this.sg2.cells(1,i)+"' and progress='1' and kode_lokasi='"+this.app._lokasi+"'");

								sql.add("update a set a.nilai=a.nilai_curr * "+nilaiToFloat(this.e_kurs.getText())+",a.kurs="+nilaiToFloat(this.e_kurs.getText())+" "+
										"from fa_nilai a inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
										"where b.no_baps='"+this.sg2.cells(1,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg2.clear(1); this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a "+
									   "left join (select no_dokumen,sum(nilai_curr) as nilai_ba "+
									   "		  from hutang_m where modul='LOGBAST' and kode_lokasi='"+this.app._lokasi+"' "+
									   "		  group by no_dokumen)b on a.no_spk=b.no_dokumen "+
									   "where (a.total-a.ppn) >isnull(b.nilai_ba,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);		
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";
				this.sg2.validasi();																
				
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						var j = i+1;					
						if (nilaiToFloat(this.sg4.cells(5,i)) < nilaiToFloat(this.sg4.cells(6,i)) ) {
							system.alert(this,"Transaksi tidak valid.","Jumlah Barang PO/SPK kurang dari barang yang diterima.(Tab Data Barang - Baris : "+j+")");
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
					sql.add("update fa_asset set progress='1',catatan='-' where catatan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
			this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a "+
							   "left join (select no_dokumen,sum(nilai_curr) as nilai_ba "+
							   "		  from hutang_m where modul='LOGBAST' and kode_lokasi='"+this.app._lokasi+"' "+
							   "		  group by no_dokumen)b on a.no_spk=b.no_dokumen "+
							   "where (a.total-a.ppn)>isnull(b.nilai_ba,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);		
			this.doClick();		
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_spk && this.cb_spk.getText() != "" && this.stsSimpan ==1 ) {
			var strSQL = "select b.kode_vendor,b.nama,b.alamat,a.kode_curr,a.kurs "+
						 "from log_spk_m a "+
						 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_spk='"+this.cb_spk.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.cb_vendor.setText(line.kode_vendor,line.nama);
					this.e_alamat.setText(line.alamat);					
					this.e_curr.setText(line.kode_curr);
					if (this.stsSimpan == 1) this.e_kurs.setText(floatToNilai(line.kurs));
				}
			}
			
			var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kode_akun,b.total "+
						 "from log_terima_m a inner join ( "+
						 "		select no_baps,kode_akun,sum(nilai_curr) as total  "+
						 "		from fa_asset where catatan='-' group by kode_akun,no_baps) b on a.no_terima=b.no_baps "+
						 "where a.no_po='"+this.cb_spk.getText()+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg2.appendData(["APP",line2.no_terima,line2.tgl,line2.keterangan,line2.kode_akun,floatToNilai(line2.total)]);
				}
			} else this.sg2.clear(1);	
			
			var strSQL = "select a.no_spk+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga+a.ppn as harga,a.jumlah,isnull(d.jml_terima,0) as jum_terima,bb.kode_akun,c.kode_klpfa,c.nama as nama_klpfa,c.jenis "+
			             "from log_spk_d a inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi "+
						 
						 "                 inner join log_tap_m aa on b.no_spk=aa.no_spk "+
						 "				   inner join log_spph_m xx on xx.no_spph=aa.no_spph and xx.kode_lokasi=aa.kode_lokasi "+
						 "				   inner join log_pesan_m xxx on xxx.no_spph=xx.no_spph and xx.kode_lokasi=xxx.kode_lokasi "+						 
						 "                 inner join fa_klp c on a.kode_klpfa = c.kode_klpfa and a.kode_lokasi=c.kode_lokasi and c.kode_klpakun=xxx.kode_akun "+						
						 "                 inner join log_pesan_m bb on aa.no_spph=bb.no_spph and aa.kode_lokasi=bb.kode_lokasi "+						 

						 "                 left join  (select id_pesan,no_po,count(no_fa) as jml_terima "+
						 "							   from fa_asset where no_po='"+this.cb_spk.getText()+"' and catatan='-' "+
						 "							   group by id_pesan,no_po "+
						 "							  ) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk "+

						 "where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and isnull(d.jml_terima,0) > 0 "+
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
		if (sender == this.e_curr) {				
			if (this.e_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); 
				this.e_kurs.setText("1"); 
			}
			else {
				if (this.stsSimpan == 1) {
					var strSQL = "select kurs from gr_kurs where kode_curr ='"+this.e_curr.getText()+"' and ('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) ";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
						else this.e_kurs.setText("0");					
					}
				}
				this.e_kurs.setReadOnly(false); 				
			}
		}

		if((sender == this.e_kurs || sender == this.e_total) && this.e_kurs.getText()!="" && this.e_total.getText()!="") {
			var totIDR = nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.e_total.getText());
			this.e_totalidr.setText(floatToNilai(totIDR));
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg2.clear(1); this.sg3.clear(1); 
				this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a "+
								   "left join (select no_dokumen,sum(nilai_curr) as nilai_ba "+
								   "		  from hutang_m where modul='LOGBAST' and kode_lokasi='"+this.app._lokasi+"' "+
								   "		  group by no_dokumen)b on a.no_spk=b.no_dokumen "+
								   "where (a.total-a.ppn)>isnull(b.nilai_ba,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);		
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_m","no_hutang",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doChangeCell2: function(sender, col, row){
		try {			
			if (col == 0) this.sg2.validasi();					
		}catch(e)
		{
			alert(e);
		}
	},		
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(0,i) == "APP"){					
					tot += nilaiToFloat(this.sg2.cells(5,i));					
				}
			}

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
								this.nama_report="server_report_saku3_siaga_simlog_rptBast";
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
			this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a "+
							   "left join (select no_dokumen,sum(nilai_curr) as nilai_ba "+
							   "		  from hutang_m where modul='LOGBAST' and kode_lokasi='"+this.app._lokasi+"' "+
							   "		  group by no_dokumen)b on a.no_spk=b.no_dokumen "+
							   "where (a.total-a.ppn)>isnull(b.nilai_ba,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);		
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.kode_vendor+' - '+b.nama as vendor,a.nilai "+
					 "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='LOGBAST'";		

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
				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select keterangan,no_dokumen,tanggal,kode_vendor,akun_hutang,kode_pp, kode_curr,kurs "+
							 "from hutang_m "+							 
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.cb_spk.setSQL("select no_spk, keterangan from log_spk_m where no_spk='"+line.no_dokumen+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);		
						this.cb_spk.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.cb_akun.setText(line.akun_hutang);		
						this.e_curr.setText(line.kode_curr);										
						this.e_kurs.setText(floatToNilai(line.kurs));

					}
				}	
				
				
				var strSQL = "select ref1 "+
							 "from gr_pb_m "+							 
							 "where ref1 = '"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";								 				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						setTipeButton(tbAllFalse);
						system.alert(this,"SPK sudah pernah di buat PB.","Tidak dapat dikoreksi");		
					} 
					else setTipeButton(tbUbahHapus);
				}
				
				
				var strSQL = "select b.kode_vendor,b.nama,b.alamat "+
							 "from log_spk_m a "+
							 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_vendor.setText(line.kode_vendor,line.nama);
						this.e_alamat.setText(line.alamat);						
					}
				}
				
				var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kode_akun,b.total "+
							 "from log_terima_m a inner join ( "+
							 "		select no_baps,kode_akun,sum(nilai_curr) as total  "+
							 "		from fa_asset where catatan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_akun,no_baps) b on a.no_terima=b.no_baps "+
							 "where a.no_po='"+this.cb_spk.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg2.appendData(["APP",line2.no_terima,line2.tgl,line2.keterangan,line2.kode_akun,floatToNilai(line2.total)]);
					}
				} else this.sg2.clear(1);									

				var strSQL = "select a.no_spk+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga+a.ppn as harga,a.jumlah,isnull(d.jml_terima,0) as jum_terima,bb.kode_akun,c.kode_klpfa,c.nama as nama_klpfa,c.jenis "+
							 "from log_spk_d a inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi "+
							 
							 "                 inner join log_tap_m aa on b.no_spk=aa.no_spk "+
							 "				   inner join log_spph_m xx on xx.no_spph=aa.no_spph and xx.kode_lokasi=aa.kode_lokasi "+
							 "				   inner join log_pesan_m xxx on xxx.no_spph=xx.no_spph and xx.kode_lokasi=xxx.kode_lokasi "+						 
							 "                 inner join fa_klp c on a.kode_klpfa = c.kode_klpfa and a.kode_lokasi=c.kode_lokasi and c.kode_klpakun=xxx.kode_akun "+						
							 "                 inner join log_pesan_m bb on aa.no_spph=bb.no_spph and aa.kode_lokasi=bb.kode_lokasi "+						 
	
							 "                 left join  (select id_pesan,no_po,count(no_fa) as jml_terima "+
							 "							   from fa_asset where no_po='"+this.cb_spk.getText()+"' and catatan='"+this.e_nb.getText()+"' "+
							 "							   group by id_pesan,no_po "+
							 "							  ) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk "+
	
							 "where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and isnull(d.jml_terima,0) > 0 "+
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
		} catch(e) {alert(e);}
	}
});