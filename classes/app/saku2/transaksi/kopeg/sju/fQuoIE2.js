window.app_saku2_transaksi_kopeg_sju_fQuoIE2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fQuoIE2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fQuoIE2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Quotation: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,480], childPage:["Daftar Quotation","Detail Quotation","Cari Data"]});		
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:18,tag:9,
		            colTitle:["No Quotation","Status","Tanggal","Tertanggung","Unit","Acc Exec","Curr","Sum Insured","Premi","Brokerage","Tgl Mulai","Tgl Selesai","Occup. of Risk","Loc. of Risk","Obj. of Loss","% Premi","% Fee","No Draft"],
					colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,60,60,200,200,200,70,70,80,80,80,60,80,100,200,70,80,150]],
					readOnly:true,colFormat:[[7,8,9,15,16],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager"]});
						
		this.l_tgl1 = new portalui_label(this.pc2.childPage[1],{bound:[20,10,100,18],caption:"Tanggal - Period", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,10,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Unit",tag:2,multiSelection:false,change:[this,"doChange2"]}); 		
		this.cb_tipe = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,200,20],caption:"COB",tag:2,multiSelection:false,change:[this,"doChange2"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,275,20],caption:"No Quotation",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[300,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.c_jenis = new saiCB(this.pc2.childPage[1],{bound:[780,14,200,20],caption:"Jenis Quotation",items:["SINGLE","MULTI"], readOnly:true,tag:2,change:[this,"doChange"]});
				
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,15,this.pc2.width-5,this.pc2.height-125], childPage:["Data Quotation","Detail Draft","Dokumen Pendukung","Catatan Approval","History Quotation","Kunci Draft"]});						
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,202,20],caption:"Tertanggung",tag:2,multiSelection:false}); 		
		this.cb_pic = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,202,20],caption:"Acc Exec",tag:2,multiSelection:false}); 		
		this.cb_ttd = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,202,20],caption:"Signer",tag:2,multiSelection:false}); 				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 		
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[260,11,100,18]}); 
		this.c_curr = new saiCB(this.pc1.childPage[0],{bound:[20,14,180,20],caption:"Sum Insured",readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[260,14,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});				
		this.e_occup = new saiLabelEdit(this.pc1.childPage[0],{bound:[450,14,530,20],caption:"Occupation of Risk", maxLength:200});						
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,180,20],caption:"Premi % - Nilai", tag:1, tipeText:ttNilai, text:"0"});		
		this.i_hitung2 = new portalui_imageButton(this.pc1.childPage[0],{bound:[210,18,20,20],hint:"Hitung %",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung2"]});
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[0],{bound:[260,18,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});		
		this.i_hitung = new portalui_imageButton(this.pc1.childPage[0],{bound:[370,18,20,20],hint:"Hitung Persentase",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[0],{bound:[450,18,530,20],caption:"Location of Risk", maxLength:200});						
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,180,20],caption:"Brokerage % - Nilai", tag:1, tipeText:ttNilai, text:"0"});
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[0],{bound:[260,19,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});						
		this.e_objek = new saiLabelEdit(this.pc1.childPage[0],{bound:[450,19,530,20],caption:"Object of Loss", maxLength:200});						
		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,400,this.pc1.height-205],colCount:2,tag:0,
		            colTitle:["Penanggung","Nama"],colWidth:[[1,0],[270,80]],columnReadOnly:[true,[1],[0]],buttonStyle:[[0],[bsEllips]],
					change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,400],buttonStyle:2,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.cb_draft = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Draft",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		this.mDesk = new tinymceCtrl(this.pc1.childPage[1],{bound:[10,13,980,320], withForm:false});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
			
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"No Approve", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[3],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.cb_tipe2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,12,202,20],caption:"COB",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_quo2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,13,250,20],caption:"No Quotation",tag:9,multiSelection:false}); 				
		this.bLoad = new button(this.pc1.childPage[4],{bound:[120,10,80,18],caption:"Load Data",click:[this,"doLoad"]});			
						
		this.sgkunci = new saiGrid(this.pc1.childPage[5],{bound:[1,10,800,this.pc1.height-25],colCount:2,tag:8,
		            colTitle:["Kunci","Nama"],colWidth:[[1,0],[500,200]],readOnly:true,autoAppend:false,defaultRow:1});
		this.sgnkunci = new portalui_sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height-25,800],buttonStyle:3,grid:this.sgkunci});								
		
		this.cb_cust3 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,202,20],caption:"Tertanggung",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_quo3 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,13,300,20],caption:"No Quotation", tag:9, maxLength:50});								
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		uses("server_report_report;portalui_reportViewer");
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
				
		this.e_periode = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[225,9,70,20],labelWidth:0,caption:"",tag:2,readOnly:true});
		this.e_catat = new saiMemo(this.pc1.childPage[0],{bound:[450,180,530,170],caption:"Remarks",tag:1});
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			this.cb_tipe.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);
			this.cb_pic.setSQL("select kode_pic, nama from sju_pic where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pic","nama"],false,["Kode","Nama"],"and","Data Acc Exec",true);
			this.cb_ttd.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_tipe2.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);			
			this.cb_quo2.setSQL("select no_quo, kode_tipe from sju_quo_m where kode_lokasi='"+this.app._lokasi+"'",["no_quo","kode_tipe"],false,["No Quot","COB"],"and","Data Quotation",true);
			
			this.cb_cust3.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			
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
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('KCAB','PPPROD') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "KCAB") this.kepCabang = line.flag;								
					if (line.kode_spro == "PPPROD") ppProduksi = line.flag;								
				}
			}
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+ppProduksi+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit",true);
			this.cb_pp.setText(ppProduksi);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";							
			
			this.cb_ttd.setText(this.kepCabang);			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_vendor,nama from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.stsSimpan = 1;
			this.stsOto = 1;
			this.c_jenis.setText("SINGLE"); //<-----------------  1 placing untuk 1 polis; MULTI = 1 placing bisa beberapa polis dan plaing bisa jadi gak ada angkanya dulu contoh marin cargo n kali keberangkatan n polis dari 1 placing
						
			var data = this.dbLib.getDataProvider("select kunci,nama from sju_kunci order by kunci",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgkunci.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sgkunci.appendData([line.kunci, line.nama]);
				}
			} else this.sgkunci.clear(1);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fQuoIE2.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fQuoIE2.implement({		
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
						sql.add("delete from sju_quo_m where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_quo_draft where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
						if (this.progress == "B" || this.progress == "1") var vProg = "1"; 
						else var vProg = "0"; 
					} else var vProg = "0"; 
					
					
					//hitung ulang persentase
					var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_nilai.getText()) * 100;
					this.e_ppremi.setText(floatToNilai(ppremi));					
					var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;						
					this.e_pfee.setText(floatToNilai(pfee));
					
					if (this.cb_draft.getText() == "") var noDraft = "-";
					else var noDraft = this.cb_draft.getText();
				
					sql.add("insert into sju_quo_m(no_quo,kode_lokasi,tgl_input,nik_user,periode,progress,no_placing,no_polis,tanggal,kode_pp,kode_tipe,kode_pic,kode_cust,kode_vendor,tgl_mulai,tgl_selesai,kode_curr,total,p_premi,n_premi,p_fee,n_fee,occup,lokasi,objek,ttd,catat,no_draft,ppn,pph,no_app, slip,cover,nilai_deduc,jenis) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+vProg+"','-','-','"+this.dp_d1.getDateString()+"','"+this.cb_pp.getText()+"','"+this.cb_tipe.getText()+"','"+this.cb_pic.getText()+"','"+this.cb_cust.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppremi.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_pfee.getText())+","+nilaiToFloat(this.e_nfee.getText())+",'"+this.e_occup.getText()+"','"+this.e_lokasi.getText()+"','"+this.e_objek.getText()+"','"+this.cb_ttd.getText()+"','"+this.e_catat.getText()+"','"+noDraft+"',0,0,'-','"+urlencode(this.mDesk.getCode())+"','-',0,'"+this.c_jenis.getText()+"')");
										
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
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					setTipeButton(tbAllFalse);
					this.cb_draft.onChange.set(this,"doChange");
					this.doLoad2();
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
					sql.add("delete from sju_quo_m where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_quo_draft where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange2:function(sender){
		if (sender == this.cb_pp || sender == this.cb_tipe) {
			if (this.cb_pp.getText()!="" && this.cb_tipe.getText()!="") {
				if (this.stsSimpan == 1) this.doClick();
				this.cb_draft.setSQL("select no_draft, nama from sju_draft where kode_tipe ='"+this.cb_tipe.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_draft","nama"],false,["Kode","Nama"],"and","Data Draft",true);
			}
		}
	},
	doChange:function(sender){
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
		/*		
		if (sender == this.e_nilai && this.e_nilai.getText()!="") {
			this.stsOto = 1;
			if (this.e_ppremi.getText()!="") {
				var npremi = Math.round(nilaiToFloat(this.e_ppremi.getText())/100 * nilaiToFloat(this.e_nilai.getText()) * 100)/100;
				this.e_npremi.setText(floatToNilai(npremi));
				if (this.e_pfee.getText()!="" && this.e_npremi.getText()!="") {
					var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
					this.e_nfee.setText(floatToNilai(nfee));
				}
			}
		}		
		if (sender == this.e_ppremi && this.e_ppremi.getText()!="") {		
			if (this.stsOto == 1) {
				var npremi = Math.round(nilaiToFloat(this.e_ppremi.getText())/100 * nilaiToFloat(this.e_nilai.getText()) * 100)/100;
				this.e_npremi.setText(floatToNilai(npremi));
				if (this.e_pfee.getText()!="") {
					var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
					this.e_nfee.setText(floatToNilai(nfee));
				}
			}
		}
		if (sender == this.e_pfee && this.e_pfee.getText()!="" && this.e_npremi.getText()!="") {			
			if (this.stsOto == 1) {
				var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
				this.e_nfee.setText(floatToNilai(nfee));
			}
		}
		*/
		
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
				error_log(e);
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
	doLoad:function(sender){						
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
			this.pc1.setActivePage(this.pc1.childPage[0]);	
		}					
	},
	doClick:function(sender){				
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {
								this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);
			this.cb_draft.onChange.set(this,"doChange");
			this.doLoad2();
		} catch(e) {
			alert(e);
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
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
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
	doLoad2:function(sender){										
		var strSQL = "select a.no_quo, "+
					 "case a.progress when '0' then 'QUOTATION' "+
					 "                when 'R' then 'APPREVISI' "+
					 "                when '1' then 'APPQUOT' "+
					 "                when 'B' then 'CL-REVISI' "+
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,no_draft "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','R','1','B') and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_quo desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);			
	},
	doTampilData: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg2.appendData([line.no_quo,line.status.toUpperCase(),line.tanggal,line.cust,line.pp,line.pic,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),line.tgl_mulai,line.tgl_selesai,line.occup,line.lokasi,line.objek,floatToNilai(line.p_premi),floatToNilai(line.p_fee),line.no_draft]); 
		}
		this.sg2.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doCari:function(sender){										
		var strSQL = "select a.no_quo, "+
					 "case a.progress when '0' then 'QUOTATION' "+
					 "                when 'R' then 'APPREVISI' "+
					 "                when '1' then 'APPQUOT' "+
					 "                when 'B' then 'CL-REVISI' "+
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,no_draft "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_cust like '%"+this.cb_cust3.getText()+"%' and a.no_quo like '%"+this.e_quo3.getText()+"%' and a.progress in ('0','R','1','B') and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_quo desc";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);
		this.pc2.setActivePage(this.pc2.childPage[0]);	
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.dp_d2.onChange.set(undefined,undefined);
				this.e_nilai.onChange.set(undefined,undefined);
				this.e_ppremi.onChange.set(undefined,undefined);
				this.e_pfee.onChange.set(undefined,undefined);
				this.cb_draft.onChange.set(undefined,undefined);
				
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg2.cells(0,row));				
				var data = this.dbLib.getDataProvider("select progress from sju_quo_m where no_quo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){var line = data.rs.rows[0];if (line != undefined) this.progress = line.progress;}					
				
				if (this.progress == "B") var strSQL = "select a.*,isnull(b.catatan,'-') as catatan from sju_quo_m a left join ("+
								 "        select a.kode_lokasi,a.no_app,a.catatan from sju_app_d a "+
								 "        inner join sju_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='CONFIRM') b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_quo='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";							
				else var strSQL = "select a.*,isnull(b.catatan,'-') as catatan from sju_quo_m a left join ("+
								 "        select a.kode_lokasi,a.no_app,a.catatan from sju_app_d a "+
								 "        inner join sju_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='APROVAL') b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_quo='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
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
						this.e_noapp.setText(line.no_app);					
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
	}
});