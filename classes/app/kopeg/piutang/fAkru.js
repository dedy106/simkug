window.app_kopeg_piutang_fAkru = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_fAkru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_piutang_fAkru";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang Umum: Input", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		uses("portalui_saiCBB",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No Dokumen", maxLength:100});		
		this.e_fp = new portalui_saiLabelEdit(this,{bound:[320,14,250,20],caption:"No Faktur Pajak", maxLength:30, tag:9});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,550,20],caption:"Keterangan", maxLength:150});						
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"PP/Unit Kerja",btnClick:[this,"doBtnClick"],tag:2, change:[this,"doChange"]});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,19,200,20],caption:"Nilai Piutang",tipeText:ttNilai,tag:1,text:"0",change:[this,"doOnChange"],readOnly:true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Png Jawab",btnClick:[this,"doBtnClick"],tag:2});				
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai Ref. PPh",tipeText:ttNilai,tag:1,text:"0"});
		this.b_pph = new portalui_imageButton(this,{bound:[920,16,20,20],hint:"Hitung PPh",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai PPN",tipeText:ttNilai,tag:1,text:"0",change:[this,"doOnChange"]});
		this.b_ppn = new portalui_imageButton(this,{bound:[920,17,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
		this.cb_ref = new portalui_saiCBB(this,{bound:[20,18,200,20],caption:"Ref Transaksi",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],tag:1, readOnly:true,change:[this,"doLoadData"]}); //multiSelection:false,
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Tagihan",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,280],caption:"Daftar Item Pendapatan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,233],colCount:9,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,100,200,50,100,60,100,60,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					picklist:[[3],[new portalui_arrayMap({items:["C","D"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1,6,8],[0]],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,255,900,25],buttonStyle:2,grid:this.sg});		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where tipe = 'posting' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],true);
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
			this.dbLib.getMultiDataProviderA(sql);
			
			this.sg.onCellEnter.set(this, "doCellEnter");
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_piutang_fAkru.extend(window.portalui_childForm);
window.app_kopeg_piutang_fAkru.implement({
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
					setTipeButton(tbAllFalse);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_ar_m','no_ar',this.app._lokasi+"-INV"+this.e_periode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("insert into kop_ar_m (no_ar,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input,kode_ref,nilai_ppn,nilai_pph,kode_cust,no_fp,progress_fp)  values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'ARUM','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','F',1,'IDR','"+this.akunAR+"','0','-','-','"+this.app._userLog+"',now(),'"+this.cb_ref.getText()+"',"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_pph.getText())+",'"+this.cb_cust.getText()+"','"+this.e_fp.getText()+"','0')");					
					
					var totAR = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()); 
					sql.add("insert into kop_ar_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunAR+"','"+this.e_desc.getText()+"','D',"+totAR+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','ARUM','AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					if (this.e_ppn.getText() != "0") {
						sql.add("insert into kop_ar_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_ppn.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','ARUM','PPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					}
					var idx = 1;
					for (var i=0; i < this.sg.rows.getLength(); i++){			
						if (this.sg.rowValid(i)){
							idx++;
							sql.add("insert into kop_ar_j (no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							        "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','ARUM','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
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
			case "simpan" :
				if (this.akunAR == undefined || this.akunPPN == undefined || this.akunAR == ""){
					system.alert(this,"Akun Piutang tidak boleh kosong.","Pilih Referensi Jurnal,Klik Refresh Transaksi(<img src='icon/"+system.getThemes()+"/refresh.png' width=16 height=18/>) ")
					return;
				}	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh kurang atau sama dengan nol.");
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
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_ar_m','no_ar',this.app._lokasi+"-INV"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doOnChange:function(sender){
		if (this.e_nilai.getText() != "" && this.e_ppn.getText() != "") {
			var tot = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
			this.e_tot.setText(floatToNilai(tot));
		}
	},
	doChange: function(sender){
		try{					
			if (sender == this.cb_pp){
				this.cb_ref.setText("");
				//jangan pasang...jd err this.cb_ref.setSQL("select kode_ref, nama  from kop_arref_m where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"'",
				//	["kode_ref","nama"],false,["Kode Ref","Nama"],"and","Daftar Referensi",true);
			}
		}catch(e){
			alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_pp) {   
			    if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
				else {var sts = "";}
			    this.standarLib.showListData(this, "Daftar PP/Unit Kerja",sender,undefined, 
											  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting' and flag_aktif='1'",
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting' and flag_aktif='1'",
											  ["kode_pp","nama"],"and",["Kode","Nama"],false);
                this.akunAR = "";
				this.cb_ref.setText("",""); 
				this.sg.clear(1);
			}
			if (sender == this.cb_ref) {   
				this.standarLib.showListData(this, "Daftar Referensi",sender,undefined, 
											  "select kode_ref, nama  from kop_arref_m where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"'",
											  "select count(kode_ref) from kop_arref_m where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"'",
											  ["kode_ref","nama"],"and",["Kode","Nama"],false);
				this.akunAR = "";
				this.sg.clear(1);
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama  from cust where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_cust) from cust where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_cust","nama"],"and",["Kode","Nama"],false);
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
	doLoadData: function(sender){
		try{			
			this.akunAR = undefined;
			this.akunPPN = undefined;
			if (this.cb_ref.getText() != ""){
				this.sg.clear(1);				
				var data = this.dbLib.getDataProvider("select x.kode_akun,y.nama as nama_akun,x.dc,x.keterangan,x.nilai,x.kode_pp,z.nama as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk,aa.akun_ar,aa.akun_ppn "+
				           "from kop_arref_j x inner join kop_arref_m aa on aa.kode_ref=x.kode_ref and x.kode_lokasi=aa.kode_lokasi "+
						   "                   inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
						   "	               inner join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
						   "                   left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring('"+this.e_periode.getText()+"',1,4) "+
					       " where x.kode_lokasi = '"+this.app._lokasi+"' and x.kode_ref ='"+this.cb_ref.getText()+"'");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					setTipeButton(tbSimpan);
					var line = data.rs.rows[0];
					this.sg.clear();
					if (this.e_desc.getText() == "") var vKet = line.keterangan;
					else var vKet = this.e_desc.getText();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,vKet,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
					this.akunAR = line.akun_ar;
					this.akunPPN = line.akun_ppn;
				}
				this.sg.validasi();
			}
		}catch(e){
			systemAPI.alert(e);
		}
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
	doCellEnter: function(sender, col, row) {
		try{
			switch(col)
			{
				case 2 : 
							if (this.sg.getCell(2,row) == "")
							this.sg.setCell(2,row,this.e_desc.getText());
					break;
			}
		}catch(e){
			alert("doFindBtnClick : " + e);
		}	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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
