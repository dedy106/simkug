window.app_saku2_transaksi_kopeg_sju_fPolisUbah = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fPolisUbah.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fPolisUbah";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Polis dan Termin Invoice Endorsment: Input/Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Daftar Polis","Data Polis","Termin Tagihan","Dokumen","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
		            colTitle:["No Register","No Polis","Tgl Polis","Unit","Penanggung","Tertanggung","Curr","Nilai","Premi","COB"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[200,100,100,70,200,200,150,80,220,80]],
					readOnly:true,colFormat:[[7,8],[cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});						
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18],visible:false});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"Status",items:["POLIS"], readOnly:true,tag:2,visible:false});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"No Register", readOnly:true});								
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Jenis Polis", readOnly:true});		
   	    this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"No Polis", maxLength:50, readOnly:true});						
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Sertifikat", maxLength:50, readOnly:true});						
		this.e_noplacing = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Placing", readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Tgl Placing", readOnly:true});				
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Quotation", readOnly:true});
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Png (Leader)", readOnly:true});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Unit", readOnly:true});
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Occup. of Risk", maxLength:200});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Loc. of Risk",  maxLength:200});		
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Acc Exec", readOnly:true});		
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Object of Risk",  maxLength:200});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_mulai = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 		
		this.dp_selesai = new portalui_datePicker(this.pc1.childPage[1],{bound:[370,11,100,18]}); 				
		this.c_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency", tag:2, readOnly:true});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_ndiskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,200,20],caption:"Nilai Diskon", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_npcost = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,16,200,20],caption:"Polis Cost", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"% Brokerage", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Brokerage", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_nmat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,200,20],caption:"Bea Materai", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_jml = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,17,170,20],caption:"Jml Termin", tag:1, tipeText:ttNilai, text:"1"});								
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[950,17,20,20],hint:"Termin Tagihan",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGrid"]});
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,995,210],colCount:13,tag:0,visible:true, 
		            colTitle:["Kode","Nama Penanggung","Status"," % ","SumInsured","Premi","Brokerage","PPN","PPh","Termin Premi","Termin Brokrg","Termin PPN","Termin PPh"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,100,100,100,60,80,250,80]],					
					colHide:[[12,11,10,9],[true]],
					colFormat:[[3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					columnReadOnly:[true,[0,1,2,9,10,11,12],[3,4,5,6,7,8]],
					change:[this,"doChangeCell3"],					
					autoAppend:false,defaultRow:1}); 
				
		this.sg21 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,200],colCount:16,tag:9,
		            colTitle:["Ke-","Kode Png","Nama Penanggung","JthTempo","No Polis / Keterangan","Premi","Brokerage","PPN","PPh","Discount","P. Cost","Materai","Total Premi","No Inv","No Akru","N Bayar"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,80,80,80,80,80,80,80,190,80,150,70,50]],																		
					readOnly:true,					
					colFormat:[[5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn21 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg21});		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,20,this.pc1.width-5,220],colCount:13,tag:9,
		            colTitle:["Ke-","Kode Png","Nama Penanggung","JthTempo","No Polis / Keterangan","Premi","Brokerage","PPN","PPh","Discount","P. Cost","Materai","Total Premi"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,80,80,80,80,80,190,80,150,70,50]],																		
					columnReadOnly:[true,[12],[0,1,2,3,4,5,6,7,8,9,10,11]],
					buttonStyle:[[3],[bsDate]], 
					colFormat:[[5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.c_status2 = new saiCB(this.pc1.childPage[4],{bound:[20,10,202,20],caption:"Status",items:["POLIS"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,12,202,20],caption:"Tertanggung",tag:9,multiSelection:false}); 		
		this.bCari = new button(this.pc1.childPage[4],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
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
			this.cb_cust2.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fPolisUbah.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fPolisUbah.implement({
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
					var idxEndors = 0;
					var data = this.dbLib.getDataProvider("select isnull(max(id_endors),0) as id_endors from sju_polis_termin_h where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							idxEndors = parseInt(line.id_endors) +1;
						}
					}							
					sql.add("insert into sju_polis_termin_h(id_endors,tgl_input,nik_user,no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih) "+
							"select "+idxEndors+",getdate(),'"+this.app._userLog+"',no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih "+
							"from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					}
					sql.add("delete from sju_polis_m where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_polis_d where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sju_polis_vendor where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sju_polis_dok where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("insert into sju_polis_m (no_polis,no_dok,no_dok2,no_placing,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_polisseb,ppn,pph,p_cost,diskon,occup,objek,lokasi,tgl_mulai,tgl_selesai,kode_curr,total,p_premi,n_premi,p_fee,n_fee,materai,kode_cust,kode_vendor,cover,flag_aktif,nilai_deduc,kode_tipe,kode_pp,kode_pic) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_dok2.getText()+"','"+this.e_noplacing.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','POLIS','-',0,0,"+nilaiToFloat(this.e_npcost.getText())+","+nilaiToFloat(this.e_ndiskon.getText())+",'"+this.e_occup.getText()+"','"+this.e_objek.getText()+"','"+this.e_lokasi.getText()+"','"+this.dp_mulai.getDateString()+"','"+this.dp_selesai.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppremi.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_pfee.getText())+","+nilaiToFloat(this.e_nfee.getText())+","+nilaiToFloat(this.e_nmat.getText())+", '"+this.kodeCust+"','-','-','1',0,'"+this.kode_tipe+"','"+this.kode_pp+"','"+this.kode_pic+"')");
					sql.add("insert into sju_polis_d (no_polis,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','1','POLIS','"+this.e_noplacing.getText()+"','"+this.app._lokasi+"','-')");
														
					//data termin final (sudah tagih/sudah akru bill)
					sql.add("insert into sju_polis_termin(no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih) "+
							"select no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih "+
							"from sju_polis_termin_h where id_endors="+idxEndors+" and (no_tagih <> '-' or no_bill <> '-') and no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					
					//data termin baru
					var k = this.ke_akhir-1; //<--------- nu = mulai dari nol
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																
								k=k+1;
								sql.add("insert into sju_polis_termin(no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+k+","+this.sg2.cells(0,i)+",'"+this.sg2.cells(1,i)+"','"+this.sg2.cells(4,i)+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(9,i))+","+nilaiToFloat(this.sg2.cells(10,i))+",'-','"+this.sg2.getCellDateValue(3,i)+"','-',0,'-','-',"+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+",'"+this.sg2.getCellDateValue(3,i)+"',"+nilaiToFloat(this.sg2.cells(11,i))+",'-')");
							}
						}
					}										
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){															
								sql.add("insert into sju_polis_vendor(no_polis,kode_lokasi,kode_vendor,persen,total,n_premi,n_fee,status) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"',"+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+","+nilaiToFloat(this.sg3.cells(6,i))+",'"+this.sg3.cells(2,i)+"')");
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
					this.sg.clear(1); this.sg2.clear(1); this.sg21.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); 					
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("POLIS");
					this.e_jml.setText("1");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
				this.preView = "1";												
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){								
						var j=i+1;
						if (nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPN melebihi Brokerage. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(8,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPh melebihi Brokerage. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg2.cells(5,i)) < nilaiToFloat(this.sg2.cells(6,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai Brokerage melebihi Premi. (baris ke-"+j+")");
							return false;
						}												
					}
				}				
				for (var i=0;i < this.sg3.getRowCount();i++){
					if (this.sg3.rowValid(i)){				
						var j = i+1;
						if (nilaiToFloat(this.sg3.cells(5,i)) != nilaiToFloat(this.sg3.cells(9,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai premi tidak sama dengan total termin premi. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg3.cells(6,i)) != nilaiToFloat(this.sg3.cells(10,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai brokerage tidak sama dengan total termin brokerage. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg3.cells(7,i)) != nilaiToFloat(this.sg3.cells(11,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPN tidak sama dengan total termin ppn. (baris ke-"+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg3.cells(8,i)) != nilaiToFloat(this.sg3.cells(12,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai PPh tidak sama dengan total termin pph. (baris ke-"+j+")");
							return false;
						}
					}
				}				
				if ((nilaiToFloat(this.e_npremi.getText()) < this.premiFinal) || (nilaiToFloat(this.e_nfee.getText()) < this.feeFinal) || 
				    (nilaiToFloat(this.e_ndiskon.getText()) < this.diskFinal) || (nilaiToFloat(this.e_npcost.getText()) < this.pcostFinal) || (nilaiToFloat(this.e_nmat.getText()) < this.matFinal)) {					
					system.alert(this,"Transaksi tidak valid.","Total perubahan kurang dari termin yang sudah final (ditagihkan).");
					return false;										
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
	doChange:function(sender){				
		try {			
			if (sender == this.e_total || sender == this.e_npremi || sender == this.e_nfee) {
				if (this.e_npremi.getText()!="" && this.e_total.getText()!="") {
					var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_total.getText()) * 100;
					this.e_ppremi.setText(floatToNilai(ppremi));
				}
				if (this.e_nfee.getText()!="" && this.e_npremi.getText()!="") {
					var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;			
					this.e_pfee.setText(floatToNilai(pfee));
				}				
				if (this.e_total.getText()!="" && this.e_total.getText()!="0" && this.e_npremi.getText()!="" && this.e_npremi.getText()!="0" && this.e_nfee.getText()!="" && this.e_nfee.getText()!="0") {
					for (var a=0;a < this.sg3.getRowCount();a++) {
						this.doChangeCell3(this.sg3,3,a);			
					}						
				}
			}			
		}
		catch(e) {
			alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);			
				this.stsSimpan = "POLIS";				
				setTipeButton(tbSimpan);
				this.e_nb.setText(this.sg.cells(0,row));
				
				var strSQL = "select a.kode_cust,b.jenis,a.occup,a.lokasi,a.objek,a.kode_pp,a.kode_tipe,a.kode_pic, "+
							 "b.no_placing,h.no_quo,convert(varchar,b.tanggal,103) as tgl_plc,d.kode_vendor+' - '+d.nama as vendor,e.kode_cust+' - '+e.nama as cust,f.kode_pp+' - '+f.nama as pp,g.kode_pic+'-'+g.nama as pic,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.kode_curr "+
				             "from sju_polis_m a inner join sju_placing_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join sju_polis_vendor c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi and c.status='LEADER' "+
							 "                   inner join sju_vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi "+
							 "                   inner join sju_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							 "                   inner join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
							 "					 inner join sju_pic g on a.kode_pic=g.kode_pic and a.kode_lokasi=g.kode_lokasi "+
							 "					 inner join sju_quo_m h on b.no_placing=h.no_placing and b.kode_lokasi=h.kode_lokasi "+
				             "where a.no_polis='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";							
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
						
						this.e_noplacing.setText(line.no_placing);
						this.e_noquo.setText(line.no_quo);
						this.e_tgl.setText(line.tgl_plc);
						this.e_vendor.setText(line.vendor);
						this.e_cust.setText(line.cust);
						this.e_pp.setText(line.pp);				
						this.e_pic.setText(line.pic);
						this.dp_mulai.setText(line.tgl_mulai);
						this.dp_selesai.setText(line.tgl_selesai);
						this.c_curr.setText(line.kode_curr);						
					}
				}
				
				var strSQL = "select b.kode_vendor,b.nama,a.persen,a.total,a.n_premi,a.n_fee,a.status "+
							 "from sju_polis_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_polis = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						var ppn = Math.round((this.persenPPN *  parseFloat(line.n_fee) / 100) * 100)/100;
						var pph = Math.round((this.persenPPh *  parseFloat(line.n_fee) / 100) * 100)/100;
						this.sg3.appendData([line.kode_vendor,line.nama,line.status,floatToNilai(line.persen),floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),ppn,pph,"0","0","0","0"]);						
					}
				} 
				this.ke_akhir = 0;
				var data = this.dbLib.getDataProvider("select a.ke,a.kode_vendor,b.nama,a.no_polis,a.nu,a.keterangan,a.premi,a.fee,a.diskon,a.p_cost,convert(varchar,a.due_date,103) as due_date,a.ppn,a.pph,a.materai,a.premi-a.diskon+a.p_cost+a.materai as total,"+
							"c.no_dok,c.no_dok2,c.p_cost as rekap_cost,c.diskon as rekap_diskon,c.materai as rekap_mat,c.total as suminsured,c.p_premi,c.n_premi,c.p_fee,c.n_fee,a.no_tagih,a.no_bill,isnull(d.bayar,0) as bayar "+
							"from sju_polis_termin a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							"                        inner join sju_polis_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
							
							"left join ( "+
							"    select ke,no_bill,no_polis,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
							"    from sju_polisbayar_d where kode_lokasi='"+this.app._lokasi+"' group by ke,no_bill,no_polis,kode_lokasi) d "+
							"on a.ke=d.ke and a.no_bill=d.no_bill and a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi "+
							
							"where a.no_polis = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.ke",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					this.sg21.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						if (line.no_tagih != "-") {
							this.sg21.appendData([line.ke,line.kode_vendor,line.nama,line.due_date,line.keterangan,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.materai),floatToNilai(line.total),line.no_tagih,line.no_bill,floatToNilai(line.bayar)]);
							this.ke_akhir = parseInt(line.ke);
						}
						else
							this.sg2.appendData([line.ke,line.kode_vendor,line.nama,line.due_date,line.keterangan,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.materai),floatToNilai(line.total)]);
					}
					this.e_dok.setText(line.no_dok);
					this.e_dok2.setText(line.no_dok2);
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
					
					var strSQL = "select max(ke) as jml from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			//a.nilai_deduc,a.cover,
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
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_polis,a.no_dok,convert(varchar,a.tanggal,103) as tgl, a.kode_pp+' - '+f.nama as pp, c.kode_cust +'-'+c.nama as cust, d.kode_vendor +'-'+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,a.kode_curr,a.total,a.n_premi "+ 
		             "from sju_polis_m a "+
					 "                   inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.status='LEADER' "+
					 "                   inner join sju_vendor d on b.kode_vendor = d.kode_vendor and b.kode_lokasi=d.kode_lokasi "+					 					 
					 "                   inner join sju_tipe e on a.kode_tipe = e.kode_tipe and a.kode_lokasi=e.kode_lokasi "+
					 "                   inner join pp f on a.kode_pp = f.kode_pp and a.kode_lokasi=f.kode_lokasi "+					 
		             "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and getdate() between a.tgl_mulai and a.tgl_selesai ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);					
	},
	doCari:function(sender){						
		
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_polis,line.no_dok,line.tgl,line.pp,line.vendor,line.cust,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),line.tipe]);  
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptPrPolis";
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
			this.sg.clear(1); this.sg2.clear(1); this.sg21.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); 			
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("POLIS");
			this.e_jml.setText("1");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},	
	doNilaiChange2: function(){
		try{									
			for (var i = 0; i < this.sg3.getRowCount();i++){
				this.sg3.cells(9,i,"0");
				this.sg3.cells(10,i,"0");
				this.sg3.cells(11,i,"0");
				this.sg3.cells(12,i,"0");
			}					
			this.mat = this.pcost = this.diskon = 0;
			
			if (this.sg2.getRowValidCount() > 0){
				for (var i = 0; i < this.sg2.getRowCount();i++){																
					if (this.sg2.cells(9,i)!="") this.diskon += nilaiToFloat(this.sg2.cells(9,i));				
					if (this.sg2.cells(10,i)!="") this.pcost += nilaiToFloat(this.sg2.cells(10,i));				
					if (this.sg2.cells(11,i)!="") this.mat += nilaiToFloat(this.sg2.cells(11,i));									
					
					var vpremi=vfee=vppn=vpph = 0;
					for (var k = 0; k < this.sg3.getRowCount();k++){
						if (this.sg3.cells(0,k) == this.sg2.cells(1,i)) {
							vpremi = nilaiToFloat(this.sg3.cells(9,k)) + nilaiToFloat(this.sg2.cells(5,i));
							vfee = nilaiToFloat(this.sg3.cells(10,k)) + nilaiToFloat(this.sg2.cells(6,i));
							vppn = nilaiToFloat(this.sg3.cells(11,k)) + nilaiToFloat(this.sg2.cells(7,i));
							vpph = nilaiToFloat(this.sg3.cells(12,k)) + nilaiToFloat(this.sg2.cells(8,i));
							
							this.sg3.cells(9,k,parseFloat(vpremi));
							this.sg3.cells(10,k,parseFloat(vfee));
							this.sg3.cells(11,k,parseFloat(vppn));
							this.sg3.cells(12,k,parseFloat(vpph));
						}
					}					
				}
			}
			
			if (this.sg21.getRowValidCount() > 0){
				for (var i = 0; i < this.sg21.getRowCount();i++){																
					if (this.sg21.cells(9,i)!="") this.diskon += nilaiToFloat(this.sg21.cells(9,i));				
					if (this.sg21.cells(10,i)!="") this.pcost += nilaiToFloat(this.sg21.cells(10,i));				
					if (this.sg21.cells(11,i)!="") this.mat += nilaiToFloat(this.sg21.cells(11,i));									
					
					var vpremi=vfee=vppn=vpph = 0;
					for (var k = 0; k < this.sg3.getRowCount();k++){
						if (this.sg3.cells(0,k) == this.sg21.cells(1,i)) {
							vpremi = nilaiToFloat(this.sg3.cells(9,k)) + nilaiToFloat(this.sg21.cells(5,i));
							vfee = nilaiToFloat(this.sg3.cells(10,k)) + nilaiToFloat(this.sg21.cells(6,i));
							vppn = nilaiToFloat(this.sg3.cells(11,k)) + nilaiToFloat(this.sg21.cells(7,i));
							vpph = nilaiToFloat(this.sg3.cells(12,k)) + nilaiToFloat(this.sg21.cells(8,i));
							
							this.sg3.cells(9,k,parseFloat(vpremi));
							this.sg3.cells(10,k,parseFloat(vfee));
							this.sg3.cells(11,k,parseFloat(vppn));
							this.sg3.cells(12,k,parseFloat(vpph));
						}
					}					
				}
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
				
				if (this.sg3.getRowValidCount() > 0){					
					var c = 0;
					for (var a=0;a < this.sg3.getRowCount();a++){
						if (this.sg3.rowValid(a)){
							this.premiFinal = this.totpremiFinal = this.feeFinal = this.totfeeFinal = 0;
							this.diskFinal = this.pcostFinal = this.matFinal = 0;
							if (this.sg21.getRowValidCount() > 0){
								for (var x=0;x < this.sg21.getRowCount();x++){
									if (this.sg21.rowValid(x)){																
										if (this.sg21.cells(1,x) == this.sg3.cells(0,a)) {
											this.premiFinal += nilaiToFloat(this.sg21.cells(5,x));
											this.totpremiFinal += nilaiToFloat(this.sg21.cells(5,x));
											this.feeFinal +=  nilaiToFloat(this.sg21.cells(6,x));
											this.totfeeFinal += nilaiToFloat(this.sg21.cells(6,x));
											
											this.diskFinal += nilaiToFloat(this.sg21.cells(9,x));
											this.pcostFinal += nilaiToFloat(this.sg21.cells(10,x));
											this.matFinal += nilaiToFloat(this.sg21.cells(11,x));
										}
									}
								}
							}						    
							// kurangi dulu nilai yg sudah fixed (tagih or bill or bayar)							
							var premi = Math.round((nilaiToFloat(this.sg3.cells(5,a)) - this.premiFinal) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
							var totpremi = nilaiToFloat(this.sg3.cells(5,a)) - this.totpremiFinal;	
							var fee = Math.round((nilaiToFloat(this.sg3.cells(6,a)) - this.feeFinal)/ nilaiToFloat(this.e_jml.getText()) * 100)/100;
							var totfee = nilaiToFloat(this.sg3.cells(6,a)) - this.totfeeFinal;												
							
							var ndisk = nilaiToFloat(this.e_ndiskon.getText()) - this.diskFinal;
							var npcost = nilaiToFloat(this.e_npcost.getText()) - this.pcostFinal;
							var nmat = nilaiToFloat(this.e_nmat.getText()) - this.matFinal;
							
							for (var i=0;i < parseFloat(this.e_jml.getText());i++){
								this.sg2.appendRow();
								var j = i+c;		
								var b = i+1+this.ke_akhir;
								this.sg2.cells(0,j,b);
								this.sg2.cells(1,j,this.sg3.cells(0,a));
								this.sg2.cells(2,j,this.sg3.cells(1,a));
								this.sg2.cells(3,j,this.dp_d1.getText());
								this.sg2.cells(4,j,this.e_dok.getText());			
								if (i==0 && j==0) {
									this.sg2.cells(9,j,floatToNilai(ndisk));			
									this.sg2.cells(10,j,floatToNilai(npcost));									
									this.sg2.cells(11,j,floatToNilai(nmat));													
								}
								else {
									this.sg2.cells(9,j,"0");			
									this.sg2.cells(10,j,"0");									
									this.sg2.cells(11,j,"0");													
								}
								//jgn pake floattonilai--> koma jadi ilang
								if (totpremi > premi ) this.sg2.cells(5,j,premi);			
								else this.sg2.cells(5,j,totpremi);			
								
								if (totfee > fee ) this.sg2.cells(6,j,fee);			
								else this.sg2.cells(6,j,totfee);			
								
								var nppn = Math.round((this.persenPPN * nilaiToFloat(this.sg2.cells(6,j)) /100) * 100)/100;									
								var npph = Math.round((this.persenPPh * nilaiToFloat(this.sg2.cells(6,j)) /100) * 100)/100;																
								this.sg2.cells(7,j,nppn); 
								this.sg2.cells(8,j,npph); 
								
								if (this.sg2.cells(6,j)!="" && this.sg2.cells(9,j)!="" && this.sg2.cells(10,j)!="" && this.sg2.cells(11,j)!="") {
									var subtot = Math.round((nilaiToFloat(this.sg2.cells(5,j)) - nilaiToFloat(this.sg2.cells(9,j)) + nilaiToFloat(this.sg2.cells(10,j)) + nilaiToFloat(this.sg2.cells(11,j))) * 100)/100;		
									this.sg2.cells(12,j,subtot);
								}								
								totpremi = totpremi - premi;
								totfee = totfee - fee;											
							}							
							c = this.sg2.getRowCount();							
						}						
					}
					this.doNilaiChange2();
				}											
				this.pc1.setActivePage(this.pc1.childPage[2]);				
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
	doChangeCell2: function(sender, col, row){						
		try {		    			
			if (col == 5) {							
				if (this.sg2.cells(5,row) != "") {
					if (this.e_pfee.getText()!= "") {				
						var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.sg2.cells(5,row)) * 100)/100;											
						var nppn = Math.round((this.persenPPN * nfee /100) * 100)/100;									
						var npph = Math.round((this.persenPPh * nfee /100) * 100)/100;						
						this.sg2.cells(6,row,nfee); 
						this.sg2.cells(7,row,nppn); 
						this.sg2.cells(8,row,npph); 						
						if (this.sg2.cells(6,row)!="" && this.sg2.cells(9,row)!="" && this.sg2.cells(10,row)!="" && this.sg2.cells(11,row)!="") {
							var tot = Math.round((nilaiToFloat(this.sg2.cells(5,row)) - nilaiToFloat(this.sg2.cells(9,row)) + nilaiToFloat(this.sg2.cells(10,row)) + nilaiToFloat(this.sg2.cells(11,row))) * 100)/100;		
							this.sg2.cells(12,row,floatToNilai(tot));
						}
					}			
				}
			}
			if (col == 6) {							
				if (this.sg2.cells(6,row) != "") {											
					var nppn = Math.round((this.persenPPN * nilaiToFloat(this.sg2.cells(6,row)) /100) * 100)/100;									
					var npph = Math.round((this.persenPPh * nilaiToFloat(this.sg2.cells(6,row)) /100) * 100)/100;						
					this.sg2.cells(7,row,nppn); 
					this.sg2.cells(8,row,npph); 																		
				}
			}
			if (col == 9 || col == 10 || col == 11) {			
				if (this.sg2.cells(5,row)!="" && this.sg2.cells(6,row)!="" && this.sg2.cells(9,row)!="" && this.sg2.cells(10,row)!="" && this.sg2.cells(11,row)!="") {
					var tot = Math.round((nilaiToFloat(this.sg2.cells(5,row)) - nilaiToFloat(this.sg2.cells(9,row)) + nilaiToFloat(this.sg2.cells(10,row)) + nilaiToFloat(this.sg2.cells(11,row))) * 100) /100;		
					this.sg2.cells(12,row,tot);
				}
			}
			this.sg2.validasi();
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
	doChangeCell3: function(sender, col, row){						
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
	}	
});
