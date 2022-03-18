//pindhin spro utk unbill dr value1 ke flag...
window.app_saku_dmt_transaksi_fBilling = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fBilling.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fBilling";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing : Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_bill = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Billing", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[270,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,17,480,20],caption:"Keterangan", maxLength:150});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,18,250,20],caption:"Customer",btnClick:[this,"doBtnClick"],change:[this, "doChange"],readOnly: true});		
		this.e_jml = new portalui_saiLabelEdit(this,{bound:[667,18,160,20], labelWidth:60, caption:"Jumlah [Bln]",tipeText:ttNilai,alignment:alRight,change:[this, "doChange"]});
		this.cb_kontrak = new portalui_saiCBBL(this,{bound:[20,24,250,20],caption:"No Kontrak",btnClick:[this,"doBtnClick"],rightLabelVisible:false,readOnly: true});
		this.bLoad = new portalui_imageButton(this,{bound:[270,24,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[667,24,160,20], labelWidth:60, caption:"Total",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.i_viewer = new portalui_imageButton(this,{bound:[827,24,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
							
		this.p1 = new portalui_panel(this,{bound:[20,26,827,354],caption:"Data Billing per Site"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,822,334],colCount:6,colTitle:["Site ID","Keterangan Site","Tgl BAPS","Nilai","Jml [Bln]","Sub Ttl"],
					colWidth:[[0,1,2,3,4,5],[120,250,100,100,80,120]], columnReadOnly:[true,[0,1,2,4,5],[3]], 
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],defaultRow:1, autoAppend: false,
					change:[this, "doSgChange"]});		
		
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
			this.dbLib.getDataProviderA("select a.flag,b.nama from spro a inner join masakun b on b.kode_akun = a.flag and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi ='"+this.app._lokasi+"' and kode_spro = 'UNBILL'");						
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,b.nama,a.flag from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_spro = 'PDD' and a.kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.kode_spro == "PDD") {
						this.akunPDD = line.flag;
						this.namaPDD = line.nama;
					}
				}
			}
			this.e_jml.setText("0");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fBilling.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fBilling.implement({
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
					var jmlPdd = 1; 
					
					sql.add("insert into dmt_billing(no_bill,tanggal,periode,keterangan,kode_cust,no_kontrak,kode_lokasi,nilai,progress,nik_user,tgl_input, posted, akun_bill,jumlah,jml_pdd,akun_pdd,per_flag)values" +
						"	('"+this.e_bill.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"','"+this.cb_cust.getText()+"', "+
						"	 '"+this.cb_kontrak.getText()+"','"+this.app._lokasi+"','"+parseNilai(this.e_nilai.getText())+"','0','"+this.app._userLog+"',now(),'F','"+this.akunIM+"',"+parseNilai(this.e_jml.getText())+","+jmlPdd+",'"+this.akunPDD+"','"+getNextPeriode(this.e_periode.getText())+"')");
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_billing_d(no_bill, kode_lokasi, no_fa, nilai)values";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.e_bill.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(3,i))+")";
							}
						}	
						sql.add(d);
					}	
					this.createJurnal();
					var d = "insert into dmt_bill_j(no_bill,kode_lokasi,no_urut,kode_akun,dc,nilai,keterangan,kode_pp, kode_drk, periode, tanggal, kode_curr, kurs,posted)values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_bill.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"','"+line.nilai+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1,'F' )";
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_bill);
					this.sg.clear(1);
				}
				break;			
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai billing tidak boleh kurang dari atau sama dengan nol.");
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
		}
	},
	doLoadClick: function(sender){
		try{			
			this.sg.clear(1);
			if (this.cb_kontrak.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_fa, b.nama, date_format(b.tgl_baps,'%d/%m/%Y')as tanggal, a.nilai, c.akun_ar, c.akun_pdpt, d.nama as namaar,e.nama as nmpdpt "+
				    "   from dmt_kontrak_d a "+
					"	     inner join fa_asset b on b.no_fa = a.no_fa and a.kode_lokasi = b.kode_lokasi "+
					"	     inner join dmt_kontrak c on c.no_kontrak = a.no_kontrak and c.kode_lokasi = a.kode_lokasi "+
					"	     inner join masakun d on d.kode_akun = c.akun_ar and d.kode_lokasi = c.kode_lokasi "+
					"	     inner join masakun e on e.kode_akun = c.akun_pdpt and e.kode_lokasi = c.kode_lokasi "+
					"   where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_kontrak ='"+this.cb_kontrak.getText()+"' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_fa, line.nama, line.tanggal, floatToNilai(line.nilai),"0","0"]);
					}
					this.akunAR = line.akun_ar;
					this.akunPdpt = line.akun_pdpt;
					this.namaAR = line.namaar;
					this.namaPdpt = line.nmpdpt;
					this.doSgChange(this.sg, 3, 0);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_cust ) {
				this.cb_kontrak.setText("");
				this.sg.clear(1);
			}
			if (sender == this.e_jml ) {
				if (this.sg.getRowValidCount() > 0){
					var subtot = tot = 0;			
					for (var i = 0;i < this.sg.getRowCount();i++){
						this.sg.setCell(4,i,this.e_jml.getText());
						if ((this.sg.cells(3,i) != "") && (this.sg.cells(4,i) != "")) {
							subtot = nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(4,i));
							this.sg.setCell(5,i,floatToNilai(subtot));
							tot += subtot;
						}
					}
					this.e_nilai.setText(floatToNilai(tot));
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
			}
			if (sender == this.cb_kontrak) {   
			    this.standarLib.showListData(this, "Daftar Kontrak",sender,undefined, 
											  "select no_kontrak, keterangan from dmt_kontrak where kode_lokasi='"+this.app._lokasi+"' and kode_cust = '"+this.cb_cust.getText()+"' ",
											  "select count(no_kontrak) from dmt_kontrak where kode_lokasi='"+this.app._lokasi+"' and kode_cust = '"+this.cb_cust.getText()+"' ",
											  ["no_kontrak","keterangan"],"and",["No Kontrak","Keterangan"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Billing : "+ this.e_bill.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getDataProvider" :						
						this.akunIM = "-";
						this.namaIM = "-";
						if (result.toLowerCase().search("error") == -1){
							eval("data = "+result+";");
							if (data.rs.rows[0] !== undefined){
								this.akunIM = data.rs.rows[0].flag;
								this.namaIM = data.rs.rows[0].nama;
							}
						}else throw(result);
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
	doSgChange: function(sender, col, row){
		if (col == 3){
			var subtot = tot = 0;			
			for (var i = 0;i < this.sg.getRowCount();i++){
				if ((this.sg.cells(3,i) != "") && (this.sg.cells(4,i) != "")) {
					subtot = nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(4,i));
					this.sg.setCell(5,i,floatToNilai(subtot));
					tot += subtot;
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}
	},
	createJurnal: function(){		
	    if (this.e_jml.getText() != "1") { 
			var n_pdpt = nilaiToFloat(this.e_nilai.getText()) / 12;
			var n_pdd = nilaiToFloat(this.e_nilai.getText()) - (nilaiToFloat(this.e_nilai.getText()) / 12);
		}
		else{
			var n_pdpt = nilaiToFloat(this.e_nilai.getText());
			var n_pdd = 0;
		}
		this.dataJurnal = {rs: { 	rows:[ {kode_akun:this.akunIM, nama:this.namaIM,dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_nilai.getText()),kode_pp:this.app._kodePP, kode_drk:'-'},
										   {kode_akun:this.akunPdpt, nama:this.namaPdpt,dc:"C", keterangan:this.e_ket.getText(), nilai: n_pdpt,kode_pp:this.app._kodePP, kode_drk:'-'},
										   {kode_akun:this.akunPDD, nama:this.namaPDD,dc:"C", keterangan:this.e_ket.getText(), nilai:  n_pdd,kode_pp:this.app._kodePP, kode_drk:'-'}
										 ],
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
	},
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_bill.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_billing","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","00000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
			
	}	
});