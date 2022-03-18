window.app_saku3_transaksi_spm_fAjuIF = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fAjuIF.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fAjuIF";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Kas Operasional DRK: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","NIK","Nilai","Catatan"],
					colWidth:[[6,5,4,3,2,1,0],[250,90,100,200,100,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"No Dok SK", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:200});
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK Pemegang",tag:2,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"NIK Approval",tag:2,multiSelection:false}); 				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai I/F", tag:1, tipeText:ttNilai, text:"0"});				
		
		this.e_namarek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Nama Rekening", maxLength:100});				
		this.e_norek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"No Rekening", maxLength:50});				
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,450,20],caption:"Bank", maxLength:100});				
		this.e_cabang = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,450,20],caption:"Cabang", maxLength:100});				
		
		this.e_memo = new saiMemo(this.pc2.childPage[0],{bound:[20,10,450,60],caption:"Catatan",tag:9,visible:false});				
		
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","NIK Approval",true);			
			this.cb_pp.setText(this.app._kodePP);
			
			this.akunIF = "";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('AKUNIF') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNIF") this.akunIF = line.flag
				}
			}
			
			this.e_memo.setReadOnly(true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fAjuIF.extend(window.childForm);
window.app_saku3_transaksi_spm_fAjuIF.implement({		
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
						sql.add("delete from spm_if_m where no_if='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update spm_if_m set no_flag='-',flag_aktif='1' where nik='"+this.cb_nik.getText()+"' and no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into spm_if_m (no_if,tanggal,no_dokumen,keterangan,kode_lokasi,periode,tgl_input,nik_user,nik,kode_pp,nilai,flag_aktif,nik_app,no_ver,no_spb,no_kas,akun_if,no_flag,progress,no_app1,no_app2,no_app3,no_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_nik.getText()+"','"+this.cb_pp.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'0','"+this.cb_app.getText()+"','-','-','-','"+this.akunIF+"','-','0','-','-','-','-')");					
					
					 sql.add("insert into spm_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,cabang,bruto,pajak,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','IFAJU','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",0,"+nilaiToFloat(this.e_nilai.getText())+")");
					
					sql.add("update spm_if_m set no_flag='"+this.e_nb.getText()+"',flag_aktif='0' where no_if<>'"+this.e_nb.getText()+"' and no_flag='-' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					setTipeButton(tbSimpan);
					this.e_namarek.setText("-");
					this.e_norek.setText("-");
					this.e_bank.setText("-");					
					this.e_cabang.setText("-");					
				break;
			case "simpan" :		
			case "ubah" :															
				this.preView = "1";			
				if (this.akunIF == "") {
					system.alert(this,"Transaksi tidak valid.","Akun I/F (Flag AKUNIF) belum disetting di Sistem Prosedur.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from spm_if_m where no_if='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spm_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update spm_if_m set no_flag='-',flag_aktif='1' where nik='"+this.cb_nik.getText()+"' and no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				sql.add("delete from spm_app_j where kode_lokasi='"+this.app._lokasi+"' and no_app in (select no_app from spm_app_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");
				sql.add("delete from spm_app_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); 
				this.e_memo.hide();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_if_m","no_if",this.app._lokasi+"-IF"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doChange:function(sender){		
		if (sender == this.cb_pp) {
			if (this.stsSimpan == 1) this.cb_nik.setText("","");															
			if (this.cb_pp.getText() !="") this.cb_nik.setSQL("select nik,nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
		}
		if (sender == this.cb_nik && this.cb_nik.getText() !="" && this.stsSimpan == 1) {
			var strSQL = "select bank,cabang,no_rek,nama_rek from karyawan where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_norek.setText(line.no_rek);												
					this.e_namarek.setText(line.nama_rek);												
					this.e_bank.setText(line.bank);
					this.e_cabang.setText(line.cabang);											
				}
			}
			
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_if='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
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
			this.e_namarek.setText("-");
			this.e_norek.setText("-");
			this.e_bank.setText("-");
			this.e_cabang.setText("-");
			this.sg3.clear(1);
			this.e_memo.hide();
			this.pc2.setActivePage(this.pc2.childPage[0]);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_if,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nik+' - '+b.nama as nik,a.nilai, "+
					 //"case when progress = 'C' then isnull(c.catatan,'-') else isnull(d.catatan,'-') end as catatan "+
					 "case when a.progress = 'C' then isnull(c.catatan,'-') "+
					 "	   when a.progress = 'X' then isnull(f.catatan,'-') "+
					 "	   when a.progress = 'V' then isnull(d.catatan,'-') "+
					 "end as catatan "+
		             "from spm_if_m a inner join karyawan b on a.kode_lokasi=b.kode_lokasi and a.nik=b.nik "+					 					 
					 "			      left join spm_app_m c on a.no_if=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.no_flag='-' and c.form = 'APPCAB' "+
					 "			      left join spm_app_m f on a.no_if=f.no_bukti and a.kode_lokasi=f.kode_lokasi and f.no_flag='-' and f.form = 'APPFIL' "+
					 "			      left join spm_app_m d on a.no_if=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.no_flag='-' and d.form = 'APPVER' "+					 
					 "where a.kode_pp='"+this.app._kodePP+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','C','F',V') ";		
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
			this.sg3.appendData([line.no_if,line.tgl,line.no_dokumen,line.keterangan,line.nik,floatToNilai(line.nilai),line.catatan]); 
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
				this.e_memo.setText(this.sg3.cells(6,row));	
				this.e_memo.show();							
								
				var strSQL = "select a.tanggal,a.no_dokumen,a.keterangan,a.nik,a.nik_app,a.kode_pp,a.nilai, "+
							 "b.bank,b.cabang,b.no_rek,b.nama_rek "+
				             "from spm_if_m a inner join spm_rek b on a.no_if=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.modul='IFAJU' "+
							 "where a.no_if = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.cb_nik.setText(line.nik);												
						this.cb_app.setText(line.nik_app);
						this.cb_pp.setText(line.kode_pp);						
						this.e_nilai.setText(floatToNilai(line.nilai));						
						
						this.e_norek.setText(line.no_rek);												
						this.e_namarek.setText(line.nama_rek);												
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);	
																
					}
				}								
				
			}									
		} catch(e) {alert(e);}
	}
	
	
});