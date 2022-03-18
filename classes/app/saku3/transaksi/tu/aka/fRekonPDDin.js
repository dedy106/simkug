window.app_saku3_transaksi_tu_aka_fRekonPDDin = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_aka_fRekonPDDin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_aka_fRekonPDDin";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon Pelunasan Tagihan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		      		colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Pilih"],
					colWidth:[[4,3,2,1,0],[70,300,200,80,100]],
					readOnly:true,colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		
		this.c_periode = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});				
		this.c_bank = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Ref Bank",items:["MANDIRI","BNI","BRI","FINET","BJB"], readOnly:true,tag:2});						
		this.cb_bukti = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Jurnal", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Total PDD", tag:1, tipeText:ttNilai, readOnly:true, text:"0"});						
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Transaksi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});													
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Nilai Jurnal", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		this.bValid = new button(this.pc2.childPage[0],{bound:[670,15,100,20],caption:"Validasi", click:[this,"doValid"]});

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,282], childPage:["Data PDD","Err Msg"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,
					colTitle:["NIM","Nilai PDD"],
					colWidth:[[1,0],[100,100]],
					colFormat:[[1],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});	

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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi ='"+this.app._lokasi+"' and periode>='202112' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			this.c_periode.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_aka_fRekonPDDin.extend(window.childForm);
window.app_saku3_transaksi_tu_aka_fRekonPDDin.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doValid: function(sender){						
		var strSQL = "select nim from aka_mahasiswa where kode_lokasi='"+this.app._lokasi+"'";					
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataNIS = dataS;
		}		

		this.inValid = false;
		var tot = 0
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(0,i,"INVALID-"+this.sg1.cells(0,i));
			tot += nilaiToFloat(this.sg1.cells(1,i));	
			
			for (var j=0;j < this.dataNIS.rs.rows.length;j++){
				if (this.sg1.cells(0,i).substr(8,30) == this.dataNIS.rs.rows[j].nim) {					
					this.sg1.cells(0,i,this.sg1.cells(0,i).substr(8,30));				
				}
			}

			if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;																			
		}	

		if (this.inValid) {
			this.pc1.setActivePage(this.pc1.childPage[1]);	

			this.sg2.clear();
			for (var i=0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.cells(0,i).substr(0,7) == "INVALID") {
					var j = i+1;
					this.sg2.appendData([j,"NIM"]);						
				}				
			}
		}			
		else {
			this.e_nilai.setText(floatToNilai(tot));
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
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','CDIN','Z','-','-','-','"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','"+this.cb_akun.rightLabelCaption+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','"+this.cb_akun.getText()+"','-','"+this.c_periode.getText()+"','-','-','CDIN')"); 
					
					for (var i=0; i < this.sg1.getRowCount();i++){
						sql.add("INSERT INTO aka_cd_d (no_bukti, kode_lokasi, periode, nim, kode_akun, dc, nilai, ref1, bank, no_rek, nama_rek, tahunaka, nilai_ref, keterangan,bank_ref) VALUES "+
								"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.e_periode.getText()+"', '"+this.sg1.cells(0,i)+"', '2141101', 'D', "+nilaiToFloat(this.sg1.cells(1,i))+", '-', '-', '-', '-', '-', 0, 'CDIN','"+this.c_bank.getText()+"')");
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
					this.sg3.clear(1); this.sg1.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																													
				this.preView = "1";
				
				/* non jurnal gak usah cek periode
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText()) ) {
					system.alert(this,"Transaksi tidak valid.","Nilai PDD tidak sama dengan Nilai Jurnal");
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
				*/
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				/*
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	*/
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_cd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					setTipeButton(tbAllFalse);						
					this.dbLib.execArraySQL(sql);
				//}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);									
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){						
		if (sender == this.e_periode && this.stsSimpan==1) {
			this.doClick();			
		}
		
		if (sender == this.c_periode && this.c_periode.getText()!="") {
			var strSQL = "select a.no_bukti, CONVERT (varchar, CAST (a.nilai - isnull(b.pakai,0) AS money),1) as sisa from "+
						"	( "+
						"			select no_bukti,sum(nilai) as nilai from gldt where (periode between '202112' and '"+this.c_periode.getText()+"') and kode_lokasi='"+this.app._lokasi+"' and kode_akun = '2141101' and dc='C'  and modul not in ('CDMUTMULTI') group by no_bukti "+
						"			union all "+
						"			select no_bukti,sum(nilai) as nilai from gldt_h where(periode between '202112' and '"+this.c_periode.getText()+"') and kode_lokasi='"+this.app._lokasi+"' and kode_akun = '2141101' and dc='C' and modul not in ('CDMUTMULTI') group by no_bukti "+
						"			) a "+
						"			left join ( "+
						"			select no_dokumen,sum(nilai1) as pakai from trans_m where kode_lokasi ='"+this.app._lokasi+"' and form = 'CDIN' "+
						"			group by no_dokumen "+
						"			) b on a.no_bukti=b.no_dokumen "+
						"where  a.nilai > isnull(b.pakai,0) ";


			this.cb_bukti.setSQL(strSQL,["no_bukti","sisa"],false,["No Bukti","Saldo"],"and","Daftar Jurnal",true);		
		}
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			var strSQL = "select a.no_urut,a.keterangan, CONVERT (varchar, CAST (a.nilai-isnull(b.pakai,0) AS money),1) as sisa from "+
						"( "+
						"			select no_urut,keterangan,nilai from gldt where no_bukti='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun = '2141101' and dc='C' and modul not in ('CDMUTMULTI') "+
						"			union all "+
						"			select no_urut,keterangan,nilai from gldt_h where no_bukti='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun = '2141101' and dc='C' and modul not in ('CDMUTMULTI') "+
						"			) a "+
						"			left join ( "+
						"			select no_ref1,sum(nilai1) as pakai from trans_m where no_dokumen='"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and form = 'CDIN' "+
						"			group by no_ref1 "+
						"			) b on cast(a.no_urut as varchar)=b.no_ref1 "+
						"where  a.nilai > isnull(b.pakai,0) ";

			this.cb_akun.setSQL(strSQL,["no_urut","keterangan","sisa"],false,["ID","Deskripsi","Saldo"],"and","Daftar Transaksi",true);		
		}		
		if (sender == this.cb_akun && this.cb_akun.getText() != "") {
			if (this.c_periode.getText() == this.app._periode) {
				var strSQL = "select nilai from gldt "+
						 	 "where kode_akun = '2141101' and no_urut ='"+this.cb_akun.getText()+"' and dc ='C' and no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			}
			else {
				var strSQL = "select nilai from gldt_h "+
						 	 "where  kode_akun = '2141101' and no_urut ='"+this.cb_akun.getText()+"' and dc ='C' and no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			}									 				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					var nilai = parseFloat(line.nilai);										
				}
			}	
						
			this.e_saldo.setText(floatToNilai(nilai));	
		}					
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg3.clear(1);
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-CDI"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.c_periode.setFocus();
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
								this.nama_report="server_report_saku3_siswa_rptSisDetSaldoCdMala";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.sg3.clear(1); 			this.sg1.clear(1); 					
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.stsSimpan = 1;
			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},			
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'CDIN' and a.posted ='Z'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
									
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.c_periode.setText(line.no_ref3);
						this.cb_bukti.setText(line.no_dokumen);											
						this.cb_akun.setText(line.no_ref1);									
						this.e_nilai.setText(floatToNilai(line.nilai1));								
					}
				}
				
				var strSQL = "select top 20 * from aka_cd_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc='D'";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];				
						this.sg1.appendData([line.nim,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);	

			}						
		} catch(e) {alert(e);}
	}
});