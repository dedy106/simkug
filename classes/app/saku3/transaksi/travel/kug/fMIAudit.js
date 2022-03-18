window.app_saku3_transaksi_travel_kug_fMIAudit = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_kug_fMIAudit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_kug_fMIAudit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Memorial Jurnal Lintas Tahun", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,80,20],caption:"",labelWidth:0,tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal / Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data"]});		

		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jenis",items:["MI"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,325], childPage:["Item Jurnal"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[180,80,100,250,50,180,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;

			var data = this.dbLib.getDataProvider("select substring(max(periode),1,4) as thn_aktif from gldt where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];			
				var periodeAudit = parseInt(line.thn_aktif) - 1;				
				this.e_periode.setText(periodeAudit.toString()+"15");
			}

			this.dp_d1.setText("31/12/"+periodeAudit);
			if (this.stsSimpan == 1) this.doClick();				

			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a  where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			sql.add("select a.kode_pp,a.nama from pp a where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");		
			this.dbLib.getMultiDataProviderA(sql);

			this.c_jenis.setText("MI");

			var data = this.dbLib.getDataProvider("select cast(value1 as varchar) as value1 from spro where kode_spro='MAXPRD' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.maxPeriode = parseInt(line.value1);
			} else this.maxPeriode = 0;		
			
			if (this.maxPeriode == 0) {
				system.alert(this,"Parameter tidak valid.","Kode spro MAXPRD tidak ditemukan.");
				return false;	
			}

			this.akunJP = "";
			strSQL = "select top 1 m.kode_akun from masakun m "+
					" inner join flag_relasi b on b.kode_akun = m.kode_akun and m.kode_lokasi = b.kode_lokasi "+
					" where b.kode_flag = '999' and m.kode_lokasi = '"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.akunJP = line.kode_akun;
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_kug_fMIAudit.extend(window.childForm);
window.app_saku3_transaksi_travel_kug_fMIAudit.implement({				
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

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MI','MIAUDIT','T','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_debet.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','-','-','"+this.c_jenis.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+","+
										parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','MI','"+this.c_jenis.getText()+"','IDR',1,'"+this.sg.cells(5,i)+"','-','-','-','-','-','-','-','-')");
							}
						}
					}	
					//posting
					sql.add("INSERT INTO gldt (no_bukti, kode_lokasi, tgl_input, nik_user, periode, no_dokumen, tanggal, nu, kode_akun, dc, nilai, nilai_curr, keterangan, modul, jenis, kode_curr, kurs, kode_pp, kode_drk, kode_cust, kode_vendor, no_fa, no_selesai, no_ref1, no_ref2, no_ref3) "+
							"select no_bukti, kode_lokasi, tgl_input, nik_user, periode, no_dokumen, tanggal, nu, kode_akun, dc, nilai, nilai_curr, keterangan, modul, jenis, kode_curr, kurs, kode_pp, kode_drk, kode_cust, kode_vendor, no_fa, no_selesai, no_ref1, no_ref2, no_ref3 "+
							"from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//jurnal jp
					sql.add("INSERT INTO gldt (no_bukti, kode_lokasi, tgl_input, nik_user, periode, no_dokumen, tanggal, nu, kode_akun, dc, nilai, nilai_curr, keterangan, modul, jenis, kode_curr, kurs, kode_pp, kode_drk, kode_cust, kode_vendor, no_fa, no_selesai, no_ref1, no_ref2, no_ref3) "+
							"select a.no_bukti, a.kode_lokasi, getdate(), a.nik_user, '"+this.e_periode.getText().substr(0,4)+this.maxPeriode+"', '-', a.tanggal, a.nu, a.kode_akun, case a.dc when 'D' then 'C' else 'D' end, a.nilai, a.nilai_curr, a.keterangan, 'JP', 'LR', a.kode_curr, a.kurs, a.kode_pp, a.kode_drk, a.kode_cust, a.kode_vendor, a.no_fa, a.no_selesai, a.no_ref1, a.no_ref2, a.no_ref3 "+
							"from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.modul='L' "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");		

					sql.add("INSERT INTO gldt (no_bukti, kode_lokasi, tgl_input, nik_user, periode, no_dokumen, tanggal, nu, kode_akun, dc, nilai, nilai_curr, keterangan, modul, jenis, kode_curr, kurs, kode_pp, kode_drk, kode_cust, kode_vendor, no_fa, no_selesai, no_ref1, no_ref2, no_ref3) "+
							"select a.no_bukti, a.kode_lokasi, getdate(), '"+this.app._userLog+"', '"+this.e_periode.getText().substr(0,4)+this.maxPeriode+"', '-', '"+this.dp_d1.getDateString()+"', 999, '"+this.akunJP+"', case when sum(case dc when 'D' then nilai else - nilai end) > 0 then 'D' else 'C' end, abs(sum(case dc when 'D' then nilai else - nilai end)), abs(sum(case dc when 'D' then nilai else - nilai end)), 'Jurnal Penutup', 'JP', 'JP', 'IDR', 1, '"+this.app._kodePP+"', '-', '-', '-', '-', '-', '-', '-', '-' "+
							"from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.modul='L' "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.no_bukti, a.kode_lokasi");	
							
					sql.add("insert into jp_d (no_bukti,kode_lokasi,kode_akun,dc,nilai,kode_pp) "+
							"select no_bukti,kode_lokasi,kode_akun,dc,nilai,kode_pp "+
							"from gldt where modul='JP' and periode='"+this.e_periode.getText().substr(0,4)+this.maxPeriode+"' and no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into jp(no_bukti, tanggal, periode, keterangan, nik_pembuat, kode_lokasi, nilai, tgl_input, nik_user )values"+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText().substr(0,4)+this.maxPeriode+"','Jurnal JP', "+
							"'"+this.app._userLog+"','"+this.app._lokasi+"',0,getdate(), '"+this.app._userLog+"')");

					//update glmapp
					var perGLMA = parseInt(this.e_periode.getText().substr(0,4)) + 1;
					perGLMA = perGLMA.toString() + "01";					
					sql.add("update a set a.so_akhir=a.so_akhir + b.nilai "+
							"from glma_pp a "+
							"inner join ( "+							
							"select a.kode_lokasi,a.kode_akun,kode_pp, sum(case dc when 'D' then nilai else - nilai end) as nilai "+
							"from gldt a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.modul<>'L' "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.kode_akun, a.kode_lokasi, a.kode_pp "+
							" ) b on a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.periode='"+perGLMA+"'");		

					//insert glmapp		
					sql.add("insert into glma_pp (kode_akun, kode_pp, kode_lokasi, periode, so_akhir, tgl_input, nik_user)  "+
							"select a.kode_akun,a.kode_pp, a.kode_lokasi,'"+perGLMA+"', sum(case dc when 'D' then nilai else - nilai end) ,getdate(),'"+this.app._userLog+"' "+
							"from gldt a "+
							"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.modul<>'L' "+
							"left join glma_pp c on a.kode_akun=c.kode_akun and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.periode='"+perGLMA+"' "+
							"where c.kode_akun is null and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.kode_akun, a.kode_lokasi, a.kode_pp ");		
							
					sql.add("delete from glma where periode='"+perGLMA+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("insert into glma (kode_akun, kode_lokasi, periode, so_akhir, tgl_input, nik_user, so_akhir_curr) "+
							"select kode_akun, kode_lokasi, periode, sum(so_akhir), getdate(), '"+this.app._userLog+"', sum(so_akhir) "+
							"from glma_pp "+
							"where periode = '"+perGLMA+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by kode_akun, kode_lokasi,periode");		

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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																		
				this.preView = "1";
				this.sg.validasi();							
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
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"MI",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (MI - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) {
					sender.cells(1,row,akun);													
					var data = this.dbLib.getDataProvider("select normal from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.normal);
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
				}				
			}
		}		
		if (col == 5) {
			if (this.sg.cells(5,row) != "") {
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
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(Math.round(totD * 100) / 100));
			this.e_kredit.setText(floatToNilai(Math.round(totC * 100)/100));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){			
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if (this.sg.cells(5,row) == "") {
						if (row == 0) {
							this.sg.setCell(5,row,this.app._kodePP);
							this.sg.setCell(6,row,this.app._namaPP);
						}
						else {
							this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
							this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						}
					}
				break;							
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					if (this.app._userStatus == "U") {
						var strSQL1 = "select a.kode_pp, a.nama from pp a where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
						var strSQL2 = "select count(*) from pp a where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
					}
					else {
						var strSQL1 = "select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
						var strSQL2 = "select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
					}
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strSQL1,
							strSQL2,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
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
								this.nama_report="server_report_saku3_travel_rptJurnalBuktiMI";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_nb.getText()+"/"+this.app._lokasi;
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 								
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	}
});