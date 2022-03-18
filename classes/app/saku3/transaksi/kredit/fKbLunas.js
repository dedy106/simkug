window.app_saku3_transaksi_kredit_fKbLunas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fKbLunas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fKbLunas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Angsuran","List Angsuran"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Area Bisnis", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_kolek = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Collector", multiSelection:false, maxLength:10, tag:2});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,347], childPage:["Data TTB"]});		
		this.cb_ttb = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"No TTB", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_tagih = new saiLabelEdit(this.pc1.childPage[0],{bound:[780,10,200,20],caption:"Saldo Piutang", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.cb_agg = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Koordinator", readOnly:true, tag:1});
		this.e_angsur = new saiLabelEdit(this.pc1.childPage[0],{bound:[780,11,200,20],caption:"Nilai Pelunasan", tag:9, tipeText:ttNilai, text:"0",readOnly:true});				
		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Alamat", readOnly:true, tag:1});	
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[0],{bound:[780,18,200,20],caption:"Nilai Diskon", tag:9, tipeText:ttNilai, text:"0",readOnly:true});				
		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,240],colCount:4,tag:0,
		            colTitle:["Angs-Ke","Saldo","Nilai","Diskon"],
					colWidth:[[3,2,1,0],[100,100,100,100]],					
					columnReadOnly:[true,[0,1,3],[2]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCells"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Area Bisnis",true);												
			
			this.cb_pp.setText("");
			this.cb_pp.setText(this.app._kodePP);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fKbLunas.extend(window.childForm);
window.app_saku3_transaksi_kredit_fKbLunas.implement({
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
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_angsur_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("update kre_ttb2_sch set no_bill='"+this.e_nb.getText()+"' where no_ttb='"+this.cb_ttb.getText()+"' and no_bill='-' and kode_lokasi='"+this.app._lokasi+"'"); 
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_ttb.getText()+"','-','-','"+this.dp_d1.getDateString()+"','Angsuran Collector a.n "+this.cb_kolek.rightLabelCaption+"','"+this.cb_pp.getText()+"','LUNAS','BM','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_angsur.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_kolek.getText()+"','-','-')");
																												
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																						
								sql.add("insert into kre_angsur_d (no_bukti,periode,kode_lokasi,no_ttb,cicilan_ke,no_bill,nilai,sisa,dc,tgl_lunas,nilai_bayar,nilai_diskon) values "+
										"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_ttb.getText()+"',"+this.sg.cells(0,i)+",'-',"+nilaiToFloat(this.sg.cells(1,i))+",0,'D','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+")"); 
							
								sql.add("update kre_ttb2_sch set no_bill='"+this.e_nb.getText()+"' where no_ttb='"+this.cb_ttb.getText()+"' and no_bill='-' and kode_lokasi='"+this.app._lokasi+"'"); 
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
					this.sg.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);		
					var strSQL = "select a.no_ttb, a.cicilan_ke "+
							"from kre_ttb2_sch a  "+
							"     inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
							"     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
							"                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke ) c "+
							"				 on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+
							"where a.npokok > isnull(c.angsur,0) and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-'  ";
					this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.keterangan"],false,["No TTB","Deskripsi"],"and","Data TTB",true);	
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_diskon.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Total Pelunasan tidak boleh melebihi saldo.");
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
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kre_angsur_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update kre_ttb2_sch set no_bill='"+this.e_nb.getText()+"' where no_ttb='"+this.cb_ttb.getText()+"' and no_bill='-' and kode_lokasi='"+this.app._lokasi+"'"); 
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
	doChange:function(sender){		
		if (sender == this.e_angsur && this.e_angsur.getText() != "") {
			this.e_diskon.setText(nilaiToFloat(this.e_tagih.getText()) - nilaiToFloat(this.e_angsur.getText()));
		}
		if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan == 1) {		
			
			this.cb_ttb.setText("","");	
			this.cb_kolek.setText("","");	
			var strSQL = "select a.no_ttb,a.keterangan,b.piutang - ISNULL(c.angsur,0) as saldo "+
						 "from kre_ttb2_m a "+

						 "inner join ( "+
						 "select no_ttb,sum(npokok) as piutang "+
						 "from kre_ttb2_sch group by no_ttb "+
						 ") b on a.no_ttb=b.no_ttb "+

						 "left join ( "+
						 "select no_ttb,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb "+
						 ") c on a.no_ttb=c.no_ttb "+

						 "where a.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.piutang > ISNULL(c.angsur,0) ";

			this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.keterangan"],false,["No TTB","Deskripsi"],"and","Data TTB",true);												
		
			this.cb_kolek.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status = 'COLLECTOR' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Collector",true);												
		}
		
		if (sender == this.cb_ttb && this.cb_ttb.getText() != "") {	
			var strSQL = "select a.no_agg, a.nama, a.alamat from kre_agg a inner join kre_ttb2_m b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
			             "where b.no_ttb='"+this.cb_ttb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.cb_agg.setText(line.no_agg,line.nama);
					this.e_alamat.setText(line.alamat);						
				} 
			}	
			
			if (this.stsSimpan == 1) {
				var strSQL = "select a.cicilan_ke,a.npokok-ISNULL(b.bayar,0) as saldo "+
							 "from kre_ttb2_sch a "+
							 "left join "+
							 "(  select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "   from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' "+
							 "   group by no_ttb,cicilan_ke "+
							 ") "+
							 "b on a.no_ttb=b.no_ttb and a.cicilan_ke=b.cicilan_ke "+
							 "where a.no_ttb= '"+this.cb_ttb.getText()+"' and a.npokok>isnull(b.bayar,0) and a.kode_lokasi='"+this.app._lokasi+"'";

				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																																								
						this.sg.appendData([floatToNilai(line1.cicilan_ke),floatToNilai(line1.saldo),floatToNilai(line1.saldo),"0"]);
					}
				} else this.sg.clear(1);	
		
				this.sg.validasi();
			}
		}	
		
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 	
				var strSQL = "select a.no_ttb,a.keterangan,b.piutang - ISNULL(c.angsur,0) as saldo "+
						 "from kre_ttb2_m a "+

						 "inner join ( "+
						 "select no_ttb,sum(npokok) as piutang "+
						 "from kre_ttb2_sch group by no_ttb "+
						 ") b on a.no_ttb=b.no_ttb "+

						 "left join ( "+
						 "select no_ttb,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb "+
						 ") c on a.no_ttb=c.no_ttb "+

						 "where a.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.piutang > ISNULL(c.angsur,0) ";

						 
				this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.keterangan"],false,["No TTB","Deskripsi"],"and","Data TTB",true);	
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 2) {
			var sisa =  nilaiToFloat(this.sg.cells(1,row)) - nilaiToFloat(this.sg.cells(2,row));
			this.sg.cells(3,row,sisa);
			this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{			
			var tot = bayar = diskon = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != "" && this.sg.cells(2,i) != "" && this.sg.cells(3,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(1,i));	
					bayar += nilaiToFloat(this.sg.cells(2,i));	
					diskon += nilaiToFloat(this.sg.cells(3,i));									
				}
			}						
			this.e_tagih.setText(floatToNilai(tot));
			this.e_angsur.setText(floatToNilai(bayar));
			this.e_diskon.setText(floatToNilai(diskon));			
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
								this.nama_report="server_report_saku3_kredit_rptBayar";
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
			setTipeButton(tbSimpan);	
			this.stsSimpan = 1;	
			this.doClick();
			var strSQL = "select a.no_ttb,a.keterangan,b.piutang - ISNULL(c.angsur,0) as saldo "+
						 "from kre_ttb2_m a "+

						 "inner join ( "+
						 "select no_ttb,sum(npokok) as piutang "+
						 "from kre_ttb2_sch group by no_ttb "+
						 ") b on a.no_ttb=b.no_ttb "+

						 "left join ( "+
						 "select no_ttb,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb "+
						 ") c on a.no_ttb=c.no_ttb "+

						 "where a.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.piutang > ISNULL(c.angsur,0) ";

			this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.keterangan"],false,["No TTB","Deskripsi"],"and","Data TTB",true);		
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);							
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'LUNAS' and a.posted ='F' and a.kode_pp='"+this.app._kodePP+"'";						
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
			this.sg3.appendData([line.no_kas,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				
				var strSQL = "select a.no_ttb,a.keterangan "+
						 "from kre_ttb2_m a "+
						 "where a.no_ttb='"+this.sg3.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.keterangan"],false,["No TTB","Deskripsi"],"and","Data TTB",true);	
				
				this.cb_ttb.setText(this.sg3.cells(3,row));	
					
				var strSQL = "select * from kas_m  "+
							 "where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.cb_pp.setText(line.kode_pp);
						this.cb_kolek.setText(line.no_link);						
					} 
				}		
				
				var strSQL = "select a.cicilan_ke,a.npokok-ISNULL(b.bayar,0) as saldo,isnull(c.nilai_bayar,0) as bayar,isnull(c.nilai_diskon,0) as diskon "+
							 "from kre_ttb2_sch a "+
							 
							 "inner join "+
							 "(  select no_ttb,cicilan_ke,nilai_bayar,nilai_diskon "+
							 "   from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' and no_bukti = '"+this.e_nb.getText()+"' "+
							 ") "+
							 "c on a.no_ttb=c.no_ttb and a.cicilan_ke=c.cicilan_ke "+
							 
							 "left join "+
							 "(  select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "   from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' and no_bukti <> '"+this.e_nb.getText()+"' "+
							 "   group by no_ttb,cicilan_ke "+
							 ") "+
							 "b on a.no_ttb=b.no_ttb and a.cicilan_ke=b.cicilan_ke "+
							 
							
							 
							 "where a.no_ttb= '"+this.cb_ttb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																																								
						this.sg.appendData([floatToNilai(line1.cicilan_ke),floatToNilai(line1.saldo),floatToNilai(line1.bayar),floatToNilai(line1.diskon)]);
					}
				} else this.sg.clear(1);	
		
				this.sg.validasi();
				
				
			}									
		} catch(e) {alert(e);}
	}
});