window.app_saku3_transaksi_kopeg_fAkruJasaPinj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kopeg_fAkruJasaPinj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kopeg_fAkruJasaPinj";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Jasa Pinjaman", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Akru","Daftar Akru"]});
		this.sg3 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_desc = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,15,450,20],caption:"Keterangan", maxLength:150});														
		this.e_total = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,15,200,20],caption:"Total Akru Jasa",tipeText:ttNilai,text:"0",readOnly: true});
		this.bTampil = new portalui_button(this.pc3.childPage[0],{bound:[509,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
		this.pc1 = new pageControl(this.pc3.childPage[0],{bound:[1,12,995,350], childPage:["Daftar Jurnal","Daftar Kartu"]});
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,			    
				colWidth:[[6,5,4,3,2,1,0],[100,200,80,200,80,150,80]],
				colTitle:["Kode Jenis","Jenis Pinj","Akun Piu Jasa","Nama Akun","Akun Pdpt","Nama Akun","Total Akru"],
                colFormat:[[6],[cfNilai]],dblClick:[this,"doDblClick"],nilaiChange:[this,"doSgChange"],
                readOnly:true, defaultRow:1}); 				
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:12,tag:9,		            
				colTitle:["No Kartu","Periode","Bill Ke-","No Agg","Anggota","Jenis","Akun Piu Jasa","Akun Jasa","N Pinjaman","N Pokok","N Jasa","N Tagihan"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,50,150,60,50,50,100]],
				colFormat:[[8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
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
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kopeg_fAkruJasaPinj.extend(window.portalui_childForm);
window.app_saku3_transaksi_kopeg_fAkruJasaPinj.implement({
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
						sql.add("delete from kop_pinjbill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjbill_j where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kop_pinj_sch set no_bill='-' where no_bill='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}
										
					sql.add("insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENBILL')");
					
					var j = 0;
					this.sg2.getRowCount()
					for (var i=0; i<this.sg2.getRowCount(); i++){
						if (this.sg2.rowValid(i)){
							j = i+1000;																
							sql.add("insert into kop_pinjbill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(2,i)+"','"+this.e_desc.getText()+"','D',"+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GENBILL','PJASA','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
							sql.add("insert into kop_pinjbill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(4,i)+"','"+this.e_desc.getText()+"','C',"+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GENBILL','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						}
					}					
					
					sql.add("update b set b.no_bill='"+this.e_nb.getText()+"' "+
						    "from kop_pinj_m a "+
						    "inner join kop_pinj_sch b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
							"inner join kop_agg f on a.no_agg = f.no_agg and a.kode_lokasi=f.kode_lokasi "+
							"where a.no_kas <>'-' and a.kode_lokasi ='"+this.app._lokasi+"' and b.periode = '"+this.e_periode.getText()+"' and b.no_bill='-' and a.status_aktif='1' and f.flag_aktif='1' ");			
						 
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
					this.sg2.clear(1); this.sg1.clear(1); this.sg3.clear(1);
					this.bTampil.setVisible(true);
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total akru jasa tidak boleh kurang dari atau sama dengan nol.");
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
					sql.add("delete from kop_pinjbill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kop_pinjbill_j where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update kop_pinj_sch set no_bill='-' where no_bill='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjbill_m","no_bill",this.app._lokasi+"-BPJ"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_desc.setFocus();
		setTipeButton(tbSimpan);			
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg1.clear(1);								
				var strSQL = "select c.kode_param,c.nama,a.akun_pjasa,d.nama as nama_piu,c.akun_jasa,e.nama as nama_pdpt,sum(b.nbunga) as tbunga "+
							 "from kop_pinj_m a "+
							 "inner join kop_pinj_sch b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
							 "inner join kop_pinj_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							 "inner join masakun d on a.akun_pjasa=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
							 "inner join masakun e on c.akun_jasa=e.kode_akun and c.kode_lokasi=e.kode_lokasi "+
							 "inner join kop_agg f on a.no_agg = f.no_agg and a.kode_lokasi=f.kode_lokasi "+
							 "where a.no_kas <>'-' and a.kode_lokasi ='"+this.app._lokasi+"' and b.periode = '"+this.e_periode.getText()+"' and b.no_bill='-' and a.status_aktif='1' and f.flag_aktif='1' "+
							 "group by c.kode_param,c.nama,a.akun_pjasa,d.nama,c.akun_jasa,e.nama ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						this.sg2.appendData([line.kode_param,line.nama,line.akun_pjasa,line.nama_piu,line.akun_jasa,line.nama_pdpt,floatToNilai(line.tbunga)]);
					}
				} else this.sg2.clear(1);							
				this.pc1.setActivePage(this.pc1.childPage[0]);			
			} 
			else {
				system.alert(this,"Periode harus valid.","Filter dari tanggal transaksi.");
				this.sg1.clear(1);
				this.sg2.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDblClick: function(sender, col, row){
		if (this.sg2.cells(0,row) != "") {
			if (this.stsSimpan) var filter = " and b.no_bill='-' ";
			else var filter = " and b.no_bill='"+this.e_nb.getText()+"' ";
			var strSQL = "select a.no_pinj,b.periode,b.cicilan_ke,f.no_agg,f.nama,a.kode_param,a.akun_pjasa,c.akun_jasa,a.nilai,b.npokok,b.nbunga,b.npokok+b.nbunga as ntagih "+
						 "from kop_pinj_m a "+
						 "inner join kop_pinj_sch b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
						 "inner join kop_pinj_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun d on a.akun_pjasa=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						 "inner join masakun e on c.akun_jasa=e.kode_akun and c.kode_lokasi=e.kode_lokasi "+
						 "inner join kop_agg f on a.no_agg = f.no_agg and a.kode_lokasi=f.kode_lokasi "+
						 "where a.kode_param='"+this.sg2.cells(0,row)+"' and a.no_kas <>'-' and a.kode_lokasi ='"+this.app._lokasi+"' and b.periode = '"+this.e_periode.getText()+"' and a.status_aktif='1' and f.flag_aktif='1' "+filter;			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
			this.sg1.appendData([line.no_pinj,line.periode,line.cicilan_ke,line.no_agg,line.nama,line.kode_param,line.akun_pjasa,line.akun_jasa,floatToNilai(line.nilai),floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.ntagih)]);
		}
		this.sg1.setNoUrut(start);		
	},	
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(6,i) != "") {
				tot1 += nilaiToFloat(this.sg2.cells(6,i));				
			}
		}
		this.e_total.setText(floatToNilai(tot1));
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
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
			this.sg2.clear(1); this.sg1.clear(1); this.sg3.clear(1);
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
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from kop_pinjbill_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.modul='GENBILL'";		
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
											
				var strSQL = "select * from kop_pinjbill_m "+							 
							 "where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_desc.setText(line.keterangan);																							
					}
				}												
											
				var strSQL = "select c.kode_param,c.nama,a.akun_pjasa,d.nama as nama_piu,c.akun_jasa,e.nama as nama_pdpt,sum(b.nbunga) as tbunga "+
							 "from kop_pinj_m a "+
							 "inner join kop_pinj_sch b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
							 "inner join kop_pinj_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							 "inner join masakun d on a.akun_pjasa=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
							 "inner join masakun e on c.akun_jasa=e.kode_akun and c.kode_lokasi=e.kode_lokasi "+
							 "inner join kop_agg f on a.no_agg = f.no_agg and a.kode_lokasi=f.kode_lokasi "+
							 "where a.no_kas <>'-' and a.kode_lokasi ='"+this.app._lokasi+"' and b.periode = '"+this.e_periode.getText()+"' and b.no_bill='"+this.e_nb.getText()+"' "+
							 "group by c.kode_param,c.nama,a.akun_pjasa,d.nama,c.akun_jasa,e.nama ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						this.sg2.appendData([line.kode_param,line.nama,line.akun_pjasa,line.nama_piu,line.akun_jasa,line.nama_pdpt,floatToNilai(line.tbunga)]);
					}
				} else this.sg2.clear(1);							
				this.pc1.setActivePage(this.pc1.childPage[0]);			
				
			}									
		} catch(e) {alert(e);}
	}
});