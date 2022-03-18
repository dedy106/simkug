window.app_saku3_transaksi_kredit_fLhi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fLhi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fLhi";
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
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,347], childPage:["Data TTB","Data LHI","Copy LHI"]});		
		this.cb_ttb = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"No TTB - Ke", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});				
		this.cb_agg = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Koordinator", readOnly:true, tag:9});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Alamat", readOnly:true, tag:9});	
		this.e_jadwal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Jadwal", tag:9, readOnly:true});				
		this.e_tagih = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Tagihan", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bOk = new button(this.pc1.childPage[0],{bound:[120,17,100,18],caption:"Tagihan",click:[this,"doBayar"]});			
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-45],colCount:5,tag:0,
		            colTitle:["No TTB","Koordinator","Angs-Ke","Nilai","Jadwal Sisa"],
					colWidth:[[4,3,2,1,0],[100,100,100,300,100]],					
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		
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
window.app_saku3_transaksi_kredit_fLhi.extend(window.childForm);
window.app_saku3_transaksi_kredit_fLhi.implement({
	doCopy: function(sender) {
		var strSQL = "select a.no_ttb,a.cicilan_ke,e.npokok-isnull(d.angsur,0) as saldo,substring(convert(varchar,case when f.tgl_lunas is null then e.tgl_angs else f.tgl_lunas end,121),1,10) as jadwal,c.nama "+
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
				this.sg.appendData([line.no_ttb,line.nama,floatToNilai(line.cicilan_ke),floatToNilai(line.saldo),line.jadwal]);
			}
		} else this.sg.clear(1);			
		this.sg.validasi();
		
		this.pc1.setActivePage(this.pc1.childPage[1]);	
	},
	doBayar: function(sender) {
		try {	
			var temu = false;
			for (var j=0;j < this.sg.getRowCount();j++){
				if (this.sg.cells(0,j) == this.cb_ttb.getText() && this.sg.cells(2,j) == this.cb_ttb.rightLabelCaption) {
					temu = true;
					var k = j+1;
					system.alert(this,"Transaksi tidak valid.","Duplikasi data angsuran untuk baris ["+k+"]");
					return false;
				}
			}
	
			if (!temu) {
				this.sg.appendData([this.cb_ttb.getText(),this.cb_agg.rightLabelCaption,this.cb_ttb.rightLabelCaption,this.e_tagih.getText(),this.e_jadwal.getText()]);
				this.sg.validasi();
			}
		
			this.cb_ttb.setText("","");
			this.cb_agg.setText("","");
			this.e_alamat.setText("");
			this.e_jadwal.setText("");
			this.e_tagih.setText("0");
			
			
			var nobukti = "";
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {
					nobukti += ",'"+this.sg.cells(0,i)+this.sg.cells(2,i)+"'";
				}
			}
			nobukti = nobukti.substr(1);
			if (nobukti == "") nobukti = "''";	
			
			var strSQL = "select a.no_ttb, a.cicilan_ke "+
						 "from kre_ttb2_sch a  "+
						 "     inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
						 "     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke ) c "+
						 "				 on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+
						 "where (a.no_ttb+convert (varchar,a.cicilan_ke)) not in ("+nobukti+") "+
						 "      and a.npokok > isnull(c.angsur,0) and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-'  ";
			this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.cicilan_ke"],false,["No TTB","Ke"],"and","Data TTB",true);	
				
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
						sql.add("delete from kre_lhi_m where no_lhi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_lhi_d where no_lhi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into kre_lhi_m (no_lhi,kode_lokasi,kode_pp,tanggal,nik_kolek,periode, tgl_input,nik_user) values "+
					       "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_kolek.getText()+"','"+this.e_periode.getText()+"', getdate(),'"+this.app._userLog+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																							
								sql.add("insert into kre_lhi_d (no_lhi,kode_lokasi,no_ttb,cicilan_ke,nilai,jadwal) values "+
					       				"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseInt(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'"+this.sg.cells(4,i)+"')");
				
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
					this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.cicilan_ke"],false,["No TTB","Ke"],"and","Data TTB",true);					
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
			
			var nobukti = "";
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {
					nobukti += ",'"+this.sg.cells(0,i)+this.sg.cells(2,i)+"'";
				}
			}
			nobukti = nobukti.substr(1);
			if (nobukti == "") nobukti = "''";	
			
			
			this.cb_ttb.setText("","");	
			this.cb_kolek.setText("","");	
			this.cb_kolek2.setText("","");	
			var strSQL = "select a.no_ttb, a.cicilan_ke "+
						 "from kre_ttb2_sch a  "+
						 "     inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
						 "     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke ) c "+
						 "				 on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+
						 "where (a.no_ttb+convert (varchar,a.cicilan_ke)) not in ("+nobukti+") "+
						 "      and a.npokok > isnull(c.angsur,0) and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-'  ";
			
			this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.cicilan_ke"],false,["No TTB","Ke"],"and","Data TTB",true);												
					
			this.cb_kolek.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status = 'COLLECTOR' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Collector",true);												
			this.cb_kolek2.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and status = 'COLLECTOR' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Collector",true);												
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
			
			var strSQL = "select convert(varchar,a.tgl_angs,111) as tgl, a.npokok-isnull(c.angsur,0) as saldo "+						 
						 "from kre_ttb2_sch a "+						 
						 "     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' and no_bukti <> '"+this.e_nb.getText()+"' group by no_ttb,cicilan_ke ) c "+
						 "				 on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+						 
			             "where a.no_ttb='"+this.cb_ttb.getText()+"' and a.cicilan_ke="+this.cb_ttb.rightLabelCaption+" and a.kode_lokasi='"+this.app._lokasi+"'";
						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.e_tagih.setText(floatToNilai(line.saldo));	
					this.e_jadwal.setText(line.tgl);										
				} 
			}
			
			var strSQL = "select top 1 substring(convert(varchar,a.tgl_lunas,121),1,10) as tgl "+
						 "from kre_angsur_d a "+
			             "where dc = 'D' and a.no_ttb='"+this.cb_ttb.getText()+"' and a.cicilan_ke="+this.cb_ttb.rightLabelCaption+" and a.kode_lokasi='"+this.app._lokasi+"' order by tgl_lunas desc";
						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_jadwal.setText(line.tgl);										
				} 
			}
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
				var strSQL = "select a.no_ttb, a.cicilan_ke "+
						 "from kre_ttb2_sch a  "+
						 "     inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
						 "     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke ) c "+
						 "				 on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+
						 "where a.npokok > isnull(c.angsur,0) and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-'  ";
						 
				this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.cicilan_ke"],false,["No TTB","Ke"],"and","Data TTB",true);					
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_lhi_m","no_lhi",this.app._lokasi+"-LHI"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(3,i));									
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
			var strSQL = "select a.no_ttb, a.cicilan_ke "+
						 "from kre_ttb2_sch a  "+
						 "     inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
						 "     left join (select no_ttb,cicilan_ke,sum(case dc when 'D' then nilai else -nilai end) as angsur "+
						 "                from kre_angsur_d where kode_lokasi='"+this.app._lokasi+"' group by no_ttb,cicilan_ke ) c "+
						 "				 on c.no_ttb=a.no_ttb and a.cicilan_ke=c.cicilan_ke "+
						 "where a.npokok > isnull(c.angsur,0) and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-'  ";
						 
			this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.cicilan_ke"],false,["No TTB","Ke"],"and","Data TTB",true);		
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
				
				this.cb_ttb.setText("","");
				this.cb_agg.setText("","");
				this.e_alamat.setText("");
				this.e_jadwal.setText("");
				this.e_tagih.setText("0");
				
			
				strSQL = "select a.no_ttb, a.cicilan_ke "+
						 "from kre_lhi_d a  "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_lhi='"+this.e_nb.getText()+"' ";				
				this.cb_ttb.setSQL(strSQL,["a.no_ttb","a.cicilan_ke"],false,["No TTB","Ke"],"and","Data TTB",true);	
							
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
					
				strSQL = "select a.no_ttb,a.cicilan_ke,a.nilai,substring(convert(varchar,a.jadwal,121),1,10) as jadwal,c.nama "+
						 "from kre_lhi_d a "+
				         "inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi "+
				         "inner join kre_agg c on b.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
				         "where a.no_lhi ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_ttb,line.nama,floatToNilai(line.cicilan_ke),floatToNilai(line.nilai),line.jadwal]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
				
			}									
		} catch(e) {alert(e);}
	}
});