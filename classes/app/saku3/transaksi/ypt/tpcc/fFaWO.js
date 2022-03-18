window.app_saku3_transaksi_ypt_tpcc_fFaWO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_tpcc_fFaWO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_tpcc_fFaWO";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penghapusan Aktiva Tetap", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
					colTitle:["No Bukti","Tanggal","No FA","Deskripsi"],
					colWidth:[[3,2,1,0],[300,200,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_beban = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Bbn Penghapusan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"DRK Penghapusan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_fa = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,250,20],caption:"No Aktiva Tetap", multiSelection:false, maxLength:10, change:[this,"doChange"]});		
		this.e_seri = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,432,20],caption:"Nomor Seri",readOnly:true});
		this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[460,19,452,20],caption:"Tipe",readOnly:true});
		this.e_merk = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,432,20],caption:"Merk",readOnly:true});
		this.e_pp = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[460,17,452,20],caption:"PP",readOnly:true});		
		this.e_hp = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,202,20],caption:"Nilai Perolehan", readOnly: true, tag:3, tipeText:ttNilai, text:"0"});		
		this.e_residu = new saiLabelEdit(this.pc2.childPage[0],{bound:[250,18,202,20],caption:"Nilai Residu",readOnly: true,  tag:3, tipeText:ttNilai, text:"0"});		
		this.e_akun = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[460,18,452,20],caption:"Akun Aktap",readOnly:true, tag:3});
		this.e_totSusut = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,202,20],caption:"Total Penyusutan", readOnly: true, tag:3, tipeText:ttNilai, text:"0"});		
		this.e_buku = new saiLabelEdit(this.pc2.childPage[0],{bound:[250,20,202,20],caption:"Nilai Buku", tag:4, readOnly: true, tipeText:ttNilai, text:"0"});				
		this.e_ap = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[460,20,452,20],caption:"Akun Akumulasi", tag:3, readOnly:true});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
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
			
			this.cb_beban.setSQL("select a.kode_akun, a.nama from masakun a where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);			

			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+
							  "       inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							  "                   from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+							  
							  "       inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
							  "	                from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							  "where a.progress in ('2') and zz.nilai-isnull(tot_susut,0)>=a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
														
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_tpcc_fFaWO.extend(window.childForm);
window.app_saku3_transaksi_ypt_tpcc_fFaWO.implement({
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
			if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fawoapp_m","no_woapp",this.app._lokasi+"-WO"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("update fa_asset set progress = '2' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fawoapp_m where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fawoapp_d where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fawoapp_j where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					sql.add("update fa_asset set progress = 'W' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into fawoapp_m(no_woapp,no_wo,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ap,kode_pp,kode_drk,posted,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_hp.getText())+","+parseNilai(this.e_totSusut.getText())+",'"+this.pp+"','"+this.cb_drk.getText()+"','F','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','"+this.cb_beban.getText()+"','"+this.app._userLog+"',getdate())");					
					sql.add("insert into fawoapp_d(no_woapp,kode_lokasi,no_fa,periode,nilai,nilai_ap,kode_akun,akun_ap,kode_pp,kode_drk,akun_beban) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_fa.getText()+"','"+this.e_periode.getText()+"',"+parseNilai(this.e_hp.getText())+","+parseNilai(this.e_totSusut.getText())+",'"+this.kodeakun+"','"+this.akunap+"','"+this.pp+"','"+this.cb_drk.getText()+"','"+this.cb_beban.getText()+"')");					
					
					var beban = nilaiToFloat(this.e_residu.getText()) + nilaiToFloat(this.e_buku.getText());
					sql.add("insert into fawoapp_j(no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_beban.getText()+"','"+this.e_ket.getText()+"','D',"+beban+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','FAWO','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					sql.add("insert into fawoapp_j(no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunap+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_totSusut.getText())+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','FAWO','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					sql.add("insert into fawoapp_j(no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.kodeakun+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_hp.getText())+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','FAWO','AKTAP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_woapp,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
							"from fawoapp_j where jenis = 'BEBAN' and dc= 'D' and no_woapp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					this.standarLib.clearByTag(this, new Array("0","1","3","4"),this.e_nb);
					this.sg3.clear(1);
					this.doClick();
					this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+
							  "       inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							  "                   from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+							  
							  "       inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
							  "	                from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							  "where a.progress in ('2') and zz.nilai-isnull(tot_susut,0)>=a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
						sql.add("update fa_asset set progress = '2' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fawoapp_m where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fawoapp_d where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fawoapp_j where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);
					}					
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();	
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.cb_drk.setText("","");
			this.cb_beban.setText("","");			
		}
		if (sender == this.cb_beban && this.cb_beban.getText()!="") {					
			this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=substring(b.periode,1,4) and b.kode_akun='"+this.cb_beban.getText()+"' "+
							   "where a.tahun = '"+this.e_periode.getText().substr(0,4)+"' and a.tipe = 'posting' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
		}
		if (sender == this.cb_fa && this.cb_fa.getText()!="") {
			var strSQL = "select a.no_seri,a.merk,a.tipe,zz.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(zz.nilai-a.nilai_residu-isnull(d.tot_susut,0)) as nilai_buku, "+
						 "  b.kode_akun,x.nama as nama_akun,b.akun_deprs,y.nama as nama_deprs,a.kode_pp,c.nama as nama_pp,a.umur "+
						 "from fa_asset a  "+
						 "       inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "                   from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+							  
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
						 "inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi = '"+this.app._lokasi+"' "+
						 "inner join masakun x on b.kode_akun=x.kode_akun and x.kode_lokasi = '"+this.app._lokasi+"' "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and y.kode_lokasi = '"+this.app._lokasi+"' "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_fa='"+this.cb_fa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"; //and a.progress in ('2','L')
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_seri.setText(line.no_seri);
					this.e_tipe.setText(line.tipe);
					this.e_merk.setText(line.merk);
					this.e_pp.setText(line.kode_pp+ " - " + line.nama_pp);
					this.e_akun.setText(line.kode_akun+ " - " + line.nama_akun);
					this.e_ap.setText(line.akun_deprs+ " - " + line.nama_deprs);
					this.e_hp.setText(floatToNilai(line.nilai));
					this.e_residu.setText(floatToNilai(line.nilai_residu));
					this.e_totSusut.setText(floatToNilai(line.tot_susut));
					this.e_buku.setText(floatToNilai(line.nilai_buku));					
					this.akunap = line.akun_deprs;
					this.pp = line.kode_pp;
					this.kodeakun = line.kode_akun;
					this.umur = line.umur;
				}
			} else this.standarLib.clearByTag(this, new Array("3","4"),undefined);
		}
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {
			this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+
							  "       inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							  "                   from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+							  
							  "       inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
							  "	                from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							  "where a.progress in ('2') and zz.nilai-isnull(tot_susut,0)>=a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fawoapp_m","no_woapp",this.app._lokasi+"-WO"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();		
		setTipeButton(tbSimpan);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
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
			this.standarLib.clearByTag(this, new Array("0","1","3","4"),this.e_nb);
			this.sg3.clear(1);			
			this.doClick();
			this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+
							  "       inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							  "                   from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+							  
							  "       inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
							  "	                from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							  "where a.progress in ('2') and zz.nilai-isnull(tot_susut,0)>=a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_woapp,convert(varchar,a.tanggal,103) as tgl,b.no_fa,a.keterangan "+
		             "from fawoapp_m a inner join fawoapp_d b on a.no_woapp=b.no_woapp and a.kode_lokasi=b.kode_lokasi "+
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
			this.sg3.appendData([line.no_woapp,line.tgl,line.no_fa,line.keterangan]); 
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
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+
							  "where a.no_fa='"+this.sg3.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
				this.cb_fa.setText(this.sg3.cells(2,row));	

				var strSQL = "select * from fawoapp_m where no_woapp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_drk.setText(line.kode_drk);
						this.cb_beban.setText(line.no_link);
						this.cb_app.setText(line.nik_setuju);						
					} 
				}			
			}									
		} catch(e) {alert(e);}
	}
});