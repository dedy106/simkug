window.app_saku3_transaksi_bpr_fKb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fKb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fKb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Status","Bank - No Ref.","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,300,200,80,80,100]],
					readOnly:true,
					colFormat:[[5],[cfNilai]],	
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"Jenis",items:["BM","BK"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"Status",items:["TUNAI","MCM","TRANSFER","CHEQUE","GIRO"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,320,20],caption:"Bank - No Ref.",maxLength:30});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[350,14,120,20],caption:"",  labelWidth:0, maxLength:30});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,280], childPage:["Data Item Jurnal","Otorisasi","Controlling"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],					
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,300,50,180,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_periksa = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_otorisasi = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Otorisasi Oleh", multiSelection:false, maxLength:10, tag:2});

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode MTA","Kode PP","Budget Tersedia","Tot Transaksi","Sisa Budget"],
					colWidth:[[4,3,2,1,0],[120,120,120,100,100]],					
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[960,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);			
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			this.c_jenis.setText("BK");
			this.c_status.setText("TUNAI");
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_periksa.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_otorisasi.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_buat.setText(this.app._userLog);
			this.cb_periksa.setText("-");
			this.cb_fiat.setText("-");
			this.cb_otorisasi.setText("-");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fKb.extend(window.childForm);
window.app_saku3_transaksi_bpr_fKb.implement({
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
			if (this.e_periode.getText().substr(2,4) != this.e_nb.getText().substr(5,4)) {
				system.alert(this,"Transaksi tidak valid.","No Bukti tidak sesuai periode-nya.");
				return false;
			}			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KB','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_debet.getText())+",0,0,'"+this.cb_buat.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_fiat.getText()+"','"+this.e_bank.getText()+"','"+this.e_dok.getText()+"','-','"+this.cb_otorisasi.getText()+"','"+this.c_status.getText()+"','"+this.c_jenis.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+","+
										parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','KB','"+this.c_jenis.getText()+"','IDR',1,'"+this.sg.cells(5,i)+"','-','-','-','-','-','-','-','-')");
							}
						}
					}

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
									var DC = "C"; 
									var nilai = nilaiToFloat(this.sg2.cells(3,i));
								} else {
									var DC = "D";
									var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
										"('"+this.e_nb.getText()+"','KB','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+",0,0,0,'-','-','-')");
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
					this.sg.clear(1); 
					this.sg2.clear(1); 
					this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.stsSimpan = 1;
					this.doClick();
					this.doChange(this.c_status);
				break;
			case "simpan" :																	
			case "ubah" :	
				//row valid		
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

				this.preView = "1";		
				
				//cek budget
				this.sg.validasi();
				this.dataAkunGar = {rs:{rows:[]}};
				this.doHitungGar();
				var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				for (var i=0;i < this.sg2.getRowCount();i++) {
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_gar == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i)) < 0) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}							
						}
					}
				}
				
				//cek akun KB				
				this.dataKB = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataKB = data;
				} 
				var akunKB = false;				
				if (this.c_jenis.getText() == "BK") var dc = "C"; else var dc = "D";
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataKB.rs.rows.length;i++){
							var line = this.dataKB.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j) && this.sg.cells(2,j).toUpperCase() == dc) {
								akunKB = true;																								
							}
						}
					}
				}
				if (!akunKB) {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan sesuai posisinya(Dr = BM/Cr = BK).");
					return false;						
				}

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();							
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		var sql = new server_util_arrayList();
		sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");				
		sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
				"where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");			
		this.dbLib.getMultiDataProviderA(sql);

		if (this.stsSimpan == 1) this.doClick();			
	},
	doChange:function(sender){
		if (sender == this.c_status && this.c_status.getText()!="") {
			if (this.c_status.getText() == "TUNAI"){
				this.e_bank.setReadOnly(true);
				this.e_dok.setReadOnly(true);
				this.e_bank.setText("-");
				this.e_dok.setText("-");
			}
			else {
				this.e_bank.setReadOnly(false);
				this.e_dok.setReadOnly(false);
				this.e_bank.setText("");
				this.e_dok.setText("");
			}
		}		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();		
	},
	doClick:function(sender){
		try{
			if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
				if (this.stsSimpan == 0) {					
					this.sg.clear(1);
					this.sg3.clear(1);
				}
				this.stsSimpan = 1;				
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				this.e_ket.setFocus();
				setTipeButton(tbSimpan);
			}			
		}
		catch(e) {alert(e);}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);
					var data = this.dbLib.getDataProvider("select normal,kode_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.normal);
							sender.cells(7,row,line.kode_gar);
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(7,row,"");
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
					if (row == 0) {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);						
					}
					else {
						if ((this.sg.cells(5,row) == "") && (row > 0)) {
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
							"select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",																																				
							"select count(*) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"where",["Kode","Nama"],false);									
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
							"select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doHitungGar: function(){
		this.dataAkunGar = {rs:{rows:[]}};		
		var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataAkunGar = data;
		}

		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			for (var n=0;n<this.dataAkunGar.rs.rows.length;n++) {				
				var line = this.dataAkunGar.rs.rows[n];
				if (line.kode_gar == this.sg.cells(0,i)) {							
					if (this.sg.rowValid(i) && this.sg.cells(2,i) != "-"){				
						if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
						else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;				
						var isAda = false;
						var idx = total = 0;
						for (var j=0;j < this.sg2.getRowCount();j++){
							if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
								isAda = true;
								idx = j;
								break;
							}
						}
						if (!isAda) {							
							this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(5,i),"0",floatToNilai(nilai),"0"]);
						} 
						else { 
							total = nilaiToFloat(this.sg2.cells(3,idx));
							total = total + nilai;
							this.sg2.setCell(3,idx,total);
						}
					}
				}
			}
		}

		var sakhir = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_release1('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_release2('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");			
				this.sg2.cells(2,i,floatToNilai(parseFloat(data[0])));
				sakhir = parseFloat(data[0]) - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sakhir));
			}
		}					
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_bpr_rptBuktiKb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 ="";
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
			this.sg2.clear(1); 
			this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.doClick();
			setTipeButton(tbSimpan);		
			this.doChange(this.c_status);	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen as status,a.no_ref1+' - '+a.no_ref2 as no_ref,a.keterangan,a.nilai1 "+
		             "from trans_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"'  "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KB' and a.posted ='F' and a.form='KB'";				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.status,line.no_ref,line.keterangan,floatToNilai(line.nilai1)]); 
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

				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.c_jenis.setText(line.param3);					
						this.c_status.setText(line.param2);
						this.e_bank.setText(line.no_ref1);
						this.e_dok.setText(line.no_ref2);
						this.e_ket.setText(line.keterangan);

						this.cb_buat.setText(line.nik1);
						this.cb_periksa.setText(line.nik2);
						this.cb_fiat.setText(line.nik3);
						this.cb_otorisasi.setText(line.param1);																
					}
				}								
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,b.kode_gar "+
							"from trans_j a "+
							"			 inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg.clear(1);

				var data = this.dbLib.getDataProvider( 
							"select a.kode_gar,a.kode_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+ 
							"from angg_r a inner join masgar b on a.kode_gar=b.kode_gar and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KB' order by a.kode_gar",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_gar,line.kode_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);	
			}									
		} catch(e) {alert(e);}
	}
});