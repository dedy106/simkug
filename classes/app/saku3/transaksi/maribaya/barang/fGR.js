window.app_saku3_transaksi_maribaya_barang_fGR = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_maribaya_barang_fGR.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_maribaya_barang_fGR";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Good Received", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Received"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No GR","Tanggal","Keterangan","No PO","Pilih"],
								colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
								readOnly:true,
								colFormat:[[4],[cfButton]],
								click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 					 
								dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Vendor",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,282], childPage:["Purchase Order","Data Item Barang","Otorisasi","Simulasi Jurnal"]});		
		this.cb_po = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Purchase Ord.",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_tglpo = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tanggal PO", readOnly:true});								
		this.e_ket2 = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});								
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["ID","Kode","Nama Barang","Satuan","Harga","Sisa PO","Jml Terima"],					
								colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,350,100,50]],					
								columnReadOnly:[true,[0,1,2,3,4,5]],																 
								colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],								
								autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.cb_nik1 = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_nik2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:2,
								colTitle:["Kode Akun","DC","Keterangan","Nilai","Kode PP","Jenis"],
								colWidth:[[5,4,3,2,1,0],[120,120,120,300,100,120]],					
								readOnly:true,colFormat:[[3],[cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_jurnal = new portalui_imageButton(this.sgn2,{bound:[960,2,20,20],hint:"Simulasi Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doJurnal"]});		

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
					
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_nik1.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],"and",["NIK","Nama"],false);				
			this.cb_nik2.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],"and",["NIK","Nama"],false);				
			this.cb_nik1.setText(this.app._userLog);

			this.isiCBGudang();
			var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.cb_gudang.setText(line.kode_gudang); 										
			}

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTDUM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "HUTDUM") this.akunHutang = line.flag;													
				}
			}

			var sql = new server_util_arrayList();
			sql.add("select a.kode_barang,b.akun_pers as kode_akun from brg_barang a inner join brg_barangklp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_maribaya_barang_fGR.extend(window.portalui_childForm);
window.app_saku3_transaksi_maribaya_barang_fGR.implement({	
	isiCBGudang: function() {
		this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
							  					"inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
							  					"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
	},
	isiCBPO: function() {
		this.cb_po.setSQL("select a.no_po,a.keterangan "+
											"from mb_po_m a "+		

											"inner join  ( "+
											"		select distinct a.no_po "+
											"		from mb_po_d a "+
											"		left join ("+
											"				select y.no_po,x.kode_barang,x.nu,sum(jumlah) as jmlterima "+
											"				from brg_trans_d x inner join mb_terima_m y on x.no_bukti=y.no_terima and x.kode_lokasi=y.kode_lokasi "+
											"				where y.kode_lokasi ='"+this.app._lokasi+"' "+
											"				group by y.no_po,x.kode_barang,x.nu "+
											"		) b on a.no_po=b.no_po and a.kode_barang=b.kode_barang and a.nu=b.nu "+
											"		where a.kode_lokasi='"+this.app._lokasi+"' and a.jumlah>isnull(b.jmlterima,0) "+

											" ) b on a.no_po=b.no_po "+
											"where param1='"+this.cb_vendor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_po","a.keterangan"],false,["No PO","Nama"],"and","Data Purchase",true);
	},	
	doJurnal : function() {
		this.totTerima = 0;
		this.sg2.clear();
		var nilai = 0;		
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)) {
				nilai = Math.round(nilaiToFloat(this.sg.cells(4,i)) *  (nilaiToFloat(this.sg.cells(6,i))));
				this.totTerima += nilai;
				var isAda = false;
				var idx = total = 0;

				var akun = this.dataAkunBrg.get(this.sg.cells(1,i));
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (akun == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {							
					this.sg2.appendData([akun,"D","Persediaan Barang",floatToNilai(nilai),this.app._kodePP,"BELIBRG"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}		
			}		
		}

		if (this.totTerima > 0) 
			this.sg2.appendData([this.akunHutang,"C","Hutang Pembelian",floatToNilai(this.totTerima),this.app._kodePP,"HUTANG"]);		
	},
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
						sql.add("delete from mb_terima_m where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					}

					sql.add("insert into mb_terima_m (no_terima,kode_lokasi,tgl_input,nik_user,periode,kode_pp,tanggal,no_dokumen,keterangan,no_po,kode_gudang,nik1,nik2,nilai,no_ba) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_po.getText()+"','"+this.cb_gudang.getText()+"','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"',"+this.totTerima+",'-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){										
								if (nilaiToFloat(this.sg.cells(6,i)) !=0) {
									sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
													"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','GR','GR',"+this.sg.cells(0,i)+",'"+this.cb_gudang.getText()+"','"+this.sg.cells(1,i)+"','-',NULL,'"+this.sg.cells(3,i)+"','D',0,"+nilaiToFloat(this.sg.cells(6,i))+",0,"+nilaiToFloat(this.sg.cells(4,i))+",0,0,0,0,0)");
								}
							}
						}		
					}

					//------------------ jurnal
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGTRM','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','Penerimaan Persediaan  PO : "+this.cb_po.getText()+"','IDR',1,"+
									this.totTerima+",0,0,'-','-','-','"+this.cb_po.getText()+"','-','-','"+this.akunHutang+"','-','-')");

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																															
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+parseNilai(this.sg2.cells(3,i))+","+parseNilai(this.sg2.cells(3,i))+",'"+this.sg2.cells(2,i)+"','BRGTRM','"+this.sg2.cells(5,i)+"','IDR',1,'"+this.sg2.cells(4,i)+"','-','-','-','-','-','-','-','-')");
							}
						}						
					}	

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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg3.clear();
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					this.doClick();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";							
				this.sg.validasi();	
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){										
							if (nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(5,i))) {
								var k=i+1;
								system.alert(this,"Jumlah terima melebihi sisa.","Baris "+k);
								return false;
							}
						}
					}		
				}
				this.doJurnal();
				var tot = 0;
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){		
						if (this.sg2.cells(1,i) == "D") tot += nilaiToFloat(this.sg2.cells(3,i)); 	
						if (this.sg2.cells(1,i) == "C") tot -= nilaiToFloat(this.sg2.cells(3,i)); 	
					}
				}				
				if (tot != 0) {
					system.alert(this,"Jurnal tidak balance.","Periksa kembali jurnalnya.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from mb_terima_m where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);
				this.sg3.clear(1);		
				this.isiCBGudang();
				this.isiCBPO();		
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mb_terima_m","no_terima",this.app._lokasi+"-GR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_vendor.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {			
			this.doClick();			
		}
	},		
	doChange:function(sender){
		try {
			if (sender == this.cb_vendor && this.cb_vendor.getText()!="" && this.stsSimpan==1) {
				this.isiCBPO();
			}

			if (sender == this.cb_po && this.cb_po.getText()!="") {
				var strSQL = "select convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
										 "from mb_po_m a "+
										 "where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";									
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_tglpo.setText(line.tgl);
						this.e_ket2.setText(line.keterangan);						
					}				
				}	

				if (this.stsSimpan==1) {
					var strSQL = "select a.nu,b.kode_barang,b.nama,a.satuan,a.harga,a.jumlah-isnull(c.jmlterima,0) as sisa "+
											 "from mb_po_d a "+
											 "inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+	

											 "left join ("+
											 "  select y.no_po,x.kode_barang,x.nu,sum(jumlah) as jmlterima "+
											 "	from brg_trans_d x inner join mb_terima_m y on x.no_bukti=y.no_terima and x.kode_lokasi=y.kode_lokasi "+
											 "	where y.kode_lokasi ='"+this.app._lokasi+"' and y.no_po = '"+this.cb_po.getText()+"' "+
											 "	group by y.no_po,x.kode_barang,x.nu "+
											 " ) c on a.kode_barang=c.kode_barang and a.no_po=c.no_po and a.nu=c.nu "+

											 "where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jumlah>isnull(c.jmlterima,0) order by a.nu";

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg.appendData([line.nu,line.kode_barang,line.nama,line.satuan,floatToNilai(line.harga),floatToNilai(line.sisa),"0"]);
						}
					} else this.sg.clear(1);	
				}						
			}

		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_produk_rptBeli";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
						break;						
						case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkunBrg = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkunBrg.set(line.kode_barang, line.kode_akun);										
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
			this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){								
		var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.no_po "+
								 "from mb_terima_m a inner join trans_m b on a.no_terima=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+				     
								 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_ba='-' "+
								 "order by a.no_terima";			
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
			this.sg3.appendData([line.no_terima,line.tgl,line.keterangan,line.no_po,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
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
								
				var strSQL = "select a.*,b.param1 as vendor from mb_terima_m a inner join mb_po_m b on a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi where a.no_terima = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);								
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);			
						
						this.cb_vendor.setText(line.vendor);
						this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_gudang='"+line.kode_gudang+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);															
						this.cb_gudang.setText(line.kode_gudang);						
						this.cb_po.setSQL("select no_po, keterangan from mb_po_m where no_po='"+line.no_po+"' and kode_lokasi='"+this.app._lokasi+"'",["no_po","keterangan"],false,["No PO","Deskripsi"],"and","Data PO",true);															
						this.cb_po.setText(line.no_po);
						
						this.cb_nik1.setText(line.nik1);
						this.cb_nik2.setText(line.nik2);												

					}
				}												
				
				var strSQL = "select a.nu,b.kode_barang,b.nama,a.satuan,a.harga,a.jumlah-isnull(c.jmlterima,0) as sisa, d.jmlterima "+
										 "from mb_po_d a "+
										 "inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+	

										 "inner join ("+
										 "  select y.no_po,x.kode_barang,x.nu,sum(jumlah) as jmlterima "+
										 "	from brg_trans_d x inner join mb_terima_m y on x.no_bukti=y.no_terima and x.kode_lokasi=y.kode_lokasi "+
										 "	where y.kode_lokasi ='"+this.app._lokasi+"' and y.no_po = '"+this.cb_po.getText()+"' and y.no_terima='"+this.e_nb.getText()+"' "+
										 "	group by y.no_po,x.kode_barang,x.nu "+
										 "  ) d on a.kode_barang=d.kode_barang and a.no_po=d.no_po and a.nu=d.nu "+

										 "left join ("+
										 "  select y.no_po,x.kode_barang,x.nu,sum(jumlah) as jmlterima "+
										 "	from brg_trans_d x inner join mb_terima_m y on x.no_bukti=y.no_terima and x.kode_lokasi=y.kode_lokasi "+
										 "	where y.kode_lokasi ='"+this.app._lokasi+"' and y.no_po = '"+this.cb_po.getText()+"' and y.no_terima<>'"+this.e_nb.getText()+"' "+
										 "	group by y.no_po,x.kode_barang,x.nu "+
										 "  ) c on a.kode_barang=c.kode_barang and a.no_po=c.no_po and a.nu=c.nu "+

										 "where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.nu,line.kode_barang,line.nama,line.satuan,floatToNilai(line.harga),floatToNilai(line.sisa),floatToNilai(line.jmlterima)]);
					}
				} else this.sg.clear(1);		
				this.sg.validasi();				
				
			}									
		} catch(e) {alert(e);}
	}
});