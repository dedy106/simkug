window.app_saku3_transaksi_maribaya_barang_fBA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_maribaya_barang_fBA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_maribaya_barang_fBA";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tagihan PO", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Received"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","No PO","Pilih"],
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
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,305], childPage:["Purchase Order","Data Item Barang","Otorisasi","Simulasi Jurnal"]});		
		this.cb_po = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Purchase Ord.",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_tglpo = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tanggal PO", readOnly:true});								
		this.e_ket2 = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Total Barang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, readOnly:true,  text:"0",change:[this,"doChange"]});				
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});		
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Biaya+", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total PO", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_hutdumy = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Total UnBill", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_umuka = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Total UMuka", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_sisahut = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Sisa Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["ID","Kode","Nama Barang","Satuan","Harga","Jml PO","Jml Terima"],					
								colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,350,100,50]],					
								columnReadOnly:[true,[0,1,2,3,4,5,6]],																 
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

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BELIDIS','HUTDUM','HUTBELI','UMBELI','PPNM','BYBELI') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "HUTDUM") this.hutdum= line.flag;													
					if (line.kode_spro == "HUTBELI") this.hutbeli = line.flag;		
					if (line.kode_spro == "UMBELI") this.umbeli = line.flag;		
					if (line.kode_spro == "PPNM") this.ppnm = line.flag;		
					if (line.kode_spro == "BELIDIS") this.belidisk = line.flag;		
					if (line.kode_spro == "BYBELI") this.bybeli = line.flag;													
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_maribaya_barang_fBA.extend(window.portalui_childForm);
window.app_saku3_transaksi_maribaya_barang_fBA.implement({	
	isiCBPO: function() {
		//mb_po_m--->param1=vendor; no_ref1=pesan; no_ref2=no_ba
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
											"		where a.kode_lokasi='"+this.app._lokasi+"' and a.jumlah = isnull(b.jmlterima,0) "+

											" ) b on a.no_po=b.no_po "+
											"where a.param1='"+this.cb_vendor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_ref2='-'",["a.no_po","a.keterangan"],false,["No PO","Nama"],"and","Data Purchase",true);
	},	
	doJurnal : function() {
		this.sg2.clear();		
		var sisaHutang = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_umuka.getText()) ;
		this.sg2.appendData([this.hutdum,"D","Rev. Hutang UnBill",this.e_hutdumy.getText(),this.app._kodePP,"HUTUNBILL"]);								
		if (nilaiToFloat(this.e_ppn.getText()) != 0) this.sg2.appendData([this.ppnm,"D","PPN Masukan",this.e_ppn.getText(),this.app._kodePP,"HPPN"]);						
		if (nilaiToFloat(this.e_biaya.getText()) != 0) this.sg2.appendData([this.bybeli,"D","Biaya Pembelian Lainnya",this.e_biaya.getText(),this.app._kodePP,"BYBELI"]);						
		if (nilaiToFloat(this.e_umuka.getText()) != 0) this.sg2.appendData([this.umbeli,"C","Rev. Uang Muka Pembelian",this.e_umuka.getText(),this.app._kodePP,"UMBELI"]);				
		if (nilaiToFloat(this.e_diskon.getText()) != 0) this.sg2.appendData([this.belidisk,"C","Diskon Pembelian",this.e_diskon.getText(),this.app._kodePP,"DISKON"]);				
		this.sg2.appendData([this.hutbeli,"C","Hutang Pembelian",floatToNilai(sisaHutang),this.app._kodePP,"HUTBELI"]);				
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
						sql.add("delete from mb_ba_m where no_ba = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						
						sql.add("update mb_po_m set no_ref2='-' where no_ref2='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update mb_terima_m set no_ba='-' where no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update brg_belibayar_d set no_ref1='-' where no_ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					sql.add("update mb_po_m set no_ref2='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update mb_terima_m set no_ba='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update brg_belibayar_d set no_ref1='"+this.e_nb.getText()+"' where no_beli='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into mb_ba_m (no_ba,kode_lokasi,tgl_input,nik_user,periode,kode_pp,tanggal,no_dokumen,keterangan,no_po,nik1,nik2,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_po.getText()+"','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"',"+this.netHutang+")");
														
					//------------------ jurnal
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGBA','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','Akru Hutang PO : "+this.cb_po.getText()+"','IDR',1,"+
									this.netHutang+",0,0,'-','-','-','"+this.cb_po.getText()+"','-','-','-','-','-')");

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																															
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+parseNilai(this.sg2.cells(3,i))+","+parseNilai(this.sg2.cells(3,i))+",'"+this.sg2.cells(2,i)+"','BRGBA','"+this.sg2.cells(5,i)+"','IDR',1,'"+this.sg2.cells(4,i)+"','-','-','-','-','-','-','-','-')");
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
					this.sg.clear(1); this.sg3.clear(); this.sg2.clear(1); 
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
							if (nilaiToFloat(this.sg.cells(6,i)) != nilaiToFloat(this.sg.cells(5,i))) {
								var k=i+1;
								system.alert(this,"Jumlah PO dan Terima tidak sama.","Baris "+k);
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
				sql.add("delete from mb_ba_m where no_ba = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						
				sql.add("update mb_po_m set no_ref2='-' where no_ref2='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update mb_terima_m set no_ba='-' where no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update brg_belibayar_d set no_ref1='-' where no_ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);
				this.sg2.clear(1);	
				this.sg3.clear(1); 	
				this.isiCBGudang();
				this.isiCBPO();		
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mb_ba_m","no_ba",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));
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
				var strSQL = "select a.nu,b.kode_barang,b.nama,a.satuan,a.harga,a.jumlah,isnull(c.jmlterima,0) as terima "+
											"from mb_po_d a "+
											"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+	

											"left join ("+
											"  select y.no_po,x.kode_barang,x.nu,sum(jumlah) as jmlterima "+
											"	from brg_trans_d x inner join mb_terima_m y on x.no_bukti=y.no_terima and x.kode_lokasi=y.kode_lokasi "+
											"	where y.kode_lokasi ='"+this.app._lokasi+"' and y.no_po = '"+this.cb_po.getText()+"' "+
											"	group by y.no_po,x.kode_barang,x.nu "+
											" ) c on a.kode_barang=c.kode_barang and a.no_po=c.no_po and a.nu=c.nu "+

											"where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.nu,line.kode_barang,line.nama,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.terima)]);
					}
				} else this.sg.clear(1);

				var strSQL = "select convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1,a.nilai2,a.nilai3,a.nilai4, a.nilai1-a.nilai2+a.nilai3-a.nilai4 as bruto "+
										 "from mb_po_m a "+
										 "where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";									
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_tglpo.setText(line.tgl);
						this.e_ket2.setText(line.keterangan);		
						this.e_nilai.setText(floatToNilai(line.bruto));
						this.e_diskon.setText(floatToNilai(line.nilai3));												
						this.e_ppn.setText(floatToNilai(line.nilai2));	
						this.e_biaya.setText(floatToNilai(line.nilai4));	
						this.e_total.setText(floatToNilai(line.nilai1));													
					}				
				}	

				var strSQL = "select isnull(sum(nilai),0) as unbill "+
										 "from mb_terima_m "+
										 "where no_po = '"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and (no_ba='-' or no_ba='"+this.e_nb.getText()+"') ";												 					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_hutdumy.setText(floatToNilai(line.unbill));					
					}				
				}	

				var strSQL = "select isnull(sum(nilai),0) as umuka "+
										 "from brg_belibayar_d "+
										 "where no_beli = '"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and (no_ref1='-' or no_ref1='"+this.e_nb.getText()+"')";												 					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
					this.e_umuka.setText(floatToNilai(line.umuka));					
					}				
				}				
				this.netHutang = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_umuka.getText());
				this.e_sisahut.setText(floatToNilai(this.netHutang));										
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
			this.sg.clear(1); this.sg3.clear(1); this.sg2.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){								
		var strSQL = "select a.no_ba,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.no_po "+
								 "from mb_ba_m a inner join trans_m b on a.no_ba=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+				     
								 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								 "order by a.no_ba";			
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
			this.sg3.appendData([line.no_ba,line.tgl,line.keterangan,line.no_po,"Pilih"]); 
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
								
				var strSQL = "select a.*,b.param1 as vendor from mb_ba_m a inner join mb_po_m b on a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi where a.no_ba = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);								
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);			
						
						this.cb_vendor.setText(line.vendor);
						this.cb_po.setSQL("select no_po, keterangan from mb_po_m where no_po='"+line.no_po+"' and kode_lokasi='"+this.app._lokasi+"'",["no_po","keterangan"],false,["No PO","Deskripsi"],"and","Data PO",true);															
						this.cb_po.setText(line.no_po);
						
						this.cb_nik1.setText(line.nik1);
						this.cb_nik2.setText(line.nik2);												

					}
				}												
				
			}									
		} catch(e) {alert(e);}
	}
});