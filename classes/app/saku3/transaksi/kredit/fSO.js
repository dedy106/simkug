window.app_saku3_transaksi_kredit_fSO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fSO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fSO";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Sales Order", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Surat Order","Daftar SO"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Anggota","Koordinator"],
					colWidth:[[3,2,1,0],[200,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggl Kirim", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]});
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Area Bisnis",multiSelection:false});		
		this.cb_agg = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Koordinator",multiSelection:false,tag:1});		
		this.cb_promo = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Promotor",multiSelection:false,tag:2});
		this.e_angsur = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Nilai Angsur", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_book = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Booker",multiSelection:false,tag:2});
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Jml Bulan", tag:2, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_sv = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Supervisor",multiSelection:false,tag:2});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,235], childPage:["Data Item"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode","Nama","Satuan","Harga","Jumlah","SubTtl"],					
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,400,100]],										
					columnReadOnly:[true,[1,2,3,5],[0,4]],
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
				
		this.rearrangeChild(10, 22);
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
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);								
			this.cb_agg.setSQL("select no_agg, nama from kre_agg where kode_lokasi = '"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);								
			this.cb_promo.setSQL("select nik, nama from karyawan where status='PROMOTOR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
			this.cb_book.setSQL("select nik, nama from karyawan where status='BOOKER' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
			this.cb_sv.setSQL("select nik, nama from karyawan where status='SUPERVISOR' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);								
			
			this.cb_pp.setText(this.app._kodePP);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from kre_brg where flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.e_jml.setText("8");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fSO.extend(window.portalui_childForm);
window.app_saku3_transaksi_kredit_fSO.implement({
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
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					for (var j=i;j < this.sg.getRowCount();j++){
						if (this.sg.cells(1,j) == this.sg.cells(1,i) && (i != j)) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
							return false;
						}
					}
				}
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																
					if (this.stsSimpan == 1) this.doClick();					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from kre_so_m where no_so = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_so_d where no_so = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}										
								
					sql.add("insert into kre_so_m(no_so,periode,kode_lokasi,kode_pp,tanggal,due_date,no_agg,nik_promo,nik_book,nik_sv,n_angsur,jumlah,no_pinj,no_ttb) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_agg.getText()+"','"+this.cb_promo.getText()+"','"+this.cb_book.getText()+"','"+this.cb_sv.getText()+"',"+nilaiToFloat(this.e_angsur.getText())+","+nilaiToFloat(this.e_jml.getText())+",'-','-')");										
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																										
								sql.add("insert into kre_so_d(no_so,kode_lokasi,nu,kode_brg,jumlah,hjual,no_flag) values "+  
									    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'-')");
							}
						}						
					}		
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
					this.sg.clear(1);										
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				if (nilaiToFloat(this.e_angsur.getText()) == 0) {							
					system.alert(this,"Transaksi tidak valid.","Angsuran tidak boleh nol.");
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
				sql.add("delete from kre_so_m where no_so = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kre_so_d where no_so = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_so_m","no_so",this.e_periode.getText().substr(2,2)+".","00000"));			
				this.cb_agg.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			if (this.stsSimpan == 1) this.doClick();
		}catch(e) {alert(e);}
	},
	doEllipseClick: function(sender, col, row){
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
	doChangeCell: function(sender, col, row){
		try {
			if (col == 0 && this.sg.cells(0,row)!="") {													
				sender.onChange.set(undefined,undefined);
				var brg = this.dataBRG.get(sender.cells(0,row));
				if (brg) sender.cells(1,row,brg);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRD");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}	
				sender.onChange.set(this,"doChangeCell");
			
				
				var strSQL = "select satuan,hjual "+
							 "from kre_brg  "+
							 "where kode_brg='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";						 					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.sg.cells(2,row,line.satuan);	
						this.sg.cells(3,row,parseFloat(line.hjual));		
						this.sg.cells(4,row,"0");						
						this.sg.cells(5,row,"0");
					} 				
				}			
			}		
			if (col == 4) {
				if (this.sg.cells(4, row) != "" && this.sg.cells(3, row) != "") {
					this.sg.cells(5, row, Math.round(nilaiToFloat(this.sg.cells(3, row)) * nilaiToFloat(this.sg.cells(4, row))));
				}
			}			
			this.sg.validasi();
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(5,i));					
				}
			}
			this.e_angsur.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){		
		try {			
			if (sender == this.e_jml || sender == this.e_angsur) {
				if (this.e_jml.getText()!="" && this.e_angsur.getText()!="") 
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_jml.getText()) * nilaiToFloat(this.e_angsur.getText())));				
			}		
		}
		catch(e) {
			alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_klinik_rptJual";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
			this.sg.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);						
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){	
		if (this.e_periode.getText() != "" && this.cb_pp.getText()!="") {	
			var strSQL = "select a.no_so,convert(varchar,a.tanggal,103) as tgl,b.no_agg+' - '+b.nama as nama_agg,c.no_agg+' - '+c.nama as nama_koor "+
						 "from kre_so_m a inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+					 					 
						 "				  inner join kre_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+					 					 
						 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_pinj ='-'";			
	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);	
		}
		else alert();		
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_so,line.tgl,line.nama_agg,line.nama_koor]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select * from kre_so_m where no_so = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_pp.setText(line.kode_pp);
						this.cb_agg.setText(line.no_agg);
						this.cb_promo.setText(line.nik_promo);
						this.cb_book.setText(line.nik_book);
						this.e_jml.setText(line.jumlah);
						this.cb_sv.setText(line.nik_sv);
					}
				}												
				
				var strSQL = "select a.kode_brg,b.nama,b.satuan,a.jumlah,a.hjual,a.jumlah*a.hjual as total "+
							 "from kre_so_d a inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_so='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_brg,line1.nama,line1.satuan,parseFloat(line1.hjual),parseFloat(line1.jumlah),parseFloat(line1.total)]);
					}
				} else this.sg.clear(1);												
				this.sg.validasi();	
				this.pc2.setActivePage(this.pc2.childPage[0]);						
			}									
		} catch(e) {alert(e);}
	}
});