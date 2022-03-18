window.app_saku3_transaksi_yakes21_inves_fSPBeli = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fSPBeli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fSPBeli";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembelian Saham Penyertaan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[520,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Penyertaan","List Penyertaan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"],readOnly:true});		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2,visible:false});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18]}); 		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,305], childPage:["Data Penyertaan","Rekap Penyertaan","File Dok","Atensi"]});			
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,				
				colTitle:["Kd Mitra","Nama","Jml Unit","Harga Oleh","Harga Buku","Harga Beli","Unit Beli","Nilai Beli"],
				colWidth:[[7,6,5,4,3,2,1,0],[110,100,100,100,100,100,200,80]],
				columnReadOnly:[true,[1,2,3,4,5],[0,6,7]],
				colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ]],				
				buttonStyle:[[0],[bsEllips]], 
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				

		this.e_acuan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Alokasi Maks %", tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_capai = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,10,200,20],caption:"Alokasi Tercapai %", tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_maks = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Nilai Maksimal", tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_ncapai = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,11,200,20],caption:"Total Tercapai", tipeText:ttNilai, text:"0", readOnly:true});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Total Penyertaan", tipeText:ttNilai, text:"0", readOnly:true});						
		this.bRekap = new button(this.pc1.childPage[1],{bound:[270,12,80,18],caption:"Hit. Rekap",click:[this,"doRekap"]});			
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,218],colCount:3,tag:9,
		        colTitle:["Kode Mitra","Jumlah","Nilai"],
				colWidth:[[2,1,0],[150,150,80]],
				colFormat:[[1,2],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
				colTitle:["namaFile","status"],
				colWidth:[[1,0],[80,180]],
				readOnly: true,autoAppend:false,defaultRow:1});

		this.e_namaAtensi = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,400,20],caption:"Nama Atensi", maxLength:150});	
		this.e_bank = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,18,400,20],caption:"Bank/Cabang", maxLength:150});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,400,20],caption:"No Rekening", maxLength:150});
		this.e_nmrek = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,20,400,20],caption:"Nama Rekening", maxLength:150});			
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PLAN','VENDORINV') and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "VENDORINV") {
						this.kodeVendor = line.flag;
						this.rekSAP = line.keterangan;			
					}					
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);
				}
			}		

			var sql = new server_util_arrayList();
			sql.add("select kode_mitra, nama from inv_mitra where flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tglnow ",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.tglNow = line.tglnow;
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fSPBeli.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fSPBeli.implement({
	getBatasAlokasi: function() {		
		this.e_acuan.setText("0");	
		this.e_capai.setText("0");
		this.e_ncapai.setText("0");					

		var strSql = "call sp_get_real_alokasi ('"+this.dp_d1.getDateString()+"','"+this.cb_plan.getText()+"')";
		this.dbLib.execQuerySync(strSql);	
		
		var data = this.dbLib.getDataProvider("select atas,persen,nilai from inv_batas_alokasi where kode_kelas='SP' and kode_plan='"+this.cb_plan.getText()+"'  and tahun='"+this.e_periode.getText().substr(0,4)+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){		
				this.e_acuan.setText(floatToNilai(line.atas));	
				this.e_capai.setText(floatToNilai(line.persen));
				this.e_ncapai.setText(floatToNilai(line.nilai));					
			}
		}

		var data = this.dbLib.getDataProvider("select isnull(sum(nilai),0) as maksi from inv_batas_alokasi where kode_plan='"+this.cb_plan.getText()+"'  and tahun='"+this.e_periode.getText().substr(0,4)+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){						
				var maksimal = Math.round(parseFloat(line.maksi) * nilaiToFloat(this.e_acuan.getText()) / 100);				
				this.e_maks.setText(floatToNilai(maksimal));					
			}
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='SP'",
					"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='SP'",
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
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
						sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='SPBELI'");			

						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
					
					//create master data utk tabel inv_sp_d [per plan]
					for (var i = 0; i < this.sg2.rows.getLength();i++){
						if (this.sg2.rowValid(i)) {
							var strSQL = "select kode_mitra from inv_sp_d where kode_mitra='"+this.sg2.cells(0,i)+"' and kode_plan='"+this.cb_plan.getText()+"' ";
							var data0 = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data0 == "object"){
								var line0 = data0.rs.rows[0];		
								if (line0 == undefined){
									sql.add("insert into inv_sp_d(kode_mitra,kode_plan) values "+
											"('"+this.sg2.cells(0,i)+"','"+this.cb_plan.getText()+"')");
								}
							}					
						}
					}	

					var nilaiHutang = nilaiToFloat(this.e_total.getText());					
					sql.add("insert into inv_spbeli_m(no_spbeli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,  no_dokumen,keterangan,kode_drk,kode_spkelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,no_app1,no_spb,kode_pp,modul,nilai,nik_app,kode_plan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','0','"+this.app._userLog+"',  '-','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','-','"+this.dp_d2.getDateString()+"',0,0,0,0,'-','-','"+this.kodepp+"','SPBELI',"+nilaiToFloat(this.e_total.getText())+",'-','"+this.cb_plan.getText()+"')");
										
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
							
							sql.add("insert into inv_spbeli_d (no_spbeli,kode_spkelola,kode_mitra,h_oleh,h_buku,harga,jumlah,n_beli,  komisi,vat,levi,pph,kode_plan) values "+
								    "('"+this.e_nb.getText()+"','-','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+", 0,0,0,0,'"+this.cb_plan.getText()+"')");
						}						
					}
					
					sql.add("insert into angg_r "+
					        "select no_spbeli,'SPBELI',kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc, 0,SUM(nilai) "+
							"from inv_spbeli_j where  kode_akun like '5%' and no_spbeli='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' "+
							"group by no_spbeli,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc ");		

					//----------- PBH -------
					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'SPBELI','0','"+this.kodepp+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.e_nb.getText()+"','-','-','"+this.akunHutang+"','-','NONBT','-','-')");					
					sql.add("insert into pbh_rek(nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
							"(0,'"+this.e_nb.getText()+"','"+this.app._lokasi+"','SPBELI','"+this.e_nmrek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_namaAtensi.getText()+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");	
					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+		
							"select no_spbeli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,'D',nilai,kode_pp,kode_drk,kode_lokasi,modul,'BEBAN',periode,nik_user,tgl_input,kode_curr,kurs "+
							"from inv_spbeli_j "+
							"where no_spbeli ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis = 'HUT'");		

					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SPBELI','"+this.e_nb.getText()+"')");															
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SPBELI','"+this.e_nb.getText()+"')");															
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
					this.sg.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :									
			case "ubah" :		
				
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.tglNow);
				if (d1 > d2) {												
					system.alert(this,"Tanggal tidak valid.","Tanggal Transaksi tidak boleh melebihi tanggal sistem.");
					return false;
				}	
				
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
					sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='SPBELI'");										

					sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}		
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);			
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
			if (this.cb_plan.getText()!="") this.getBatasAlokasi();		
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
		}
		catch(e) {
			alert(e);
		}
	},
	doChange:function(sender){		
		if (sender == this.cb_plan && this.stsSimpan==1) {
			if (sender ==  this.cb_plan) {
				var data = this.dbLib.getDataProvider("select kode_param,flag from inv_sp_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','SPHUT','DRKSPB')",true);			
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						if (line.kode_param == "PPINV") this.kodepp = line.flag;										
						if (line.kode_param == "SPHUT") this.akunHutang = line.flag;			
						if (line.kode_param == "DRKSPB") this.cb_drk.setText(line.flag);																										
					}
				}
				this.getBatasAlokasi();
			}			
			this.sg.clear(1);
			this.sg2.clear(1);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);	
				this.sgUpld.clear(1);
				this.sgFile.clear(1);		
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
			var sql = "call sp_get_hsp ('"+this.cb_plan.getText()+"','"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";					
			this.dbLib.execQuerySync(sql);	
						
			var strSQL = "select * from inv_sp_tmp where kode_mitra='"+this.sg.cells(0,row)+"' and kode_plan='"+this.cb_plan.getText()+"' and nik_user='"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg.cells(2,row,parseFloat(line.jumlah));
					this.sg.cells(3,row,parseFloat(line.h_oleh));
					this.sg.cells(4,row,parseFloat(line.h_buku));										
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
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
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
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
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
		var strSQL = "select a.no_spbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_spbeli_m a "+
					 "inner join pbh_pb_m b on a.no_spbeli=b.no_pb and a.kode_lokasi=b.kode_lokasi and b.progress in ('0','V') "+	
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.modul='SPBELI'";
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
			this.sg3.appendData([line.no_spbeli,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
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
			var baris = row;
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
						this.cb_plan.setText(line.kode_plan);
					}
				}
				
				var strSQL = "select * from pbh_rek a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_namaAtensi.setText(line.nama);
                        this.e_bank.setText(line.bank);
                        this.e_norek.setText(line.no_rek);
                        this.e_nmrek.setText(line.nama_rek);											
					}
                }	

				this.nik_user=this.app._nikUser;						
				var sql = "call sp_get_hsp ('"+this.cb_plan.getText()+"','"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";					
				this.dbLib.execQuerySync(sql);	
				
				strSQL = "select a.kode_mitra,b.nama,c.jumlah as jml_seb,a.h_oleh,a.h_buku,a.harga,a.jumlah,a.n_beli "+
						 "from inv_spbeli_d a inner join inv_mitra b on a.kode_mitra=b.kode_mitra "+
						 "                     inner join inv_sp_tmp c on a.kode_mitra = c.kode_mitra and a.kode_plan=c.kode_plan and c.nik_user='"+this.nik_user+"' "+						 
						 "where a.no_spbeli='"+this.e_nb.getText()+"'  ";			
				
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
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from inv_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
			}
		} catch(e) {alert(e);}
	}
});