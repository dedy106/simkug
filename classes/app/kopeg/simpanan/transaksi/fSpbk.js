window.app_kopeg_simpanan_transaksi_fSpbk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fSpbk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fSpbk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB Pengambilan Simp. +UPD: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_checkBox;portalui_reportViewer;server_report_report");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No SPB",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No SPB Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100, tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150, tag:1});						
		this.cb_preview = new portalui_checkBox(this,{bound:[720,15,100,20],caption:"Preview",checked:true});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],date:new Date().getDateStr()});
		this.e_udp = new portalui_saiLabelEdit(this,{bound:[720,11,200,20],caption:"Nilai UDP",tipeText:ttNilai,tag:1});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Pemohon",tag:2,multiSelection:false,
			sql:["select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"' ", ["nik","nama"],false,["NIK","Nama"],"and","Daftar Pemohon",true]
		});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai Ambil",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",tag:2,multiSelection:false,//btnClick:[this,"doBtnClick"],
			sql:["select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'", ["kode_agg","nama"],false,["Kode Agg","Nama"],"and","Daftar Nasabah",true]			
		});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Simpanan",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		//,colHide:[[],true]
		this.p1 = new portalui_panel(this,{bound:[20,30,900,320],caption:"Daftar Kartu Simpanan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,295],colCount:5,tag:2,colTitle:["No Kartu","Akun Simp.","Keterangan","Saldo","Nilai Ambil"],
					colWidth:[[0,1,2,3,4],[150,100,400,100,100]],colFormat:[[3,4],[cfNilai,cfNilai]], 
					columnReadOnly:[true,[0,1,2,3],[0]],autoAppend:false,change:[this,"doChangeCell"],
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
			this.e_udp.setText("0");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SIMPSP','KOPUDP') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "SIMPSP") this.akunAP = line.flag;
					if (line.kode_spro == "KOPUDP") this.akunUDP = line.flag;
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from spb_m where modul = 'KP.SPB' and jenis = 'SIMP' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});			
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fSpbk.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fSpbk.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add(" update spb_m set no_link = '"+this.e_nb.getText()+"',no_del = concat(no_spb,'r') where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,'F','1','"+this.e_periode.getText()+"',no_spb,'-','"+this.app._userLog+"',now() "+
								" from spb_m where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");												
						sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from spb_j where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    " select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,'D',nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,nik_app,no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+
								" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simp_spbbuk(no_bukti,modul,no_simp,akun_simp,nilai,dc,kode_lokasi,keterangan) values "+
							    " select concat(no_bukri,'r'),modul,no_simp,akun_simp,nilai,'C',kode_lokasi,keterangan "+
								" from kop_simp_spbbuk where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from spb_m where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_depo where no_depo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from kop_simp_spbbuk where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						this.nb = this.cb_nbLama.getText();
					}	
					
					var total = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_udp.getText());
					sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,"+
							"keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
							"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+
							"','"+this.akunAP+"','"+this.e_desc.getText()+"','-','IDR',1,'"+this.cb_app.getText()+"','-','"+this.cb_agg.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+
							"','KP.SPB','SIMP',"+total+",0,0,'F','0','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',now())");
					var idx = 0;
					sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunAP+"','"+this.e_desc.getText()+"','C',"+total+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");	
					this.createJurnal();
					var d="insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var z = 0;
					for (var i in this.dataJurnal.rs.rows){
						line = this.dataJurnal.rs.rows[i];
						if (line.nilai != 0) {
							if (z >0) d+=",";
							idx++;
							d+="('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+line.kode_akun+"','"+this.e_desc.getText()+"','"+line.dc+"',"+line.nilai+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','SIMP','SIMP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							z++;
						}
					}
					if (this.e_udp.getText() != "0") {
						if (z >0) d+=",";
						idx++;
						d+="('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunUDP+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_udp.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','UDP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.nb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_udp.getText())+",'"+this.cb_agg.getText()+"','SIMP','UDP','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");											
					}
					sql.add(d);					
					var s="insert into kop_simp_spbbuk (no_bukti,modul,no_simp,akun_simp,nilai,dc,kode_lokasi,keterangan ) values ";
					var z = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(4,i) != "0") {
								if (z > 0) s+= ",";
								s+="('"+this.nb+"','SPB','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+parseNilai(this.sg.cells(4,i))+",'D','"+this.app._lokasi+"','"+this.e_desc.getText()+"')";
								z++;
							}
						}
					}						
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "ubah" :
                if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
				{
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if ((new Date()).strToDate(this.dp_d1.getDate())  > (new Date()).strToDate(this.dp_d2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal SPB melebihi Tgl Jatuh Temponya.");
					return false;
				}
				var total = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_udp.getText());
				if (total <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai spb tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.getCell(4,i)) > nilaiToFloat(this.sg.getCell(3,i))){
						    i++;
							system.alert(this,"Nilai ambil tidak valid.","Nilai ambil melebihi saldo. Baris["+i+"]");
							return false;   
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
					sql = new server_util_arrayList();	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update spb_m set no_del = concat(no_spb,'r') where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,'F','1','"+this.e_periode.getText()+"',no_spb,'-','"+this.app._userLog+"',now() "+
								" from spb_m where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");												
						sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from spb_j where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    " select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,'D',nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,nik_app,no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+
								" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simp_spbbuk(no_bukti,modul,no_simp,akun_simp,nilai,dc,kode_lokasi,keterangan) values "+
							    " select concat(no_bukri,'r'),modul,no_simp,akun_simp,nilai,'C',kode_lokasi,keterangan "+
								" from kop_simp_spbbuk where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					}
					else{
						sql.add("delete from spb_m where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_depo where no_depo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from kop_simp_spbbuk where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					}		
					this.dbLib.execArraySQL(sql);	
				} catch(e){
					alert(e)
				}
			break;
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != ""){
				var data = this.dbLib.getDataProvider("select c.no_simp,d.akun_simp,d.nama, "+
													  "     ifnull(a.nilai,0)+ifnull(b.ambil,0)+ifnull(e.pinbuk,0)+ifnull(f.bunga,0) as saldo, aa.nilai,ifnull(ee.nilai,0) as n_udp, "+
													  "     cc.no_dokumen,cc.keterangan,cc.due_date,cc.nik_buat,cc.kode_terima,dd.nama as nama_buat,bb.nama as nama_agg,cc.posted,cc.periode "+
													  " from kop_simp_m c inner join kop_simp_jenis d on c.kode_simp=d.kode_simp and c.kode_lokasi=d.kode_lokasi "+
													  "                   inner join kop_simp_spbbuk aa on c.no_simp = aa.no_simp and c.kode_lokasi=aa.kode_lokasi and aa.modul = 'SPB' "+
													  "                   inner join spb_m cc on cc.no_spb = aa.no_bukti and cc.kode_lokasi=aa.kode_lokasi and cc.modul = 'KP.SPB' and cc.jenis = 'SIMP' "+
													  "                   inner join karyawan dd on cc.nik_buat = dd.nik and cc.kode_lokasi=dd.kode_lokasi "+
													  "                   inner join kop_agg bb on cc.kode_terima=bb.kode_agg and cc.kode_lokasi=bb.kode_lokasi "+
													  "	     left outer join "+
													  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as nilai "+
													  "	               from kop_simpangs_d x inner join kop_simpangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
													  "	               group by x.kode_lokasi,x.no_simp) a on a.no_simp=c.no_simp and a.kode_lokasi=c.kode_lokasi "+
													  "	     left outer join "+
													  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as ambil  "+
													  "	               from kop_simp_spbbuk x inner join spb_m y on x.no_bukti=y.no_spb and x.kode_lokasi=y.kode_lokasi "+
													  "	               where y.no_spb <> '"+this.cb_nbLama.getText()+"' and x.modul='SPB' and y.jenis='SIMP' group by x.kode_lokasi,x.no_simp) b on b.no_simp=c.no_simp and b.kode_lokasi=c.kode_lokasi "+
													  "	     left outer join  "+
													  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as pinbuk  "+
													  "	               from kop_simp_spbbuk x inner join kop_simpbuk_m y on x.no_bukti=y.no_pinbuk and x.kode_lokasi=y.kode_lokasi "+
													  "	               where x.modul='PINBUK' group by x.kode_lokasi,x.no_simp) e on e.no_simp=c.no_simp and e.kode_lokasi=c.kode_lokasi "+
													  "	     left outer join  "+
													  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as bunga  "+
													  "	               from kop_simpbunga_d x inner join kop_simpbunga_m y on x.no_bunga=y.no_bunga and x.kode_lokasi=y.kode_lokasi "+
													  "	               group by x.kode_lokasi,x.no_simp) f on f.no_simp=c.no_simp and f.kode_lokasi=c.kode_lokasi "+
													  "	     left outer join kop_depo ee on ee.no_depo = cc.no_spb and ee.kode_lokasi=cc.kode_lokasi and ee.modul = 'SIMP' and ee.jenis = 'UDP' "+
													  " where aa.no_bukti='"+this.cb_nbLama.getText()+"' and aa.kode_lokasi='"+this.app._lokasi+"' ");
		 
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_simp,line.akun_simp,line.nama,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}
					this.posted = line.posted;
					this.perLama = line.periode;
					this.e_udp.setText(floatToNilai(parseFloat(line.n_udp)));
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.dp_d2.setText(line.due_date);
					this.cb_app.setText(line.nik_buat,line.nama_buat);
					this.cb_agg.setText(line.kode_terima,line.nama_agg);
					
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"No SPB tidak valid.","No SPB Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti SPB",sender,undefined, 
											  "select no_spb, keterangan  from spb_m where modul = 'KP.SPB' and jenis = 'SIMP' and progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_spb)       from spb_m where modul = 'KP.SPB' and jenis = 'SIMP' and progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'",
											  ["no_spb","keterangan"],"and",["No SPB","Deskripsi"],false);				
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
		if ((col == 4) && (this.sg.getCell(4,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(3,i) != "") {
				tot1 += nilaiToFloat(this.sg.cells(3,i));
			}
			if (this.sg.cells(4,i) != "") {
				tot2 += nilaiToFloat(this.sg.cells(4,i));
			}
		}
		this.e_tot.setText(floatToNilai(tot1));
		this.e_nilai.setText(floatToNilai(tot2));
	},
	createJurnal: function(){		
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(4,i) != "0"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(1,i)) {
							rows[j].nilai += nilaiToFloat(this.sg.cells(4,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(1,i),nama:'-',dc:"D", keterangan: "-", nilai: nilaiToFloat(this.sg.cells(4,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
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
							if (this.cb_preview.isSelected()) {
								this.nama_report="server_report_kopeg_rptSPB";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.nb+"' ";			
								this.filter= this.filter2;
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
								this.p1.hide();							
							} else 
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
	},
	doCloseReportClick: function(sender)
	{
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  this.page = 1;
		  this.allBtn = true;
		  this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi,this.filter2);
	      break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			break;
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	        window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	        
	        var cnv = undefined;
	        if (cnv != undefined)
	        {
	          cnv.focus();
	          cnv.print();
	        }
	      }catch(e)
	      {alert(e);}
	      break; 
	    default :
			this.p1.show();
	        this.viewer.setVisible(false);	      	
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      	this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
			this.sg.clear(1);
	      break;
	  }
	},
	sg1onChange: function(sender, col , row)
	{
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		}
	},
	doRowPerPageChange: function(sender, rowperpage)
	{
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}		
});
