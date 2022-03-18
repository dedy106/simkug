window.app_saku3_transaksi_bangtel_proyek_fReklasBDDvdr = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_proyek_fReklasBDDvdr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_proyek_fReklasBDDvdr";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Penyelesaian BDD by Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","ID Proyek","Nilai"],
					colWidth:[[4,3,2,1,0],[100,150,300,80,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});								
		this.cb_vendor= new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Vendor", multiSelection:false, tag:1});						
		this.cb_akunbdd = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun BDD", readOnly:true, tag:1});						
		this.e_saldobdd = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Saldo BDD", tipeText:ttNilai, text:"0",  readOnly:true});							
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Nilai", tipeText:ttNilai, text:"0",  readOnly:true});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,236], childPage:["Data BDD","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
		            colTitle:["Kode Cab","Nama Cabang","Akun Beban","Nama Akun","Nilai"],
					colWidth:[[4,3,2,1,0],[100,200,80,200,80]],					
					columnReadOnly:[true,[1,3],[0,2,4]],	
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],				
					ellipsClick:[this,"doEllipsClick"],
					colFormat:[[4],[cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			this.cb_akunbdd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Deskripsi"],"and","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_proyek_fReklasBDDvdr.extend(window.childForm);
window.app_saku3_transaksi_bangtel_proyek_fReklasBDDvdr.implement({		
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,4])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from spm_proyek_reklas_m where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_proyek_reklas_d where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_proyek_reklas_j where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}						
					
					sql.add("insert into spm_proyek_reklas_m(no_reklas,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,ref1 ) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','REKLAS','BDD','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','X','"+this.cb_proyek.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into spm_proyek_reklas_d(no_reklas,kode_lokasi,periode,kode_proyek,kode_akun,dc,nilai,kode_pp,kode_vendor) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(0,i)+"','"+this.cb_vendor.getText()+"')");
								
								sql.add("insert into spm_proyek_reklas_j(no_reklas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(0,i)+"','-','"+this.app._lokasi+"','REKLAS','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}			
					sql.add("insert into spm_proyek_reklas_j(no_reklas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akunbdd.getText()+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','REKLAS','BDD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
											
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(5,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(5,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(5,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','REKLASBDD','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(4,i))+","+nilai+")");
							}
						}
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) "+
							"select no_reklas,kode_lokasi,tgl_input,nik_user,periode,'AR',modul,'F',0,0,kode_pp,tanggal,no_dokumen,keterangan,'IDR',1,nilai,0,0,'-','-','-','-','-','-','-','-','-' "+
							"from spm_proyek_reklas_m "+
							"where no_reklas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_reklas,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,no_urut,kode_akun,dc,nilai,nilai,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from spm_proyek_reklas_j "+
							"where no_reklas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
					this.stsSimpan = 1;					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";												
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
				this.doHitungGar();							
				for (var i=0;i < this.sg2.getRowCount();i++){
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i)) {
							if (nilaiToFloat(this.sg2.cells(5,i))>0 && nilaiToFloat(this.sg2.cells(4,i)) < nilaiToFloat(this.sg2.cells(5,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}
						}
					}
				}					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Reklas tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldobdd.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Reklas tidak boleh melebihi Saldo BDD.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
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
					sql.add("delete from spm_proyek_reklas_m where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_proyek_reklas_d where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_proyek_reklas_j where no_reklas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			this.cb_vendor.setSQL("select distinct a.kode_vendor,a.nama from vendor a "+
								  "inner join yk_pb_d b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								  "inner join yk_pb_m c on c.no_pb=b.no_pb and c.kode_lokasi=b.kode_lokasi and c.modul='PBPR' "+
								  "where c.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);			

			var strSQL = "select d.akun_bdd "+
						 "from spm_proyek c inner join spm_proyek_jenis d on c.kode_jenis=d.kode_jenis and c.kode_lokasi=d.kode_lokasi "+						 
						 "where c.kode_proyek = '"+this.cb_proyek.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.cb_akunbdd.setText(line.akun_bdd);			
			} 
			
			var strSQL = "select a.kode_proyek,b.bdd-isnull(c.beban,0) as saldo_bdd "+
						"from spm_proyek a "+
						"inner join ("+
						
						//pengajuan pjr proyek masuk ke bdd utk ngurangin OR, tp tidak masuk sebagai saldo bdd krn belum real bdd
						"select c.kode_proyek,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as bdd "+
						"from spm_proyek_bdd a  "+
						"		inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
						"		inner join spm_proyek_jenis d on c.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
						"where  a.modul<>'PJPR' and a.kode_proyek = '"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"group by c.kode_proyek		"+
						") b on a.kode_proyek = b.kode_proyek "+

						"left join ( "+
						"select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as beban "+
						"from spm_proyek_reklas_d  "+
						"where  kode_proyek = '"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_reklas <> '"+this.e_nb.getText()+"' "+
						"group by kode_proyek "+
						") c  on a.kode_proyek=c.kode_proyek "+
	
						"where a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.e_saldobdd.setText(floatToNilai(line.saldo_bdd));		
			} 
			
			var sql = new server_util_arrayList();			
			sql.add("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'");	
			sql.add("select a.kode_akun,a.nama "+
					"from masakun a inner join "+
					"( "+
					
					"		select distinct a.kode_akun "+
					"		from spm_proyek_jenis_d a inner join spm_proyek b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					"		where b.kode_proyek ='"+this.cb_proyek.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
					
					") b on a.kode_akun=b.kode_akun "+
					"where a.kode_lokasi ='"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.sg.clear(1);
													
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 								
				}								
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_proyek_reklas_m","no_reklas",this.app._lokasi+"-RBD"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 4) {			
			if (this.sg.cells(4,row) != "") {							
				this.sg.validasi();			
			}
		}
		
		sender.onChange.set(undefined,undefined);	    		
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var akun = this.dataAkun.get(sender.cells(2,row));
				if (akun) sender.cells(3,row,akun);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Akun "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
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
					tot += nilaiToFloat(this.sg.cells(4,i));									
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {	
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Cabang",sender,undefined, 
												  "select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  "select count(*) from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				
				if (col == 2 && this.cb_proyek.getText() != ""){
					var sql1 = "select a.kode_akun,a.nama "+
							   "from masakun a inner join "+
							   "( "+
							   
							   " select distinct a.kode_akun "+
							   " from spm_proyek_jenis_d a inner join spm_proyek b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							   " where b.kode_proyek ='"+this.cb_proyek.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
							   
							   ") b on a.kode_akun=b.kode_akun "+
							   "where a.kode_lokasi ='"+this.app._lokasi+"'";
					var sql2 = "select count(*) from ( "+
							   "select a.kode_akun,a.nama "+ 
							   "from masakun a inner join "+
							   "( "+
							   
							   "		select distinct a.kode_akun "+
							   "		from spm_proyek_jenis_d a inner join spm_proyek b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							   "		where b.kode_proyek ='"+this.cb_proyek.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+					
							   
							   ") b on a.kode_akun=b.kode_akun "+
							   "where a.kode_lokasi ='"+this.app._lokasi+"' "+
							   ") a ";
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  sql1,
												  sql2,
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
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
								this.nama_report="server_report_saku3_spm_rptJurnalReklasBdd";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reklas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select distinct a.no_reklas,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.ref1 as kode_proyek,a.nilai "+
		             "from spm_proyek_reklas_m a inner join trans_m z on a.no_reklas=z.no_bukti and a.kode_lokasi=z.kode_lokasi and z.posted='F' "+					 					 				 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";					 
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
			this.sg3.appendData([line.no_reklas,line.tgl,line.keterangan,line.kode_proyek,floatToNilai(line.nilai)]); 
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
				
				var strSQL = "select distinct a.no_dokumen,a.tanggal,a.keterangan,b.kode_proyek,b.kode_vendor "+
							 "from spm_proyek_reklas_m a inner join spm_proyek_reklas_d b on a.no_reklas=b.no_reklas and a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.no_reklas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);				
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_proyek.setText(line.kode_proyek);						
						this.cb_vendor.setText(line.kode_vendor);						
					}
				}
				
				var strSQL = "select b.kode_pp,b.nama as nama_pp,c.kode_akun,c.nama as nama_beban,a.nilai "+
							 "from spm_proyek_reklas_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "							 inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reklas = '"+this.e_nb.getText()+"' ";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						this.sg.appendData([line.kode_pp,line.nama_pp,line.kode_akun,line.nama_beban,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);
				
			}									
		} catch(e) {alert(e);}
	},		
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				nilai = nilaiToFloat(this.sg.cells(4,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(2,i) == this.sg2.cells(0,j) && this.sg.cells(0,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(0,i),this.sg.cells(1,i),"0",floatToNilai(nilai),"0"]);
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
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(4,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(5,i));
				this.sg2.cells(6,i,floatToNilai(sls));
			}
		}
	}
});