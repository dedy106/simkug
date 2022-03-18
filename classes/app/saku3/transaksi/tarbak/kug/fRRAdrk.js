window.app_saku3_transaksi_tarbak_kug_fRRAdrk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_kug_fRRAdrk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_kug_fRRAdrk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","RRA Anggaran DRK", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_gridLib");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan"]});						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,996,305], childPage:["Penerima","Pemberi","Cek Anggaran"]});				
		this.cb_ppT = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"PP Penerima", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_akunT = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Akun Penerima", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_drkT = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"DRK Penerima", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.c_bulanT = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Bulan Penerima", tag:9,change:[this,"doChange"]}); 		
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_terima = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai Penerima", tag:9, tipeText:ttNilai, text:"0"});
		this.e_donor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Total Pemberi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","Bulan","Saldo","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,80,60,200,80,120,80,150,80]],					
					columnReadOnly:[true,[1,3,5,7],[0,2,4,6,8]],
					colFormat:[[7,8],[cfNilai,cfNilai]],
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 
					picklist:[[6],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]], 					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
				
		this.sgG = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,			
		            colTitle:["Kode Akun","Kode PP","Kode DRK","Saldo Awal","Nilai","Saldo Akhir","Bulan"],
					colWidth:[[6,5,4,3,2,1,0],[80,100,100,100,100,100,100]],
					readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgG});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGarTW"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
			this.gridLib = new util_gridLib();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);

			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;				
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_ppT.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",["c.kode_pp","c.nama"],false,["Kode","Nama"],"and","Data PP",true);						
			this.cb_ppT.setText(this.app._kodePP);
			this.cb_akunT.setSQL("select a.kode_akun,a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"' and a.status_gar='1' ",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);		
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where status_gar='1' and block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);							
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_kug_fRRAdrk.extend(window.childForm);
window.app_saku3_transaksi_tarbak_kug_fRRAdrk.implement({	
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
			var k=0;
			this.doHitungGarTW();
			for (var i=0;i < this.sgG.getRowCount();i++){
				if (nilaiToFloat(this.sgG.cells(5,i)) < 0) {
					var k =i+1;
					system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
					return false;						
				}
			}
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_donor.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.cb_app.getText()+"','RR')");					
					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','RRR','-','"+this.app._userLog+"',getdate(),'1','RRPUSAT')");
					
					var periode = "";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																
								periode = this.e_periode.getText().substr(0,4)+ this.sg.cells(6,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-')");
								sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRPUSAT')");
							}
						}
					}
					
					periode = this.e_periode.getText().substr(0,4)+this.c_bulanT.getText();
					sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',999,'"+this.cb_akunT.getText()+"','"+this.cb_ppT.getText()+"','"+this.cb_drkT.getText()+"','"+periode+"',"+nilaiToFloat(this.e_saldo.getText())+","+nilaiToFloat(this.e_terima.getText())+",'D','-')");
					
					//langsung nambah --> tidak pakai approve		
					sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.cb_ppT.getText()+"','"+this.cb_akunT.getText()+"','"+this.cb_drkT.getText()+"',1,'"+periode+"',"+nilaiToFloat(this.e_terima.getText())+","+nilaiToFloat(this.e_terima.getText())+",'D','-','"+this.app._userLog+"',getdate(),'RRPUSAT')");

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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
					this.sg.clear(1); 					
					this.sgG.clear(1); 
					setTipeButton(tbAllFalse);													
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_terima.getText()) != nilaiToFloat(this.e_donor.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Terima dan Pemberi tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_terima.getText()) <= 0 || nilaiToFloat(this.e_donor.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Terima atau Pemberi tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
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
				sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		
		//pemberi di open - pa irfan 2-5-18
		//this.sg.columns.get(6).pickList.clear();				
		this.c_bulanT.items.clear();		
		if (this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") {
			this.c_bulanT.addItem(0,"01");			
			this.c_bulanT.addItem(1,"02");			
			this.c_bulanT.addItem(2,"03");		

			//pemberi di open - pa irfan 2-5-18
			//this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("01","02","03"));	
		}
		if (this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") {
			this.c_bulanT.addItem(0,"04");			
			this.c_bulanT.addItem(1,"05");			
			this.c_bulanT.addItem(2,"06");	
			
			//pemberi di open - pa irfan 2-5-18
			//this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("04","05","06"));		
		}
		if (this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") {
			this.c_bulanT.addItem(0,"07");			
			this.c_bulanT.addItem(1,"08");			
			this.c_bulanT.addItem(2,"09");			

			//pemberi di open - pa irfan 2-5-18
			//this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("07","08","09"));
		}
		if (this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12") {
			this.c_bulanT.addItem(0,"10");			
			this.c_bulanT.addItem(1,"11");			
			this.c_bulanT.addItem(2,"12");	

			//pemberi di open - pa irfan 2-5-18
			//this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("10","11","12"));		
		}

		this.c_bulanT.setText(this.e_periode.getText().substr(4,2));			
		if (this.stsSimpan == 1) this.doClick();		
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){																		
		try{			
			if ((sender == this.cb_ppT || sender == this.cb_akunT) && this.cb_ppT.getText()!="" && this.cb_akunT.getText()!="")  {	
				var strSQL = "select distinct a.kode_drk,a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi where b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.tahun=substring(b.periode,1,4) and b.kode_akun='"+this.cb_akunT.getText()+"' and b.kode_pp = '"+this.cb_ppT.getText()+"'  and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_drkT.setSQL(strSQL,["a.kode_drk","a.nama"],false,["Kode","Nama"],"and","Data DRK",true);		
			}

			if (sender == this.c_bulanT || sender == this.cb_drkT || sender == this.cb_ppT || sender == this.cb_akunT) {					
				this.e_saldo.setText("0");
				if (this.cb_akunT.getText()!="" && this.cb_ppT.getText()!="" && this.c_bulanT.getText()!="" && this.cb_drkT.getText()!="") {					
					var data = this.dbLib.getDataProvider("select fn_saldotwdrk('"+this.app._lokasi+"','"+this.cb_akunT.getText()+"','"+this.cb_ppT.getText()+"','"+this.cb_drkT.getText()+"','"+this.e_periode.getText().substr(0,4)+this.c_bulanT.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						data = line.gar.split(";");
						sls = parseFloat(data[0]) - parseFloat(data[1]);
						this.e_saldo.setText(floatToNilai(sls));				
					}
				}				
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1);
			this.sg2.clear(1);			
			this.sgG.clear(1);						
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-RRP"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},		
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(8,i));
				}
			}						
			this.e_donor.setText(floatToNilai(totC));
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
								this.nama_report = "server_report_saku3_rra_rptAggDis";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pdrk='" + this.e_nb.getText() + "' ";
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
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg.clear(1); 
			this.sgG.clear(1); 
			setTipeButton(tbAllFalse);											
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	},	
	doHitungGarTW: function(){
		//"Kode Akun","Kode PP","Kode DRK","Saldo Awal","Nilai","Saldo Akhir","Bulan"
		this.sgG.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				nilai = nilaiToFloat(this.sg.cells(8,i));				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sgG.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sgG.cells(0,j) && this.sg.cells(2,i) == this.sgG.cells(1,j) && this.sg.cells(4,i) == this.sgG.cells(2,j) && this.sg.cells(6,i) == this.sgG.cells(6,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sgG.appendData([this.sg.cells(0,i),this.sg.cells(2,i),this.sg.cells(4,i),"0",floatToNilai(nilai),"0",this.sg.cells(6,i)]);
				} 
				else { 
					total = nilaiToFloat(this.sgG.cells(4,idx));
					total = total + nilai;
					this.sgG.setCell(4,idx,total);
				}
			}
		}
		
		var sls = 0;			
		for (var i=0;i < this.sgG.getRowCount();i++){					
			if (this.sgG.rowValid(i)){				
				var data = this.dbLib.getDataProvider("select fn_saldotwdrk('"+this.app._lokasi+"','"+this.sgG.cells(0,i)+"','"+this.sgG.cells(1,i)+"','"+this.sgG.cells(2,i)+"','"+this.e_periode.getText().substr(0,4)+this.sgG.cells(6,i)+"','"+this.e_nb.getText()+"') as gar ",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.sgG.cells(3,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sgG.cells(4,i));
					this.sgG.cells(5,i,floatToNilai(sls));
				}
			}
		}
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 4 || col == 6) && (this.sg.cells(6,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var pp = this.dataPP.get(sender.cells(2,row));
				if (pp) sender.cells(3,row,pp);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		

		if (col == 4) {
			if (sender.cells(4,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and b.kode_drk = '"+sender.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(5,row,line.nama);
					else {
						if (!isAda) sender.cells(5,row,"-");
						else {
							sender.cells(4,row,"");
							sender.cells(5,row,"");
						}
					}
				}
			}
		}	


		if (col == 0 || col == 2 || col == 4 || col == 6) {
			if (sender.cells(0,row) != "" && sender.cells(2,row) != "" && sender.cells(4,row) != "" && sender.cells(6,row) != "") {
				var totSeb = 0;
				for (var j=0; j < this.sg.getRowCount();j++){
					if (j < row && sender.cells(0,row) == this.sg.cells(0,j) && sender.cells(2,row) == this.sg.cells(2,j) && sender.cells(4,row) == this.sg.cells(4,j) && sender.cells(6,row) == this.sg.cells(6,j)) {
						totSeb += nilaiToFloat(this.sg.cells(8,j));
					}
				}												
				var data = this.dbLib.getDataProvider("select fn_saldotwdrk('"+this.app._lokasi+"','"+this.sg.cells(0,row)+"','"+this.sg.cells(2,row)+"','"+this.sg.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(6,row)+"','"+this.e_nb.getText()+"') as gar ",true);								
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					sls = sls - totSeb;
					this.sg.cells(7,row,floatToNilai(sls));				
				}						
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mata Anggaran",sender,undefined, 
								"select kode_akun,nama    from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
								"select count(kode_akun)  from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
								["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 												  
								"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",
								"select count(a.kode_pp)  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",						
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
						
				}	
				if (col == 4){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}	
});
