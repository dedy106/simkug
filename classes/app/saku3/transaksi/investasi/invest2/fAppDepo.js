window.app_saku3_transaksi_investasi_invest2_fAppDepo = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_investasi_invest2_fAppDepo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fAppDepo";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Penempatan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar Bukti","Data Penempatan","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:9,
		            colTitle:["No Bukti","Status","Tgl Penempatan","Deskripsi","Nilai","Pembuat","No Flag","Tgl Input","Modul"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[60,110,100,100,100,250,100,80,100]],					
					readOnly:true,colFormat:[[4],[cfNilai]],
					autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"No App", readOnly:true,visible:false});								
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"No Bukti", readOnly:true});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,11,220,20],caption:"Tgl Penempatan", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,14,220,20],caption:"Nilai Penempatan", readOnly:true, tipeText:ttNilai, text:"0"});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-88],colCount:20,tag:9,		            
					colTitle:["Kd Cabang","Nama","Bank","Maks Tempat","Sisa Plafon","Tgl Berlaku","Satuan","Jml [H/B]","Rate1","Rate2","Rate YKT","Rate Final","Nominal","Status","Basis Hr","Jth Tempo","Rek Cair","Nama Rek","Rek Bunga","Nama Rek"],		
					colWidth:[[19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[120,150,60,150,60,80,60,80,100,80,80,60,60,60,60,80,100,100,60,120,60]],
					colFormat:[[3,4,7,8,9,10,11,12,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,12,13,15,17,19],[10,11,12,14,16,18]],					
					buttonStyle:[[13,16,18],[bsAuto,bsEllips,bsEllips]],
					picklist:[[13],[new portalui_arrayMap({items:["DAKES","DAKEM"]})]],checkItem: true,					
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],					
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
			
		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
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
						
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_investasi_invest2_fAppDepo.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fAppDepo.implement({	
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
						sql.add("delete from inv_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_app_d where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update inv_shop_m set no_app='-',progress='0' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						if (this.modul == "PINDAHJNS" || this.modul == "PERPANJANG" || this.modul == "SEBAGIAN") sql.add("update inv_depo2_m set progress='0',no_kas='-' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into inv_app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','DEPO','-')");
					sql.add("insert into inv_app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','1','DEPO','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','-')");
										
					sql.add("update inv_shop_m set no_app='"+this.e_nb.getText()+"',progress='1' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					if (this.modul == "PINDAHJNS" || this.modul == "PERPANJANG" || this.modul == "SEBAGIAN") {
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && nilaiToFloat(this.sg1.cells(12,i)) != 0) {
								sql.add("update inv_depo2_m set progress='1',no_kas='"+this.e_nb.getText()+"' where no_depo='"+this.noDepo+"' and no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbAllFalse);
					this.cb_nb.setSQL("select no_shop, keterangan from inv_shop_m where periode<='"+this.e_periode.getText()+"' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_shop","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Shopping",true);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";				
				if (this.depoProg == "1") {
					var strSQL = "select count(*) as jml from inv_depoakru_d where no_depo='"+this.noDepo+"'";							 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							if (line.jml > 0) {
								system.alert(this,"Transaksi tidak valid.","No Deposito sudah pernah ditransaksi akru.");
								return false;
							}
 						}
					}
				}				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				else 
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();													
				if (this.depoProg == "1") {
					var strSQL = "select count(*) as jml from inv_depoakru_d where no_depo='"+this.noDepo+"'";							 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							if (line.jml > 0) {
								system.alert(this,"Transaksi tidak valid.","No Deposito sudah pernah ditransaksi akru.");
								return false;
							}
 						}
					}
				}				
				sql.add("delete from inv_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from inv_app_d where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update inv_shop_m set no_app='-',progress='0' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.modul == "PINDAHJNS" || this.modul == "PERPANJANG" || this.modul == "SEBAGIAN") sql.add("update inv_depo2_m set progress='0',no_kas='-' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.cb_nb.setSQL("select no_shop, keterangan from inv_shop_m where periode<='"+this.e_periode.getText()+"' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_shop","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Shopping",true);
		if (this.stsSimpan == 1) this.doClick();
		this.doLoad();
	},	
	doChange:function(sender){									
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			this.page = 1;						
			var strSQL = "select a.no_shop,'APPROVE' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nik_user+' - '+d.nama as nikuser,a.no_app as no_flag,a.tgl_input,a.modul "+
						 "from inv_shop_m a inner join karyawan d on a.nik_user=d.nik "+
						 "where a.no_shop='"+this.cb_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";					 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.sg.clear();			
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					var line = this.dataJU.rs.rows[i];																	
					this.sg.appendData([line.no_shop,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikuser,line.no_flag,line.tgl_input,line.modul]);
				}
			} else this.sg.clear(1);												
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","0000"));																				
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg.cells(0,baris) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);													
				this.e_nobukti.setText(this.sg.cells(0,baris));
				this.e_tgl.setText(this.sg.cells(2,baris));
				this.e_ket.setText(this.sg.cells(3,baris));
				this.e_nilai.setText(this.sg.cells(4,baris));
				this.noAppLama = this.sg.cells(6,baris);						
				this.modul = this.sg.cells(8,baris);						
				
				var tot = 0;				
				if (this.modul == "SHOP") {
					var strSQL = "select b.progress,b.no_depo,e.kode_bank as bdepo,c.nama as nama_bdepo,c.kode_bankklp,e.maks,e.sisa-e.nilai as sisa,convert(varchar,e.tgl_rate,103) as tgl_rate,e.satuan,e.jml_hari,e.rate1,e.rate2,e.rate_aju,e.rate_final,e.nilai,b.status_dana,e.basis,convert(varchar,e.jth_tempo,103) as jth_tempo,e.bcair,f.nama as nama_cair,e.bbunga,g.nama as nama_bunga "+
								 "from inv_shop_rate e "+
								 "left join inv_bank c on e.kode_bank=c.kode_bank "+							 
								 "left join inv_depo2_m b on e.no_shop=b.no_shop "+
								 "left join inv_bank f on e.bcair=f.kode_bank "+
								 "left join inv_bank g on e.bbunga=g.kode_bank "+
								 "where e.no_shop = '"+this.e_nobukti.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"' "+
								 "order by ((e.rate1+e.rate2) /2) desc";
				}
				if (this.modul == "MI") {
					var strSQL = "select b.progress,b.no_depo,b.bdepo,c.nama as nama_bdepo,c.kode_bankklp,0 as maks,0 as sisa,convert(varchar,b.tanggal,103) as tgl_rate,case b.jenis when 'DEPOSITO' then 'BULAN' else 'HARI' end as satuan,b.jml_hari,b.p_bunga as rate1,b.p_bunga as rate2,b.p_bunga as rate_aju,b.p_bunga as rate_final,b.nilai,b.status_dana,b.basis,convert(varchar,b.tgl_selesai,103) as jth_tempo,b.bcair,f.nama as nama_cair,b.bbunga,g.nama as nama_bunga "+
								 "from inv_depo2_m b "+
								 "inner join inv_bank c on b.bdepo=c.kode_bank "+
								 "inner join inv_bank f on b.bcair=f.kode_bank "+
								 "inner join inv_bank g on b.bbunga=g.kode_bank "+
								 "where b.no_depo = '"+this.e_nobukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";
				}
				if (this.modul == "PINDAHJNS" || this.modul == "PERPANJANG" || this.modul == "SEBAGIAN") {
					var strSQL = "select b.progress,b.no_depo,b.bdepo,b.keterangan as nama_bdepo,c.kode_bankklp,e.maks,0 as sisa,convert(varchar,e.tgl_rate,103) as tgl_rate,e.satuan,e.jml_hari,e.rate1,e.rate2,e.rate_aju,e.rate_final,e.nilai,b.status_dana,e.basis,convert(varchar,e.jth_tempo,103) as jth_tempo,e.bcair,f.nama as nama_cair,e.bbunga,g.nama as nama_bunga "+
								 "from inv_shop_rate e "+
								 "left join inv_bank c on e.kode_bank=c.kode_bank "+							 
								 "left join inv_depo2_m b on e.no_shop=b.no_shop "+
								 "left join inv_bank f on e.bcair=f.kode_bank "+
								 "left join inv_bank g on e.bbunga=g.kode_bank "+
								 "where e.no_shop = '"+this.e_nobukti.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"' "+
								 "order by ((e.rate1+e.rate2) /2) desc";
				}	
						 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																														
						tot += parseFloat(line.nilai);
						this.sg1.appendData([line.bdepo,line.nama_bdepo,line.kode_bankklp,floatToNilai(line.maks),floatToNilai(line.sisa),line.tgl_rate,line.satuan.toUpperCase(),floatToNilai(line.jml_hari),floatToNilai(line.rate1),floatToNilai(line.rate2),floatToNilai(line.rate_aju),floatToNilai(line.rate_final),floatToNilai(line.nilai),line.status_dana,floatToNilai(line.basis),line.jth_tempo,line.bcair,line.nama_cair,line.bbunga,line.nama_bunga]);
					}
				
					this.noDepo = line.no_depo;				
					this.depoProg = line.progress;
					this.e_nilai.setText(floatToNilai(tot));				
				} 
				else {
					this.sg1.clear(1);
					this.noDepo = "";				
					this.depoProg = "";
					this.e_nilai.setText("0");	
				}

				
				if (this.noAppLama == "-") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}		
					
			}
		} catch(e) {alert(e);}
	},			
	doLoad:function(sender){								
		this.e_nilai.setText("0");
		var strSQL = "select a.no_shop,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nik_user+' - '+d.nama as nikuser,a.no_app as no_flag,a.tgl_input,a.modul "+
					 "from inv_shop_m a inner join karyawan d on a.nik_user=d.nik "+
					 "where a.progress='0' and a.kode_lokasi ='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();						
			this.sg.clear();			
			this.page = 1;
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];																	
				this.sg.appendData([line.no_shop,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikuser,line.no_flag,line.tgl_input,line.modul]);
			}			
		} else this.sg.clear(1);							
	},							
	doTampilData: function(page) {
		this.sg.doSelectPage(page);
		this.page = page;
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);							
			setTipeButton(tbAllFalse);
			this.cb_nb.setSQL("select no_shop, keterangan from inv_shop_m where periode<='"+this.e_periode.getText()+"' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_shop","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Shopping",true);
		} catch(e) {
			alert(e);
		}
	}
});

