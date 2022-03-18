window.app_patra_piutang_fKbPiutangE = function(owner)
{
	if (owner)
	{
		window.app_patra_piutang_fKbPiutangE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_patra_piutang_fKbPiutangE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Piutang : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti KB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiLabelEdit(this,{bound:[20,22,202,20],caption:"Jenis", readOnly:true,tag:2});				
		this.e_gb = new saiLabelEdit(this,{bound:[20,13,202,20],caption:"No GB/Check", maxLength:30});		
		this.e_dok = new saiLabelEdit(this,{bound:[230,13,240,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});						
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.c_curr = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Curr", readOnly:true,tag:2});				
		this.e_kurs = new saiLabelEdit(this,{bound:[250,19,80,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});
		this.cb_cust = new saiCBBL(this,{bound:[20,16,200,20],caption:"Customer",readOnly:true});				
		this.cb_piutang = new saiCBBL(this,{bound:[20,17,220,20],caption:"No Bukti AR", readOnly:true});				
		this.e_totcurr = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Original", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_saldo = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Saldo Piutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kursar = new saiLabelEdit(this,{bound:[250,18,80,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_total = new saiLabelEdit(this,{bound:[700,18,220,20],caption:"Total Konvensi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.p1 = new panel(this,{bound:[20,23,900,240],caption:"Data Item Pelunasan"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:6,tag:0,
		            colTitle:["Jenis","Kode Akun","Nama Akun","Keterangan","DC","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,60,300,200,100,80]],					
					columnReadOnly:[true,[0,2],[1,3,4,5]],
					buttonStyle:[[0,1,4],[bsAuto,bsEllips,bsAuto]], 
					colFormat:[[5],[cfNilai]],
					picklist:[[0,4],[new portalui_arrayMap({items:["AR","PPH","ADM"]}),new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});						
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);									
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
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('ADMBANK','PPPH23','LBKURS','RGKURS','CFSK','CFAR') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "LBKURS") this.lbKurs = line.flag;
					if (line.kode_spro == "RGKURS") this.rgKurs = line.flag;
					if (line.kode_spro == "CFSK") this.cfSK = line.flag;
					if (line.kode_spro == "CFAR") this.cfAR = line.flag;					
					if (line.kode_spro == "PPPH23") this.akunpph = line.flag;					
					if (line.kode_spro == "ADMBANK") this.akunadm = line.flag;					
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_patra_piutang_fKbPiutangE.extend(window.childForm);
window.app_patra_piutang_fKbPiutangE.implement({
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
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from patra_kaspiutang_d where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					var nilaikbar = Math.round(nilaiToFloat(this.e_kursar.getText()) * nilaiToFloat(this.e_totcurr.getText()));
					var nilaisk = Math.round((nilaiToFloat(this.e_kurs.getText()) - nilaiToFloat(this.e_kursar.getText())) * nilaiToFloat(this.e_totcurr.getText()));															
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.e_gb.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBAR','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_piutang.getText()+"','-','"+this.cb_cust.getText()+"')");										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaikbar+",'"+this.app._kodePP+"','-','"+this.cfAR+"','-','"+this.app._lokasi+"','KBAR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");										
					if (nilaisk != 0) {
						if (nilaisk > 0) {
							var dc = "C";
							var dcKB = "D";
							var akunSK = this.lbKurs;
						}
						else {
							var dc = "D";
							var dcKB = "C";
							var akunSK = this.rgKurs;
						}
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+dcKB+"',"+Math.abs(nilaisk)+",'"+this.app._kodePP+"','-','"+this.cfSK+"','-','"+this.app._lokasi+"','KBAR','KBSK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+akunSK+"','"+this.e_ket.getText()+"','"+dc+"',"+Math.abs(nilaisk)+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBAR','SK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					}
					if (this.sg.getRowValidCount() > 0){
						var j=nilaiidr = 0;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								j = i+3;
								nilaiidr = Math.round(nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.e_kursar.getText()));
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiidr+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBAR','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
								sql.add("insert into patra_kaspiutang_d(no_kas,kode_lokasi,periode,kode_cust,no_ar,jenis,nilai_curr,kode_akun,keterangan,dc) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_piutang.getText()+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(5,i))+",'"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"')");													
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
					setTipeButton(tbSimpan);
				break;
			case "ubah" :	
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (this.totAR > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total jenis AR tidak boleh melebihi saldonya.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0 || this.totAR <=0 ) {
					system.alert(this,"Transaksi tidak valid.","Total dan jenis AR tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from patra_kaspiutang_d where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select a.no_kas, a.keterangan from kas_m a "+
			                 "where a.modul = 'KBAR' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No KB","Deskripsi"],"and","Daftar Bukti KB",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {	
			this.e_gb.setFocus();
			var data = this.dbLib.getDataProvider("select a.akun_kb,d.nama as nama_kb,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.no_bg,a.keterangan,a.jenis,a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_app,a.no_link,a.kode_bank,a.kode_curr,a.kurs, "+
					   " (g.no_dokumen+'-'+g.keterangan) as ketpiu,f.nama as nama_cust "+
			           "from kas_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "	inner join masakun d on a.akun_kb=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+					   
					   "    inner join patra_cust f on a.kode_bank=f.kode_cust and a.kode_lokasi=f.kode_lokasi "+
					   "    inner join patra_ar_m g on a.no_link=g.no_ar and a.kode_lokasi=g.kode_lokasi "+
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);	
					this.e_gb.setText(line.no_bg);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.c_curr.setText(line.kode_curr);	
					this.e_kurs.setText(floatToNilai(line.kurs));	
					this.cb_akun.setText(line.akun_kb,line.nama_kb);					
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.cb_cust.setText(line.kode_bank,line.nama_cust);					
					this.cb_piutang.setText(line.no_link,line.ketpiu);					
				} 
			}
			var data = this.dbLib.getDataProvider("select a.akun_ar,a.kurs,(a.nilai_curr+a.ppn_curr) - isnull(b.bayar,0) as saldo from patra_ar_m a "+
								   " left join (select no_arref as no_ar,kode_lokasi,sum(nilai_curr+ppn_curr) as bayar from patra_ar_m where dc='C' group by no_arref,kode_lokasi "+
								   "            union "+
								   "            select no_ar,kode_lokasi,sum(nilai_curr) as bayar from patra_kaspiutang_d where jenis = 'AR' and no_kas <> '"+this.e_nb.getText()+"' group by no_ar,kode_lokasi) b on a.no_ar=b.no_ar and a.kode_lokasi=b.kode_lokasi "+
								   "where (a.nilai_curr+a.ppn_curr) > isnull(b.bayar,0) and a.no_ar='"+this.cb_piutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_saldo.setText(floatToNilai(line.saldo));
				this.e_kursar.setText(floatToNilai(line.kurs));
				this.akunar = line.akun_ar;
			}
			else {
				this.e_saldo.setText("0");
				this.e_kursar.setText("0");
				this.akunar = "-";
			}						
			var data = this.dbLib.getDataProvider(
			           "select a.jenis,a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai_curr "+
					   "from patra_kaspiutang_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.no_kas ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);						 
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.jenis,line.kode_akun,line.nama_akun,line.keterangan,line.dc,floatToNilai(line.nilai_curr)]);
				}
				this.sg.validasi();
			} else this.sg.clear(1);			
		}		
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}		
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 5 ) && (this.sg.cells(5,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) == "AR" ) this.sg.cells(1,row,this.akunar);
			if (this.sg.cells(0,row) == "PPH" ) this.sg.cells(1,row,this.akunpph);
			if (this.sg.cells(0,row) == "ADM" ) this.sg.cells(1,row,this.akunadm);
		}
		if (col == 1) {
			if (this.sg.cells(1,row) != "") {
				var akun = this.dataAkun.get(sender.cells(1,row));
				if (akun) sender.cells(2,row,akun);
				else {                                    
					if (trim(sender.cells(1,row)) != "") system.alert(this,"Kode Akun "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(1,row,"");
					sender.cells(2,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var tot1 = 0; this.totAR = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){					
					if (this.sg.cells(4,i) == "C") {
						tot1 += nilaiToFloat(this.sg.cells(5,i));											
						if (this.sg.cells(0,i) == "AR") this.totAR += nilaiToFloat(this.sg.cells(5,i));
					}
					if (this.sg.cells(4,i) == "D") {
						tot1 -= nilaiToFloat(this.sg.cells(5,i));
						if (this.sg.cells(0,i) == "AR") this.totAR -= nilaiToFloat(this.sg.cells(5,i));
					}					
				}
			}
			this.e_totcurr.setText(floatToNilai(tot1));			
			this.e_total.setText(floatToNilai(Math.round(tot1 * nilaiToFloat(this.e_kurs.getText()))));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 1){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
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
			this.sg.clear(1);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});