window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fUsulPoltekE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Usulan Anggaran (Poltek): Edit", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});
		this.cb_akun = new saiCBBL(this,{bound:[20,17,200,20],caption:"Kode MTA", multiSelection:false, maxLength:10, tag:2});
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this,{bound:[700,18,220,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new panel(this,{bound:[20,23,900,350],caption:"Daftar Usulan Anggaran"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:27,tag:0,
		            colTitle:["Rincian Kegiatan","Tarif"
					          ,"Jan Vol","Jan Jml","Feb Vol","Feb Jml","Mar Vol","Mar Jml"  
							  ,"Apr Vol","Apr Jml","Mei Vol","Mei Jml","Jun Vol","Jun Jml"
							  ,"Jul Vol","Jul Jml","Agu Vol","Agu Jml","Sep Vol","Sep Jml"
							  ,"Okt Vol","Okt Jml","Nop Vol","Nop Jml","Des Vol","Des Jml"
					          ,"Total"],
					colWidth:[[26, 25,24,23,22,21,20, 19,18,17,16,15,14 ,13,12,11,10,9,8 ,7,6,5,4,3,2 ,1,0],[ 100  ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,250]],					
					columnReadOnly:[true,[3,5,7,9,11,13,15,17,19,21,23,25,26],[0,1,2,4,6,8,10,12,14,16,18,20,22,24]],					
					colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");						
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekE.implement({	
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
					sql.add("delete from agg_usul_m where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_usul_j where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_d where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='UMUM'");
										
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"01',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"02',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+")");							
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"03',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"04',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"05',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"06',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(12,i))+","+nilaiToFloat(this.sg.cells(13,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"07',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(14,i))+","+nilaiToFloat(this.sg.cells(15,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"08',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(16,i))+","+nilaiToFloat(this.sg.cells(17,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"09',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(18,i))+","+nilaiToFloat(this.sg.cells(19,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"10',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(20,i))+","+nilaiToFloat(this.sg.cells(21,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"11',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(22,i))+","+nilaiToFloat(this.sg.cells(23,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','-','"+this.sg.cells(0,i)+"','-','"+this.c_tahun.getText()+"12',"+nilaiToFloat(this.sg.cells(1,i))+",1,"+nilaiToFloat(this.sg.cells(24,i))+","+nilaiToFloat(this.sg.cells(25,i))+")");
										
							}
						}
					}
										
					sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
							"select no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,'UMUM' "+
							"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :									
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :						
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from agg_usul_m where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_usul_j where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from agg_d where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='UMUM'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break;						
		}
	},
	doSelectDate: function(sender, y,m,d){		
		this.c_tahun.setText(y+1);		
	},
	doChange:function(sender){
		if (sender == this.c_tahun && this.c_tahun.getText()!="") {
			this.cb_drk.setSQL("select kode_drk,nama from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			this.e_nb.setSQL("select no_usul, keterangan from agg_usul_m where kode_akun<>'-' and kode_drk<>'-' and no_jurnal='-' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_usul","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select tanggal,tahun,keterangan,nik_app,kode_pp,kode_akun,kode_drk from agg_usul_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);
					this.cb_pp.setText(line.kode_pp);
					this.cb_akun.setText(line.kode_akun);
					this.cb_drk.setText(line.kode_drk);
					this.cb_app.setText(line.nik_app);
				} 
			}			
			var strSQL = "select distinct a.nu,a.keterangan,a.tarif "+
				",isnull(janvol,0) as janvol,isnull(jantot,0) as jantot "+
				",isnull(febvol,0) as febvol,isnull(febtot,0) as febtot "+
				",isnull(marvol,0) as marvol,isnull(martot,0) as martot "+
				",isnull(aprvol,0) as aprvol,isnull(aprtot,0) as aprtot "+
				",isnull(meivol,0) as meivol,isnull(meitot,0) as meitot "+
				",isnull(junvol,0) as junvol,isnull(juntot,0) as juntot "+
				",isnull(julvol,0) as julvol,isnull(jultot,0) as jultot "+
				",isnull(aguvol,0) as aguvol,isnull(agutot,0) as agutot "+
				",isnull(sepvol,0) as sepvol,isnull(septot,0) as septot "+
				",isnull(oktvol,0) as oktvol,isnull(okttot,0) as okttot "+
				",isnull(nopvol,0) as nopvol,isnull(noptot,0) as noptot "+
				",isnull(desvol,0) as desvol,isnull(destot,0) as destot "+
				",isnull(jantot,0)+isnull(febtot,0)+isnull(martot,0)+isnull(aprtot,0)+isnull(meitot,0)+isnull(juntot,0)+isnull(jultot,0)+isnull(agutot,0)+isnull(septot,0)+isnull(okttot,0)+isnull(noptot,0)+isnull(destot,0) as total "+
				"from agg_usul_j a  "+
				"left join (  "+
				"select nu  "+
				",sum(case when substring(periode,5,2) = '01' then vol else 0 end) as janvol  "+
				",sum(case when substring(periode,5,2) = '01' then total else 0 end) as jantot "+
				",sum(case when substring(periode,5,2) = '02' then vol else 0 end) as febvol "+
				",sum(case when substring(periode,5,2) = '02' then total else 0 end) as febtot "+
				",sum(case when substring(periode,5,2) = '03' then vol else 0 end) as marvol "+
				",sum(case when substring(periode,5,2) = '03' then total else 0 end) as martot "+
				",sum(case when substring(periode,5,2) = '04' then vol else 0 end) as aprvol "+
				",sum(case when substring(periode,5,2) = '04' then total else 0 end) as aprtot "+
				",sum(case when substring(periode,5,2) = '05' then vol else 0 end) as meivol "+
				",sum(case when substring(periode,5,2) = '05' then total else 0 end) as meitot "+
				",sum(case when substring(periode,5,2) = '06' then vol else 0 end) as junvol "+
				",sum(case when substring(periode,5,2) = '06' then total else 0 end) as juntot "+
				",sum(case when substring(periode,5,2) = '07' then vol else 0 end) as julvol "+
				",sum(case when substring(periode,5,2) = '07' then total else 0 end) as jultot "+
				",sum(case when substring(periode,5,2) = '08' then vol else 0 end) as aguvol "+
				",sum(case when substring(periode,5,2) = '08' then total else 0 end) as agutot "+
				",sum(case when substring(periode,5,2) = '09' then vol else 0 end) as sepvol "+
				",sum(case when substring(periode,5,2) = '09' then total else 0 end) as septot "+
				",sum(case when substring(periode,5,2) = '10' then vol else 0 end) as oktvol "+
				",sum(case when substring(periode,5,2) = '10' then total else 0 end) as okttot "+
				",sum(case when substring(periode,5,2) = '11' then vol else 0 end) as nopvol "+
				",sum(case when substring(periode,5,2) = '11' then total else 0 end) as noptot "+
				",sum(case when substring(periode,5,2) = '12' then vol else 0 end) as desvol "+
				",sum(case when substring(periode,5,2) = '12' then total else 0 end) as destot "+
				"from agg_usul_j  "+
				"where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by nu) b on a.nu=b.nu  "+
				"where a.no_usul = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.keterangan,floatToNilai(line.tarif),floatToNilai(line.janvol),floatToNilai(line.jantot),floatToNilai(line.febvol),floatToNilai(line.febtot),floatToNilai(line.marvol),floatToNilai(line.martot),  
																				 floatToNilai(line.aprvol),floatToNilai(line.aprtot),floatToNilai(line.meivol),floatToNilai(line.meitot),floatToNilai(line.junvol),floatToNilai(line.juntot),  	
																				 floatToNilai(line.julvol),floatToNilai(line.jultot),floatToNilai(line.aguvol),floatToNilai(line.agutot),floatToNilai(line.sepvol),floatToNilai(line.septot),  
																				 floatToNilai(line.oktvol),floatToNilai(line.okttot),floatToNilai(line.nopvol),floatToNilai(line.noptot),floatToNilai(line.desvol),floatToNilai(line.destot),
																				 floatToNilai(line.total)]);
				}
				sg.validasi();
			} else this.sg.clear(1);
		}
	},		
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(26,i) != ""){
					tot += nilaiToFloat(this.sg.cells(26,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_ppbs_rptAggUsul";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_usul='"+this.e_nb.getText()+"' ";
								this.filter2 =this.c_tahun.getText();
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
			this.sg.clear(1); 			
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col ==  1 || col ==  2 || col ==  4 || col ==  6 || col ==  8 || col == 10 || col == 12 || col == 14 || col == 16 || col == 18 || col == 20 || col == 22 || col == 24 ) {			
			if (sender.cells(1,row) != "" && sender.cells(2,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(2,row));
				sender.cells(3,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(4,row) != "") {	
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(4,row));
				sender.cells(5,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(6,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(6,row));
				sender.cells(7,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(8,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(8,row));
				sender.cells(9,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(10,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(10,row));
				sender.cells(11,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(12,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(12,row));
				sender.cells(13,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(14,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(14,row));
				sender.cells(15,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(16,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(16,row));
				sender.cells(17,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(18,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(18,row));
				sender.cells(19,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(20,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(20,row));
				sender.cells(21,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(22,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(22,row));
				sender.cells(23,row,floatToNilai(jml));
			}
			if (sender.cells(1,row) != "" && sender.cells(24,row) != "") {
				var jml = nilaiToFloat(sender.cells(1,row)) * nilaiToFloat(sender.cells(24,row));
				sender.cells(25,row,floatToNilai(jml));
			}
			if (sender.cells(3,row) != "" && sender.cells(5,row) != "" && sender.cells(7,row) != "" && sender.cells(9,row) != "" && 
			   sender.cells(11,row) != "" && sender.cells(13,row) != "" && sender.cells(15,row) != "" && sender.cells(17,row) != "" && sender.cells(19,row) != "" && 
			   sender.cells(21,row) != "" && sender.cells(23,row) != "" && sender.cells(25,row) != "") {
				var total = nilaiToFloat(sender.cells(3,row)) + nilaiToFloat(sender.cells(5,row)) + nilaiToFloat(sender.cells(7,row)) + nilaiToFloat(sender.cells(9,row)) + 
				            nilaiToFloat(sender.cells(11,row)) + nilaiToFloat(sender.cells(13,row)) + nilaiToFloat(sender.cells(15,row)) + nilaiToFloat(sender.cells(17,row)) + nilaiToFloat(sender.cells(19,row)) + 
							nilaiToFloat(sender.cells(21,row)) + nilaiToFloat(sender.cells(23,row)) + nilaiToFloat(sender.cells(25,row));
				sender.cells(26,row,floatToNilai(total));	
			}	
			sender.validasi();
		}
	}
});