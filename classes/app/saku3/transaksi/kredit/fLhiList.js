window.app_saku3_transaksi_kredit_fLhiList = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fLhiList.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fLhiList";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form LHI", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data LHI","List LHI"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Collector"],
					colWidth:[[2,1,0],[300,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Area Bisnis", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_kolek = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Collector", multiSelection:false, maxLength:10, tag:1});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Tot Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,347], childPage:["Filter Data","Data LHI","Copy LHI"]});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Dari Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18]}); 
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"S/d Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,100,18]}); 
		this.bLoad = new button(this.pc1.childPage[0],{bound:[120,17,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-45],colCount:7,tag:0,
		            colTitle:["Status","No TTB","Koordinator","Alamat","Angs-Ke","Nilai","Jadwal Sisa"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,250,200,100,80]],					
					readOnly:true,
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],		
					colFormat:[[5],[cfNilai]],
					change:[this,"doChangeCells"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});		
		this.i_bayar = new portalui_imageButton(this.sgn,{bound:[970,2,20,20],hint:"Approve Semua",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doApp"]});		
		
		
		this.cb_kolek2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Collector", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});				
		this.cb_lhi2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9});				
		this.bCopy = new button(this.pc1.childPage[2],{bound:[120,17,100,18],caption:"Copy",click:[this,"doCopy"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
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
window.app_saku3_transaksi_kredit_fLhiList.extend(window.childForm);
window.app_saku3_transaksi_kredit_fLhiList.implement({
	doDoubleClick: function(sender, col , row) {
		try{
			this.dataJU.rs.rows[row].status = "APP";							
		} catch(e) {alert(e);}
	},
	doApp:function(sender){
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			this.dataJU.rs.rows[i].status = "APP";
		}
		this.doTampilData(this.page);	
		this.pc1.setActivePage(this.pc1.childPage[1]);		
	},
	doLoad:function(sender){
		var strSQL = "select 'INPROG' as status,a.no_ttb, a.cicilan_ke,d.nama,d.alamat,  a.npokok - isnull(c.angsur,0) as saldo, "+
					 "       convert(varchar(10), case when e.tgl_lunas is null then a.tgl_angs else e.tgl_lunas end,121) as jadwal "+
				 	 "from kre_ttb2_sch a  "+
				 	 "     inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
				 	 "	   inner join kre_agg d on b.no_agg=d.no_agg and a.kode_lokasi=d.kode_lokasi "+
				 	 "     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
				 	 "                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke ) c "+
				 	 "				  on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+
				 	 
				 	 "		left join "+				  
					 " 		( "+
					 "		select no_ttb,cicilan_ke,tgl_lunas "+
					 "		from (select no_ttb,cicilan_ke,tgl_lunas,"+
					 "			  row_number() over(partition by no_ttb,cicilan_ke order by tgl_lunas desc) as rn "+
					 "		  	  from kre_angsur_d "+
					 "		      where dc='D' and kode_lokasi='"+this.app._lokasi+"') as T "+
					 "		where rn = 1  "+ 
				 	 ") e on a.no_ttb=e.no_ttb and a.cicilan_ke=e.cicilan_ke "+
				 	 
				 	 "where  a.tgl_angs between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.npokok > isnull(c.angsur,0) and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-'  ";
		
		this.dataJU = {rs:{rows:[]}};
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];				
			this.sg.appendData([line.status.toUpperCase(),line.no_ttb,line.nama,line.alamat,floatToNilai(line.cicilan_ke),floatToNilai(line.saldo),line.jadwal]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doCopy: function(sender) {
		var strSQL = "select 'APP' as status, a.no_ttb,a.cicilan_ke,e.npokok-isnull(d.angsur,0) as saldo,substring(convert(varchar,case when f.tgl_lunas is null then e.tgl_angs else f.tgl_lunas end,121),1,10) as jadwal,c.nama "+
					 "from kre_lhi_d a "+
					 
					 "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
					 "inner join kre_ttb2_sch e on a.no_ttb=e.no_ttb and a.cicilan_ke=e.cicilan_ke and a.kode_lokasi=e.kode_lokasi "+
					 "inner join kre_agg c on b.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
					 
					 "left join ("+
					 "		select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
					 "      from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke) d on a.no_ttb=d.no_ttb and a.cicilan_ke=d.cicilan_ke "+
					 
					 "left join ("+
					 "		 select no_ttb,cicilan_ke,tgl_lunas "+
					 "		 from (select no_ttb,cicilan_ke,tgl_lunas, "+ 
					 "	 	 			 row_number() over(partition by no_ttb,cicilan_ke "+ 
					 "	 	 			 order by tgl_lunas desc) as rn "+
					 "		 	  from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"') as T "+ 
					 "		 where rn = 1   "+
					 ") f on a.no_ttb=f.no_ttb and a.cicilan_ke=f.cicilan_ke "+
					 
					 
					 "where e.npokok-isnull(d.angsur,0)>0 and a.no_lhi ='"+this.cb_lhi2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.status.toUpperCase(),line.no_ttb,line.nama,line.alamat,floatToNilai(line.cicilan_ke),floatToNilai(line.saldo),line.jadwal]);
			}
		} else this.sg.clear(1);			
		this.sg.validasi();
		
		this.pc1.setActivePage(this.pc1.childPage[1]);	
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
						sql.add("delete from kre_lhi_m where no_lhi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_lhi_d where no_lhi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into kre_lhi_m (no_lhi,kode_lokasi,kode_pp,tanggal,nik_kolek,periode, tgl_input,nik_user) values "+
					       "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_kolek.getText()+"','"+this.e_periode.getText()+"', getdate(),'"+this.app._userLog+"')");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("insert into kre_lhi_d (no_lhi,kode_lokasi,no_ttb,cicilan_ke,nilai,jadwal) values "+
					       			"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_ttb+"',"+parseFloat(line.cicilan_ke)+","+parseFloat(line.saldo)+",'"+line.jadwal+"')");
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
					sql.add("delete from kre_lhi_m where no_lhi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kre_lhi_d where no_lhi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan == 1) {					
			this.cb_kolek.setText("","");	
			this.cb_kolek2.setText("","");	
			
			this.cb_kolek.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status = 'COLLECTOR' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Collector",true);												
			this.cb_kolek2.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status = 'COLLECTOR' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Collector",true);												
		}
		
		if (sender == this.cb_kolek2 && this.cb_kolek2.getText() != "") {
			this.cb_lhi2.setText("","");
			var strSQL = "select no_lhi,convert(varchar,tanggal,103) as tgl from kre_lhi_m where kode_lokasi ='"+this.app._lokasi+"' and nik_kolek='"+this.cb_kolek2.getText()+"'";
			this.cb_lhi2.setSQL(strSQL,["no_lhi","tgl"],false,["No Bukti","Tanggal"],"and","Data LHI",true);	
		}	
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 			
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_lhi_m","no_lhi",this.app._lokasi+"-LHI"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			var line;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "APP"){
					tot += parseFloat(line.saldo);
				}
			}
					
					
			this.e_nilai.setText(floatToNilai(tot));			
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
								this.nama_report="server_report_saku3_kredit_rptLhi";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_lhi='"+this.e_nb.getText()+"' ";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);							
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_lhi,convert(varchar,a.tanggal,103) as tgl,b.nik+' - '+b.nama as kolek "+
		             "from kre_lhi_m a inner join karyawan b on a.nik_kolek=b.nik "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ";						
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
			this.sg3.appendData([line.no_lhi,line.tgl,line.kolek]); 
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
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from kre_lhi_m  "+
							 "where no_lhi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);
						this.cb_pp.setText(line.kode_pp);
						this.cb_kolek.setText(line.nik_kolek);						
					} 
				}		
					
				this.dataJU = {rs:{rows:[]}};	
				strSQL = "select 'APP' as status,a.no_ttb,a.cicilan_ke,a.nilai as saldo,substring(convert(varchar,a.jadwal,121),1,10) as jadwal,c.nama,c.alamat "+
						 "from kre_lhi_d a "+
				         "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
				         "inner join kre_agg c on b.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
				         "where a.no_lhi ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				/*
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.status.toUpperCase(),line.no_ttb,line.nama,line.alamat,floatToNilai(line.cicilan_ke),floatToNilai(line.saldo),line.jadwal]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
				*/
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[1]);
		
			}									
		} catch(e) {alert(e);}
	}
});