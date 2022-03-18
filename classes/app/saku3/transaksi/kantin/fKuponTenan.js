window.app_saku3_transaksi_kantin_fKuponTenan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kantin_fKuponTenan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kantin_fKuponTenan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tenan Kupon", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Jual","List Jual"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_tenan = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Tenan", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[760,18,200,20],caption:"Total", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,19,995,318], childPage:["Rekap Kupon"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:0,
		            colTitle:["Kd Jenis","Nama","Nominal","Jml Lembar","Tot Nominal"],
					colWidth:[[4,3,2,1,0],[100,80,80,200,80]],	
					columnReadOnly:[true,[0,1,2,4],[3]],
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],									
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
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
							
			this.loadJenis();	
			this.cb_tenan.setSQL("select kode_tenan, nama from kt_tenan where kode_lokasi='"+this.app._lokasi+"'",["kode_tenan","nama"],false,["Kode","Nama"],"and","Data Tenan",true);			
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kantin_fKuponTenan.extend(window.childForm);
window.app_saku3_transaksi_kantin_fKuponTenan.implement({	
	loadJenis: function(sender) {
		strSQL = "select a.kode_kupon,a.nama,a.nilai "+
				 " from kt_kupon_jenis a "+			
				 "where a.kode_lokasi ='"+this.app._lokasi+"' order by a.nilai";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];	
				this.sg1.appendData([line.kode_kupon,line.nama,floatToNilai(line.nilai),"0","0"]);
			}
		} else this.sg1.clear(1);
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
						sql.add("delete from kt_setor_m where no_setor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kt_setor_d where no_setor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}					
					
					sql.add("insert into kt_setor_m (no_setor,kode_lokasi,tanggal,keterangan,kode_pp,modul,periode,nilai,tgl_input,nik_user,kode_tenan,ref1) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','JUAL','"+this.e_periode.getText()+"',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_tenan.getText()+"','-')");					
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)) {			
							sql.add("insert into kt_setor_d (no_setor,kode_lokasi,kode_kupon,jml_buku,jml_lembar,no_awal,no_akhir,nilai) values "+
							        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',0,"+parseNilai(this.sg1.cells(3,i))+",'-','-',"+parseNilai(this.sg1.cells(4,i))+")");
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
					this.sg3.clear(1); this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick();
				break;
			case "simpan" :				
			case "ubah" :		
				this.sg1.validasi();	
				this.preView = "1";						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
				sql.add("delete from kt_setor_m where no_setor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kt_setor_d where no_setor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1);
			this.e_total.setText("0");	
			this.sg1.clear(1);			
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kt_setor_m","no_setor",this.app._lokasi+"-ST"+this.e_periode.getText().substr(2,4)+".","0000"));						
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChangeCell1: function(sender, col, row){
		if (col == 3 && sender.cells(3,row) != "") {
			var tot = nilaiToFloat(sender.cells(2,row)) * nilaiToFloat(sender.cells(3,row));
			sender.cells(4,row,tot);
		}
		this.sg1.validasi();
	},	
	doNilaiChange1: function(){
		try{
			var tot = 0;			
			for (var i=0; i < this.sg1.getRowCount();i++){				
				if (this.sg1.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			this.e_total.setText(floatToNilai(tot));						
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
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
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
			this.sg3.clear(1); this.sg1.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){								
		var strSQL = "select a.no_setor,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from kt_setor_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'  ";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_setor,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from kt_setor_m  "+				             
							 "where no_setor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_tenan.setText(line.kode_tenan);						
					}
				}

				var strSQL = "select a.kode_kupon,a.nama,a.nilai, isnull(d.jml_lembar,0) as jml_lembar, isnull(d.nilai,0) as total  "+
						 " from kt_kupon_jenis a "+
						 " left join kt_setor_d d on a.kode_kupon=d.kode_kupon "+
						 "where d.no_setor='"+this.e_nb.getText()+"' and d.kode_lokasi ='"+this.app._lokasi+"' order by a.nilai";
						 
				var data = this.dbLib.getDataProvider(strSQL,true);				 
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_kupon,line.nama,floatToNilai(line.nilai),floatToNilai(line.jml_lembar),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
				
			}									
		} catch(e) {alert(e);}
	}
});