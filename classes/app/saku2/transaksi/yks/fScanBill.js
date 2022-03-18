window.app_saku2_transaksi_yks_fScanBill = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fScanBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fScanBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Scanning Data Billing: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator");
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["BILL","KUNJCS","TAKBILL","TAKKUNJCS"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_bill = new saiCBBL(this,{bound:[20,15,220,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_data = new saiCBBL(this,{bound:[20,16,222,20],caption:"Data HR Scanning", multiSelection:false, maxLength:10, tag:2});
		this.cb_loker = new saiCBBL(this,{bound:[20,17,222,20],caption:"Data Loker", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Range Tanggal", underline:true});		
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this,{bound:[240,11,100,18]}); 
		this.i_load = new portalui_imageButton(this,{bound:[345,11,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.i_scan = new portalui_imageButton(this,{bound:[375,11,20,20],hint:"Scanning Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});

		this.p1 = new portalui_panel(this,{bound:[20,189,900,364],caption:"Data Bill Pengobatan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:13,tag:9,				
				colTitle:["Kode Mitra","Tgl Masuk","NIK","Nama","Loker Valid","Loker Scan","Area Host","Band","NIKKES","Nama Pasien","Kode Biaya","Nama Biaya","Total Nilai"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,70,100,70,70,70,80,70,100,70,100,70]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12],[]],
				buttonStyle:[[5],[bsEllips]], 
				colFormat:[[12],[cfNilai]],
				change:[this,"doChangeCells"],ellipsClick:[this,"doEllipsClick"],autoAppend:false,defaultRow:1
		});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
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
			this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);			
			this.cb_loker.setSQL("select kode_cust, nama from cust ",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Loker",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fScanBill.extend(window.childForm);
window.app_saku2_transaksi_yks_fScanBill.implement({
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
					var tgl = "";
					if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL") {
						for (var i=0;i < this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.loker_bast != line.loker_scan) {
								tgl = line.no_ref.substr(6,4)+"-"+line.no_ref.substr(3,2)+"-"+line.no_ref.substr(0,2);
								sql.add("update yk_bill_d set loker_bast ='"+line.loker_scan+"' where tgl_masuk='"+tgl+"' and nik='"+line.nik+"' and no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}
					if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS") {
						for (var i=0;i < this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.loker_bast != line.loker_scan) {
								tgl = line.no_ref.substr(6,4)+"-"+line.no_ref.substr(3,2)+"-"+line.no_ref.substr(0,2);
								sql.add("update yk_billkunj_d set loker_bast ='"+line.loker_scan+"' where tgl_masuk='"+tgl+"' and nik='"+line.nik+"' and no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.c_jenis.getText() == "BILL")   this.cb_bill.setSQL("select no_bill, keterangan from yk_bill_m where progress='2' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Keterangan"],"and","Data Billing",true);
			if (this.c_jenis.getText() == "KUNJCS") this.cb_bill.setSQL("select no_bill, keterangan from yk_billkunj_m where progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Keterangan"],"and","Data Bill Kunj - Cost Sharing",true);			
			if (this.c_jenis.getText() == "TAKBILL" || this.c_jenis.getText() == "TAKKUNJJCS")   
			   this.cb_bill.setSQL("select no_valid, keterangan from yk_valid_m where modul = 'TAKTERIMA' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_valid","keterangan"],false,["No Tak Terima","Keterangan"],"and","Data Billing TAK TRM",true);			
		}				
		if (sender == this.cb_bill || sender == this.cb_loker) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1);
		}
	},	
	doClick:function(sender){	
		if (sender == this.i_load && this.cb_bill.getText()!="") {		
			if (this.cb_loker.getText() != "") var loker = " a.loker_bast = '"+this.cb_loker.getText()+"' and "; else var loker = " ";
			if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL")
				var data = this.dbLib.getDataProvider("select a.kode_vendor,convert(varchar,a.tgl_masuk,103) as no_ref,a.nik,a.nama,a.loker_bast,a.loker_bast as loker_scan,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.nilai "+
						  "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
						  "where "+loker+" a.tgl_masuk between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' order by a.nik,a.tgl_masuk",true);
			if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS")
				var data = this.dbLib.getDataProvider("select '-' as kode_vendor,convert(varchar,a.tgl_masuk,103) as no_ref,a.nik,a.nama,a.loker_bast,a.loker_bast as loker_scan,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.umum+a.gigi+a.kbia+a.matkes+a.cs as nilai "+
						  "from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						  "where "+loker+" a.tgl_masuk between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' order by a.nik,a.tgl_masuk",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
		}
		if (sender == this.i_scan) {
			if (this.cb_data.getText()!="") {
				if (this.cb_loker.getText() != "") var loker = " a.loker_bast = '"+this.cb_loker.getText()+"' and "; else var loker = " ";
				if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL")
					var data = this.dbLib.getDataProvider("select a.kode_vendor,convert(varchar,a.tgl_masuk,103) as no_ref,a.nik,a.nama,a.loker_bast,d.loker as loker_scan,d.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.nilai "+
							  "from yk_bill_d a "+
							  "     inner join yk_produk c on a.kode_produk=c.kode_produk "+
							  "     inner join (select x.no_load,x.nik,x.loker,y.jenis,y.kode_lokasi "+
							  "		            from yk_peserta_d x inner join cust y on x.loker=y.kode_cust where x.no_load = '"+this.cb_data.getText()+"') d on a.nik=d.nik  "+
							  "where "+loker+" a.tgl_masuk between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' order by a.nik,a.tgl_masuk",true);
				if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS")
					var data = this.dbLib.getDataProvider("select '-' as kode_vendor,convert(varchar,a.tgl_masuk,103) as no_ref,a.nik,a.nama,a.loker_bast,d.loker as loker_scan,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.umum+a.gigi+a.kbia+a.matkes+a.cs as nilai "+
							  "from yk_billkunj_d a "+							  
							  "     inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							  "     inner join (select x.no_load,x.nik,x.loker,y.jenis,y.kode_lokasi "+
							  "		            from yk_peserta_d x inner join cust y on x.loker=y.kode_cust where x.no_load = '"+this.cb_data.getText()+"') d on a.nik=d.nik  "+
							  "where "+loker+" a.tgl_masuk between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' order by a.nik,a.tgl_masuk",true);
				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);		
			}
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker_bast,line.loker_scan,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.kode_produk,line.nama_produk,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 5) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].loker_scan = this.sg.cells(5,row);
			this.dataJU.rs.rows[((this.page-1)*20) + row].kode_lokasi = this.sg.cells(6,row);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 5){
					this.standarLib.showListData(this, "Daftar Loker",sender,undefined, 
												  "select kode_cust,kode_lokasi    from cust",
												  "select count(kode_cust)  from cust",
												  ["kode_cust","kode_lokasi"],"where",["Kode","Nama","Area Host"],false);				
				}
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan.");							
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