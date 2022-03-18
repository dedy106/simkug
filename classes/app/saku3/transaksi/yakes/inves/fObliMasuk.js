window.app_saku3_transaksi_yakes_inves_fObliMasuk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fObliMasuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fObliMasuk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pembelian Obligasi Reksadana", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Trade", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pembelian","List Pembelian"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"],readOnly:true});		
		this.c_market = new saiCB(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Market",items:["SEKUNDER","IPO"], readOnly:true,tag:2});					
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.c_tipe = new saiCB(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Tipe Transaksi",items:["TRADING"], readOnly:true,tag:2});
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Settlement Amount",text:"0",tag:2, tipeText:ttNilai, readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,282], childPage:["Data Seri","File Dok"]});							
		this.cb_seri = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Security ID", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"Security Name", readOnly:true});				
		this.e_obligor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Emiten", readOnly:true});				
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Issue Date", readOnly:true});				
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,13,200,20],caption:"Maturity Date", readOnly:true});			
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Last Coupon Date", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.e_basis = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,11,200,20],caption:"Basis",text:"360",tag:2, tipeText:ttNilai,change:[this,"doChange"]});		
		this.e_jmlhari = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Days On Act", tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});					
		this.e_persen = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,15,200,20],caption:"Coupon Rate", tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});																
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_piukupon = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,18,200,20],caption:"Accrued Interest", tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_pharga = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Price [%]", tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_pjkkupon = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,19,200,20],caption:"Tax On Accrued", tipeText:ttNilai, text:"0",change:[this,"doChange"]});									
		this.e_harga = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Principal Amount", tipeText:ttNilai, text:"0",change:[this,"doChange"]});									
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[1],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
				colTitle:["namaFile","status"],
				colWidth:[[1,0],[80,180]],
				readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
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
			//flag_aktif = 2 MI utk obligasi diisi oleh kode reksadana 
			this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola where flag_aktif='2'",["kode_rdkelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);			
			this.cb_seri.setSQL("select kode_jenis, isin from inv_oblijenis",["kode_jenis","isin"],false,["No Seri","ISIN"],"and","Daftar Seri",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PLAN') and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);							
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fObliMasuk.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fObliMasuk.implement({	
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
					"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='FI'",
					"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='FI'",
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_oblibeli_m where no_beli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_obli_d where no_beli='"+this.e_nb.getText()+"' ");						
						sql.add("delete from inv_oblibeli_j where no_beli='"+this.e_nb.getText()+"' ");
						sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					}
					
					//flag bayar langsung
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBBOBLI','BK','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','X','-','-','-','-')");																
					
					sql.add("insert into inv_oblibeli_m(no_beli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,no_dokumen,keterangan,kode_pp,kode_drk,kode_obligor,kode_rdkelola,kode_plan,tgl_settl,market) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','"+this.e_nb.getText()+"','0','"+this.app._userLog+"','-','"+this.e_ket.getText()+"','"+this.app._kodePP+"', '-','"+this.kodeObligor+"','"+this.cb_kelola.getText()+"','"+this.cb_plan.getText()+"','"+this.dp_d2.getDateString()+"','"+this.c_market.getText()+"')");					
							
					//tgl_mulai=tgl lastkupon, tgl_selesai = tgl_settlemnt		
					sql.add("insert into inv_obli_d(no_beli,kode_lokasi,kode_jenis,status,nilai,nilai_beli,nilai_piukupon,tgl_mulai,tgl_selesai,jml_hari,tgl_akru,tgl_akru_seb,rate,basis,nilai_buku,tgl_akru_kupon,tgl_akru_kupon_seb,no_cair_piukupon,no_oblijual,pph,kode_broker,p_price,kode_rdkelola,no_pindahsts,kode_plan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_seri.getText()+"','"+this.c_tipe.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_harga.getText())+","+nilaiToFloat(this.e_piukupon.getText())+",'"+this.dp_d3.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_jmlhari.getText())+",'"+this.dp_d3.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_persen.getText())+","+nilaiToFloat(this.e_basis.getText())+","+nilaiToFloat(this.e_harga.getText())+",'"+this.dp_d3.getDateString()+"','"+this.dp_d3.getDateString()+"','-','-',0,'-',"+nilaiToFloat(this.e_pharga.getText())+",'"+this.cb_kelola.getText()+"','-','"+this.cb_plan.getText()+"')");
										
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','OBLIBELI','"+this.e_nb.getText()+"')");															
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
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);									
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Settlemt Amount tidak boleh nol atau kurang.");
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
				sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from inv_oblibeli_m where no_beli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from inv_obli_d where no_beli='"+this.e_nb.getText()+"' ");				
				sql.add("delete from inv_oblibeli_j where no_beli='"+this.e_nb.getText()+"' ");		
				sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);								
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doSelectDate2: function(sender, y,m,d){
		var data = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d3.getDateString()+"','"+this.dp_d2.getDateString()+"') as jmlhari",true);			
		if (typeof data == "object"){
			var line = data.rs.rows[0];	
			this.e_jmlhari.setText(floatToNilai(line.jmlhari));	
		}	
	},
	doChange:function(sender){		
		if ((sender == this.cb_kelola || sender == this.cb_plan) && this.stsSimpan==1) {
			if (sender ==  this.cb_plan) {
				var data = this.dbLib.getDataProvider("select kode_param,flag from inv_obli_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','OBLIHUT','AKUNOBLI','DRKOBLIB','PIUKUPON')",true);			
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						if (line.kode_param == "PPINV") this.kodepp = line.flag;																				
					}
				}				
			}						
		}
		
		if (sender == this.cb_seri && this.cb_seri.getText()!="") {
			var strSQL = "select a.nama,a.persen,convert(varchar,a.tgl_mulai,103) as tglmulai,convert(varchar,a.tgl_selesai,103) as tglselesai,b.nama as obligor,b.jenis,b.kode_obligor "+
						 "from inv_oblijenis a inner join inv_obligor b on a.kode_obligor=b.kode_obligor "+
						 "where a.kode_jenis='"+this.cb_seri.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				if (line != undefined){		
					this.kodeObligor = line.kode_obligor;
					this.e_nama.setText(line.nama);
					this.e_obligor.setText(line.obligor);
					this.e_tgl1.setText(line.tglmulai);
					this.e_tgl2.setText(line.tglselesai);
					this.e_persen.setText(floatToNilai(line.persen));
					
					if (this.stsSimpan == 1) {
						//364 = kupon semesteran ; 360 = kupon tw-an (90 hari)
						if (line.jenis=="PEMERINTAH") this.e_basis.setText("364");
						else this.e_basis.setText("360");
					}
				}					
			}	
		}

		if (sender == this.e_nilai || sender == this.e_jmlhari || sender == this.e_basis || sender == this.e_persen ) {
			if (this.e_nilai.getText()!="" && this.e_jmlhari.getText()!="" && this.e_basis.getText()!="" && this.e_persen.getText()!="") {
				var piuBunga = (nilaiToFloat(this.e_jmlhari.getText()) / nilaiToFloat(this.e_basis.getText()) * (nilaiToFloat(this.e_persen.getText()) /100)) * nilaiToFloat(this.e_nilai.getText());
				this.e_piukupon.setText(floatToNilai(Math.round(piuBunga)));
			}
		}

		if (sender == this.e_piukupon) {
			if (this.e_piukupon.getText()!="") {
				var pjkkupon = 0.15 * nilaiToFloat(this.e_piukupon.getText());
				this.e_pjkkupon.setText(floatToNilai(Math.round(pjkkupon)));
			}
		}

		if (sender == this.e_pharga || sender == this.e_nilai) {
			if (this.e_pharga.getText()!="" && this.e_nilai.getText()!="") {
				var harga = (nilaiToFloat(this.e_pharga.getText()) /100) * nilaiToFloat(this.e_nilai.getText());
				this.e_harga.setText(floatToNilai(Math.round(harga)));
			}
		}

		if (sender == this.e_harga || sender == this.e_piukupon) {
			var tot  = nilaiToFloat(this.e_harga.getText()) + nilaiToFloat(this.e_piukupon.getText()) - nilaiToFloat(this.e_pjkkupon.getText());
			this.e_total.setText(floatToNilai(Math.round(tot)));
		}
		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg3.clear(1);	
				this.sgUpld.clear(1);
				this.sgFile.clear(1);		
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblibeli_m","no_beli",this.app._lokasi+"-FIT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
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
								//this.nama_report="server_report_saku3_yakes_inves_rptSahamBeliGabung";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_shmbeli='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithBs(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
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
			this.sg3.clear(1);
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
		var strSQL = "select a.no_beli,convert(varchar,a.tanggal,103) as tgl,a.keterangan, b.nilai_beli+b.nilai_piukupon as nilai "+
		             "from inv_oblibeli_m a inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by a.no_beli desc";					 
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
			this.sg3.appendData([line.no_beli,line.tgl,line.keterangan,line.nilai,"Pilih"]); 
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
								
				var strSQL = "select * from inv_oblibeli_m a inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi where a.no_beli= '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_plan.setText(line.kode_plan);
						this.cb_kelola.setText(line.kode_rdkelola);						
						this.dp_d2.setText(line.tgl_settl);	
						this.dp_d3.setText(line.tgl_akru);	
						this.c_market.setText(line.market);		
						this.c_tipe.setText(line.status);
						this.cb_seri.setText(line.kode_jenis);						
						this.e_basis.setText(floatToNilai(line.basis));
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_pharga.setText(floatToNilai(line.p_price));
						this.e_harga.setText(floatToNilai(line.nilai_beli));
						this.e_piukupon.setText(floatToNilai(line.nilai_piukupon));
					}
				}
				
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