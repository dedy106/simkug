window.app_saku2_transaksi_kopeg_bengkel_fInspeksiE2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fInspeksiE2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fInspeksiE2";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Inspeksi Perbaikan: Edit", 0);	
		
		uses("saiMemo;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[220,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,78,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,12,200,20],caption:"No Bukti", multiSelection:false, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total Part", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.c_status = new saiCB(this,{bound:[20,11,182,20],caption:"Status",items:["REPAIR","INSTALASI","KLAIM","PERIKSA"],readOnly:true,tag:2});
		this.e_service = new saiLabelEdit(this,{bound:[720,11,200,20],caption:"Service Charge", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,10,182,20],caption:"Jenis KBM",items:["BUS","CAR","FREEZER"],readOnly:true,tag:2});
		this.e_ppn = new saiLabelEdit(this,{bound:[720,10,200,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0",readOnly:true});								
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Gudang",multiSelection:false,tag:2});						
		this.e_total = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,360], childPage:["Data SPK","Item Barang","Barang Support","Mekanik"]});
		this.e_pol = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"No Polisi", maxLength:10});				//,readOnly:true
		
		this.e_cust = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"Customer", maxLength:50});				
		this.e_alamat = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,500,20],caption:"Alamat", maxLength:150});				
		this.e_tel = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,280,20],caption:"No Telpon", maxLength:50});						
		this.e_merk = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,280,20],caption:"Merk KBM", maxLength:50});				
		this.e_tahun = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[320,12,200,20],caption:"Tahun", maxLength:4, tipeText:ttAngka});				
		this.e_rangka = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,280,20],caption:"No Rangka", maxLength:50});				
		this.e_mesin = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[320,14,200,20],caption:"No Mesin",  maxLength:50});				
		this.e_tipe = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,280,20],caption:"Tipe - Merk AC", maxLength:50});				
		this.e_km = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[320,15,200,20],caption:"KM", maxLength:50, tipeText:ttNilai, text:"0"});
		this.c_freon = new saiCB(this.pc1.childPage[0],{bound:[20,13,182,20],caption:"Jenis Freon",items:["R12","R134a","R404"],readOnly:true,tag:2});		
		this.e_waktu = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[320,13,200,20],caption:"Est. Waktu (Jam)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_keluhan = new saiMemo(this.pc1.childPage[0],{bound:[20,12,500,80],caption:"Keluhan"});		
				
		this.sg = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-45],colCount:8,tag:9,
		            colTitle:["Kode","Nama","Merk","Tipe","Satuan","Harga","Jumlah","SubTtl"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,60,60,50,160,160,180,80]],
					columnReadOnly:[true,[1,2,3,4,5,7],[0,6]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-45],colCount:5,tag:9,
		            colTitle:["Item","Satuan","Harga","Jumlah","SubTtl"],
					colWidth:[[4,3,2,1,0],[100,80,80,100,300]],
					columnReadOnly:[true,[4],[0,1,2,3]],
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.sg3 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-45],colCount:2,tag:0,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[280,80]],
					columnReadOnly:[true,[1],[0]],
					ellipsClick:[this,"doEllipseClick3"],change:[this,"doChangeCell3"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg3});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		this.maximize();		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_gudang='"+this.kodeGudang+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);									
			this.e_nb.setSQL("select no_spk, no_polisi from fri_spk_m where progress in ('2','R') and kode_lokasi='"+this.app._lokasi+"'",["no_spk","no_polisi"],false,["No SPK","No Polisi"],"and","Daftar SPK",true);
			var sql = new server_util_arrayList();
			sql.add("select a.kode_brg, a.nama from fri_barang_m a "+
					"       inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
					"       inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
					"       inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"'");									 
			sql.add("select kode_mekanik,nama from fri_mekanik where kode_lokasi='"+this.app._lokasi+"'"); //kode_gudang='"+this.kodeGudang+"' and 
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fInspeksiE2.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_bengkel_fInspeksiE2.implement({
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
					sql.add("delete from fri_spk_m where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_spk_d where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_spknon_d where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_spk_mekanik where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into fri_spk_m(no_spk,kode_lokasi,periode,nik_user,tgl_input, tanggal,no_polisi,tipe,km,keluhan,catatan,nilai_part,nilai_service,nilai_ppn,progress,no_bengkel,no_final,jenis_freon,kode_gudang,cust,alamat,merk,tahun,no_rangka,no_mesin,s,p,t,jenis,status,waktu,no_tel,no_jual) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_pol.getText()+"','"+this.e_tipe.getText()+"',"+parseNilai(this.e_km.getText())+",'"+this.e_keluhan.getText()+"','-',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_service.getText())+","+parseNilai(this.e_ppn.getText())+",'2','-','-','"+this.c_freon.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_cust.getText()+"','"+this.e_alamat.getText()+"','"+this.e_merk.getText()+"',"+this.e_tahun.getText()+",'"+this.e_rangka.getText()+"','"+this.e_mesin.getText()+"','-','-','-','"+this.c_jenis.getText()+"','"+this.c_status.getText()+"',"+parseNilai(this.e_waktu.getText())+",'"+this.e_tel.getText()+"','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																									
								sql.add("insert into fri_spk_d(no_spk,kode_lokasi,nu,kode_brg,satuan,jumlah,harga) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(5,i))+")");								
							}
						}						
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																																									
								sql.add("insert into fri_spknon_d(no_spk,kode_lokasi,nu,item,satuan,jumlah,harga) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(2,i))+")");								
							}
						}						
					}					
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){																																									
								sql.add("insert into fri_spk_mekanik(no_spk,kode_lokasi,nu,kode_mekanik) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg3.cells(0,i)+"')");								
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);	
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbUbahHapus);
				}
				break;
			case "ubah" :					
				this.lapView = "1";
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}				
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				this.lapView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from fri_spk_m where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from fri_spk_d where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from fri_spknon_d where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("delete from fri_spk_mekanik where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_brg, nama, tipe from fri_barang_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from fri_barang_m where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_brg","nama","tipe"],"and",["Kode","Nama","Tipe"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipseClick3: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Mekanik",sender,undefined, 
											  "select kode_mekanik,nama from fri_mekanik where kode_lokasi='"+this.app._lokasi+"'", //kode_gudang='"+this.kodeGudang+"' and 
											  "select count(kode_mekanik) from fri_mekanik where kode_lokasi='"+this.app._lokasi+"' ", //kode_gudang='"+this.kodeGudang+"' and 
											  ["kode_mekanik","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var brg = this.dataBrg.get(sender.cells(0,row));
				if (brg) sender.cells(1,row,brg);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBrg");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell");
			}			
			var strSQL = "select a.no_brg,a.tipe,a.satuan,a.hj "+
			             "from fri_barang_m a "+
						 "where a.kode_brg='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.no_brg);	
					this.sg.cells(3,row,line.tipe);	
					this.sg.cells(4,row,line.satuan);						
					this.sg.cells(5,row,floatToNilai(line.hj));	
					this.sg.cells(6,row,"0");						
					this.sg.cells(7,row,"0");					
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");	
					this.sg.cells(6,row,"");
					this.sg.cells(7,row,"");										
				}
			}			
		}		
		if (col == 6 || col == 5) {
			if (this.sg.cells(5,row) != "" && this.sg.cells(6,row) != "" ) {
				this.sg.cells(7,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(5,row)) * nilaiToFloat(this.sg.cells(6,row)))));
			}
		}
		this.sg.validasi();
	},
	doChangeCell2: function(sender, col, row){			
		if (col == 2 || col == 3) {
			if (this.sg2.cells(2,row) != "" && this.sg2.cells(3,row) != "" ) {
				this.sg2.cells(4,row,floatToNilai(Math.round(nilaiToFloat(this.sg2.cells(2,row)) * nilaiToFloat(this.sg2.cells(3,row)))));
			}
		}
		this.sg.validasi();
	},
	doChangeCell3: function(sender, col, row){
		if (col == 0 && this.sg3.cells(0,row)!="") {
			if (this.sg3.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var mekanik = this.dataMekanik.get(sender.cells(0,row));
				if (mekanik) sender.cells(1,row,mekanik);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Mekanik "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBrg");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell3");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell3");
			}					
		}		
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));										
				}
			}
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(4,i));										
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
			this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_service.getText()) + nilaiToFloat(this.e_nilai.getText())) * 0.1)));
			this.e_total.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){				
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select * from fri_spk_m a where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);
					this.e_pol.setText(line.no_polisi);
					this.e_cust.setText(line.cust);
					this.e_alamat.setText(line.alamat);
					this.e_tel.setText(line.no_tel);
					this.e_merk.setText(line.merk);
					this.e_tahun.setText(line.tahun);
					this.e_rangka.setText(line.no_rangka);
					this.e_mesin.setText(line.no_mesin);
					this.e_tipe.setText(line.tipe);
					this.e_km.setText(floatToNilai(line.km));
					this.c_freon.setText(line.jenis_freon);
					this.e_waktu.setText(line.waktu);
					this.e_keluhan.setText(line.keluhan);
					this.e_service.setText(floatToNilai(line.nilai_service));
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					this.cb_gudang.setText(line.kode_gudang);
					this.c_jenis.setText(line.jenis);
					this.c_status.setText(line.status);
				} 
			}
			var strSQL = "select a.kode_brg,a.satuan,a.jumlah,a.harga,b.nama,b.no_brg,b.tipe,a.jumlah*a.harga as total "+
			         "from fri_spk_d a inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.no_spk='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_brg,line1.nama,line1.no_brg,line1.tipe,line1.satuan,parseFloat(line1.harga),parseFloat(line1.jumlah),parseFloat(line1.total)]);
				}
			} else this.sg.clear(1);															
			var strSQL = "select item,satuan,jumlah,harga,jumlah*harga as total "+
			         "from fri_spknon_d where no_spk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";								
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg2.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg2.appendData([line1.item,line1.satuan,parseFloat(line1.harga),parseFloat(line1.jumlah),parseFloat(line1.total)]);
				}
			} else this.sg2.clear(1);

			var strSQL = "select b.kode_mekanik,b.nama "+
			         "from fri_spk_mekanik a inner join fri_mekanik b on a.kode_mekanik=b.kode_mekanik and a.kode_lokasi=b.kode_lokasi where a.no_spk='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg3.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg3.appendData([line1.kode_mekanik,line1.nama]);
				}
			} else this.sg3.clear(1);
			
			this.sg.validasi();		
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		}		
		if (sender == this.e_service) {						
			if (this.e_service.getText()!="") {
				this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_service.getText()) + nilaiToFloat(this.e_nilai.getText())) * 0.1)));
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_service.getText()) + nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
			}
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.lapView == "1") {								
								this.nama_report="server_report_saku2_kopeg_bengkel_rptSpk";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spk='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();								
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
							this.dataBrg = new portalui_arrayMap();							
							this.dataMekanik = new portalui_arrayMap();							
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBrg.set(line.kode_brg,line.nama);
								}
							}							
							if (result.result[1]){
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataMekanik.set(line.kode_mekanik,line.nama);
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
				this.pc1.show(); 				
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);	
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}	
});