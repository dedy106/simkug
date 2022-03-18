window.app_saku3_transaksi_tarbak_hutang_fBmhdDpc = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_hutang_fBmhdDpc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_hutang_fBmhdDpc";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BYMHD DPC", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,300,150,80,100]],
					colFormat:[[4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[10,11,220,20],caption:"Akun BYMHD", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});									
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this.pc2.childPage[0],{bound:[490,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilaihut = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total BYMHD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,305], childPage:["Daftar DPC","Daftar Atensi"]});		
		this.sg5 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:0,
		            colTitle:["Status","No DPC","Tanggal","Deskripsi","Nilai","Rekening"],
					colWidth:[[5,4,3,2,1,0],[70,100,400,80,120,80]],
					colFormat:[[4,5],[cfNilai,cfButton]], colAlign:[[5],[alCenter]],
					click:[this,"doSgBtnClick5"], colAlign:[[5],[alCenter]],									
					readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["BYMHD","INPROG"]})]],
					nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick5"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
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
								"where b.kode_flag = '004' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun BYMHD",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_hutang_fBmhdDpc.extend(window.childForm);
window.app_saku3_transaksi_tarbak_hutang_fBmhdDpc.implement({	
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
						sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tar_hutang_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update pbh_pb_m set progress='2', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
						sql.add("update spb_m set progress='0', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					}			
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','BYMHD-DPC','BYMHD','IDR',1,"+nilaiToFloat(this.e_nilaihut.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.cb_akun.getText()+"',getdate(),'"+this.app._userLog+"')");
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaihut.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BYMHD-DPC','BYMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");

					for (var i=0;i < this.dataJU5.rs.rows.length;i++){
						line = this.dataJU5.rs.rows[i];
						if (line.status.toUpperCase() == "BYMHD") {
							sql.add("update pbh_pb_m set progress='3', no_kas='"+this.e_nb.getText()+"' where no_spb = '"+line.no_spb+"' and kode_lokasi='"+this.app._lokasi+"'");						
							sql.add("update spb_m set progress='1', no_kas='"+this.e_nb.getText()+"' where no_spb = '"+line.no_spb+"' and kode_lokasi='"+this.app._lokasi+"'");						

							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+											
									"select '"+this.e_nb.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-','-','-','-','-','-','"+this.app._lokasi+"','BYMHD-DPC',jenis,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),no_spb,'-' "+
									"from spb_j "+
									"where no_spb='"+line.no_spb+"' and kode_lokasi='"+this.app._lokasi+"' ");

							//----------- 	update status modul ----------
							sql.add("update a set a.progress='2', a.no_kas='"+this.e_nb.getText()+"' "+
									"from panjar_m a "+
									"inner join pbh_pb_m b on a.no_pj=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
									"inner join spb_j c on b.no_pb=c.no_dokumen and b.kode_lokasi=c.kode_lokasi "+
									"where c.no_spb='"+line.no_spb+"' and c.kode_lokasi='"+this.app._lokasi+"' ");

							//-----------   daftar hutang bymhd -----------
							sql.add("insert into tar_hutang_d (no_bukti,kode_lokasi,tgl_input,nik_user,tanggal,periode,no_spb,keterangan,nilai,dc,akun_hutang) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+line.no_spb+"','"+line.keterangan+"',"+nilaiToFloat(line.nilai)+",'D','"+this.cb_akun.getText()+"')");							
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
				if (nilaiToFloat(this.e_nilaihut.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai BYMHD tidak boleh nol atau kurang.");
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
					sql.add("update a set a.progress='1', a.no_kas='-' "+
							"from panjar_m a "+
							"inner join pbh_pb_m b on a.no_pj=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
							"inner join spb_j c on b.no_pb=c.no_dokumen and b.kode_lokasi=c.kode_lokasi "+
							"inner join spb_m d on c.no_spb=d.no_spb and c.kode_lokasi=d.kode_lokasi "+
							"where d.no_kas='"+this.e_nb.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' ");
							
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tar_hutang_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update pbh_pb_m set progress='2', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("update spb_m set progress='0', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
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
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();								
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
				this.dataJU5 = {rs:{rows:[]}};
				this.bLoad.show();				
				this.e_nilaihut.setText("0");
				this.doLoad3();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-MI"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_akun.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad:function(sender){		
		this.dataJU5 = {rs:{rows:[]}};
        var strSQL = "select 'INPROG' as status,no_spb,convert(varchar,tanggal,103) as tgl,keterangan,nilai "+
		             "from spb_m "+
					 "where progress='0' and no_kas='-' and kode_lokasi='"+this.app._lokasi+"' and modul='SPB'";                    
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
			this.sg5.appendData([line.status.toUpperCase(),line.no_spb,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]);
		}
		this.sg5.setNoUrut(start);		
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 0) {			
			this.dataJU5.rs.rows[((this.page-1)*20) + row].status = this.sg5.cells(0,row);			
			this.sg5.validasi();
		}
	},
	doSgBtnClick5: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick5(this.sg5,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick5: function(sender, col , row) {
		var line = noSPB = "";		
		for (var i=0;i < this.dataJU5.rs.rows.length;i++){
			line = this.dataJU5.rs.rows[i];
			if (line.status.toUpperCase() == "BYMHD") {
				noSPB += ",'"+line.no_spb+"'";
			}
		}
		noSPB = noSPB.substr(1);							
		if (noSPB != "") {					
            var strSQL = "select a.bank,a.nama,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai "+
						 "from pbh_rek a inner join pbh_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_spb in ("+noSPB+") and b.kode_lokasi ='"+this.app._lokasi+"' ";                                     
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
		else system.alert(this,"Data tidak valid.","Tidak ada DPC yang berstatus BYMHD.");			
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i=0;i < this.dataJU5.rs.rows.length;i++){
				line = this.dataJU5.rs.rows[i];
				if (line.status.toUpperCase() == "BYMHD") {
					tot += parseFloat(line.nilai);
				}
			}
			
			this.e_nilaihut.setText(floatToNilai(tot));
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
								// this.nama_report="server_report_saku3_pbh_rptKbPb";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
		var strSQL = "select distinct a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from ju_m a left join tar_hutang_bayar b on a.no_ju=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where b.no_hutang is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'BYMHD-DPC' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
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
								
				var strSQL = "select keterangan,no_dokumen,tanggal,ref1 "+
							 "from ju_m "+							 
							 "where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){															
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);																	
						this.cb_akun.setText(line.ref1);						
					}
				}								
				
				this.dataJU5 = {rs:{rows:[]}};							
                var strSQL = "select 'BYMHD' as status,no_spb,convert(varchar,tanggal,103) as tgl,keterangan,nilai "+
							 "from spb_m a "+
							 "where progress='1' and no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";							 
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