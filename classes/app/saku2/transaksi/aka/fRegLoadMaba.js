window.app_saku2_transaksi_aka_fRegLoadMaba = function(owner)
{
	if (owner)
	{
		try {
		window.app_saku2_transaksi_aka_fRegLoadMaba.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fRegLoadMaba";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Registrasi MABA: Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Reg", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_titip = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this,{bound:[20,14,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});
		this.cb_drk = new saiCBBL(this,{bound:[20,15,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,380], childPage:["Data Registrasi MABA"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,		
				colTitle:["No Tes","Nama","NPM","Valid"],				
				colWidth:[[3,2,1,0],[80,100,400,100]],
				readOnly:true,
				afterPaste:[this,"doAfterPaste"],pasteEnable:true,autoPaging:true,rowPerPage:20,
				autoAppend:true, readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1,pager:[this,"doPage"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
		this.setTabChildIndex();
		setTipeButton(tbSimpan);				
		
		this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);			
		this.cb_pp.setSQL("select kode_pp, nama from pp where tipe ='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Pusat Pertanggungjawaban",true);		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		} catch(e) {alert(e);}
	}
};
window.app_saku2_transaksi_aka_fRegLoadMaba.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fRegLoadMaba.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doCek();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doCek: function(){
		try{			
			for (var i = 0; i < this.sg1.getRowCount();i++){ 
				if (this.sg1.rowValid(i) ){
					var strSQL = "select top 1 no_tes from aka_mababill_d where no_tes ='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line == undefined) {							
							this.sg1.cells(3, i, "NOBILL");													
						}											
					}
					var strSQL = "select top 1 no_tes from aka_mababatal_d where no_tes ='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {							
							this.sg1.cells(3, i, "BATAL");													
						}											
					}
					var strSQL = "select no_tes from aka_mabareg_d where no_tes ='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {							
							this.sg1.cells(3, i, "REG");													
						}											
					}
				}
			}			
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :										
					for (var i = 0; i < this.sg1.getRowCount();i++){ 
						if (this.sg1.rowValid(i) && (this.sg1.cells(3,i) == "NOBILL" || this.sg1.cells(3,i) == "BATAL" || this.sg1.cells(3,i) == "REG")){
							var j=i+1;
							system.alert(this,"Transaksi tidak valid.","Data Tes NOBILL atau BATAL.("+j+")");
							return false;						
						}
					}							
					this.stsSimpan = "1";					
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_mabareg_m','no_reg',this.app._lokasi+"-MRG"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							sql.add("insert into aka_mabareg_m(no_reg,no_dokumen,kode_lokasi,periode,tanggal,keterangan,modul,nik_user,tgl_input) values "+ 
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','REGMABA','"+this.app._userLog+"',getdate())");													
							for (var i = 0; i < this.sg1.getRowCount();i++){ 								
								sql.add("insert into aka_mabareg_d(no_reg,kode_lokasi,no_tes,nama,nim) values "+												
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"')");																							
							}														
							//--------------------------------------------------														
							sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input) values "+ 
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','F','"+this.app._userLog+"',getdate())");													
							sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut) "+
									"select '"+this.e_nb.getText()+"',b.kode_lokasi,'"+this.e_nb.getText()+"'+'-'+c.nim,c.nim,'"+this.e_periode.getText()+"',b.kode_produk, a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.nilai,'"+this.e_periode.getText()+"' "+
									"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
									"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
									"where c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
														
							
							var data = this.dbLib.getDataProvider("select kode_produk,akun_piutang,akun_pdpt,akun_pdd from aka_produk where kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line; var nilai = 0; var akunCR = ""; var jenis = "";
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									if (line.kode_produk.toUpperCase() == "BPP") {
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','BPP','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdd+"','"+this.e_ket.getText()+"','C',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','PYT','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
									} 
									if (line.kode_produk.toUpperCase() == "UP3") {
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','UP3','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','PDPT','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
									} 
									if (line.kode_produk.toUpperCase() == "SDP2") {
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','SDP2','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','PDPT','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
									}
									if (line.kode_produk.toUpperCase() == "JPKM") {
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','JPKM','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
										sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
												"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdd+"','"+this.e_ket.getText()+"','C',sum(b.nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BMABA','PDD','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
												"from aka_mababill_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
												"                      inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
												"where b.kode_produk='"+line.kode_produk.toUpperCase()+"' and c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
									}									
								}
							}
														
							//------------ REKON -------------------------------------------
							sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',0,'F','RMABA','"+this.cb_titip.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");							
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) "+																
									"select '"+this.e_nb.getText()+"',c.nim,'"+this.e_nb.getText()+"'+'-'+c.nim,'"+this.e_periode.getText()+"',b.nilai,b.kode_lokasi,'"+this.cb_titip.getText()+"',a.akun_piutang,b.kode_produk,'D','RMABA','-' "+
									"from aka_mabarekon_d b inner join aka_produk a on b.kode_produk = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
									"                       inner join aka_mabareg_d c on b.no_tes=c.no_tes and b.kode_lokasi=c.kode_lokasi "+
									"where c.no_reg = '"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");																
							
							sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,akun_titip,'"+this.e_ket.getText()+"','D',sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',kode_lokasi,'RMABA','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from aka_rekon_d where kode_lokasi='"+this.app._lokasi+"' and no_rekon='"+this.e_nb.getText()+"' group by akun_titip,kode_lokasi");					
							sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',kode_lokasi,'RMABA','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from aka_rekon_d where kode_lokasi='"+this.app._lokasi+"' and no_rekon='"+this.e_nb.getText()+"' group by akun_piutang,kode_lokasi");					
											
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},	
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="")
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_mabareg_m','no_reg',this.app._lokasi+"-MRG"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_ket.setFocus();
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.stsSimpan=="1") {							
							this.nama_report="server_report_saku2_aka_rptBillJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
					}else
						system.info(this, result,"");											
				break;
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
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});
