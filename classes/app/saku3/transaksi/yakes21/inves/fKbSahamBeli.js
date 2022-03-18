window.app_saku3_transaksi_yakes21_inves_fKbSahamBeli = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fKbSahamBeli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fKbSahamBeli";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pembelian Saham", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,300,20],caption:"No Dokumen", maxLength:50});												
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});												
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Akun KasBank", multiSelection:false, tag:2});				
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,15,202,20],caption:"Modul",items:["KBSHMBELI","KBMIFEE"], readOnly:true,tag:2, change:[this,"doLoad"]});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,282], childPage:["Data Hutang","Jurnal ++"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,				
				colTitle:["Status","No Beli","Tanggal","Keterangan","MI","Akun Utang","Nilai","Nilai PPh"],
				colWidth:[[7,6,5,4,3,2,1,0],[90,100,80,100,290,80,120,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[6,7],[cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				dblClick:[this,"doDoubleClick"],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9, visible:false,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 					
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);

			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_saham_param where kode_plan = '1' and kode_param in ('PPINV','SHMHUT','SHMPPH23')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;								
					if (line.kode_param == "SHMHUT") this.akunHutang = line.flag;			
					if (line.kode_param == "SHMPPH23") this.akunpph = line.flag;					
				}
			}

			this.c_jenis.setText("");
			
			var sql = new server_util_arrayList();
				sql.add("select a.kode_akun,a.nama from masakun a "+
						"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+						
						"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");														
				sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");							
			this.dbLib.getMultiDataProviderA(sql);				

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fKbSahamBeli.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fKbSahamBeli.implement({
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
							"select distinct a.kode_akun,a.nama from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",

							"select count(*) from ("+
							"select distinct a.kode_akun,a.nama from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') a",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){					
					var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";                    
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE'",
							"select count(*) from (select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE') x",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}							
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg1.validasi();
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
			if (this.sg1.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join angg_r b on a.kode_drk=b.kode_drk where b.modul='RELEASE' and a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where b.modul='RELEASE' and a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and b.kode_drk = '"+this.sg1.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg1.cells(8,row,line.nama);
					else {
						if (!isAda) this.sg1.cells(8,row,"-");
						else {
							this.sg1.cells(7,row,"");
							this.sg1.cells(8,row,"");
						}
					}
				}
			}
		}	
		sender.onChange.set(this,"doChangeCell1");		
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
			if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0 ){
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
						
						if (this.jenis == "KBSHMBELI") sql.add("update inv_shmbeli_m set no_kas ='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						else sql.add("update inv_discre_m set no_kas ='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','"+this.c_jenis.getText()+"','BK','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					if (this.sg.getRowValidCount() > 0){
						var j=0;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
							    j = i+1; k = i+2;

								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','D',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.kodepp+"','-','-','-','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','HUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");

								if (this.c_jenis.getText() == "KBSHMBELI")	{	
									//tidak ada jurnal ++
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
											"select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.akunpph+"','PPH '+substring(b.nama,1,140) as keterangan,'C',pph as nilai,'"+this.kodepp+"','-','-','-','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','HUTPPH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
											"from inv_shmbeli_d a inner join inv_broker b on a.kode_broker=b.kode_broker where a.no_shmbeli = '"+this.sg.cells(1,i)+"'");								

									sql.add("update inv_shmbeli_m set no_kas ='"+this.e_nb.getText()+"' where no_shmbeli='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
								else {
									//mi fee
									sql.add("update inv_discre_m set no_kas ='"+this.e_nb.getText()+"' where no_bukti='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
					}	
					
					//jurnal tambahan hanya utk mifee
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){	
								var k = 1000+i;							
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','-','-','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','TAMBAH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");			
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
					this.sg.clear(1); this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
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

					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
					
					if (this.jenis == "KBSHMBELI") sql.add("update inv_shmbeli_m set no_kas ='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					else sql.add("update inv_discre_m set no_kas ='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		if (this.stsSimpan==1) this.doClick(this.i_gen);
	},	
	doLoad:function(sender){
		if (this.e_periode.getText() != "") {
			if (this.c_jenis.getText() == "KBSHMBELI") {
				this.sg1.hide();
				this.sg1.clear();
				this.sg1.validasi();
				var strSQL = "select a.no_shmbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,c.nama as kelola,x.total+a.nilai_komisi+a.nilai_ppn+a.nilai_levy as nilai,a.nilai_pph,b.kode_akun as akun_hutang "+
							"from inv_shmbeli_m a inner join inv_shmbeli_j b on a.no_shmbeli=b.no_shmbeli and a.kode_lokasi=b.kode_lokasi and b.jenis='HUT' "+
							"                     inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
							"                     inner join (select no_shmbeli,round(sum(harga*jumlah),0) as total from inv_shmbeli_d group by no_shmbeli) x on a.no_shmbeli=x.no_shmbeli "+
							"					   inner join inv_kelola z on a.kode_kelola=z.kode_kelola "+
							"where z.jenis <> 'SWAKELOLA' and a.no_kas ='-' and a.periode>='202201' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							"order by a.no_shmbeli";						
			}
			if (this.c_jenis.getText() == "KBMIFEE") {
				//nilai pph sudah di jurnal saat akru
				this.sg1.show();
				this.sg1.clear(1);
				var strSQL = "select a.no_bukti as no_shmbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,c.nama as kelola,b.nilai,0 as nilai_pph,b.kode_akun as akun_hutang "+
							"from inv_discre_m a  "+
							"					   inner join inv_discre_j b on a.no_bukti=b.no_bukti and b.jenis='BMHD' "+
							"                     inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
							"where a.no_kas ='-' and a.periode>='202201' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+						
						 	"order by a.no_bukti";						
			}

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_shmbeli,line.tgl,line.keterangan,line.kelola,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.nilai_pph)]);
				}
			} else this.sg.clear(1);			

		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doDoubleClick: function(sender, col , row) {		
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"APP");
		else this.sg.cells(0,row,"INPROG");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) this.sg.validasi();		
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(6,i) != "" && this.sg.cells(7,i) != ""){
					tot = tot + nilaiToFloat(this.sg.cells(6,i)) - nilaiToFloat(this.sg.cells(7,i));				
				}
			}			

			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg1.cells(4,i));
				}
			}

			this.e_nilai.setText(floatToNilai(tot));
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();																					
							this.dataPP = new portalui_arrayMap();									
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
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
			this.sg.clear(1); this.sg3.clear(1);  this.sg1.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from kas_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and modul  in ('KBSHMBELI','KBMIFEE') "+
					 "order by a.no_kas";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page = 1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_kas,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
			}
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;												
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select a.*,b.nama from kas_m a inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
				             "where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);																						
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.akun_kb,line.nama);	
						this.c_jenis.setText(line.modul);	
						this.jenis = line.modul;				
					}
				}
				
				if (this.c_jenis.getText() == "KBSHMBELI") {
					var strSQL = "select a.no_shmbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,c.nama as kelola,x.total+a.nilai_komisi+a.nilai_ppn+a.nilai_levy as nilai,a.nilai_pph,b.kode_akun as akun_hutang "+
								"from inv_shmbeli_m a inner join inv_shmbeli_j b on a.no_shmbeli=b.no_shmbeli and a.kode_lokasi=b.kode_lokasi and b.jenis='HUT' "+
								"                     inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
								"                     inner join (select no_shmbeli,round(sum(harga*jumlah),0) as total from inv_shmbeli_d group by no_shmbeli) x on a.no_shmbeli=x.no_shmbeli "+
								"					   inner join inv_kelola z on a.kode_kelola=z.kode_kelola "+
								"where z.jenis <> 'SWAKELOLA' and a.no_kas ='"+this.e_nb.getText()+"' and a.periode>='202201' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_shmbeli";						
				}
				else {								
					var strSQL = "select a.no_bukti as no_shmbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,c.nama as kelola,b.nilai,0 as nilai_pph,b.kode_akun as akun_hutang "+
								"from inv_discre_m a  "+
								"					   inner join inv_discre_j b on a.no_bukti=b.no_bukti and b.jenis='BMHD' "+
								"                     inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
								"where a.no_kas ='"+this.e_nb.getText()+"' and a.periode>='202201' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+						
								 "order by a.no_bukti";						
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_shmbeli,line.tgl,line.keterangan,line.kelola,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.nilai_pph)]);
					}
				} else this.sg.clear(1);			

				this.sg.validasi();
				
			}
		} catch(e) {alert(e);}		
	}	
});