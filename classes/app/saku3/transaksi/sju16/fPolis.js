window.app_saku3_transaksi_sju16_fPolis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fPolis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fPolis";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Polis", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});						
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Data Placing","Data Polis","Data Penanggung","Termin Tagihan","Dokumen Pendukung","Filter Cari"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:23,tag:9,
		            colTitle:["Status","No Placing","No Quotation","Tgl Placing","Penanggung","Tertanggung","Segmen","Acc Exec","Curr","Sum Insured","Premi","Brokerage","Tgl Mulai","Tgl Selesai","Occup. of Risk","Loc. of Risk","Obj. of Loss","% Premi","% Fee","No Register","No Polis","Tgl Input","User Input"],
					colWidth:[[22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,110,150,150,60,60,200,200,200,70,70,80,80,80,60,80,100,200,200,70,150,150,80]],
					readOnly:true,colFormat:[[9,10,11,17,18],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load List",click:[this,"doLoad"]});

		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,16,202,20],caption:"Status",items:["POLIS"], readOnly:true,tag:2,visible:false});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Register", readOnly:true});								
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Jenis Polis", readOnly:true,visible:false});

   	    this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"No Polis", maxLength:50});						
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Sertifikat", maxLength:50});						
		this.e_noplacing = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Placing", readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,200,20],caption:"Tgl Placing", readOnly:true});				
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Quotation", readOnly:true});
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Png (Leader)", readOnly:true});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Segmen", readOnly:true});
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Acc Exec", readOnly:true});
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Occup. of Risk", maxLength:200});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Loc. of Risk",  maxLength:200});						
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Object of Risk",  maxLength:200});	
		this.e_cover = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Coverage",  maxLength:200});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_mulai = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 		
		this.dp_selesai = new portalui_datePicker(this.pc1.childPage[1],{bound:[370,11,100,18]}); 				
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency",readOnly:true,tag:2});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:1, tipeText:ttNilai, text:"0"});
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:1, tipeText:ttNilai, text:"0"});    
		this.i_hitung2 = new portalui_imageButton(this.pc1.childPage[1],{bound:[230,16,20,20],hint:"Hitung Nilai",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung2"]});
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:1, tipeText:ttNilai, text:"0"}); 
		this.i_hitung = new portalui_imageButton(this.pc1.childPage[1],{bound:[480,16,20,20],hint:"Hitung Persentase",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"% Brokerage", tag:1, tipeText:ttNilai, text:"0"});  
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Brokerage", tag:1, tipeText:ttNilai, text:"0"});   				
		this.e_ndiskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_npcost = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Polis Cost", tag:1, tipeText:ttNilai, text:"0"});								
		this.e_nmat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Bea Materai", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_jml = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Jml Termin", tag:1, tipeText:ttNilai, text:"1"});								
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[480,17,20,20],hint:"Generate Termin Tagihan",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGrid"]});

		this.sg31 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
		            colTitle:["Kode","Nama Penanggung","Status"," % ","SumInsured","Premi","Brokerage","PPN","PPh",	"Tot.Termin Premi","Tot. Termin Brokrg","Tot. Termin PPN","Tot. Termin PPh"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,   80,80,100,100,100,60,80,250,80]],					
					colFormat:[[3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					change:[this,"doChangeCell31"],columnReadOnly:[true,[0,1,2,9,10,11,12],[3,4,5,6,7,8]],					
					autoAppend:false,defaultRow:1}); 
		this.sgn31 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg31});		

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:14,tag:0,
		            colTitle:["Ke-","Kode Png","Nama Penanggung","Tgl Invoice","Jatuh Tempo","No Polis / Keterangan","Premi","Brokerage","PPN","PPh","Discount","P. Cost","Materai","Total Premi"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,80,80,80,80,80,190,80,80,150,70,40]],																		
					columnReadOnly:[true,[13],[0,1,2,3,4,5,6,7,8,9,10,11,12]],
					buttonStyle:[[3,4],[bsDate,bsDate]], 
					colFormat:[[6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],					
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.c_status2 = new saiCB(this.pc1.childPage[5],{bound:[20,10,200,20],caption:"Status",items:["PLACING","POLIS"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[5],{bound:[20,12,220,20],caption:"Tertanggung",tag:9,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_reg = new portalui_saiCBBL(this.pc1.childPage[5],{bound:[20,13,220,20],caption:"No Register",tag:9,multiSelection:false}); 		
		this.bCari = new button(this.pc1.childPage[5],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[5].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);			
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select kode_spro,value1 from spro where kode_spro in ('PPPN','PPPHSJU') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPPN") this.persenPPN = parseFloat(line.value1);
					if (line.kode_spro == "PPPHSJU") this.persenPPh = parseFloat(line.value1);
				}
			}					
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
			this.c_status.setText("POLIS");
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.cb_cust2.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fPolis.extend(window.childForm);
window.app_saku3_transaksi_sju16_fPolis.implement({
	doLoad:function(sender){						
		var strSQL = "select z.no_placing,a.no_quo,"+
		             "case z.progress when '1' then 'PLACING' "+
					 "end as status,convert(varchar,z.tanggal,103) as tanggal,e.kode_vendor+' | '+e.nama as vendor,d.kode_cust+'-'+d.nama as cust,b.kode_pp+' | '+b.nama as pp,c.kode_pic+' | '+c.nama as pic,a.kode_curr,"+
		             "z.total,z.n_premi,z.n_fee,convert(varchar,z.tgl_mulai,103) as tgl_mulai,convert(varchar,z.tgl_selesai,103) as tgl_selesai,z.occup,z.lokasi,z.objek,z.p_premi,z.p_fee,'-' as no_polis,'-' as no_dok, a.tgl_input,a.nik_user "+
		             "from sju_placing_m z "+
					 "inner join sju_placing_vendor ee on z.no_placing=ee.no_placing and z.kode_lokasi=ee.kode_lokasi and ee.status='LEADER' "+					 
					 "inner join sju_quo_m a on z.no_placing=a.no_placing and z.kode_lokasi=a.kode_lokasi "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "inner join sju_vendor e on ee.kode_vendor=e.kode_vendor and ee.kode_lokasi=e.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and z.progress = '1' and z.no_placingseb='-' and a.kode_lokasi='"+this.app._lokasi+"'"; 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.status.toUpperCase(),line.no_placing,line.no_quo,line.tanggal,line.vendor,line.cust,line.pp,line.pic,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),line.tgl_mulai,line.tgl_selesai,line.occup,line.lokasi,line.objek,floatToNilai(line.p_premi),floatToNilai(line.p_fee),line.no_polis,line.no_dok,line.tgl_input,line.nik_user]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doAfterPaste: function(sender,totalRow){
		try {			
			for (var i=0;i < this.sg2.rows.getLength();i++){						
				this.doChangeCell2(this.sg2,5,i);							
				this.doChangeCell2(this.sg2,6,i);							
				this.doChangeCell2(this.sg2,9,i);							
				this.doChangeCell2(this.sg2,10,i);							
				this.doChangeCell2(this.sg2,11,i);							
			}			
		} catch(e) {alert(e);}
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
						sql.add("update sju_placing_m set progress='1',no_polis='-' where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update sju_quo_m set no_polis='-' where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						
						sql.add("delete from sju_polis_m where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sju_polis_vendor where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sju_polis_dok where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}
					}
					
					if (this.e_jenis.getText() == "SINGLE") {
						sql.add("update sju_quo_m set no_polis='"+this.e_nb.getText()+"' where no_placing='"+this.e_noplacing.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("update sju_placing_m set progress='2',no_polis='"+this.e_nb.getText()+"' where no_placing='"+this.e_noplacing.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}
					else {						
						if (this.e_npremi.getText()!="" && this.e_total.getText()!="") {
							var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_total.getText()) * 100;
							this.e_ppremi.setText(floatToNilai(ppremi));
						}
						if (this.e_nfee.getText()!="" && this.e_npremi.getText()!="") {
							var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;			
							this.e_pfee.setText(floatToNilai(pfee));
						}		
					}
										
					sql.add("insert into sju_polis_m (no_polis,no_dok,no_dok2,no_placing,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_polisseb,ppn,pph,p_cost,diskon,occup,objek,lokasi,tgl_mulai,tgl_selesai,kode_curr,"+
							"total,p_premi,n_premi,p_fee,n_fee,materai,kode_cust,kode_vendor,cover,flag_aktif,nilai_deduc,kode_tipe,kode_pp,kode_pic) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_dok2.getText()+"','"+this.e_noplacing.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','POLIS','-',0,0,"+nilaiToFloat(this.e_npcost.getText())+","+nilaiToFloat(this.e_ndiskon.getText())+",'"+this.e_occup.getText()+"','"+this.e_objek.getText()+"','"+this.e_lokasi.getText()+"','"+this.dp_mulai.getDateString()+"','"+this.dp_selesai.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppremi.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_pfee.getText())+","+nilaiToFloat(this.e_nfee.getText())+","+nilaiToFloat(this.e_nmat.getText())+", '"+this.kodeCust+"','-','"+this.e_cover.getText()+"','1',0,'"+this.kode_tipe+"','"+this.kode_pp+"','"+this.kode_pic+"')");
															
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into sju_polis_termin(no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+","+this.sg2.cells(0,i)+",'"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(10,i))+","+nilaiToFloat(this.sg2.cells(11,i))+",'-','"+this.sg2.getCellDateValue(3,i)+"','-',0,'-','-',"+nilaiToFloat(this.sg2.cells(8,i))+","+nilaiToFloat(this.sg2.cells(9,i))+",'"+this.sg2.getCellDateValue(4,i)+"',"+nilaiToFloat(this.sg2.cells(12,i))+",'-')");
							}
						}
					}										
					if (this.sg31.getRowValidCount() > 0){
						for (var i=0;i < this.sg31.getRowCount();i++){
							if (this.sg31.rowValid(i)){								
								sql.add("insert into sju_polis_vendor(no_polis,kode_lokasi,kode_vendor,persen,total,n_premi,n_fee,status) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg31.cells(0,i)+"',"+nilaiToFloat(this.sg31.cells(3,i))+","+nilaiToFloat(this.sg31.cells(4,i))+","+
										nilaiToFloat(this.sg31.cells(5,i))+","+nilaiToFloat(this.sg31.cells(6,i))+",'"+this.sg31.cells(2,i)+"')");
							}
						}
					}					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into sju_polis_dok(no_polis,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
					this.sg.clear(1); this.sg2.clear(1); this.sg31.clear(1); this.sgUpld.clear(1); 					
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("POLIS");
					this.e_jml.setText("1");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :		
			case "ubah" :							
				this.preView = "1";			
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){								
						var j=i+1;
						
						if (nilaiToFloat(this.sg2.cells(7,i)) < nilaiToFloat(this.sg2.cells(8,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPN melebihi Brokerage. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg2.cells(7,i)) < nilaiToFloat(this.sg2.cells(9,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPh melebihi Brokerage. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai Brokerage melebihi Premi. (baris ke-"+j+")");
							return false;
						}						
					}
				}
									
				var nPremi = nFee = 0;
				for (var i=0;i < this.sg31.getRowCount();i++){
					if (this.sg31.rowValid(i)){				
						var j = i+1;	
						nPremi += nilaiToFloat(this.sg31.cells(5,i));
						nFee += nilaiToFloat(this.sg31.cells(6,i));
						if (nilaiToFloat(this.sg31.cells(5,i)) != nilaiToFloat(this.sg31.cells(9,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai premi tidak sama dengan total termin premi. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg31.cells(6,i)) != nilaiToFloat(this.sg31.cells(10,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai brokerage tidak sama dengan total termin brokerage. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg31.cells(7,i)) != nilaiToFloat(this.sg31.cells(11,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPN tidak sama dengan total termin ppn. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg31.cells(8,i)) != nilaiToFloat(this.sg31.cells(12,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPh tidak sama dengan total termin pph. (baris ke-"+j+")");
							return false;
						}
					}
				}
				nPremi = Math.round(nPremi * 100)/100;
				nFee = Math.round(nFee * 100)/100;
				if (nilaiToFloat(this.e_npremi.getText()) != nPremi) {
					system.alert(this,"Transaksi tidak valid.","Total rincian premi tidak sama dengan Nilai Premi.");
					return false;
				}
				if (nilaiToFloat(this.e_nfee.getText()) != nFee) {
					system.alert(this,"Transaksi tidak valid.","Total rincian brokerage tidak sama dengan Brokerage.");
					return false;
				}
				var strSQL = "select no_polis from sju_polis_m where no_dok+no_dok2='"+this.e_dok.getText()+this.e_dok2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_polis<>'"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {				
						system.alert(this,"Transaksi tidak valid.","No Polis (+Sertifikat) duplikasi dengan no bukti "+line.no_polis+".");
						return false;
					}
				}
				var strSQL = "select no_bill from sju_polis_termin where no_bill<>'-' and no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {				
						system.alert(this,"Transaksi tidak valid.","Polis sudah berubah progress(ditagihkan).");
						return false;
					}
				}																				
				var tglPlacing = this.e_tgl.getText().substr(6,4) + "-" + this.e_tgl.getText().substr(3,2) + "-" + this.e_tgl.getText().substr(0,2);
				var data = this.dbLib.getDataProvider("select datediff(dd,'"+tglPlacing+"','"+this.dp_d1.getDateString()+"') as sls ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined && parseInt(line.sls)<0) {
						system.alert(this,"Transaksi tidak valid.","Tanggal Polis kurang dari Tanggal Placing.");
						return false;
					}
				}	
				if ((nilaiToFloat(this.e_nmat.getText()) != this.mat) || (nilaiToFloat(this.e_ndiskon.getText()) != this.diskon) || (nilaiToFloat(this.e_npcost.getText()) != this.pcost)) {
					system.alert(this,"Transaksi tidak valid.","Total Termin (materai/diskon/polis cost) tidak sama dengan rekapnya.");
					return false;						
				}															 
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :				
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("update sju_polis_m set no_polisseb='-' where no_polisseb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update sju_placing_m set progress='1',no_polis='-' where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("update sju_quo_m set no_polis='-' where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
				
				sql.add("delete from sju_polis_m where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sju_polis_vendor where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sju_polis_dok where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				this.deletedFiles = "";	
				for (var i=0;i < this.sgUpld.getRowCount();i++){
					if (this.sgUpld.rowValid(i)){
						if (this.deletedFiles != "") this.deletedFiles += ";";
						this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
					}
				}
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
		this.doLoad();
	},	
	doClick:function(sender){
		if (this.stsSimpan == 1) {
			if (this.e_noplacing.getText()!="") {
				var strSQL = "select kode_cust,kode_pp from sju_placing_m where kode_lokasi='"+this.app._lokasi+"' and no_placing='"+this.e_noplacing.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {				
						this.kodepp = line.kode_pp;
						this.kodeCust = line.kode_cust;					
					}
				}
				var AddFormat = this.e_periode.getText().substr(2,2);
				var data = this.dbLib.getDataProvider("select isnull(max(no_polis),0) as no_polis from sju_polis_m where no_polis like '"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_polis == "0") this.e_nb.setText(AddFormat+"000001");
						else {
							var idx = parseFloat(line.no_polis.substr(2,6)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00000"+idx;
							if (idx.length == 2) var nu = "0000"+idx;
							if (idx.length == 3) var nu = "000"+idx;
							if (idx.length == 4) var nu = "00"+idx;
							if (idx.length == 5) var nu = "0"+idx;
							if (idx.length == 6) var nu = idx;
							this.e_nb.setText(AddFormat+nu);
						}
					} 
				}				
			}		
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.e_dok.setFocus();	
				if (this.sg.cells(0,row) == "PLACING") this.stsSimpan = 1;		
				else this.stsSimpan = 0;

				this.e_nb.setText(this.sg.cells(19,row));
				this.e_noplacing.setText(this.sg.cells(1,row));
				this.e_noquo.setText(this.sg.cells(2,row));
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_vendor.setText(this.sg.cells(4,row));
				this.e_cust.setText(this.sg.cells(5,row));
				this.e_pp.setText(this.sg.cells(6,row));				
				this.e_pic.setText(this.sg.cells(7,row));
				this.dp_mulai.setText(this.sg.cells(12,row));
				this.dp_selesai.setText(this.sg.cells(13,row));
				this.c_curr.setText(this.sg.cells(8,row));
				this.e_total.setText(this.sg.cells(9,row));
				this.e_npremi.setText(this.sg.cells(10,row));
				this.e_nfee.setText(this.sg.cells(11,row));
				this.e_ppremi.setText(this.sg.cells(17,row));
				this.e_pfee.setText(this.sg.cells(18,row));
						
				var strSQL = "select a.kode_cust,a.jenis,a.occup,a.lokasi,a.objek,a.kode_pp,a.kode_tipe,a.kode_pic from sju_placing_m a where a.no_placing='"+this.e_noplacing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_jenis.setText(line.jenis);
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);

						this.kode_tipe = line.kode_tipe;
						this.kode_pp = line.kode_pp;
						this.kode_pic = line.kode_pic;
						this.kodeCust = line.kode_cust;						
					}
				}
				if (this.stsSimpan == 1) {
					var strSQL = "select b.kode_vendor,b.nama,a.persen,a.total,a.n_premi,a.n_fee,a.status "+
								 "from sju_placing_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_placing = '"+this.e_noplacing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				else {
					var strSQL = "select b.kode_vendor,b.nama,a.persen,a.total,a.n_premi,a.n_fee,a.status "+
								 "from sju_polis_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_polis = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.status";
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg31.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						var ppn = Math.round((this.persenPPN *  parseFloat(line.n_fee) / 100) * 100)/100;
						var pph = Math.round((this.persenPPh *  parseFloat(line.n_fee) / 100) * 100)/100;
						this.sg31.appendData([line.kode_vendor,line.nama,line.status,floatToNilai(line.persen),floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),ppn,pph,"0","0","0","0"]);
					}
				} else this.sg31.clear(1);				
				
				if (this.stsSimpan == 1) {
					this.doClick();
					setTipeButton(tbSimpan);
				}
				else {
					setTipeButton(tbUbahHapus);
					var strSQL = "select a.ke,a.kode_vendor,b.nama,a.no_polis,a.nu,a.keterangan,a.premi,a.fee,a.diskon,a.p_cost,convert(varchar,a.tgl_bill,103) as tgl_bill,convert(varchar,a.due_date,103) as due_date,a.ppn,a.pph,a.materai,a.premi-a.diskon+a.p_cost+a.materai as total,"+
					             "c.no_dok,c.no_dok2,c.p_cost as rekap_cost,c.diskon as rekap_diskon,c.materai as rekap_mat,c.total as suminsured,c.p_premi,c.n_premi,c.p_fee,c.n_fee,c.tanggal as tgl_polis,c.cover "+
								 "from sju_polis_termin a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								 "                        inner join sju_polis_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
								 "where a.no_polis = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.sg2.appendData([line.ke,line.kode_vendor,line.nama,line.tgl_bill,line.due_date,line.keterangan,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.diskon),floatToNilai(line.p_cost),
												floatToNilai(line.materai),floatToNilai(line.total)]);
						}
						this.dp_d1.setText(line.tgl_polis);
						this.e_dok.setText(line.no_dok);
						this.e_dok2.setText(line.no_dok2);
						this.e_cover.setText(line.cover);
						this.e_total.setText(floatToNilai(line.suminsured));
						this.e_ppremi.setText(floatToNilai(line.p_premi));
						this.e_npremi.setText(floatToNilai(line.n_premi));
						this.e_pfee.setText(floatToNilai(line.p_fee));
						this.e_nfee.setText(floatToNilai(line.n_fee));
						
						this.e_npcost.setText(floatToNilai(line.rekap_cost));
						this.e_nmat.setText(floatToNilai(line.rekap_mat));						
						this.e_ndiskon.setText(floatToNilai(line.rekap_diskon));
						this.e_npcost.setText(floatToNilai(line.rekap_cost));
						this.e_nmat.setText(floatToNilai(line.rekap_mat));
						
						var strSQL = "select max(ke) as jml from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){																			
								this.e_jml.setText(floatToNilai(line.jml));
							}
						}						
					} else this.sg2.clear(1);					
					this.doNilaiChange2();
					
					this.sgUpld.clear();
					this.deleteFiles = [];
					this.listFiles = new arrayMap();			
					var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from sju_polis_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							   "where a.no_polis = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgUpld.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.listFiles.set(line.no_gambar,line.no_gambar); 
							this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
						}
					} else this.sgUpld.clear(1);																		
				}				
			}
		} catch(e) {alert(e);}
	},	
	doHitung:function(sender) {				
		if (this.e_npremi.getText()!="" && this.e_total.getText()!="") {
			var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_total.getText()) * 100;
			this.e_ppremi.setText(floatToNilai(ppremi));
		}
		if (this.e_nfee.getText()!="" && this.e_npremi.getText()!="") {
			var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;			
			this.e_pfee.setText(floatToNilai(pfee));
		}		
		for (var i=0;i < this.sg31.getRowCount();i++){
			this.doChangeCell31(this.sg31, 3, i);
		}
	},
	doHitung2:function(sender){				
		if (this.e_ppremi.getText()!="" && this.e_total.getText()!="") {
			var npremi = Math.round(nilaiToFloat(this.e_ppremi.getText())/100 * nilaiToFloat(this.e_total.getText()) * 100)/100;
			this.e_npremi.setText(floatToNilai(npremi));
		}
		if (this.e_pfee.getText()!="" && this.e_npremi.getText()!="") {
			var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
			this.e_nfee.setText(floatToNilai(nfee));
		}
		for (var i=0;i < this.sg31.getRowCount();i++){
			this.doChangeCell31(this.sg31, 3, i);
		}
	},			
	doChangeCell31: function(sender, col, row){						
		if (col == 3 && sender.cells(3,row) !="") {
			var sumInsured = Math.round(nilaiToFloat(sender.cells(3,row))/100 * nilaiToFloat(this.e_total.getText()) * 100)/100;
			var premi = Math.round(nilaiToFloat(sender.cells(3,row))/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
			var fee = Math.round(nilaiToFloat(sender.cells(3,row))/100 * nilaiToFloat(this.e_nfee.getText()) * 100)/100;
						
			sender.cells(4,row,parseFloat(sumInsured));
			sender.cells(5,row,parseFloat(premi));
			sender.cells(6,row,parseFloat(fee));
			
			var ppn = Math.round((this.persenPPN *  parseFloat(fee) / 100) * 100)/100;
			var pph = Math.round((this.persenPPh *  parseFloat(fee) / 100) * 100)/100;
			
			sender.cells(7,row,parseFloat(ppn));
			sender.cells(8,row,parseFloat(pph));			
		}		
	},	
	doDoubleClick2: function(sender, col , row) {
		
	},
	doChangeCell2: function(sender, col, row){	
		try {		
			if (col == 3) {
				var strSQL = "select convert(varchar, dateadd(day,7,'"+this.sg2.getCellDateValue(3,row)+"'), 103) as jth_tempo";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.sg2.cells(4,row,line.jth_tempo);
					}
				}
			}			    			
			if (col == 6) {							
				if (this.sg2.cells(6,row) != "") {
					if (this.e_pfee.getText()!= "") {				
						var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.sg2.cells(6,row)) * 100)/100;											
						var nppn = Math.round((this.persenPPN * nfee /100) * 100)/100;									
						var npph = Math.round((this.persenPPh * nfee /100) * 100)/100;						
						this.sg2.cells(7,row,nfee); 
						this.sg2.cells(8,row,nppn); 
						this.sg2.cells(9,row,npph); 

						if (this.sg2.cells(7,row)!="" && this.sg2.cells(10,row)!="" && this.sg2.cells(11,row)!="" && this.sg2.cells(12,row)!="") {
							var tot = Math.round((nilaiToFloat(this.sg2.cells(6,row)) - nilaiToFloat(this.sg2.cells(10,row)) + nilaiToFloat(this.sg2.cells(11,row)) + nilaiToFloat(this.sg2.cells(12,row))) * 100)/100;		
							this.sg2.cells(13,row,tot);
						}
					}			
				}
			}
			if (col == 7) {							
				if (this.sg2.cells(7,row) != "") {											
					var nppn = Math.round((this.persenPPN * nilaiToFloat(this.sg2.cells(7,row)) /100) * 100)/100;									
					var npph = Math.round((this.persenPPh * nilaiToFloat(this.sg2.cells(7,row)) /100) * 100)/100;						
					this.sg2.cells(8,row,nppn); 
					this.sg2.cells(9,row,npph); 																		
				}
			}
			if (col == 10 || col == 11 || col == 12) {			
				if (this.sg2.cells(6,row)!="" && this.sg2.cells(7,row)!="" && this.sg2.cells(10,row)!="" && this.sg2.cells(11,row)!="" && this.sg2.cells(12,row)!="") {
					var tot = Math.round((nilaiToFloat(this.sg2.cells(6,row)) - nilaiToFloat(this.sg2.cells(10,row)) + nilaiToFloat(this.sg2.cells(11,row)) + nilaiToFloat(this.sg2.cells(12,row))) * 100) /100;		
					this.sg2.cells(13,row,tot);
				}
			}
			this.sg2.validasi();
		}
		catch(e) {
			alert(e);
		}
	},
	doNilaiChange2: function(){
		try{								
			for (var i = 0; i < this.sg31.getRowCount();i++){
				this.sg31.cells(9,i,"0");
				this.sg31.cells(10,i,"0");
				this.sg31.cells(11,i,"0");
				this.sg31.cells(12,i,"0");
			}					
			this.mat = this.pcost = this.diskon = 0;
			if (this.sg2.getRowValidCount() > 0){
				for (var i = 0; i < this.sg2.getRowCount();i++){																
					if (this.sg2.cells(10,i)!="") this.diskon += nilaiToFloat(this.sg2.cells(10,i));				
					if (this.sg2.cells(11,i)!="") this.pcost += nilaiToFloat(this.sg2.cells(11,i));				
					if (this.sg2.cells(12,i)!="") this.mat += nilaiToFloat(this.sg2.cells(12,i));									
					
					var vpremi=vfee=vppn=vpph = 0;
					for (var k = 0; k < this.sg31.getRowCount();k++){
						if (this.sg31.cells(0,k) == this.sg2.cells(1,i)) {
							vpremi = nilaiToFloat(this.sg31.cells(9,k)) + nilaiToFloat(this.sg2.cells(6,i));
							vfee = nilaiToFloat(this.sg31.cells(10,k)) + nilaiToFloat(this.sg2.cells(7,i));
							vppn = nilaiToFloat(this.sg31.cells(11,k)) + nilaiToFloat(this.sg2.cells(8,i));
							vpph = nilaiToFloat(this.sg31.cells(12,k)) + nilaiToFloat(this.sg2.cells(9,i));
							
							this.sg31.cells(9,k,Math.round(vpremi * 100)/100);
							this.sg31.cells(10,k,Math.round(vfee * 100)/100);
							this.sg31.cells(11,k,Math.round(vppn * 100)/100);
							this.sg31.cells(12,k,Math.round(vpph * 100)/100);
						}
					}
				}
				this.diskon = Math.round(this.diskon * 100)/100;
				this.pcost = Math.round(this.pcost * 100)/100;
				this.mat = Math.round(this.mat * 100)/100;
			}
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doGrid:function(sender){
		try {
			if (this.e_dok.getText() != "" && parseFloat(this.e_jml.getText())>0) {
				this.sg2.onChange.set(undefined,undefined);
				this.sg2.clear();										
				if (this.sg31.getRowValidCount() > 0){					
					var c = 0;
					for (var a=0;a < this.sg31.getRowCount();a++){
						if (this.sg31.rowValid(a)){																
							var premi = Math.round(nilaiToFloat(this.sg31.cells(5,a)) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
							var totpremi = nilaiToFloat(this.sg31.cells(5,a));	
							var fee = Math.round(nilaiToFloat(this.sg31.cells(6,a)) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
							var totfee = nilaiToFloat(this.sg31.cells(6,a));												
							
							var nppn = Math.round(nilaiToFloat(this.sg31.cells(7,a)) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
							var totppn = nilaiToFloat(this.sg31.cells(7,a));	
							var npph = Math.round(nilaiToFloat(this.sg31.cells(8,a)) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
							var totpph = nilaiToFloat(this.sg31.cells(8,a));	
							
							for (var i=0;i < parseFloat(this.e_jml.getText());i++){
								this.sg2.appendRow();
								var j = i+c;		
								var b = i+1;
								this.sg2.cells(0,j,b);
								this.sg2.cells(1,j,this.sg31.cells(0,a));
								this.sg2.cells(2,j,this.sg31.cells(1,a));
								this.sg2.cells(3,j,this.dp_d1.getText());
								this.sg2.cells(4,j,this.dp_d1.getText());
								this.sg2.cells(5,j,this.e_dok.getText());			
								if (i==0 && j==0) {
									this.sg2.cells(10,j,nilaiToFloat(this.e_ndiskon.getText()));			
									this.sg2.cells(11,j,nilaiToFloat(this.e_npcost.getText()));									
									this.sg2.cells(12,j,nilaiToFloat(this.e_nmat.getText()));													
								}
								else {
									this.sg2.cells(10,j,"0");			
									this.sg2.cells(11,j,"0");									
									this.sg2.cells(12,j,"0");													
								}
								//jgn pake floattonilai--> koma jadi ilang
								
								if ((totpremi - premi)>1 ) this.sg2.cells(6,j,premi);			
								else this.sg2.cells(6,j,totpremi);																			
								
								if ((totfee - fee)>1) this.sg2.cells(7,j,fee);			
								else this.sg2.cells(7,j,totfee);											
								
								if ((totppn - nppn)>1 ) this.sg2.cells(8,j,nppn); 
								else this.sg2.cells(8,j,totppn);									
								
								if ((totpph - npph)>1 ) this.sg2.cells(9,j,npph); 
								else this.sg2.cells(9,j,totpph);	
								
								if (this.sg2.cells(7,j)!="" && this.sg2.cells(10,j)!="" && this.sg2.cells(11,j)!="" && this.sg2.cells(12,j)!="") {
									var subtot = Math.round((nilaiToFloat(this.sg2.cells(6,j)) - nilaiToFloat(this.sg2.cells(10,j)) + nilaiToFloat(this.sg2.cells(11,j)) + nilaiToFloat(this.sg2.cells(12,j))) * 100)/100;		
									this.sg2.cells(13,j,subtot);
								}								
								totpremi = Math.round( (totpremi - premi) * 100) / 100;
								totfee = Math.round((totfee - fee) * 100) / 100;
								totppn = Math.round( (totppn - nppn) * 100) / 100;
								totpph = Math.round( (totpph - npph) * 100) / 100;
							}							
							c = this.sg2.getRowCount();							
						}						
					}
					this.doNilaiChange2();
				}									
				this.pc1.setActivePage(this.pc1.childPage[3]);				
				this.sg2.onChange.set(this,"doChangeCell2");
			}
			else {
				system.alert(this,"Data tidak valid.","No Polis dan Jumlah Termin harus diisi.");
				return false;						
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and jenis='POLIS'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and jenis='POLIS'",
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_sju16_rptPrPolis";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_polis='"+this.e_nb.getText()+"' ";
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
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.sg.clear(1); this.sg2.clear(1); this.sg31.clear(1); this.sgUpld.clear(1); 			
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("POLIS");
			this.e_jml.setText("1");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){		
		try {			
			if ((sender == this.cb_cust2 || sender == this.c_status2) && this.c_status2.getText() == "POLIS") {				
				if (this.cb_cust2.getText() == "")
				  this.cb_reg.setSQL("select a.no_polis, a.no_dok+' | '+no_dok2 as no_dok "+
									 "from sju_polis_m a left join ("+
									 "  select distinct kode_lokasi,no_polis "+
									 "  from sju_polis_termin "+
									 "  where no_bill<>'-' and kode_lokasi='"+this.app._lokasi+"') b on a.kode_lokasi=b.kode_lokasi and a.no_polis=b.no_polis "+
									 "where b.no_polis is null and a.kode_lokasi='"+this.app._lokasi+"'",["no_polis","no_dok"],false,["No Register","No Polis"],"and","Data Polis",true);
				else 
				  this.cb_reg.setSQL("select a.no_polis, a.no_dok+' | '+no_dok2 as no_dok "+
				                     "from sju_polis_m a left join ("+
									 "  select distinct kode_lokasi,no_polis "+
									 "  from sju_polis_termin "+
									 "  where no_bill<>'-' and kode_lokasi='"+this.app._lokasi+"') b on a.kode_lokasi=b.kode_lokasi and a.no_polis=b.no_polis "+
									 "where kode_cust='"+this.cb_cust2.getText()+"' and b.no_polis is null and a.kode_lokasi='"+this.app._lokasi+"'",["no_polis","no_dok"],false,["No Register","No Polis"],"and","Data Polis",true);
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doCari:function(sender){						
		var filter = "";		
		if (this.cb_cust2.getText()!="") filter = " and a.kode_cust='"+this.cb_cust2.getText()+"' ";
		
		if (this.c_status2.getText() == "PLACING") {
			var strSQL = "select z.no_placing,a.no_quo,"+
						 "case z.progress when '1' then 'PLACING' "+
						 "end as status,"+
						 "convert(varchar,z.tanggal,103) as tanggal,e.kode_vendor+' | '+e.nama as vendor,d.kode_cust+' | '+d.nama as cust,b.kode_pp+' | '+b.nama as pp,c.kode_pic+' | '+c.nama as pic,a.kode_curr,"+
						 "z.total,z.n_premi,z.n_fee,convert(varchar,z.tgl_mulai,103) as tgl_mulai,convert(varchar,z.tgl_selesai,103) as tgl_selesai,z.occup,z.lokasi,z.objek,z.p_premi,z.p_fee,'-' as no_polis,'-' as no_dok, z.tgl_input,z.nik_user  "+
						 "from sju_placing_m z "+
						 "inner join sju_placing_vendor ee on z.no_placing=ee.no_placing and z.kode_lokasi=ee.kode_lokasi and ee.status='LEADER' "+					 
						 "inner join sju_quo_m a on z.no_placing=a.no_placing and z.kode_lokasi=a.kode_lokasi "+					 
						 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
						 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
						 "inner join sju_vendor e on ee.kode_vendor=e.kode_vendor and ee.kode_lokasi=e.kode_lokasi "+
						 "where a.periode<='"+this.e_periode.getText()+"' and z.progress = '1' and z.kode_lokasi='"+this.app._lokasi+"' "+filter;
		}
		if (this.c_status2.getText() == "POLIS") {
			if (this.cb_reg.getText() != "") filter = filter + " and zz.no_polis = '"+this.cb_reg.getText()+"' ";
			var strSQL = "select z.no_placing,a.no_quo,"+
		             "'POLIS' as status,convert(varchar,z.tanggal,103) as tanggal,e.kode_vendor+' | '+e.nama as vendor,d.kode_cust+' | '+d.nama as cust,b.kode_pp+' | '+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,"+
		             "z.total,z.n_premi,z.n_fee,convert(varchar,z.tgl_mulai,103) as tgl_mulai,convert(varchar,z.tgl_selesai,103) as tgl_selesai,z.occup,z.lokasi,z.objek,z.p_premi,z.p_fee,zz.no_polis,zz.no_dok,zz.tgl_input,zz.nik_user  "+
		             "from sju_placing_m z "+					 
					 "inner join sju_quo_m a on z.no_placing=a.no_placing and z.kode_lokasi=a.kode_lokasi "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+					 
					 "inner join sju_polis_m zz on z.no_placing=zz.no_placing and zz.kode_lokasi=z.kode_lokasi "+
					 "inner join sju_polis_vendor ee on zz.no_polis=ee.no_polis and zz.kode_lokasi=ee.kode_lokasi and ee.status='LEADER' "+					 
					 "inner join sju_vendor e on ee.kode_vendor=e.kode_vendor and ee.kode_lokasi=e.kode_lokasi "+					 					 
					 "left join ("+
					 "  select distinct kode_lokasi,no_polis "+
					 "  from sju_polis_termin "+
					 "  where no_bill<>'-' and kode_lokasi='"+this.app._lokasi+"') y on zz.kode_lokasi=y.kode_lokasi and zz.no_polis=y.no_polis "+		
					 "where y.no_polis is null and a.periode<='"+this.e_periode.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+filter;
		}		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	}	
});