window.app_saku2_transaksi_kopeg_sju_fPolisEdit = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fPolisEdit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fPolisEdit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Polis Saldo Awal: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,70,20],labelWidth:0,caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,98,18],selectDate:[this,"doSelectDate"]}); 						
		this.pc2 = new pageControl(this,{bound:[10,11,1000,450], childPage:["Data Polis","Termin","Daftar Polis","Cari Data"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:11,tag:9,		            
					colTitle:["No Polis","Status","Tanggal","Penanggung","Tertanggung","Curr","Sum Insured","Premi","Tgl Mulai","Tgl Selesai","Remark"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[200,70,70,100,100,50,200,200,70,70,100]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Polis",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Register",maxLength:30,readOnly:true});				
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});						
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,400,20],caption:"No Polis",maxLength:50});		
		this.e_dok2 = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,400,20],caption:"No Sertifikat", maxLength:50});								
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Unit",tag:2,multiSelection:false}); 		
		this.cb_tipe = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"COB",tag:2,multiSelection:false}); 		
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Penanggung",tag:2,multiSelection:false}); 		
		this.cb_cust = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Tertanggung",tag:1,multiSelection:false}); 		
		this.cb_pic = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Acc Exec",tag:2,multiSelection:false}); 		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doChange"]}); 		
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[260,11,98,18]}); 		
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Sum Insured",readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[260,14,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_ppremi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Premi % - Nilai", tag:2, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_npremi = new saiLabelEdit(this.pc2.childPage[0],{bound:[260,18,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});										
		this.e_pfee = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Brokerage % - Nilai", tag:2, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_nfee = new saiLabelEdit(this.pc2.childPage[0],{bound:[260,19,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});												
		this.e_occup = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,470,20],caption:"Occupation of Risk", maxLength:200});						
		this.e_pcost = new saiLabelEdit(this.pc2.childPage[0],{bound:[520,14,200,20],caption:"Polis Cost", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_mat = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Biaya Materai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_lokasi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,470,20],caption:"Location of Risk", maxLength:200});								
		this.e_diskon = new saiLabelEdit(this.pc2.childPage[0],{bound:[520,18,200,20],caption:"Discount", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_objek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,470,20],caption:"Object of Loss", maxLength:200});								
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[520,19,200,20],caption:"Nilai PPN", tag:2, tipeText:ttNilai, text:"0"});		
		this.e_pph = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Nilai PPh", tag:2, tipeText:ttNilai, text:"0"});				
		//this.e_catat = new saiMemo(this.pc2.childPage[0],{bound:[20,20,470,80],caption:"Remarks",tag:1});
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Jml Termin", tag:1, tipeText:ttNilai, text:"1"});								
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,20,20,20],hint:"Termin Tagihan",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGrid"]});
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-40],colCount:11,tag:0,
		            colTitle:["Ke-","JthTempo","No Polis / Keterangan","Premi","Brokerage","PPN","PPh","Discount","P. Cost","Materai","Total Premi"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,80,80,80,80,80,80,80,190,80,50]],																		
					columnReadOnly:[true,[10],[0,1,2,3,4,5,6,7,8,9]],
					buttonStyle:[[1],[bsDate]], 
					colFormat:[[3,4,5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.cb_cust3 = new portalui_saiCBBL(this.pc2.childPage[3],{bound:[20,12,202,20],caption:"Tertanggung",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_quo3 = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,13,300,20],caption:"No Register", tag:9, maxLength:50});								
		this.bCari = new button(this.pc2.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		uses("server_report_report;portalui_reportViewer");
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[3].rearrangeChild(10, 23);
		
	
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.app._rootDir;
		this.separator = "/";							
		this.fileBfr = "";
					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_tipe.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);					
			this.cb_pic.setSQL("select kode_pic, nama from sju_pic where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pic","nama"],false,["Kode","Nama"],"and","Data Acc Exec",true);						
			this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);						
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
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPPROD') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "PPPROD") ppProduksi = line.flag;								
				}
			}
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+ppProduksi+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit",true);
			this.cb_pp.setText(ppProduksi);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fPolisEdit.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fPolisEdit.implement({		
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
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
					if (this.stsSimpan == 0) {
						sql.add("delete from sju_polis_m where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_polis_d where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sju_polis_vendor where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 					
					sql.add("insert into sju_polis_m (no_polis,no_dok,no_dok2,no_placing,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_polisseb,ppn,pph,p_cost,diskon,occup,objek,lokasi,tgl_mulai,tgl_selesai,kode_curr,total,p_premi,n_premi,p_fee,n_fee,materai,kode_cust,kode_vendor,cover,flag_aktif,nilai_deduc,kode_tipe,kode_pp,kode_pic) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_dok2.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'POLIS','POLIS','-',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph.getText())+","+nilaiToFloat(this.e_pcost.getText())+","+nilaiToFloat(this.e_diskon.getText())+",'"+this.e_occup.getText()+"','"+this.e_objek.getText()+"','"+this.e_lokasi.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppremi.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_pfee.getText())+","+nilaiToFloat(this.e_nfee.getText())+","+nilaiToFloat(this.e_mat.getText())+", '"+this.cb_cust.getText()+"','"+this.cb_vendor.getText()+"','-','1',0,'"+this.cb_tipe.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_pic.getText()+"')");										
					sql.add("insert into sju_polis_d (no_polis,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','1','POLIS','"+this.e_nb.getText()+"','"+this.app._lokasi+"','-')");
					sql.add("insert into sju_polis_vendor(no_polis,kode_lokasi,kode_vendor,persen,total,n_premi,n_fee,status) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_vendor.getText()+"',100,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_nfee.getText())+",'LEADER')");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into sju_polis_termin(no_polis,kode_lokasi,nu,ke,kode_vendor,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+","+this.sg2.cells(0,i)+",'"+this.cb_vendor.getText()+"','"+this.sg2.cells(2,i)+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+",'-','"+this.sg2.getCellDateValue(1,i)+"','-',0,'-','-',"+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.sg2.getCellDateValue(1,i)+"',"+nilaiToFloat(this.sg2.cells(9,i))+",'-')");
							}
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
					this.sg2.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					setTipeButton(tbAllFalse);			
				break;
			case "simpan" :						
			case "ubah" :		
				this.preView = "1";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_polis_m where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_polis_d where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sju_polis_vendor where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if (this.stsSimpan == 1) this.doClick();
	},	
	doChange:function(sender){
		try {									
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
			if (sender == this.e_npremi || sender == this.e_nilai) {							
				if (this.e_npremi.getText()!="" && this.e_nilai.getText()!="") {
					var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_nilai.getText()) * 100;
					this.e_ppremi.setText(floatToNilai(ppremi));
				}
			}
			if (sender == this.e_nfee || sender == this.e_npremi) {
				if (this.e_nfee.getText()!="" && this.e_npremi.getText()!="") {
					var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;			
					this.e_pfee.setText(floatToNilai(pfee));
				}
			}
			if (sender == this.e_nfee && this.e_nfee.getText()!="") {							
				var ppn = Math.round(nilaiToFloat(this.e_nfee.getText())/100 * 10);
				var pph = Math.round(nilaiToFloat(this.e_nfee.getText())/100 * 2);
				this.e_ppn.setText(floatToNilai(ppn));				
				this.e_pph.setText(floatToNilai(pph));				
			}
			if (sender == this.e_npremi || sender == this.e_pcost || sender == this.e_diskon || sender == this.e_mat) {						
				if (this.e_npremi.getText()!="" && this.e_pcost.getText()!="" && this.e_diskon.getText()!="" && this.e_mat.getText()!="") {
					var total = nilaiToFloat(this.e_npremi.getText()) + nilaiToFloat(this.e_pcost.getText()) + nilaiToFloat(this.e_mat.getText()) - nilaiToFloat(this.e_diskon.getText());					
					this.e_total.setText(floatToNilai(total));
				}
			}
		}
		catch (e) {
			alert(e);
		}
	},		
	doClick:function(sender){
		if (this.stsSimpan == 0) {									
			this.sg2.clear(1); 
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
		
		this.cb_tipe.setFocus();		
		this.stsSimpan = 1;		
		setTipeButton(tbSimpan);
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
						}
						else {
							if (result.toLowerCase().search("primary key") == -1) {
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
			this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
			this.sg2.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){												
		var strSQL = "select a.no_polis, "+
					 " 'POLIS' as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal,c.kode_vendor+'-'+c.nama as vendor,b.kode_cust+'-'+b.nama as cust,a.kode_curr,a.total,a.n_premi,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,'-' as catat "+		             
					 "from sju_polis_m a "+					 
		             "inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_polis_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi and c.status='LEADER' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData(1);
		} else this.sg3.clear(1);					
	},
	doTampilData: function(page) {
		try {
			this.sg3.clear();
			var line;
			this.page = page;
			var start = (page - 1) * 20;
			var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
			for (var i=start;i<finish;i++){
				line = this.dataJU.rs.rows[i];													
				this.sg3.appendData([line.no_polis,line.status.toUpperCase(),line.tanggal,line.vendor,line.cust,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),line.tgl_mulai,line.tgl_selesai,line.catat]); 
			}
			this.sg3.setNoUrut(start);		
		}
		catch(e) {
			alert(e);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doCari:function(sender){										
		var strSQL = "select a.no_polis, "+
					 " 'POLIS' as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal,c.kode_vendor+'-'+d.nama as vendor,b.kode_cust+'-'+b.nama as cust,a.kode_curr,a.total,a.n_premi,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,'-' as catat "+		             
					 "from sju_polis_m a "+					 
		             "inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_polis_vendor c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi and c.status='LEADER' "+
					 "inner join sju_vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_cust like '%"+this.cb_cust3.getText()+"%' and a.no_polis like '%"+this.e_quo3.getText()+"%' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";					 				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);
		this.pc2.setActivePage(this.pc2.childPage[2]);	
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg3.cells(0,row));				
				
				var strSQL = "select a.*,c.kode_vendor as vendor "+
				             "from sju_polis_m a "+
							 "inner join sju_polis_vendor c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi and c.status='LEADER' "+
							 "where a.no_polis='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_nb.setText(line.no_polis);
						this.e_dok.setText(line.no_dok);
						this.e_dok2.setText(line.no_dok2);
						this.dp_d1.setText(line.tanggal);																	
						this.cb_tipe.setText(line.kode_tipe);
						this.cb_pic.setText(line.kode_pic);
						this.cb_vendor.setText(line.vendor);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d2.setText(line.tgl_mulai);					
						this.dp_d3.setText(line.tgl_selesai);					
						this.c_curr.setText(line.kode_curr);
						this.e_nilai.setText(floatToNilai(line.total));
						this.e_ppremi.setText(floatToNilai(line.p_premi));
						this.e_npremi.setText(floatToNilai(line.n_premi));
						this.e_pcost.setText(floatToNilai(line.p_cost));
						this.e_diskon.setText(floatToNilai(line.diskon));
						this.e_mat.setText(floatToNilai(line.materai));
						this.e_pfee.setText(floatToNilai(line.p_fee));
						this.e_nfee.setText(floatToNilai(line.n_fee));
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph.setText(floatToNilai(line.pph));
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);
						//this.e_catat.setText("-");											
					}				
					var data = this.dbLib.getDataProvider("select a.ke,a.no_polis,a.nu,a.keterangan,a.premi,a.fee,a.diskon,a.p_cost,convert(varchar,a.due_date,103) as due_date,a.ppn,a.pph,a.materai,a.premi-a.diskon+a.p_cost+a.materai as total "+
								"from sju_polis_termin a "+								
								"where a.no_polis = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
					this.sg2.clear();					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.ke,line.due_date,line.keterangan,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.materai),floatToNilai(line.total)]);
					}
					var strSQL = "select max(ke) as jml from sju_polis_termin where no_polis='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			//a.nilai_deduc,a.cover,
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_jml.setText(floatToNilai(line.jml));
						}
					}
				}								
			}			
			this.pc2.setActivePage(this.pc2.childPage[0]);	
		} catch(e) {alert(e);}
	},
	doGrid:function(sender){
		try {
			if (this.e_dok.getText() != "" && parseFloat(this.e_jml.getText())>0) {				
				this.sg2.clear();
				var premi = Math.round(nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
				var totpremi = nilaiToFloat(this.e_npremi.getText());	
				var fee = Math.round(nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_jml.getText()) * 100)/100;
				var totfee = nilaiToFloat(this.e_nfee.getText());												
				for (var i=0;i < parseFloat(this.e_jml.getText());i++){
					this.sg2.appendRow();					
					var b = i+1;
					this.sg2.cells(0,i,b);
					this.sg2.cells(1,i,this.dp_d1.getText());
					this.sg2.cells(2,i,this.e_dok.getText());			
					if (i==0) {
						this.sg2.cells(7,i,this.e_diskon.getText());			
						this.sg2.cells(8,i,this.e_pcost.getText());									
						this.sg2.cells(9,i,this.e_mat.getText());													
					}
					else {
						this.sg2.cells(7,i,"0");			
						this.sg2.cells(8,i,"0");									
						this.sg2.cells(9,i,"0");													
					}
					//jgn pake floattonilai--> koma jadi ilang
					if (totpremi > premi ) this.sg2.cells(3,i,premi);			
					else this.sg2.cells(3,i,totpremi);			
					
					if (totfee > fee ) this.sg2.cells(4,i,fee);			
					else this.sg2.cells(4,i,totfee);			
					
					var nppn = Math.round((10 * nilaiToFloat(this.sg2.cells(4,i)) /100) * 100)/100;									
					var npph = Math.round((2 * nilaiToFloat(this.sg2.cells(4,i)) /100) * 100)/100;																
					this.sg2.cells(5,i,nppn); 
					this.sg2.cells(6,i,npph); 
					
					if (this.sg2.cells(4,i)!="" && this.sg2.cells(7,i)!="" && this.sg2.cells(8,i)!="" && this.sg2.cells(9,i)!="") {
						var subtot = Math.round((nilaiToFloat(this.sg2.cells(3,i)) - nilaiToFloat(this.sg2.cells(7,i)) + nilaiToFloat(this.sg2.cells(8,i)) + nilaiToFloat(this.sg2.cells(9,i))) * 100)/100;		
						this.sg2.cells(10,i,subtot);
					}								
					totpremi = totpremi - premi;
					totfee = totfee - fee;								
				}
							
				this.pc2.setActivePage(this.pc2.childPage[1]);								
			}
			else {
				system.alert(this,"Data tidak valid.","No Polis dan Jumlah Termin harus diisi.");
				return false;						
			}
		}
		catch(e) {
			alert(e);
		}
	}
});