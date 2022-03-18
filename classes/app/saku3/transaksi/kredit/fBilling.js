window.app_saku3_transaksi_kredit_fBilling = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fBilling.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fBilling";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Generate Tagihan: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Billing","List Bill"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jml Billing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Tot Billing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-111],colCount:3,tag:0,
		            colTitle:["Cabang","Jml Bill","Nilai"],
					colWidth:[[2,1,0],[100,100,400]],					
					readOnly:true, 
					colFormat:[[1,2],[cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
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
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fBilling.extend(window.childForm);
window.app_saku3_transaksi_kredit_fBilling.implement({
	doGenBill: function(sender) {
		var strSQL = "select a.kode_pp+' - '+a.nama as pp, isnull(b.jml,0) as jml, isnull(c.nilai,0) as nilai "+
					 "from pp a "+

					 "left join ("+
					 "select b.kode_lokasi,b.kode_pp,COUNT(*) as jml "+
					 "from kre_ttb2_sch a "+
					 "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_bill= '-' and a.periode ='"+this.e_periode.getText()+"' "+
					 "group by b.kode_pp,b.kode_lokasi "+
					 ") b on a.kode_pp = b.kode_pp and a.kode_lokasi=b.kode_lokasi "+

					 "left join ( "+
					 "select b.kode_lokasi,b.kode_pp,SUM(a.npokok) as nilai "+
					 "from kre_ttb2_sch a "+
					 "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_bill= '-' and a.periode ='"+this.e_periode.getText()+"' "+
					 "group by b.kode_pp,b.kode_lokasi "+
					 ") c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+

					 "where a.kode_lokasi ='"+this.app._lokasi+"' ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			var jml = tot = 0;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				jml += parseFloat(line.jml);
				tot += parseFloat(line.nilai);
				this.sg.appendData([line.pp,floatToNilai(line.jml),floatToNilai(line.nilai)]);
			}
		} else this.sg.clear(1);
		this.e_jml.setText(floatToNilai(jml));
		this.e_nilai.setText(floatToNilai(tot));
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kre_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kre_ttb2_sch set no_bill='-' where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into kre_bill_m (no_bill,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','Bill Periode "+this.e_periode.getText()+"','"+this.app._kodePP+"','BILL','BILL','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-')");
					sql.add("update kre_ttb2_sch set no_bill='"+this.e_nb.getText()+"' where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
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
					sql.add("delete from kre_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update kre_ttb2_sch set no_bill='-' where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();								
	},
	doClick:function(sender){	
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_bill_m","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));						
			setTipeButton(tbSimpan);
			this.doGenBill();			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kredit_rptBill";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
								this.filter2 = this.filter;
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
			this.sg.clear(1); this.sg3.clear(1); 
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from kre_bill_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";						
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
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.kode_pp+' - '+a.nama as pp, isnull(b.jml,0) as jml, isnull(c.nilai,0) as nilai "+
							 "from pp a "+

							 "left join ("+
							 "select b.kode_lokasi,b.kode_pp,COUNT(*) as jml "+
							 "from kre_ttb2_sch a "+
							 "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bill= '"+this.e_nb.getText()+"' "+
							 "group by b.kode_pp,b.kode_lokasi "+
							 ") b on a.kode_pp = b.kode_pp and a.kode_lokasi=b.kode_lokasi "+

							 "left join ( "+
							 "select b.kode_lokasi,b.kode_pp,SUM(a.npokok) as nilai "+
							 "from kre_ttb2_sch a "+
							 "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bill= '"+this.e_nb.getText()+"' "+
							 "group by b.kode_pp,b.kode_lokasi "+
							 ") c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+

							 "where a.kode_lokasi ='"+this.app._lokasi+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					var jml = tot = 0;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						jml += parseFloat(line.jml);
						tot += parseFloat(line.nilai);
						this.sg.appendData([line.pp,floatToNilai(line.jml),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);
				this.e_jml.setText(floatToNilai(jml));
				this.e_nilai.setText(floatToNilai(tot));
			}									
		} catch(e) {alert(e);}
	}
});