window.app_saku3_transaksi_produk_fBeli = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fBeli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fBeli";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembelian Barang: Input", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Pembelian"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Net Total"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_diskon = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,200,20],caption:"Diskon Faktur", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.i_hit1 = new portalui_imageButton(this.pc2.childPage[0],{bound:[975,12,20,20],hint:"Hitung %",image:"icon/"+system.getThemes()+"/copyentries.png",click:[this,"doHitung"]});
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Vendor",multiSelection:false,tag:1});
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});		
		this.i_hit2 = new portalui_imageButton(this.pc2.childPage[0],{bound:[975,13,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/copyentries.png",click:[this,"doHitung"]});
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Gudang",multiSelection:false,tag:2});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,325], childPage:["Data Item Barang","Item Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode","Nama Barang","Satuan","Harga","Jumlah","Bonus","Nilai Diskon","SubTtl"],					
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,80,80,100,80,300,100]],					
					columnReadOnly:[true,[1,2,3]],								
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.e_nilai = new saiLabelEdit(this.sgn,{bound:[780,3,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode Akun","DC","Keterangan","Nilai","Kode PP","Jenis"],
					colWidth:[[5,4,3,2,1,0],[120,120,120,300,100,120]],					
					readOnly:true,colFormat:[[3],[cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_jurnal = new portalui_imageButton(this.sgn2,{bound:[960,2,20,20],hint:"Simulasi Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doJurnal"]});		

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
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
					
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BRGPPNM','BELIDIS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "BRGPPNM") this.akunPPN = line.flag;								
					if (line.kode_spro == "BELIDIS") this.akunDiskon = line.flag;													
				}
			}			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_barang,b.akun_pers as kode_akun from brg_barang a inner join brg_barangklp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

			this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			this.cb_vendor.setSQL("select kode_vendor, nama from brg_vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			
			var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.cb_gudang.setText(line.kode_gudang); 										
			}	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fBeli.extend(window.portalui_childForm);
window.app_saku3_transaksi_produk_fBeli.implement({	
	doJurnal : function() {
		if (this.cb_vendor.getText() != "") {
			var data = this.dbLib.getDataProvider("select akun_hutang from brg_vendor where kode_vendor ='"+this.cb_vendor.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.akunHutang = line.akun_hutang;										
			}	

			this.sg2.clear();
			var nilai = 0;
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {
					nilai = Math.round(nilaiToFloat(this.sg.cells(3,i)) *  (nilaiToFloat(this.sg.cells(4,i)) + nilaiToFloat(this.sg.cells(5,i))) );
					var isAda = false;
					var idx = total = 0;

					var akun = this.dataAkunBrg.get(this.sg.cells(0,i));									
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

			var totDiskon = nilaiToFloat(this.e_diskon.getText()) + this.bonus + this.diskon;
			if (nilaiToFloat(this.e_ppn.getText()) > 0) this.sg2.appendData([this.akunPPN,"D","PPN Masukan",this.e_ppn.getText(),this.app._kodePP,"PPNM"]);
			if (nilaiToFloat(this.e_total.getText()) > 0) this.sg2.appendData([this.akunHutang,"C","Hutang Vendor Pembelian",this.e_total.getText(),this.app._kodePP,"HUTANG"]);
			if (totDiskon > 0) this.sg2.appendData([this.akunDiskon,"C","Diskon Pembelian",totDiskon,this.app._kodePP,"BELIDISC"]);
		}
		else system.alert(this,"Data Vendor tidak valid","");	
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}

					var strSQL = "select kode_pp from brg_gudang where kode_gudang = '"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var vKodePP = line.kode_pp;											
						}
					}	

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGBELI','F','-','-','"+vKodePP+"','"+this.dp_d1.getDateString()+"','-','Pembelian Persediaan Gudang : "+this.cb_gudang.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+","+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_diskon.getText())+",'-','-','-','-','-','-','"+this.cb_gudang.getText()+"','"+this.cb_vendor.getText()+"','"+this.akunHutang+"')");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){		
									if (this.sg2.cells(5,i) == "HUTANG") var kodeVendor = this.cb_vendor.getText();
									else var kodeVendor = "-";		
																													
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+parseNilai(this.sg2.cells(3,i))+","+parseNilai(this.sg2.cells(3,i))+",'"+this.sg2.cells(2,i)+"','BRGBELI','"+this.sg2.cells(5,i)+"','IDR',1,'"+this.sg2.cells(4,i)+"','-','-','"+kodeVendor+"','-','-','-','-','-')");
							}
						}						
					}	

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){		
								if ((nilaiToFloat(this.sg.cells(6,i)) > 0) && (nilaiToFloat(this.sg.cells(4,i)) > 0)) {													
									var diskonBrg = nilaiToFloat(this.sg.cells(6,i)) / nilaiToFloat(this.sg.cells(4,i));
								} else var diskonBrg = 0;

								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGBELI','BRGBELI',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg.cells(0,i)+"','-',getdate(),'"+this.sg.cells(2,i)+"','D',0,"+nilaiToFloat(this.sg.cells(4,i))+","+
										nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(3,i))+",0,0,"+diskonBrg+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+")");

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
					this.sg.clear(1);  this.sg2.clear();
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
					this.doClick();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){								
						if ((this.sg.cells(4,i) != "0" && this.sg.cells(7,i) == "0") ||  (this.sg.cells(4,i) == "0" && this.sg.cells(7,i) != "0")) {
							var j = i+1;
							system.alert(this,"Item Barang tidak valid.","Kolom Jumlah dengan Subtotal tidak sesuai. (Baris ke- "+j+")");
							return false;	
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
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;
				}								
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}				
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);
				this.sg2.clear(1);
				this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BL"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_vendor.setFocus();
			setTipeButton(tbSimpan);			
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
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from brg_barang where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_barang) from brg_barang where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}
		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {	
		try{		
			if (this.sg.cells(0,row) != "") {		
				var strSQL = "select a.nama,a.sat_kecil from brg_barang a "+
							 "where a.flag_aktif='1' and a.kode_barang ='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.sg.cells(1,row,line.nama);									
						this.sg.cells(2,row,line.sat_kecil);						
						this.sg.cells(3,row,"0");	
						this.sg.cells(4,row,"0");	
						this.sg.cells(5,row,"0");						
						this.sg.cells(6,row,"0");
						this.sg.cells(7,row,"0");										
					} 				
				}				
			}
			}catch(e){
				alert(e);
			}			
		}
		
		if (col == 7 || col == 4 || col == 6) {
			if (this.sg.cells(7,row) != "" && this.sg.cells(6,row) != "" && this.sg.cells(4,row) != "" && this.sg.cells(4,row) != "0" && this.sg.cells(7,row) != "0") {				
				this.sg.cells(3,row,parseFloat((nilaiToFloat(this.sg.cells(7,row))+nilaiToFloat(this.sg.cells(6,row))) / nilaiToFloat(this.sg.cells(4,row))));
			}
		}		
		this.sg.validasi();
		
	},
	doHitung: function(sender) {
		if (sender == this.i_hit1) {
			if (this.e_nilai.getText()!="") {
				if (nilaiToFloat(this.e_diskon.getText()) < 100) { 							
					this.e_diskon.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * (nilaiToFloat(this.e_diskon.getText()) / 100))));			
				}
				else system.alert(this,"Persentase melebihi 100%","");
			}
		}
		if (sender == this.i_hit2) {			
			if (this.e_diskon.getText()!="" && this.e_nilai.getText()!="") 
				if (this.e_ppn.getText() == "0")
					this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));						
				else this.e_ppn.setText("0");
		}
	},
	doNilaiChange: function(){
		try{
			this.bonus = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));
					
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(6,i)));
					this.bonus += Math.round(nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(5,i)));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_total.setText(floatToNilai(tot-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doChange:function(sender){
		if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon) {
			if (this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="") {
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_produk_rptBeli";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);			
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
					 "from trans_m a "+
				     "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+				 					 			 					 				 					 
					 "where a.modul='IV' and a.form='BRGBELI' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' "
					 "order by a.no_bukti";			
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.pc1.setActivePage(this.pc1.childPage[0]);																																			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);											
						this.e_diskon.setText(floatToNilai(line.nilai3));												
						this.e_ppn.setText(floatToNilai(line.nilai2));	
						this.akunHutang = line.param3;										
						
						this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_gudang='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);															
						this.cb_gudang.setText(line.param1);						
						this.cb_vendor.setText(line.param2);												
					}
				}												
				
				var data = this.dbLib.getDataProvider("select b.kode_barang,b.nama,a.satuan,a.jumlah,a.bonus,a.harga,a.tot_diskon,a.total "+
							"from brg_trans_d a "+
							"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_barang,line.nama,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.bonus),floatToNilai(line.tot_diskon),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);							
				
			}									
		} catch(e) {alert(e);}
	}
});