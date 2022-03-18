window.app_saku3_transaksi_sapyakes_fSPBeli = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fSPBeli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fSPBeli";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembelian Saham Penyertaan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Penyertaan","List Penyertaan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Progress","Catatan"],
					colWidth:[[4,3,2,1,0],[200,80,350,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2, visible:false});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18]}); 		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,303], childPage:["Data Penyertaan","Rekap Penyertaan"]});			
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:0,				
				colTitle:["Kd Mitra","Nama","Jml Unit","Harga Oleh","Harga Buku","Harga Beli","Unit Beli","Nilai Beli"],
				colWidth:[[7,6,5,4,3,2,1,0],[110,100,100,100,100,100,140,80]],
				columnReadOnly:[true,[1,2,3,4,5],[0,6,7]],
				colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ]],				
				buttonStyle:[[0],[bsEllips]], 
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});				

		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Total Penyertaan", tipeText:ttNilai, text:"0", readOnly:true});						
		this.bRekap = new button(this.pc1.childPage[1],{bound:[500,11,80,18],caption:"Hit. Rekap",click:[this,"doRekap"]});			
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,255],colCount:3,tag:9,
		            colTitle:["Kode Mitra","Jumlah","Nilai"],
					colWidth:[[2,1,0],[100,100,80]],
					colFormat:[[1,2],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);				
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
									
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DRKSPB','PPINV','SPHUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;										
					if (line.kode_spro == "SPHUT") this.akunHutang = line.flag;			
					if (line.kode_spro == "DRKSPB") this.cb_drk.setText(line.flag);			
				}
			}			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_mitra, nama from inv_mitra where flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);


			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('VENDORINV')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "VENDORINV") {
						this.kodeVendor = line.flag;
						this.rekSAP = line.keterangan;			
					}
					
				}
			}
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_app.setText(line.nik);
			}				   
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fSPBeli.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fSPBeli.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			for (var i=0;i < this.sg.rows.getLength();i++){						
				this.doChangeCell(this.sg,0,i);		
				this.doChangeCell(this.sg,6,i);								
			}	
			this.doRekap();
		} catch(e) {alert(e);}
	},
	doRekap : function() {
		this.sg2.clear();
		var jumlah = nilai = 0;
		for (var i=0;i < this.sg.rows.getLength();i++){						
			if (this.sg.rowValid(i)) {
				jumlah = nilaiToFloat(this.sg.cells(6,i));
				nilai = nilaiToFloat(this.sg.cells(7,i));
				var isAda = false;
				var idx = totaljml = totalnilai = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),floatToNilai(jumlah),floatToNilai(nilai)]);
				} 
				else { 
					totaljml = nilaiToFloat(this.sg2.cells(1,idx));
					totaljml = totaljml + jumlah;
					this.sg2.setCell(1,idx,totaljml);
					
					totalnilai = nilaiToFloat(this.sg2.cells(2,idx));
					totalnilai = totalnilai + nilai;
					this.sg2.setCell(2,idx,totalnilai);
				}								
			}
		}
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_spbeli_m where no_spbeli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_spbeli_j where no_spbeli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_spbeli_d where no_spbeli='"+this.e_nb.getText()+"' ");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");

						sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");										
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");								
					}
					
					var nilaiHutang = nilaiToFloat(this.e_total.getText());
					
					sql.add("insert into inv_spbeli_m(no_spbeli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,  no_dokumen,keterangan,kode_drk,kode_spkelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,no_app1,no_spb,kode_pp,modul,nilai,nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','"+this.e_nb.getText()+"','0','"+this.app._userLog+"',  '-','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','-','"+this.dp_d2.getDateString()+"',0,0,0,0,'-','-','"+this.kodepp+"','SPBELI',"+nilaiToFloat(this.e_total.getText())+",'"+this.cb_app.getText()+"')");
										
					sql.add("insert into inv_spbeli_j(no_spbeli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.kodeVendor+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+nilaiHutang+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SPBELI','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
														
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(7,i) != "") {							
							var data = this.dbLib.getDataProvider("select a.akun_spi from inv_mitra a where a.kode_mitra='"+this.sg.cells(0,i)+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line = data.rs.rows[0];							
								var akunSP = line.akun_spi;						
							}							
							sql.add("insert into inv_spbeli_j(no_spbeli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+akunSP+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SPBELI','SP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							
							sql.add("insert into inv_spbeli_d (no_spbeli,kode_spkelola,kode_mitra,h_oleh,h_buku,harga,jumlah,n_beli,  komisi,vat,levi,pph) values "+
								    "('"+this.e_nb.getText()+"','-','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+", 0,0,0,0)");
						}						
					}
					
					this.nik_user=this.app._nikUser;						
					var strSql = "call sp_sp_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(strSql);	
					
					for (var i = 0; i < this.sg2.rows.getLength();i++){
						if (this.sg2.rowValid(i)) {
							var strSQL = "select kode_mitra from inv_sp_tmp where kode_mitra='"+this.sg2.cells(0,i)+"' and nik_user='"+this.nik_user+"'";
							var data0 = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data0 == "object"){
								var line0 = data0.rs.rows[0];		
								if (line0 == undefined){									
									sql.add("insert into inv_sp_d(kode_mitra,jumlah,h_oleh,h_buku) values "+
											"('"+this.sg2.cells(0,i)+"','"+nilaiToFloat(this.sg2.cells(1,i))+"',0,0)");
								}
							}					
						}
					}
					sql.add("insert into angg_r "+
					        "select no_spbeli,'SPBELI',kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc, 0,SUM(nilai) "+
							"from inv_spbeli_j where  kode_akun like '5%' and no_spbeli='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' "+
							"group by no_spbeli,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc ");		


					//flag bayar langsung
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBBSP','BK','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','X','-','-','-','-')");																

					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_spbeli,no_urut,kode_lokasi,'SPBELI',jenis,'-',tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-',no_dokumen,'-','-','-',case when no_dokumen = '-' then '-' else '"+this.rekSAP+"' end,'-',case when no_dokumen = '-' then '-' else 'T' end "+
						    "from inv_spbeli_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_spbeli='"+this.e_nb.getText()+"'");

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
					this.sg.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :									
			case "ubah" :									
				this.doRekap();
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_spbeli_m where no_spbeli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_spbeli_j where no_spbeli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_spbeli_d where no_spbeli='"+this.e_nb.getText()+"' ");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");

					sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");										
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");								

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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);			
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_spbeli_m","no_spbeli",this.app._lokasi+"-SPT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mitra",sender,undefined, 
												  "select kode_mitra, nama from inv_mitra where flag_aktif='1'",
												  "select count(kode_mitra) from inv_mitra where flag_aktif='1'",
												  ["kode_mitra","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var mitra = this.dataSP.get(sender.cells(0,row));
				if (mitra) sender.cells(1,row,mitra);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Mitra "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRD");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell");
			}			
			
			this.nik_user=this.app._nikUser;						
			if (this.stsSimpan == 1) var sql = "call sp_sp_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			else  var sql = "call sp_sp_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";
			this.dbLib.execQuerySync(sql);	
						
			var strSQL = "select * from inv_sp_tmp where kode_mitra='"+this.sg.cells(0,row)+"' and nik_user='"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg.cells(2,row,parseFloat(line.jumlah));
					this.sg.cells(3,row,parseFloat(line.h_oleh));
					this.sg.cells(4,row,parseFloat(line.h_buku));					
					/*mati
					this.sg.cells(5,row,"0");	
					this.sg.cells(6,row,"0");	
					this.sg.cells(7,row,"0");	
					*/
				} 
				else {
					this.sg.cells(2,row,"0");
					this.sg.cells(3,row,"0");
					this.sg.cells(4,row,"0");					
					this.sg.cells(5,row,"0");	
					this.sg.cells(6,row,"0");	
					this.sg.cells(7,row,"0");	
				}
			}			
		}
		if (col == 6 || col == 7) {
			if (this.sg.cells(7,row) != "" && this.sg.cells(6,row) != "") {				
				this.sg.cells(5,row,parseFloat(nilaiToFloat(this.sg.cells(7,row)) /  nilaiToFloat(this.sg.cells(6,row))));				
			}		
			this.sg.validasi();
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
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
							this.dataSP = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataSP.set(line.kode_mitra, line.nama);
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg3.clear(1);
			this.sg2.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} 
		catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select a.no_spbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,b.catatan "+
		             "from inv_spbeli_m a "+
					 "     left join inv_app2_m b on a.no_app1=b.no_app  and b.no_flag='-' and b.form='APPMAN' "+					 
					 "where a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.modul='SPBELI'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_spbeli,line.tgl,line.keterangan,line.progress,line.catatan]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_spbeli_m where no_spbeli= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_drk.setText(line.kode_drk);
						this.dp_d2.setText(line.tgl_set);											
						this.cb_app.setText(line.nik_app);
					}
				}
				
				this.nik_user=this.app._nikUser;						
				var sql = "call sp_sp_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";			
				this.dbLib.execQuerySync(sql);	
						
				
				strSQL = "select a.kode_mitra,b.nama,c.jumlah as jml_seb,a.h_oleh,a.h_buku,a.harga,a.jumlah,a.n_beli "+
						 "from inv_spbeli_d a inner join inv_mitra b on a.kode_mitra=b.kode_mitra "+
						 "                     inner join inv_sp_tmp c on a.kode_mitra = c.kode_mitra and c.nik_user='"+this.nik_user+"' "+						 
						 "where a.no_spbeli='"+this.e_nb.getText()+"' ";			
				
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																																			
						this.sg.appendData([line1.kode_mitra,line1.nama,floatToNilai(line1.jml_seb),parseFloat(line1.h_oleh),parseFloat(line1.h_buku),parseFloat(line1.harga),parseFloat(line1.jumlah),parseFloat(line1.n_beli)]);
					}
				} else this.sg.clear(1);									
				
				this.doRekap();
			}
		} catch(e) {alert(e);}
	}
});