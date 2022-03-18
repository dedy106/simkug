window.app_saku3_transaksi_cianjur_hutang_fSpbHut = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_hutang_fSpbHut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_hutang_fSpbHut";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Permintaan Bayar (SPB)", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal SPB", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Data PB","Detail Permintaan","Jurnal Tambahan","Otorisasi SPB","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
		            colTitle:["Status","No PB","Tanggal","No Hutang","Nominal","Keterangan","PP / Unit","Vendor","Tgl Input","Pengaju","Akun Hutang","Due Date","Data Transfer","Modul"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[70,200,80,80,150,70,150,150,200,100,100,80,100,80]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Ver",readOnly:true,visible:false,change:[this,"doChange"]});		
		this.e_nb2 = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No SPB",readOnly:true,visible:false,tag:9});		
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2,change:[this,"doChange"]}); 		
		this.e_nopb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No PB", readOnly:true});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Tanggal", readOnly:true});								
		this.e_nohutang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Hutang", readOnly:true});								
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Due Date", readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,450,20],caption:"Deskripsi", readOnly:true});										
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"PP/Unit", readOnly:true});														
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Akun Hutang", readOnly:true});								
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Vendor", readOnly:true});								
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Data Transfer", readOnly:true});										
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Pengaju", readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Tgl Input", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nominal", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,80],caption:"Catatan Verifikasi",tag:9,readOnly:true});
				
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,340],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,270,40,180,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.e_debet = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,360,200,20],caption:"Total Debet", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kredit = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,383,200,20],caption:"Total Kredit", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});						
		this.e_nilaikb = new saiLabelEdit(this.sgn1,{bound:[790,1,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
			
		this.l_tgl1 = new portalui_label(this.pc1.childPage[3],{bound:[20,11,100,18],caption:"Tanggal SPB", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[3],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		this.cb_buat = new saiCBBL(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this.pc1.childPage[3],{bound:[20,17,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_fiat = new saiCBBL(this.pc1.childPage[3],{bound:[20,19,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.cb_bdh = new saiCBBL(this.pc1.childPage[3],{bound:[20,20,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});								
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"No PB",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});				
		this.bCari = new button(this.pc1.childPage[4],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		
		this.pc1.childPage[3].rearrangeChild(10, 23);	
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_bdh.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_hutang_fSpbHut.extend(window.childForm);
window.app_saku3_transaksi_cianjur_hutang_fSpbHut.implement({
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
			if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VPB"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if(this.stsSimpan == 0){
						sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update pb_m set progress='0',no_spb='-',no_ver='-' where no_pb='"+this.e_nopb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_d where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}									
					if (this.c_status.getText()=="APPROVE")  {
						var prog = "1";
						if(this.stsSimpan == 1) this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));		
					
						var duedate = this.e_duedate.getText().substr(6,4)+"-"+this.e_duedate.getText().substr(3,2)+"-"+this.e_duedate.getText().substr(0,2);
						sql.add("insert into spb_m (no_spb,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,no_kas,nilai,modul) values "+
								"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+duedate+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','-',"+nilaiToFloat(this.e_nilaikb.getText())+",'PBHU')"); 
												
						sql.add("insert into spb_d(no_spb,kode_lokasi,no_bukti,modul,nilai,bank,cabang,no_rek,nama_rek,akun_hutang) "+
								"select '"+this.e_nb2.getText()+"',a.kode_lokasi,a.no_pb,'PBHU',"+nilaiToFloat(this.e_nilaikb.getText())+",b.bank,b.cabang,b.no_rek,b.nama_rek,'"+this.e_akun.getText()+"' "+
								"from pb_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+								
								"where a.no_pb='"+this.e_nopb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
									
						sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb2.getText()+"','"+this.e_nopb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_akun.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBHU','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						if (this.sg1.getRowValidCount() > 0){
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									var j = i+1;
									sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
											"('"+this.e_nb2.getText()+"','"+this.e_nopb.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"','IDR',1,"+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','-','"+this.app._lokasi+"','PBHU','TAMBAH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								}
							}
						}
					}
					if (this.c_status.getText()=="REVISI") var prog = "R";
					
					sql.add("update pb_m set progress='"+prog+"',no_spb='"+this.e_nb2.getText()+"',no_ver='"+this.e_nb.getText()+"' where no_pb='"+this.e_nopb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_nopb.getText()+"' and b.modul='PBHU' and b.kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','PBHU','-')");					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','PBHU','"+this.e_nopb.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");					
																																			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); 
					this.doClick();
					this.doLoad();					
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);		
					this.c_status.setText("APPROVE");					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
			case "ubah"	:
				this.preView = "1";							
				if (this.c_status.getText()=="APPROVE") {
					this.cb_buat.setTag("2");
					this.cb_tahu.setTag("2");
					this.cb_fiat.setTag("2");
					this.cb_bdh.setTag("2");
				} 
				else {
					this.cb_buat.setTag("9");
					this.cb_tahu.setTag("9");
					this.cb_fiat.setTag("9");
					this.cb_bdh.setTag("9");
				}											
				this.sg1.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}				 
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";				
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}				
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update pb_m set progress='0',no_spb='-',no_ver='-' where no_pb='"+this.e_nopb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spb_d where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spb_j where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if(this.stsSimpan == 1) {
			this.doClick();
			this.doLoad();
		}
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VPB"+this.e_periode.getText().substr(2,4)+".","0000"));
	},		
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {
			this.pc1.setActivePage(this.pc1.childPage[1]);		
			if(this.sg.cells(0,row).toUpperCase() == 'INPROG'){
				this.stsSimpan = 1;	
												
				this.e_nopb.setText(this.sg.cells(1,row));
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_nohutang.setText(this.sg.cells(3,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.e_pp.setText(this.sg.cells(6,row));
				this.e_tglinput.setText(this.sg.cells(8,row));
				this.e_user.setText(this.sg.cells(9,row));
				this.e_akun.setText(this.sg.cells(10,row));
				this.e_vendor.setText(this.sg.cells(7,row));
				this.e_duedate.setText(this.sg.cells(11,row));
				this.e_bank.setText(this.sg.cells(12,row));
				this.e_nilai.setText(this.sg.cells(4,row));						
				this.sg1.validasi();
				
				var strSQL = "select top 1 flag from spro where "+nilaiToFloat(this.e_nilai.getText())+" between value1 and value2 and modul = 'FIAT' and kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_fiat.setText(line.flag);										
					} 
				}
				setTipeButton(tbSimpan);				
				
			}else{
				this.stsSimpan = 0;	
				var strSQL = "select distinct max(no_ver) as no_ver from ver_d where no_bukti ='"+this.sg.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_nb.setText(line.no_ver);										
					} 
				}
				var strSQL = "select x.tanggal as tgl,y.catatan,case f.progress when '1' then 'APPROVE' when 'R' then 'REVISI' end as progress,f.no_spb,z.nik_buat,z.nik_sah,z.nik_fiat,z.nik_bdh, "+
					     "       f.no_pb,convert(varchar,f.tanggal,103) as tanggal,a.no_hutang,f.nilai,f.keterangan,a.kode_pp+' - '+b.nama as pp,a.kode_vendor+' - '+d.nama as vendor, convert(varchar,f.tgl_input,103) as tgl_input, f.nik_buat+' - '+c.nama as pengaju,a.akun_hutang,d.bank+' - '+d.cabang +' - '+ d.no_rek +' - '+d.nama_rek as transfer,convert(varchar,f.due_date,103) as due_date "+
						 "from hutang_m a inner join pb_m f on a.no_hutang=f.no_hutang and a.kode_lokasi=f.kode_lokasi and f.no_hutang<>f.no_pb "+ //f.no_hutang<>f.no_pb -------> pb degnan akru
						 "     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join karyawan c on f.nik_buat=c.nik and f.kode_lokasi=c.kode_lokasi "+
						 "     inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+						 
						 "     inner join ver_m x on f.no_ver=x.no_ver and x.kode_lokasi=f.kode_lokasi "+
						 "     inner join ver_d y on x.no_ver=y.no_ver and x.kode_lokasi=y.kode_lokasi "+
						 "     left join spb_m z on f.no_spb=z.no_spb and f.kode_lokasi=z.kode_lokasi "+
						 "where x.no_ver ='"+this.e_nb.getText()+"' and x.kode_lokasi = '"+this.app._lokasi+"' "+
						 "union all "+
						 "select x.tanggal as tgl,y.catatan,case f.progress when '1' then 'APPROVE' when 'R' then 'REVISI' end as progress,f.no_spb,z.nik_buat,z.nik_sah,z.nik_fiat,z.nik_bdh, "+
					     "       f.no_pb,convert(varchar,f.tanggal,103) as tanggal,a.no_hutang,f.nilai,f.keterangan,a.kode_pp+' - '+b.nama as pp,a.kode_vendor+' - '+d.nama as vendor, convert(varchar,f.tgl_input,103) as tgl_input, f.nik_buat+' - '+c.nama as pengaju,a.akun_hutang,d.bank+' - '+d.cabang +' - '+ d.no_rek +' - '+d.nama_rek as transfer,convert(varchar,f.due_date,103) as due_date "+
						 "from hutang_m a inner join pb_m f on a.no_hutang=f.no_pb and a.kode_lokasi=f.kode_lokasi and f.no_hutang=f.no_pb "+ //f.no_hutang=f.no_pb -------> pb non akru
						 "     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join karyawan c on f.nik_buat=c.nik and f.kode_lokasi=c.kode_lokasi "+
						 "     inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+						 
						 "     inner join ver_m x on f.no_ver=x.no_ver and x.kode_lokasi=f.kode_lokasi "+
						 "     inner join ver_d y on x.no_ver=y.no_ver and x.kode_lokasi=y.kode_lokasi "+
						 "     left join spb_m z on f.no_spb=z.no_spb and f.kode_lokasi=z.kode_lokasi "+
						 "where x.no_ver ='"+this.e_nb.getText()+"' and x.kode_lokasi = '"+this.app._lokasi+"' ";		

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){															
						this.dp_d1.setText(line.tgl);										
						this.e_nb2.setText(line.no_spb);
						this.c_status.setText(line.progress.toUpperCase());					
						this.e_nopb.setText(line.no_pb);
						this.e_tgl.setText(line.tanggal);
						this.e_nohutang.setText(line.no_hutang);
						this.e_duedate.setText(line.due_date);
						this.e_ket.setText(line.keterangan);
						this.e_pp.setText(line.pp);
						this.e_akun.setText(line.akun_hutang);
						this.e_vendor.setText(line.vendor);
						this.e_bank.setText(line.transfer);
						this.e_user.setText(line.pengaju);
						this.e_tglinput.setText(line.tgl_input);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_memo.setText(line.catatan);						
						this.cb_buat.setText(line.nik_buat);
						this.cb_tahu.setText(line.nik_sah);
						this.cb_fiat.setText(line.nik_fiat);
						this.cb_bdh.setText(line.nik_bdh);					
					} 
				}			
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,isnull(b.nama,'-') as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from spb_j a "+
							"       inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"       inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
							"       left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis = 'TAMBAH' and a.no_spb = '"+this.e_nb2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);
				setTipeButton(tbUbahHapus);				
				
			}		
			
		}
	},
	doLoad:function(sender){				
		var strSQL = "select case f.progress when '0' then 'INPROG' when '1' then 'APPROVE' when 'R' then 'REVISI' end as status, f.no_pb,convert(varchar,f.tanggal,103) as tanggal, a.no_hutang,f.nilai,f.keterangan,a.kode_pp+' - '+b.nama as pp,a.kode_vendor+' - '+d.nama as vendor, convert(varchar,f.tgl_input,103) as tgl_input, f.nik_buat+' - '+c.nama as pengaju,a.akun_hutang,d.bank+' - '+d.cabang +' - '+ d.no_rek +' - '+d.nama_rek as transfer,convert(varchar,f.due_date,103) as due_date,'PBHU' as modul "+
					 "from hutang_m a inner join pb_m f on a.no_hutang=f.no_hutang and a.kode_lokasi=f.kode_lokasi and f.no_hutang<>f.no_pb "+ //f.no_hutang<>f.no_pb ---------->  pb dengan akru 
					 "     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "     inner join karyawan c on f.nik_buat=c.nik and f.kode_lokasi=c.kode_lokasi "+
					 "     inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+						 
					 "where f.progress = '0' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					 "union all "+
					 "select case f.progress when '0' then 'INPROG' when '1' then 'APPROVE' when 'R' then 'REVISI' end as status,f.no_pb,convert(varchar,f.tanggal,103) as tanggal,a.no_hutang,f.nilai,f.keterangan,a.kode_pp+' - '+b.nama as pp,a.kode_vendor+' - '+d.nama as vendor, convert(varchar,f.tgl_input,103) as tgl_input, f.nik_buat+' - '+c.nama as pengaju,a.akun_hutang,d.bank+' - '+d.cabang +' - '+ d.no_rek +' - '+d.nama_rek as transfer,convert(varchar,f.due_date,103) as due_date,'PBNON' as modul "+
					 "from hutang_m a inner join pb_m f on a.no_hutang=f.no_pb and a.kode_lokasi=f.kode_lokasi and f.no_hutang=f.no_pb "+ //f.no_hutang=f.no_pb -------> pb non akru
					 "     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "     inner join karyawan c on f.nik_buat=c.nik and f.kode_lokasi=c.kode_lokasi "+
					 "     inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+						 
					 "where f.progress = '0' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";			 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doCari:function(sender){				
		var filter = "";		
		if (this.e_nobukti.getText()!="") filter = " where  f.progress in ('0','1','R') and f.no_pb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " where  f.progress in ('0','1','R') and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"'";		
		
		if (filter !="") {
			var strSQL = "select case f.progress when '0' then 'INPROG' when '1' then 'APPROVE' when 'R' then 'REVISI' end as status,f.no_pb,convert(varchar,f.tanggal,103) as tanggal,a.no_hutang,f.nilai,f.keterangan,a.kode_pp+' - '+b.nama as pp,a.kode_vendor+' - '+d.nama as vendor, convert(varchar,f.tgl_input,103) as tgl_input, f.nik_buat+' - '+c.nama as pengaju,a.akun_hutang,d.bank+' - '+d.cabang +' - '+ d.no_rek +' - '+d.nama_rek as transfer,convert(varchar,f.due_date,103) as due_date,'PBHU' as modul "+
						"from hutang_m a inner join pb_m f on a.no_hutang=f.no_hutang and a.kode_lokasi=f.kode_lokasi and f.no_hutang<>f.no_pb "+
						"     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"     inner join karyawan c on f.nik_buat=c.nik and f.kode_lokasi=c.kode_lokasi "+
						"     inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
						"     left join spb_m x on f.no_spb=x.no_spb and f.kode_lokasi=x.kode_lokasi and x.no_kas='-'  "+
						filter+
						"union all "+
						"select case f.progress when '0' then 'INPROG' when '1' then 'APPROVE' when 'R' then 'REVISI' end as status,f.no_pb,convert(varchar,f.tanggal,103) as tanggal,a.no_hutang,f.nilai,f.keterangan,a.kode_pp+' - '+b.nama as pp,a.kode_vendor+' - '+d.nama as vendor, convert(varchar,f.tgl_input,103) as tgl_input, f.nik_buat+' - '+c.nama as pengaju,a.akun_hutang,d.bank+' - '+d.cabang +' - '+ d.no_rek +' - '+d.nama_rek as transfer,convert(varchar,f.due_date,103) as due_date,'PBNON' as modul "+
						"from hutang_m a inner join pb_m f on a.no_hutang=f.no_pb and a.kode_lokasi=f.kode_lokasi "+
						"     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"     inner join karyawan c on f.nik_buat=c.nik and f.kode_lokasi=c.kode_lokasi "+
						"     inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
						"     left join spb_m x on f.no_spb=x.no_spb and f.kode_lokasi=x.kode_lokasi and x.no_kas='-' "+
						"  "+filter;

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Filter harus terisi.","");
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.status.toUpperCase(),line.no_pb,line.tanggal,line.no_hutang,floatToNilai(line.nilai),line.keterangan,line.pp,line.vendor,line.tgl_input,line.pengaju,line.akun_hutang,line.due_date,line.transfer,line.modul.toUpperCase()]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {	
								if(this.preView == "1"){
									this.nama_report="server_report_saku3_cianjur_rptHutangSpb";
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb2.getText()+"' ";
									this.filter2 = this.e_periode.getText();
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
									system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
									this.clearLayar();
								} 						
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
	doChange:function(sender){
		if(sender==this.e_nilaikb && this.e_nilaikb.getText() != "") 
		{
			var strSQL = "select nik from app_otorisasi where "+nilaiToFloat(this.e_nilaikb.getText())+" between nilai_min and nilai_max and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.cb_fiat.setText(line.nik);					
				} 
			}
		}
	},
	doChangeCell1: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg1.cells(2,row) != "" && this.sg1.cells(4,row) != "") {
				this.sg1.validasi();			
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
		sender.onChange.set(this,"doChangeCell1");			
	},	
	doNilaiChange1: function(){
		try{			
			var debet = kredit = tot = 0;
			tot = nilaiToFloat(this.e_nilai.getText());
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "C") {
						tot -= nilaiToFloat(this.sg1.cells(4,i));
						kredit += nilaiToFloat(this.sg1.cells(4,i));
					}
					else {
						tot += nilaiToFloat(this.sg1.cells(4,i));
						debet += nilaiToFloat(this.sg1.cells(4,i));
					}
				}
			}									
			this.e_debet.setText(floatToNilai(debet));			
			this.e_kredit.setText(floatToNilai(kredit));			
			this.e_nilaikb.setText(floatToNilai(tot));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg1.cells(5,row) == "") && (row > 0)) {
						this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
						this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
					}
					else {
						this.sg1.setCell(5,row,this.app._kodePP);
						this.sg1.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}			
			}
		}catch(e){
			systemAPI.alert(e);
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); 
			this.doClick();
			this.doLoad();
			this.e_memo.setText("-");
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});