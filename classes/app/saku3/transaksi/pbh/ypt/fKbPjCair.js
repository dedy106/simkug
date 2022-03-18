window.app_saku3_transaksi_pbh_ypt_fKbPjCair = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_pbh_ypt_fKbPjCair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_pbh_ypt_fKbPjCair";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Panjar Direct", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Transaksi","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No KasBank","Tanggal","No Panjar","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,350,150,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],			
					readOnly:true, click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
	
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["BK"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Kas",maxLength:30,readOnly:true,visible:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:true});
		this.e_nopj = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Panjar",maxLength:30,readOnly:true,visible:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_nik = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK Panjar", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});									
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});									
		this.cb_akunpj = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});							
		this.cb_akunkb = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});							
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,213], childPage:["Item Peruntukan","Budget"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
		            colTitle:["Kode MTA","Nama MTA","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
					colTitle:["Kode Akun","Kode PP","Kode DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],
					readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		

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
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_akunpj.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '002' "+
			                      "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
			                      "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.c_jenis.setText("BK");

			var sql = new server_util_arrayList();			
			sql.add("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					
					"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"' ");							
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_pbh_ypt_fKbPjCair.extend(window.childForm);
window.app_saku3_transaksi_pbh_ypt_fKbPjCair.implement({	
	doHitungGar: function(){
		try {
			this.sg2.clear();
			var nilai = total = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "0") {				
					if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
					else nilai = nilaiToFloat(this.sg1.cells(4,i)) * -1;		

					var isAda = false;
					var idx = total = 0;
					for (var j=0;j < this.sg2.getRowCount();j++){
						if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(5,i) == this.sg2.cells(1,j) && this.sg1.cells(7,i) == this.sg2.cells(2,j) ) {
							isAda = true;
							idx = j;
							break;
						}
					}
					if (!isAda) {
						this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(5,i),this.sg1.cells(7,i),"0",floatToNilai(nilai),"0"]);
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
				var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");					
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.sg2.cells(3,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sg2.cells(4,i));
					this.sg2.cells(5,i,floatToNilai(sls));
				}
			}
		}
		catch(e) {
			alert(e);
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from panjar_m where no_pj='"+this.e_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from panjar_j where no_pj='"+this.e_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from angg_r where no_bukti ='"+this.e_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
								
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nopj.getText()+"','"+this.cb_akunpj.getText()+"','"+this.cb_akunkb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.kodePP+"','KBPJCAIR','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_nik.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.cb_nik.getText()+"','-')");									
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akunpj.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','-','-','-','"+this.app._lokasi+"','KBPJCAIR','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPJCAIR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");					
							
					sql.add("insert into panjar_m(no_pj, no_kas, no_dokumen, tanggal, due_date, keterangan, catatan, kode_curr, kurs, akun_pj, nik_pengaju, nik_setuju, kode_lokasi, kode_pp, modul, nilai, nilai_pot, kode_drk, progress, periode, no_del, no_link, nik_user, tgl_input) values "+
						    "('"+this.e_nopj.getText()+"', '"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '-', 'IDR', 1, '"+this.cb_akunpj.getText()+"', '"+this.cb_nik.getText()+"', '"+this.cb_app.getText()+"', '"+this.app._lokasi+"', '"+this.kodePP+"', 'PJ-DIR', "+nilaiToFloat(this.e_nilai.getText())+", 0, '-', '2', '"+this.e_periode.getText()+"', '-', '-', '"+this.app._userLog+"', getdate())");						
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into panjar_j(no_pj, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) values "+
										"('"+this.e_nopj.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','"+this.app._lokasi+"','PJ','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
							}
						}
					}	
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(4,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(4,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(4,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','PJ','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(3,i))+","+nilai+")");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";	
				this.sg1.validasi();		
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}

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
						else {
							for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
								line = this.dataAkunGar.rs.rows[j];
								if (line.kode_akun == this.sg1.cells(0,i) && this.sg1.cells(7,i) == "-") {		
									var k = i+1;
									system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
									return false;						
								}
							}
						}
					}										
				}	

				this.doHitungGar();								
				for (var i=0;i < this.sg2.getRowCount();i++){
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i))>0 && nilaiToFloat(this.sg2.cells(3,i)) < nilaiToFloat(this.sg2.cells(4,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"] , silahkan melakukan RRA dari menu anggaran");
								return false;						
							}							
						}
					}
				}
				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh kurang dari nol.");
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
					sql.add("delete from panjar_m where no_pj='"+this.e_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from panjar_j where no_pj='"+this.e_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from angg_r where no_bukti ='"+this.e_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}		
	},
	doSelectDate: function(sender, y,m,d){		
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan==1) this.doClick();
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText() != "") {
			if (this.stsSimpan == 0) {								
				this.e_nilai.setText("0");	
				this.sg1.clear(1);
				this.sg2.clear(1);							
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_nopj.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjar_m","no_pj",this.app._lokasi+"-PJ"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){
		try {
			if (sender == this.c_jenis && this.stsSimpan == 1) this.doClick();							
			if (sender == this.cb_nik && this.cb_nik.getText()!="") {			
				var data = this.dbLib.getDataProvider("select kode_pp from karyawan where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.kodePP = line.kode_pp;					
					} 
				}															
			}
		}
		catch(e) {alert(e);}
	},
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (sender.cells(3,row) == ""){
						if (row == 0) sender.setCell(3,row,this.e_ket.getText());
						else sender.setCell(3,row,sender.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (sender.cells(5,row) == "") {
						if (row == 0) sender.setCell(5,row,this.app._kodePP);
						else {
							sender.setCell(5,row,sender.cells(5,(row-1)));
							sender.setCell(6,row,sender.cells(6,(row-1)));
						}
					}
				break;							
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) sender.validasi();
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
			if (sender.cells(7,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama);
					else {						
						sender.cells(7,row,"-");
						sender.cells(8,row,"-");						
					}
				}
			}
		}	
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			this.e_nilai.setText(floatToNilai(totD - totC));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick1: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+												
						"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",
						
						"select count(distinct a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
						"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",
						["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
						"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",
						"select count(a.kode_pp)  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",						
						["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
			}	
			if (col == 7) {								
				var vUnion = "";
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
					} 
				}
				this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
						"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
						"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
						["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
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
			setTipeButton(tbAllFalse);		
			setTipeButton(tbSimpan);
			this.sg1.clear(1);
			this.sg2.clear(1);							
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,a.tanggal "+
		             "from kas_m a inner join panjar_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.progress='2' and b.modul='PJ-DIR' "+			 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KBPJCAIR' and a.posted ='F' "+
					 "order by a.no_kas desc ";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
		this.pc2.setActivePage(this.pc2.childPage[1]);																		
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick3(this.sg3,0,row); 				
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
								
				var strSQL = "select * from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_nopj.setText(line.no_dokumen);
						this.c_jenis.setText(line.jenis);	
						this.e_ket.setText(line.keterangan);							
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.cb_nik.setText(line.ref1);						
						this.cb_app.setText(line.nik_app);						
						this.cb_akunpj.setText(line.no_bg);						
						this.cb_akunkb.setText(line.akun_kb);						
					}
				}	
				
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from panjar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																				
							"where a.jenis='BEBAN' and a.no_pj = '"+this.e_nopj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
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
		} catch(e) {alert(e);}		
	}
});