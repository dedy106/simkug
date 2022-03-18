window.app_saku3_transaksi_yakes21_inves_fKbObliJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fKbObliJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fKbObliJual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","KasBank Penjualan Obligasi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],					
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});												
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});												
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"],readOnly:true});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this.pc2.childPage[0],{bound:[670,15,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,282], childPage:["Data Penjualan"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,				
				colTitle:["Status","No Bukti","Tanggal","Keterangan","Jenis","Net. Jual","Net. Kupon","Total"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,120,230,80,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						        "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='SHMPPH' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunpph = line.flag;
			} else this.akunpph = "-";

			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PLAN') and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];									
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);
				}
			}

			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_obli_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','PIUJUAL','PIUKUPON')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;
					if (line.kode_param == "PIUJUAL") this.akunPiutang = line.flag;														
					if (line.kode_param == "PIUKUPON") this.akunPiukupon = line.flag;																																						
				}
			}

			this.cb_buat.setText(this.app._userLog);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fKbObliJual.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fKbObliJual.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);	
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"'");	
						sql.add("update inv_oblijual_m set no_kasjual ='-' where no_kasjual='"+this.e_nb.getText()+"'");
					}

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBOBLJUAL','BM','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
										
					if (this.sg.getRowValidCount() > 0){
						var j=0;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){							    															
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBOBLJUAL','KBOBL','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");

								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.kodepp+"','-','-','-','"+this.app._lokasi+"','KBOBLJUAL','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");								
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPiukupon+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.kodepp+"','-','-','-','"+this.app._lokasi+"','KBOBLJUAL','PIUKUPON','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");								
								
								sql.add("update inv_oblijual_m set no_kasjual ='"+this.e_nb.getText()+"' where no_oblijual='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					setTipeButton(tbSimpan);
					this.stsSimpan=1;
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"'");
				sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"'");	
				sql.add("update inv_oblijual_m set no_kasjual ='-' where no_kasjual='"+this.e_nb.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);	
	},	
	doLoad:function(sender){
		if (this.e_periode.getText() != "") {
			var strSQL = "select a.no_oblijual,convert(varchar,a.tanggal,103) as tgl,a.keterangan,c.nama as jenis,x.n_jual-x.pajak as net_jual,x.n_kupon-x.pajak_kupon as net_gl, x.n_jual+x.n_kupon-x.pajak-x.pajak_kupon as net_total "+						 
			             "from inv_oblijual_m a "+
						 "		inner join inv_oblijenis c on a.kode_jenis=c.kode_jenis "+						 
						 "      inner join inv_oblijual_d x on a.no_oblijual=x.no_oblijual "+
						 "where a.no_kasjual ='-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_oblijual";						
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_oblijual,line.tgl,line.keterangan,line.jenis,floatToNilai(line.net_jual),floatToNilai(line.net_gl),floatToNilai(line.net_total)]);
				}
			} else this.sg.clear(1);			
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {			
			this.sg.validasi();		
		}
	},	
	doNilaiChange: function(){
		try{						
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(7,i) != ""){
					tot = tot + nilaiToFloat(this.sg.cells(7,i));				
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
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();  
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan=1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai as total "+
		             "from kas_m a "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.modul='KBOBLJUAL' "+
					 "order by a.no_kas desc";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.keterangan,line.total,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);		
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
				
				var strSQL = "select * from kas_m where no_kas= '"+this.e_nb.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);						
						this.cb_akun.setText(line.akun_kb);
					}
				}
				
				var strSQL = "select a.no_oblijual,convert(varchar,a.tanggal,103) as tgl,a.keterangan,c.nama as jenis,x.n_jual-x.pajak as net_jual,x.n_kupon-x.pajak_kupon as net_gl, x.n_jual+x.n_kupon-x.pajak-x.pajak_kupon as net_total "+						 
							"from inv_oblijual_m a "+
							"		inner join inv_oblijenis c on a.kode_jenis=c.kode_jenis "+						 
							"      inner join inv_oblijual_d x on a.no_oblijual=x.no_oblijual "+
							"where a.no_kasjual ='"+this.e_nb.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_oblijual";						
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_oblijual,line.tgl,line.keterangan,line.jenis,floatToNilai(line.net_jual),floatToNilai(line.net_gl),floatToNilai(line.net_total)]);
					}
				} else this.sg.clear(1);	
				this.sg.validasi();
			}
		} catch(e) {alert(e);}
	}
});