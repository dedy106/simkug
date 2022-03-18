window.app_kopeg_piutang_fRekon = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_fRekon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_piutang_fRekon";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekonsiliasi Hutang-Piutang : Input", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[275,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});				
		this.cb_pp1 = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"PP/Unit Piutang",btnClick:[this,"doBtnClick"]});
		this.cb_pp2 = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"PP/Unit Hutang",btnClick:[this,"doBtnClick"]});
		this.e_inv = new portalui_saiLabelEdit(this,{bound:[720,27,200,20],caption:"No Invoice",readOnly:true, tag:9,text:""});
		this.cb_nik1 = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"User Piutang",btnClick:[this,"doBtnClick"]});
		this.e_spb = new portalui_saiLabelEdit(this,{bound:[720,28,200,20],caption:"No SPB",readOnly:true, tag:9,text:""});
		this.cb_nik2 = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"User Hutang",btnClick:[this,"doBtnClick"]});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,29,200,20],caption:"Nilai Rekonsiliasi",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.b_tampil = new portalui_button(this,{bound:[450,29,80,18],caption:"Tampil Data",click:[this,"doClick"]});
		this.b_rekon = new portalui_button(this,{bound:[540,29,80,18],caption:"Rekon",click:[this,"doClick"]});
		this.b_batal = new portalui_button(this,{bound:[630,29,80,18],caption:"Batal",click:[this,"doClick"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,190],caption:"Data Invoice Piutang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,165],colCount:8,colTitle:["No Invoice","Tanggal","Customer","Keterangan","Akun AR","Nama Akun","Nilai Tagihan","No SPB"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,80,100,280,60,80,80,80]], colFormat:[[6],[cfNilai]],defaultRow:1,
					readOnly:true,autoAppend:false});
		
		this.p2 = new portalui_panel(this,{bound:[20,31,900,180],caption:"Data SPB Hutang"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,155],colCount:9,colTitle:["No SPB","Tanggal","Vendor","Keterangan","Akun AP","Nama Akun","Nilai SPB","No Invoice","Nilai Rekon"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,100,200,60,80,80,80,80]], colFormat:[[6,8],[cfNilai,cfNilai]],defaultRow:1, 
					readOnly:true,nilaiChange:[this, "doSgChange"],autoAppend:false});									

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
			this.sg.onCellEnter.set(this, "doCellEnter");
			this.sg2.onCellEnter.set(this, "doCellEnter2");
			
			this.cb_pp1.setSQL("select kode_pp, nama  from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],true);
			this.cb_pp2.setSQL("select kode_pp, nama  from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],true);
			this.cb_nik1.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_nik2.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('ARIBJS','APIBJS') and kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "ARIBJS") this.akunARIJ = line.flag;
					if (line.kode_spro == "APIBJS") this.akunAPIJ = line.flag;
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_piutang_fRekon.extend(window.portalui_childForm);
window.app_kopeg_piutang_fRekon.implement({
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
					this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","00000"));		
					sql.add("insert into kop_rekon_m(no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) values  "+
							"('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','-','-','F',1,'IDR','"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','-','-','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"','"+this.app._userLog+"',now())");					
					var nospb = [];
					for (var i=0; i < this.sg2.rows.getLength(); i++){
						if (this.sg2.rowValid(i)){
							if (this.sg2.cells(7,i) != "-"){
								sql.add("insert into kop_rekon_d (no_rekon,no_ar,periode,nilai,kode_lokasi,kode_lokasi2,dc,no_spb) values "+
								        "('"+this.e_kb.getText()+"','"+this.sg2.cells(7,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg2.cells(6,i))+",'"+this.app._lokasi+"','"+this.app._lokasi+"','D','"+this.sg2.cells(0,i)+"')");
								nospb.push("'"+this.sg2.getCell(0,i)+"'"); 
							}
						}
					}
					this.createJurnal();					
					var d = "insert into kop_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input )values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+this.e_ket.getText()+"','"+line.dc+"',"+line.nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','ARUM','"+line.kode_drk+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					sql.add(d);					
					sql.add("update spb_m set progress='2' where no_spb in ("+nospb+") and kode_lokasi = '"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_kb);
					this.sg.clear(1);
				}
				break;			
			case "simpan" :	
				this.sg2.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg2.rowValid(i)){
						if ((nilaiToFloat(this.sg2.getCell(8,i)) != 0) && (nilaiToFloat(this.sg2.getCell(8,i)) > nilaiToFloat(this.sg2.getCell(6,i)))){
							i++;
							system.alert(this,"Nilai rekon tidak valid.","Melebihi nilai SPB. Baris["+i+"]");
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nik1) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Piutang",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_nik2) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Hutang",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_pp2) {   
			    this.standarLib.showListData(this, "Daftar PP/Unit Kerja Hutang",sender,undefined, 
											  "select kode_pp, nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(kode_pp)  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  ["kode_pp","nama"],"and",["Kode PP","Nama "],false);				
				this.sg2.clear(1);
			}
			if (sender == this.cb_pp1) {   
			    this.standarLib.showListData(this, "Daftar PP/Unit Kerja Piutang",sender,undefined, 
											  "select kode_pp, nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(kode_pp)  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  ["kode_pp","nama"],"and",["Kode PP","Nama "],false);				
				this.sg.clear(1);
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.b_gen !== undefined) this.b_gen.click();
	},
	doCellEnter: function(sender, col, row){
		this.e_inv.setText(this.sg.cells(0,row));
	},
	doCellEnter2: function(sender, col, row){
		this.e_spb.setText(this.sg2.cells(0,row));
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(8,i) != "") 
				tot += nilaiToFloat(this.sg2.cells(8,i));
		}
		this.e_nilai.setText(floatToNilai(tot));
	},
	createJurnal: function(){				
		try{
			var rows = [];
			var vKet = '-';
			if (this.e_ket.getText() != "") vKet = this.e_ket.getText();
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(7,i) != "-"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(4,i)){
							rows[j].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(4,i),nama:this.sg.cells(5,i),dc:"C", keterangan:vKet, nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.cb_pp1.getText(), kode_drk:'ARREKON'};
					}
				}
			}
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.cells(7,i) != "-"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg2.cells(4,i)){
							rows[j].nilai += nilaiToFloat(this.sg2.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg2.cells(4,i),nama:this.sg2.cells(5,i),dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.sg2.cells(6,i)),kode_pp:this.cb_pp2.getText(), kode_drk:'APREKON'};
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
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_dok.setFocus();
		} 
		else {
			if (sender == this.b_tampil){
				if (this.cb_pp1.getText() != "") {
					this.sg.clear(1);
					var data = this.dbLib.getDataProvider("select f.no_ar,date_format(f.tanggal,'%d/%m/%Y')as tanggal,concat(a.kode_cust,'-',a.nama) as cust, f.keterangan,f.akun_ar,(f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0)-ifnull(z.totrekon,0) as sisa,j.nama as nama_akun from "+						
														  " 	  kop_ar_m f inner join cust a on f.kode_cust=a.kode_cust and f.kode_lokasi=a.kode_lokasi "+
														  "	          inner join masakun j on f.akun_ar = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
														  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totbayar from kop_arbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) y on y.no_ar=f.no_ar and y.kode_lokasi=f.kode_lokasi "+
														  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totrekon from kop_rekon_d where kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) z on z.no_ar=f.no_ar and z.kode_lokasi=f.kode_lokasi "+
														  " where f.akun_ar = '"+this.akunARIJ+"' and f.periode<='"+this.e_periode.getText()+"' and (f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0)-ifnull(z.totrekon,0) >0 and f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_pp='"+this.cb_pp1.getText()+"' order by f.no_ar");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (line !== undefined)
								this.sg.appendData([line.no_ar, line.tanggal, line.cust, line.keterangan, line.akun_ar, line.nama_akun, floatToNilai(line.sisa),"-"]);
						}
					}
				}
				if (this.cb_pp2.getText() != "") {
					this.sg2.clear(1);
					var data = this.dbLib.getDataProvider("select f.no_spb,date_format(f.tanggal,'%d/%m/%Y')as tanggal,concat(a.kode_vendor,'-',a.nama) as vendor, f.keterangan,f.akun_hutang,(f.nilai)-ifnull(y.totrekon,0) as sisa,j.nama as nama_akun from "+
														  " 	  spb_m f inner join vendor a on f.kode_terima=a.kode_vendor and f.kode_lokasi=a.kode_lokasi "+
														  "	          inner join masakun j on f.akun_hutang = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
														  "           left outer join (select no_spb,kode_lokasi2, sum(case dc when 'D' then nilai else -nilai end) as totrekon from kop_rekon_d where kode_lokasi2='"+this.app._lokasi+"' group by no_spb,kode_lokasi2) y on y.no_spb=f.no_spb and y.kode_lokasi2=f.kode_lokasi "+
														  " where f.akun_hutang = '"+this.akunAPIJ+"' and f.progress = '1' and f.periode<='"+this.e_periode.getText()+"' and (f.nilai)-ifnull(y.totrekon,0) >0 and f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_pp='"+this.cb_pp2.getText()+"' order by f.no_spb");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (line !== undefined)
								this.sg2.appendData([line.no_spb, line.tanggal, line.vendor, line.keterangan, line.akun_hutang, line.nama_akun, floatToNilai(line.sisa),"-","0"]);
						}
					}
				}
			} else {
				if (sender == this.b_rekon) {
					if (this.e_inv.getText() != "" && this.e_spb.getText() != "") {
						if (nilaiToFloat(this.sg.cells(6,this.sg.row)) != nilaiToFloat(this.sg2.cells(6,this.sg2.row))) {
							system.alert(this,"Nilai rekonsiliasi tidak sama.","Data nilai hutang-piutang tidak sesuai.");
						}
						else {
							if (this.sg.cells(7,this.sg.row) != "-" || this.sg2.cells(7,this.sg2.row) != "-") {
								system.alert(this,"Data telah direkonsiliasi.","Data tidak valid.");
							} else {
								this.sg.setCell(7,this.sg.row,this.e_spb.getText());
								this.sg2.setCell(7,this.sg2.row,this.e_inv.getText());
								this.sg2.setCell(8,this.sg2.row,this.sg.cells(6,this.sg.row));
							}
						}
					}
					this.sg2.validasi();
				} else {
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.rowValid(i)) this.sg.setCell(7,i,'-');
					}
					for (var i=0; i < this.sg2.rows.getLength(); i++){
						if (this.sg2.rowValid(i)) {
							this.sg2.setCell(7,i,'-');
							this.sg2.setCell(8,i,'0');
						}
					}
				}
			}
		}
	}	
});