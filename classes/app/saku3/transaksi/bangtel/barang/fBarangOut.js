window.app_saku3_transaksi_bangtel_barang_fBarangOut = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_barang_fBarangOut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_barang_fBarangOut";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pemakaian Barang Non Proyek", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pemakaian","List Pemakaian"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
					colTitle:["No Bukti","Tanggal","Deskripsi","ID Proyek","Nilai"],					
					colWidth:[[4,3,2,1,0],[100,100,250,80,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,351], childPage:["Data Proyek","Item Barang"]});
		this.cb_gudang = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:2});
		this.cb_setuju = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});				
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
					colTitle:["Kode","Nama Barang","Satuan","Stok","Harga","Qty","SubTtl"],					
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,80,300,100]],					
					columnReadOnly:[true,[1,2,3,4,6]],								
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		

		this.rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								"inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_barang_fBarangOut.extend(window.childForm);
window.app_saku3_transaksi_bangtel_barang_fBarangOut.implement({	
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
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
			this.dbLib.execQuerySync(sql);	
			
			for (var i=0;i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i)){						
					if (this.stsSimpan == 1)  
						var data = this.dbLib.getDataProvider("select stok from brg_stok where kode_barang='"+this.sg4.cells(0,i)+"' and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.app._userLog+"'",true);
					else 
						var data = this.dbLib.getDataProvider(
									"select a.stok+isnull(b.jumlah+b.bonus,0) as stok "+
									"from brg_stok a left join brg_trans_d b on a.kode_barang = b.kode_barang and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_nb.getText()+"' and b.dc='C' "+
									"where a.kode_barang='"+this.sg4.cells(0,i)+"' and a.kode_gudang='"+this.cb_gudang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'",true);
					
					if (typeof data == "object"){
						var line = data.rs.rows[0]; 
						if (line != undefined) this.sg4.cells(3,i,parseFloat(line.stok));
					}						
					if (nilaiToFloat(this.sg4.cells(3,i)) < (nilaiToFloat(this.sg4.cells(5,i)))) {
						var k = i+1;
						system.alert(this,"Transaksi tidak valid.","Jumlah Barang Keluar melebihi Stok ["+k+"]");
						return false;						
					}

					for (var j=i;j < this.sg4.getRowCount();j++){
						if (this.sg4.cells(0,j) == this.sg4.cells(0,i) && (i != j)) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
							return false;
						}
					}
				}
			}
			//-- cek data -----------------------------------------------------------------------------------		
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
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGPR','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.cb_proyek.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",0,0,'"+this.cb_setuju.getText()+"','-','-','-','-','-','"+this.cb_gudang.getText()+"','-','-')");
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){	
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','PAKAI','BRGPR',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg4.cells(0,i)+"','-',getdate(),'"+this.sg4.cells(2,i)+"','C',"+nilaiToFloat(this.sg4.cells(3,i))+","+
										nilaiToFloat(this.sg4.cells(5,i))+",0,"+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(4,i))+",0,0,0,"+nilaiToFloat(this.sg4.cells(6,i))+")");								
							}
						}						
					}

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunBDD+"','D',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.e_ket.getText()+"','BRGPR','BDD','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',5,c.akun_pers,'C',sum(a.total),sum(a.total),'"+this.e_ket.getText()+"','BRGPR','BRG','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
							"from brg_trans_d a "+
							"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							"inner join brg_barangklp c on b.kode_klp=c.kode_klp and b.kode_lokasi=c.kode_lokasi "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by c.akun_pers ");

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
					this.sg4.clear(1); this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);	
					var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
					this.dbLib.execQuerySync(sql);		
					var sql = "call sp_brg_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
					this.dbLib.execQuerySync(sql);										
				break;
			case "simpan" :					
			case "ubah" :	
				this.sg4.validasi();
																
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (!this.sg4.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg4.getColCount();j++){
							if (this.sg4.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
						else {
							if (nilaiToFloat(this.sg4.cells(3,i)) < nilaiToFloat(this.sg4.cells(5,i)) ) {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Qty melebihi Stok ["+k+"]");
								return false;						
							}
							if (nilaiToFloat(this.sg4.cells(4,i)) <= 0 ) {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Harga bernilai nol. (Baris "+k+")");
								return false;						
							}
						}
					} 															
				}		
				
				if ((nilaiToFloat(this.e_pakai.getText()) + nilaiToFloat(this.e_total.getText())) > nilaiToFloat(this.e_nilaior.getText())  ) {
					system.alert(this,"Transaksi tidak valid.","Total Biaya melebihi Total RAB.");
					return false;						
				}																			
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) {
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
			this.dbLib.execQuerySync(sql);		
			var sql = "call sp_brg_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
			this.dbLib.execQuerySync(sql);										
			this.doClick();				
		}
	},	
	doChange:function(sender){		
			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1); 				
				this.sg3.clear(1); 
				this.e_total.setText("0");								
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BPR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doEllipseClick4: function(sender, col, row){
		try{			
			if (col == 0 && this.cb_gudang.getText()!=""){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from brg_barang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",
											  "select count(kode_barang) from brg_barang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell4: function(sender, col, row){
		if ( col == 0 && this.sg4.cells(0,row)!="" &&  this.cb_gudang.getText()!="") {												
			if (this.stsSimpan == 1) {
				var strSQL = "select a.nama,a.sat_kecil,b.stok,c.h_avg, 0 as jum, 0 as total "+
							 "from brg_barang a inner join brg_stok b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi and b.kode_gudang='"+this.cb_gudang.getText()+"' and b.nik_user='"+this.app._userLog+"' "+
							 "					inner join brg_hpp c on a.kode_barang=c.kode_barang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "where a.kode_barang='"+this.sg4.cells(0,row)+"' and a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' ";						 			
			}
			else {
				var strSQL = "select a.nama,a.sat_kecil,b.stok+isnull(c.jumlah+c.bonus,0) as stok, d.h_avg, isnull(c.jumlah+c.bonus,0) as jum, d.h_avg * isnull(c.jumlah+c.bonus,0) as total "+
							 "from brg_barang a inner join brg_stok b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi and b.kode_gudang='"+this.cb_gudang.getText()+"' and b.nik_user='"+this.app._userLog+"' "+
							 "					inner join brg_hpp d on a.kode_barang=d.kode_barang and a.kode_lokasi=d.kode_lokasi and d.nik_user='"+this.app._userLog+"' "+
							 "                  left join brg_trans_d c on b.kode_barang = c.kode_barang and b.kode_lokasi=c.kode_lokasi and c.no_tukar='"+this.e_nb.getText()+"' and c.dc='C' "+
							 "where a.kode_barang='"+this.sg4.cells(0,row)+"' and a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' ";
			}			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.sg4.cells(1,row,line.nama);			
					this.sg4.cells(2,row,line.sat_kecil);	
					this.sg4.cells(3,row,parseFloat(line.stok));						
					this.sg4.cells(4,row,parseFloat(line.h_avg));											
					this.sg4.cells(5,row,parseFloat(line.jum));
					this.sg4.cells(6,row,parseFloat(line.total));
				} 				
			}			
		}		
		if (col == 4 || col == 5) {
			if (this.sg4.cells(4,row) != "" && this.sg4.cells(5,row) != "") {
				var tot = nilaiToFloat(this.sg4.cells(4,row)) * nilaiToFloat(this.sg4.cells(5,row));
				this.sg4.cells(6,row,tot);
			}
		}	
		this.sg4.validasi();					
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(6,i) != ""){
					tot += nilaiToFloat(this.sg4.cells(6,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));			
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
						if (result.toLowerCase().search("error") == -1){							
							// this.nama_report="server_report_saku3_spm_rptPanjarPtgForm";
							// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText();
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
			this.sg4.clear(1); this.sg3.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);	
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
			this.dbLib.execQuerySync(sql);							
			var sql = "call sp_brg_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
			this.dbLib.execQuerySync(sql);							
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select no_bukti,convert(varchar,tanggal,103) as tgl, keterangan, no_dokumen, nilai1 "+
					 "from trans_m "+
					 "where kode_pp='"+this.app._kodePP+"' and posted='F' and kode_lokasi='"+this.app._lokasi+"' and form ='BRGPR'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,line.no_dokumen,floatToNilai(line.nilai1)]); 
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
				
				var strSQL = "select * from trans_m "+							 
							 "where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_setuju.setText(line.nik1);	
						this.cb_gudang.setText(line.param1);	
					} 
				}			

				var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')";
				this.dbLib.execQuerySync(sql);					

				var strSQL = "select a.kode_barang,b.nama,a.satuan,a.jumlah,c.stok,a.harga,a.jumlah * a.harga as total  "+
							 "from brg_trans_d a inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join brg_stok c on a.kode_barang=c.kode_barang and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+							 
							 "where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg4.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg4.appendData([line1.kode_barang,line1.nama,line1.satuan,parseFloat(line1.stok),parseFloat(line1.harga),parseFloat(line1.jumlah),parseFloat(line1.total)]);
					}
				} else this.sg4.clear(1);	

			}									
		} catch(e) {alert(e);}
	}
});