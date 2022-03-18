window.app_saku3_transaksi_yakes21_ifund_fKbIFClose = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_ifund_fKbIFClose.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_ifund_fKbIFClose";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Penutupan Imprest Fund / Panjar", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Transaksi","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai","Modul","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,80,100,300,100,70,100]],
					colFormat:[[4,6],[cfNilai,cfButton]],			
					readOnly:true, click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
	
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis",items:["BM","CL"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});		
		
		this.cb_reim = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Close", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});							
		this.cb_nik = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK IF - Panjar", readOnly:true, tag:1,change:[this,"doChange"]});							
		this.cb_akunif = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun IF - Panjar",  readOnly:true, tag:1});							
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Nilai IF - Panjar", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_akunkb = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});							
		this.e_nitutup = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Ni. Kas Penutupan", tag:1, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,258], childPage:["Item Reimburse"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
					colTitle:["Kode MTA","Nama MTA","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readOnly:true,					
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_akunif.setSQL("select a.kode_akun, a.nama from masakun a  where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
								  
			this.c_jenis.setText("BM");
			this.isiCBReim();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_ifund_fKbIFClose.extend(window.childForm);
window.app_saku3_transaksi_yakes21_ifund_fKbIFClose.implement({	
	isiCBReim: function() {
		this.cb_reim.setSQL(
			"select a.no_reim, a.keterangan "+
			"from if_reim_m a inner join pbh_pb_m b on a.no_reim=b.no_pb "+
			"where a.periode <='"+this.e_periode.getText()+"' and a.modul='IFCLOSE' and a.no_kas='-' and b.progress='8' "+
			"union "+
			"select a.no_ptg, a.keterangan "+
			"from panjarptg2_m a inner join pbh_pb_m b on a.no_ptg=b.no_pb "+
			"where a.periode <='"+this.e_periode.getText()+"' and a.no_final='-' and b.progress='8' "
			,["no_reim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data IF Close",true);
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
			if (this.stsSimpan == 1) {
				//CL ---> plus-plos gak ada uang kembali
				if (this.e_nitutup.getText() == "0") this.c_jenis.setText("CL"); 
				else this.c_jenis.setText("BM");
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			}

			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();			
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						if (this.modul == "IFCLOSE") {
							sql.add("update if_reim_m set no_kas='-' where modul='IFCLOSE' and no_reim='"+this.cb_reim.getText()+"' and no_kas='"+this.e_nb.getText()+"'");		
							sql.add("update pbh_pb_m set progress='8',no_dokumen='-' where modul='IFCLOSE' and no_pb='"+this.cb_reim.getText()+"'");		
						}
						if (this.modul == "PJPTG") {
							sql.add("update panjarptg2_m set progress='1', no_final='-' where no_ptg='"+this.cb_reim.getText()+"' and no_final='"+this.e_nb.getText()+"'");								
							sql.add("update pbh_pb_m set progress='8',no_dokumen='-' where no_pb='"+this.cb_reim.getText()+"'");		
						}
					}
					
					if (this.modul == "IFCLOSE") {
						sql.add("update if_reim_m set no_kas='"+this.e_nb.getText()+"' where modul='IFCLOSE' and no_reim='"+this.cb_reim.getText()+"' and no_kas='-'");		
						sql.add("update pbh_pb_m set progress='9',no_dokumen='"+this.e_nb.getText()+"' where modul='IFCLOSE' and no_pb='"+this.cb_reim.getText()+"'");

						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_reim.getText()+"','-','"+this.cb_akunkb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.ppIF+"','KBIFCLOSE','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nitutup.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");									
						
						if (this.e_nitutup.getText()!="0") {		
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_reim.getText()+"','"+this.dp_d1.getDateString()+"',888,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nitutup.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBIFCLOSE','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");										
						}
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
								"select '"+this.e_nb.getText()+"','"+this.cb_reim.getText()+"','"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-','-','"+this.app._lokasi+"','KBIFCLOSE',jenis,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
								"from pbh_pb_j "+
								"where no_pb='"+this.cb_reim.getText()+"'");
					}
					if (this.modul == "PJPTG") {
						sql.add("update panjarptg2_m set progress='2',no_final='"+this.e_nb.getText()+"' where no_ptg='"+this.cb_reim.getText()+"' and no_final='-'");		
						sql.add("update pbh_pb_m set progress='9',no_dokumen='"+this.e_nb.getText()+"' where no_pb='"+this.cb_reim.getText()+"'");

						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_reim.getText()+"','-','"+this.cb_akunkb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.ppIF+"','KBPJCLOSE','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nitutup.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");									

						if (this.e_nitutup.getText()!="0") {
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_reim.getText()+"','"+this.dp_d1.getDateString()+"',888,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nitutup.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPJCLOSE','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");										
						}
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
								"select '"+this.e_nb.getText()+"','"+this.cb_reim.getText()+"','"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-','-','"+this.app._lokasi+"','KBPJCLOSE',jenis,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
								"from pbh_pb_j "+
								"where no_pb='"+this.cb_reim.getText()+"'");
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
					this.isiCBReim();
					this.sg1.clear(1);
					this.sg3.clear(1);								
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";	
				if (this.e_nitutup.getText() != "0" && this.cb_akunkb.getText()=="-") {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak valid.");
					return false;						
				}	
				if (nilaiToFloat(this.e_nitutup.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai KB tidak boleh kurang dari nol.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();

					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					if (this.modul == "IFCLOSE") {
						sql.add("update if_reim_m set no_kas='-' where modul='IFCLOSE' and no_reim='"+this.cb_reim.getText()+"' and no_kas='"+this.e_nb.getText()+"'");		
						sql.add("update pbh_pb_m set progress='8',no_dokumen='-' where modul='IFCLOSE' and no_pb='"+this.cb_reim.getText()+"'");		
					}
					if (this.modul == "PJPTG") {
						sql.add("update panjarptg2_m set progress='1', no_final='-' where no_ptg='"+this.cb_reim.getText()+"' and no_final='"+this.e_nb.getText()+"'");								
						sql.add("update pbh_pb_m set progress='8',no_dokumen='-' where no_pb='"+this.cb_reim.getText()+"'");		
					}

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}		
	},
	doSelectDate: function(sender, y,m,d){		
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		
		if (this.stsSimpan==1) {
			this.isiCBReim();
			this.doClick();			
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText() != "") {
			if (this.stsSimpan == 0) {								
				this.e_nilai.setText("0");		
				this.sg1.clear(1);
				this.sg3.clear(1);
				this.isiCBReim();										
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){
		try {													
			if (sender == this.cb_reim && this.cb_reim.getText()!="") {
				var strSQL = "select b.nik,b.akun_if,b.nilai,a.akun_hutang,b.kode_pp,'IFCLOSE' as modul "+
							 "from if_reim_m a "+
							 "inner join if_nik b on a.no_dokumen=b.no_kas  "+
							 "where a.no_reim='"+this.cb_reim.getText()+"' "+
							 "union "+
							 "select b.nik_buat as nik,b.akun_panjar as akun_if,b.nilai,'-' as akun_hutang,b.kode_pp,'PJPTG' as modul "+
							 "from panjarptg2_m a "+
							 "inner join panjar2_m b on a.no_panjar=b.no_panjar  "+
							 "where a.no_ptg='"+this.cb_reim.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.cb_nik.setText(line.nik);
						this.cb_akunif.setText(line.akun_if);	
						this.e_nilai.setText(floatToNilai(line.nilai));	
						this.akunHutangIF = line.akun_hutang;	
						this.ppIF = line.kode_pp;		
						this.modul = line.modul.toUpperCase();				
					} 
				}

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from pbh_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi<>'00' "+	
							"     			 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+	
							"where a.no_pb = '"+this.cb_reim.getText()+"' order by a.dc desc,a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg1.clear(1);		
				this.sg1.validasi();
			}

			if (sender == this.e_nitutup && this.stsSimpan==1) { 
				if (this.e_nitutup.getText() == "0") {
					//this.c_jenis.setText("CL");
					this.cb_akunkb.setSQL("select '-' as kode_akun, '-' as nama ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
					this.cb_akunkb.setText("-","-");
				}
				else {
					this.c_jenis.setText("BM");
					//this.cb_akunkb.setText("","");
					this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								  		  "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);							
				}
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			}
		}
		catch(e) {alert(e);}
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "" && this.sg1.cells(0,i) != this.cb_akunif.getText()){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			this.e_nitutup.setText(floatToNilai(totC - totD + nilaiToFloat(this.e_nilai.getText())));			
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
								//this.nama_report="server_report_saku3_pbh_rptPengajuanPB";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
			setTipeButton(tbSimpan);
			this.isiCBReim();
			this.sg1.clear(1);
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.modul,a.nilai "+
		             "from kas_m a "+			 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('KBIFCLOSE','KBPJCLOSE') and a.posted ='F' "+
					 "order by a.tanggal";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.modul,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
		this.pc2.setActivePage(this.pc2.childPage[1]);																		
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				if (this.sg3.cells(5,row) == "KBIFCLOSE") {
					var strSQL = "select a.tanggal,a.jenis,a.keterangan,a.akun_kb,b.no_reim "+
								"from kas_m a inner join if_reim_m b on a.no_kas=b.no_kas "+
								"where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.dp_d1.setText(line.tanggal);					
							this.c_jenis.setText(line.jenis);	
							this.e_ket.setText(line.keterangan);	

							
							this.cb_akunkb.setText(line.akun_kb);	
							
							this.cb_reim.setSQL("select no_reim, keterangan from if_reim_m where no_reim='"+line.no_reim+"'",["no_reim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data IF",true);
							this.cb_reim.setText(line.no_reim);
						}
					}
				}
				
				if (this.sg3.cells(5,row) == "KBPJCLOSE") {
					var strSQL = "select a.tanggal,a.jenis,a.keterangan,a.akun_kb,b.no_ptg "+
								"from kas_m a inner join panjarptg2_m b on a.no_kas=b.no_final "+
								"where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.dp_d1.setText(line.tanggal);					
							this.c_jenis.setText(line.jenis);	
							this.e_ket.setText(line.keterangan);	
							
							this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								  		  		  "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);							
							this.cb_akunkb.setText(line.akun_kb);	
							
							this.cb_reim.setSQL("select no_ptg, keterangan from panjarptg2_m where no_ptg='"+line.no_ptg+"'",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Data PJ",true);
							this.cb_reim.setText(line.no_ptg);
						}
					}
				}

			}
		} catch(e) {alert(e);}		
	}
});