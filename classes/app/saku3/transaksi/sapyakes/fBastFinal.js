window.app_saku3_transaksi_sapyakes_fBastFinal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fBastFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fBastFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Piutang Kesehatan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Lok Tujuan","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"Akun Ttp/Beban", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});			
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,23,220,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2});
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[790,23,200,20],caption:"Sts Akun Piutang",items:["LIVE","TEMP"], readOnly:true,tag:2});
		
		
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,202,20],caption:"Total Mutasi", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this.pc2.childPage[0],{bound:[570,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[660,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[700,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,232], childPage:["Daftar Approve Piutang","Jurnal"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,		            
					colTitle:["Status","Lokasi","No Bukti","Periode","Keterangan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,350,80,150,70,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Atensi"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
					
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
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi <> '00' and kode_pp in ('992000','993000','022000','032000') ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._kodeLokasiKonsol+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun ",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SAPPH')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];										
					if (line.kode_spro == "SAPPH") this.akunTemp = line.flag;							
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fBastFinal.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fBastFinal.implement({
	doJurnal:function(sender){				
		this.sg2.clear(0); 		
		var nobukti = "";
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				nobukti += ",'"+this.sg.cells(2,i)+"'";
			}
		}		
		nobukti = nobukti.substr(1);		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";
		
		var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis,a.atensi "+
					"from "+
					"( "+					
							"select 'SLSPIUBP' as jenis,a.kode_lokasi,case b.jenis "+
							"		 	when 'PEGAWAI' then c.akun_bp when 'GROUP' then c.akun_ap "+
							"	    end as kode_akun,  "+
							"	    'C' as dc, sum(a.nilai) as nilai,b.kode_sap as atensi  "+
							"from yk_bill_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"         inner join yk_produk c on a.kode_produk = c.kode_produk  "+
							"where b.jenis in ('PEGAWAI','GROUP') and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+							
		                    "group by a.kode_lokasi,case b.jenis "+
							"		 	when 'PEGAWAI' then c.akun_bp when 'GROUP' then c.akun_ap "+							
							"	    end ,b.kode_sap "+
							"union all "+
							
							//KUNJ
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi, case b.jenis "+
							"			when 'PEGAWAI' then c.akun_pku when 'GROUP' then c.akun_pap "+
							"		end as kode_akun,  "+
							"	   'C' as dc, sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,b.kode_sap as atensi "+
							"from yk_billkunj_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"         inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where b.jenis in ('PEGAWAI','GROUP') and a.umum+a.gigi+a.kbia+a.matkes<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+							
							"group by  a.kode_lokasi,c.akun_pku,b.kode_sap, "+
							"		   case b.jenis "+
							"		   when 'PEGAWAI' then c.akun_pku when 'GROUP' then c.akun_pap "+
							"		end "+
							"union all "+
							
							"select 'SLSPIUCS' as jenis,a.kode_lokasi,c.akun_piucs as kode_akun,  "+
							"	   'D' as dc, sum(a.cs) as nilai,b.kode_sap as atensi "+
							"from yk_billkunj_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"		  inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where b.jenis in ('PEGAWAI','GROUP') and a.cs<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+							
							"group by  a.kode_lokasi,c.akun_piucs,b.kode_sap "+														
											
					") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun ";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				
				var akunTemp = line.kode_akun;
				var atensi = line.atensi;
				if (this.c_status.getText() == "TEMP") {
					atensi = "-";
					if (akunTemp.substr(0,1)=="1") {	
						var data2 = this.dbLib.getDataProvider("select kode_sap from sap_mapakun where kode_akun = '"+line.kode_akun+"'",true);
						if (typeof data2 == "object"){
							var line2 = data2.rs.rows[0];							
							if (line2 != undefined){								
								akunTemp = line2.kode_sap;																							
							}					
						}
					}
				}				
									
				this.sg2.appendData([akunTemp,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),"900000001",atensi]);
			}
		}
		
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);				
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from takterima_m where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takterima_j where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_bast_m set progress='0',no_kirim='-',no_terima='-' where no_terima='"+this.e_nb.getText()+"'");
					
						sql.add("delete from glsap where no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					}
										
					sql.add("insert into takterima_m(no_terima,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,tgl_input,nik_user,kode_lokkirim,no_kirim,no_app,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TTAPP','TAKPIUAPP','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F','-','"+this.cb_titip.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','"+this.e_nb.getText()+"','-','0')");										
					sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','TTAPP','TITIP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					
					
					var ppLawan = this.cb_lokasi.getText()+"1000";
					if (this.sg2.getRowValidCount() > 0){
						var j=0;
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
							    j = i+1;
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(7,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+ppLawan+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','TTAPP','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){								
								sql.add("update yk_bast_m set progress='2',no_kirim='"+this.e_nb.getText()+"',no_terima='"+this.e_nb.getText()+"' where no_selesai='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
							
							}
						}
					}
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap, kode_rek,no_payment,paymetod) "+
							"select no_terima+no_dokumen,no_urut,kode_lokasi,'TPIU',jenis,no_terima,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"',no_dokumen,'-','-','-','-','-','-' ,'-','-','-' "+
							"from takterima_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_terima='"+this.e_nb.getText()+"'");

					if (this.c_status.getText() == "LIVE") {
						sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
								"select no_bukti,999,kode_lokasi,modul,'TEMP',no_dokumen,tanggal,'"+this.akunTemp+"',case dc when 'D' then 'C' else 'D' end,sum(nilai),'Temporary Account',kode_pp,periode,kode_drk,kode_curr,kurs,sum(nilai_curr),getdate(),nik_user,'-',kode_proyek,kode_task,'-',kode_lokarea,nik,no_doksap,'-','-','-' "+
								"from glsap "+
								"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_dokumen='"+this.e_nb.getText()+"' "+
								"group by "+
								"no_bukti,kode_lokasi,modul,no_dokumen,tanggal,case dc when 'D' then 'C' else 'D' end,kode_pp,periode,kode_drk,kode_curr,kurs,nik_user,kode_proyek,kode_task,kode_lokarea,nik,no_doksap ");					
					}
					
					//update spesial gl utk cust dan vendor
					sql.add("update a set a.kode_task = b.spe_gl "+
							"from glsap a inner join sap_spe_gl b on a.kode_cust=b.kode_mitra and a.kode_akun=b.kode_akun and b.jenis='CUST' "+
							"where a.no_dokumen='"+this.e_nb.getText()+"'");
							
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
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.bTampil.hide();
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
					sql.add("delete from takterima_m where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takterima_j where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_bast_m set progress='0',no_kirim='-',no_terima='-' where no_terima='"+this.e_nb.getText()+"'");
					
					sql.add("delete from glsap where no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 
				this.e_nilai.setText("0");	
				this.bTampil.show();			
			}			
			if (sender == this.i_gen) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TTPIU"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.stsSimpan = 1;
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}
			if (sender == this.i_appAll) {
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							this.sg.cells(0,i,"APP");
						}
					}
				}
				this.sg.validasi();
			}
		}
	},
	doChange:function(sender){
		/*
		var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.cb_lokasi.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
		*/
	},			
	doLoadData:function(sender){				
		var strSQL = "select a.no_selesai,a.kode_lokasi,a.periode,a.keterangan,isnull(b.nilai,0)+isnull(c.kunj,0) as nilai "+
					 "	from yk_bast_m a "+
					 "left join ( "+
					 "			select no_selesai,kode_lokasi,sum(nilai) as nilai "+
					 "			from yk_bill_d "+
					 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) b on a.no_selesai=b.no_selesai and a.kode_lokasi=b.kode_lokasi "+
					 "left join ( "+
					 "			select no_selesai,kode_lokasi,sum(umum+gigi+kbia+matkes-cs) as kunj "+
					 "			from yk_billkunj_d "+
					 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) c on a.no_selesai=c.no_selesai and a.kode_lokasi=c.kode_lokasi "+
					 "	where a.kode_lokasi='"+this.cb_lokasi.getText()+"' and a.modul in ('PEGAWAI','GROUP') and a.progress ='0' and a.kode_loktuj='"+this.app._lokasi+"' and a.periode>='201601'";// and a.periode>='201606'
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData(["INPROG",line.kode_lokasi,line.no_selesai,line.periode,line.keterangan,floatToNilai(line.nilai)]);
			}
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.cells(0,row) != "")) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg.cells(5,i));
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
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_terima='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.bTampil.show();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.kode_lokkirim,a.no_dokumen,a.keterangan,a.nilai "+
		             "from takterima_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'TTAPP' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_terima,line.tgl,line.kode_lokkirim,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.bTampil.hide();
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_dokumen,tanggal,nik_setuju,no_link as akun_titip,kode_lokkirim "+
							 "from takterima_m "+							 
							 "where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.cb_app.setText(line.nik_setuju);												
						this.cb_titip.setText(line.akun_titip);	
						this.cb_lokasi.setText(line.kode_lokkirim);												
					}
				}								
				var strSQL = "select a.no_selesai,a.kode_lokasi,a.periode,a.keterangan,isnull(b.nilai,0)+isnull(c.kunj,0) as nilai "+
							 "	from yk_bast_m a "+
							 "left join ( "+
							 "			select no_selesai,kode_lokasi,sum(nilai) as nilai "+
							 "			from yk_bill_d "+
							 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) b on a.no_selesai=b.no_selesai and a.kode_lokasi=b.kode_lokasi "+
							 "left join ( "+
							 "			select no_selesai,kode_lokasi,sum(umum+gigi+kbia+matkes-cs) as kunj "+
							 "			from yk_billkunj_d "+
							 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) c on a.no_selesai=c.no_selesai and a.kode_lokasi=c.kode_lokasi "+
							 "	where a.no_terima='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.kode_lokasi,line.no_selesai,line.periode,line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,a.no_dokumen "+
							"from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis <> 'TITIP' and a.no_terima = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.no_dokumen]);
					}
				} else this.sg2.clear(1);				
				
				
			}									
		} catch(e) {alert(e);}
	}	
});