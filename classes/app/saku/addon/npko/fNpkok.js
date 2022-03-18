window.app_saku_addon_npko_fNpkok = function(owner)
{
	if (owner)
	{
		window.app_saku_addon_npko_fNpkok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_addon_npko_fNpkok";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Nota Proses Kegiatan Operasional: Koreksi", 0);	
		
		uses("portalui_saiMemo;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:0});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[760,11,200,20],caption:"Periode NPKO",mustCheck: true, tag:0, change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Unit Kerja",btnClick:[this,"doBtnClick"],change:[this,"doChange"],tag:2});		
		this.cb_nbLama = new portalui_saiCBBL(this,{bound:[760,12,200,20],caption:"No NPKO Lama",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.iShow = new portalui_imageButton(this,{bound:[960,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doClick"]});						
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Nomor Kegiatan",btnClick:[this,"doBtnClick"],tag:0,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No NPKO",maxLength:20,readOnly:true,tag:1});
		this.b_gen = new portalui_button(this,{bound:[280,14,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_lokasi = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Lokasi", maxLength:150,tag:1});		
		this.e_lingkup = new portalui_saiLabelEdit(this,{bound:[480,15,500,20],caption:"Lingkup Pekerjaan", maxLength:150,tag:1});		
		this.e_sarana = new portalui_saiLabelEdit(this,{bound:[20,16,400,20],caption:"Sarana", maxLength:150,tag:1});						
		this.l_tgl2 = new portalui_label(this,{bound:[480,16,100,18],caption:"Waktu", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[580,16,100,18],date:new Date().getDateStr()});
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[780,16,200,20],caption:"Total ",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});		
		this.e_vol = new portalui_saiLabelEdit(this,{bound:[20,17,180,20],caption:"Volume", maxLength:10,tipeText:ttNilai,text:"0",tag:1});						
		this.cb_buat = new portalui_saiCBBL(this,{bound:[480,17,200,20],caption:"Direncanakan Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_fasilitas = new portalui_saiMemo(this,{bound:[20,18,400,70],caption:"Kond Srn/Fasilitas",tag:1});				
		this.e_sasaran = new portalui_saiMemo(this,{bound:[20,19,400,70],caption:"Sasaran Kegiatan",tag:1});				
		this.e_uraian = new portalui_saiMemo(this,{bound:[20,20,400,80],caption:"Uraian Pekerjaan",tag:1});				
		this.e_catatan = new portalui_saiMemo(this,{bound:[20,21,400,60],caption:"Catatan",tag:1});				
		this.rearrangeChild(10, 22);
		
		this.cb_app = new portalui_saiCBBL(this,{bound:[480,186,200,20],caption:"Diperiksa Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.p1 = new portalui_panel(this,{bound:[480,208,500,260],caption:"Daftar Nomor Akun"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,495,233],colCount:6,tag:1,
		            colTitle:["Kode Akun","Nama Akun","Nilai","Sisa Gar","Gar Bln","Gar Thn"],columnReadOnly:[true,[1,3,4,5],[0,2]],
					colWidth:[[0,1,2,3,4,5],[80,150,80,80,80,80]],colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],cellExit:[this,"doCellExit"],
					buttonStyle:[[0],[bsEllips]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
	
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('NIKFIA','NIKGAR') and kode_lokasi = '"+this.app._lokasi+"'"); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "NIKFIA") this.nikFia = line.flag;
					if (line.kode_spro == "NIKGAR") this.nikGar = line.flag;
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from npko_m where kode_lokasi = '"+this.app._lokasi+"' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' ",["kode_pp","nama"],true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_addon_npko_fNpkok.extend(window.portalui_childForm);
window.app_saku_addon_npko_fNpkok.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"npko_m","no_npko",this.app._lokasi+"-NPKO"+this.e_periode.getText().substr(2,4)+".","0000"));		
						sql.add(" update npko_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_npko,'r') where no_npko ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
						sql.add(" insert into npko_m(no_npko,tanggal,periode,kode_pp,kode_drk,lokasi,sarana,vol,lingkup,waktu,fasilitas,sasaran,uraian,catatan,nik_buat,nik_app,nik_gar,nik_fiat,nilai,kode_lokasi,kode_curr,kurs,progress,no_del,no_link,nik_user,tgl_input,no_spb) "+
							    " select concat(no_npko,'r'),'"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',kode_pp,kode_drk,lokasi,sarana,vol,lingkup,waktu,fasilitas,sasaran,uraian,catatan,nik_buat,nik_app,nik_gar,nik_fiat,nilai,kode_lokasi,kode_curr,kurs,'X',no_npko,'-','"+this.app._userLog+"',now(),no_spb "+
								" from npko_m where no_npko = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into npko_d(no_npko,no_urut,kode_akun,kode_pp,kode_drk,periode,nilai,gar_tahun,gar_bulan,gar_sd,kode_lokasi,dc)"+
								" select concat(no_npko,'r'),no_urut,kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"',nilai,gar_tahun,gar_bulan,gar_sd,kode_lokasi,'C'"+ 
								" from npko_d where no_npko = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai)"+
								" select concat(no_npko,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,'"+this.perLama+"','"+this.e_periode.getText()+"','C',saldo,nilai"+ 
								" from angg_r where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul = 'NPKO'");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from npko_m where no_npko='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from npko_d where no_npko='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='NPKO'");
						this.nb = this.cb_nbLama.getText();
					}
					sql.add("insert into npko_m(no_npko,tanggal,periode,kode_pp,kode_drk,lokasi,sarana,vol,lingkup,waktu,fasilitas,sasaran,uraian,catatan,nik_buat,nik_app,nik_gar,nik_fiat,nilai,kode_lokasi,kode_curr,kurs,progress,no_del,no_link,nik_user,tgl_input,no_spb) values  "+
							"('"+this.nb+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_lokasi.getText()+"','"+this.e_sarana.getText()+"',"+parseNilai(this.e_vol.getText())+",'"+this.e_lingkup.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_fasilitas.getText()+"','"+this.e_sasaran.getText()+"','"+this.e_uraian.getText()+"','"+this.e_catatan.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.nikGar+"','"+this.nikFia+"',"+parseNilai(this.e_tot.getText())+",'"+this.app._lokasi+"','IDR',1,'0','-','-','"+this.app._userLog+"',now(),'-')"); 
					
					var s="insert into npko_d(no_npko,no_urut,kode_akun,kode_pp,kode_drk,periode,nilai,gar_tahun,gar_bulan,gar_sd,kode_lokasi,dc) values ";
					var d="insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
					var z = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (z > 0) {s+= ",";d+= ",";}
							s+="('"+this.nb+"',"+z+",'"+this.sg.cells(0,i)+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(3,i))+",'"+this.app._lokasi+"','D')";
							d+="('"+this.nb+"','NPKO','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(2,i))+")";
							z++;
						}
					}	
					sql.add(d);					
					sql.add(s);
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
					this.standarLib.clearByTag(this, new Array("1"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "ubah" :	
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(2,i)) > nilaiToFloat(this.sg.cells(3,i))) {
							var j=i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai melebihi sisa anggaran di baris "+j+".");
							return false;
						}
					}
				}
				if (nilaiToFloat(this.e_tot.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Total NPKO tidak boleh kurang atau sama dengan nol.");
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
						sql.add(" update npko_m set no_del = concat(no_npko,'r') where no_npko ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
						sql.add(" insert into npko_m(no_npko,tanggal,periode,kode_pp,kode_drk,lokasi,sarana,vol,lingkup,waktu,fasilitas,sasaran,uraian,catatan,nik_buat,nik_app,nik_gar,nik_fiat,nilai,kode_lokasi,kode_curr,kurs,progress,no_del,no_link,nik_user,tgl_input,no_spb) "+
							    " select concat(no_npko,'r'),'"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',kode_pp,kode_drk,lokasi,sarana,vol,lingkup,waktu,fasilitas,sasaran,uraian,catatan,nik_buat,nik_app,nik_gar,nik_fiat,nilai,kode_lokasi,kode_curr,kurs,'X',no_npko,'-','"+this.app._userLog+"',now(),'-' "+
								" from npko_m where no_npko = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into npko_d(no_npko,no_urut,kode_akun,kode_pp,kode_drk,periode,nilai,gar_tahun,gar_bulan,gar_sd,kode_lokasi,dc)"+
								" select concat(no_npko,'r'),no_urut,kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"',nilai,gar_tahun,gar_bulan,gar_sd,kode_lokasi,'C'"+ 
								" from npko_d where no_npko = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai)"+
								" select concat(no_npko,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,'"+this.perLama+"','"+this.e_periode.getText()+"','C',saldo,nilai"+ 
								" from angg_r where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul = 'NPKO'");
					}
					else{
						sql.add("delete from npko_m where no_npko='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from npko_d where no_npko='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='NPKO'");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doClick:function(sender){
		if (sender == this.iShow) {
			this.sg.clear(1);
			var data = this.dbLib.getDataProvider("select a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.lokasi,a.lingkup,a.sarana,a.vol,a.waktu,a.tanggal,a.nik_buat,e.nama as nama_buat,a.nik_app,f.nama as nama_app,a.fasilitas,a.sasaran,a.uraian,a.catatan,a.periode, "+
												  "       b.kode_akun,g.nama as nama_akun,b.nilai "+
												  "from npko_m a inner join npko_d b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi "+
												  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												  "              inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
												  "              inner join karyawan e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi "+
												  "              inner join karyawan f on a.nik_app=f.nik and a.kode_lokasi=f.kode_lokasi "+
												  "              inner join masakun g on b.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+
												  "where a.no_npko='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,floatToNilai(line.nilai),"0","0","0"]);
					var baris,data2 = this.dbLib.runSQL("select fn_cekagg5('"+line.kode_pp+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+line.kode_drk+"','"+line.periode+"','"+this.cb_nbLama.getText()+"') as gar ");
					if (data2 instanceof portalui_arrayMap){
						baris = data2.get(0);
						if (baris != undefined){
							baris = baris.get("gar");
							data2 = baris.split(";");
							this.sg.cells(3,i,floatToNilai(parseFloat(data2[1]) - parseFloat(data2[2])));
							this.sg.cells(4,i,floatToNilai(parseFloat(data2[0])));
							this.sg.cells(5,i,floatToNilai(parseFloat(data2[1])));
						} 
					}
				}
				this.perLama = line.periode;
				this.dp_d1.setText(line.tanggal);
				this.cb_pp.setText(line.kode_pp,line.nama_pp);
				this.cb_drk.setText(line.kode_drk,line.nama_drk);
				this.e_lokasi.setText(line.lokasi);
				this.e_sarana.setText(line.sarana);
				this.e_lingkup.setText(line.lingkup);
				this.dp_d2.setText(line.waktu);
				this.e_vol.setText(nilaiToFloat(line.vol));
				this.e_fasilitas.setText(line.fasilitas);
				this.e_sasaran.setText(line.sasaran);
				this.e_uraian.setText(line.uraian);
				this.e_catatan.setText(line.catatan);
				this.cb_buat.setText(line.nik_buat,line.nama_buat);
				this.cb_app.setText(line.nik_app,line.nama_app);
			}
			this.sg.validasi();			
		}
		else {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"npko_m","no_npko",this.app._lokasi+"-NPKO"+this.e_periode.getText().substr(2,4)+".","0000"));		
			this.e_lokasi.setFocus();
		}
	},
	doChange:function(sender){
		if (sender == this.cb_perLama) {
			if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} else var sts = "";
			this.cb_nbLama.setSQL("select no_npko, lingkup from npko_m where periode='"+this.cb_perLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+sts,["no_npko","lingkup"],true);
		}
		if (sender == this.cb_pp) {
			this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_drk","a.nama"],true);
			var sql = new server_util_arrayList(); 
			sql.add("select distinct c.kode_akun, c.nama from anggaran_d b inner join masakun c on b.kode_akun=c.kode_akun "+
				    "where b.kode_drk='"+this.cb_drk.getText()+"' and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}
		if (sender == this.cb_drk) {
			var sql = new server_util_arrayList(); 
			sql.add("select distinct c.kode_akun, c.nama from anggaran_d b inner join masakun c on b.kode_akun=c.kode_akun "+
				    "where b.kode_drk='"+this.cb_drk.getText()+"' and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} else var sts = "";
				this.standarLib.showListData(this, "Daftar Bukti NPKO",sender,undefined, 
											  "select no_npko, lingkup  from npko_m where progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' "+sts, 
											  "select count(no_npko)    from npko_m where progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' "+sts,
											  ["no_npko","keterangan"],"and",["No NPKO","Lingkup"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_drk) {   
				this.standarLib.showListData(this,"Daftar Kegiatan",sender,undefined,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
											      "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_drk","a.nama"),"and",new Array("Nomor Kegiatan","Deskripsi"),true);
			}
			if (sender == this.cb_pp) {   
				if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} else var sts = "";
				this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
											  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting' "+sts,
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting' "+sts,
											  ["kode_pp","nama"],"and",["Kode PP","Nama"],false);		
				this.cb_drk.setText("","");
			}
			if (sender == this.cb_buat) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
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
		this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_drk","a.nama"],true);
		var sql = new server_util_arrayList(); 
		sql.add("select distinct c.kode_akun, c.nama from anggaran_d b inner join masakun c on b.kode_akun=c.kode_akun "+
				"where b.kode_drk='"+this.cb_drk.getText()+"' and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
		this.dbLib.getMultiDataProviderA(sql);
	},
	doChangeCell: function(sender, col, row){
	   try{
           if ((col == 2) && (this.sg.getCell(2,row) != "")){
			this.sg.validasi();
			}
		   sender.onChange.set(undefined,undefined);
    	   if (col == 0) {
                var akun = this.dataAkun.get(sender.cells(0,row));
				var baris,data = this.dbLib.runSQL("select fn_cekagg4('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+sender.cells(0,row)+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ");
				if (data instanceof portalui_arrayMap){
					baris = data.get(0);
					if (baris != undefined){
						baris = baris.get("gar");
						data = baris.split(";");
						if (sender.cells(2,row) == "") sender.cells(2,row,"0");
						sender.cells(3,row,floatToNilai(parseFloat(data[1]) - parseFloat(data[2])));
						sender.cells(4,row,floatToNilai(parseFloat(data[0])));
						sender.cells(5,row,floatToNilai(parseFloat(data[1])));
					} 
				} else alert(data);				
				
				
                if(akun)
                    sender.cells(1,row,akun);
                else {                                    
                    if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
                    sender.cells(0,row,"");
                    sender.cells(1,row,"");
                }
            }
            sender.onChange.set(this,"doChangeCell");
        }catch(e){
            sender.onChange.set(this,"doChangeCell");
        }
    },
	doCellExit: function(sender, col, row){
		try{
			switch(col){
				case 2 : 
							this.sg1.validasi();
					break;
			}
		}catch(e){
			systemAPI.alert("doFindBtnClick : " + e);
		}	
	},
	doNilaiChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(2,i) != "")
				tot1 += nilaiToFloat(this.sg.cells(2,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select distinct c.kode_akun, c.nama from anggaran_d b inner join masakun c on b.kode_akun=c.kode_akun "+
											      "where b.kode_drk='"+this.cb_drk.getText()+"' and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(c.kode_akun)           from anggaran_d b inner join masakun c on b.kode_akun=c.kode_akun "+
											      "where b.kode_drk='"+this.cb_drk.getText()+"' and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});