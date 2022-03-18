window.app_saku_dmt_transaksi_fInvoiceK = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fInvoiceK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fInvoiceK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Invoice : Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_invoice = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No Invoice",btnClick:[this,"doBtnClick"],tag:1,rightLabelVisible:false,readOnly:true});
		this.bLoad = new portalui_imageButton(this,{bound:[270,13,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,29,250,20],caption:"No Dokumen", maxLength: 50});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Jth Tempo", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],date:new Date().getDateStr()});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,23,540,20],caption:"Keterangan", maxLength: 150});		
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"NIK Approve",btnClick:[this,"doBtnClick"]});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Customer", readOnly: true});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[530,18,200,20],caption:"Total",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.cb_kontrak = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Kontrak", readOnly: true});				
		this.b_ok = new portalui_button(this,{bound:[300,24,80,18],caption:"True All",click:[this,"doClick"]});
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[530,24,200,20],caption:"PPN",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.i_viewer = new portalui_imageButton(this,{bound:[730,24,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});

		this.p1 = new portalui_panel(this,{bound:[20,26,730,280],caption:"Data Detail Invoice"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,730,255],colCount:5,colTitle:["Status(T/F)","No Bill","Keterangan","Jml [Bln]","Nilai"],
					colWidth:[[0,1,2,3,4],[100,120,250,100,120]], colFormat:[[3,4],[cfNilai,cfNilai]],defaultRow:1,
					ellipsClick:[this, "sgFindBtnClick"],change:[this, "doSgChange"],buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["TRUE","FALSE"]})]], columnReadOnly:[true,[1,2,3,4],[0]]});				
					
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
			
			this.dbLib.getDataProviderA("select a.flag,b.nama,a.kode_spro from spro a inner join masakun b on b.kode_akun = a.flag and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi ='"+this.app._lokasi+"' and (kode_spro = 'UNBILL' or kode_spro = 'PPNK')");						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fInvoiceK.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fInvoiceK.implement({
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
					var	nb = this.e_invoice.getText();				
					
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode)
							sql.add("delete from dmt_bill_j where no_bill = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_invoice","no_invoice",this.app._lokasi+"-INV"+this.e_periode.getText().substr(2,4)+".","00000");
							var d = ";";
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_invoice.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 )";
							}
							sql.add(d);
						}						
					}else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("delete from dmt_invoice where no_invoice = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from dmt_invoice_d where no_invoice = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					
					sql.add("update dmt_invoice set no_invoice='"+nb+"',no_dokumen='"+this.e_dok.getText()+"',tanggal='"+this.dp_d1.getDateString()+"' "+
						"	, periode='"+this.e_periode.getText()+"', keterangan='"+this.e_ket.getText()+"',kode_cust='"+this.cb_cust.getText()+"',tanggal_baps='"+this.dp_d2.getDateString()+"' "+
						"	, no_kontrak='"+this.cb_kontrak.getText()+"', nilai='"+parseNilai(this.e_nilai.getText())+"',nik_app='"+this.cb_nik.getText()+"',nilai_ppn="+parseNilai(this.e_ppn.getText())+" " +						
						"where no_invoice ='"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_invoice_d(no_invoice, kode_lokasi, no_bill)values";
						var ix = 0;
						var bill = [];
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.cells(0,i).toUpperCase() == "TRUE"){
								if (ix > 0) d+= ",";
								d += "('"+this.e_invoice.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"')";
								bill.push("'"+this.sg.cells(1,i)+"'");
								ix++;
							}
						}	
						sql.add(d);
						sql.add("update dmt_billing set progress = '1' where no_bill in ("+bill+") and kode_lokasi ='"+this.app._lokasi+"' ");
					}	
					this.createJurnal();
					var d = "insert into dmt_bill_j(no_bill,kode_lokasi,no_urut,kode_akun,dc,nilai,keterangan,kode_pp, kode_drk, periode, tanggal, kode_curr, kurs,posted)values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_invoice.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1,'F' )";
					}
					sql.add(d);
					sql.add("update dmt_kontrak set akun_ppn = '"+this.akunPpn+"' where no_kontrak ='"+this.cb_kontrak.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_invoice);
					this.sg.clear(1); 
				}
				break;			
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
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
			case "hapus" : 
			    var data = this.dbLib.getDataProvider("select no_kb from dmt_kb_d where no_invoice = '"+this.e_invoice.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Invoice sudah dibayar.","Data tidak dapat dihapus.");
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
					
					var	nb = this.e_invoice.getText();				
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode)
							sql.add("delete from dmt_bill_j where no_bill = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_invoice","no_invoice",this.app._lokasi+"-INV"+this.e_periode.getText().substr(2,4)+".","00000");							
							var d = ";";
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_invoice.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 )";
							}
							sql.add(d);
						}						
					}else sql.add("delete from dmt_bill_j where no_bill = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					
					sql.add("delete from dmt_invoice_d where no_invoice = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					if (this.sg.getRowValidCount() > 0){
						var ix = 0;
						var bill = [];
						for (var i=0;i < this.sg.getRowCount();i++){
							if (ix > 0) d+= ",";
							bill.push("'"+this.sg.cells(1,i)+"'");						
						}							
						sql.add("update dmt_billing set progress = '0' where no_bill in ("+bill+") and kode_lokasi ='"+this.app._lokasi+"' ");
					}	
					sql.add("update dmt_kontrak set akun_ppn = '-' where no_kontrak ='"+this.cb_kontrak.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
				
		}
	},
	doLoadClick: function(sender){
		try{						
			if (this.e_invoice.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.kode_cust, b.nama, a.no_kontrak, a.keterangan, a.nik_app, h.nama as nmapp "+
				"	, e.akun_ar, e.akun_pdpt, f.nama as nmar, g.nama as nmpdpt, a.posted, a.periode, a.no_dokumen, a.tanggal_baps "+
				"	, c.no_bill, d.keterangan as ket, d.jumlah, d.nilai, 'TRUE' as status "+
				"	from dmt_invoice a inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
				"		inner join dmt_invoice_d c on c.no_invoice = a.no_invoice and c.kode_lokasi = a.kode_lokasi "+
				"		inner join dmt_billing d on d.no_bill = c.no_bill and d.kode_lokasi = a.kode_lokasi "+
				"		inner join dmt_kontrak e on e.no_kontrak = a.no_kontrak and e.kode_lokasi = a.kode_lokasi "+
				"		left outer join karyawan h on h.nik= a.nik_app and h.kode_lokasi = a.kode_lokasi "+
				"		left outer join masakun f on f.kode_akun = e.akun_ar and f.kode_lokasi = a.kode_lokasi "+
				"		left outer join masakun g on g.kode_akun = e.akun_pdpt and g.kode_lokasi = a.kode_lokasi "+
				"	where a.no_invoice = '"+this.e_invoice.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof(data) == "object"){						
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line !== undefined)
							this.sg.appendData(["TRUE",line.no_bill, line.ket, floatToNilai(line.jumlah), floatToNilai(line.nilai)]);
					}
					if (line !== undefined){
						this.akunAR = line.akun_ar;
						this.akunPdpt = line.akun_pdpt;
						this.namaAR = line.nmar;
						this.namaPdpt = line.nmpdpt;
						this.posted = line.posted;						
						this.perLama = line.periode;						
					
						this.doSgChange(this.sg, 0, 0);
						this.cb_cust.setText(line.kode_cust, line.nama);
						this.cb_kontrak.setText(line.no_kontrak);
						this.e_dok.setText(line.no_dokumen);
						this.dp_d2.setDateString(line.tanggal_baps);
						this.e_ket.setText(line.keterangan);
						this.cb_nik.setText(line.nik_app, line.nmapp);
						
						data = this.dbLib.getDataProvider("select * from dmt_bill_j where no_bill='"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);				
						this.dataJurnal2 = data;
						setTipeButton(tbUbahHapus);
					}else setTipeButton(tbAllFalse);
				}else setTipeButton(tbAllFalse);
			}
		}catch(e){
			setTipeButton(tbAllFalse);
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.e_invoice) {   
			    this.standarLib.showListData(this, "Daftar Invoice",sender,undefined, 
											  "select a.no_invoice, a.keterangan,a.kode_cust, b.nama from dmt_invoice a "+
											  "       inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode <= '"+this.e_periode.getText()+"' and a.progress = '0' ",
											  "select count(no_invoice) from dmt_invoice a where kode_lokasi='"+this.app._lokasi+"' and a.periode <= '"+this.e_periode.getText()+"' and progress = '0'",
											  ["no_invoice","keterangan","kode_cust","nama"],"and",["No Invoice","Keterangan","Kode Cust","Nama"],false);				
				this.standarLib.clearByTag(this, new Array("0","1"),undefined);
				this.sg.clear(1); 
			}
			if (sender == this.cb_nik) 
			{   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (INVOICE : "+ this.e_invoice.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getDataProvider" :						
						this.akunIM = "-";
						this.namaIM = "-";
						this.akunPpn = "-";
						this.namaPpn = "-";
						if (result.toLowerCase().search("error") == -1){
							eval("data = "+result+";");
							for (var i in data.rs.rows){
								if (data.rs.rows[i].kode_spro == "UNBILL"){
									this.akunIM = data.rs.rows[0].flag;
									this.namaIM = data.rs.rows[0].nama;
								}else{
									this.akunPpn = data.rs.rows[0].flag;
									this.namaPpn = data.rs.rows[0].nama;
								}
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
	},
	doSgChange: function(sender, col, row){
		if (col == 0){
			var tot = 0;			
			for (var i = 0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(0,i).toUpperCase() == "TRUE")
					tot += nilaiToFloat(this.sg.cells(4,i));
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1)));
		}
	},
	createJurnal: function(){		
		var ppn = Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1);
		this.dataJurnal = {rs: { 	rows:[{kode_akun:this.akunAR, nama:this.namaAR,dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.e_nilai.getText()) + ppn,kode_pp:this.app._kodePP, kode_drk:'-'},
										  {kode_akun:this.akunIM, nama:this.namaIM,dc:"C", keterangan:this.e_ket.getText(), nilai:  nilaiToFloat(this.e_nilai.getText()),kode_pp:this.app._kodePP, kode_drk:'-'},
										  {kode_akun:this.akunPpn, nama:this.namaPpn,dc:"C", keterangan:this.e_ket.getText(), nilai: ppn,kode_pp:this.app._kodePP, kode_drk:'-'},
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