window.app_saku3_transaksi_sai_fSaiBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sai_fSaiBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sai_fSaiBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing Sewa : Generate", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Bill","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[400,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Invoice",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[590,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		this.bFP = new portalui_button(this.pc2.childPage[0],{bound:[690,17,80,18],caption:"F Pajak",click:[this,"doFakturPajak"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,325], childPage:["Data Kontrak"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.childPage[0].width-5,this.pc1.childPage[0].height-35],colCount:8,tag:1,
		            colTitle:["Status","Customer","ID Kontrak","Keterangan","No FP","Nilai","PPN","Total"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,150,200,80,200,80]],					
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BILL","INPROG"]})]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					columnReadOnly:[true,[0,1,2,3,5,6,7],[4]],					
					autoAppend:false,defaultRow:1,
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);				
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
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
window.app_saku3_transaksi_sai_fSaiBill.extend(window.childForm);
window.app_saku3_transaksi_sai_fSaiBill.implement({
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
						sql.add("delete from sai_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						var perBefore = this.e_periode.getText(); 
						sql.add("update a set a.per_tagih='"+perBefore+"' "+
								"from sai_kontrak_m a inner join sai_bill_d b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
						sql.add("delete from sai_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					sql.add("insert into sai_bill_m(no_bill,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'-','-','F','BILL','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','"+this.app._userLog+"',getdate())");					
										
					var perNext = nextNPeriode(this.e_periode.getText(),1); 
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into sai_bill_d(no_bill,kode_lokasi,periode,no_inv,kode_cust,no_kontrak,keterangan,nilai,nilai_ppn,no_kas,no_fp) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"-"+this.sg.cells(2,i)+"','-','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'-','"+this.sg.cells(4,i)+"')");
						}
					}
					
					sql.add("update a set a.per_tagih='"+perNext+"' "+
							"from sai_kontrak_m a inner join sai_bill_d b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
					
					sql.add("update b set b.kode_cust=a.kode_cust "+
							"from sai_kontrak_m a inner join sai_bill_d b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");  				 
							
					
					sql.add("insert into sai_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_curr)  "+
							"select '"+this.e_nb.getText()+"',no_inv,'"+this.dp_d1.getDateString()+"',0,c.akun_piutang,'"+this.e_ket.getText()+"','D',a.nilai+a.nilai_ppn,'"+this.app._kodePP+"','-',a.kode_lokasi,'BILL','AR','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,a.nilai+a.nilai_ppn "+
							"from sai_bill_d a inner join sai_kontrak_m b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"                  inner join sai_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into sai_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_curr)  "+
							"select '"+this.e_nb.getText()+"',no_inv,'"+this.dp_d1.getDateString()+"',1,c.akun_pdpt,'"+this.e_ket.getText()+"','C',a.nilai,'"+this.app._kodePP+"','-',a.kode_lokasi,'BILL','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,a.nilai "+							
							"from sai_bill_d a inner join sai_kontrak_m b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"                  inner join sai_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into sai_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_curr)  "+
							"select '"+this.e_nb.getText()+"',no_inv,'"+this.dp_d1.getDateString()+"',2,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C',a.nilai_ppn,'"+this.app._kodePP+"','-',a.kode_lokasi,'BILL','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,a.nilai_ppn "+
							"from sai_bill_d a inner join sai_kontrak_m b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");		
					
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
					this.sg.setTag("0");					
					this.sg.clear(1); 
					this.sg3.clear(1); 
					setTipeButton(tbAllFalse);
					this.bTampil.show();
					this.bFP.show();			
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Tagihan tidak boleh nol atau kurang.");
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
					sql.add("delete from sai_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					var perBefore = this.e_periode.getText(); 
					sql.add("update a set a.per_tagih='"+perBefore+"' "+
							"from sai_kontrak_m a inner join sai_bill_d b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
					sql.add("delete from sai_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12){
				this.e_periode.setText(y+""+m);			
			}
			else {
				this.e_periode.setText(this.app._periode);					
			}	
			if (this.stsSimpan == 1) this.doClick();			
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){			
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1);
				this.sg.clear(1);
				this.bTampil.show();
				this.bFP.show();			
			}						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sai_bill_m","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();					
			this.stsSimpan = 1;			
			setTipeButton(tbSimpan);
		}		
	},
	doLoadData: function(sender){		
		this.e_nilai.setText("0");
		var strSQL = "select b.kode_cust+' - '+b.nama as cust,a.no_kontrak,a.keterangan,a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as total "+
		             "from sai_kontrak_m a inner join sai_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.per_tagih='"+this.e_periode.getText()+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg.appendData(["BILL",line.cust,line.no_kontrak,line.keterangan,"-",floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),floatToNilai(line.total)]);
			}
			this.doFakturPajak();
		} else this.sg.clear(1);
	},			
	doFakturPajak: function(){
		try {			
			var format = noAwal = noAkhir = "-";
			var data = this.dbLib.getDataProvider("select substring(no_awal,1,11) as format,substring(no_awal,5,15) as no_awal,substring(no_akhir,5,15) as no_akhir from si_fpajak where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					format = line.format;
					noAwal = line.no_awal;
					noAkhir = line.no_akhir;
				} 			
			}
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_fp,5,15)),0) as no_fp from sai_bill_d where substring(no_fp,5,15) between '"+noAwal+"' and '"+noAkhir+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					if (line.no_fp == "0") {
						var noFormat = format;
						var idx = parseFloat(noAwal.substr(7,8));							
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "BILL"){
								idx2 = idx.toString();									
								if (idx2.length == 1) var nu = "0000000"+idx2;
								if (idx2.length == 2) var nu = "000000"+idx2;
								if (idx2.length == 3) var nu = "00000"+idx2;
								if (idx2.length == 4) var nu = "0000"+idx2;
								if (idx2.length == 5) var nu = "000"+idx2;
								if (idx2.length == 6) var nu = "00"+idx2;
								if (idx2.length == 7) var nu = "0"+idx2;
								if (idx2.length == 8) var nu = idx2;									
								
								var strSQL = "select a.wapu from sai_cust a inner join sai_kontrak_m b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi where b.no_kontrak = '"+this.sg.cells(2,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'";						
								var data2 = this.dbLib.getDataProvider(strSQL,true);
								if (typeof data2 == "object"){
									var line2 = data2.rs.rows[0];							
									if (line2 != undefined){							
										vWapu = line2.wapu;
									}
								}																	
								
								if (vWapu == "NON") this.sg.cells(4,i,noFormat+nu);
								if (vWapu == "BUMN") this.sg.cells(4,i,noFormat.substr(0,1)+"3"+noFormat.substr(2,9)+nu);
								if (vWapu == "BDHN") this.sg.cells(4,i,noFormat.substr(0,1)+"2"+noFormat.substr(2,9)+nu);									
								
								if (noAkhir == noFormat.substr(4,7)+nu) {
									this.sg.cells(4,i,"-");
								}
								else idx++;									
							}
							else this.sg.cells(4,i,"-");
						}							
					}
					else {							
						if (noAkhir == line.no_fp) {								
							alert("No Faktur Pajak Aktif telah habis.["+noAkhir+"]");
							return false;
						}
						else {
							var noFormat = format;
							var idx = parseFloat(line.no_fp.substr(7,8)) + 1;
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i) && this.sg.cells(0,i) == "BILL"){
									idx2 = idx.toString();									
									if (idx2.length == 1) var nu = "0000000"+idx2;
									if (idx2.length == 2) var nu = "000000"+idx2;
									if (idx2.length == 3) var nu = "00000"+idx2;
									if (idx2.length == 4) var nu = "0000"+idx2;
									if (idx2.length == 5) var nu = "000"+idx2;
									if (idx2.length == 6) var nu = "00"+idx2;
									if (idx2.length == 7) var nu = "0"+idx2;
									if (idx2.length == 8) var nu = idx2;									
									
									var strSQL = "select a.wapu from sai_cust a inner join sai_kontrak_m b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi where b.no_kontrak = '"+this.sg.cells(2,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'";						
									var data = this.dbLib.getDataProvider(strSQL,true);
									if (typeof data == "object"){
										var line = data.rs.rows[0];							
										if (line != undefined){							
											vWapu = line.wapu;
										}
									}									
									
									if (vWapu == "NON") this.sg.cells(4,i,noFormat+nu);
									if (vWapu == "BUMN") this.sg.cells(4,i,noFormat.substr(0,1)+"3"+noFormat.substr(2,9)+nu);
									if (vWapu == "BDHN") this.sg.cells(4,i,noFormat.substr(0,1)+"2"+noFormat.substr(2,9)+nu);									
									
									alert(noAkhir.substr(7,8)+"-"+nu);
									if (parseFloat(noAkhir.substr(7,8)) > parseFloat(nu)) {
										this.sg.cells(4,i,"-");
									}
									else idx++;									
								}
							}						
						}
					}						
				} 
			}			
		}
		catch(e) {
			alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"BILL");
		else {			
			this.sg.cells(0,row,"INPROG");
			this.sg.cells(4,row,"-");
		}
	},
	doChangeCell: function(sender, col, row){						
		if (col == 0) {				
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{			
			var saldo = 0;			
			for (var i = 0; i < this.sg.getRowCount();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(0,i)=="BILL") {
					saldo += nilaiToFloat(this.sg.cells(7,i));
				}
			}			
			this.e_nilai.setText(floatToNilai(Math.round(saldo * 100)/100));			
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
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";							
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
			this.sg.setTag("0");
			this.sg.clear(1); 
			this.sg3.clear(1); 
			setTipeButton(tbSimpan);
			this.bTampil.show();
			this.bFP.show();			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from sai_bill_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bTampil.hide();
				this.bFP.hide();			
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from sai_bill_m "+
							 "where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_setuju);										
					}
				}
				
				var strSQL = "select b.kode_cust+' - '+b.nama as cust,a.no_kontrak,a.keterangan,a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as total,c.no_fp "+
							 "from sai_kontrak_m a inner join sai_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							 "                     inner join sai_bill_d c on a.no_kontrak=c.no_kontrak and a.kode_lokasi=c.kode_lokasi "+
							 "where c.no_bill='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData(["BILL",line.cust,line.no_kontrak,line.keterangan,line.no_fp,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),floatToNilai(line.total)]);
					}			
				} else this.sg.clear(1);
							
			}						
		} catch(e) {alert(e);}
	}	
});