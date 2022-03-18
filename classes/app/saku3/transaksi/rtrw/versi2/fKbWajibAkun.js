window.app_saku3_transaksi_rtrw_versi2_fKbWajibAkun = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fKbWajibAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fKbWajibAkun";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Iuran Wajib by Akun", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pembayaran","List Pembayaran"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","No Rumah","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,210,20],caption:"Status",items:["BM"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Rek KasBank", multiSelection:false, maxLength:10, tag:2});							
		this.cb_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Jenis Iuran", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.cb_rumah = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"No Rumah", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Saldo Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_bayar = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Nilai Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,290], childPage:["Data Billing"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
				colTitle:["Status","Periode Bill","Iuran RT","Iuran RW","Total"],
				colWidth:[[4,3,2,1,0],[100,80,80,80,80]],
				columnReadOnly:[true,[0,1,2,3,4],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.i_bayar = new portalui_imageButton(this.sgn1,{bound:[960,3,20,20],hint:"Bayar Seluruhnya",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doBayar"]});								
		
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
			this.stsSimpan=1;
			this.c_jenis.setText("BM");	
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_rumah.setSQL("select a.kode_rumah, c.nama from rt_rumah a "+
								 "inner join karyawan_pp b on a.rt=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "inner join rt_warga c on a.kode_penghuni=c.nik "+
								 "where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","nama"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
			
			this.cb_jenis.setSQL("select kode_jenis,nama from rt_iuran_jenis where jenis='REGULER' and kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Iuran",true);			
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Rek KasBank",true);			
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fKbWajibAkun.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fKbWajibAkun.implement({
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rt_angs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gldt where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					var kasIDR = nilaiToFloat(this.e_bayar.getText());
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','RTRW','KBIUR','T','0','0','"+this.kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+
							"','IDR',1,"+kasIDR+",0,0,'-','-','-','-','-','-','"+this.cb_rumah.getText()+"','"+this.cb_jenis.getText()+"','"+this.cb_akun.getText()+"')");
										
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+this.nilaiRW+","+this.nilaiRW+",'"+this.e_ket.getText()+"','RTRW','KBRW','IDR',1,'"+this.kodePP+"','-','-','-','-','-','-','-','-')");				
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+this.nilaiRT+","+this.nilaiRT+",'"+this.e_ket.getText()+"','RTRW','KBRT','IDR',1,'"+this.kodePP+"','-','-','-','-','-','-','-','-')");				

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPdpt+"','C',"+this.nilaiRT+","+this.nilaiRT+",'"+this.e_ket.getText()+"','RTRW','PDPT','IDR',1,'"+this.kodePP+"','-','-','-','-','-','-','-','-')");
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunTitip+"','C',"+this.nilaiRW+","+this.nilaiRW+",'"+this.e_ket.getText()+"','RTRW','TITIP','IDR',1,'"+this.kodePP+"','-','-','-','-','-','-','-','-')");
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BAYAR"){
							sql.add("insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_rumah.getText()+"','"+this.cb_jenis.getText()+"','"+this.sg1.cells(1,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.app._lokasi+"','"+this.kodePP+"','D','KBIUR','KAS','-')");									
						}
					}	


					//auto posting
					sql.add("insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
							"select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' "+
							"from trans_j "+
							"where kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.e_nb.getText()+" '");
									
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
					this.sg1.clear(1); 					
					setTipeButton(tbSimpan);
					this.doClick();
					this.cb_rumah.setSQL("select a.kode_rumah, c.nama from rt_rumah a inner join karyawan_pp b on a.rt=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "inner join rt_warga c on a.kode_penghuni=c.nik "+
								 "where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","nama"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.sg1.validasi();								
				
				if (nilaiToFloat(this.e_bayar.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
					return false;						
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from rt_angs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from gldt where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		try	{	
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12){
				this.e_periode.setText(y+""+m);			
			}
			else {
				this.e_periode.setText(this.app._periode);					
			}		

			if (this.stsSimpan == 1) this.doClick();	
		}
		catch(e) {
			alert(e);
		}			
	},
	doChange:function(sender){		
		try	{
			if (sender == this.cb_rumah && this.cb_rumah.getText()!="") {
				var strSQL = "select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt "+
							 "from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi "+
							 "where b.kode_lokasi='"+this.app._lokasi+"' and b.kode_rumah='"+this.cb_rumah.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.kodePP = line.kode_pp;		
						this.cb_akun.setText(line.akun_kas);						
						this.akunTitip = line.akun_titip;
						this.akunPdpt = line.akun_pdpt;						
					}					
				}
			}						
			if ((sender == this.cb_rumah || sender == this.cb_jenis) && this.cb_rumah.getText()!="" && this.cb_jenis.getText()!="" && this.stsSimpan==1) {
				var strSQL = "select a.*, (a.nilai_rt-isnull(b.nilai_rt,0)) as sisa_rt,  (a.nilai_rw-isnull(b.nilai_rw,0)) as sisa_rw,  "+
							 " (a.nilai_rt-isnull(b.nilai_rt,0)) +  (a.nilai_rw-isnull(b.nilai_rw,0)) as sisa_total   "+
							 "from rt_bill_d a "+
							 "left join "+
							 
							 "(select kode_rumah,kode_lokasi,periode_bill,kode_jenis,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw "+
							 "from rt_angs_d where kode_lokasi='"+this.app._lokasi+"' group by kode_rumah,kode_lokasi,periode_bill,kode_jenis ) "+
							 
							 " b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi and a.periode=b.periode_bill and a.kode_jenis=b.kode_jenis "+
							
							 "where a.kode_rumah='"+this.cb_rumah.getText()+"' and a.kode_jenis = '"+this.cb_jenis.getText()+
							 "' and ((a.nilai_rt-isnull(b.nilai_rt,0)) +  (a.nilai_rw-isnull(b.nilai_rw,0))) > 0 "+
							 "order by a.periode"; 							 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData(["INPROG",line.periode,floatToNilai(line.sisa_rt),floatToNilai(line.sisa_rw),floatToNilai(line.sisa_total)]);
					}
				} else this.sg1.clear(1);

				this.e_ket.setText("Penerimaan "+this.cb_jenis.rightLabelCaption+" atas rumah "+this.cb_rumah.getText());

				this.sg1.validasi();
			}	
							
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		try {			
			if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {

				if (this.stsSimpan == 0) {
					this.sg1.clear(1);
				}
				this.stsSimpan = 1;					
				this.cb_rumah.setSQL("select a.kode_rumah, c.nama from rt_rumah a inner join karyawan_pp b on a.rt=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									"inner join rt_warga c on a.kode_penghuni=c.nik "+
									"where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","nama"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
				
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.cb_jenis.setFocus();
				setTipeButton(tbSimpan);
			}	
		}
		catch(e) {
			alert(e);
		}	
	},	
	doNilaiChange1: function(){
		try{			
			var saldo = bayar = 0;
			this.nilaiRW = this.nilaiRT = 0;
						
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(0,i)=="BAYAR") {
						bayar += nilaiToFloat(this.sg1.cells(4,i));
						
						this.nilaiRT += nilaiToFloat(this.sg1.cells(2,i));
						this.nilaiRW += nilaiToFloat(this.sg1.cells(3,i));						
					}
				}
			}			
			this.e_total.setText(floatToNilai(saldo));	
			this.e_bayar.setText(floatToNilai(bayar));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 0) {				
			this.sg1.validasi();
		}
	},	
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "INPROG") this.sg1.cells(0,row,"BAYAR");
		else this.sg1.cells(0,row,"INPROG");
	},
	doBayar: function(sender) {
		for (var i = 0; i < this.sg1.getRowCount();i++) {
			this.sg1.cells(0,i,"BAYAR");
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "X") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.doClick();
			this.cb_rumah.setSQL("select a.kode_rumah, c.nama from rt_rumah a inner join karyawan_pp b on a.rt=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "inner join rt_warga c on a.kode_penghuni=c.nik "+
								 "where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","nama"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.param1,a.keterangan "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'KBIUR'";//autoposting	
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.param1,line.keterangan]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.e_ket.setText(line.keterangan);
						this.cb_rumah.setText(line.param1);		
						this.cb_jenis.setText(line.param2);	
						this.cb_akun.setText(line.param3);				
						this.cb_rumah.setSQL("select a.kode_rumah, c.nama from rt_rumah a "+
											 "inner join rt_warga c on a.kode_penghuni=c.nik "+
								 			 "where a.kode_rumah='"+line.param1+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","nama"],false,["No Rumah","Nama"],"and","Data Rumah",true);			

					}
				}
				
				var strSQL = "select *,nilai_rt+nilai_rw as total "+
				             "from rt_angs_d  "+
				             "where no_angs ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData(["BAYAR",line.periode_bill,floatToNilai(line.nilai_rt),floatToNilai(line.nilai_rw),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
												
			}						
		} catch(e) {alert(e);}
	}
});