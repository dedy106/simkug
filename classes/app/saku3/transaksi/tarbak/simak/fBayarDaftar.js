window.app_saku3_transaksi_tarbak_simak_fBayarDaftar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fBayarDaftar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fBayarDaftar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Biaya Pendaftaran Calon Siswa Baru", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,15,220,20],caption:"Sekolah", readOnly:true, tag:2 });		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});		
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc1 = new pageControl(this,{bound:[5,12,1000,410], childPage:["Data Pembayaran","Daftar Pembayaran"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:2,
					colTitle:["No. Bukti","ID Registrasi","Nama","Tarif"],
					colWidth:[[3,2,1,0],[100,350,150,150]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No. Bukti",maxLength:20,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});					
		this.cb_kb = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Akun Kas Bank", multiSelection:false, maxLength:10, tag:2 });				
		this.cb_reg = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"ID Registrasi",multiSelection:false,tag:1,change:[this,"doChange"]});				
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tarif",readOnly:true, maxLength:50, tag:1, tipeText:ttNilai, text:"0"});							

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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

			this.cb_kb.setSQL("select a.kode_akun,a.nama from masakun a "+
							  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
							  "where a.block='0' and a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);			

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='REGPDPT' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunPdpt = line.flag;
			} else this.akunPdpt = "";
			
			if (this.akunPdpt == "") {
				system.alert(this,"SPRO PDPT (REGPDPT) tidak ditemukan.","");
			}

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Sekolah",true);
			this.cb_pp.setText(this.app._kodePP);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fBayarDaftar.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fBayarDaftar.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from sis_reg_bayar where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}			

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,tgl_input,nik_user,nik_app,posted,no_del,no_link,ref1,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_kb.getText()+"','"+this.dp_d1.getDateString()+"','Pembayaran Registrasi Siswa No. : "+this.cb_reg.getText()+"','"+this.cb_pp.getText()+"','KBREG','BM','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_tarif.getText())+",'-',getdate(),'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.cb_reg.getText()+"','-')");

					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_kb.getText()+"','Pembayaran Registrasi Siswa No. "+this.cb_reg.getText()+"','D',"+parseNilai(this.e_tarif.getText())+",'"+this.cb_pp.getText()+"','-','-','"+this.cb_reg.getText()+"','"+this.app._lokasi+"','KBREG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_tarif.getText())+")");	
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPdpt+"','Pembayaran Registrasi Siswa No. "+this.cb_reg.getText()+"','C',"+parseNilai(this.e_tarif.getText())+",'"+this.cb_pp.getText()+"','-','-','"+this.cb_reg.getText()+"','"+this.app._lokasi+"','KBREG','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_tarif.getText())+")");	

					sql.add("insert into sis_reg_bayar(no_kas,no_reg,periode,nilai,kode_lokasi,akun_kas,akun_pdpt,dc,modul,kode_pp) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_reg.getText()+"','"+this.e_periode.getText()+"',"+parseNilai(this.e_tarif.getText())+",'"+this.app._lokasi+"','"+this.cb_kb.getText()+"','"+this.akunPdpt+"','D','KBREG','"+this.cb_pp.getText()+"')");							
							
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
					if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.sg1.clear();
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();

					var strSQL = "select a.no_reg,a.nama "+
								"from sis_siswareg a "+
								"	left join ( "+
								"				select no_reg,kode_pp from sis_reg_bayar "+
								"				where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
								"			  ) c on a.no_reg=c.no_reg and a.kode_pp=c.kode_pp "+
								"where c.no_reg is null and a.kode_pp ='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

					this.cb_reg.setSQL(strSQL,["no_reg","nama"],false,["No. Registrasi","Nama"],"and","Data Regsitrasi",true);
				break;

			case "simpan" :
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_tarif.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang nol.");
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
					sql.add("delete from sis_reg_bayar where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);

		if (this.stsSimpan == 1) {
			this.doClick();
			
			var strSQL = "select a.no_reg,a.nama "+
						 "from sis_siswareg a "+
						 "	left join ( "+
						 "				select no_reg,kode_pp from sis_reg_bayar "+
						 "				where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						 "			  ) c on a.no_reg=c.no_reg and a.kode_pp=c.kode_pp "+
						 "where c.no_reg is null and a.kode_pp ='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

			this.cb_reg.setSQL(strSQL,["no_reg","nama"],false,["No. Registrasi","Nama"],"and","Data Regsitrasi",true);
		}
	},
	doClick:function(sender){	
		if (this.stsSimpan == 0) {
			this.sg3.clear();
			var strSQL = "select a.no_reg,a.nama "+
						"from sis_siswareg a "+
						"	left join ( "+
						"				select no_reg,kode_pp from sis_reg_bayar "+
						"				where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						"			  ) c on a.no_reg=c.no_reg and a.kode_pp=c.kode_pp "+
						"where c.no_reg is null and a.kode_pp ='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

			this.cb_reg.setSQL(strSQL,["no_reg","nama"],false,["No. Registrasi","Nama"],"and","Data Regsitrasi",true);
		}

		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
		setTipeButton(tbSimpan);
		this.cb_kb.setFocus();
		this.stsSimpan = 1;
	},
	doChange: function(sender){
		try{				
			if (this.cb_reg.getText() != ""){
				var strSQL = "select b.tarif from sis_siswareg a inner join sis_tarif_daftar b on a.kode_pp=b.kode_pp "+
							 "where a.kode_pp='"+this.cb_pp.getText()+"' and a.no_reg ='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_tarif.setText(floatToNilai(line.tarif));																 						
					}
				}
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
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_siswa_rptCdOut";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = this.filter2;
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				
			setTipeButton(tbAllFalse);
			this.sg1.clear();
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.doClick();

			var strSQL = "select a.no_reg,a.nama "+
						"from sis_siswareg a "+
						"	left join ( "+
						"				select no_reg,kode_pp from sis_reg_bayar "+
						"				where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						"			  ) c on a.no_reg=c.no_reg and a.kode_pp=c.kode_pp "+
						"where c.no_reg is null and a.kode_pp ='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

			this.cb_reg.setSQL(strSQL,["no_reg","nama"],false,["No. Registrasi","Nama"],"and","Data Regsitrasi",true);
			
		} catch(e) {
			alert(e);
		}
	},

	doLoad3:function(sender){						
		var strSQL = "select a.no_kas,c.no_reg,c.nama,b.nilai  "+
					 "from kas_m a inner join sis_reg_bayar b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
					 "			   inner join sis_siswareg c on b.no_reg=c.no_reg and b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_pp='"+this.cb_pp.getText()+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBREG' and a.posted ='F'";

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
			this.sg3.appendData([line.no_kas,line.no_reg,line.nama,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.cb_kb.setText(line.akun_kb);	
						this.e_tarif.setText(floatToNilai(line.nilai));	
								
						this.cb_reg.setSQL("select no_reg, nama from sis_siswareg where no_reg ='"+line.ref1+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "
									      ,["no_reg","nama"],false,["No Reg","Nama"],"and","Daftar Calon Siswa",true);		
						this.cb_reg.setText(line.ref1);											
					}
				}				
			}						
		} catch(e) {alert(e);}
	}

});
