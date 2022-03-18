window.app_saku3_transaksi_siaga_fKbLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fKbLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fKbLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Load", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Batch","Tanggal","Referensi","Total"],
					colWidth:[[3,2,1,0],[100,300,80,100]],colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Batch",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				

		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["CD","BD"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cabang = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});					
		this.cb_ref = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Ref Transaksi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,15,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bGenBukti = new portalui_button(this.pc2.childPage[0],{bound:[650,15,80,18],caption:"Gen Bukti",click:[this,"doGenBukti"]});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,282], childPage:["Data Transaksi","Otorisasi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
		            colTitle:["Tanggal","Atensi","Keterangan","Nilai","No Bukti"],
					colWidth:[[4,3,2,1,0],[150,100,350,250,80]],					
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPage"]});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("BD");

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
			
			this.cb_cabang.setSQL("select kode_cabang, nama from gr_cabang where kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			this.cb_bank.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
							
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fKbLoad.extend(window.childForm);
window.app_saku3_transaksi_siaga_fKbLoad.implement({
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
	doLoadBuktiCari : function() {
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='KBUM'";		
		this.cb_bukti.setSQL(strSQL,["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);			
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
				this.doClick();
				this.doGenBukti();
			}

			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					var data = this.dbLib.getDataProvider("select akun_debet,akun_kredit from gr_refkasload where kode_ref='"+this.cb_ref.getText()+"'",true);						   
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							var akunDebet = line.akun_debet;
							var akunKredit = line.akun_kredit;
						} 
					}	

					sql.add("insert into gr_batch_kas (no_batch,kode_lokasi,keterangan,tanggal,cabang,jenis,akun_kas,nik_pembuat,nilai,tgl_input,nik_user,periode) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_ref.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cabang.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_bank.getText()+"','"+this.cb_buat.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"')");

					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){				
								var j = 1000+i;			
								var tglSQL = this.sg.cells(0,i).substr(6,4)+"-"+this.sg.cells(0,i).substr(3,2)+"-"+this.sg.cells(0,i).substr(0,2);
								var periodeKas = this.sg.cells(0,i).substr(6,4)+this.sg.cells(0,i).substr(3,2);
								sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
										"('"+this.sg.cells(4,i)+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','-','"+akunDebet+"','"+tglSQL+"','"+this.sg.cells(2,i)+"','"+this.cb_cabang.getText()+"','KBLOAD','"+this.c_jenis.getText()+"','"+periodeKas+"','IDR','1',"+nilaiToFloat(this.sg.cells(3,i))+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.sg.cells(1,i)+"','"+this.cb_bank.getText()+"')");

								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.sg.cells(4,i)+"','"+this.e_nb.getText()+"','"+tglSQL+"',"+i+",'"+akunDebet+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(3,i))+",'"+this.app._kodePP+"','-','-','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','KBLOAD','KB','"+periodeKas+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',"+nilaiToFloat(this.sg.cells(3,i))+")");		
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.sg.cells(4,i)+"','"+this.e_nb.getText()+"','"+tglSQL+"',"+j+",'"+akunKredit+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(3,i))+",'"+this.app._kodePP+"','-','-','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','KBLOAD','LAWAN','"+periodeKas+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',"+nilaiToFloat(this.sg.cells(3,i))+")");		

								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.sg.cells(4,i)+"','KBLOAD','"+this.app._lokasi+"','"+akunKredit+"','-','"+this.e_nb.getText()+"','"+periodeKas+"','"+periodeKas+"','C',0,"+nilaiToFloat(this.sg.cells(3,i))+")");
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.cb_ref.setText("");
					this.bGenBukti.show();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.cells(1,i) == "***--- POSTED ---***") {
						system.alert(this,"Transaksi tidak dapat dieksekusi.","Terdapat bukti kas yang sudah diposting.(Periksa kolom Atensi)");
						return false;
					}
				}

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {						
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_batch_kas where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_m where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("delete from angg_r where kode_drk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
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
			
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){
		if ((sender == this.cb_cabang || sender == this.cb_bank) && this.cb_cabang.getText()!="" && this.cb_bank.getText()!="" && this.stsSimpan==1) {
			this.cb_ref.setText("","");
			this.cb_ref.setSQL("select kode_ref, nama from gr_refkasload where kode_cabang='"+this.cb_cabang.getText()+"' and kode_bank='"+this.cb_bank.getText()+"'",["kode_ref","nama"],false,["Kode","Nama"],"and","Data Referensi",true);			
		}								
	},
	doGenBukti: function() {
		if (this.c_jenis.getText()!= "" && this.cb_cabang.getText()!= "" && this.cb_bank.getText()!= "") {						
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/"+this.cb_cabang.getText()+"/";			
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_kas,3,20)),0) as no_kas from kas_m where no_kas like '_____"+AddFormat+"%"+this.cb_bank.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_kas == "0") var idx = 1; 
					else {
						var idx = parseFloat(line.no_kas.substr(0,3)) + 1;						
					}
				} 
			}			

			for (var i=0;i < this.sg.getRowCount();i++){				
				var k = idx+i;
				var j = k.toString();
				if (j.length == 1) var nu = "00"+j;
				if (j.length == 2) var nu = "0"+j;
				if (j.length == 3) var nu = j;
				this.sg.cells(4,i,this.c_jenis.getText()+nu+AddFormat+this.cb_bank.getText());
			}

		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1); this.sg3.clear(1);	
			this.bGenBukti.show();					
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_batch_kas","no_batch","BTC-"+this.e_periode.getText().substr(2,2)+this.Aperiode+".","0000"));
		this.cb_cabang.setFocus();		
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != ""){
					tot += nilaiToFloat(this.sg.cells(3,i));
				}
			}			
			this.e_total.setText(floatToNilai(tot));
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
								// this.nama_report="server_report_saku2_siaga_rptBuktiBank";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.nb+"' ";
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
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.cb_ref.setText("");
			setTipeButton(tbSimpan);		
			this.bGenBukti.show();	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_batch,convert(varchar,a.tanggal,103) as tgl,b.nama,a.nilai "+
		             "from gr_batch_kas a inner join gr_refkasload b on a.keterangan=b.kode_ref  "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg3.appendData([line.no_batch,line.tgl,line.nama,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
		this.page3 = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		this.page3 = page - 1;
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbHapus);
				this.stsSimpan = 0;		
				this.bGenBukti.hide();
				
				this.e_nb.setText(this.sg3.cells(0,row));	
				var data = this.dbLib.getDataProvider("select * from gr_batch_kas a where a.no_batch='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);						   
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.jenis);					
						this.cb_cabang.setText(line.cabang);
						this.cb_bank.setText(line.akun_kas);						
						this.cb_ref.setSQL("select kode_ref, nama from gr_refkasload where kode_ref='"+line.keterangan+"'",["kode_ref","nama"],false,["Kode","Nama"],"and","Data Referensi",true);			
						this.cb_ref.setText(line.keterangan);
						this.cb_buat.setText(line.nik_pembuat);											
					} 
				}		
				var data = this.dbLib.getDataProvider("select *,convert(varchar,tanggal,103) as tgl from kas_m where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_kas",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						if (line.posted == "T") var atensi = "***--- POSTED ---***";
						else var atensi = line.ref1;					
						this.sg.appendData([line.tgl,atensi,line.keterangan,floatToNilai(line.nilai),line.no_kas]);
					}
				} else this.sg.clear(1);					
			}									
		} catch(e) {alert(e);}
	}
});