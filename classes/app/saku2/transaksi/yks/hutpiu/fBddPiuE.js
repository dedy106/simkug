window.app_saku2_transaksi_yks_hutpiu_fBddPiuE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fBddPiuE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fBddPiuE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian BDD Kapitasi: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti KB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_debet = new saiLabelEdit(this,{bound:[790,16,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[790,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
						
		this.pc1 = new pageControl(this,{bound:[20,20,990,310], childPage:["Data Billing","Detail Billing","Detail Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
				colTitle:["Status","No Bill","Tanggal","Keterangan","Total BP","Total Kunj","Total CS"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,370,80,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],				
				change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100,70]],
				colFormat:[[14,15,16],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager"]});				
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[930,5,100,25],caption:"Preview",selected:false});

		this.rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
												
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_hutpiu_fBddPiuE.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fBddPiuE.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
										
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
					this.sg.clear(1); this.sg1.clear(1);  this.sg2.clear(1); 
					setTipeButton(tbHapus);
				break;						
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					//sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and modul='KAPITASI' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update yk_bill_m set no_valid='-',no_kasres='-',progress ='0' where no_kasres='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_m set no_valid='-',progress ='0' where no_valid='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update yk_bill_d set no_piutang='-',no_valid='-',no_hutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_d set no_piutang='-',no_valid='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_ju, keterangan from ju_m "+
			                 "where jenis = 'KAPITASI' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.jenis,a.nik_buat,b.nama as nama_buat,a.nik_setuju,c.nama as nama_app "+
			           "from ju_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+					   
					   "where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_setuju,line.nama_app);					
				} 
			}
			var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai,b.total_kunj,b.total_cs,a.jenis "+
			             "from yk_bill_m a left join yk_billkunj_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_valid='"+this.e_nb.getText()+"' and a.jenis = 'KAPITASI' and a.progress = '1' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_bill,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.total_kunj),floatToNilai(line.total_cs)]);
				}
			} else this.sg.clear(1);			
			this.sg1.validasi();	

			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
						"            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+						
						"where  a.no_ju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.nama_drk]);
				}
			} else this.sg2.clear(1);
			this.sg2.validasi();
			
		}		
	},	
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear();
			this.sg2.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD = totD + nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC = totC + nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.loker_valid,a.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
					     "from yk_bill_d a "+
						 "where a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.loker_valid,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doJurnal:function(sender){		
		if (this.cb_akun.getText() != "" && this.e_ket.getText()!="") {			
			var nobukti = "";
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
					nobukti += ",'"+this.sg.cells(1,i)+"'";
				}
			}
			nobukti = nobukti.substr(1);
			if (nobukti == "") nobukti = "''";
			
			var strSQL = "select b.nama as ket,"+
						"       case f.jenis when 'PENSIUN' then b.akun_cc "+
						"                    when 'PEGAWAI' then b.akun_bp "+
						"                    when 'GROUP' then b.akun_ap "+
						"                    when 'MITRA' then b.akun_mitra "+
						"       end as kode_akun,d.nama as nama_akun,'D' as dc,"+
						"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
						"from yk_bill_d a  "+
						"           inner join cust f on a.loker=f.kode_cust "+
						"  			inner join yk_bill_m c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi "+
						"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
						"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
						"                             			          when 'PEGAWAI' then b.akun_bp "+
						"                             				      when 'GROUP' then b.akun_ap "+
						"                                                 when 'MITRA' then b.akun_mitra "+
						"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
						"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.no_bill in ("+nobukti+") and c.kode_lokasi='"+this.app._lokasi+"' "+
						"group by b.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
						"                             when 'PEGAWAI' then b.akun_bp "+
						"                             when 'GROUP' then b.akun_ap "+
						"                             when 'MITRA' then b.akun_mitra "+
						"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+													
						"union all "+
						
						//KUNJUNGAN	& PDPT					
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pku as kode_akun,d.nama as nama_akun,'D', "+
						"sum(a.umum) as nilai,'PIUKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.umum<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pku,d.nama,c.drk_kunj,e.nama "+												
						"union all "+						
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pkg as kode_akun,d.nama as nama_akun,'D', "+
						"sum(a.gigi) as nilai,'PIUKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pkg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.gigi<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pkg,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pkb as kode_akun,d.nama as nama_akun,'D', "+
						"sum(a.kbia) as nilai,'PIUKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pkb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.kbia<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pkb,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pmk as kode_akun,d.nama as nama_akun,'D', "+
						"sum(a.matkes) as nilai,'PIUKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pmk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pmk,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'C', "+
						"sum(a.umum) as nilai,'PDPTKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.umum<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_kg as kode_akun,d.nama as nama_akun,'C', "+
						"sum(a.gigi) as nilai,'PDPTKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_kg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.gigi<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_kg,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_kb as kode_akun,d.nama as nama_akun,'C', "+
						"sum(a.kbia) as nilai,'PDPTKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_kb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.kbia<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_kb,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_mk as kode_akun,d.nama as nama_akun,'C', "+
						"sum(a.matkes) as nilai,'PDPTKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_mk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_mk,d.nama,c.drk_kunj,e.nama "+
						"union all "+
						
						//CS						
						"select 'TTP CS '+c.nama as ket,c.akun_hutcs as kode_akun,d.nama as nama_akun,'D', "+
						"sum(a.cs) as nilai,'HUTCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_hutcs,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PIU CS '+c.nama as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'C', "+
						"sum(a.cs) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
						
						"order by kode_akun";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk]);
				}
			}
			var bp=cc=0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.cells(5,i) == "BP") bp+=nilaiToFloat(this.sg2.cells(4,i));
				if (this.sg2.cells(5,i) == "CC") cc+=nilaiToFloat(this.sg2.cells(4,i));
			}
			this.sg2.appendData([this.cb_akun.getText(),this.cb_akun.rightLabelCaption,"C",this.e_ket.getText(),floatToNilai(bp),"KBBP","-","-"]);
			this.sg2.appendData([this.cb_akun.getText(),this.cb_akun.rightLabelCaption,"C",this.e_ket.getText(),floatToNilai(cc),"KBCC","-","-"]);
			
			this.sg2.validasi();
			this.pc1.setActivePage(this.pc1.childPage[2]);
		} 
		else system.alert(this,"Akun Kapitasi dan Deskripsi harus diisi.","Akun Kapitasi dan Deskripsi tidak valid.");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1);  this.sg2.clear(1); 
			setTipeButton(tbHapus);
		} catch(e) {
			alert(e);
		}
	}
});