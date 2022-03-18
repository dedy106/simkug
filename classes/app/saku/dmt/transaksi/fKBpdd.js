window.app_saku_dmt_transaksi_fKBpdd = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fKBpdd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fKBpdd";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kas Bank Pembayaran Dimuka: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["KM","BM"], tag:2});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No KB", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[270,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"Akun KasBank",btnClick:[this,"doBtnClick"],change:[this, "doChange"], readOnly: true});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,28,200,20],caption:"Total Kontrak",tipeText:ttNilai,alignment:alLeft, readOnly:true, text: "0"});
		this.cb_pph = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun PPh",btnClick:[this,"doBtnClick"],readOnly: true, tag:9});
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[710,29,200,20],caption:"Nilai PPN",tipeText:ttNilai,alignment:alLeft,change :[this,"doChange"]});
		this.cb_pdd = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Akun PDD",btnClick:[this,"doBtnClick"],readOnly: true});
		this.e_kas = new portalui_saiLabelEdit(this,{bound:[710,26,200,20],caption:"Total KasBank",tipeText:ttNilai,alignment:alLeft, readOnly:true, text: "0"});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],rightLabelVisible:false,readOnly: true});
		this.bLoad = new portalui_imageButton(this,{bound:[220,27,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.i_viewer = new portalui_imageButton(this,{bound:[910,27,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[710,27,200,20],caption:"Nilai PPh",tipeText:ttNilai,alignment:alLeft,change :[this,"doChange"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,910,270],caption:"Data Kontrak"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,910,255],colCount:9,colTitle:["Status","No Kontrak","Tanggal","Keterangan","No Dokumen","No PO","Akun Pdpt","Nilai","Jml Bln"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[70,100,80,200,120,100,60,100,50]], colFormat:[[7,8],[cfNilai,cfNilai]],defaultRow:1,buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["BAYAR","TIDAK"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,8],[0,8]],change:[this,"doChangeCell"],
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
			this.e_pph.setText("0"); this.e_ppn.setText("0");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fKBpdd.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fKBpdd.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into dmt_kb(no_kb,no_dokumen,tanggal, periode, keterangan,no_invoice,akun_kb,kode_lokasi,nilai,nik_user,tgl_input,posted,kode_cust,no_kontrak,nilai_pph,akun_pph)values" +
						"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"','-', "+
						"	 '"+this.cb_akun.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.e_kas.getText())+",'"+this.app._userLog+"',now(),'F','"+this.cb_cust.getText()+"','-',"+parseNilai(this.e_pph.getText())+",'"+this.cb_pph.getText()+"' )");					
					
					this.createJurnal();
					var d = "insert into dmt_kb_j(no_kb,kode_lokasi,no_urut,kode_akun,dc,nilai, keterangan,kode_pp, kode_drk, periode, tanggal, kode_curr, kurs,posted) values ";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 ,'F')";
					}
					sql.add(d);
					
					if (this.sg.getRowValidCount() > 0){
						var x = this.e_periode.getText();
						var p = "";
						var d="insert into dmt_kb_d(no_kb, kode_lokasi, no_invoice, nilai, jenis, jumlah, per_akhir,akun_pdd,per_flag)values";
						var ix = 0;						
						for (var i=0;i < this.sg.getRowCount();i++){
							if ((this.sg.cells(0,i) == "BAYAR") && (this.sg.cells(7,i) != "0")){
								p = nextNPeriode(x,parseFloat(this.sg.cells(8,i)));
								if (ix > 0) d+= ",";
								d += "('"+this.e_kb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"',"+parseNilai(this.sg.cells(7,i))+",'PDD',"+parseNilai(this.sg.cells(8,i))+",'"+p+"','"+this.cb_pdd.getText()+"','"+this.e_periode.getText()+"')";
								ix++;
							}
						}	
						sql.add(d);
					}					
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
						if ((this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(2,i))) && (this.sg.getCell(0,i) == "BAYAR")) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl kontrak. Baris["+i+"]");
							return false;   
						}
						if (nilaiToFloat(this.sg.getCell(8,i)) <= 0){
							system.alert(this,"Jumlah tidak valid.","Tidak boleh nol atau kurang. Baris["+i+"]");
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
			case "simpancek" : this.simpan();			
				break;
				
		}
	},
	doChange: function(sender){
		try{			
			if (sender  == this.e_pph) {
				if (this.e_pph.getText() != "0") {
					this.e_kas.setText(floatToNilai(this.nkas +  nilaiToFloat(this.e_ppn.getText()) - nilaiToFloat(this.e_pph.getText())));
					this.cb_pph.setTag("0");
				}
				else this.cb_pph.setTag("9");
			}
			if (sender  == this.e_ppn) {
					if (this.e_ppn.getText() != "") {
						this.e_kas.setText(floatToNilai(this.nkas +  nilaiToFloat(this.e_ppn.getText()) - nilaiToFloat(this.e_pph.getText())));
					}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadClick: function(sender){
		try{			
			if (this.cb_cust.getText() != "") {
				this.sg.clear(1);
				if (this.cb_cust.getText() != "") {
					var data = this.dbLib.getDataProvider("select f.no_kontrak,date_format(f.tanggal_po,'%d/%m/%Y')as tanggal,f.keterangan,f.no_dokumen,f.no_po,f.akun_pdpt,f.nilai from "+						
						" 	dmt_kontrak f "+
						"   where f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_cust ='"+this.cb_cust.getText()+"' order by f.no_kontrak");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (line !== undefined)
								this.sg.appendData(["BAYAR",line.no_kontrak, line.tanggal, line.keterangan, line.no_dokumen, line.no_po,line.akun_pdpt, floatToNilai(line.nilai),"12"]);
						}
						this.doSgChange(this.sg, 8, 0);
					}				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama   from dmt_cust where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_cust) from dmt_cust where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_cust","nama"],"and",["Kode Customer","Nama Customer"],false);				
				this.sg.clear(1);
			}
			if ((sender == this.cb_akun) || (sender == this.cb_pph) || (sender == this.cb_pdd)){
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No KB : "+ this.e_kb.getText()+")");
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
		if ((col == 8) && (this.sg.getCell(8,row) != "")){
			this.doSgChange(this.sg, 8, 0);
		}
	},
	doSgChange: function(sender, col, row){
		if (col == 8){
			var tot = 0;			
			for (var i = 0;i < this.sg.getRowCount();i++){
				if ((this.sg.cells(0,i) == "BAYAR") && ((this.sg.cells(7,i) != "") && (this.sg.cells(8,i) != "")))
					tot += (nilaiToFloat(this.sg.cells(7,i)) * nilaiToFloat(this.sg.cells(8,i)));
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_ppn.setText(floatToNilai(tot * 0.1));
			this.nkas = tot;
			this.e_kas.setText(floatToNilai(this.nkas + nilaiToFloat(this.e_ppn.getText()) -  nilaiToFloat(this.e_pph.getText())));
		}
	},
	createJurnal: function(){				
		try{
			var rows = [];
			var pdd = nilaiToFloat(this.e_kas.getText()) + nilaiToFloat(this.e_pph.getText());
			rows[rows.length] = {kode_akun:this.cb_akun.getText(), nama:this.cb_akun.getRightLabelCaption(),dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_kas.getText()),kode_pp:this.app._kodePP, kode_drk:'-'};
			rows[rows.length] = {kode_akun:this.cb_pph.getText(), nama:this.cb_pph.getRightLabelCaption(),dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_pph.getText()),kode_pp:this.app._kodePP, kode_drk:'-'};
			rows[rows.length] = {kode_akun:this.cb_pdd.getText(), nama:this.cb_pdd.getRightLabelCaption(),dc:"C", keterangan:this.e_ket.getText(), nilai: pdd,kode_pp:this.app._kodePP, kode_drk:'-'};
			
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
		if (sender == this.b_gen)
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_kb","no_kb",this.app._lokasi+"-"+this.cb_jenis.getText()+this.e_periode.getText().substr(2,4)+".","00000"));		
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
	}	
});