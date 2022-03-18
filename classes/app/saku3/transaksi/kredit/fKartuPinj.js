window.app_saku3_transaksi_kredit_fKartuPinj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fKartuPinj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fKartuPinj";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TTB (Hasil Survey)", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data TTB","Daftar TTB"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["No TTB","No Agg","Nama","Alamat","N Angsuran"],
					colWidth:[[4,3,2,1,0],[100,300,250,100,100]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
		
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","NON"], readOnly:true,tag:2});	
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,11,450,20],caption:"Catatan", maxLength:130});				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"No Kartu",maxLength:30,readOnly:true, visible:false});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});						
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,370], childPage:["Data Kredit","Schedule Angsuran"]});		
		this.cb_so = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Surat Order",tag:1, multiSelection:false,change:[this,"doChange"]});
		this.cb_agg = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Koordinator",readOnly:true});
		this.cb_survey = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Surveyor",multiSelection:false,tag:2});
		this.e_lama = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,30,200,20],caption:"Lama Bayar",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,200,20],caption:"Nilai Angsuran", tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});
		this.e_jml = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,31,200,20],caption:"Jumlah Item", tipeText:ttNilai, text:"0",readOnly:true});
			
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,190],colCount:7,tag:0,
		            colTitle:["Kode","Nama","Satuan","Harga","Jumlah","Komisi / Bns","SubTtl"],					
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,300,100]],										
					columnReadOnly:[true,[1,2,3,6],[0,4,5]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});		
						
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:0,
				colTitle:["Saldo Awal","Angsuran","Saldo Akhir","Tgl Tagih"],
				colWidth:[[3,2,1,0],[100,100,100,100]],
				columnReadOnly:[true,[0,1,2,3],[]],				
				colFormat:[[0,1,2,3],[cfNilai,cfNilai,cfNilai,cfDate]],																
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg});
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
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
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			
			this.cb_so.setSQL("select a.no_so,b.nama from kre_so_m a inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
			                  "where a.no_pinj='-' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_so","nama"],false,["No SO","Nama"],"and","Data Surat Order",true);						
			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from kre_brg where flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.cb_survey.setSQL("select nik, nama from karyawan where status='SURVEYOR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
			this.cb_agg.setSQL("select no_agg, nama from kre_agg where kode_lokasi = '"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);								
			
			var data = this.dbLib.getDataProvider("select substring(CONVERT(varchar,GETDATE(),112),3,4) as periode",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.periode = line.periode;
			}
			this.doClick();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fKartuPinj.extend(window.portalui_childForm);
window.app_saku3_transaksi_kredit_fKartuPinj.implement({
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
						sql.add("delete from kre_pinj_m where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_pinj_sch where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_pinj_d where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kre_so_m set no_pinj='-' where no_pinj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.c_status.getText() == "APPROVE") var progress = "1"; else var progress = "X";
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into kre_pinj_m (no_pinj,keterangan,tanggal,periode,no_agg,lama_bayar,nilai,nik_app,status_aktif,nik_user,tgl_input,kode_lokasi,no_so,no_jual,no_ttb,progress,catatan,kode_pp) values "+
					        "('"+this.e_nb.getText()+"','Kredit a.n "+this.cb_agg.rightLabelCaption+"','"+this.dp_d1.getDateString()+"','"+thnBln+"','"+this.cb_agg.getText()+"',"+nilaiToFloat(this.e_lama.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_survey.getText()+"','1','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.cb_so.getText()+"','-','-','"+progress+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"')");
					
					var j = 0; 				  
					for (var i=0; i < this.sg.rows.getLength(); i++){
					  j = i+1;					
					  sql.add("insert into kre_pinj_sch(no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode) values "+
						      "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+","+nilaiToFloat(this.sg.cells(1,i))+",0,"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.sg.getCell(3,i).substr(6,4)+'-'+this.sg.getCell(3,i).substr(3,2)+'-'+this.sg.getCell(3,i).substr(0,2)+"','"+this.sg.getCell(3,i).substr(6,4)+this.sg.getCell(3,i).substr(3,2)+"')");
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																																										
								sql.add("insert into kre_pinj_d(no_pinj,kode_lokasi,nu,kode_brg,jumlah,bonus,hjual) values "+  
									    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(3,i))+")");
							}
						}						
					}	
					sql.add("update kre_so_m set no_pinj='"+this.e_nb.getText()+"' where no_so='"+this.cb_so.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);	
					this.cb_so.setSQL("select a.no_so,b.nama from kre_so_m a inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
			                  "where a.no_pinj='-' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_so","nama"],false,["No SO","Nama"],"and","Data Surat Order",true);												
				}
				break;
			case "simpan" :	
			case "ubah" :	this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kre_pinj_m where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kre_pinj_sch where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kre_pinj_d where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update kre_so_m set no_pinj='-' where no_pinj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.e_nilai || sender == this.e_lama) {
				if ((this.e_lama.getText() != "0") && (this.e_nilai.getText() != "0") && (this.e_lama.getText() != "") && (this.e_nilai.getText() != "") ) 
					this.generateSch();	
			}
			
			if (sender == this.cb_so && this.cb_so.getText() != "") {
				this.e_nb.getText(this.cb_so.getText());
				var strSQL = "select * from kre_so_m "+
							 "where no_so = '"+this.cb_so.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.cb_agg.setText(line.no_agg);
						this.e_lama.setText(line.jumlah);
					}
				}
				if (this.stsSimpan == 1) {
					var strSQL = "select a.kode_brg,b.nama,b.satuan,a.jumlah,a.hjual,a.jumlah*a.hjual as total "+
								 "from kre_so_d a inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_so='"+this.cb_so.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
					var data1 = this.dbLib.getDataProvider(strSQL,true);	
					if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
						var line1;
						this.sg2.clear();
						for (var i in data1.rs.rows){
							line1 = data1.rs.rows[i];																													
							this.sg2.appendData([line1.kode_brg,line1.nama,line1.satuan,parseFloat(line1.hjual),parseFloat(line1.jumlah),"0",parseFloat(line1.total)]);
						}
					} else this.sg2.clear(1);		
				}
			}
			if (sender == this.e_nilai || sender == this.e_lama) {
				if (this.e_lama.getText() != "0" && this.e_nilai.getText() != "0") this.generateSch();	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
		try {			
			var thn = this.dp_d1.getDateString().substr(2,2);
			this.stsSimpan = 1;
			//this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_pinj_m","no_pinj","PJ"+this.periode+".","0000"));		
			this.e_nb.setText(this.cb_so.getText());		
		    this.dp_d1.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
			alert(e);
		}
	},	
	doEllipseClick2: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item",sender,undefined, 
											  "select kode_brg,nama from kre_brg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from kre_brg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		try {
			if (col == 0 && this.sg2.cells(0,row)!="") {													
				sender.onChange.set(undefined,undefined);
				var brg = this.dataBRG.get(sender.cells(0,row));
				if (brg) sender.cells(1,row,brg);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRD");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}	
				sender.onChange.set(this,"doChangeCell2");
				
				var strSQL = "select satuan,hjual "+
							 "from kre_brg  "+
							 "where kode_brg='"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";						 					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.sg2.cells(2,row,line.satuan);	
						this.sg2.cells(3,row,parseFloat(line.hjual));		
						this.sg2.cells(4,row,"0");						
						this.sg2.cells(5,row,"0");
						this.sg2.cells(6,row,"0");
					} 				
				}			
			}		
			if (col == 4) {
				if (this.sg2.cells(4, row) != "" && this.sg2.cells(3, row) != "") {
					this.sg2.cells(6, row, Math.round(nilaiToFloat(this.sg2.cells(3, row)) * nilaiToFloat(this.sg2.cells(4, row))));
				}
			}			
			this.sg2.validasi();
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange2: function(){
		try{
			var tot = jml = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(6,i) != "" && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(6,i));		
					jml += nilaiToFloat(this.sg2.cells(4,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));	
			this.e_jml.setText(floatToNilai(jml));			
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
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   
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
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBRG = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBRG.set(line.kode_brg, line.nama);
								}
							}							
						}else throw result;
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
			this.sg1.clear(1); this.sg.clear(1); this.sg2.clear(1);
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.cb_so.setSQL("select a.no_so,b.nama from kre_so_m a inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
			                  "where a.no_pinj='-' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_so","nama"],false,["No SO","Nama"],"and","Data Surat Order",true);						
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																		
		if (this.cb_agg.getText() == "") var filter = ""; else var filter = "a.no_agg = '"+this.cb_agg.getText()+"' and ";		
		var strSQL = "select a.no_pinj,a.no_agg,c.nama,c.alamat,a.nilai "+
		             "from kre_pinj_m a "+					 					 
					 "                  inner join kre_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
					 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and a.no_ttb='-' and a.kode_pp='"+this.app._kodePP+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_pinj,line.no_agg,line.nama,line.alamat,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);		
				this.pc2.setActivePage(this.pc2.childPage[0]);																	
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * "+
							 "from kre_pinj_m "+							 
							 "where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.cb_so.setSQL("select a.no_so,b.nama from kre_so_m a inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
			                  			  "where a.no_pinj='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_so","nama"],false,["No SO","Nama"],"and","Data Surat Order",true);							
						this.cb_so.setText(line.no_so);
						this.dp_d1.setText(line.tanggal);
						this.cb_survey.setText(line.nik_app);
						this.e_lama.setText(line.lama);
						this.e_ket.setText(line.catatan);
						if (line.progress = "1") this.c_status.setText("APPROVE"); else this.c_status.setText("NON"); 
						
						var strSQL = "select a.kode_brg,b.nama,b.satuan,a.jumlah,a.bonus,a.hjual,a.jumlah*a.hjual as total "+
									 "from kre_pinj_d a inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
									 "where a.no_pinj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";										
						var data1 = this.dbLib.getDataProvider(strSQL,true);	
						if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
							var line1;
							this.sg2.clear();
							for (var i in data1.rs.rows){
								line1 = data1.rs.rows[i];																													
								this.sg2.appendData([line1.kode_brg,line1.nama,line1.satuan,parseFloat(line1.hjual),parseFloat(line1.jumlah),parseFloat(line1.bonus),parseFloat(line1.total)]);
							}
						} else this.sg2.clear(1);
						
					}
				}	
				this.generateSch();
			}									
		} catch(e) {alert(e);}
	},	
    generateSch: function(){
	    try{         
            var lm = nilaiToFloat(this.e_lama.getText());
    		var so = nilaiToFloat(this.e_nilai.getText()) * lm;
    		var pokok = Math.round(so / lm);
    		
			var tglNext = perAwal = this.dp_d1.getThnBln();
			var tgl = this.dp_d1.getText().substr(0,2);
			if (parseInt(tgl) > 28) tgl = "28";
            this.dataAngsuran = [];
            this.sg.clear();
    		for (var i = 0;i < lm;i++){
				tglNext = tgl + '/' + perAwal.substr(4,2) + '/' +  perAwal.substr(0,4);
    										
    			this.dataAngsuran.push([floatToNilai(so),floatToNilai(pokok),floatToNilai(so - pokok),tglNext]);
    			so = so - pokok;
    			if (so < pokok) pokok = so;
    			else if ( i == lm - 2) pokok = so; 
    			
                perAwal = getNextPeriode(perAwal);
				this.sg.appendData(this.dataAngsuran[i]);
    		}
   		}catch(e){
           alert(e);
        }
    }
});