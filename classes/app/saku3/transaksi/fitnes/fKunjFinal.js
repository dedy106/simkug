window.app_saku3_transaksi_fitnes_fKunjFinal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fKunjFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fKunjFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Kunjungan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Finalisasi","List Finalisasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Final","Tanggal","No Kunjungan","Peserta","Kode"],
					colWidth:[[4,3,2,1,0],[1,200,100,80,100]],readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_kunj = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_tglakhir = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,11,165,20],caption:"Exp Date", readOnly:true});						
		this.e_jmlhari = new saiLabelEdit(this.pc2.childPage[0],{bound:[950,11,30,20],labelWidth:0,caption:"", readOnly:true});						
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,400,20],caption:"Nama", readOnly:true});								
		this.e_ke = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Kunj Ke", readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,340], childPage:["Parameter","Beban Latihan"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama Parameter","Satuan","Pengukuran Awal","Pengukuran Akhir"],
					colWidth:[[4,3,2,1,0],[200,200,100,200,100]],					
					columnReadOnly:[true,[0,1,2,3],[4]],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});						
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:14,tag:9,
		            colTitle:["Kode","Gerakan","Beban Max","Bbn Latih","Berat Alat","Plan Set1","Plan Set2","Plan Set3","Hasil 1","Hasil 2","Hasil 3","Next 1","Next 2","Next 3"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,150,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[8,9,10,11,12,13]],					
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
						
			this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fKunjFinal.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fKunjFinal.implement({	
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
						sql.add("delete from fi_kunj_final where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kunj_m set no_final='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kunj_d set hasil_aft='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kunj_beban set hasil1=0,hasil2=0,hasil3=0,next1=0,next2=0,next3=0 where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into fi_kunj_final(no_final,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_kunj) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_kunj.rightLabelCaption+"')");					
					sql.add("update fi_kunj_m set no_final='"+this.e_nb.getText()+"' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++) {
							if (this.sg1.rowValid(i)){
								sql.add("update fi_kunj_d set hasil_aft='"+this.sg1.cells(4,i)+"' where kode_param='"+this.sg1.cells(0,i)+"' and no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("update fi_kunj_beban set hasil1="+nilaiToFloat(this.sg2.cells(8,i))+",hasil2="+nilaiToFloat(this.sg2.cells(9,i))+",hasil3="+nilaiToFloat(this.sg2.cells(10,i))+", "+
										" 						  next1="+nilaiToFloat(this.sg2.cells(11,i))+",next2="+nilaiToFloat(this.sg2.cells(12,i))+",next3="+nilaiToFloat(this.sg2.cells(13,i))+" "+
										"where kode_beban='"+this.sg2.cells(0,i)+"' and no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 						
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);									
					this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from fi_kunj_final where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_m set no_final='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_d set hasil_aft='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_beban set hasil1=0,hasil2=0,hasil3=0,next1=0,next2=0,next3=0 where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_kunj && this.cb_kunj.getText()!="" && this.stsSimpan ==1) {					   
			var data = this.dbLib.getDataProvider("select a.ke,b.nama,convert(varchar,c.tgl_akhir,103) as due_date,datediff(day,'"+this.dp_d1.getDateString()+"',c.tgl_akhir) as jmlhari "+
			                                      "from fi_kunj_m a "+
			                                      "inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
												  "inner join fi_reg c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi "+
			                                      "where a.no_kunj = '"+this.cb_kunj.rightLabelCaption+"' and a.kode_lokasi ='"+this.app._lokasi+"'",true);												
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];													
				this.e_jmlhari.setText(line.jmlhari);			
				this.e_ke.setText(line.ke);			
				this.e_tglakhir.setText(line.due_date);		
				this.e_nama.setText(line.nama);							
			} 									
			this.sg1.clear();
			var strSQL = "select a.kode_param,a.nama,a.satuan,b.hasil_bef,'-' as hasil_aft from fi_param a left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by a.kode_param";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil_bef,line.hasil_aft]);
				}
			} else this.sg1.clear(1);
			
			this.sg2.clear();
			var strSQL = "select a.kode_beban,a.nama,b.beban_max,b.beban_latih,b.berat,b.set1,b.set2,b.set3 "+
						 "from fi_beban a left join fi_kunj_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_beban";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_beban,line.nama,floatToNilai(line.beban_max),floatToNilai(line.beban_latih),floatToNilai(line.berat),floatToNilai(line.set1),floatToNilai(line.set2),floatToNilai(line.set3),"0","0","0","0","0","0"]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);					
		}				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1);
				this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_kunj_final","no_final",this.app._lokasi+"-FL"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_kunj.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_final,a.no_kunj,convert(varchar,a.tanggal,103) as tgl,b.kode_agg+' - '+b.nama as agg,b.kode_agg  "+
		             "from fi_kunj_final a inner join fi_kunj_m c on a.no_kunj=c.no_kunj and a.kode_lokasi=c.kode_lokasi "+
					 "inner join fi_anggota b on c.kode_agg=b.kode_agg and c.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_final,line.tgl,line.no_kunj,line.agg,line.kode_agg]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);						
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
				this.cb_kunj.setText(this.sg3.cells(4,row),this.sg3.cells(2,row));								
				
				var data = this.dbLib.getDataProvider("select a.ke,b.nama,convert(varchar,c.tgl_akhir,103) as due_date,datediff(day,'"+this.dp_d1.getDateString()+"',c.tgl_akhir) as jmlhari "+
													  "from fi_kunj_m a "+
													  "inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
													  "inner join fi_reg c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi "+
													  "where a.no_kunj = '"+this.cb_kunj.rightLabelCaption+"' and a.kode_lokasi ='"+this.app._lokasi+"'",true);												
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];													
					this.e_jmlhari.setText(line.jmlhari);			
					this.e_ke.setText(line.ke);			
					this.e_tglakhir.setText(line.due_date);		
					this.e_nama.setText(line.nama);							
				}
			
				this.sg1.clear();
				var strSQL = "select a.kode_param,a.nama,a.satuan,b.hasil_bef,b.hasil_aft from fi_param a left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_param";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil_bef,line.hasil_aft]);
					}
				} else this.sg1.clear(1);
				
				this.sg2.clear();
				var strSQL = "select a.kode_beban,a.nama,a.keterangan,b.beban_max,b.beban_latih,b.berat,b.set1,b.set2,b.set3,b.hasil1,b.hasil2,b.hasil3,b.next1,b.next2,b.next3 "+
				             "from fi_beban a left join fi_kunj_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_beban";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_beban,line.nama,floatToNilai(line.beban_max),floatToNilai(line.beban_latih),floatToNilai(line.berat),floatToNilai(line.set1),floatToNilai(line.set2),floatToNilai(line.set3),floatToNilai(line.hasil1),floatToNilai(line.hasil2),floatToNilai(line.hasil3),floatToNilai(line.next1),floatToNilai(line.next2),floatToNilai(line.next3)]);
					}
				} else this.sg2.clear(1);
				
				this.pc1.setActivePage(this.pc1.childPage[0]);					
			}									
		} catch(e) {alert(e);}
	}
});