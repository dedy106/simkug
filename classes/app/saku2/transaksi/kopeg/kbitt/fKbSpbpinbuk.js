window.app_saku2_transaksi_kopeg_kbitt_fKbSpbpinbuk = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fKbSpbpinbuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fKbSpbpinbuk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pinbuk/Droping", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:true}); 				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[320,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});

		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Transaksi","List Bukti"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","No SPB","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,200,80,100]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],												
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No KB",maxLength:30,readOnly:true,visible: false});
		this.cb_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Jenis Bayar", multiSelection:false, maxLength:10, tag:2});		
		this.e_giro = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bilyet", maxLength:50});
		this.cb_spb = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"No SPB",tag:0,multiSelection:false,change:[this,"doChange"]});		
		this.e_nilainet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,11,200,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,18,995,338], childPage:["Detail Rekening"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
		            colTitle:["Kd Rek","Deskripsi","Bank","Cabang","No Rekening","Nama Rekening","Nilai","Param1"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,150,100,150,150,150,80]],
					readOnly:true,colFormat:[[6],[cfNilai]],					
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
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

			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_jenis.setSQL("select kode_kb, nama from it_jeniskb where kode_lokasi='"+this.app._lokasi+"'",["kode_kb","nama"],false,["Kode","Nama"],"and","Data Jenis Bayar",true);
			this.e_giro.setText("-");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fKbSpbpinbuk.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fKbSpbpinbuk.implement({
	isiCbSPB: function() {
		this.cb_spb.setSQL("select no_spb, keterangan from it_spb_m where form in ('PINBUK','TAK') and no_kas='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Data SPB",true);									
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
			var data = this.dbLib.getDataProvider("select jenis,kode_akun from it_jeniskb where kode_kb ='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.jenis = line.jenis;									
					this.akunKB = line.kode_akun;
				} 
			}			

			if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update it_spb_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
						sql.add("update takkirim_m set progress='Z' where no_kirim='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_spb.getText()+"','"+this.e_giro.getText()+"','"+this.akunKB+"','"+this.dp_d1.getDateString()+"','"+this.cb_spb.rightLabelCaption+"','"+this.app._kodePP+"','KBPINBUK','"+this.jenis+"','"+this.e_periode.getText()+"','IDR',1,"+Math.abs(nilaiToFloat(this.e_nilainet.getText()))+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_jenis.getText()+"')");					
					
					sql.add("update it_spb_m set no_kas='"+this.e_nb.getText()+"' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					if (this.formSPB == "PINBUK") {
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
								"select '"+this.e_nb.getText()+"','"+this.cb_spb.getText()+"','"+this.dp_d1.getDateString()+"',a.nu,a.param1,b.keterangan,'D',a.nilai,'"+this.app._kodePP+"','-','-','-',a.kode_lokasi,'KBPINBUK','PINBUK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
								"from it_spb_rek a inner join it_spb_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi  "+
								"where a.no_spb='"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai>0");
					}		
					if (this.formSPB == "TAK") {
						//progress dari Z--->0
						sql.add("update takkirim_m set progress='0' where no_kirim='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunTAK+"','"+this.cb_spb.rightLabelCaption+"','D',"+Math.abs(nilaiToFloat(this.e_nilainet.getText()))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPINBUK','TAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_jenis.getText()+"')");					
					}

					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spb.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunKB+"','"+this.cb_spb.rightLabelCaption+"','C',"+Math.abs(nilaiToFloat(this.e_nilainet.getText()))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPINBUK','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_jenis.getText()+"')");		
																						
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
					this.sg.clear(1); this.sg3.clear(1); 								
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.isiCbSPB();
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																										
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
					sql.add("update it_spb_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("update takkirim_m set progress='Z' where no_kirim='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);								
		this.isiCbSPB();
	},				
	doChange:function(sender){
		if (sender == this.cb_spb && this.cb_spb.getText() != "") this.doLoad();
	},	
	doLoad:function(sender){
		if (this.cb_spb.getText() != "") {			
			var strSQL = "select b.*,c.nama as nama_bank, a.nilai, d.nilai as total, d.form "+
						 "from it_spb_rek a inner join bank_rek b on a.kode_rek=b.kode_rek and a.kode_lokasi=b.kode_lokasi "+	
						 "				    inner join bank c on b.kode_bank=c.kode_bank and b.kode_lokasi=c.kode_lokasi "+		
						 "					inner join it_spb_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokasi "+		 					 
						 "where a.no_spb='"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.e_nilainet.setText(floatToNilai(this.dataJU.rs.rows[0].total));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);

				this.formSPB = this.dataJU.rs.rows[0].form;
				if (this.formSPB == "TAK") {
					var strSQL = "select kode_loktuj,ref1 from takkirim_m where no_kirim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";					 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							this.lokTuj = line.kode_loktuj;
							this.akunTAK = line.ref1;
						}
					}	
				}
			} else this.sg.clear(1);					
		}
		else system.alert(this,"SPB tidak valid.","Pilih No SPB");
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_rek,line.nama,line.nama_bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai),line.kode_akun]);
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
								this.nama_report="server_report_saku2_kopeg_kbitt_rptKbJurnalTuForm";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); this.sg3.clear(1); 						
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.isiCbSPB();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='KBPINBUK' ";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
								
				var data = this.dbLib.getDataProvider("select convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.kode_bank,b.nama,a.no_bg,a.no_dokumen "+
						   "from kas_m a inner join it_jeniskb b on a.kode_bank=b.kode_kb and a.kode_lokasi=b.kode_lokasi "+					   
						   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);										
						this.cb_jenis.setText(line.kode_bank,line.nama);					
						this.e_giro.setText(line.no_bg);					
						this.cb_spb.setSQL("select no_spb, keterangan from it_spb_m where no_kas='"+this.e_nb.getText()+"' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Data SPB",true);									
						this.cb_spb.setText(line.no_dokumen);					
					} 
				}				
			}						
		} catch(e) {alert(e);}
	}		
});


