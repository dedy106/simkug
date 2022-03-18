window.app_saku3_transaksi_tu_proyek_fPYTdis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fPYTdis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fPYTdis";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Distribusi PYT - Pendapatan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data PYT","Daftar PYT"]});
		this.sg3 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});														
		this.cb_app = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,15,222,20],caption:"NIK Approve",tag:2,multiSelection:false}); 								
		
		this.e_total = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,15,200,20],caption:"Total",tipeText:ttNilai,text:"0",readOnly: true});
		this.bTampil = new portalui_button(this.pc3.childPage[0],{bound:[690,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
		this.pc1 = new pageControl(this.pc3.childPage[0],{bound:[1,12,995,325], childPage:["Daftar Pendapatan"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,		            
				colTitle:["ID Proyek","Periode","Keterangan","Akun PYT","Akun Pdpt","Nilai Akru","PP","DRK"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,100,100,100,250,80,150]],
				colFormat:[[5],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);
		this.pc3.childPage[0].rearrangeChild(10, 23);	
		
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
					
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fPYTdis.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_proyek_fPYTdis.implement({
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
						sql.add("delete from tu_prpyt_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tu_prpyt_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from tu_prpyt_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
										
					sql.add("insert into tu_prpyt_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENPYT')");
													
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];
						sql.add("insert into tu_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pyt+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.nilai_pend)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','GENPYT','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
						sql.add("insert into tu_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.nilai_pend)+",'"+line.kode_pp+"','"+line.kode_drkp+"','"+this.app._lokasi+"','GENPYT','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
				
						sql.add("insert into tu_prpyt_d(no_bukti,kode_lokasi,kode_proyek,periode,periode_dis,akun_pyt,akun_pdpt,kode_pp,kode_drk,nilai,dc,modul) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_proyek+"','"+line.periode+"','"+this.e_periode.getText()+"','"+line.akun_pyt+"','"+line.akun_pdpt+"','"+line.kode_pp+"','"+line.kode_drkp+"',"+parseFloat(line.nilai_pend)+",'D','PYTDIS')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg1.clear(1); this.sg3.clear(1);
					this.bTampil.setVisible(true);					
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
					sql.add("delete from tu_prpyt_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_prpyt_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_prpyt_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		this.sg1.clear(1);	
		this.e_total.setText("0");
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); this.sg3.clear(1); 
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpyt_m","no_bukti",this.app._lokasi+"-PYT"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);			
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg1.clear(1);
				var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_pyt,c.akun_pdpt,b.kode_pp,(a.nilai_pend - isnull(d.nilai_pend,0)) as nilai_pend,b.kode_drkp "+
							 "from tu_proyek_d a "+
							 "inner join (		 "+   //memastikan udah dijurnal piutang 
							 		
							 "		select distinct no_dokumen,kode_lokasi from tu_prpiutang_m "+
							 "		where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+							 		
							 "		) x on a.kode_proyek=x.no_dokumen and a.kode_lokasi=x.kode_lokasi "+
							 
							 "inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							 "inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+
							 
							 "left join (  "+
							 
							 "	select kode_proyek,periode,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_pend "+
							 "  from tu_prpyt_d "+
							 "  where kode_lokasi ='"+this.app._lokasi+"' "+
							 "  group by kode_proyek,periode,kode_lokasi "+
							 
							 ") d "+
							 "  on a.kode_proyek=d.kode_proyek and a.periode=d.periode and a.kode_lokasi=d.kode_lokasi "+
							 
							 "where a.periode <= '"+this.e_periode.getText()+"' and (a.nilai_pend - isnull(d.nilai_pend,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "order by a.kode_proyek,a.periode";
							 		 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
					
					var tot = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						tot = tot + parseFloat(line.nilai_pend);																	
					}
					this.e_total.setText(floatToNilai(tot));
				
				} else this.sg1.clear(1);
				
				this.pc1.setActivePage(this.pc1.childPage[0]);				
			} 
			else {
				system.alert(this,"Periode harus valid.","Filter dari tanggal transaksi.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.kode_proyek,line.periode,line.nama,line.akun_pyt,line.akun_pdpt,floatToNilai(line.nilai_pend),line.kode_pp,line.kode_drkp]);
		}
		this.sg1.setNoUrut(start);		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {															
								this.nama_report="server_report_saku3_tu_rptProyekPdptJurnal";
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
								this.pc3.hide();
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
				this.pc3.show();   
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
			this.sg1.clear(1); this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);		
			this.bTampil.setVisible(true);			
			this.stsSimpan = 1;			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from tu_prpyt_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.modul='GENPYT'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc3.setActivePage(this.pc3.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.bTampil.setVisible(false);
											
				var strSQL = "select * from tu_prpyt_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);								
					}
				}												
											
				
				this.sg1.clear(1);
				var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_pyt,c.akun_pdpt,b.kode_pp,(a.nilai_pend - isnull(d.nilai_pend,0)) as nilai_pend, b.kode_drkp "+
							 "from tu_proyek_d a "+
							 "inner join (		 "+
							 		
							 "		select distinct no_dokumen,kode_lokasi from tu_prpiutang_m "+
							 "		where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+							 		
							 "		) x on a.kode_proyek=x.no_dokumen and a.kode_lokasi=x.kode_lokasi "+
							 
							 "inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							 "inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+
							 
							 "inner join (  "+
							 
							 "	select  no_bukti,kode_proyek,periode,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_pend "+
							 "  from tu_prpyt_d "+
							 "  where kode_lokasi='"+this.app._lokasi+"' and no_bukti = '"+this.e_nb.getText()+"' "+
							 "  group by no_bukti,kode_proyek,periode,kode_lokasi "+
							 
							 ") e "+
							 "  on a.kode_proyek=e.kode_proyek and a.periode=e.periode and a.kode_lokasi=e.kode_lokasi "+
							 
							 
							 "left join (  "+
							 
							 "	select kode_proyek,periode,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_pend "+
							 "  from tu_prpyt_d "+
							 "  where kode_lokasi='"+this.app._lokasi+"' and no_bukti<> '"+this.e_nb.getText()+"' "+
							 "  group by kode_proyek,periode,kode_lokasi "+
							 
							 ") d "+
							 "  on a.kode_proyek=d.kode_proyek and a.periode=d.periode and a.kode_lokasi=d.kode_lokasi "+
							 
							 "where e.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "order by a.kode_proyek,a.periode";
							 		 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
					
					var tot = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						tot = tot + parseFloat(line.nilai_pend);																	
					}
					this.e_total.setText(floatToNilai(tot));
				
				} else this.sg1.clear(1);
				
				this.pc1.setActivePage(this.pc1.childPage[0]);
										
				
			}									
		} catch(e) {alert(e);}
	}	
});