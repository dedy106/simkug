window.app_kopeg_pinjbrg_transaksi_fSetork = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_transaksi_fSetork.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_pinjbrg_transaksi_fSetork";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Setoran Angsuran Kredit: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Setoran",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Setoran Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});						
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penyetor",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Setoran",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,330],caption:"Daftar Angsuran Kredit"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,305],colCount:10,tag:2,colTitle:["Status","No Angsuran","Tanggal","Penerima","Keterangan","Periode","Piut. Temp.","Jenis","Nilai OE","Nilai Angsuran"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[70,90,70,80,180,60,60,60,80,100]],colFormat:[[8,9],[cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["SETOR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'PBRGST' and kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PBRGST") this.akunTAK = line.flag;
				}
			}
			*/
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_pbrgsetor_m where kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fSetork.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fSetork.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgsetor_m","no_setor",this.app._lokasi+"-SP"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_pbrgsetor_m set no_link = '"+this.e_nb.getText()+"',no_del = concat(no_setor,'r') where no_setor ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbrgsetor_m (no_setor,no_dokumen,keterangan,tanggal,nilai,modul,periode,kode_lokasi,nik_app,kode_curr,kurs,kode_pp,progress,no_del,no_link,nik_user,tgl_input,akun_tak,posted) "+
							    " select concat(no_setor,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,modul,'"+this.e_periode.getText()+"',kode_lokasi,nik_app,kode_curr,kurs,kode_pp,'X',no_setor,'-','"+this.app._userLog+"',now(),akun_tak,'X' "+
								" from kop_pbrgsetor_m where no_setor = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
						sql.add(" insert into kop_pbrgsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_setor,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pbrgsetor_j where no_setor = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_pbrgsetor_d (no_setor,no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,dc)"+
								" select concat(no_setor,'r'),no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,'C' "+ 
								" from kop_pbrgsetor_d where no_setor = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update kop_pbrgangs_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_angs and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrginv_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_inv and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrg_m a, kop_pbrgsetor_d b set a.progress_um ='0' where b.no_angs = a.no_pbrg and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");						
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_pbrgsetor_m where no_setor='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pbrgsetor_j where no_setor='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update kop_pbrgangs_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_angs and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrginv_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_inv and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrg_m a, kop_pbrgsetor_d b set a.progress_um ='0' where b.no_angs = a.no_pbrg and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("delete from kop_pbrgsetor_d where no_setor='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into kop_pbrgsetor_m(no_setor,no_dokumen,keterangan,tanggal,nilai,modul,periode,kode_lokasi,nik_app,kode_curr,kurs,kode_pp,progress,no_del,no_link,nik_user,tgl_input,akun_tak,posted) values  "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_tot.getText())+",'PBRG','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','IDR',1,'"+this.app._kodePP+"','0','-','-','"+this.app._userLog+"',now(),'-','X')"); //akun tak  <-------- "+this.akunTAK+"
					var idx = 0;
					/*
					sql.add("insert into kop_pbrgsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunTAK+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_tot.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','TAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					*/
					this.createJurnal();
					var d="insert into kop_pbrgsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var z = 0;
					for (var i in this.dataJurnal.rs.rows){
						line = this.dataJurnal.rs.rows[i];
						if (line.nilai != 0) {
							if (z >0) d+=",";
							idx++;
							d+="('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+line.kode_akun+"','"+this.e_desc.getText()+"','"+line.dc+"',"+line.nilai+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','PBRG','ANGS_AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							z++;
						}
					}
					sql.add(d);
					
					var s="insert into kop_pbrgsetor_d (no_setor,no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,dc) values ";
					var z = 0;
					var vAngs = false; var vInv = false; var vUm = false;
					var nopbrgangs = [];
					var nopbrginv = [];
					var nopbrgum = [];
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(0,i) == "SETOR") {
								if (z > 0) s+= ",";
								s+="('"+this.nb+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'"+this.app._lokasi+"','D')";
								z++;
								if (this.sg.cells(7,i) == "ANS") {vAngs = true; nopbrgangs.push("'"+this.sg.getCell(1,i)+"'");}
								if (this.sg.cells(7,i) == "INV") {vInv = true; nopbrginv.push("'"+this.sg.getCell(1,i)+"'");}
								if (this.sg.cells(7,i) == "UM") {vUm = true; nopbrgum.push("'"+this.sg.getCell(1,i)+"'");}
							}
						}
					}						
					sql.add(s);
					if (vAngs) sql.add("update kop_pbrgangs_m set progress ='1' where no_angs in ("+nopbrgangs+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (vInv) sql.add("update kop_pbrginv_m set progress ='1' where no_inv in ("+nopbrginv+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (vUm) sql.add("update kop_pbrg_m set progress_um ='1' where no_pbrg in ("+nopbrgum+") and kode_lokasi = '"+this.app._lokasi+"'");
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
				var cekData = "F";
				for (var i=0; i < this.sg.rows.getLength(); i++){
					if (this.sg.getCell(0,i) == "SETOR") cekData = "T";
				}
				if (cekData == "F"){
					system.alert(this,"Tidak ada transaksi yang disetor.","Pilih SETOR untuk approval di kolom status.");
					return false;
				}
				if (nilaiToFloat(this.e_tot.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai setoran tidak boleh kurang atau sama dengan nol.");
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
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_pbrgsetor_m set no_del = concat(no_setor,'r') where no_setor ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbrgsetor_m (no_setor,no_dokumen,keterangan,tanggal,nilai,modul,periode,kode_lokasi,nik_app,kode_curr,kurs,kode_pp,progress,no_del,no_link,nik_user,tgl_input,akun_tak,posted) "+
							    " select concat(no_setor,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,modul,'"+this.e_periode.getText()+"',kode_lokasi,nik_app,kode_curr,kurs,kode_pp,'X',no_setor,'-','"+this.app._userLog+"',now(),akun_tak,'X' "+
								" from kop_pbrgsetor_m where no_setor = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
						sql.add(" insert into kop_pbrgsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_setor,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pbrgsetor_j where no_setor = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_pbrgsetor_d (no_setor,no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,dc)"+
								" select concat(no_setor,'r'),no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,'C' "+ 
								" from kop_pbrgsetor_d where no_setor = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update kop_pbrgangs_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_angs and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrginv_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_inv and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrg_m a, kop_pbrgsetor_d b set a.progress_um ='0' where b.no_angs = a.no_pbrg and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
					}
					else{
						sql.add("delete from kop_pbrgsetor_m where no_setor='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pbrgsetor_j where no_setor='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update kop_pbrgangs_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_angs and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrginv_m a, kop_pbrgsetor_d b set a.progress ='0' where b.no_angs = a.no_inv and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("update kop_pbrg_m a, kop_pbrgsetor_d b set a.progress_um ='0' where b.no_angs = a.no_pbrg and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi = '"+this.app._lokasi+"' and b.no_setor='"+this.cb_nbLama.getText()+"' ");
						sql.add("delete from kop_pbrgsetor_d where no_setor='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgsetor_m","no_setor",this.app._lokasi+"-SP"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.nik_app,b.nama,a.periode,a.tanggal "+
				                                      "from kop_pbrgsetor_m a "+
													  "            inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
													  "where a.no_setor = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof(data) == "object"){						
					var line = data.rs.rows[0];							
					if (line !== undefined){
						this.cb_app.setText(line.nik_app, line.nama);
						this.e_desc.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);
						this.dp_d1.setText(line.tanggal);
						this.e_periode.setText(line.periode);
						this.perLama = line.periode;
					}
				}				
				var data = this.dbLib.getDataProvider("select a.no_angs,date_format(a.tanggal,'%d/%m/%Y') as tanggal,b.nama,a.keterangan,a.nilai,a.akun_ar,a.periode, "+
												      "      (case when a.nilai_sls <0 then -a.nilai_sls else 0 end) as beban,'ANS' as jenis "+
													  "from  kop_pbrgangs_m a inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
													  "                       inner join kop_pbrgsetor_d c on a.no_angs=c.no_angs and a.kode_lokasi=c.kode_lokasi and c.jenis='ANS' "+
													  "where c.no_setor = '"+this.cb_nbLama.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' "+
													  "union "+
													  "select x.no_inv as no_angs,date_format(x.tanggal,'%d/%m/%Y') as tanggal,y.nama,x.keterangan,x.nilai,x.akun_ar,x.periode, "+
												      "      0 as beban,'INV' as jenis "+
													  "from  kop_pbrginv_m x inner join karyawan y on x.nik_app=y.nik and x.kode_lokasi=y.kode_lokasi "+
													  "                      inner join kop_pbrgsetor_d c on x.no_inv=c.no_angs and x.kode_lokasi=c.kode_lokasi and c.jenis='INV' "+
													  "where c.no_setor = '"+this.cb_nbLama.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' "+
													  "union "+
													  "select x.no_pbrg as no_angs,date_format(x.tanggal,'%d/%m/%Y') as tanggal,y.nama,x.keterangan,(x.nilai_mat+x.nilai_adm+x.nilai_asur+x.nilai_um) as nilai,z.kode_akun as akun_ar,x.periode, "+
												      "      0 as beban,'UM' as jenis "+
													  "from  kop_pbrg_m x inner join karyawan y on x.nik_app=y.nik and x.kode_lokasi=y.kode_lokasi "+
													  " 			      inner join kop_pbrg_j z on x.no_pbrg=z.no_pbrg and x.kode_lokasi=z.kode_lokasi and z.jenis='ARIM' "+
													  "                   inner join kop_pbrgsetor_d c on x.no_pbrg=c.no_angs and x.kode_lokasi=c.kode_lokasi and c.jenis='UM' "+
													  "where c.no_setor = '"+this.cb_nbLama.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["SETOR",line.no_angs,line.tanggal,line.nama,line.keterangan,line.periode,line.akun_ar,line.jenis.toUpperCase(),floatToNilai(line.beban),floatToNilai(line.nilai)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"No Setoran Lama tidak valid.","Bukti Setoran Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Setoran",sender,undefined, 
											  "select no_setor, keterangan  from kop_pbrgsetor_m where progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_setor)       from kop_pbrgsetor_m where progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'",
											  ["no_setor","keterangan"],"and",["No Setor","Deskripsi"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
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
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "SETOR")&&(this.sg.cells(9,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(9,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
	},
	createJurnal: function(){		
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(0,i) == "SETOR"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(6,i)) {
							rows[j].nilai += nilaiToFloat(this.sg.cells(9,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(6,i),nama:'-',dc:"C", keterangan: "-", nilai: nilaiToFloat(this.sg.cells(9,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
				}
			} 
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});