window.app_saku2_transaksi_yks_fEditBill = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fEditBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fEditBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data Billing BAST: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator");
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["BILL","KUNJCS","TAKBILL","TAKKUNJCS","BILLBAREV","KUNJBAREV"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_bill = new saiCBBL(this,{bound:[20,15,220,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_nik = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Billing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,344],caption:"Data Bill Pengobatan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-25],colCount:13,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Kode Loker","Nama Loker","Area Host","Band","NIKKES","Nama Pasien","Kode Biaya","Nama Biaya","Total Nilai"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,70,100,70,70,70,100,70,100,70,100,70]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12],[]],
				buttonStyle:[[4],[bsEllips]], 
				colFormat:[[12],[cfNilai]],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1
		});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			
			this.c_jenis.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fEditBill.extend(window.childForm);
window.app_saku2_transaksi_yks_fEditBill.implement({
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
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL" || this.c_jenis.getText() == "BILLBAREV") sql.add("update yk_bill_d set loker_bast ='"+this.sg.cells(4,i)+"' where nik='"+this.cb_nik.getText()+"' and no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_piutang='-'");
							if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS" || this.c_jenis.getText() == "KUNJBAREV") sql.add("update yk_billkunj_d set loker_bast ='"+this.sg.cells(4,i)+"' where nik='"+this.cb_nik.getText()+"' and no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and no_piutang='-'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange : function(sender) {
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "BILL")   this.cb_bill.setSQL("select no_bill, keterangan from yk_bill_m where progress in ('2') and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Keterangan"],"and","Data Billing",true);
			if (this.c_jenis.getText() == "KUNJCS") this.cb_bill.setSQL("select no_bill, keterangan from yk_billkunj_m where progress in ('1') and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Keterangan"],"and","Data Bill Kunj - Cost Sharing",true);			
			if (this.c_jenis.getText() == "TAKBILL" || this.c_jenis.getText() == "TAKKUNJJCS")   this.cb_bill.setSQL("select no_valid, keterangan from yk_valid_m where modul = 'TAKTERIMA' and progress in ('1') and kode_lokasi='"+this.app._lokasi+"'",["no_valid","keterangan"],false,["No Tak Terima","Keterangan"],"and","Data Billing TAK TRM",true);						
			if (this.c_jenis.getText() == "BILLBAREV" || this.c_jenis.getText() == "KUNJBAREV" ) this.cb_bill.setSQL("select no_valid, keterangan from yk_valid_m where progress in ('1') and kode_lokasi='"+this.app._lokasi+"'",["no_valid","keterangan"],false,["No Bill","Keterangan"],"and","Data Billing",true);
		}
		if (sender == this.cb_bill && this.cb_bill.getText()!="") {
			if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL" || this.c_jenis.getText() == "BILLBAREV")   this.cb_nik.setSQL("select distinct nik, nama from yk_bill_d where no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_tak='-' and no_piutang='-' and no_valid<>'-'",["nik","nama"],false,["NIK","Nama"],"and","Data Peserta Billing",true);			
			if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS" || this.c_jenis.getText() == "KUNJBAREV") this.cb_nik.setSQL("select distinct nik, nama from yk_billkunj_d where no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_tak='-' and no_piutang='-' and no_valid<>'-'",["nik","nama"],false,["NIK","Nama"],"and","Data Peserta Kunj - CS",true);				
		}		
		
		if (sender == this.cb_nik && this.cb_nik.getText()!="") {
			if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL" || this.c_jenis.getText() == "BILLBAREV")
				var data = this.dbLib.getDataProvider("select a.kode_vendor,no_ref,a.nik,a.nama,a.loker_bast,b.nama as nama_loker,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.nilai "+
						  "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
						  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.nik='"+this.cb_nik.getText()+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-'",true);
			if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS" || this.c_jenis.getText() == "KUNJBAREV")
				var data = this.dbLib.getDataProvider("select '-' as kode_vendor,no_ref,a.nik,a.nama,a.loker_bast,b.nama as nama_loker,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.umum+a.gigi+a.kbia+a.matkes+a.cs as nilai "+
						  "from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.nik='"+this.cb_nik.getText()+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker_bast,line.nama_loker,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.kode_produk,line.nama_produk,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.sg.validasi();
		}
	},
	doChangeCell: function(sender, col, row){
		if (sender == this.sg) {
			if (col == 4) this.sg.cells(6,row,this.sg.dataFromList[2]);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 4){
					this.standarLib.showListData(this, "Daftar Loker",sender,undefined, 
												  "select kode_cust,nama,kode_lokasi    from cust",
												  "select count(kode_cust)  from cust",
												  ["kode_cust","nama","kode_lokasi"],"where",["Kode","Nama","Area Host"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(12,i) != ""){
					tot += nilaiToFloat(this.sg.cells(12,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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