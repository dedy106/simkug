window.app_kopeg_simpanan_transaksi_fAkru2k = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAkru2k.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAkru2k";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Simpanan Tunai: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100,tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150,tag:1});								
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:1});				
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",tag:1, readOnly :true});				
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,18,250,20],caption:"No Kartu",tag:9, readOnly :true});				
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,18,200,20],caption:"Nilai Akru",tipeText:ttNilai,text:"0",readOnly: true,tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,303],caption:"Daftar Akru Kartu Simpanan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:9,tag:2,
		            colTitle:["No Kartu","Tgl Awal Tagih","Kode","Nasabah","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,80,150,50,150,70,70,100]],colFormat:[[8],[cfNilai]], 
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[8]],autoAppend:false,change:[this,"doChangeCell"],
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
			
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_simpbill_m where modul= 'TUNAI' and kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_kopeg_simpanan_transaksi_fAkru2k.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAkru2k.implement({
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
					var pBefore = this.cb_perLama.getText();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbill_m","no_bill",this.app._lokasi+"-BS"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_simpbill_m set set no_link='"+this.e_nb.getText()+"',no_del = concat(no_bill,'r') where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) "+
							    " select concat(no_bill,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,'"+this.cb_app.getText()+"','"+this.app._useLog+"',now(),'F',kode_curr,kurs,no_bill,'-',modul "+
								" from kop_simpbill_m where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bill,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_simpbill_j where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc)"+
								" select no_simp,concat(no_bill,'r'),kode_lokasi,periode,nilai,akun_ar,akun_simp,'C' "+ 
								" from kop_simp_d where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_simpbill_m where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpbill_j where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
						sql.add("delete from kop_simp_d where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
						this.nb = this.cb_nbLama.getText();
					}
					sql.add("insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) values  "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+this.tot+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','TUNAI')");
					
					var scr1 = "insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						       "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var awal = true;
					var line = undefined;
					for (var i in this.gridJurnal.objList){
						if (!awal) { scr1 += ",";}
						line = this.gridJurnal.get(i);
						if (line.get("dc") == 'D') var jenis = "ARSIMP";
						else var jenis = 'APSIMP';
						scr1 += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+
							 	"','"+this.e_desc.getText()+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'"+line.get("kode_pp")+"','-',"+
								"'"+this.app._lokasi+"','SIMPBILL','"+jenis+"','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						awal = false;
					}
					sql.add(scr1);
					
					scr1 = "insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc) values ";
					awal = true;
					var nosimp = [];
					var nosp = [];
					for (var i=1; i <= this.sg1.getRowCount(); i++){
						if (!awal) { scr1 += ",";}
						scr1 += "('"+this.sg1.getCell(1,i)+"','"+this.nb+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg1.getCell(9,i))+",'"+this.sg1.getCell(7,i)+"','"+this.sg1.getCell(8,i)+"','D')";
						if (this.sg1.getCell(5,i) != "SP") nosimp.push("'"+this.sg1.getCell(1,i)+"'");
						else nosp.push("'"+this.sg1.getCell(1,i)+"'");
						awal = false;
					}
					sql.add(scr1);
					var pNext = getNextPeriode(this.e_periode.getText());
					if (nosimp != "") sql.add("update kop_simp_m set periode_gen ='"+pNext+"' where no_simp in ("+nosimp+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (nosp != "") sql.add("update kop_simp_m set periode_gen ='999999' where no_simp in ("+nosp+") and kode_lokasi = '"+this.app._lokasi+"'");
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
					this.sg1.clear(1);
				}
				break;
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				this.tot = nilaiToFloat(this.e_nilai.getText());
				if (this.tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pengakuan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
					var pBefore = this.cb_perLama.getText();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_simpbill_m set no_del = concat(no_bill,'r') where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) "+
							    " select concat(no_bill,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,'"+this.cb_app.getText()+"','"+this.app._useLog+"',now(),'F',kode_curr,kurs,no_bill,'-',modul "+
								" from kop_simpbill_m where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bill,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_simpbill_j where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc)"+
								" select no_simp,concat(no_bill,'r'),kode_lokasi,periode,nilai,akun_ar,akun_simp,'C' "+ 
								" from kop_simp_d where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						sql.add(" update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
					}
					else{
						sql.add("delete from kop_simpbill_m where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpbill_j where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
						sql.add("delete from kop_simp_d where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbill_m","no_bill",this.app._lokasi+"-BS"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData: function(sender){
		try{			
			//bisa utk beberapa kartu utk satu bukti akru......[dari saiTable ganti saiGrid]
			if (this.cb_nbLama.getText() != "") {
				this.sg1.setColTitle(new Array("No","No Kartu","Tgl Awal Tagih","Kode","Nasabah","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai","Posted","Periode"));				
				var data = this.dbLib.runSQL(" select x.no_simp,x.tgl_tagih,y.kode_agg,y.nama as nama_agg,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,z.akun_ar,z.akun_simp,z.nilai,aa.posted,aa.periode "+
				           " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_d z on x.no_simp=z.no_simp and x.kode_lokasi = z.kode_lokasi "+
						   "      inner join kop_simpbill_m aa on z.no_bill=aa.no_bill and z.kode_lokasi = aa.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and z.no_bill = '"+this.cb_nbLama.getText()+"' "+
						   " order by x.jenis,x.no_simp");
						   
				this.sg1.clear(1);
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList){
					tot += parseFloat(data.get(i).get("nilai"));
				}
				this.e_nilai.setText(floatToNilai(tot));
				
				var row,dtJurnal = new portalui_arrayMap();
				var nemu = false;
				var dtJrnl = 0;
				var line = undefined;
				for (var i in this.sg1.data.objList) {
					line = this.sg1.data.get(i);
					kdAkun = this.sg1.data.get(i).get("akun_ar");			
					nemu = false;
					ix = 0;
					for (var j in dtJurnal.objList){		
					  if (kdAkun == dtJurnal.get(j).get("kode_akun")){
						nemu = true;
						row = dtJurnal.get(j);
						ix = j;
						break;
					  }
					}
					if (!nemu){
						row = new portalui_arrayMap();
						row.set("kode_akun",kdAkun);
						row.set("dc","D");
						row.set("keterangan","Jurnal Akru Simpanan");
						row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai")));
						row.set("kode_pp","-");
						dtJrnl++;
						dtJurnal.set(dtJrnl,row);						
					}else {
						dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai")));
					}
										
					ix = -1;
					kdAkun = this.sg1.data.get(i).get("akun_simp");
					for (var j in dtJurnal.objList){		
					  if (kdAkun == dtJurnal.get(j).get("kode_akun")){
						nemu = true;
						row = dtJurnal.get(j);
						ix = j;
						break;
					  }
					}
					if (!nemu){
						row = new portalui_arrayMap();
						row.set("kode_akun",kdAkun);
						row.set("dc","C");
						row.set("keterangan","Jurnal Akru Simpanan");
						row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai")));
						row.set("kode_pp","-");
						dtJrnl++;
						dtJurnal.set(dtJrnl,row);						
					}else {				
						dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai")));				
					}
				}
				this.gridJurnal = dtJurnal;
				
				this.e_dok.setText(this.cb_nbLama.dataFromList[1]);
				this.e_desc.setText(this.cb_nbLama.dataFromList[2]);
				this.cb_app.setText(this.cb_nbLama.dataFromList[3],this.cb_nbLama.dataFromList[4]);
				this.cb_agg.setText(this.cb_nbLama.dataFromList[5],this.cb_nbLama.dataFromList[6]);
				this.cb_simp.setText(this.cb_nbLama.dataFromList[7],this.cb_nbLama.dataFromList[8]);
			} 
			else {
				system.alert(this,"No Bukti Lama harus valid.","Bukti Lama harus dipilih.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_nbLama) {   
				this.standarLib.showListData(this, "Daftar Bukti Akru",sender,undefined, 
											  "select a.no_bill,a.no_dokumen,a.keterangan,a.nik_app,b.nama,cc.kode_agg,cc.nama as nama_agg,bb.no_simp,bb.jenis  from kop_simpbill_m a "+
											  "                                  inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
											  "                                  inner join kop_simp_d aa on a.no_bill=aa.no_bill and a.kode_lokasi=aa.kode_lokasi "+
											  "                                  inner join kop_simp_m bb on aa.no_simp=bb.no_simp and aa.kode_lokasi=bb.kode_lokasi "+
											  "                                  inner join kop_agg cc on bb.kode_agg=cc.kode_agg and bb.kode_lokasi=cc.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.cb_perLama.getText()+"' and a.no_del='-' and a.modul = 'TUNAI' ", 
											  "select count(no_bill)       from kop_simpbill_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and modul = 'TUNAI'",
											  ["no_bill","no_dokumen","keterangan","nik_app","nama","kode_agg","nama_agg","no_simp","jenis"],"and",
											  ["No Bukti","No Dokumen","Deskripsi","NIK App","Nama","Kode Agg","Nama Agg","No Simp","Jenis"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg1.clear(1);
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