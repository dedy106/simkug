window.app_saku3_transaksi_tm_fJuBayarHuTM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fJuBayarHuTM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fJuBayarHuTM";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Hutang Umum NonCash", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["RVH"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});												
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});												
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Mitra", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Saldo Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_hutang = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Hutang", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,20],caption:"Nilai Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,257], childPage:["Item Jurnal Pelunasan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,280,50,180,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.i_loadRev = new portalui_imageButton(this.sgn,{bound:[960,2,20,20],hint:"Load Reverse Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadRev"]});		

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
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approve",true);												
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fJuBayarHuTM.extend(window.childForm);
window.app_saku3_transaksi_tm_fJuBayarHuTM.implement({
	doLoadRev: function() {
		if (this.cb_hutang.getText()!="") {
			strSQL = "select a.kode_akun,b.nama as nama_akun,case a.dc when 'D' then 'C' else 'D' end as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp  "+
					"from tm_hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"             	    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
					"where a.jenis <> 'HUT' and a.no_hutang = '"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg.appendData([line2.kode_akun,line2.nama_akun,line2.dc.toUpperCase(),line2.keterangan,floatToNilai(line2.nilai),line2.kode_pp,line2.nama_pp,"-","-"]);
				}
			} else this.sg.clear(1);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tm_hutbayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','JUREVAP','"+this.c_jenis.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F','-','-','"+this.cb_hutang.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunHutang+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.kodePPInvoice+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUREVAP','HUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																															
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUREVAP','REV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
							}
						}
					}
					sql.add("insert into tm_hutbayar_d(no_bukti,kode_lokasi,no_hutang,periode,dc,modul,nilai,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_hutang.getText()+"','"+this.e_periode.getText()+"','D','JUREVAP',"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"',getdate())");
					
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
					this.sg.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh melebihi saldo.");
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tm_hutbayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		/*
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		*/
		
		this.e_periode.setText(y+""+m);
		
		if (this.stsSimpan == 1) this.doClick();						
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.cb_vendor) && (this.e_periode.getText()!= "" && this.cb_vendor.getText()!= "")) {	
			if (this.stsSimpan == 1) {		
				var strSQL = "select a.no_hutang,a.keterangan,a.kode_lokasi from tm_hutang_m a "+
							"    left join ( "+
							"             select no_hutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							"             from tm_hutbayar_d group by no_hutang,kode_lokasi) b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_vendor='"+this.cb_vendor.getText()+"' and a.nilai>isnull(b.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_hutang.setSQL(strSQL,["a.no_hutang","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Hutang",true);											
			}
		}
		if (sender == this.cb_hutang && this.cb_hutang.getText()!= "") {
			var strSQL = "select a.kode_pp,a.nilai -  isnull(b.bayar,0) as saldo, a.akun_hutang "+			             
						 "from tm_hutang_m a "+						 
						 "     left join ("+
						 "              select no_hutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
						 "              from tm_hutbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_hutang,kode_lokasi) b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_hutang='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.kodePPInvoice = line.kode_pp;
					this.akunHutang = line.akun_hutang;					
					this.e_saldo.setText(floatToNilai(line.saldo));

					var sql = new server_util_arrayList();			
					sql.add("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.kodePPInvoice+"'");
					sql.add("select a.kode_akun,a.nama    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
					this.dbLib.getMultiDataProviderA(sql);		
					
				} 
			}			
		}
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
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
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){										
					if (this.sg.cells(2,i).toUpperCase() == "D") tot -= nilaiToFloat(this.sg.cells(4,i));
					else tot += nilaiToFloat(this.sg.cells(4,i));									
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
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
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_saldo.getText()) - nilaiToFloat(this.e_nilai.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,kodePPInvoice);						
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(*) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5 && this.cb_hutang.getText!=""){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1' and kode_pp='"+this.kodePPInvoice+"'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1' and kode_pp='"+this.kodePPInvoice+"'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}							
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
							this.dataPP = new portalui_arrayMap();
							this.dataAkun = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
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
			this.sg.clear(1); this.sg3.clear(1); 
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
		             "from ju_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JUREVAP' and a.posted ='F'";						
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
			this.sg3.appendData([line.no_ju,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.nilai -  isnull(b.bayar,0) as saldo, a.kode_pp, a.akun_hutang,a.kode_vendor,"+							 
							 "e.jenis,e.periode,e.no_dokumen,e.tanggal,e.keterangan as ket_kas,e.nik_setuju as nik_app,e.ref1 "+
							 "from tm_hutang_m a inner join ju_m e on e.ref1 = a.no_hutang and a.kode_lokasi=e.kode_lokasi "+
							 "                   left join ("+
							 "                   select no_hutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "                   from tm_hutbayar_d where no_bukti <> '"+this.e_nb.getText()+"' group by no_hutang,kode_lokasi) b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
							 "where e.no_ju='"+this.e_nb.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.jenis);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.ket_kas);
						this.cb_app.setText(line.nik_app);
						this.cb_hutang.setSQL("select no_hutang,keterangan from tm_hutang_m where kode_lokasi='"+this.app._lokasi+"' and no_hutang='"+line.ref1+"'",["no_hutang","keterangan"],false,["No Bukti","Keterangan"],"and","Data Hutang",true);											
						this.cb_hutang.setText(line.ref1);						
						this.akunHutang = line.akun_hutang;
						this.cb_vendor.setText(line.kode_vendor);
						this.e_saldo.setText(floatToNilai(line.saldo));		
						
						this.kodePPInvoice = line.kode_pp;						
					} 
				}			
				strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							"where a.jenis = 'REV' and a.no_ju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
			}									
		} catch(e) {alert(e);}
	}
});