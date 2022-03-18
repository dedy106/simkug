window.app_saku3_transaksi_sju16_fQuotPesan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fQuotPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fQuotPesan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Quotation", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[225,11,70,20],labelWidth:0,caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Transaksi", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Quotation","Data Quotation","Data Penanggung","Format Draft","Dokumen Pendukung","Filter Cari"]});								
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:21,tag:9,
		            colTitle:["Status","No Quotation","Tanggal","Tertanggung","Segmen","Acc Exec","Curr","Sum Insured","Premi","Brokerage","Tgl Mulai","Tgl Selesai","Occup. of Risk","Loc. of Risk","Obj. of Loss","% Premi","% Fee","No Draft","Progress","Tgl Input","User Input"],
					colWidth:[[20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,110,80,80,60,60,200,200,200,70,70,80,80,80,60,80,100,200,70,150,80]],
					readOnly:true,colFormat:[[7,8,9,15,16],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager"]});
		this.bLoad2 = new portalui_imageButton(this.sgn2,{bound:[this.sgn2.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load List",click:[this,"doLoad2"]});

		this.cb_cust = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Tertanggung",tag:2,readOnly:true,change:[this,"doChange"]}); 				
		this.cb_pesan = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[520,13,220,20],caption:"No Pesanan",tag:2,multiSelection:false,change:[this,"doChange"]}); 				

		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Segmen",readOnly:true,tag:2}); 		
		this.cb_ttd = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Signer",tag:2,multiSelection:false}); 						
		this.cb_ttd2 = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"Sign. Nota Konf",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.e_jab = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,450,20],caption:"Jabatan", maxlength:50});					

		this.cb_pic = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Acc Exec",tag:2,multiSelection:false}); 				
		this.cb_tipe = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"COB",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,275,20],caption:"No Quotation",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[300,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.c_jenis = new saiCB(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Jenis Quotation",items:["SINGLE","MULTI"], readOnly:true,tag:2,visible:false});
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[1],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 		
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[1],{bound:[260,11,100,18]}); 
		this.c_curr = new saiCB(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Sum Insured",readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[260,14,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});				
		this.e_ppremi = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,200,20],caption:"Premi % - Nilai", tag:1, tipeText:ttNilai, text:"0"});		
		this.i_hitung2 = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,18,20,20],hint:"Hitung %",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung2"]});
		this.e_npremi = new saiLabelEdit(this.pc2.childPage[1],{bound:[260,18,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});		
		this.i_hitung = new portalui_imageButton(this.pc2.childPage[1],{bound:[370,18,20,20],hint:"Hitung Persentase",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
		this.e_pfee = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,19,200,20],caption:"Brokerage % - Nilai", tag:1, tipeText:ttNilai, text:"0"});
		this.e_nfee = new saiLabelEdit(this.pc2.childPage[1],{bound:[260,19,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});						
		
		this.e_occup = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,500,20],caption:"Occupation of Risk", maxLength:200});						
		this.e_lokasi = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,500,20],caption:"Location of Risk", maxLength:200});						
		this.e_objek = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,19,500,20],caption:"Object of Loss", maxLength:500});						
		this.e_noapp = new saiLabelEdit(this.pc2.childPage[1],{bound:[540,19,450,20],caption:"No Approve", tag:9, readOnly:true,visible:false});		
		this.e_catat = new saiMemo(this.pc2.childPage[1],{bound:[20,20,500,60],caption:"Remarks",tag:1});
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[540,20,450,110],caption:"Catatan",tag:9, readOnly:true,visible:false});
		
		this.sg = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:0,
		            colTitle:["Penanggung","Nama"],
					colWidth:[[1,0],[270,80]],
					columnReadOnly:[true,[1],[0]],
					buttonStyle:[[0],[bsEllips]],
					change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.cb_draft = new portalui_saiCBBL(this.pc2.childPage[3],{bound:[20,12,202,20],caption:"No Draft",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		this.mDesk = new tinymceCtrl(this.pc2.childPage[3],{bound:[10,13,980,390], withForm:false});
		
		this.sgUpld = new saiGrid(this.pc2.childPage[4],{bound:[1,5,this.pc2.width-5,180],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[4],{bound:[1,190,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});
	
		this.sg1mp2 = new saiGrid(this.pc2.childPage[4],{bound:[1,220,this.pc2.width-4,180],colCount:4,tag:9,readOnly:true,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc2.childPage[4],{bound:[1,this.pc2.height - 25,this.pc2.width - 1,25],buttonStyle:3,
					pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.cb_tipe2 = new portalui_saiCBBL(this.pc2.childPage[5],{bound:[20,11,220,20],caption:"COB",tag:9,multiSelection:false, change:[this,"doChange"]}); 				
		this.cb_cust3 = new portalui_saiCBBL(this.pc2.childPage[5],{bound:[20,12,220,20],caption:"Tertanggung",tag:9,multiSelection:false, change:[this,"doChange"]}); 						
		this.cb_quo2 = new portalui_saiCBBL(this.pc2.childPage[5],{bound:[20,13,300,20],caption:"No Quotation",tag:9,multiSelection:false}); 				
		this.bCopy = new button(this.pc2.childPage[5],{bound:[120,14,80,18],caption:"Copy Data",click:[this,"doCopy"]});			
		this.bCari = new button(this.pc2.childPage[5],{bound:[218,14,80,18],caption:"Cari Data",click:[this,"doCari"]});

		uses("server_report_report;portalui_reportViewer");
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[3].rearrangeChild(10, 23);
		this.pc2.childPage[5].rearrangeChild(10, 23);

		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.stsOto = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.e_memo.setReadOnly(true);
			
			this.cb_pesan.setSQL("select a.no_bukti, a.pekerjaan "+
								"from sju_pesanan_m a "+
								"inner join sju_proses01 b on a.no_bukti=b.no_ref and a.kode_lokasi=b.kode_lokasi "+
								"where a.progress = 'PS02' and b.status='2' and a.no_quo = '-' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_bukti","a.pekerjaan"],false,["Kode","Nama"],"and","Data Pesanan",true);			
			this.cb_tipe2.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);			
			this.cb_cust3.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);						

			this.cb_pp.setSQL("select kode_pp, nama from pp where jenis='SEGMEN' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			
			this.cb_tipe.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);
			this.cb_pic.setSQL("select kode_pic, nama from sju_pic where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pic","nama"],false,["Kode","Nama"],"and","Data Acc Exec",true);
			this.cb_ttd.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ttd2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");		
			var sql = new server_util_arrayList();
			sql.add("select kode_vendor,nama from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			//placing untuk 1 polis; MULTI = 1 placing bisa beberapa polis dan placing bisa jadi gak ada angkanya dulu 
			//contoh kasus marin cargo n kali keberangkatan n polis dari 1 placing (surabaya)
			this.c_jenis.setText("SINGLE");
			this.noAppLama = "-";

			this.doLoad2();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fQuotPesan.extend(window.childForm);
window.app_saku3_transaksi_sju16_fQuotPesan.implement({	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doLoad2:function(sender){										
		var strSQL = "select a.no_quo, "+
					 "case a.progress when '0' then 'QUOTATION' "+
					 "                when 'R' then 'APPREVISI' "+					
					 "                when 'B' then 'CL-REVISI' "+
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+' | '+d.nama as cust,b.kode_pp+' | '+b.nama as pp,c.kode_pic+' | '+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee, "+
					 "convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,no_draft, a.progress, a.tgl_input,a.nik_user "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','R','B') and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_quo desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);			
	},
	doTampilData: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg2.appendData([line.status.toUpperCase(),line.no_quo,line.tanggal,line.cust,line.pp,line.pic,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),line.tgl_mulai,line.tgl_selesai,line.occup,line.lokasi,line.objek,floatToNilai(line.p_premi),floatToNilai(line.p_fee),line.no_draft,line.progress,line.tgl_input,line.nik_user]); 
		}
		this.sg2.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	mainButtonClick: function(sender, desk){
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
					if (this.stsSimpan != 1) {
						sql.add("update sju_pesanan_m set no_quo='-' where no_bukti='"+this.cb_pesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from sju_quo_m where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_quo_vendor where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_quo_dok where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}						
						//koreksi dr nota konfirmasi loncat langsung ke nota konfirmasi lagi

						if (this.statusKonf == 1) {
							if (this.progress == "B" || this.progress == "1") var vProg = "1"; 
							else var vProg = "0"; 
						}
						else var vProg = "0"; 

					} else var vProg = "0"; 
					
					//hitung ulang persentase
					var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_nilai.getText()) * 100;
					this.e_ppremi.setText(floatToNilai(ppremi));					
					var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;						
					this.e_pfee.setText(floatToNilai(pfee));
					
					if (this.cb_draft.getText() == "") var noDraft = "-";
					else var noDraft = this.cb_draft.getText();
				
					sql.add("insert into sju_quo_m(no_quo,kode_lokasi,tgl_input,nik_user,periode,progress,no_placing,no_polis,tanggal,kode_pp,kode_tipe,kode_pic,kode_cust,kode_vendor,tgl_mulai,tgl_selesai,kode_curr,total,p_premi,n_premi,p_fee,n_fee,occup,lokasi,objek,ttd,"+
							"catat,no_draft,ppn,pph,no_app, slip,cover,nilai_deduc,jenis, no_quoapp,no_quonota,jabatan, ttd_nota, jabatan_nota) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+vProg+"','-','-','"+this.dp_d1.getDateString()+"','"+this.cb_pp.getText()+"','"+this.cb_tipe.getText()+"','"+this.cb_pic.getText()+"','"+this.cb_cust.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppremi.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_pfee.getText())+","+nilaiToFloat(this.e_nfee.getText())+",'"+this.e_occup.getText()+"','"+this.e_lokasi.getText()+"','"+this.e_objek.getText()+"','"+this.cb_ttd.getText()+"','"+this.e_catat.getText()+"','"+noDraft+"',0,0,'"+this.noAppLama+"','"+urlencode(this.mDesk.getCode())+"','-',0,'"+this.c_jenis.getText()+"','"+this.noAppLama+"','-','-', '"+this.cb_ttd2.getText()+"','"+this.e_jab.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into sju_quo_vendor(no_quo,kode_lokasi,kode_vendor) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
							}
						}
					}
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into sju_quo_dok(no_quo,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}		
					sql.add("update sju_pesanan_m set no_quo='"+this.e_nb.getText()+"' where no_bukti='"+this.cb_pesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.sg.clear(1); this.sgUpld.clear(1);
					this.e_noapp.setVisible(false);
					this.e_memo.setVisible(false); 
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					setTipeButton(tbAllFalse);
					this.cb_draft.onChange.set(this,"doChange");
					this.doLoad2();			
					this.noAppLama = "-";	
					this.cb_pesan.setSQL("select no_bukti, pekerjaan from sju_pesanan_m where progress = 'PS02' and no_quo = '-' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","pekerjaan"],false,["Kode","Nama"],"and","Data Pesanan",true);			
				break;
			case "simpan" :						
			case "ubah" :		
				this.preView = "1";
				if (this.c_jenis.getText() == "SINGLE") {
					if (nilaiToFloat(this.e_npremi.getText()) <= 0 || nilaiToFloat(this.e_nfee.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Premi/Fee tidak boleh nol atau kurang.");
						return false;
					}												
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update sju_pesanan_m set no_quo='-' where no_bukti='"+this.cb_pesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_quo_m where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_quo_vendor where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_quo_dok where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
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
		this.dp_d2.setText(this.dp_d1.getText());		
		this.doLoad2();
	},		
	doChange:function(sender){
		if (sender == this.cb_pesan && this.cb_pesan.getText()!="") {
			var strSQL = "select a.kode_cust,a.jam_awal,a.jam_akhir,a.nilai_j,a.nilai_k,a.pekerjaan,a.catatan,b.estimasi "+
						 "from sju_pesanan_m a inner join sju_proses01 b on a.no_bukti=b.no_ref and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_bukti='"+this.cb_pesan.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.cb_cust.setText(line.kode_cust);	
					this.dp_d2.setText(line.jam_awal);
					this.dp_d3.setText(line.jam_akhir);	
					this.e_nilai.setText(floatToNilai(line.nilai_j));	
					this.e_npremi.setText(floatToNilai(line.estimasi));		
					this.e_objek.setText(line.pekerjaan);	
					this.e_catat.setText(line.catatan);	 
					//this.e_ppremi.setText(floatToNilai(line.estimasi));	
				}					
			}
		}
		if (sender == this.cb_tipe && this.cb_tipe.getText()!="") {
			if (this.stsSimpan == 1) this.doClick();
			this.cb_draft.setSQL("select no_draft, nama from sju_draft where kode_tipe ='"+this.cb_tipe.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_draft","nama"],false,["Kode","Nama"],"and","Data Draft",true);			
		}
		if (sender == this.cb_cust && this.cb_cust.getText()) {
			var strSQL = "select a.kode_segmen,b.nik from sju_cust a inner join pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.cb_pp.setText(line.kode_segmen);	
					this.cb_ttd.setText(line.nik);									
				}					
			}

			this.sg1mp2.clear();
			var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from sju_cust_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_cust = '"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1mp2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													 
					this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
				}
			} else this.sg1mp2.clear(1);
		}
		if (sender == this.dp_d2) {
			var strSQL = "select dateadd(month,12,'"+this.dp_d2.getDateString()+"') as tgl ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d3.setText(line.tgl);						
					}					
				}
		}	
		if ((sender == this.cb_tipe2 || sender == this.cb_cust3) && this.cb_tipe2.getText()!="" && this.cb_cust3.getText()!="") {
			this.cb_quo2.setSQL("select no_quo, kode_tipe from sju_quo_m where kode_tipe='"+this.cb_tipe2.getText()+"' and kode_cust='"+this.cb_cust3.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_quo","kode_tipe"],false,["No Quot","COB"],"and","Data Quotation",true);		
		}

		if (sender == this.cb_draft & this.cb_draft.getText()!=""){
			try{				
				if (this.stsSimpan == 1) {
					var data = this.dbLib.getDataProvider("select keterangan from sju_draft where no_draft='"+this.cb_draft.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
					if (data && data.rs.rows[0]){
						var line = data.rs.rows[0];
						this.mDesk.setCode(urldecode(line.keterangan));
					}								
				}
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.cb_tipe2) {
			this.cb_quo2.setSQL("select no_quo, kode_tipe from sju_quo_m where kode_tipe like '%"+this.cb_tipe2.getText()+"%' and kode_lokasi='"+this.app._lokasi+"'",["no_quo","kode_tipe"],false,["No Quot","COB"],"and","Data Quotation",true);
		}
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "SINGLE") {
				this.e_nilai.setTag(1);
				this.e_ppremi.setTag(1);
				this.e_npremi.setTag(1);
				this.e_pfee.setTag(1);
				this.e_nfee.setTag(1);
			}
			else {				
				this.e_nilai.setTag(9);
				this.e_ppremi.setTag(9);
				this.e_npremi.setTag(9);
				this.e_pfee.setTag(9);
				this.e_nfee.setTag(9);
			}
		}

		if (sender == this.cb_ttd2 && this.cb_ttd2.getText() != "" && this.stsSimpan==1) {
			var strSQL = "select jabatan from karyawan "+
						 "where nik='"+this.cb_ttd2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_jab.setText(line.jabatan);
				}
			}		
		}

	},
	doHitung:function(sender){		
		this.stsOto = 0;
		if (this.e_npremi.getText()!="" && this.e_nilai.getText()!="") {
			var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_nilai.getText()) * 100;
			this.e_ppremi.setText(floatToNilai(ppremi));
		}
		if (this.e_nfee.getText()!="" && this.e_npremi.getText()!="") {
			var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;						
			this.e_pfee.setText(floatToNilai(pfee));
		}
	},
	doHitung2:function(sender){		
		this.stsOto = 0;
		if (this.e_ppremi.getText()!="" && this.e_nilai.getText()!="") {
			var npremi = Math.round(nilaiToFloat(this.e_ppremi.getText())/100 * nilaiToFloat(this.e_nilai.getText()) * 100)/100;
			this.e_npremi.setText(floatToNilai(npremi));			
		}
		if (this.e_pfee.getText()!="" && this.e_npremi.getText()!="") {
			var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
			this.e_nfee.setText(floatToNilai(nfee));
		}
	},	
	doClick:function(sender){			
		if (this.stsSimpan==0) {
			this.e_noapp.setVisible(false);
			this.e_memo.setVisible(false);
			this.noAppLama = "-";
			this.cb_pesan.setSQL("select no_bukti, pekerjaan from sju_pesanan_m where progress = 'PS02' and no_quo = '-' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","pekerjaan"],false,["Kode","Nama"],"and","Data Pesanan",true);			
		}	
		if (this.cb_tipe.getText()!="" && this.cb_pp.getText()!="" && this.e_periode.getText()!="") {						
			this.stsSimpan = 1;
			var AddFormat = "/QS."+this.cb_tipe.getText()+"/"+this.cb_pp.getText()+"/SJU/"+this.e_periode.getText().substr(2,2);
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_quo,0,30)),0) as no_quo from sju_quo_m where no_quo like '____"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_quo == "0") this.e_nb.setText("0001"+AddFormat);
					else {
						var idx = parseFloat(line.no_quo.substr(0,4)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "000"+idx;
						if (idx.length == 2) var nu = "00"+idx;
						if (idx.length == 3) var nu = "0"+idx;
						if (idx.length == 4) var nu = idx;
						this.e_nb.setText(nu+AddFormat);
					}
				} 
			}
			this.cb_cust.setFocus();
			setTipeButton(tbSimpan);			
		}				
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Penanggung",sender,undefined, 												  
												  "select kode_vendor,nama    from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_vendor)  from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
				}		
				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and jenis='QUOTATION'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and jenis='QUOTATION'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var vendor = this.dataVendor.get(sender.cells(0,row));
				if (vendor) sender.cells(1,row,vendor);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Penanggung "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {
								this.nama_report = "server_report_saku3_sju16_rptPrQuo";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_quo='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}
						else {
							if (result.toLowerCase().search("primary key") == -1) {
								alert(error);
							}
							else 
								this.simpan();
						}
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataVendor = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataVendor.set(line.kode_vendor, line.nama);										
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
			this.sg.clear(1); this.sgUpld.clear(1); 
			this.e_noapp.setVisible(false);
			this.e_memo.setVisible(false);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);
			this.cb_draft.onChange.set(this,"doChange");
			this.doLoad2();
			this.noAppLama = "-";
			this.cb_pesan.setSQL("select no_bukti, pekerjaan from sju_pesanan_m where progress = 'PS02' and no_quo = '-' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","pekerjaan"],false,["Kode","Nama"],"and","Data Pesanan",true);			
		} catch(e) {
			alert(e);
		}
	},
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				
				this.e_noapp.setVisible(true);
				this.e_memo.setVisible(true);

				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.dp_d2.onChange.set(undefined,undefined);
				this.e_nilai.onChange.set(undefined,undefined);
				this.e_ppremi.onChange.set(undefined,undefined);
				this.e_pfee.onChange.set(undefined,undefined);
				this.cb_draft.onChange.set(undefined,undefined);
				
				this.e_nb.setText(this.sg2.cells(1,row));	
				this.progress = this.sg2.cells(18,row);
		
				//jika koreksi dari nota-konfirmasi maka runut kembalinya loncat langsung ke nota-konfirmasi lagi
				//selain status "B", maka itu runut dari awal
				if (this.progress == "B") 
					var strSQL = "select a.*,isnull(b.catatan,'-') as catatan, c.no_bukti as no_pesan "+
								 "from sju_quo_m a "+
								 "	inner join sju_pesanan_m c on a.no_quo=c.no_quo and a.kode_lokasi=c.kode_lokasi "+
								 "left join ("+
								 "        select a.kode_lokasi,a.no_app,a.catatan from sju_app_d a "+
								 "        inner join sju_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='CONFIRM' "+
								 "       ) b on a.no_quonota=b.no_app and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_quo='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";							
				else 
					var strSQL = "select a.*,isnull(b.catatan,'-') as catatan, c.no_bukti as no_pesan "+
								 "from sju_quo_m a "+
								 "	inner join sju_pesanan_m c on a.no_quo=c.no_quo and a.kode_lokasi=c.kode_lokasi "+
								 "left join ("+
								 "        select a.kode_lokasi,a.no_app,a.catatan from sju_app_d a "+
								 "        inner join sju_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='APROVAL' "+
								 "	     ) b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_quo='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.cb_pesan.setSQL("select no_bukti, pekerjaan from sju_pesanan_m where no_quo = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","pekerjaan"],false,["Kode","Nama"],"and","Data Pesanan",true);			
						this.cb_pesan.setText(line.no_pesan);
						
						this.c_jenis.setText(line.jenis);					
						this.dp_d1.setText(line.tanggal);					
						if (line.no_draft == "-") this.cb_draft.setText(""); 
						else this.cb_draft.setText(line.no_draft);

						this.cb_pp.setText(line.kode_pp);
						this.cb_tipe.setText(line.kode_tipe);
						this.cb_pic.setText(line.kode_pic);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d2.setText(line.tgl_mulai);					
						this.dp_d3.setText(line.tgl_selesai);					
						this.c_curr.setText(line.kode_curr);
						this.e_nilai.setText(floatToNilai(line.total));
						this.e_ppremi.setText(floatToNilai(line.p_premi));
						this.e_npremi.setText(floatToNilai(line.n_premi));
						this.e_pfee.setText(floatToNilai(line.p_fee));
						this.e_nfee.setText(floatToNilai(line.n_fee));						
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);
						this.e_catat.setText(line.catat.replace(/\<br\>/gi,"\r\n"));					
						this.cb_ttd.setText(line.ttd);	
						this.cb_ttd2.setText(line.ttd_nota);
						this.e_jab.setText(line.jabatan_nota);										
						if (this.progress == "B") {
								this.e_noapp.setText(line.no_quonota);	
								this.noAppLama = line.no_app;
						}								
						else {
							this.e_noapp.setText(line.no_app);	
							this.noAppLama = "-";
						}				
						this.e_memo.setText(line.catatan);	
						this.mDesk.setCode(urldecode(line.slip));									
					}
				}	

				var data = this.dbLib.getDataProvider("select b.kode_vendor,b.nama from sju_quo_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_quo = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_vendor, line.nama]);
					}
				} else this.sg.clear(1);						
				
				this.sgUpld.clear();
				this.deleteFiles = [];
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from sju_quo_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_quo = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
					}
				} else this.sgUpld.clear(1);

				this.dp_d2.onChange.set(this,"doChange");
				this.e_nilai.onChange.set(this,"doChange");
				this.e_ppremi.onChange.set(this,"doChange");
				this.e_pfee.onChange.set(this,"doChange");
			}			
		} catch(e) {alert(e);}
	},
	doCari:function(sender){	
		if (this.cb_tipe2.getText()!="") var filter = " and a.kode_tipe='"+this.cb_tipe2.getText()+"' ";
		else  var filter = " ";		
		if (this.cb_cust3.getText()!="") var filter = filter +" and a.kode_cust='"+this.cb_cust3.getText()+"' ";
		else  var filter = filter+"  ";
		if (this.cb_quo2.getText()!="") var filter = filter +" and a.no_quo='"+this.cb_quo2.getText()+"' ";
		else  var filter = filter+"  ";

		var strSQL = "select a.no_quo, "+
					 "case a.progress when '0' then 'QUOTATION' "+
					 "                when 'R' then 'APPREVISI' "+					 
					 "                when 'B' then 'CL-REVISI' "+
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+' | '+d.nama as cust,b.kode_pp+' | '+b.nama as pp,c.kode_pic+' | '+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,no_draft,a.progress,a.tgl_input,a.nik_user "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "where a.progress in ('0','R','B') and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_quo desc";	

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow20));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);
		this.pc2.setActivePage(this.pc2.childPage[0]);	
	},	
	doCopy:function(sender){						
		if (this.cb_quo2.getText()!="") {					
			this.cb_draft.onChange.set(undefined,undefined);

			var strSQL = "select * from sju_quo_m  where no_quo='"+this.cb_quo2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";									
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.c_jenis.setText(line.jenis);					
					if (line.no_draft == "-") this.cb_draft.setText("");
					else this.cb_draft.setText(line.no_draft);					
					this.cb_pp.setText(line.kode_pp);
					this.cb_tipe.setText(line.kode_tipe);
					this.cb_pic.setText(line.kode_pic);
					this.c_curr.setText(line.kode_curr);
					this.e_nilai.setText(floatToNilai(line.total));
					this.e_ppremi.setText(floatToNilai(line.p_premi));
					this.e_npremi.setText(floatToNilai(line.n_premi));
					this.e_pfee.setText(floatToNilai(line.p_fee));
					this.e_nfee.setText(floatToNilai(line.n_fee));					
					this.e_occup.setText(line.occup);
					this.e_lokasi.setText(line.lokasi);
					this.e_objek.setText(line.objek);
					this.e_catat.setText(line.catat.replace(/\<br\>/gi,"\r\n"));					
					this.cb_ttd.setText(line.ttd);	
					this.cb_ttd2.setText(line.ttd_nota);
					this.e_jab.setText(line.jabatan_nota);										
					this.mDesk.setCode(urldecode(line.slip));																			
				}
			}						
			var data = this.dbLib.getDataProvider("select b.kode_vendor,b.nama from sju_quo_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_quo = '"+this.cb_quo2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.kode_vendor, line.nama]);
				}
			} else this.sg.clear(1);						

			this.pc2.setActivePage(this.pc2.childPage[1]);	
		}					
	}
});