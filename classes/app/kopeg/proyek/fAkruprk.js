window.app_kopeg_proyek_fAkruprk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_proyek_fAkruprk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_proyek_fAkruprk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tagihan Piutang Kontrak: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});				
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No Dokumen", maxLength:100});		
		this.e_fp = new portalui_saiLabelEdit(this,{bound:[320,14,250,20],caption:"No Faktur Pajak", maxLength:30, tag:9});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,550,20],caption:"Keterangan", maxLength:150});								
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Png Jawab",btnClick:[this,"doBtnClick"],tag:2});						
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"PP/Unit Kerja",readOnly:true,change:[this,"doChange"],tag:2});								
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Customer",readOnly:true,change:[this,"doChange"],tag:2});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Piutang",tipeText:ttNilai,tag:1,text:"0",change:[this,"doOnChange"],readOnly:true});
		this.cb_proyek = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"No Kontrak",readOnly:true,change:[this,"doChange"],tag:1});
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai PPh",tipeText:ttNilai,tag:1,text:"0"});
		this.b_pph = new portalui_imageButton(this,{bound:[920,18,20,20],hint:"Hitung PPh",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
		this.e_proyek = new portalui_saiLabelEdit(this,{bound:[20,19,200,20],caption:"Nilai Kontrak",tipeText:ttNilai,tag:1,text:"0",readOnly:true});
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[720,19,200,20],caption:"Nilai PPN",tipeText:ttNilai,tag:1,text:"0",change:[this,"doOnChange"]});
		this.b_ppn = new portalui_imageButton(this,{bound:[920,19,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
		this.e_saldo = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Saldo Kontrak",tipeText:ttNilai,tag:1,text:"0",readOnly:true});
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,20,200,20],caption:"Total Tagihan",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,280],caption:"Daftar Item Jurnal Tagihan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,233],colCount:9,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,100,200,50,100,60,100,60,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					picklist:[[3],[new portalui_arrayMap({items:["C","D"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1,6,8],[0]],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,255,900,25],buttonStyle:2,grid:this.sg});		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_arproyek_m where kode_lokasi = '"+this.app._lokasi+"' and progress_fp = '0'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'PPNK' and kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PPNK") this.akunPPN = line.flag;
				}
			}
			
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);		
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_proyek_fAkruprk.extend(window.portalui_childForm);
window.app_kopeg_proyek_fAkruprk.implement({
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
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_nb.setTag("0");
			else this.e_nb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_arproyek_m','no_ar',this.app._lokasi+"-PRO"+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add(" update kop_arproyek_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_ar,'r') where no_ar ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_arproyek_m (no_ar,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input,no_proyek,nilai_ppn,nilai_pph,kode_cust,dc,no_fp,progress_fp) "+
							    " select concat(no_ar,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,jenis,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,nik_app,'F',kurs,kode_curr,akun_ar,'X',no_ar,'-','"+this.app._userLog+"',now(),no_proyek,nilai_ppn,nilai_pph,kode_cust,'C',no_fp,progress_fp "+
								" from kop_arproyek_m where no_ar = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_arproyek_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_ar,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_arproyek_j where no_ar = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_arproyek_m where no_ar='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_arproyek_j where no_ar='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}
					sql.add("insert into kop_arproyek_m (no_ar,no_proyek,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input,nilai_ppn,nilai_pph,kode_cust,dc,no_fp,progress_fp)  values "+
							"('"+this.nb+"','"+this.cb_proyek.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'ARPR','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','F',1,'IDR','"+this.akunAR+"','0','-','-','"+this.app._userLog+"',now(),"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_pph.getText())+",'"+this.cb_cust.getText()+"','D','"+this.e_fp.getText()+"','0')");
					
					var totAR = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()); 
					sql.add("insert into kop_arproyek_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunAR+"','"+this.e_desc.getText()+"','D',"+totAR+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','ARPR','AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					if (this.e_ppn.getText() != "0") {
						sql.add("insert into kop_arproyek_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							    "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_ppn.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','ARPR','PPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					}
					var idx = 1;
					for (var i=0; i < this.sg.rows.getLength(); i++){			
						if (this.sg.rowValid(i)){
							idx++;
							sql.add("insert into kop_arproyek_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							        "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','ARPR','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
						}
					}
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "ubah" :
				this.sg.validasi();
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tagihan tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.perLama) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_arproyek_m set no_del = concat(no_ar,'r') where no_ar ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_arproyek_m (no_ar,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input,no_proyek,nilai_ppn,nilai_pph,kode_cust,dc,no_fp,progress_fp) "+
							    " select concat(no_ar,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,jenis,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,nik_app,'F',kurs,kode_curr,akun_ar,'X',no_ar,'-','"+this.app._userLog+"',now(),no_proyek,nilai_ppn,nilai_pph,kode_cust,'C',no_fp,progress_fp "+
								" from kop_arproyek_m where no_ar = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_arproyek_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_ar,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_arproyek_j where no_ar = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					}
					else{
						sql.add("delete from kop_arproyek_m where no_ar='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_arproyek_j where no_ar='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doHitungClick: function(sender){
		if (sender == this.b_pph) {
			if (this.e_nilai.getText() != "" && this.e_pph.getText() != "")
				this.e_pph.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_pph.getText())/100)));
		}
		if (sender == this.b_ppn) {
			if (this.e_nilai.getText() != "" && this.e_ppn.getText() != "")
				this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_ppn.getText())/100)));
		}
	},

	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_arproyek_m','no_ar',this.app._lokasi+"-PRO"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_proyek) {
			var data = this.dbLib.getDataProvider("select a.akun_ar,a.nilai,a.nilai-ifnull(b.tottagih,0) as saldo "+
												  "from kop_proyek_m a "+
												  "     left outer join (select no_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tottagih "+
												  "                      from kop_arproyek_m where no_ar<> '"+this.cb_nbLama.getText()+"' and no_proyek='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_proyek,kode_lokasi) b on a.no_proyek=b.no_proyek and a.kode_lokasi=b.kode_lokasi "+
												  "where a.no_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
	 
				eval("data = "+data+";");
				if (typeof data == "object"){
				var line = data.rs.rows[0];
				this.akunAR = line.akun_ar;
				this.e_proyek.setText(floatToNilai(line.nilai));
				this.e_saldo.setText(floatToNilai(line.saldo));
				}
		}
	},
	doLoadData:function(sender) {
		if (this.cb_nbLama.getText() != ""){
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.kode_pp,c.nama as nama_pp,a.nik_app,d.nama as nama_app,a.kode_cust,e.nama as nama_cust,a.nilai_ppn,a.nilai_pph,a.periode,a.posted,a.no_proyek,aa.no_dokumen as nodok,a.tanggal,a.no_fp, "+
												  "       x.kode_akun,y.nama as nama_akun,x.keterangan as ket,x.dc,x.nilai,x.kode_pp as kdpp,ifnull(z.nama,'-') as namapp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
												  "from kop_arproyek_m a inner join kop_proyek_m aa on a.no_proyek=aa.no_proyek and a.kode_lokasi=aa.kode_lokasi   "+
												  "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												  "                inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
												  "                inner join cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
												  "                inner join kop_arproyek_j x on a.no_ar=x.no_ar and a.kode_lokasi=x.kode_lokasi and x.jenis = 'PDPT' "+
												  "                inner join masakun y on x.kode_akun=y.kode_akun and y.kode_lokasi=x.kode_lokasi "+
												  "                left outer join pp z on x.kode_pp=z.kode_pp and z.kode_lokasi=x.kode_lokasi "+
												  "                left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring(x.periode,1,4) "+
												  "where a.no_ar='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
			
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.ket,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kdpp,line.namapp,line.kode_drk,line.nama_drk]);
				}
				this.perLama = line.periode;
				this.posted = line.posted;
				this.dp_d1.setText(line.tanggal);
				this.e_periode.setText(line.periode);
				this.e_dok.setText(line.no_dokumen);
				this.e_fp.setText(line.no_fp);
				this.e_desc.setText(line.keterangan);
				this.cb_pp.setText(line.kode_pp,line.nama_pp);
				this.cb_app.setText(line.nik_app,line.nama_app);
				this.cb_cust.setText(line.kode_cust,line.nama_cust);
				this.cb_proyek.setText(line.no_proyek,line.nodok);
				this.e_ppn.setText(floatToNilai(line.nilai_ppn));
				this.e_pph.setText(floatToNilai(line.nilai_pph));
			}
			this.sg.validasi();
		}	
	},
	doOnChange:function(sender){
		if (this.e_nilai.getText() != "" && this.e_ppn.getText() != "") {
			var tot = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
			this.e_tot.setText(floatToNilai(tot));
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti",sender,undefined, 
											  "select no_ar,no_dokumen from kop_arproyek_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress = '0' and progress_fp = '0'", 
											  "select count(no_ar)     from kop_arproyek_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress = '0' and progress_fp = '0'", 
											  ["no_ar","no_dokumen"],"and",["No Bukti","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Penanggungjawab",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun Pendapatan",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",
												  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Anggaran",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.app._periode.substr(0,4)+"%' and b.kode_pp = '"+this.sg.getCell(5,row)+"' and b.kode_akun='"+this.sg.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.app._periode.substr(0,4)+"%' and b.kode_pp = '"+this.sg.getCell(5,row)+"' and b.kode_akun='"+this.sg.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode Anggaran","Deskripsi"),true);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 3 || col == 4) && (this.sg.getCell(4,row) != "")){
			this.sg.validasi();
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			var akun = this.dataAkun.get(sender.cells(0,row));
			if(akun)
				sender.cells(1,row,akun);
			else {                                    
				if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
				sender.cells(0,row,"");
				sender.cells(1,row,"");
			}
		}
		if (col == 5) {
			var pp = this.dataPP.get(sender.cells(5,row));
			if (pp) sender.cells(6,row,pp);
			else sender.cells(6,row,"-");
		}
	    if (col == 7) {
		   var drk = this.dataDRK.get(sender.cells(7,row));
		   if (drk) sender.cells(8,row,drk);
		   else sender.cells(8,row,"-");
		}
		sender.onChange.set(this,"doChangeCell");
	},
	doNilaiChange: function(){
		try
		{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(4,i) != ""){
					if (this.sg.getCell(3,i).toUpperCase() == "C") tot += nilaiToFloat(this.sg.getCell(4,i));			
					if (this.sg.getCell(3,i).toUpperCase() == "D") tot = tot - nilaiToFloat(this.sg.getCell(4,i));			
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
							this.dataDRK = new portalui_arrayMap();
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }
                            if (result.result[2]){
	    			            var line;
	    			            for (var i in result.result[2].rs.rows){
	    			                line = result.result[2].rs.rows[i];
	    			                this.dataDRK.set(line.kode_drk, line.nama);
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
	}	
});