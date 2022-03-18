window.app_saku3_transaksi_sju16_fVer2 = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sju16_fVer2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fVer2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		

		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar Bukti","Verifikasi","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:0,
		            colTitle:["Detail","No PB","Status","Tgl PB","Kode PP","Deskripsi","Kurs","Nilai","No Verifikasi","Kode Curr","Due Date","Nilai Curr"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,80,100,100,80,200,70,80,80,100,80]],
					colFormat:[[0,7],[cfButton,cfNilai]],
					colHide:[[9,10,11],true],
					click:[this,"doSgBtnClick1"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick"],				
					readOnly:true,autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,18,210,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:2});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9});						

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,996,319], childPage:["Data PB","File Dok","Cat. Approval","Atensi & Otorisasi"]});				
		this.e_nb = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Approval", readOnly:true,visible:false});	
		this.e_npb = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No PB", readOnly:true});					
		this.e_tgl = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"Tgl PB", maxLength:50,readOnly:true});						
		this.e_tgl2 = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,10,200,20],caption:"Due Date", maxLength:50,readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,450,20],caption:"Deskripsi", readOnly:true});				
		this.e_totalCurr = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Total [Curr]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,20,155,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[180,20,40,20],caption:"Kurs", tag:2, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,20,200,20],caption:"Total [IDR]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	

		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,16,this.pc2.width-5,187],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun ","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,250,50,150,100]],					
					readOnly:true,colFormat:[[4],[cfNilai]],					
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});					
		
		this.sgUpld = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 
					click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:3, grid:this.sgUpld});

		this.sgctt = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-12,this.pc2.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

		this.cb_vendor = new saiCBBL(this.pc2.childPage[3],{bound:[20,16,220,20],caption:"Atensi/Mitra", readOnly:true});								
		this.e_bank = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,17,450,20],caption:"Bank", maxLength:100,readOnly:true});				
		this.iUbah = new portalui_imageButton(this.pc2.childPage[3],{bound:[475,17,20,20],hint:"Ubah",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doEdit"]});		
		this.e_norek = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,18,450,20],caption:"No Rekening", maxLength:50,readOnly:true});				
		this.e_namarek = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,19,450,20],caption:"Nama Rekening", maxLength:100,readOnly:true});					
		this.e_spasi1 = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,99,200,20],caption:"", tag:1, readOnly:true, visible:false, tag:7, text:""});					

		this.cb_app1 = new saiCBBL(this.pc2.childPage[3],{bound:[20,12,220,20],caption:"NIK VP Finance", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app2 = new saiCBBL(this.pc2.childPage[3],{bound:[20,13,220,20],caption:"NIK DIRKUG", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app3 = new saiCBBL(this.pc2.childPage[3],{bound:[20,14,220,20],caption:"NIK DIRUT", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app4 = new saiCBBL(this.pc2.childPage[3],{bound:[20,15,220,20],caption:"NIK Treasury", multiSelection:false, maxLength:10, tag:9,visible:false});							
		this.bGen = new button(this.pc2.childPage[3],{bound:[120,20,98,18],caption:"Otorisasi",click:[this,"doLoadDefOto"]});			

		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:20, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[3].rearrangeChild(10, 23);
				
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
			
			this.cb_app1.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='VPFIN' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app2.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='DIRKUG' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' union select '-' as nik,'-' as nama",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app3.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='DIRUT' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'  union select '-' as nik,'-' as nama",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app4.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='MANTS' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.doLoadCtt(this.e_npb.getText());  
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_sju16_fVer2.extend(window.childForm);
window.app_saku3_transaksi_sju16_fVer2.implement({	
	doEdit: function(){
		if (this.stsROBank == 1) {
			this.e_bank.setReadOnly(false);
			this.e_norek.setReadOnly(false);
			this.e_namarek.setReadOnly(false);
			this.stsROBank = 0;
		}
		else {
			this.e_bank.setReadOnly(true);
			this.e_norek.setReadOnly(true);
			this.e_namarek.setReadOnly(true);
			this.stsROBank = 1;
		}
	},
	doLoadDefOto: function(sender,totalRow){	
		this.cb_app2.setText("","");
		this.cb_app3.setText("","");

		var data = this.dbLib.getDataProvider(
				   "select a.nik,a.status from sju_oto a where ("+nilaiToFloat(this.e_total.getText())+" between a.awal and a.akhir) and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_def='1' "+
				   "union "+
				   "select a.nik,a.status from sju_oto a where (a.akhir < "+nilaiToFloat(this.e_total.getText())+") and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_def='1' "
				   ,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				if (line.status == "VPFIN") this.cb_app1.setText(line.nik);
				if (line.status == "DIRKUG") this.cb_app2.setText(line.nik);
				if (line.status == "DIRUT") this.cb_app3.setText(line.nik);
				if (line.status == "MANTS") this.cb_app4.setText(line.nik);
			}
		} 

		if (this.cb_app2.getText() == "") this.cb_app2.setText("-","-");
		if (this.cb_app3.getText() == "") this.cb_app3.setText("-","-");

		this.pc2.setActivePage(this.pc1.childPage[3]);	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.c_status.getText() == "APPROVE") var vStatus = "2";
					else var vStatus = "V";

					sql.add("insert into sju_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,no_dokumen,no_verseb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','VER','"+this.e_npb.getText()+"','-')");

					sql.add("insert into sju_ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+vStatus+"','PBPROSES','"+this.e_npb.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
												
					//---------------- flag bukti									
					if (this.c_status.getText() == "APPROVE") sql.add("update sju_pb_m set progress='"+vStatus+"', no_ver='"+this.e_nb.getText()+"',nik_app1='"+this.cb_app1.getText()+"',nik_app2='"+this.cb_app2.getText()+"',nik_app3='"+this.cb_app3.getText()+"',nik_app4='"+this.cb_app4.getText()+"'  where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					else sql.add("update sju_pb_m set progress='"+vStatus+"', no_ver='"+this.e_nb.getText()+"',nik_app1='-',nik_app2='-',nik_app3='-',nik_app4='-'  where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

					//ubah ke master
					if (this.stsROBank == 0) {
						sql.add("update sju_vendor_pb set bank ='"+this.e_bank.getText()+"',no_rek='"+this.e_norek.getText()+"', nama_rek='"+this.e_namarek.getText()+"' "+
								"where kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
								
						sql.add("delete from sju_pb_rek where no_pb = '"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("insert into sju_pb_rek (no_pb,kode_lokasi,kode_vendor,bank,no_rek,nama_rek) values "+
								"('"+this.e_npb.getText()+"','"+this.app._lokasi+"','"+this.cb_vendor.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");		
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
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 0) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1); sgUpld.clear(1);
					this.doClick();
					this.stsROBank = 1;
					this.e_bank.setReadOnly(true);
					this.e_norek.setReadOnly(true);
					this.e_namarek.setReadOnly(true);
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :								
				this.preView = "1";		
				if (this.e_bank.getText() == "-" || this.e_norek.getText() == "-" || this.e_namarek.getText() == "-") {
					system.alert(this,"Transaksi tidak valid.","Data Rekening Mitra tidak lengkap.");
					return false;
				}	
				else				
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
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
			this.stsROBank = 1;
			this.e_bank.setReadOnly(true);
			this.e_norek.setReadOnly(true);
			this.e_namarek.setReadOnly(true);
			this.doClick();
			this.doLoad();
			this.cb_nb.setSQL("select a.no_pb,a.keterangan from sju_pb_m a where a.periode <='"+this.e_periode.getText()+"' and a.modul='PBPROSES' and a.progress = '1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No PB","Deskripsi"],"and","Data PB",true);
		}
	},	
	doChange:function(sender){								
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {										
			var strSQL = "select a.due_date,a.no_pb,'APPROVE' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as due_date,a.kurs,a.kode_curr,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,a.nilai_curr,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							"from sju_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"                inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);								
			
			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
		
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_ver_m","no_ver",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_npb.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				
				this.e_npb.setText(this.sg.cells(1,row));								
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_tgl2.setText(this.sg.cells(10,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.c_curr.setText(this.sg.cells(9,row));
				this.e_kurs.setText(this.sg.cells(6,row));
				this.e_totalCurr.setText(this.sg.cells(11,row));
				this.e_total.setText(this.sg.cells(7,row));												
				this.doLoadDet();
				this.doLoadCtt(this.e_npb.getText());

				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join dok_jenis_pb b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_npb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

				var strSQL = "select b.bank,b.no_rek,b.nama_rek,a.kode_vendor,a.nama as nama_vendor "+
							 "from sju_pb_rek b inner join sju_vendor_pb a on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+								 
							 "where b.no_pb = '"+this.e_npb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";									 						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);							
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);						
					}
				}	
				
				if (this.sg.cells(2,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					this.e_nb.setText(this.sg.cells(8,row));
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;					
				}
				
			}
		} catch(e) {alert(e);}
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},		
	doLoadDet:function(){
		var strSQL1 = "select a.kode_akun, b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
					  "from sju_pb_j a "+
					  "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+					  
					  "where a.no_pb ='"+this.e_npb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
			}
		} else this.sg1.clear(1);													
	},	
	doLoad:function(sender){	
		try {					
			var strSQL = "select case when no_ver ='-' then 'INPROG' else 'APPROVE' end as status, no_pb, convert(varchar,tanggal,103) as tgl,kode_pp,keterangan, nilai,kode_curr,kurs,no_ver,nilai_curr,due_date "+
						 "from sju_pb_m "+
						 "where periode <='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and progress='1' and modul='PBPROSES' and no_kas='-'  ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
		catch(e) {
			alert(e);
		}							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData(["Detail",line.no_pb,line.status.toUpperCase(),line.tgl,line.kode_pp,line.keterangan,line.kurs,floatToNilai(line.nilai),line.no_ver,line.kode_curr,line.due_date,floatToNilai(line.nilai_curr)]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange1: function(){		
		try{
			var tot = 0;

			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg1.cells(4,i));
				}
			}
			this.e_totalCurr.setText(floatToNilai(tot));	
			this.e_total.setText(floatToNilai(tot * nilaiToFloat(this.e_kurs.getText())));			
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
								this.nama_report="server_report_saku3_spm_rptSpbForm";									                  
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   								
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
			this.sg1.clear(1); sgUpld.clear(1);
			this.stsROBank = 1;
			this.e_bank.setReadOnly(true);
			this.e_norek.setReadOnly(true);
			this.e_namarek.setReadOnly(true);
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,a.tanggal,103) as tgl,a.tanggal "+
						 "from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_bukti='"+kode+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.no_ver<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,a.tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select b.catatan,a.no_ver, convert(varchar,a.tanggal,103) as tgl,a.tanggal, convert(varchar,a.tgl_input,108) as jam,a.nik_user "+
								  "from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
								  "where b.no_bukti='"+kode+"' and a.tanggal='"+line.tanggal+"' and a.kode_lokasi='"+this.app._lokasi+"'  and a.no_ver<>'"+this.noAppLama+"' "+
								  "order by a.tanggal desc,convert(varchar,a.tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});

