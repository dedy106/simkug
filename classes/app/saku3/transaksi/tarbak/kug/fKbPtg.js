window.app_saku3_transaksi_tarbak_kug_fKbPtg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_kug_fKbPtg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_kug_fKbPtg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Pertanggungan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Transaksi","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No KasBank","Tanggal","No Ref","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,350,150,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],			
					readOnly:true, click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
	
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis",items:["BM","CL"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});		
		
		this.cb_ptg = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Pertanggungan", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});							
		this.cb_nik = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK Panjar", readOnly:true, tag:1,change:[this,"doChange"]});							
		this.cb_nopj = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Panjar", readOnly:true, tag:1,change:[this,"doChange"]});							
		this.cb_akunpj = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun Panjar",  readOnly:true, tag:1});							
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai Panjar", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.e_kas = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Nilai Kas", tag:1, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});				
		this.cb_akunkb = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});							
		this.e_ptg = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total Pertanggn", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,213], childPage:["Item Pertanggungan"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
					colTitle:["Kode MTA","Nama MTA","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					readOnly:true,					
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
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
			this.cb_akunpj.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag ='002' "+
			                      "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								  "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
								  
			this.c_jenis.setText("BM");
			this.isiCBReim();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_kug_fKbPtg.extend(window.childForm);
window.app_saku3_transaksi_tarbak_kug_fKbPtg.implement({	
	isiCBReim: function() {
		this.cb_ptg.setSQL("select no_ptg, keterangan from ptg_m where periode <='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and progress='1' and no_kas='-' ",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Pertanggungan",true);
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
			if (this.stsSimpan == 1) {
				if (this.e_kas.getText() == "0") this.c_jenis.setText("FP");
				else this.c_jenis.setText("BM");
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			}

			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();			
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update ptg_m set no_kas='-',progress='1' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("update pbh_pb_m set progress='1',no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					}
								
					//ptg_m tidak diposting
					sql.add("update ptg_m set progress='2',no_kas='"+this.e_nb.getText()+"' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("update pbh_pb_m set progress='2',no_kas='"+this.e_nb.getText()+"' where no_pb='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_ptg.getText()+"','-','"+this.cb_akunkb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.kodePP+"','KBPTG','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_kas.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");									

					if (this.e_kas.getText() != "0") {
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',777,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_kas.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPTG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");					
					}
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
							"select '"+this.e_nb.getText()+"',no_ptg,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-','-',kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',getdate(),'-' "+
							"from ptg_j where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.isiCBReim();
					this.sg1.clear(1);
					this.sg3.clear(1);								
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";	
				if (nilaiToFloat(this.e_kas.getText()) == 0) {
					this.cb_akunkb.setTag("9");
					this.cb_akunkb.setReadOnly(true);
				}			
				else {
					this.cb_akunkb.setTag("1");
					this.cb_akunkb.setReadOnly(false);
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
					sql.add("update ptg_m set no_kas='-' ,progress='1' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("update pbh_pb_m set progress='1',no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
		if (this.stsSimpan==1) {
			this.isiCBReim();
			this.doClick();			
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText() != "") {
			if (this.stsSimpan == 0) {								
				this.e_nilai.setText("0");		
				this.sg1.clear(1);
				this.sg3.clear(1);
				this.isiCBReim();										
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){
		try {										
			if (sender == this.cb_nik && this.cb_nik.getText()!="") {			
				var data = this.dbLib.getDataProvider("select kode_pp from karyawan where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.kodePP = line.kode_pp;					
					} 
				}															
			}
			if (sender == this.cb_ptg && this.cb_ptg.getText()!="") {
				var strSQL = "select b.nik_pengaju,b.akun_pj,b.nilai,b.no_pj,b.keterangan as ket_pj "+
							 "from ptg_m a "+
							 "inner join panjar_m b on a.no_pj=b.no_pj and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_ptg='"+this.cb_ptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.cb_nik.setText(line.nik_pengaju);						
						this.cb_akunpj.setText(line.akun_pj);	
						this.e_nilai.setText(floatToNilai(line.nilai));								
						this.cb_nopj.setSQL("select no_pj, keterangan from panjar_m where no_pj='"+line.no_pj+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],false,["No Panjar","Deskripsi"],"and","Data Panjar",true);
						this.cb_nopj.setText(line.no_pj,line.ket_pj);
					} 
				}

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from ptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='BEBAN' and a.no_ptg = '"+this.cb_ptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);		
				this.sg1.validasi();
			}

			if (sender == this.e_kas && this.stsSimpan==1) {
				if (this.e_kas.getText() == "0") {
					this.c_jenis.setText("FPJ");
					this.cb_akunkb.setTag("9");
					this.cb_akunkb.setReadOnly(true);
				}
				else {
					this.c_jenis.setText("BM");
					this.cb_akunkb.setTag("1");
					this.cb_akunkb.setReadOnly(false);
				}

				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			}
		}
		catch(e) {alert(e);}
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
			this.e_ptg.setText(floatToNilai(totD - totC));
			this.e_kas.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_ptg.getText())));
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
								this.nama_report="server_report_saku3_pbh_ypt_rptKbJurnalPtg";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbSimpan);
			this.isiCBReim();
			this.sg1.clear(1);
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,a.tanggal "+
		             "from kas_m a "+			 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KBPTG' and a.posted ='F' "+
					 "order by a.tanggal";
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
								
				var strSQL = "select a.tanggal,a.jenis,a.keterangan,a.akun_kb,b.no_ptg "+
							 "from kas_m a inner join ptg_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);					
						this.c_jenis.setText(line.jenis);	
						this.e_ket.setText(line.keterangan);							
						this.cb_akunkb.setText(line.akun_kb);	
						
						this.cb_ptg.setSQL("select no_ptg, keterangan from ptg_m where no_ptg='"+line.no_ptg+"' and kode_lokasi='"+this.app._lokasi+"' and no_kas='"+this.e_nb.getText()+"' ",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Pertanggungan",true);
						this.cb_ptg.setText(line.no_ptg);
					}
				}				
			}
		} catch(e) {alert(e);}		
	}
});