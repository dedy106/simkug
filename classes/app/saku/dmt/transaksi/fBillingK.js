window.app_saku_dmt_transaksi_fBillingK = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fBillingK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fBillingK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing : Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.e_bill = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No Billing",btnClick:[this,"doBtnClick"],tag:1,rightLabelVisible:false,readOnly:true});						
		this.bLoad = new portalui_imageButton(this,{bound:[270,13,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,23,480,20],caption:"Keterangan",maxLength:150,tag:1});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,18,250,20],caption:"Customer",tag:1,readOnly: true});
		this.e_jml = new portalui_saiLabelEdit(this,{bound:[667,18,160,20], labelWidth:60, caption:"Jumlah [Bln]",tipeText:ttNilai,alignment:alRight,change:[this, "doChange"]});
		this.cb_kontrak = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Kontrak",tag:1,readOnly: true});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[667,24,160,20], labelWidth:60, caption:"Total",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.i_viewer = new portalui_imageButton(this,{bound:[827,24,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
							
		this.p1 = new portalui_panel(this,{bound:[20,26,827,354],caption:"Data Billing per Site"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,822,334],colCount:6,colTitle:["Site ID","Keterangan Site","Tgl BAPS","Nilai","Jml [Bln]","Sub Ttl"],
					colWidth:[[0,1,2,3,4,5],[120,250,100,100,80,120]], columnReadOnly:[true,[0,1,2,4,5],[3]], 
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],defaultRow:1, autoAppend: false,
					change:[this, "doSgChange"]});		
					
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fBillingK.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fBillingK.implement({
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
					
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode)
							sql.add("delete from dmt_bill_j where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_billing","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","00000");
							var d ="";
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_bill.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1)";
							}
							sql.add(d);
						}						
					}else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("delete from dmt_billing_d where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("update dmt_billing set no_bill= '"+(nbBaru === undefined ? this.e_bill.getText() : nbBaru)+"', tanggal='"+this.dp_d1.getDateString()+"', periode='"+this.e_periode.getText()+"', "+
						"	keterangan='"+this.e_ket.getText()+"',kode_cust='"+this.cb_cust.getText()+"', no_kontrak='"+this.cb_kontrak.getText()+"',akun_bill='"+this.akunIM+"' "+
						"	, nilai= '"+parseNilai(this.e_nilai.getText())+"', jumlah="+parseNilai(this.e_jml.getText())+",jml_pdd=1,akun_pdd='"+this.akunPDD+"',per_flag='"+getNextPeriode(this.e_periode.getText())+"' "+
						"	where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_billing_d(no_bill, kode_lokasi, no_fa, nilai)values";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+(nbBaru === undefined ? this.e_bill.getText() : nbBaru)+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(3,i))+")";
							}
						}	
						sql.add(d);
					}						
					this.createJurnal();
					var d = "insert into dmt_bill_j(no_bill,kode_lokasi,no_urut,kode_akun,dc,nilai,keterangan,kode_pp, kode_drk, periode, tanggal, kode_curr, kurs,posted)values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+(nbBaru === undefined ? this.e_bill.getText() : nbBaru)+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1,'F')";
					}
					sql.add(d);
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_bill);
					this.sg.clear(1);
				}
				break;			
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				var data = this.dbLib.getDataProvider("select no_invoice from dmt_invoice_d where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah ditagihkan.","Data tidak dapat diubah.");
						return false;
					}
				}
				var data = this.dbLib.getDataProvider("select no_pdd from dmt_pdd_d where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah di reklas pdd.","Data tidak dapat diubah.");
						return false;
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
				var data = this.dbLib.getDataProvider("select no_invoice from dmt_invoice_d where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah ditagihkan.","Data tidak dapat dihapus.");
						return false;
					}
				}
				var data = this.dbLib.getDataProvider("select no_pdd from dmt_pdd_d where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah di reklas pdd.","Data tidak dapat dihapus.");
						return false;
					}
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode)
							sql.add("delete from dmt_bill_j where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_billing","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","00000");							
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_bill.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 )";
							}
						}						
					}else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					
					sql.add("delete from dmt_billing_d where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");															
					sql.add("delete from dmt_billing where no_bill = '"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");															
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	doLoadClick: function(sender){
		try{			
			if (this.e_bill.getText() != ""){
				this.sg.clear(1);				
				var data = this.dbLib.getDataProvider("select f.kode_cust, h.nama, f.no_kontrak, f.keterangan, "+
				    "       g.no_fa, b.nama, date_format(b.tgl_baps,'%d/%m/%Y')as tanggal, g.nilai, f.jumlah, g.nilai * f.jumlah as subttl, c.akun_ar, c.akun_pdpt, d.nama as namaar,e.nama as nmpdpt,f.posted ,f.periode "+
				    " from dmt_kontrak_d a "+
					"   	inner join fa_asset b on b.no_fa = a.no_fa and a.kode_lokasi = b.kode_lokasi "+
					"		inner join dmt_kontrak c on c.no_kontrak = a.no_kontrak and c.kode_lokasi = a.kode_lokasi "+
					"		inner join dmt_billing f on f.no_kontrak = a.no_kontrak and f.kode_lokasi = a.kode_lokasi "+
					"		inner join dmt_billing_d g on g.no_bill = f.no_bill and g.kode_lokasi = a.kode_lokasi and g.no_fa=b.no_fa and g.kode_lokasi = b.kode_lokasi "+
					"		inner join dmt_cust h on h.kode_cust = f.kode_cust and h.kode_lokasi = a.kode_lokasi "+
					"		inner join masakun d on d.kode_akun = c.akun_ar and d.kode_lokasi = c.kode_lokasi "+
					"		inner join masakun e on e.kode_akun = c.akun_pdpt and e.kode_lokasi = c.kode_lokasi "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and f.no_bill ='"+this.e_bill.getText()+"' ",true);												
				
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_fa, line.nama, line.tanggal, floatToNilai(line.nilai), floatToNilai(line.jumlah), floatToNilai(line.subttl)]);
					}					
					this.doSgChange(this.sg, 3, 0);
					if (line !== undefined){
						this.cb_cust.setText(line.kode_cust, line.nama);
						this.cb_kontrak.setText(line.no_kontrak, "-");
						this.e_ket.setText(line.keterangan);						
						this.e_jml.setText(line.jumlah);						
						this.posted = line.posted;						
						this.perLama = line.periode;						
						
						this.akunAR = line.akun_ar;
						this.akunPdpt = line.akun_pdpt;
						this.namaAR = line.namaar;
						this.namaPdpt = line.nmpdpt;											
						data = this.dbLib.getDataProvider("select * from dmt_bill_j where no_bill='"+this.e_bill.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						eval("data = "+data+";");
						this.dataJurnal2 = data;						
						setTipeButton(tbUbahHapus);												
					}else setTipeButton(tbAllFalse);
				}
			}
		}catch(e){
			systemAPI.alert(e, data);
		}
	},
	doChange: function(sender){
		try{			
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
			if (sender == this.e_bill) {   
			    this.standarLib.showListData(this, "Daftar Billing",sender,undefined, 
											  " select a.no_bill, a.keterangan, a.kode_cust, b.nama, a.no_kontrak from dmt_billing a "+
											  "	      inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
											  "	where a.kode_lokasi='"+this.app._lokasi+"' and progress = '0' ",
											  " select count(no_bill) from dmt_billing a "+
											  "	      inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
											  " where a.kode_lokasi='"+this.app._lokasi+"' and progress = '0'",
											  ["a.no_bill","a.keterangan","a.kode_cust","b.nama","a.no_kontrak"],"and",["No Bill","Keterangan","Kode Cust","Nama","No Kontrak"],false);				
			
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);
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
		if (this.e_bill !== undefined) this.e_bill.click();
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
		this.dataJurnal = {rs: { 	rows:[{kode_akun:this.akunIM, nama:this.namaIM,dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_nilai.getText()),kode_pp:this.app._kodePP, kode_drk:'-'},
										  {kode_akun:this.akunPdpt, nama:this.namaPdpt,dc:"C", keterangan:this.e_ket.getText(), nilai:  nilaiToFloat(this.e_nilai.getText()),kode_pp:this.app._kodePP, kode_drk:'-'},
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
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
			
	}
});