window.app_saku3_transaksi_fitnes_fKunj2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fKunj2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fKunj2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kunjungan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_jam = new saiLabelEdit(this,{bound:[230,11,100,20],labelWidth:50, caption:"Jam"});
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Kunjungan","List Kunjungan"]});
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Kunj","Tanggal","No Register","Peserta"],
					colWidth:[[3,2,1,0],[500,100,80,100]],readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
				
		this.e_nu = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"No Kunj", readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_tel = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,400,20],caption:"No Telp", readOnly:true});	
		this.e_rsakit = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,400,20],caption:"Riwayat Penyakit", readOnly:true,tag:9});								
		
		this.e_mcu = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Kategori MCU", readOnly:true});						
		this.e_umur = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,130,20],caption:"Umur - Status", readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_status = new saiLabelEdit(this.pc2.childPage[0],{bound:[160,13,60,20],caption:"", labelWidth:0, readOnly:true});								
		this.e_ke = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kunj Ke", readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.e_loker = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"No Loker", tipeText:ttNilai, text:"0"});						
		this.e_handuk = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Handuk", tipeText:ttNilai, text:"0"});						
		
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
			
			this.cb_agg.setSQL("select kode_agg,nama from fi_anggota where kode_lokasi='"+this.app._lokasi+"'",["kode_agg","nama"],false,["ID Peserta","Nama"],"and","Data Peserta",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fKunj2.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fKunj2.implement({	
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
						sql.add("delete from fi_kunj_m where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}										
					sql.add("insert into fi_kunj_m(no_kunj,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_reg,kode_agg,ke,no_final, nu,umur,jam,r_sakit,kode_mcu,no_loker,handuk,kode_pp) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.noReg+"','"+this.cb_agg.getText()+"',"+parseNilai(this.e_ke.getText())+",'-',     "+nilaiToFloat(this.e_nu.getText())+","+nilaiToFloat(this.e_umur.getText())+",'"+this.e_jam.getText()+"','"+this.e_rsakit.getText()+"','"+this.e_mcu.getText()+"','"+this.e_loker.getText()+"','"+this.e_handuk.getText()+"','"+this.app._kodePP+"')");
										
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
					this.sg3.clear(1); 						
					this.pc2.setActivePage(this.pc2.childPage[0]);										
					setTipeButton(tbAllFalse);														
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				if (this.e_status.getText() != "AKTIF") {
					system.alert(this,"Transaksi tidak valid.","Status harus AKTIF.");
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
				sql.add("delete from fi_kunj_m where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
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
		var data = this.dbLib.getDataProvider("select kode_mcu from fi_reg where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];			
			this.e_status.setText("AKTIF");				
			this.e_mcu.setText(line.kode_mcu);								
		} 
		else {
			this.e_status.setText("NONAKTIF");
			this.e_mcu.setText("-");
		}		
		if (this.stsSimpan == 1) this.doClick();	
		 			
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();						
		
		if (sender == this.cb_agg && this.cb_agg.getText()!="") {					   			
			var data = this.dbLib.getDataProvider("select no_tel, r_sakit,datediff(YEAR,tgl_lahir,'"+this.dp_d1.getDateString()+"')  as umur from fi_anggota where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];			
				this.e_umur.setText(floatToNilai(line.umur));								
				this.e_rsakit.setText(line.r_sakit);	
				this.e_tel.setText(line.no_tel);							
			}
			
			var data = this.dbLib.getDataProvider("select no_reg,kode_mcu from fi_reg where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];			
				this.e_status.setText("AKTIF");				
				this.e_mcu.setText(line.kode_mcu);								
				this.noReg = line.no_reg;
			} 
			else {
				this.noReg = "-";
				this.e_status.setText("NONAKTIF");
				this.e_mcu.setText("-");
			}
			
			if (this.stsSimpan == 1) {
				var data = this.dbLib.getDataProvider("select count(*) + 1 as ke from fi_kunj_m where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];													
					this.e_ke.setText(floatToNilai(line.ke));
				}			
			}			
			
			//kunj terakhir
			var noKunjSeb = "";
			var data = this.dbLib.getDataProvider("select top 1 no_kunj as no_kunj from fi_kunj_m where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_kunj desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];													
				noKunjSeb = line.no_kunj;
			}
			if (noKunjSeb != "") this.cb_kunjseb.setSQL("select no_kunj,convert(varchar,tanggal,103) as tgl from fi_kunj_m where no_kunj='"+noKunjSeb+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kunj","tgl"],false,["No Kunj","Tanggal"],"and","Data Kunjungan",true);						
		}		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); 							
			}
			var data = this.dbLib.getDataProvider("select count(*)+1 as nu from fi_kunj_m where tanggal = '"+this.dp_d1.getDateString()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_nu.setText(floatToNilai(line.nu));
			} 
			var data = this.dbLib.getDataProvider("select substring(convert(varchar,GETDATE(),113),13,5) as jam",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_jam.setText(line.jam);
			} 
		
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_kunj_m","no_kunj",this.app._lokasi+"-KJ"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_agg.setFocus();
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
			this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);						
			this.doClick();				
		} catch(e) {
			alert(e);
		}
	},
	doCari:function(sender){																									
		var filter = "";
		if (this.e_ket2.getText()!="") filter = " and a.no_reg like '%"+this.e_ket2.getText()+"%' ";		
		var strSQL = "select a.no_kunj,convert(varchar,a.tanggal,103) as tgl,a.no_reg "+
		             "from fi_kunj_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_final = '-' " +filter;		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_kunj,line.tgl,line.no_reg]); 
			}			
		} else this.sg3.clear(1);					
		this.pc2.setActivePage(this.pc2.childPage[1]);
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kunj,convert(varchar,a.tanggal,103) as tgl,a.no_reg,b.kode_agg+' - '+b.nama as agg  "+
		             "from fi_kunj_m a inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_pp='"+this.app._kodePP+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_final = '-'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_kunj,line.tgl,line.no_reg,line.agg]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page-1;							
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
				if (this.page == undefined) this.page = 0;
				row = row + (this.page * 20);		
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * "+
							 "from fi_kunj_m "+							 
							 "where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.noReg = line.no_reg;						
						this.e_ke.setText(line.ke);						
						this.cb_agg.setText(line.kode_agg);
						
						this.e_jam.setText(line.jam);
						this.e_nu.setText(line.nu);
						this.e_loker.setText(line.no_loker);
						this.e_handuk.setText(line.handuk);
					}
				}												
				
			}									
		} catch(e) {alert(e);}
	}
});