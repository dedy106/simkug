window.app_saku3_transaksi_rtrw_fAkruIuran = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_fAkruIuran.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_fAkruIuran";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing Iuran", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Billing","Daftar Billing"]});
		this.sg3 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_desc = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,15,450,20],caption:"Keterangan", maxLength:150});														
		this.e_total = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,15,200,20],caption:"Total",tipeText:ttNilai,text:"0",readOnly: true});
		this.bTampil = new portalui_button(this.pc3.childPage[0],{bound:[509,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
		this.pc1 = new pageControl(this.pc3.childPage[0],{bound:[1,12,995,350], childPage:["Daftar Rumah"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,750,this.pc1.height-35],colCount:6,tag:9,		            
				colTitle:["No Rumah","Periode Bill","Keterangan","Nilai RW","Nilai RT","Total"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,200,80,100]],
				colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);
		this.pc3.childPage[0].rearrangeChild(10, 23);	
		
		this.e_rw = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[790,10,200,20],caption:"Total RW",tipeText:ttNilai,text:"0",readOnly: true});
		this.e_rt = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[790,33,200,20],caption:"Total RT",tipeText:ttNilai,text:"0",readOnly: true});
			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
				
			//akun dipotong dan ditambah pp sesuai pp (rt) user login	
			var data = this.dbLib.getDataProvider("select kode_spro,substring(flag,1,4)+'"+this.app._kodePP.substr(1,1)+"' as flag from spro where kode_spro in ('IURPIURW','IURPIURT','IURTTP','IURPDPT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "IURPIURW") this.akunPiuRW = line.flag;	
					if (line.kode_spro == "IURPIURT") this.akunPiuRT = line.flag;		
					if (line.kode_spro == "IURTTP") this.akunTtp = line.flag;	
					if (line.kode_spro == "IURPDPT") this.akunPdpt = line.flag;													
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_fAkruIuran.extend(window.portalui_childForm);
window.app_saku3_transaksi_rtrw_fAkruIuran.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from rt_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rt_bill_j where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update a set a.periode_bill = b.periode "+
								"from rt_rumah a inner join rt_bill_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");												
						sql.add("delete from rt_bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
										
					sql.add("insert into rt_bill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENBILL')");
													
					sql.add("insert into rt_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiuRW+"','"+this.e_desc.getText()+"','D',"+nilaiToFloat(this.e_rw.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GENBILL','PIURW','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
					sql.add("insert into rt_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiuRT+"','"+this.e_desc.getText()+"','D',"+nilaiToFloat(this.e_rt.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GENBILL','PIURT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
					
					
					sql.add("insert into rt_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunTtp+"','"+this.e_desc.getText()+"','C',"+nilaiToFloat(this.e_rw.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GENBILL','TTPRW','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
					sql.add("insert into rt_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunPdpt+"','"+this.e_desc.getText()+"','C',"+nilaiToFloat(this.e_rt.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GENBILL','PDPTRT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
					
					sql.add("insert into rt_bill_d (kode_rumah,no_bill,kode_lokasi,periode,nilai,akun_piurw,akun_piurt,akun_titip,akun_pdpt,dc,modul,nilai_rw,nilai_rt) "+
							"select x.kode_rumah,'"+this.e_nb.getText()+"',x.kode_lokasi,'"+this.e_periode.getText()+"',x.nilai_rw+x.nilai_rt,'"+this.akunPiuRW+"','"+this.akunPiuRT+"','"+this.akunTtp+"','"+this.akunPdpt+"','D','GENBILL',x.nilai_rw,x.nilai_rt "+
							"from rt_rumah x "+
						    " where x.kode_lokasi = '"+this.app._lokasi+"' and x.nilai_rw+nilai_rt > 0  and "+
						    "       x.periode_bill<='"+this.e_periode.getText()+"' and x.rt='"+this.app._kodePP+"' ");
					
					var pNext = getNextPeriode(this.e_periode.getText());		
					sql.add("update a set a.periode_bill ='"+pNext+"' from rt_rumah a inner join rt_bill_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi "+
					        "where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' ");
					
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg1.clear(1); this.sg3.clear(1);
					this.bTampil.setVisible(true);
					this.e_desc.setText("Billing Iuran Periode "+this.e_periode.getText()+" RT "+this.app._kodePP);	
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total akru billing tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
					sql.add("delete from rt_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rt_bill_j where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.periode_bill = b.periode "+
							"from rt_rumah a inner join rt_bill_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");												
					sql.add("delete from rt_bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.e_desc.setText("Billing Iuran Periode "+this.e_periode.getText()+" RT "+this.app._kodePP);	
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); this.sg3.clear(1); 
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rt_bill_m","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_desc.setFocus();
		setTipeButton(tbSimpan);			
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg1.clear(1);
				var strSQL = "select kode_rumah,periode_bill,keterangan,nilai_rw,nilai_rt,nilai_rw + nilai_rt as total "+
				             "from rt_rumah where periode_bill<='"+this.e_periode.getText()+"' and rt='"+this.app._kodePP+"' order by nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				
				var tot = totrt = totrw = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.total);	
					totrw = totrw + parseFloat(line.nilai_rw);	
					totrt = totrt + parseFloat(line.nilai_rt);												
				}
				this.e_rw.setText(floatToNilai(totrw));
				this.e_rt.setText(floatToNilai(totrt));
				this.e_total.setText(floatToNilai(tot));
			} 
			else {
				system.alert(this,"Periode harus valid.","Filter dari tanggal transaksi.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.kode_rumah,line.periode_bill,line.keterangan,floatToNilai(line.nilai_rw),floatToNilai(line.nilai_rt),floatToNilai(line.total)]);
		}
		this.sg1.setNoUrut(start);		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc3.hide();
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
				this.pc3.show();   
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
			this.sg1.clear(1); this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);		
			this.bTampil.setVisible(true);			
			this.stsSimpan = 1;
			this.e_desc.setText("Billing Iuran Periode "+this.e_periode.getText()+" RT "+this.app._kodePP);	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from rt_bill_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.modul='GENBILL'";		
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc3.setActivePage(this.pc3.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.bTampil.setVisible(false);
											
				var strSQL = "select * from rt_bill_m "+							 
							 "where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_desc.setText(line.keterangan);																							
					}
				}												
											
				
				this.sg1.clear(1);
				var strSQL = "select a.kode_rumah,b.periode as periode_bill,a.keterangan,b.nilai_rw,b.nilai_rt,b.nilai as total "+
				             "from rt_rumah a  inner join rt_bill_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi "+
				             "where b.no_bill ='"+this.e_nb.getText()+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				
				var tot = totrt = totrw = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.total);	
					totrw = totrw + parseFloat(line.nilai_rw);	
					totrt = totrt + parseFloat(line.nilai_rt);												
				}
				this.e_rw.setText(floatToNilai(totrw));
				this.e_rt.setText(floatToNilai(totrt));
				this.e_total.setText(floatToNilai(tot));
										
				
			}									
		} catch(e) {alert(e);}
	}
});