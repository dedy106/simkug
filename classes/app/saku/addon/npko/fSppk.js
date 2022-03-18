window.app_saku_addon_npko_fSppk = function(owner)
{
	if (owner)
	{
		window.app_saku_addon_npko_fSppk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_addon_npko_fSppk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPP NPKO: Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode SPP",mustCheck: true});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No SPP",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBBL(this,{bound:[720,13,200,20],caption:"No NPKO Lama",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.iShow = new portalui_imageButton(this,{bound:[920,13,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doClick"]});						
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"Kepada", maxLength:100,tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,500,20],caption:"Untuk Pembayaran", maxLength:150,tag:1});						
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],date:new Date().getDateStr()});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,11,200,20],caption:"Nilai NPKO",tipeText:ttNilai,readOnly: true, tag:1,change:[this,"doChange"]});
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_tambah = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai Tambah",tipeText:ttNilai,readOnly: true, tag:1,change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_pot = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Potongan",tipeText:ttNilai,readOnly: true, tag:1,change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Lokasi PP",btnClick:[this,"doBtnClick"],tag:2,readOnly:true});		
		this.bTampil = new portalui_button(this,{bound:[620,18,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_spp = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai SPP",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,150],caption:"Daftar Pengajuan NPKO"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,125],colCount:7,tag:2,
					colTitle:["Status","No NPKO","Lingkup Pekerjaan","Waktu","Nilai NPKO","Direncanakan","Disetujui"],
					colWidth:[[0,1,2,3,4,5,6],[60,120,300,70,100,100,100]],colFormat:[[4],[cfNilai]], 
					buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6],[0]],change:[this,"doChangeCell"],
					autoAppend:false,defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.p2 = new portalui_panel(this,{bound:[20,30,900,140],caption:"Daftar Item Jurnal Tambahan"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,100],colCount:5,tag:3,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai"],
					colWidth:[[0,1,2,3,4],[100,200,400,50,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3],[bsEllips,bsAuto]], 
					picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],ellipsClick:[this,"doEllipseClick2"],
					columnReadOnly:[true,[1],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,115,900,25],buttonStyle:2,grid:this.sg2});		
		
		this.p3 = new portalui_panel(this,{bound:[20,30,900,200],caption:"Daftar Detail Akun Pengajuan NPKO"});
		this.sg3 = new portalui_saiTable(this.p3,{bound:[1,20,895,175],tag:"3"});		
					
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.sg.onDblClick.set(this,"dblClick");
			
			var prd = this.dbLib.getDataProvider("select distinct periode from spb_m where kode_lokasi = '"+this.app._lokasi+"' and jenis = 'NPKO' and progress='0' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
						
			this.cb_buat.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],true);
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			this.e_tambah.setText("0"); this.e_pot.setText("0"); this.e_nilai.setText("0");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_addon_npko_fSppk.extend(window.portalui_childForm);
window.app_saku_addon_npko_fSppk.implement({
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
					sql.add("update npko_m set progress='0' where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)){
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPP"+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add(" update spb_m set no_del='"+this.e_nb.getText()+"' where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add(" delete from spb_m where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add(" delete from spb_j where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						this.nb = this.cb_nbLama.getText();
					}
					var total = nilaiToFloat(this.e_spp.getText());
					sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,"+
							"keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
							"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+
							"','-','"+this.e_desc.getText()+"','-','IDR',1,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-','"+this.app._lokasi+"','"+this.cb_pp.getText()+
							"','SPP','NPKO',"+total+",0,0,'X','0','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',now())");					
					sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
							" select '"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',no_urut,kode_akun,'"+this.e_desc.getText()+"','D',nilai,kode_pp,kode_drk,kode_lokasi,'SPP','NPKO','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now() "+ 
							" from npko_d where no_npko = '"+this.npko+"' and kode_lokasi ='"+this.app._lokasi+"'");
					var idx = 1000;
					var scr1 = "insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var baris1 = true; var vData = false;
					for (var i=0; i < this.sg2.rows.getLength(); i++){
						if (this.sg2.rowValid(i)) {
							vData = true;
							if (!baris1) { scr1 += ",";}	
							scr1 += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg2.getCell(0,i)+
									"','"+this.sg2.getCell(2,i)+"','"+this.sg2.getCell(3,i)+"',"+parseNilai(this.sg2.getCell(4,i))+",'"+this.app._kodePP+"','-',"+
									"'"+this.app._lokasi+"','SPP','ADD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							baris1 = false;
							idx++;
						}
					}	
					if (vData) sql.add(scr1);
					sql.add("update npko_m set progress='1',no_spb='"+this.nb+"' where no_npko='"+this.npko+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
					this.standarLib.clearByTag(this, new Array("1","3"),this.e_nb);		
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clearAll();
				}
				break;
			case "ubah" :
                this.sg2.validasi();
				if ((new Date()).strToDate(this.dp_d1.getDate())  > (new Date()).strToDate(this.dp_d2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal SPP melebihi Tgl Jatuh Temponya.");
					return false;
				}
				if (nilaiToFloat(this.e_spp.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai SPP tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				var idx = 0;
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)) {
						if (this.sg.cells(0,i)=="APP") idx++;
					}
					if (idx > 1) {
						system.alert(this,"Transaksi tidak valid.","Status 'APP' lebih dari satu.");
						return false;   
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
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :
			try{	
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				sql.add("update npko_m set progress='0' where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				if (parseFloat(this.perLama) < parseFloat(this.app._periode)){
					sql.add(" update spb_m set no_del = 'DEL' where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}
				else{
					sql.add(" delete from spb_m where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from spb_j where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e) { alert(e) }
			break;
		}
	},
	doClick:function(sender){
		if (sender == this.iShow) {
			var data = this.dbLib.getDataProvider("select a.periode,a.posted,a.tanggal,a.due_date,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nik_buat,c.nama as nama_buat,a.nik_setuju,d.nama as nama_setuju, "+
												  "       z.no_npko,z.lingkup,date_format(z.tanggal,'%d/%m/%Y') as tgl,z.nilai,concat(z.nik_buat,'-',x.nama) as nm_buat,concat(z.nik_app,'-',y.nama) as nm_app "+
												  "from spb_m a  inner join npko_m z on z.no_spb=a.no_spb and a.kode_lokasi=z.kode_lokasi "+
												  "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
												  "              inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
												  "              inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi "+
												  "              inner join karyawan x on z.nik_buat=x.nik and a.kode_lokasi=x.kode_lokasi "+
												  "              inner join karyawan y on a.nik_setuju=y.nik and a.kode_lokasi=y.kode_lokasi "+
												  "where a.no_spb='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_npko,line.lingkup,line.tgl,floatToNilai(line.nilai),line.nm_buat,line.nm_app]);
				}
				this.perLama = line.periode;
				this.posted = line.posted;
				this.e_periode.onChange.set(undefined);
				this.dp_d1.setText(line.tanggal);
				this.dp_d2.setText(line.due_date);
				this.cb_pp.setText(line.kode_pp,line.nama_pp);
				this.cb_buat.setText(line.nik_buat,line.nama_buat);
				this.cb_app.setText(line.nik_setuju,line.nama_setuju);
				this.e_dok.setText(line.no_dokumen);
				this.e_desc.setText(line.keterangan);
				this.e_periode.onChange.set("doChange");
			}
			this.sg.validasi();			
			
			var data = this.dbLib.getDataProvider("select a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai "+
												  "from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where a.no_spb='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='ADD' ");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc,floatToNilai(line.nilai)]);
				}
			}
			this.sg2.validasi();			
		}
		else {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPP"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_dok.setFocus();
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode) || (sender == this.cb_pp)) this.sg.clear(1);
		if ((sender == this.e_nilai) || (sender == this.e_tambah) || (sender == this.e_pot)) {
			if (this.e_nilai.getText()!="" && this.e_pot.getText()!="" && this.e_tambah.getText()!="") {
				this.e_spp.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())+nilaiToFloat(this.e_tambah.getText())-nilaiToFloat(this.e_pot.getText())));
			}
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_pp.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_npko,a.lingkup,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nilai,concat(a.nik_buat,'-',b.nama) as nama_buat,concat(a.nik_app,'-',c.nama) as nama_app "+
				                                      "from npko_m a inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
													  "              inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
													  "where a.progress='0' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'");
		 
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["INPROG",line.no_npko,line.lingkup,line.tanggal,floatToNilai(line.nilai),line.nama_buat,line.nama_app]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Lokasi PP tidak valid.","Lokasi PP harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	dblClick: function(sender, col , row){
		try{			
			if (this.sg.getCell(1,row) != ""){
				this.sg3.setColTitle(new Array("No","Kode Akun","Nama Akun","Kegiatan","Nilai","Sisa Gar","Gar Bln","Gar Thn"));				
				var data = this.dbLib.runSQL(" select a.kode_akun,b.nama,concat(a.kode_drk,'-',c.nama) as drk,a.nilai,a.gar_sd,a.gar_bulan,a.gar_tahun "+
											 "	from npko_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											 "	              inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun=substring(a.periode,1,4) "+
											 "	where a.no_npko='"+this.sg.getCell(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by no_urut");
				this.sg3.clearAll();
				this.sg3.setData(data);
			}
			else system.alert(this,"No NPKO tidak valid.","Baris harus dipilih dgn No NPKO yang valid.");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
				this.standarLib.showListData(this, "Daftar Bukti SPP NPKO",sender,undefined, 
											  "select no_spb, keterangan  from spb_m where progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and jenis='NPKO'", 
											  "select count(no_spb)       from spb_m where progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and jenis='NPKO'",
											  ["no_spb","keterangan"],"and",["No SPP","Keterangan"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);this.sg2.clear(1);this.sg3.clearAll();
			}
			if (sender == this.cb_buat) {   
			    this.standarLib.showListData(this, "Dibuat Oleh",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Disetujui Oleh",sender,undefined, 
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
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			if (this.sg.getCell(0,row) == "APP") {
				this.npko = this.sg.cells(1,row);
				for (var i = 0;i < this.sg.getRowCount();i++){
					if ((this.sg.cells(0,i) == "APP") && (i != row)) this.sg.cells(0,i,"INPROG");
				}
			}
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "APP") && (this.sg.cells(4,i) != "")) {
				tot1 += nilaiToFloat(this.sg.cells(4,i));
			}
		}
		this.e_nilai.setText(floatToNilai(tot1));
	},
	doEllipseClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
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
	doChangeCell2: function(sender, col, row){
	   try{
            if ((col == 3 || col == 4) && (this.sg2.getCell(4,row) != "")) sender.validasi();
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
            sender.onChange.set(this,"doChangeCell2");
        }catch(e){
            sender.onChange.set(this,"doChangeCell2");
        }
    },
	doNilaiChange2: function(){
		try{
			var tot1 = tot2 = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(4,i) != ""){
					if (this.sg2.getCell(3,i).toUpperCase() == "D") tot1 += nilaiToFloat(this.sg2.getCell(4,i));			
					if (this.sg2.getCell(3,i).toUpperCase() == "C") tot2 += nilaiToFloat(this.sg2.getCell(4,i));			
				}
			}
			this.e_tambah.setText(floatToNilai(tot1));
			this.e_pot.setText(floatToNilai(tot2));
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
	}	
});