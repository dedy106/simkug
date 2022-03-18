window.app_saku3_transaksi_tm_fBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bill","Tanggal","Customer","No PKS","Deskripsi","Total"],
					colWidth:[[5,4,3,2,1,0],[100,250,180,250,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bill",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[550,12,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_nokwi = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,200,20],caption:"No Kuitansi", tag:1, tipeText:ttNilai, text:"0"});
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[550,17,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.cb_draft = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Draft Invoice", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[550,14,200,20],caption:"Tot Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,15,this.pc2.width-5,this.pc2.height-105], childPage:["Data Billing","Draft Billing","Detail Billing"]});						
		this.e_namabill = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Atensi Bill", maxLength:50});		
		this.cb_kontrak = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"PKS", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Tanggal PKS", readOnly:true});		
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[240,13,100,20],labelWidth:0,caption:"", readOnly:true});		
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Saldo PKS", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ba = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Keterangan BA", maxLength:200});		
		this.e_faktur = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,320,20],caption:"No Faktur", maxLength:50});		
		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_jabatan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,300,20],caption:"Jabatan", maxLength:50});		
		
		this.cb_rek = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,300,20],caption:"Bank", maxLength:50});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[350,15,300,20],caption:"Cabang", maxLength:50});		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,300,20],caption:"No Rekening", maxLength:50});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[350,16,300,20],caption:"Nama Rekening", maxLength:50});		
		
		
		this.mDesk = new tinymceCtrl(this.pc1.childPage[1],{bound:[1,5,990,320], withForm:false});
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode DRK","Nama DRK","Deskripsi","Harga Satuan","Jumlah Peserta","Jumlah"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,250,150,80,150,80]],
					columnReadOnly:[true,[1,3,7],[0,2,4,5,6]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					ellipsClick:[this,"doEllipsClick2"],
					defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);					
			this.cb_rek.setSQL("select kode_rek, nama_rek from bill_spro where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama_rek"],false,["Kode","Nama"],"and","Data Rekening",true);		
			
			this.cb_cust.setSQL("select kode_cust, nama from cust2 where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);														
			this.cb_draft.setSQL("select no_draft, nama from bill_draft where kode_lokasi = '"+this.app._lokasi+"'",["no_draft","nama"],false,["Kode","Nama"],"and","Data Draft",true);	
			
			var sql="select a.kode_rek,a.bank,a.cabang,a.no_rek,a.nama_rek,a.kode_lokasi,a.nik_app,b.jabatan "+
					"from bill_spro a "+
					"inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.nik_app);
				this.e_jabatan.setText(line.jabatan);
				/*
				this.e_bank.setText(line.bank);
				this.e_cabang.setText(line.cabang);
				this.e_norek.setText(line.no_rek);
				this.e_namarek.setText(line.nama_rek);
				*/
			} else this.cb_app.setText("","");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BLBANK','BLCAB','BLREK','BLNAMA') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "BLBANK") this.e_bank.setText(line.flag);			
					if (line.kode_spro == "BLCAB") this.e_cabang.setText(line.flag);			
					if (line.kode_spro == "BLREK") this.e_norek.setText(line.flag);			
					if (line.kode_spro == "BLNAMA") this.e_namarek.setText(line.flag);			
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fBill.extend(window.childForm);
window.app_saku3_transaksi_tm_fBill.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
					sql.add("insert into bill_m(no_bill,no_dokumen,no_ba,no_faktur,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ppn,kode_cust,no_kontrak,kode_pp,nik_buat,nik_app,jabatan,kode_lokasi,periode,nik_user,tgl_input,bank,cabang,no_rek,nama_rek,draft,nama_bill,kode_rek,no_kuitansi,no_piutang) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_ba.getText()+"','"+this.e_faktur.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_cust.getText()+"','"+this.cb_kontrak.getText()+"','"+this.app._kodePP+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.e_jabatan.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.e_namabill.getText()+"','"+this.cb_rek.getText()+"','"+this.e_nokwi.getText()+"','-')");								 
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																			
								sql.add("insert into bill_d(no_bill,kode_lokasi,nu,item,harga,jumlah,kode_akun,kode_drk) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(4,i)+"',"+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"')");
							}
						}						
					}
					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg3.clear(1); 
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh melebihi saldo.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyusutan tidak boleh nol atau kurang.");
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
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bill_m","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_nokwi.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bill_m","no_kuitansi","A"+this.e_periode.getText().substr(2,2),"000"));
		this.cb_cust.setFocus();				
	},
	doChange:function(sender){
		if (sender == this.e_nilai && this.e_nilai.getText()!=""){
			this.e_ppn.setText(floatToNilai(Math.abs(nilaiToFloat(this.e_nilai.getText())*0.1)));
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}
		if (sender == this.e_ppn && this.e_ppn.getText()!=""){
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}
		if (sender == this.cb_rek && this.cb_rek.getText() != "" && this.stsSimpan==1) {
			var sql="select a.bank,a.cabang,a.no_rek,a.nama_rek "+
					"from bill_spro a "+					
					"where a.kode_rek='"+this.cb_rek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_bank.setText(line.bank);
				this.e_cabang.setText(line.cabang);
				this.e_norek.setText(line.no_rek);
				this.e_namarek.setText(line.nama_rek);				
			}
		}				
		if (sender == this.cb_cust && this.cb_cust.getText() != "") {
			this.cb_kontrak.setSQL("select no_kontrak, no_dok from kontrak_m where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",["no_kontrak","no_dok"],false,["ID","No Dokumen"],"and","Data PKS",true);											
			if (this.stsSimpan==1) this.e_namabill.setText(this.cb_kontrak.rightLabelCaption);
		}
		if (sender == this.cb_kontrak && this.cb_kontrak.getText() != "") {			
			var strSQL = "select a.kode_produk,a.keterangan,convert(varchar,a.tgl_awal,103) as tgl_awal,convert(varchar,a.tgl_akhir,103) as tgl_akhir,(a.nilai+a.nilai_ppn-isnull(b.bill,0)) as saldo "+
			             "from kontrak_m a left join ("+
						 "              select kode_lokasi,no_kontrak,sum(nilai+nilai_ppn) as bill from bill_m where kode_lokasi='"+this.app._lokasi+"' and no_bill<>'"+this.e_nb.getText()+"' group by kode_lokasi,no_kontrak "+
						 ") b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
						 "where (a.nilai+a.nilai_ppn-isnull(b.bill,0)) > 0 and a.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kontrak='"+this.cb_kontrak.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){												
					this.e_tgl1.setText(line.tgl_awal);
					this.e_tgl2.setText(line.tgl_akhir);
					this.e_ket.setText(line.keterangan);
					this.e_saldo.setText(floatToNilai(line.saldo));		
					this.produk = line.kode_produk;			
				}				
			}
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun, a.nama from masakun a inner join bill_produk_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			        "where b.kode_produk='"+this.produk+"' and b.kode_lokasi='"+this.app._lokasi+"'");					
			this.dbLib.getMultiDataProviderA(sql);
			
		}
		if (sender == this.cb_draft & this.cb_draft.getText()!=""){
			try{				
				if (this.stsSimpan == 1) {
					var data = this.dbLib.getDataProvider("select keterangan from bill_draft where no_draft='"+this.cb_draft.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
					if (data && data.rs.rows[0]){
						var line = data.rs.rows[0];
						this.mDesk.setCode(urldecode(line.keterangan));
					}								
				}
			}catch(e){
				error_log(e);
			}
		}
		if (sender == this.cb_app && this.cb_app.getText() != "") {
			var strSQL = "select jabatan from karyawan "+
						 "where nik='"+this.cb_app.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){												
					this.e_jabatan.setText(line.jabatan);					
				}				
			}
		}
	},	
	doChangeCell2: function(sender, col, row){
		try {
		if (col == 5 || col == 6) {
			if (this.sg2.cells(5,row) != "" && this.sg2.cells(6,row) != "" ) {
			    var tot = Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(6,row)));
				this.sg2.cells(7,row,floatToNilai(tot));
			}
			this.sg2.validasi();
		}
		
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));			
				if (akun) {
					sender.cells(1,row,akun);
					
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}	
		if (col == 2) {
			if (sender.cells(2,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join bill_produk_d b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi where a.tahun=b.tahun and b.tahun = '"+this.e_periode.getText().substr(0,4)+"' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_produk = '"+this.produk+"' and b.kode_drk = '"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg2.cells(3,row,line.nama);
					else {						
						this.sg2.cells(2,row,"-");
						this.sg2.cells(3,row,"-");						
					}
				}
			}
		}	
		sender.onChange.set(this,"doChangeCell2");	
		}
		catch(e) {
   alert(e);		  
		}	
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun, a.nama from masakun a inner join bill_produk_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_produk='"+this.produk+"' and b.kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_akun, a.nama from masakun a inner join bill_produk_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_produk='"+this.produk+"' and b.kode_lokasi='"+this.app._lokasi+"') a ",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}							
			}
			if (col == 2){					
				this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
						"select distinct a.kode_drk, a.nama from drk a inner join bill_produk_d b on a.kode_drk=b.kode_drk where b.kode_produk='"+this.produk+"' and a.tahun=b.tahun and b.tahun = '"+this.e_periode.getText().substr(0,4)+"' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_lokasi='"+this.app._lokasi+"'",
						"select count(distinct a.kode_drk) from drk a inner join bill_produk_d b on a.kode_drk=b.kode_drk where b.kode_produk='"+this.produk+"' and a.tahun=b.tahun and b.tahun = '"+this.e_periode.getText().substr(0,4)+"' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_lokasi='"+this.app._lokasi+"'",
						["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tm_rptBillForm2";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";							
								this.filter2 = "";
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
								this.pc2.hide();							
							}
						}else system.info(this,result,"");
	    			break;
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();																									
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
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
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg3.clear(1); 
			this.sg2.clear(1); 
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,b.nama as cust,c.no_dok,a.keterangan,a.nilai+a.nilai_ppn as total "+
		             "from bill_m a inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 
					 "              inner join kontrak_m c on a.no_kontrak=c.no_kontrak and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bill,line.tgl,line.cust,line.no_dok,line.keterangan,floatToNilai(line.total)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doNilaiChange2: function(){
		try{			
			var tot = 0;
			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(7,i));										
				}
			}	
			
			this.e_nilai.setText(floatToNilai(tot));						
			this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1)));
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.tanggal,a.kode_cust,a.no_kontrak,a.no_dokumen,a.keterangan,a.no_ba,a.no_faktur,a.nilai,a.nilai_ppn,a.nik_app,a.jabatan,a.bank,a.cabang,a.no_rek,a.nama_rek,a.draft,a.kode_rek,a.nama_bill,a.no_kuitansi "+
							 "from bill_m a "+
							 "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);
						this.cb_cust.setText(line.kode_cust);											
						this.cb_kontrak.setText(line.no_kontrak);
						this.e_ba.setText(line.no_ba);
						this.e_faktur.setText(line.no_faktur);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_jabatan.setText(line.jabatan);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);								
						this.mDesk.setCode(urldecode(line.draft));							
						this.e_namabill.setText(line.nama_bill);														
						this.cb_rek.setText(line.kode_rek);														
						this.e_nokwi.setText(line.no_kuitansi);														
					} 
				}

				var strSQL = "select a.nu,a.item,a.harga,a.jumlah,a.harga*a.jumlah as total,a.kode_akun,a.kode_drk,b.nama as nama_akun,c.nama as nama_drk "+
							 "from bill_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "              inner join drk c on a.kode_drk=c.kode_drk and '"+this.e_periode.getText().substr(0,4)+"'=c.tahun and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by nu";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_drk,line.nama_drk,line.item,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total)]);
					}
				} else this.sg2.clear(1);			
				this.sg2.validasi();
			}									
		} catch(e) {alert(e);}
	}
});
