window.app_kopeg_proyek_fBayar = function(owner){
	if (owner){
		window.app_kopeg_proyek_fBayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_proyek_fBayar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Pembayaran Tagihan: Input", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[275,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});						
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:9});		
		this.cb_akunim = new portalui_saiCBBL(this,{bound:[20,30,200,20],caption:"Akun KB IM",btnClick:[this,"doBtnClick"]});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,30,200,20],caption:"Total Tagihan",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.cb_pph = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun PPh",btnClick:[this,"doBtnClick"],tag:9});
		this.e_kas = new portalui_saiLabelEdit(this,{bound:[720,29,200,20],caption:"Total Pembayaran",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"PP/Unit Kerja",btnClick:[this,"doBtnClick"]});
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[720,20,200,20],caption:"Nilai PPh",tipeText:ttNilai,alignment:alLeft,readOnly:true,text:"0"});
		this.cb_cust = new portalui_saiCBB(this,{bound:[20,18,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});		
		this.i_viewer = new portalui_imageButton(this,{bound:[250,18,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_adm = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai Adm",tipeText:ttNilai,alignment:alLeft,change :[this,"doChange"]});
		this.cb_sort = new portalui_saiCB(this,{bound:[300,18,180,20],caption:"Sort By",items:["NO INV","N. BESAR","N. KECIL"],tag:9});
		this.i_sort = new portalui_imageButton(this,{bound:[480,18,20,20],hint:"Sort By",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,290],caption:"Data Invoice"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,265],colCount:8,colTitle:["No Invoice","Tanggal","Keterangan","Akun AR","Nama Akun","Sisa Tagihan","Nilai Pelunasan","Nilai PPh"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,80,300,60,80,80,80,80]], colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],defaultRow:1, 
					columnReadOnly:[true,[0,1,2,3,4,5],[6,7]],change:[this,"doChangeCell"],
					change:[this, "doSgChange"],autoAppend:false});						
					
		this.rearrangeChild(10, 22);		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();						
			this.jurnal = new app_saku_fJurnalViewer(this.app,{bound:[0,0,system.screenWidth,system.screenHeight],visible:false});												
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun "+
			                                      "where a.kode_spro in ('PROADM') and a.kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PROADM") {this.akunAD = line.flag; this.namaAD = line.nama;}
				}
			}
			this.e_adm.setText("0");
			this.cb_akunim.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='029'",["a.kode_akun","a.nama"],true);
			this.cb_app.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",["kode_pp","nama"],true);
			this.cb_pph.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",["a.kode_akun","a.nama"],true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_proyek_fBayar.extend(window.portalui_childForm);
window.app_kopeg_proyek_fBayar.implement({
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
			if (this.e_pph.getText() != "0") this.cb_pph.setTag("0");
			else this.cb_pph.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.akunIM = this.cb_akunim.getText();
					this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_proyekbayar_m","no_bukti",this.app._lokasi+"-APR"+this.e_periode.getText().substr(2,4)+".","00000"));		
					sql.add("insert into kop_proyekbayar_m(no_bukti,no_dokumen,keterangan,tanggal,nilai,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,nilai_pph,akun_pph,nilai_adm) values  "+
							"('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_kas.getText())+",'ARBYR','0','"+this.akunIM+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),"+parseNilai(this.e_pph.getText())+",'"+this.cb_pph.getText()+"',"+parseNilai(this.e_adm.getText())+")");
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(6,i)) != 0){
								sql.add("insert into kop_proyekbayar_d (no_bukti,no_ar,periode,akun_ar,nilai,nilai_pph,kode_lokasi,dc) values "+
								        "('"+this.e_kb.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(7,i))+",'"+this.app._lokasi+"','D')");
							}
						}
					}
					this.createJurnal();					
					var d = "insert into kop_proyekbayar_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input )values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+this.e_ket.getText()+"','"+line.dc+"',"+line.nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','ARUM','"+line.kode_drk+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					sql.add(d);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kb);
					this.sg.clear(1);
				}
				break;			
			case "simpan" :	
				if (nilaiToFloat(this.e_kas.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if ((this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(1,i))) && (this.sg.getCell(6,i) != "0")) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl invoice. Baris["+i+"]");
							return false;   
						}
						if (nilaiToFloat(this.sg.getCell(6,i)) > nilaiToFloat(this.sg.getCell(5,i))){
							system.alert(this,"Nilai bayar tidak valid.","Melebihi sisa piutang. Baris["+i+"]");
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
				
		}
	},
	doChange: function(sender){
		try{			
			if (sender  == this.e_adm) {
				if (this.e_pph.getText() != "0" && this.e_adm.getText() != "0") {
					this.e_kas.setText(floatToNilai(this.nkas - nilaiToFloat(this.e_pph.getText()) - nilaiToFloat(this.e_adm.getText())));
					this.cb_pph.setTag("0");
				}
				else this.cb_pph.setTag("9");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_cust.getText() != "" && this.cb_pp.getText() != "" ) {
				this.sg.clear(1);
				var data = this.dbLib.getDataProvider("select f.no_ar,date_format(f.tanggal,'%d/%m/%Y')as tanggal,f.keterangan,f.akun_ar,(f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0) as sisa,j.nama as nama_akun,f.nilai_pph from "+						
													  " 	  kop_arproyek_m f "+
													  "	          inner join masakun j on f.akun_ar = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
													  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totbayar from kop_proyekbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) y on y.no_ar=f.no_ar and y.kode_lokasi=f.kode_lokasi "+
													  " where (f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0) >0 and f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_cust ='"+this.cb_cust.getText()+"' and f.kode_pp='"+this.cb_pp.getText()+"' order by f.no_ar");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line !== undefined)
							this.sg.appendData([line.no_ar, line.tanggal, line.keterangan, line.akun_ar, line.nama_akun, floatToNilai(line.sisa),"0",floatToNilai(line.nilai_pph)]);
					}
					this.doSgChange(this.sg, 5, 0);
				}								
			} 
			else {
				system.alert(this,"Cust dan PP tidak valid.","Data Cust dan PP harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_pp) {   
			    this.standarLib.showListData(this, "Daftar PP/Unit Kerja",sender,undefined, 
											  "select kode_pp, nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and flag_aktif='1'",
											  "select count(kode_pp)  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and flag_aktif='1'",
											  ["kode_pp","nama"],"and",["Kode PP","Nama "],false);				
				this.sg.clear(1);
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama  from cust where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_cust) from cust where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_cust","nama"],"and",["Kode Customer","Nama Customer"],false);				
				this.sg.clear(1);
			}
			if (sender == this.cb_pph){
				this.standarLib.showListData(this, "Daftar Akun PPh", sender, undefined,
											"select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",
											"select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",
											["kode_akun","nama"],"and",["Kode Akun","Nama"]);
			}
			if (sender == this.cb_akunim){
				this.standarLib.showListData(this, "Daftar Akun KB IM", sender, undefined,
											"select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='029'",
											"select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='029'",
											["kode_akun","nama"],"and",["Kode Akun","Nama"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Bukti : "+ this.e_kb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	sgFindBtnClick: function(sender, col, row){		
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.b_gen !== undefined) this.b_gen.click();
	},
	doChangeCell: function(sender, col, row){
		if ((col == 6) && (this.sg.getCell(6,row) != "")){
			this.doSgChange(this.sg, 6, 0);
		}
		if ((col == 7) && (this.sg.getCell(7,row) != "")){
			this.doSgChange(this.sg, 7, 0);
		}
	},
	doSgChange: function(sender, col, row){
		if ((col == 5)||(col == 6)||(col == 7)){
			var tot = tot2 = tot3 = 0;			
			for (var i = 0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(5,i) != "") 
					tot += nilaiToFloat(this.sg.cells(5,i));
				if (this.sg.cells(6,i) != "") 
					tot2 += nilaiToFloat(this.sg.cells(6,i));
				if ((this.sg.cells(7,i) != "") && (this.sg.cells(6,i) != "0")) 
					tot3 += nilaiToFloat(this.sg.cells(7,i));
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_pph.setText(floatToNilai(tot3));
			this.nkas = tot2;
			this.e_kas.setText(floatToNilai(this.nkas -  tot3 - nilaiToFloat(this.e_adm.getText())));
		}
	},
	createJurnal: function(){				
		try{
			var rows = [];
			var vKet = '-';
			if (this.e_ket.getText() != "") vKet = this.e_ket.getText();
			this.akunIM = this.cb_akunim.getText(); this.namaIM = this.cb_akunim.rightLabelCaption;
			rows[rows.length] = {kode_akun:this.akunIM, nama: this.namaIM,dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.e_kas.getText()),kode_pp:this.app._kodePP, kode_drk:'ARIM'};
			if (this.e_adm.getText() != "0") rows[rows.length] = {kode_akun:this.akunAD, nama: this.namaAD,dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.e_adm.getText()),kode_pp:this.app._kodePP, kode_drk:'ARADM'};
			if (this.e_pph.getText() != "0") rows[rows.length] = {kode_akun:this.cb_pph.getText(), nama:this.cb_pph.getRightLabelCaption(),dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.e_pph.getText()),kode_pp:this.app._kodePP, kode_drk:'ARPPH'};
			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(6,i)) != 0){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(3,i) && rows[j].dc == "C"){
							rows[j].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(3,i),nama:this.sg.cells(4,i),dc:"C", keterangan:vKet, nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.app._kodePP, kode_drk:'ARAKRU'};
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
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_proyekbayar_m","no_bukti",this.app._lokasi+"-APR"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_dok.setFocus();
		}
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
		if (sender == this.i_sort){
			var vFilter = " order by f.no_ar";
			if (this.cb_sort.getText() == "N. KECIL") vFilter = " order by (f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0)-ifnull(z.totrekon,0)";
			if (this.cb_sort.getText() == "N. BESAR") vFilter = " order by (f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0)-ifnull(z.totrekon,0) desc ";
			var data = this.dbLib.getDataProvider("select f.no_ar,date_format(f.tanggal,'%d/%m/%Y')as tanggal,f.keterangan,f.akun_ar,(f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0) as sisa,j.nama as nama_akun,f.nilai_pph from "+						
												  " 	  kop_arproyek_m f "+
												  "	          inner join masakun j on f.akun_ar = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
												  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totbayar from kop_proyekbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) y on y.no_ar=f.no_ar and y.kode_lokasi=f.kode_lokasi "+
												  " where (f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0) >0 and f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_cust ='"+this.cb_cust.getText()+"' and f.kode_pp='"+this.cb_pp.getText()+"' "+vFilter);
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line !== undefined)
						this.sg.appendData([line.no_ar, line.tanggal, line.keterangan, line.akun_ar, line.nama_akun, floatToNilai(line.sisa),"0",floatToNilai(line.nilai_pph)]);
				}
				this.doSgChange(this.sg, 5, 0);
			}			
		}
	}	
});