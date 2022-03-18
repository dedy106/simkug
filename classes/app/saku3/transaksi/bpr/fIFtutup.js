window.app_saku3_transaksi_bpr_fIFtutup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fIFtutup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fIFtutup";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penutupan Imprest Fund", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sgL = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]], colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClickL"],autoAppend:false,defaultRow:1});		
		this.sgnL = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgL,pager:[this,"doPagerL"]});
		this.bLoadL = new portalui_imageButton(this.sgnL,{bound:[this.sgnL.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoadL"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["BM"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});			
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nilaikb = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Nilai KasBank", readOnly:true,tipeText:ttNilai,text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,18,995,304], childPage:["Data Reimburse","Detail Reimburse"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["No Bukti","Pemegang","Tanggal","No Dokumen","Keterangan","Nilai I/F","Nilai Perttg.","Nilai Kas","Akun IF","PP"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,70,80,80,80,200,100,80,150,100]],
					readOnly:true,colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]], 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Reimburse",click:[this,"doLoad"]});				

		this.e_noptg = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Pertangg.", readOnly:true});						
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"NIK Pemegang", readOnly:true});												
		this.e_nilaiif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai I/F", readOnly:true,tipeText:ttNilai,text:"0"});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,200,20],caption:"Nilai Hut Reimb.", readOnly:true,tipeText:ttNilai,text:"0"});						
		this.e_akunif = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,200,20],caption:"Akun I/F", readOnly:true});						
				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[10,10,this.pc1.width-20,195],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,280,50,200,80]],										
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});

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
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fIFtutup.extend(window.childForm);
window.app_saku3_transaksi_bpr_fIFtutup.implement({
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update trans_m set progress='1',no_ref3='-' where no_bukti='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("update trans_m set progress='2', no_ref3='"+this.e_nb.getText()+"' where no_bukti = '"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBIFTTP','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilaikb.getText())+",0,0,'-','-','-','-','-','-','"+this.e_noptg.getText()+"','"+this.cb_akun.getText()+"','"+this.c_jenis.getText()+"')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',111,'"+this.cb_akun.getText()+"','D',"+Math.abs(nilaiToFloat(this.e_nilaikb.getText()))+","+Math.abs(nilaiToFloat(this.e_nilaikb.getText()))+",'"+this.e_ket.getText()+"','KBIFTTP','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					//akun hutangif		
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_noptg.getText()+"','"+this.dp_d1.getDateString()+"',nu,kode_akun,'D',nilai,nilai_curr,keterangan,'KBIFTTP',jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,'-','-','-' "+
							"from trans_j "+
							"where jenis='BMHD' and no_bukti ='"+this.e_noptg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					//akun if
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_noptg.getText()+"','"+this.dp_d1.getDateString()+"',888,a.kode_akun,'C',a.nilai,a.nilai,c.keterangan,'KBIFTTP','IF','IDR',1,c.kode_pp,'-','-','-','-','-','-','-','-' "+
							"from if_m a inner join trans_m c on a.nik=c.nik1 and a.kode_lokasi=c.kode_lokasi and a.tahun=substring(c.periode,1,4) "+
							"where c.no_bukti ='"+this.e_noptg.getText()+"' and c.kode_lokasi ='"+this.app._lokasi+"'");		
					
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
					this.sg.clear(1); this.sg3.clear(1); this.sgL.clear(1);
					if(this.stsSimpan == 1) this.doClick();
					this.doLoad();
					this.doLoadL();
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :										
			case "ubah" :																		
				this.preView = "1";
				this.sg.validasi();								
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
				this.preView="0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update trans_m set progress='1',no_ref3='-' where no_bukti='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.doLoad();
		}
	},		
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {									
				this.doLoad();
				this.e_akunif.setText("");
				this.e_noptg.setText("");
				this.e_dok2.setText("");
				this.e_ket2.setText("");
				this.e_nik.setText("");
				this.e_nilaiif.setText("0");
				this.e_nilai.setText("0");
				this.e_nilaikb.setText("0");
				this.sg3.clear(1);
				this.sgL.clear(1);
			}
			this.stsSimpan = 1;			
			if (sender == this.i_gen && this.c_jenis.getText()!= "") {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				this.e_dok.setFocus();
			}
			setTipeButton(tbSimpan);			
		}		
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.e_noptg.setText(this.sg.cells(0,row));
			this.e_dok2.setText(this.sg.cells(3,row));			
			this.e_ket2.setText(this.sg.cells(4,row));			
			this.e_nik.setText(this.sg.cells(1,row));						
			this.e_akunif.setText(this.sg.cells(8,row));
			this.e_nilaiif.setText(this.sg.cells(5,row));
			this.e_nilai.setText(this.sg.cells(6,row));
			this.e_nilaikb.setText(this.sg.cells(7,row));
			
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,'D' as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from trans_j a "+
							"			   inner join trans_m x on a.no_bukti=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+
							"              inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.jenis = 'BMHD' and x.no_bukti = '"+this.e_noptg.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' "+
							"union "+
							"select d.kode_akun,d.nama as nama_akun,'C' as dc,b.keterangan,a.nilai,a.kode_pp,e.nama as nama_pp "+
							"from if_m a "+
							"			 inner join trans_m b on a.nik=b.nik1 and a.kode_lokasi=b.kode_lokasi and a.tahun=substring(b.periode,1,4) "+							
							"            inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+	
							"where b.no_bukti = '"+this.e_noptg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
				}				
			} else this.sg3.clear(1);
			this.sg3.validasi();			
		}
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_bukti,c.nik+' - '+c.nama as pemohon,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,aa.nilai as nilai_if, "+
					 "a.nilai1 as nilai,aa.nilai-a.nilai1 as nilai_kas,aa.kode_akun as akun_if,b.kode_pp+' - '+b.nama as pp "+
					 "from trans_m a "+
					 "    inner join if_m aa on a.nik1=aa.nik and a.kode_lokasi=aa.kode_lokasi and aa.tahun=substring(a.periode,1,4) "+					 					 
		             "    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "    inner join karyawan c on aa.nik=c.nik and aa.kode_lokasi=c.kode_lokasi "+
					 "where a.param1='TUTUP' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'";					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_bukti,line.pemohon,line.tanggal,line.no_dokumen,line.keterangan,floatToNilai(line.nilai_if),floatToNilai(line.nilai),floatToNilai(line.nilai_kas),line.akun_if,line.pp]);
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
							if (this.preView=="1") {																
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";								
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
			this.sg.clear(1); this.sg3.clear(1); this.sgL.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			if (this.stsSimpan == 1) {
				this.doClick();
				this.doLoad();			
			}			
		} catch(e) {
			alert(e);
		}
	},	
	doLoadL:function(sender){																							 		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.form as jenis,a.no_dokumen,a.keterangan,a.nilai1 "+
		             "from trans_m a "+
				     "where a.posted='F' and a.form = 'KBIFTTP' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgnL.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgnL.rearrange();
			this.doTampilDataL(1);
		} else this.sgL.clear(1);					
	},
	doTampilDataL: function(page) {
		this.sgL.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sgL.appendData([line.no_bukti,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sgL.setNoUrut(start);
	},
	doPagerL: function(sender, page) {
		this.doTampilDataL(page);
	},
	doDoubleClickL: function(sender, col , row) {
		try{
			if (this.sgL.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sgL.cells(0,row));
												
				var data = this.dbLib.getDataProvider("select * from trans_m "+					   
						   "where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);										
						this.c_jenis.setText(line.param3);
						this.cb_akun.setText(line.param2);
						this.e_nilaikb.setText(floatToNilai(line.nilai1));
					} 
				}				
				var strSQL = "select a.no_bukti,c.nik+' - '+c.nama as pemohon,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,aa.nilai as nilai_if,a.nilai1 as nilai,aa.nilai-a.nilai1 as nilai_kas,aa.kode_akun as akun_if,b.kode_pp+' - '+b.nama as pp "+
					 "from trans_m a "+
					 "		inner join if_m aa on a.nik1=aa.nik and a.kode_lokasi=aa.kode_lokasi and aa.tahun=substring(a.periode,1,4) "+					 					 
		             "		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "		inner join karyawan c on aa.nik=c.nik and aa.kode_lokasi=c.kode_lokasi "+
					 "where a.no_ref3='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);

				this.doDoubleClick(this.sg,0,0);
			}									
		} catch(e) {alert(e);}
	}	
});