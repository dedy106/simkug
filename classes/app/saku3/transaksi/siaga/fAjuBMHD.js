window.app_saku3_transaksi_siaga_fAjuBMHD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fAjuBMHD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fAjuBMHD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Akru BMHD", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,475], childPage:["Data Pengajuan","List Pengajuan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, change:[this,"doChangeJab"]});			
		this.c_jab1 = new saiCB(this.pc2.childPage[0],{bound:[700,17,220,20],caption:"Jabatan Pembuat",readOnly:true,tag:0});		//items:["President Director","Director","Vice President","Manager","Assistant Manager","Staff"], 
		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pemeriksa", multiSelection:false, maxLength:10, tag:2, change:[this,"doChangeJab"]});		
		this.c_jab2 = new saiCB(this.pc2.childPage[0],{bound:[700,16,220,20],caption:"Jabatan Pemeriksa", readOnly:true,tag:0});    //,items:["President Director","Director","Vice President","Manager","Assistant Manager","Staff"]
		
		this.cb_sah = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Pengesahan", multiSelection:false, maxLength:10, tag:2, change:[this,"doChangeJab"]});		
		this.c_jab3 = new saiCB(this.pc2.childPage[0],{bound:[700,17,220,20],caption:"Jab Pengesahan", readOnly:true,tag:0});	//items:["President Director","Director","Vice President","Manager","Assistant Manager","Staff"],
		
		this.cb_ver = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Verifikasi ", multiSelection:false, maxLength:10, tag:2, change:[this,"doChangeJab"]});		
		this.c_jab4 = new saiCB(this.pc2.childPage[0],{bound:[700,16,220,20],caption:"Jabatan Verifikasi", readOnly:true,tag:0}); //items:["President Director","Director","Vice President","Manager","Assistant Manager","Staff"],		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false}); 
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,450,20],caption:"No Dokumen", maxLength:50});	
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[700,12,220,20],caption:"Jenis Anggaran",items:["OPEX","CAPEX"], readOnly:true,tag:0});	
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Untuk Pembayaran", maxLength:150});				
		this.e_nilaiCurr = new saiLabelEdit(this.pc2.childPage[0],{bound:[700,13,220,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_atensi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Atensi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[700,14,220,20],caption:"Nilai IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,20,160,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[190,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});
		this.e_totRinci = new saiLabelEdit(this.pc2.childPage[0],{bound:[700,20,220,20],caption:"Tot Rincian Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,233], childPage:["Item Mata Anggaran","KPA Anggaran","Lampiran","Rincian Barang","Verifikasi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai Curr","Nilai IDR"],
					colWidth:[[5,4,3,2,1,0],[120,120,400,50,150,80]],					
					columnReadOnly:[true,[1],[0,2,3,4,5]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.e_latar = new saiMemo(this.pc1.childPage[2],{bound:[20,12,500,50],caption:"Latar Belakang",tag:2});
		this.e_lain = new saiMemo(this.pc1.childPage[2],{bound:[540,12,450,50],caption:"Aspek Lain",tag:2});		
		this.e_strategis = new saiMemo(this.pc1.childPage[2],{bound:[20,13,500,50],caption:"Aspek Strategis",tag:2});
		this.e_bisnis = new saiMemo(this.pc1.childPage[2],{bound:[20,14,500,50],caption:"Aspek Bisnis",tag:2});
		this.e_teknis = new saiMemo(this.pc1.childPage[2],{bound:[20,15,500,50],caption:"Spesifikasi Teknis",tag:2});
		
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Nama Barang","Satuan","Quantity","Harga Satuan Curr","Total Curr"],
					colWidth:[[4,3,2,1,0],[150,150,100,100,400]],					
					columnReadOnly:[true,[4],[0,1,2,3]],					
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange4"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		
		
		
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,450,20],caption:"No Verifikasi", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		//this.dataAkun = this.app._masakun;
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;

			var sql = new server_util_arrayList();
			if (this.app._userStatus == "A") {
				sql.add("select a.kode_akun,a.nama "+
						"from masakun a "+
						"where a.kode_lokasi='"+this.app._lokasi+"'  and a.block= '0' ");
			}
			else {
				sql.add("select a.kode_akun,a.nama "+
						"from masakun a "+
						"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
						"group by a.kode_akun,a.nama ");						
			}
			this.dbLib.getMultiDataProviderA(sql);
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);	
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
												
			this.flagAkunKB = "0"; this.flagGarFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('JUAKUNKB','GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "JUAKUNKB") this.flagAkunKB = line.flag;
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
				}
			}	
			if (this.app._userStatus=="A")
			{	
				var sql="select a.kode_pp, a.nama "+
					"from pp a "+
					"where a.tipe='Posting' and a.kode_lokasi='"+this.app._lokasi+"'";
			}
			else
			{
				var sql="select a.kode_pp, a.nama "+
					"from pp a "+
					"inner join (select a.kode_pp,a.kode_lokasi from karyawan_pp a "+
					"			where a.nik='"+this.app._userLog+"' "+
					"			group by a.kode_pp,a.kode_lokasi "+
					"		)b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					"where a.tipe='Posting' and a.kode_lokasi='"+this.app._lokasi+"'";
			}
			this.cb_pp.setSQL(sql,["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_sah.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_ver.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.cb_buat.setText(this.app._userLog);
			
			this.c_curr.setText("IDR");
			

			this.c_jab1.items.clear();
			var data = this.dbLib.getDataProvider("select nama from kug_jab where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_jab1.addItem(i,line.nama);
				}
			} 

			this.c_jab2.items.clear();
			var data = this.dbLib.getDataProvider("select nama from kug_jab where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_jab2.addItem(i,line.nama);
				}
			} 


			this.c_jab3.items.clear();
			var data = this.dbLib.getDataProvider("select nama from kug_jab where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_jab3.addItem(i,line.nama);
				}
			} 


			this.c_jab4.items.clear();
			var data = this.dbLib.getDataProvider("select nama from kug_jab where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_jab4.addItem(i,line.nama);
				}
			} 

			this.c_jab1.setText("");
			this.c_jab2.setText("");
			this.c_jab3.setText("");
			this.c_jab4.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fAjuBMHD.extend(window.childForm);
window.app_saku3_transaksi_siaga_fAjuBMHD.implement({
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
						sql.add("delete from gr_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from gr_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BMHD'");
						sql.add("delete from gr_pb_boq where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	
					
		 			sql.add("insert into gr_pb_m (no_pb,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,no_dokumen,keterangan,atensi,kode_curr,kurs,nilai_curr,nilai,modul,kode_pp,nik_buat,nik_tahu,progress,no_ver,no_spb,no_kas,ref1,ref2,no_app,  latar,strategis,bisnis,teknis,lain,nik_sah,nik_ver,jenis,jab1,jab2,jab3,jab4) values "+
		 					"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.e_atensi.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_nilaiCurr.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'BMHD','"+this.cb_pp.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','0','-','-','-','-','-','-','"+this.e_latar.getText()+"','"+this.e_strategis.getText()+"','"+this.e_bisnis.getText()+"','"+this.e_teknis.getText()+"','"+this.e_lain.getText()+"','"+this.cb_sah.getText()+"','"+this.cb_ver.getText()+"','"+this.c_jenis.getText()+"','"+this.c_jab1.getText()+"','"+this.c_jab2.getText()+"','"+this.c_jab3.getText()+"','"+this.c_jab4.getText()+"')");		
								
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into gr_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','BMHD','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(3,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','BMHD','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+")");
							}
						}
					}
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){								
								sql.add("insert into gr_pb_boq(no_pb,nu,kode_lokasi,periode,nik_user,tgl_input,nama_brg,satuan,jumlah,harga) values "+
										"('"+this.e_nb.getText()+"',"+i+",'"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+")");
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_curr.setText("IDR");
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick();
				break;
			case "simpan" :	
			case "ubah" :		
				this.preView = "1";							
				this.sg.validasi();
				this.sg4.validasi();
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
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
				this.doHitungGar();				
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
							var line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg2.cells(0,i)) {		
								if (nilaiToFloat(this.sg2.cells(3,i))>0 && nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
									var k =i+1;
									system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"] , silahkan melakukan RRA dari menu anggaran");
									return false;						
								}							
							}
						}
					}
				}
				
				if (this.flagAkunKB == "1") {
					this.dataJU = {rs:{rows:[]}};				
					var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataJU = data;
					} 						
					var k=0;
					for (var j=0;j < this.sg.getRowCount();j++){
						if (this.sg.rowValid(j)){
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];
								if (line.kode_akun == this.sg.cells(0,j)) {		
									k = j+1;
									system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak diperkenankan.[Baris : "+k+"]");
									return false;						
								}
							}													
						}
					}
				}																							
				if (nilaiToFloat(this.e_nilaiCurr.getText()) < nilaiToFloat(this.e_totRinci.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Rincian melebihi Nilai Curr.");
					return false;						
				}				
				if (nilaiToFloat(this.e_nilaiCurr.getText()) <= 0 || nilaiToFloat(this.e_nilai.getText()) <= 0) {
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
					sql.add("delete from gr_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BMHD'");
					sql.add("delete from gr_pb_boq where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12){
				this.e_periode.setText(y+""+m);
				if (m=="01") this.Aperiode = "A";
				if (m=="02") this.Aperiode = "B";
				if (m=="03") this.Aperiode = "C";
				if (m=="04") this.Aperiode = "D";
				if (m=="05") this.Aperiode = "E";
				if (m=="06") this.Aperiode = "F";
				if (m=="07") this.Aperiode = "G";
				if (m=="08") this.Aperiode = "H";
				if (m=="09") this.Aperiode = "I";
				if (m=="10") this.Aperiode = "J";
				if (m=="11") this.Aperiode = "K";
				if (m=="12") this.Aperiode = "L";			
			}
			else {
				this.e_periode.setText(this.app._periode);		
				if (m=="13") this.Aperiode = "M";			
				if (m=="14") this.Aperiode = "N";			
				if (m=="15") this.Aperiode = "O";			
				if (m=="16") this.Aperiode = "P";						
			}	
			if (this.stsSimpan == 1) this.doClick();
			this.doChange(this.c_curr);
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText()!="")
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				var strSQL = "select kurs from gr_kurs where kode_curr ='"+this.c_curr.getText()+"' and ('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
					else this.e_kurs.setText("0");					
				}
				this.e_kurs.setReadOnly(false); this.sg.validasi();
			}
		}
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}
	},	

	doChangeJab:function(sender){		
		if (sender == this.cb_buat && this.cb_buat.getText()!="") {
			var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.c_jab1.setText(line.nama);
				}				
			}
		}

		if (sender == this.cb_app && this.cb_app.getText()!="") {
			var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_app.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.c_jab2.setText(line.nama);
				}				
			}
		}

		if (sender == this.cb_sah && this.cb_sah.getText()!="") {
			var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_sah.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.c_jab3.setText(line.nama);
				}				
			}
		}


		if (sender == this.cb_ver && this.cb_ver.getText()!="") {
			var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_ver.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.c_jab4.setText(line.nama);
				}				
			}
		}

	},
	
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {				
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);						
				}		
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_pb_m","no_pb",this.app._lokasi+"-BMHD"+this.e_periode.getText().substr(2,2)+this.Aperiode+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}	
	},
	doChangeCell: function(sender, col, row){		
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,row))));
				this.sg.validasi();			
			}
		}
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
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{
			var totCurr = tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,i)))));					
					if (this.sg.cells(2,i).toUpperCase() == "D") {
						totCurr += nilaiToFloat(this.sg.cells(4,i));
						tot += nilaiToFloat(this.sg.cells(5,i));
					}
					if (this.sg.cells(2,i).toUpperCase() == "C") {
						totCurr -= nilaiToFloat(this.sg.cells(4,i));
						tot -= nilaiToFloat(this.sg.cells(5,i));
					}									
				}
			}			
			this.e_nilaiCurr.setText(floatToNilai(totCurr));
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg.cells(2,row,"D");
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
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					if (this.app._userStatus=="A")
					{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"'  and a.block= '0' ";
						var sql2="select count(a.kode_akun) "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and a.block= '0' ";
					}
					else
					{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun,a.nama ";
						var sql2="select count(a.kode_akun) from (select a.kode_akun "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun) a ";	
					}	
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined,sql,sql2,
													["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(2,i) != "-"){				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(5,i));
				else nilai = nilaiToFloat(this.sg.cells(5,i)) * -1;				
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
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg7('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(2,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls));
			}
		}
	},	
	doChangeCell4: function(sender, col, row){		
		if (col == 2 || col == 3) {			
			if (this.sg4.cells(2,row) != "" && this.sg4.cells(3,row) != "") {				
				this.sg4.cells(4,row,Math.round(nilaiToFloat(this.sg4.cells(2,row)) * nilaiToFloat(this.sg4.cells(3,row))));						
			}
		}				
		this.sg4.validasi();	
	},	
	doNilaiChange4: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != "" ){					
					tot += nilaiToFloat(this.sg4.cells(4,i));
				}
			}						
			this.e_totRinci.setText(floatToNilai(tot));
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
								this.nama_report="server_report_saku3_siaga_rptFormBMHD";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._namaUser;
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
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			setTipeButton(tbSimpan);
			this.c_curr.setText("IDR");
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.stsSimpan = 1;
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai_curr "+
		             "from gr_pb_m a "+				 
					 "where nik_user = '"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'BMHD' and a.progress in ('0','R','V')";		
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
			this.sg3.appendData([line.no_pb,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai_curr)]); 
		}
		this.sg3.setNoUrut(start);
		this.page = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		this.page = page-1;
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;			
				//var baris = (this.page * 20) + row; 
				var baris = row; 
				this.e_nb.setText(this.sg3.cells(0,baris));								
				
				var data = this.dbLib.getDataProvider(
						   "select a.*,  isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan "+						  
						   "from gr_pb_m a "+
						   "		left join ("+
						   "        		select a.kode_lokasi,a.no_app,a.catatan from gr_app_m a "+
						   "        		where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_flag='-' and a.modul='PBAJU') b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+			 
						   "where a.no_pb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.e_atensi.setText(line.atensi);
						this.cb_pp.setText(line.kode_pp);					
						this.cb_buat.setText(line.nik_buat);					
						this.cb_app.setText(line.nik_tahu);		
						this.cb_sah.setText(line.nik_sah);	
						this.cb_ver.setText(line.nik_ver);				
						this.c_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.c_jenis.setText(line.jenis);
						this.e_noapp.setText(line.no_app);					
						this.e_memo.setText(line.catatan);	
						
						this.e_latar.setText(line.latar);							
						this.e_lain.setText(line.lain);							
						this.e_strategis.setText(line.strategis);							
						this.e_bisnis.setText(line.bisnis);							
						this.e_teknis.setText(line.teknis);	

						this.c_jab1.setText(line.jab1);
						this.c_jab2.setText(line.jab2);
						this.c_jab3.setText(line.jab3);
						this.c_jab4.setText(line.jab4);
		
					} 
				}		
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr "+
							"from gr_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
				
				var data = this.dbLib.getDataProvider("select a.nama_brg,a.satuan,a.jumlah,a.harga,a.jumlah*a.harga as total from gr_pb_boq a "+
							"where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.nama_brg,line.satuan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
					}
				} else this.sg4.clear(1);			
				this.sg4.validasi();

				this.doHitungGar();	
						
			}									
		} catch(e) {alert(e);}
	}
	
	
	
});