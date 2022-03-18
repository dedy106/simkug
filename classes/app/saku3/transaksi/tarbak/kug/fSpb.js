window.app_saku3_transaksi_tarbak_kug_fSpb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_kug_fSpb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_kug_fSpb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form DPC", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data DPC","List DPC"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No DPC","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,16,450,20],caption:"No Dokumen DPC", maxLength:150});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this.pc2.childPage[0],{bound:[490,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilaispb = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total DPC", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,338], childPage:["Daftar PB","Daftar Transfer","Tambah PB"]});		
		this.sg5 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:0,
		            colTitle:["Status","No PB","Tanggal","Deskripsi","Nilai PB","Rekening"],
					colWidth:[[5,4,3,2,1,0],[70,100,400,80,120,80]],colFormat:[[4,5],[cfNilai,cfButton]],										
					readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["DPC","INPROG"]})]],
					click:[this,"doSgBtnClick5"], colAlign:[[5],[alCenter]],
					nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick5"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
				colTitle:["Bank","Cabang","No Rekening","Nama Rekening","Bruto","Potongan","Netto"],
				colWidth:[[6,5,4,3,2,1,0],[100,80,100,200,100,200,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],				
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		
		this.cb_pbAdd = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,18,220,20],caption:"No PB Tambah",multiSelection:false,tag:9});					
		this.bAdd = new button(this.pc1.childPage[2],{bound:[120,19,98,18],caption:"Tambah Data",click:[this,"doAdd"]});			

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
					
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

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_kug_fSpb.extend(window.childForm);
window.app_saku3_transaksi_tarbak_kug_fSpb.implement({	
	doAdd: function() {	
		try {
			var temu = false;
			for (var i = 0; i < this.sg5.rows.getLength();i++){
				if (this.sg5.rowValid(i) && this.sg5.cells(1,i) == this.cb_pbAdd.getText()){
					temu = true;
					break;
				}
			}
			if (!temu) {			
				var strSQL = "select 'DPC' as status,no_pb,convert(varchar,tanggal,103) as tgl,keterangan,nilai "+
							"from pbh_pb_m "+
							"where no_pb = '"+this.cb_pbAdd.getText()+"' and progress='1' and no_spb='-' and kode_lokasi='"+this.app._lokasi+"' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.sg5.appendData([line.status.toUpperCase(),line.no_pb,line.tgl,line.keterangan,floatToNilai(line.nilai),"Rekening"]);		 
					}					
				}			
			}			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch(e) {
			alert(e);
		}

	},
	isiPBAdd: function() {	
		try {				
			var strSQL = "select no_pb,keterangan "+
		             	 "from pbh_pb_m "+
					 	 "where progress='1' and no_spb='-' and kode_lokasi='"+this.app._lokasi+"' ";					
			this.cb_pbAdd.setSQL(strSQL,["no_pb","keterangan"],false,["No PB","Keterangan"],"and","Data PB",true);						
		}
		catch(e) {
			alert(e);
		}
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
						sql.add("delete from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update pbh_pb_m set progress='1', no_spb='-' where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					}			

					sql.add("insert into spb_m (no_spb,no_dokumen,no_ver,no_bukti,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,lok_bayar,no_kas,nilai,modul,no_fiat,progress,kode_ppasal) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','-','-','-','"+this.app._lokasi+"','-',"+nilaiToFloat(this.e_nilaispb.getText())+",'SPB','-','0','-')");
														
					for (var i = 0; i < this.sg5.rows.getLength();i++){
						if (this.sg5.rowValid(i) && this.sg5.cells(0,i) == "DPC"){							
							sql.add("update pbh_pb_m set progress='2', no_spb='"+this.e_nb.getText()+"' where no_pb = '"+this.sg5.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");													
							sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs)  "+
									"select '"+this.e_nb.getText()+"',no_pb,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
									"from pbh_pb_j where no_pb='"+this.sg5.cells(1,i)+"' and jenis in ('BEBAN','HUTIF','PJ') and kode_lokasi='"+this.app._lokasi+"'");							
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
					this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 					
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);		
					this.doLoad3();			
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_nilaispb.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai DPC tidak boleh nol atau kurang.");
					return false;						
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
				sql.add("delete from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update pbh_pb_m set progress='1', no_spb='-' where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);				
		if (this.stsSimpan == 1) {
			this.doClick();				
			this.doLoad3();
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();								
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 				
				this.bLoad.show();				
				this.e_nilaispb.setText("0");
				this.doLoad3();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-DPC"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad:function(sender){				
        var strSQL = "select 'INPROG' as status,no_pb,convert(varchar,tanggal,103) as tgl,keterangan,nilai "+
		             "from pbh_pb_m "+
					 "where progress='1' and no_spb='-' and kode_lokasi='"+this.app._lokasi+"' and modul not in ('IFCLOSE','PJPTG')";							
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg5.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																	
				this.sg5.appendData([line.status.toUpperCase(),line.no_pb,line.tgl,line.keterangan,floatToNilai(line.nilai),"Rekening"]);
			}
		} else this.sg5.clear(1);	
		this.sg5.validasi();
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 0) {
			this.sg5.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg5.rows.getLength();i++){
				if (this.sg5.rowValid(i) && this.sg5.cells(4,i) != "" && this.sg5.cells(0,i) == "DPC"){
					tot += nilaiToFloat(this.sg5.cells(4,i));					
				}
			}			
			this.e_nilaispb.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doSgBtnClick5: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick5(this.sg5,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick5: function(sender, col , row) {
		var line = noPB = "";		
		for (var i = 0; i < this.sg5.rows.getLength();i++){
			if (this.sg5.rowValid(i) && this.sg5.cells(0,i) == "DPC"){
				noPB += ",'"+this.sg5.cells(1,i)+"'";
			}
		}


		noPB = noPB.substr(1);							
		if (noPB != "") {					
            var strSQL = "select a.bank,a.nama,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai "+
						 "from pbh_rek a inner join pbh_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_pb in ("+noPB+") and b.kode_lokasi ='"+this.app._lokasi+"' ";            
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg4.appendData([line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai)]);
				}
			} else this.sg4.clear(1);														
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"Data tidak valid.","Tidak ada PB yang berstatus DPC.");			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_pbh_rptKbPb";
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
			this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.doClick();			
			this.doLoad3();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){
		var strSQL = "select a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from spb_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress ='0'";		
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
			this.sg3.appendData([line.no_spb,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bLoad.hide();
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.isiPBAdd();
								
				var strSQL = "select * from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);						
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);																
					}
				}								
									 
                var strSQL = "select 'DPC' as status,b.no_pb,convert(varchar,b.tanggal,103) as tgl,b.keterangan,b.nilai "+
							 "from pbh_pb_m b "+
							 "where b.progress='2' and b.no_spb='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";					 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						this.sg5.appendData([line.status.toUpperCase(),line.no_pb,line.tgl,line.keterangan,floatToNilai(line.nilai),"Rekening"]);
					}
				} else this.sg5.clear(1);	
				
				this.pc1.setActivePage(this.pc1.childPage[0]);																			
			}									
		} catch(e) {alert(e);}
	}

});