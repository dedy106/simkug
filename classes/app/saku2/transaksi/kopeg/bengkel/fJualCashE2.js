window.app_saku2_transaksi_kopeg_bengkel_fJualCashE2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fJualCashE2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fJualCashE2";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Cash: Edit", 0);	
		
		uses("saiMemo;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[270,11,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,10,245,20],caption:"No Jual", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		//this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,225,20],caption:"No Dok", maxLength:50, tag:9});						
		this.e_nilai = new saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,12,180,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_diskon = new saiLabelEdit(this,{bound:[720,10,200,20],caption:"Diskon", tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.c_jenis = new saiCB(this,{bound:[20,10,182,20],caption:"Jenis KBM",items:["BUS","CAR"],readOnly:true,tag:2});
		this.e_ppn = new saiLabelEdit(this,{bound:[720,12,200,20],caption:"Nilai PPN",  readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"Kode Customer",multiSelection:false,tag:2});
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approval",multiSelection:false,tag:2});
		this.e_total = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Total+",  readOnly:true, tipeText:ttNilai, text:"0"});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,450], childPage:["Item Barang"]});
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-45],colCount:10,tag:0,
		            colTitle:["Kode","Nama","Tipe","Satuan","Stok","Harga","Diskon","Jumlah","Bonus","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[80,180,150,50,60,60,60,60,60,80]],
					columnReadOnly:[true,[1,2,3,4,9],[0,5,6,7,8]],
					colFormat:[[4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		/*
		this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,245,20],caption:"No Jual", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,225,20],caption:"No Dok", maxLength:50, tag:9});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		*/
		this.rearrangeChild(10, 22);
		//this.pc1.childPage[1].rearrangeChild(10, 23);	
		setTipeButton(tbUbahHapus);
		this.maximize();		
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
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_nik.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('BRGPDPT','BRGHPP','HUTPPN','BRGPIU','BRGINV','BRGPOT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;								
					if (line.kode_spro == "BRGPIU") this.akunPiutang = line.flag;			
					if (line.kode_spro == "BRGINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "BRGPDPT") this.akunPdpt = line.flag;			
					if (line.kode_spro == "BRGHPP") this.akunHpp = line.flag;			
					if (line.kode_spro == "BRGPOT") this.akunPot = line.flag;			
				}
			}			
			this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_gudang='"+this.kodeGudang+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);												
			var sql = new server_util_arrayList();
			sql.add("select a.kode_brg, a.nama from fri_barang_m a "+
					"       inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
					"       inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
					"       inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"'");								
			this.dbLib.getMultiDataProviderA(sql);
			this.cb_gudang.setText(this.kodeGudang);
			this.lapView = true;
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fJualCashE2.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_bengkel_fJualCashE2.implement({
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
					sql.add("delete from fri_jual_m where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_j where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_d where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					var totDiskon = nilaiToFloat(this.e_diskon.getText()) + this.diskon;					
					if (this.c_jenis.getText() == "BUS") var akunPiu = this.piuBus; else var akunPiu = this.piuCar; 					
					sql.add("insert into fri_jual_m(no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,nilai_service,kode_cust,no_kas,posted,catatan,jenis,ket_jasa,km,akun_piutang,nik_app) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','-','-','"+this.kodeGudang+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+",2,'"+this.cb_cust.getText()+"','-','F','TUNAI','"+this.c_jenis.getText()+"','-','0','"+akunPiu+"','"+this.cb_nik.getText()+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																										
								sql.add("insert into fri_jual_d(no_jual,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah,bonus,harga,hpp,diskon,item,jenis) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.kodeGudang+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(5,i))+",0,"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(1,i)+"','INV')");
							}
						}						
					}				
					
					sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+akunPiu+"','"+this.cb_cust.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','CASH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPot+"','"+this.cb_cust.getText()+"','D',"+totDiskon+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','POT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunPdpt+"','"+this.cb_cust.getText()+"','C',"+this.jualbruto+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPN+"','"+this.cb_cust.getText()+"','C',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
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
					this.standarLib.clearByTag(this, new Array("0","9"),this.e_nb);		
					this.sg.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					/*					
					this.nik_user=this.app._userLog;						
					var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
					this.nik_user=this.app._userLog;						
					var sql = "call sp_apo_tmp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);
					*/					
				}
				break;
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				this.nik_user=this.app._userLog;						
				var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
			    */
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						/*
						var data = this.dbLib.getDataProvider("select stok from apo_brg_stok where kode_brg='"+this.sg.cells(0,i)+"'  and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0]; 
							if (line != undefined) this.sg.cells(4,i,floatToNilai(line.stok));
						}						
						if (nilaiToFloat(this.sg.cells(4,i)) < (nilaiToFloat(this.sg.cells(7,i))+nilaiToFloat(this.sg.cells(8,i)))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah melebihi Stok ["+k+"]");
							return false;						
						}
						*/
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fri_jual_m where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_j where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_jual_d where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}				
				break
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";
		/*
		this.nik_user=this.app._userLog;						
		var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);			
		this.nik_user=this.app._userLog;						
		var sql = "call sp_apo_tmp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);						
		*/			
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
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="" && this.cb_gudang.getText()!="") {
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
			var strSQL = "select a.no_brg+' - '+a.tipe as ket,a.satuan,0 as stok, a.hj "+
			             "from fri_barang_m a "+
						 "where a.kode_brg='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.ket);	
					this.sg.cells(3,row,line.satuan);	
					this.sg.cells(4,row,floatToNilai(line.stok));	
					this.sg.cells(5,row,floatToNilai(line.hj));	
					this.sg.cells(6,row,"0");						
					this.sg.cells(7,row,"0");
					this.sg.cells(8,row,"0");
					this.sg.cells(9,row,"0");
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");	
					this.sg.cells(6,row,"");
					this.sg.cells(7,row,"");					
					this.sg.cells(8,row,"");
					this.sg.cells(9,row,"");
				}
			}			
		}		
		if (col == 6 || col == 7) {
			if (this.sg.cells(5,row) != "" && this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") {
				this.sg.cells(9,row,floatToNilai(Math.round((nilaiToFloat(this.sg.cells(5,row))-nilaiToFloat(this.sg.cells(6,row))) * nilaiToFloat(this.sg.cells(7,row)))));
			}
		}	
		this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			this.jualbruto = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg.cells(9,i));					
					this.jualbruto += Math.round(nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(7,i)));					
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(6,i)) * nilaiToFloat(this.sg.cells(7,i)));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
			this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
			this.e_total.setText(floatToNilai(tot-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select a.no_jual, a.keterangan from fri_jual_m a left join fri_jualbayar_d c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi where c.no_bukti is null and a.catatan = 'TUNAI' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["a.no_jual","a.keterangan"],false,["No Bukti","Cust"],"and","Daftar Bukti",true);						
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select * from fri_jual_m a where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.cb_cust.setText(line.kode_cust);
					this.cb_nik.setText(line.nik_app);
					//this.e_dok.setText(line.no_dokumen);
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					this.e_diskon.setText(floatToNilai(line.nilai_diskon));
					this.c_jenis.setText(line.jenis);
				} 
			}
			var strSQL = "select a.kode_brg,a.satuan,a.jumlah,a.harga,a.diskon,b.nama,b.no_brg+'-'+b.tipe as tipe,a.bonus,a.jumlah*(a.harga-a.diskon) as total "+
			         "from fri_jual_d a inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_brg,line1.nama,line1.tipe,line1.satuan,"0",parseFloat(line1.harga),parseFloat(line1.diskon),parseFloat(line1.jumlah),parseFloat(line1.bonus),parseFloat(line1.total)]);
				}
			} else this.sg.clear(1);															
		}
		if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon) {
			if (sender == this.e_diskon && this.e_diskon.getText()!="") 
				this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
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
							if (this.lapView == "1") {
								this.nama_report="server_report_saku2_kopeg_bengkel_rptFaktur";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
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
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBrg.set(line.kode_brg,line.nama);
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
	}
});