window.app_saku3_transaksi_tm_fTakTerimaSimple = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_tm_fTakTerimaSimple.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fTakTerimaSimple";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Terima", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.pc1 = new pageControl(this,{bound:[10,18,1000,470], childPage:["Daftar Kirim","Penerimaan","Item Jurnal","Data Anggaran","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:9,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Flag","Lok. Asal","Tgl Input"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[110,60,100,150,100,400,100,150,70,70,80,100,80]],
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,13,202,20],caption:"Status",items:["FINAL"], readOnly:true,tag:2,change:[this,"doChange"],visible:false});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,80],caption:"Keterangan",tag:9,readOnly:true});
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[520,13,450,80],caption:"Catatan App.",tag:9,readOnly:true,visible:false});
				
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[520,11,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,230,20],caption:"No Terima", readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"PP/Unit", readOnly:true});		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,230,20],caption:"No Bukti", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Deskripsi", readOnly:true});		
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,230,20],caption:"Tgl Bukti", readOnly:true});		
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,200,20],caption:"Due Date", readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Pembuat", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"No Dokumen", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,200,20],caption:"Nilai TAK", readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.sgt = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,230],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					nilaiChange:[this,"doNilaiChange"],readOnly:true,colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgnt = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgt});		
		
		this.sgv = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"]
					});
		this.sgnv = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgv});		
		this.e_debet = new saiLabelEdit(this.sgnv,{bound:[540,2,200,20],caption:"Total Debet", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kredit = new saiLabelEdit(this.sgnv,{bound:[780,2,200,20],caption:"Total Kredit", readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});

		this.c_status2 = new saiCB(this.pc1.childPage[4],{bound:[20,10,200,20],caption:"Status",items:["INPROG","FINAL"], readOnly:true,tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[4],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[4].rearrangeChild(10, 23);			
				
		setTipeButton(tbSimpan);
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.e_memo2.setReadOnly(true);
			this.c_status.setText("");									
			
			this.dataPP = this.app._pp;						
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+					
			        "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");												
			this.dbLib.getMultiDataProviderA(sql);			
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;													
				}
			}
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.c_status.setText("FINAL");
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_tm_fTakTerimaSimple.extend(window.childForm);
window.app_saku3_transaksi_tm_fTakTerimaSimple.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	mainButtonClick: function(sender, desk){
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
			if (this.stsProg == "INPROG") this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.stsProg != "INPROG") {
						sql.add("update takkirim_m set progress='0',no_terima='-' where no_kirim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");
						sql.add("delete from takterima_m where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from takterima_j where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");				
					}					
					sql.add("update takkirim_m set progress='1',no_terima='"+this.e_nb.getText()+"' where no_kirim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");
					sql.add("insert into takterima_m (no_terima,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,kode_lokkirim,no_kirim) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_memo.getText()+"','"+this.app._kodePP+"','"+this.e_modul.getText()+"','TAKTERIMA','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.kodeLokAsal+"','"+this.e_nobukti.getText()+"')");
								
					if (this.sgt.getRowValidCount() > 0){
						for (var i=0;i < this.sgt.getRowCount();i++){
							if (this.sgt.rowValid(i)){
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgt.cells(0,i)+"','"+this.sgt.cells(3,i)+"','"+this.sgt.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sgt.cells(4,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.e_modul.getText()+"','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
							}
						}
					}
					if (this.sgv.getRowValidCount() > 0){
						for (var i=0;i < this.sgv.getRowCount();i++){
							if (this.sgv.rowValid(i)){
								var j=i+100;
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sgv.cells(0,i)+"','"+this.sgv.cells(3,i)+"','"+this.sgv.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sgv.cells(4,i))+",'"+this.sgv.cells(5,i)+"','-','"+this.app._lokasi+"','"+this.e_modul.getText()+"','LAWAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
							}
						}
					}
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
										"('"+this.e_nb.getText()+"','TAKTERIMA','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(4,i))+","+nilai+")");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg2.clear(1); this.sgt.clear(1); this.sgv.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("");
					this.e_memo.setText("");
					this.c_status.setText("FINAL");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :							
			case "ubah" :														
				this.preView = "1";				
				this.sgv.validasi();				
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				for (var i=0;i < this.sgv.getRowCount();i++){					
					if (!this.sgv.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sgv.getColCount();j++){
							if (this.sgv.cells(j,i) != "") {
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
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(5,i))>0 && nilaiToFloat(this.sg2.cells(4,i)) < nilaiToFloat(this.sg2.cells(5,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																																			
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit harus Balance.");
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
					sql.add("update takkirim_m set progress='0',no_terima='-' where no_kirim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");
					sql.add("delete from takterima_m where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from takterima_j where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
		this.doClick();
		this.doLoad();
	},	
	doChange:function(sender){				
		if (sender == this.c_status && this.c_status.getText() != "") {
			this.sgv.clear(1);			
		}
	},
	doClick:function(sender){
		if (this.e_nobukti.getText()!="" && this.noTerima == "-") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TT"+this.e_periode.getText().substr(2,4)+".","0000"));												
			this.c_status.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_modul.setText(this.sg.cells(0,row));
				this.e_nobukti.setText(this.sg.cells(1,row));								
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_duedate.setText(this.sg.cells(4,row));
				this.e_pp.setText(this.sg.cells(5,row));
				this.e_dok.setText(this.sg.cells(6,row));
				this.e_ket.setText(this.sg.cells(7,row));
				this.e_nilai.setText(this.sg.cells(8,row));
				this.e_buat.setText(this.sg.cells(9,row));										
				this.kodeLokAsal = this.sg.cells(11,row);				
				this.stsProg = this.sg.cells(2,row);
				this.noTerima = this.sg.cells(10,row);	
				this.e_nb.setText(this.sg.cells(10,row));	
				if (this.stsProg == "INPROG") {
					setTipeButton(tbSimpan); 
					this.doClick();				
				}
				else {
					setTipeButton(tbUbahHapus);
					var data = this.dbLib.getDataProvider("select f.tanggal,f.periode,f.keterangan as memo,f.nik_setuju,a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							   "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							   "                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							   "                   inner join takterima_m f on a.no_terima=f.no_terima and a.kode_lokasi=f.kode_lokasi "+							   
							   "where a.jenis='LAWAN' and a.no_terima = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgv.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sgv.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
						}
						this.cb_app.setText(line.nik_setuju);
						this.e_memo.setText(line.memo);
						this.dp_d1.setText(line.tanggal);
						this.e_periode.setText(line.periode);
					} else this.sgv.clear(1);								
				}
				
				var strSQL = "select isnull(d.catatan,'-') as catatan "+
							 "from takkirim_m a inner join app_d d on a.ref1 = d.no_app and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_kirim='"+this.e_nobukti.getText()+"' and a.kode_loktuj='"+this.app._lokasi+"' ";					 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_memo2.setText(line.catatan);													
					}
				}																										
				if (this.e_modul.getText() == "TAKUMUM") {
					var strSQLTak = "select a.kode_akun,b.nama as nama_akun,case a.dc when 'D' then 'C' else 'D' end as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
									"from takkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+										
									"                  inner join flag_relasi e on b.kode_akun=e.kode_akun and b.kode_lokasi=e.kode_lokasi and e.kode_flag = '016' "+									
									"where a.no_kirim = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.kodeLokAsal+"' order by a.no_urut";
				}
				var data = this.dbLib.getDataProvider(strSQLTak,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgt.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sgt.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sgt.clear(1);			
			
			}
		} catch(e) {alert(e);}
	},			
	doLoad:function(sender){																		
		var strSQL = "select a.no_kirim as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_terima,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
		             "from takkirim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                  inner join karyawan c on a.nik_user=c.nik "+					 
					 "where a.progress='0' and a.kode_loktuj='"+this.app._lokasi+"' and a.modul= 'TAKUMUM' and a.periode<='"+this.e_periode.getText()+"' ";
		
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
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '0' "; 
		if (this.c_status2.getText() == "FINAL") filter = " and a.progress = '1' "; 	
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		if (this.c_status2.getText() == "INPROG") {
			var strSQL = "select a.no_kirim as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_terima,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from takkirim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                  inner join karyawan c on a.nik_user=c.nik "+					 
						 "where a.kode_loktuj='"+this.app._lokasi+"' "+filter;					 					 
		}
		if (this.c_status2.getText() == "FINAL") {
			var strSQL = "select a.no_kirim as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_terima,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from takkirim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                  inner join karyawan c on a.nik_user=c.nik "+					 
						 "                  inner join takterima_m d on a.no_terima=d.no_terima and a.kode_loktuj=d.kode_lokasi and d.posted='F' "+
						 "where a.kode_loktuj='"+this.app._lokasi+"' "+filter;					 					 
		}				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},		
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_terima,line.kode_lokasi,line.tglinput]); 
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
							if (this.preView == "1") {
								if (this.c_status.getText() == "FINAL") {
									this.nama_report="server_report_saku3_tm_rptTakTerima";
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_terima='"+this.e_nb.getText()+"' ";
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
			this.sg2.clear(1); this.sgt.clear(1); this.sgv.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbSimpan);
			this.c_status.setText("FINAL");
		} catch(e) {
			alert(e);
		}
	},		
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"C");						
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
	doChangeCell: function(sender, col, row){
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
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){		
		try{
			var totD = totC = 0;						
			for (var i = 0; i < this.sgt.getRowCount();i++){
				if (this.sgt.rowValid(i) && this.sgt.cells(4,i) != ""){
					if (this.sgt.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sgt.cells(4,i));
					if (this.sgt.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sgt.cells(4,i));
				}
			}
			for (var i = 0; i < this.sgv.getRowCount();i++){
				if (this.sgv.rowValid(i) && this.sgv.cells(4,i) != ""){
					if (this.sgv.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sgv.cells(4,i));
					if (this.sgv.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sgv.cells(4,i));
				}
			}			
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+							
						"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
						"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
						["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
						"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
						"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
						["kode_pp","nama"],"and",["Kode","Nama"],false);				
			}										
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sgv.getRowCount();i++){
			if (this.sgv.rowValid(i) && this.sgv.cells(5,i) != "-"){
				if (this.sgv.cells(2,i) == "D") nilai = nilaiToFloat(this.sgv.cells(4,i));
				else nilai = nilaiToFloat(this.sgv.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sgv.cells(0,i) == this.sg2.cells(0,j) && this.sgv.cells(5,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sgv.cells(0,i),this.sgv.cells(1,i),this.sgv.cells(5,i),this.sgv.cells(6,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(5,idx));
					total = total + nilai;
					this.sg2.setCell(5,idx,total);
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

