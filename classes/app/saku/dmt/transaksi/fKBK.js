window.app_saku_dmt_transaksi_fKBK = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fKBK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fKBK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kas Bank : Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["KM","BM"],tag:2});
		this.e_kb = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No KB",btnClick:[this,"doBtnClick"],tag:1,rightLabelVisible:false,readOnly:true});
		this.bLoad = new portalui_imageButton(this,{bound:[270,13,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"Akun",btnClick:[this,"doBtnClick"],readOnly: true});
		this.cb_pph = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun PPh",btnClick:[this,"doBtnClick"],readOnly: true, tag:9});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[610,29,200,20],caption:"Total Tagihan",tipeText:ttNilai,alignment:alLeft, readOnly:true, text: "0"});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Customer",readOnly: true});
		this.e_kas = new portalui_saiLabelEdit(this,{bound:[610,26,200,20],caption:"Total Bayar",tipeText:ttNilai,alignment:alLeft, readOnly:true, text: "0"});
		this.cb_kontrak = new portalui_saiLabelEdit(this,{bound:[20,27,250,20],caption:"No Kontrak", readOnly:true});		
		this.i_viewer = new portalui_imageButton(this,{bound:[810,27,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[610,27,200,20],caption:"Nilai PPh",tipeText:ttNilai,alignment:alLeft,change :[this,"doChange"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,810,290],caption:"Data Invoice"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,810,265],colCount:7,colTitle:["No Invoice","Tanggal","Keterangan","Akun AR","Nama Akun","Sisa Tagihan","Nilai Bayar"],
					colWidth:[[0,1,2,3,4,5,6],[100,80,200,80,100,100,100]], colFormat:[[5,6],[cfNilai,cfNilai]],defaultRow:1, 
					columnReadOnly:[true,[0,1,2,3,4,5],[6]],change:[this,"doChangeCell"],
					change:[this, "doSgChange"],autoAppend:false});
					
		this.rearrangeChild(10, 22);		
		setTipeButton(tbAllFalse);
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
			this.e_pph.setText("0");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fKBK.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fKBK.implement({
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
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var nbBaru; 
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode) {
							sql.add("delete from dmt_kb_j where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							sql.add("delete from dmt_kb_d where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else {
								sql.add("delete from dmt_kb_j where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
								sql.add("delete from dmt_kb_d where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							}
						}else {	
						    nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_kb","no_kb",this.app._lokasi+"-"+this.cb_jenis.getText()+this.e_periode.getText().substr(2,4)+".","00000");							
							var d ="";
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 )";
							}
							sql.add(d);
						}						
					}else {
						sql.add("delete from dmt_kb_j where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("delete from dmt_kb_d where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					}
					nbBaru = nbBaru == undefined ? this.e_kb.getText() : nbBaru;
					sql.add("update dmt_kb set no_kb='"+nbBaru+"',tanggal='"+this.dp_d1.getDateString()+"', periode='"+this.e_periode.getText()+"' "+
						"	,  keterangan='"+this.e_ket.getText()+"', no_invoice='-', akun_kb='"+this.cb_akun.getText()+"' "+
						"	, nilai="+parseNilai(this.e_kas.getText())+",nilai_pph="+parseNilai(this.e_pph.getText())+",akun_pph='"+this.cb_pph.getText()+"' " +				
						"	where no_kb ='"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_kb_d(no_kb, kode_lokasi, no_invoice, nilai, jenis, jumlah, per_akhir, akun_pdd,per_flag)values";
						var ix = 0;						
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.cells(6,i) != "0"){
								if (ix > 0) d+= ",";
								d += "('"+this.e_kb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(6,i))+",'INV',0,'-','-','-')";
								ix++;
							}
						}	
						sql.add(d);
					}
					
					this.createJurnal();
					var d = "insert into dmt_kb_j(no_kb,kode_lokasi,no_urut,kode_akun,dc,nilai, keterangan,kode_pp, kode_drk, periode, tanggal, kode_curr, kurs,posted)values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1,'F' )";
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
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
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
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode) {
							sql.add("delete from dmt_kb_j where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							sql.add("delete from dmt_kb_d where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else {
								sql.add("delete from dmt_kb_j where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
								sql.add("delete from dmt_kb_d where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							}
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_kb","no_kb",this.app._lokasi+"-"+this.cb_jenis.getText()+this.e_periode.getText().substr(2,4)+".","00000");
							var d ="";
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 )";
							}
							sql.add(d);
						}						
					}else {
						sql.add("delete from dmt_kb_j where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("delete from dmt_kb_d where no_kb = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					}					
					sql.add("delete from dmt_kb where kode_lokasi = '"+this.app._lokasi+"' and no_kb = '"+this.e_kb.getText()+"' ");
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
				
		}
	},
	doChange: function(sender){
		try{			
			if (sender  == this.e_pph) {
				if (this.e_pph.getText() != "0") {
					this.e_kas.setText(floatToNilai(this.nkas -  nilaiToFloat(this.e_pph.getText())));
					this.cb_pph.setTag("0");
				}
				else this.cb_pph.setTag("9");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadClick: function(sender){
		try{						
			if (this.e_kb.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.akun_kb,b.nama as nama_akun,a.kode_cust,c.nama as nama_cust,a.no_kontrak,a.akun_pph,d.nama as nama_pph,a.nilai_pph  "+
				           "from dmt_kb a "+
				           "inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "inner join dmt_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
						   "inner join masakun d on a.akun_pph=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						   "where a.no_kb = '"+this.e_kb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				
				if (typeof(data) == "object"){						
					var line = data.rs.rows[0];							
					if (line !== undefined){
						this.cb_cust.setText(line.kode_cust, line.nama_cust);
						this.cb_kontrak.setText(line.no_kontrak);
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);
						this.cb_akun.setText(line.akun_kb, line.nama_akun);							
						this.cb_pph.setText(line.akun_pph, line.nama_pph);							
						this.e_pph.setText(floatToNilai(line.nilai_pph));
						setTipeButton(tbUbahHapus);
					}else setTipeButton(tbAllFalse);
				}else setTipeButton(tbAllFalse);
				
				this.sg.clear(1);
				if (this.cb_kontrak.getText() != "") {
					var data = this.dbLib.getDataProvider("select f.no_invoice,date_format(f.tanggal,'%d/%m/%Y')as tanggal,f.keterangan,c.akun_ar,(f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0) as sisa,j.nama as nama_akun,aa.nilai as bayar from "+						
						" 	dmt_invoice f "+
						" 	inner join dmt_kb_d aa on f.no_invoice = aa.no_invoice and f.kode_lokasi = aa.kode_lokasi "+
						"	inner join dmt_kontrak c on c.no_kontrak = f.no_kontrak and c.kode_lokasi = f.kode_lokasi "+					
						"	inner join masakun j on c.akun_ar = j.kode_akun and c.kode_lokasi = j.kode_lokasi "+					
						"   left outer join (select no_invoice,kode_lokasi, sum(nilai) as totbayar from dmt_kb_d where kode_lokasi='"+this.app._lokasi+"' and no_kb <> '"+this.e_kb.getText()+"' group by no_invoice,kode_lokasi) y on y.no_invoice=f.no_invoice and y.kode_lokasi=f.kode_lokasi "+						
						" where aa.no_kb='"+this.e_kb.getText()+"' and f.kode_lokasi = '"+this.app._lokasi+"' and f.no_kontrak ='"+this.cb_kontrak.getText()+"' order by f.no_invoice");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (line !== undefined)
								this.sg.appendData([line.no_invoice, line.tanggal, line.keterangan, line.akun_ar, line.nama_akun, floatToNilai(line.sisa), floatToNilai(line.bayar)]);
						}
						this.doSgChange(this.sg, 5, 0);
					}				
				}		
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.e_kb) {   
			    this.standarLib.showListData(this, "Daftar Kas Bank",sender,undefined, 
											  "select a.no_kb, a.keterangan from dmt_kb a where a.kode_lokasi='"+this.app._lokasi+"' and no_kontrak<>'-'",
											  "select count(a.no_kb)        from dmt_kb a where a.kode_lokasi='"+this.app._lokasi+"' and no_kontrak<>'-'",
											  ["a.no_kb","a.keterangan"],"and",["No KB","Keterangan"],false);				
			}
			if ((sender == this.cb_akun) || (sender == this.cb_pph)){
				this.standarLib.showListData(this, "Daftar Akun", sender, undefined,
											"select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0' ",
											"select count(kode_akun) from masakun where kode_lokasi = '"+this.app._lokasi +"' and block = '0' ",
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (KB : "+ this.e_kb.getText()+")");
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
	},
	doChangeCell: function(sender, col, row){
		if ((col == 6) && (this.sg.getCell(6,row) != "")){
			this.doSgChange(this.sg, 6, 0);
		}
	},
	doSgChange: function(sender, col, row){
		if ((col == 5)||(col == 6)){
			var tot = tot2 = 0;			
			for (var i = 0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(5,i) != "") 
					tot += nilaiToFloat(this.sg.cells(5,i));
				if (this.sg.cells(6,i) != "") 
					tot2 += nilaiToFloat(this.sg.cells(6,i));
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.nkas = tot2;
			this.e_kas.setText(floatToNilai(this.nkas -  nilaiToFloat(this.e_pph.getText())));
		}
	},
	createJurnal: function(){				
		try{
			var rows = [];
			rows[rows.length] = {kode_akun:this.cb_akun.getText(), nama:this.cb_akun.getRightLabelCaption(),dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_kas.getText()),kode_pp:this.app._kodePP, kode_drk:'-'};
			rows[rows.length] = {kode_akun:this.cb_pph.getText(), nama:this.cb_pph.getRightLabelCaption(),dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_pph.getText()),kode_pp:this.app._kodePP, kode_drk:'-'};
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(6,i)) != 0){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(3,i)){
							rows[j].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(3,i),nama:this.sg.cells(4,i),dc:"C", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
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
	}	
});