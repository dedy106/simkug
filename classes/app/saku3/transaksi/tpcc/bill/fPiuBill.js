window.app_saku3_transaksi_tpcc_bill_fPiuBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tpcc_bill_fPiuBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tpcc_bill_fPiuBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Piutang via Bill", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Akru","List Akru"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		      		colTitle:["No Bukti","Tanggal","Customer","No Dokumen","Deskripsi","Total","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,250,100,200,80,100]],
					colFormat:[[5,6],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.c_stsppn = new saiCB(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Status PPN",items:["PPN","NON"], readOnly:true,tag:9,change:[this,"doChange"]});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun Piutang",multiSelection:false, tag:2});										
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		this.cb_bill = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});								
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer",readOnly:true});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,279], childPage:["Detail Item","Controlling"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
		      colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,300,50,150,80]],					
				columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
				buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
				colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
				cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
				colTitle:["Kode Akun","Kode PP","Kode DRK","Saldo Awal","Tot Transaksi","Saldo Akhir"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,80,80,80]],
				readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[960,3,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
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
						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag='003' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);						
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);															
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'HUTPPN' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;			
				}
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tpcc_bill_fPiuBill.extend(window.childForm);
window.app_saku3_transaksi_tpcc_bill_fPiuBill.implement({
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update bill_m set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update bill_m set no_piutang='"+this.e_nb.getText()+"' where no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into piutang_d (no_piutang,kode_lokasi,no_dokumen,no_fp,tanggal,kode_pp,akun_piutang,keterangan,kode_project,kode_cust,kode_curr,kurs,nilai,nilai_ppn,nilai_pph,periode,nik_user,tgl_input,modul) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bill.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.ppBill+"','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','-','"+this.cb_cust.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",0,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PIUBILL')");

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
								  "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','PIUBILL','F','-','-','"+this.ppBill+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
								  parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_ppn.getText())+",0,'-','-','-','-','-','-','"+this.cb_cust.getText()+"','"+this.cb_akun.getText()+"','-')");												
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_total.getText())+","+
									parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','AR','PIUTANG','IDR',1,'"+this.ppBill+"','-','-','-','-','-','-','-','-')");
					
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {						
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									  "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunPPN+"','C',"+parseNilai(this.e_ppn.getText())+","+
										parseNilai(this.e_ppn.getText())+",'"+this.e_ket.getText()+"','AR','HUTPPN','IDR',1,'"+this.ppBill+"','-','-','-','-','-','-','-','-')");
					}

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
												"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+","+
												parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','AR','PDPT','IDR',1,'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','-','-','-','-','-','-','-')");										
							}
						}
					}

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(4,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(4,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(4,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','AR','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(3,i))+","+nilai+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 	
					this.sg2.clear(1);
					this.sg3.clear(1);
					setTipeButton(tbAllFalse);
					this.doClick();
					this.cb_bill.setSQL("select no_bill,keterangan from bill_m where periode<='"+this.e_periode.getText()+"' and no_piutang='-' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
				break;
			case "simpan" :																						
			case "ubah" :																						
				this.preView = "1";				
				this.sg.validasi();				

				this.doHitungGar();												
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
				for (var i=0;i < this.sg2.getRowCount();i++){
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i))>0 && nilaiToFloat(this.sg2.cells(3,i)) < nilaiToFloat(this.sg2.cells(4,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}							
						}
					}
				}

				for (var i=0;i < this.sg.getRowCount();i++){
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}	

				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update bill_m set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		// this.e_periode.setText(this.app._periode);	
		this.e_periode.setText(y+""+m);					
					
		if (this.stsSimpan == 1) {
			this.doClick();				
			this.cb_bill.setSQL("select no_bill,keterangan from bill_m where periode<='"+this.e_periode.getText()+"' and no_piutang='-' and modul='BILL' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);					
		}
	},		
	doChange:function(sender){
		if (sender == this.c_stsppn && this.c_stsppn.getText() != "") {
			this.sg.validasi();
		}
		
		if (sender == this.cb_bill && this.cb_bill.getText() != "" && this.stsSimpan==1) {
			var strSQL = "select a.kode_pp,a.nilai,a.kode_cust,a.keterangan "+						 
						 "from bill_m a inner join kontrak_m b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_bill='"+this.cb_bill.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.cb_cust.setText(line.kode_cust);
					this.ppBill = line.kode_pp;
					this.e_ket.setText(line.keterangan);

          			var filterjen="";
          			if (this.stsSimpan == 0) filterjen = " and g.jenis = 'PDPT' ";
					var strSQL = "select a.nu,a.item,a.harga*a.jumlah as total,e.kode_pp,e.nama as nama_pp, isnull(g.kode_akun,'-') as kode_akun, isnull(b.nama,'-') as nama_akun "+
								"from bill_d a "+
								"     inner join bill_m d on a.no_bill = d.no_bill and a.kode_lokasi=d.kode_lokasi "+
								"     inner join pp e on d.kode_pp=e.kode_pp and d.kode_lokasi=e.kode_lokasi "+
								"     left join trans_j g on d.no_piutang = g.no_bukti and d.kode_lokasi=g.kode_lokasi "+
								"     left join masakun b on g.kode_akun=b.kode_akun and g.kode_lokasi=b.kode_lokasi   "+                       
								"where a.no_bill='"+this.cb_bill.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+filterjen+
								"order by a.nu";                       
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.kode_akun,line.nama_akun,"C",line.item,floatToNilai(line.total),line.kode_pp,line.nama_pp,"-","-"]);
						}
					} else this.sg.clear(1);			
					this.sg.validasi();					
				} 
			}
		}
		
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 				
				this.cb_bill.setSQL("select no_bill,keterangan from bill_m where periode<='"+this.e_periode.getText()+"' and no_piutang='-' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
			}			
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PI"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "") {							
				this.sg.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
			}
		}	
		if (col == 7) {
			if (sender.cells(7,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(8,row,line.nama);
					else {						
						this.sg.cells(7,row,"-");
						this.sg.cells(8,row,"-");						
					}
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){										
					if (this.sg.cells(2,i).toUpperCase() == "C") tot += nilaiToFloat(this.sg.cells(4,i));
					else tot -= nilaiToFloat(this.sg.cells(4,i));									
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
			if (this.c_stsppn.getText() == "PPN") var ppn = Math.round(tot * 0.1);			
			else ppn = 0;
			this.e_ppn.setText(floatToNilai(ppn));			
			this.e_total.setText(floatToNilai(tot + nilaiToFloat(this.e_ppn.getText())));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022' ",
												  "select count(a.kode_akun)    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022' ",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 7){					
					var vUnion = "";
					var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-" && this.sg.cells(7,i)!= "-"){				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;				

				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(1,j) && this.sg.cells(7,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(5,i),this.sg.cells(7,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(4,idx));
					total = total + nilai;
					this.sg2.setCell(4,idx,total);
				}
			}
		}
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_garakunppdrk('"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"') as gar ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(3,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(4,i));
				this.sg2.cells(5,i,floatToNilai(sls));
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_travel_rptPiutangJurnal";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 	this.sg2.clear(1); this.sg3.clear(1); 												
			setTipeButton(tbAllFalse);			
			this.cb_bill.setSQL("select no_bill,keterangan from bill_m where periode<='"+this.e_periode.getText()+"' and no_piutang='-' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select distinct a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.param1+'-'+b.nama as cust,a.no_dokumen,a.keterangan,a.nilai1+a.nilai2 as total "+
		             "from trans_m a inner join cust b on a.param1=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					"               left join piubayar_d c on a.no_bukti=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+
					"where c.no_bukti is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.form='PIUBILL' ";						
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.cust,line.no_dokumen,line.keterangan,floatToNilai(line.total),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 6) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select d.no_bill,a.tanggal,a.periode,a.no_dokumen,a.keterangan,d.kode_pp,a.param2 as akun_piutang,a.nik1,a.param1 as kode_cust,c.nama as nama_cust,a.nilai2 as nilai_ppn "+						 
							"from trans_m a inner join cust c on a.param1=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							"               inner join bill_m d on a.no_bukti=d.no_piutang and a.kode_lokasi=d.kode_lokasi "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.ppBill = line.kode_pp;
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.cb_akun.setText(line.akun_piutang);
						this.cb_cust.setText(line.kode_cust,line.nama_cust);					
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						if (this.e_ppn.setText() != "0") this.c_stsppn.setText("PPN");
						else this.c_stsppn.setText("NON");						
						
						this.cb_bill.setSQL("select no_bill,keterangan from bill_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
						this.cb_bill.setText(line.no_bill);
					} 
				}
				strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk  "+
						"from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             	 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												 
						"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where a.jenis = 'PDPT' and a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.kode_akun,line2.nama_akun,line2.dc,line2.keterangan,floatToNilai(line2.nilai),line2.kode_pp,line2.nama_pp,line2.kode_drk,line2.nama_drk]);
					}
				} else this.sg.clear(1);						
				this.sg.validasi();
			}									
		} catch(e) {alert(e);}
	}
});