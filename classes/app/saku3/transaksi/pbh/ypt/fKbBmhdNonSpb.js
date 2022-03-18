window.app_saku3_transaksi_pbh_ypt_fKbBmhdNonSpb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_pbh_ypt_fKbBmhdNonSpb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_pbh_ypt_fKbBmhdNonSpb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank BMHD NonSPB", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,300,150,80,100]],
					colFormat:[[4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[10,11,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});							
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"Jenis",items:["BK"], readOnly:true,tag:2,change:[this,"doChange"],visible:false});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this.pc2.childPage[0],{bound:[490,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilaikb = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,305], childPage:["Daftar SPB","Daftar Transfer"]});		
		this.sg5 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["No BMHD","Tanggal","Deskripsi","Akun BMHD","Saldo","Nilai","Rekening"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,100,80,300,80,110]],
					columnReadOnly:[true,[0,1,2,3,4,6],[5]],
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfButton]], colAlign:[[6],[alCenter]],
					click:[this,"doSgBtnClick5"], 
					nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick5"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
					colTitle:["Bank","Cabang","No Rekening","Nama Rekening","Bruto","Potongan","Netto"],
					colWidth:[[6,5,4,3,2,1,0],[100,80,100,200,100,200,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],				
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],												
					defaultRow:1,autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
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
								"where b.kode_flag in ('001','009') and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_pbh_ypt_fKbBmhdNonSpb.extend(window.childForm);
window.app_saku3_transaksi_pbh_ypt_fKbBmhdNonSpb.implement({	
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
						sql.add("delete from bmhd_bayar where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}			

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBBMHD','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilaikb.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilaikb.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBBMHD','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilaikb.getText())+")");
										
					for (var i=0;i < this.dataJU5.rs.rows.length;i++){
						line = this.dataJU5.rs.rows[i];
						if (nilaiToFloat(line.nilai) != 0) {
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+line.keterangan+"','D',"+nilaiToFloat(line.nilai)+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBBMHD','BMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(line.nilai)+")");								
							sql.add("insert into bmhd_bayar (no_aju,no_bmhd,kode_lokasi,akun_bmhd,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
									"('"+this.e_nb.getText()+"','"+line.no_bmhd+"','"+this.app._lokasi+"','"+line.kode_akun+"','"+line.keterangan+"','"+this.app._kodePP+"','KBBMHD','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(line.nilai)+",'D','-','-',0)");				
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
					this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
					this.dataJU5 = {rs:{rows:[]}};
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);		
					this.doLoad3();			
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";															
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);	
				for (var i=0;i < this.dataJU5.rs.rows.length;i++){					
					line = this.dataJU5.rs.rows[i];
					if (nilaiToFloat(line.nilai) > nilaiToFloat(line.saldo)) {
						var k = i+1;
						system.alert(this,"Transaksi tidak valid.","Nilai melebihi Saldo (Baris "+k+").");
						return false;							
					}
				}																
				if (nilaiToFloat(this.e_nilaikb.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai KB tidak boleh nol atau kurang.");
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
				else 
				this.simpan();
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
					sql.add("delete from bmhd_bayar where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);				
		if (this.stsSimpan == 1) {
			this.doClick();				
			this.doLoad3();
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();								
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
				this.dataJU5 = {rs:{rows:[]}};
				this.bLoad.show();				
				this.e_nilaikb.setText("0");
				this.doLoad3();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_akun.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad:function(sender){				
		this.dataJU5 = {rs:{rows:[]}};
        var strSQL = "select a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai-isnull(b.bayar,0) as saldo,0 as nilai,a.kode_akun "+
					 "from bmhd_m a "+
					 "		left join ("+
					 "    		select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
					 "			from bmhd_bayar where kode_lokasi='"+this.app._lokasi+"' "+
					 "			group by no_bmhd,kode_lokasi "+
					 "		) b on a.no_bmhd=b.no_bmhd and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai-isnull(b.bayar,0)>0 ";                    
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU5 = data;
			this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn5.rearrange();
			this.doTampilData5(1);
		} else this.sg5.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData5: function(page) {		
		this.sg5.clear(); this.sg4.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU5.rs.rows.length? this.dataJU5.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU5.rs.rows[i];									
			this.sg5.appendData([line.no_bmhd,line.tgl,line.keterangan,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai),"Pilih"]);
		}
		this.sg5.setNoUrut(start);		
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 5) {			
			this.dataJU5.rs.rows[((this.page-1)*20) + row].nilai = this.sg5.cells(5,row);			
			this.sg5.validasi();
		}
	},
	doSgBtnClick5: function(sender, col, row){
		try{
			if (col === 6) {
				this.doDoubleClick5(this.sg5,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick5: function(sender, col , row) {
		var line = noBMHD = "";		
		for (var i=0;i < this.dataJU5.rs.rows.length;i++){
			line = this.dataJU5.rs.rows[i];
			if (parseFloat(line.nilai) != 0) {
				noBMHD += ",'"+line.no_bmhd+"'";
			}
		}
		noBMHD = noBMHD.substr(1);							
		if (noBMHD != "") {					
            var strSQL = "select a.bank,a.nama,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai "+
						 "from pbh_rek a inner join pbh_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi and a.modul<>'PINBUK-C' "+
						 "				 inner join spb_m c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi "+
						 "where c.no_kas in ("+noBMHD+") and c.kode_lokasi ='"+this.app._lokasi+"' ";   						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg4.appendData([line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai)]);
				}
			} else this.sg4.clear(1);														
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"Data tidak valid.","Nilai Pembayaran nol.");			
	},
	doNilaiChange: function(){
		try{
			var totKB = 0;
			for (var i=0;i < this.dataJU5.rs.rows.length;i++){
				line = this.dataJU5.rs.rows[i];
				if (parseFloat(line.nilai) != 0) {
					totKB += nilaiToFloat(line.nilai);
				}
			}			
			this.e_nilaikb.setText(floatToNilai(totKB));
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
								this.nama_report="server_report_saku3_pbh_rptKbPb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.dataJU5 = {rs:{rows:[]}};
			this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.doLoad3();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBBMHD' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bLoad.hide();
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_dokumen,jenis,tanggal,akun_kb "+
							 "from kas_m "+							 
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);						
						this.cb_akun.setText(line.akun_kb);						
					}
				}								
				this.dataJU5 = {rs:{rows:[]}};							 
                var strSQL = "select a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai-isnull(b.bayar,0) as saldo,x.nilai,a.kode_akun "+
							 "from bmhd_m a "+
							 "		inner join bmhd_bayar x on a.no_bmhd=x.no_bmhd and a.kode_lokasi=x.kode_lokasi and x.no_aju='"+this.e_nb.getText()+"' "+
							 "		left join ("+
							 "    		select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "			from bmhd_bayar where kode_lokasi='"+this.app._lokasi+"' and no_aju <> '"+this.e_nb.getText()+"' "+
							 "			group by no_bmhd,kode_lokasi "+
							 "		) b on a.no_bmhd=b.no_bmhd and a.kode_lokasi=b.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' ";     
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU5 = data;
					this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn5.rearrange();
					this.doTampilData5(1);
				} else this.sg5.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[0]);				

			}									
		} catch(e) {alert(e);}
	}

});