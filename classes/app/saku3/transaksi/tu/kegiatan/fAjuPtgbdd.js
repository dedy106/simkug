window.app_saku3_transaksi_tu_kegiatan_fAjuPtgbdd = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kegiatan_fAjuPtgbdd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kegiatan_fAjuPtgbdd";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Kegiatan - BDD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,12,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Pengajuan","Uraian","Kegiatan","Nilai"],
					colWidth:[[3,2,1,0],[100,350,300,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode Transaksi",items:["PJPTG"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});				
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK Pemegang",multiSelection:false,change:[this,"doChange"]});
		this.cb_panjar = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"No Panjar",multiSelection:false,change:[this,"doChange"]});
		this.cb_keg = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"ID Kegiatan",change:[this,"doChange"],readOnly:true});
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"MTA",readOnly:true});		
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Saldo Kegiatan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.e_nilaipj = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Nilai Panjar", tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Tot. Pertanggungan", tag:1, tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});
		this.e_user = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,550,20],caption:"User input", maxLength:50});								
		this.e_nilaikb = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Kas Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[2,12,995,235], childPage:["Item Pertanggungan","Catatan Approval"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:0,
		            colTitle:["Kode PP","Nama PP","Nilai Pertangg"],
					colWidth:[[2,1,0],[100,250,100]],					
					columnReadOnly:[true,[0,1],[2]],										
					colFormat:[[2],[cfNilai]],checkItem: true,					
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.e_nover = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"No Verifikasi", tag:9, readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,80],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[1].rearrangeChild(10, 23);		
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;													
				}
			}
			
			//this.cb_nik.setSQL("select distinct a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			//                   "where a.sts_pj='1' and b.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															
			
			var strSQL = "select a.nik,a.nama from karyawan a where a.flag_aktif='1' and  a.kode_lokasi = '"+this.app._lokasi+"'";
			this.cb_nik.setSQL(strSQL,["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															

			
			this.cb_nik.setText(this.app._userLog);
			
			this.e_user.setText(this.app._namaUser);			
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp d on a.nik = d.nik and a.kode_lokasi=d.kode_lokasi "+
							   "where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kegiatan_fAjuPtgbdd.extend(window.childForm);
window.app_saku3_transaksi_tu_kegiatan_fAjuPtgbdd.implement({	
	doChangeCell1: function(sender, col, row){
		if ((col == 2) && (sender.cells(2,row) != "")) sender.validasi();		
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(2,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(2,i));					
				}
			}						
			this.e_total.setText(floatToNilai(totD - totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
						sql.add("update it_aju_m set progress='3', no_ptg='-' where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_multi where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
						sql.add("delete from angg_r where no_bukti = '"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='R-KBAJUDRK'");
					}

					sql.add("update it_aju_m set progress='4', no_ptg='"+this.e_nb.getText()+"' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bukti,'R-KBAJUDRK',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,case dc when 'D' then 'C' else 'D' end,0,nilai "+
							"from angg_r where no_bukti='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,sts_pajak,npajak,form,nik_app, no_ajukeg) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.app._kodePP+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','"+this.cb_nik.getText()+"','"+this.cb_panjar.getText()+"','"+this.e_user.getText()+"','NON',0,'PTGMULTIBD','"+this.cb_app.getText()+"','"+this.cb_keg.getText()+"')");					
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								                           
								sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
										"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.periodeAju+"','"+this.cb_akun.getText()+"','"+this.sg1.cells(0,i)+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+",'BEBAN')");
								
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.sg1.cells(0,i)+"','-','"+this.periodeAju+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.sg1.cells(2,i))+")");
												
							}
						}
					}							
					
					var netto = nilaiToFloat(this.e_nilaikb.getText());
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','-',"+netto+",'-')");
							
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
					this.sg1.clear(1);					
					this.sg.clear(1);
					this.doClick();
				break;
			case "simpan" :			
			case "ubah" :			
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	

				this.sg1.validasi();
				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
					}										
				}	

				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan melebihi Saldo Budget Kegiatan.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilaikb.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan melebihi nilai panjar.");
					return false;						
				}						
				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update it_aju_m set progress='3', no_ptg='-' where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_multi where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
				sql.add("delete from angg_r where no_bukti = '"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='R-KBAJUDRK'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) {
			this.doClick();
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);			
			this.sg.clear(1);
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_nik.setFocus();
		setTipeButton(tbSimpan);
		this.stsSimpan = 1;
	},
	doChange:function(sender){
		try {
			if (sender == this.cb_nik && this.cb_nik.getText()!="") {			
				this.cb_panjar.setSQL("select no_aju,keterangan from it_aju_m where form='PMULTIBDD' and progress='3' and nik_panjar ='"+this.cb_nik.getText()+"' and modul = 'PANJAR' and no_ptg='-' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Panjar",true);
			}
			if (sender == this.cb_panjar && this.cb_panjar.getText()!="") {
				
				var data = this.dbLib.getDataProvider(
					       "select b.nilai as nilai_pj,c.kode_akun,c.periode1, b.no_ajukeg "+
						   "from it_aju_m b "+
						   "                inner join angg_r c on b.no_aju=c.no_bukti and b.kode_lokasi=c.kode_lokasi and c.modul='ITKBAJUDRK' "+						 	  
						   "where b.no_aju='"+this.cb_panjar.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.periodeAju = line.periode1;
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));					
						this.kodeAkun = line.kode_akun;						
						this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_akun='"+this.kodeAkun+"' and kode_lokasi='"+this.app._lokasi+"' union select '-' as kode_akun,'-' as nama",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);																									
						this.cb_akun.setText(line.kode_akun);										
						this.e_ket.setText(this.cb_panjar.rightLabelCaption);

						this.cb_keg.setText(line.no_ajukeg);															
					} 
				}

				if (this.stsSimpan == 1) {
					var data = this.dbLib.getDataProvider("select b.kode_pp,b.nama as nama_pp,a.nilai "+
														"from it_aju_multi a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+														  													  
														"where a.no_aju = '"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg1.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg1.appendData([line.kode_pp,line.nama_pp,floatToNilai(line.nilai)]);
						}
					} else this.sg1.clear(1);											
					this.sg1.validasi();
				}
			}			
			if (sender == this.e_nilaipj || sender == this.e_total) {
				if (this.e_nilaipj.getText()!="" && this.e_total.getText()!="") {
					this.e_nilaikb.setText(floatToNilai(nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_total.getText())));
				}
			}	
			
			if (sender == this.cb_keg && this.cb_keg.getText()!= ""){			
				var data = this.dbLib.getDataProvider(
						"select a.nilai-isnull(b.pakai,0) as saldo "+
						"from keg_aju_m a "+
							"left join (   "+
							"    select no_ajukeg,kode_lokasi,  sum(nilai)  as pakai "+
							"    from it_aju_m where kode_lokasi='"+this.app._lokasi+"' and no_aju <>'"+this.e_nb.getText()+"' "+
							"		  and progress+modul <> '4PANJAR' and no_aju <> '"+this.cb_panjar.getText()+"' "+
							"    group by no_ajukeg,kode_lokasi "+
							" ) b on a.no_aju = b.no_ajukeg and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_aju ='"+this.cb_keg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];																	
					this.e_saldo.setText(floatToNilai(line.saldo));
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptPtgFormTu";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();
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
			this.sg.clear(1);
			this.sg1.clear(1);			
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){			
		/*deny200918
		if (this.app._userStatus == "A") 
			var strSQL = "select a.no_aju, a.keterangan, a.no_ajukeg+' | '+b.keterangan as kegiatan, a.nilai "+
						 "from it_aju_m a "+
						 "inner join keg_aju_m b on a.no_ajukeg=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where a.form = 'PTGMULTIBD' and a.modul='PJPTG' and a.progress in ('A','0','R') and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"'";					 			
		else 
			var strSQL = "select a.no_aju, a.keterangan, a.no_ajukeg+' | '+b.keterangan as kegiatan, a.nilai "+
						 "from it_aju_m a "+
						 "inner join keg_aju_m b on a.no_ajukeg=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "where c.kode_bidang ='" + this.app._kodeBidang + "' and a.form = 'PTGMULTIBD' and a.modul='PANJAR' and a.progress in ('A','0','R') and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"'";					 					
		*/
		var strSQL = "select a.no_aju, a.keterangan, a.no_ajukeg+' | '+b.keterangan as kegiatan, a.nilai "+
					 "from it_aju_m a "+
					 "inner join keg_aju_m b on a.no_ajukeg=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
					 "where a.nik_user='"+this.app._userLog+"' and a.form = 'PTGMULTIBD' and a.modul='PJPTG' and a.progress in ('A','0','R') and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"'";					 			
					 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {		
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg.appendData([line.no_aju,line.keterangan,line.kegiatan,floatToNilai(line.nilai)]); 							
			}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);											
				this.pc1.setActivePage(this.pc1.childPage[0]);		
				
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				
				this.e_nb.setText(this.sg.cells(0,row));		

				var data = this.dbLib.getDataProvider(
					"select a.nik_app,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.nik_panjar,isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.kode_akun,isnull(b.nama,'-') as nama_akun,c.no_aju as no_pj,c.keterangan as ket_pj "+
					"from it_aju_m a inner join it_aju_m c on a.no_aju=c.no_ptg and a.kode_lokasi=c.kode_lokasi "+					   
					"	   left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					   
					"      left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
					"                 from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
					"                 where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"') x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
					"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_app.setText(line.nik_app);
						this.cb_nik.setText(line.nik_panjar);

						this.cb_panjar.setSQL("select no_aju,keterangan from it_aju_m where no_aju ='"+line.no_pj+"' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Panjar",true);
						this.cb_panjar.setText(line.no_pj,line.ket_pj);

						this.cb_akun.setText(line.kode_akun,line.nama_akun);					
						this.e_ket.setText(line.keterangan);
						this.e_total.setText(floatToNilai(line.nilai));	

						this.e_nover.setText(line.no_ver);
						this.e_memo.setText(line.catatan);					
					
						var data = this.dbLib.getDataProvider("select b.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj "+
								"from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by b.periode",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){																			
								this.e_nilaipj.setText(floatToNilai(line.nilai_pj));							
								this.periodeAju = line.periode;
							} 
						}						
						
					} 			
				}

				var data = this.dbLib.getDataProvider("select b.kode_pp,b.nama as nama_pp,a.nilai "+
													  "from it_aju_multi a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+														  													  
													  "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_pp,line.nama_pp,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);											
				this.sg1.validasi();

			}
		} catch(e) {alert(e);}
	}	


	
});