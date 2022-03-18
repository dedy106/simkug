window.app_saku3_transaksi_kb_fSpbDroping = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kb_fSpbDroping.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kb_fSpbDroping";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB Droping: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Permohonan","List Permohonan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,60,350,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[770,13,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[870,13,100,18]}); 		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bTampil = new button(this.pc2.childPage[0],{bound:[670,17,80,18],caption:"Permintaan",click:[this,"doMinta"]});			
		this.e_totalRek = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Total Rekening", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,348], childPage:["Otorisasi","Atensi Droping","Data Approval"]});
		this.cb_sah = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_fiat = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_bdh = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tak = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:2});						
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:12,tag:0,
		            colTitle:["Status","Kd Lokasi","Nama Lokasi","Kode Rek","Nama","Bank","Cabang","No Rekening","Nilai","Keterangan","No Ref","Tgl Input"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[110,100,250,100,100,150,100,150,70,100,70,80]],					
					columnReadOnly:[true,[0,2,4,5,6,7],[1,3,8,9,10,11]],
					buttonStyle:[[0,1,3],[bsAuto,bsEllips,bsEllips]], 
					colFormat:[[8],[cfNilai]],checkItem: true,
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"No Fiat", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
					
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
															
			this.cb_sah.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_tak.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '016' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			var sql = new server_util_arrayList();			
			sql.add("select kode_lokasi,nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')");									
			this.dbLib.getMultiDataProviderA(sql);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BDH1','FIAT1','FIAT0') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "BDH1") this.cb_bdh.setText(line.flag);					
					if (line.kode_spro == "FIAT1") this.cb_fiat.setText(line.flag);					
					if (line.kode_spro == "FIAT0") this.cb_sah.setText(line.flag);					
				}
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kb_fSpbDroping.extend(window.childForm);
window.app_saku3_transaksi_kb_fSpbDroping.implement({	
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
						sql.add("delete from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from yk_kasdrop_d where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update yk_kasaju_m set progress='1',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokbayar='"+this.app._lokasi+"'");
					}								
					sql.add("insert into spb_m(no_spb,no_ver,no_bukti,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,lok_bayar,no_fiat,no_kas,nilai,modul,progress,kode_ppasal) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','"+this.app._lokasi+"','-','-',"+nilaiToFloat(this.e_totalRek.getText())+",'DROPING','0','"+this.app._kodePP+"')");					
					sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_totalRek.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPB','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
												
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){								
								sql.add("insert into yk_kasdrop_d(no_spb,nu,no_kas,no_dokumen,kode_lokasi,periode,kode_loktuj,kode_rek,keterangan,nilai,progress,akun_tak,no_kasterima) values "+
										"('"+this.e_nb.getText()+"',"+i+",'-','"+this.sg.cells(10,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(9,i)+"','"+parseNilai(this.sg.cells(8,i))+"','0','"+this.cb_tak.getText()+"','-')");								
								sql.add("update yk_kasaju_m set progress='2',no_spb='"+this.e_nb.getText()+"' where no_kasaju='"+this.sg.cells(10,i)+"' and kode_lokbayar='"+this.app._lokasi+"' and kode_lokasi='"+this.sg.cells(1,i)+"'");
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
					this.pc2.setActivePage(this.pc2.childPage[0]);										
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				this.sg.validasi();																
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Atensi Droping.");
							return false;
						}
					}					
				}				
				if (nilaiToFloat(this.e_totalRek.getText()) <= 0) {
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
				sql.add("delete from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from yk_kasdrop_d where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update yk_kasaju_m set progress='1',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokbayar='"+this.app._lokasi+"'");
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
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
	},
	doMinta:function(sender){		
		var strSQL = "select b.kode_lokasi,b.nama as nama_lokasi,c.kode_rek,c.nama as nama_rek,c.kode_bank as bank,c.cabang,c.no_rek,a.nilai,a.keterangan,a.no_kasaju,convert(varchar,a.tgl_input,120) as tglinput "+
		             "from yk_kasaju_m a inner join lokasi b on a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join bank_rek c on a.kode_banktuj=c.kode_rek and a.kode_lokasi=c.kode_lokasi "+
					 "where a.progress = '1' and a.kode_lokbayar='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg.appendData(["INPROG",line.kode_lokasi,line.nama_lokasi,line.kode_rek,line.nama_rek,line.bank,line.cabang,line.no_rek,floatToNilai(line.nilai),line.keterangan,line.no_kasaju,line.tglinput]);
			}
		} else this.sg.clear(1);							
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {								
					this.sg.clear(1); 
					this.sg3.clear(1);
					this.bTampil.show();
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));									
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		try {
			if (col == 0 && this.sg.cells(0,row) != "") this.sg.validasi();		
			if (col == 8 && this.sg.cells(8,row) != "") this.sg.validasi();		
			sender.onChange.set(undefined,undefined);	    
			if (col == 1) {						
				if (this.sg.cells(1,row) != "") {								
					var lokasi = this.dataLokasi.get(sender.cells(1,row));				
					if (lokasi) {
						sender.cells(2,row,lokasi);					
						sender.cells(3,row,"");
						sender.cells(4,row,"");
						sender.cells(5,row,"");
						sender.cells(6,row,"");						
						sender.cells(7,row,"");												
					}
					else {                                    
						if (trim(sender.cells(1,row)) != "") system.alert(this,"Kode Lokasi "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkLokasi");                
						sender.cells(1,row,"");
						sender.cells(2,row,"");
						sender.cells(3,row,"");
						sender.cells(4,row,"");
						sender.cells(5,row,"");
						sender.cells(6,row,"");						
						sender.cells(7,row,"");						
						sender.cells(8,row,"");						
						sender.cells(9,row,"");												
					}				
				}
			}						
			if (col == 3) {
				if (sender.cells(3,row) != "") {												
					var data = this.dbLib.getDataProvider("select nama,kode_bank,cabang,no_rek from bank_rek where kode_rek='"+sender.cells(3,row)+"' and kode_lokasi='"+sender.cells(1,row)+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {
							sender.cells(4,row,line.nama);
							sender.cells(5,row,line.kode_bank);
							sender.cells(6,row,line.cabang);
							sender.cells(7,row,line.no_rek);							
						}
						else {						
							system.alert(this,"Kode Rekening "+sender.cells(3,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRek");                
							sender.cells(4,row,"");
							sender.cells(5,row,"");						
							sender.cells(6,row,"");						
							sender.cells(7,row,"");														
						}
					}
				}
			}
			sender.onChange.set(this,"doChangeCell");		
		}catch(e)
		{
			alert(e);
		}
	},	
	doNilaiChange: function(){		
		try{
			var totRek = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != "" && this.sg.cells(0,i) == "APP"){										
					totRek += nilaiToFloat(this.sg.cells(8,i));					
				}
			}			
			this.e_totalRek.setText(floatToNilai(totRek));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},			
	doEllipsClick: function(sender, col, row){
		try{						
			if (sender == this.sg) {
				if (col == 1){
					this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
						    "select kode_lokasi,nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",
							"select count(kode_lokasi) from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",
							["kode_lokasi","nama"],"and",["Kode","Nama"],false);				
				}								
				if (col == 3){					
					this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
							"select kode_rek, nama  from bank_rek where kode_lokasi = '"+sender.cells(1,row)+"'",
							"select count(kode_rek)  from bank_rek where kode_lokasi = '"+sender.cells(1,row)+"'",
							["kode_rek","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataLokasi = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataLokasi.set(line.kode_lokasi, line.nama);										
								}								
							}							
						}else throw result;
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
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select no_spb,convert(varchar,tanggal,103) as tgl,modul,no_bukti as no_dokumen,keterangan,progress,nilai "+
		             "from spb_m "+					 					 
					 "where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'DROPING' and progress in ('0','K')";		
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
			this.sg3.appendData([line.no_spb,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai)]); 
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
				this.bTampil.hide();				
				this.e_nb.setText(this.sg3.cells(0,row));								
						
				var strSQL = "select a.no_bukti as no_dokumen,a.keterangan,a.tanggal,a.due_date,a.nik_sah,a.nik_fiat,a.nik_bdh,b.kode_akun,isnull(c.no_app,'-') as no_app,isnull(c.catatan,'-') as catatan "+
				             "from spb_m a inner join spb_j b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi "+
							 "               left join app_d c on c.no_app=a.no_fiat and a.kode_lokasi=c.kode_lokasi "+
							 "               left join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' "+
							 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);						
						this.cb_sah.setText(line.nik_sah);
						this.cb_fiat.setText(line.nik_fiat);
						this.cb_bdh.setText(line.nik_bdh);
						this.cb_tak.setText(line.kode_akun);
						
						this.e_noapp.setText(line.no_app);						
						this.e_memo.setText(line.catatan);	
						
					}
				}												
				var data = this.dbLib.getDataProvider("select a.kode_loktuj,b.nama as nama_lokasi,a.kode_rek,c.nama as nama_rek,c.kode_bank,c.cabang,c.no_rek,a.nilai,a.keterangan,isnull(d.no_kasaju,'-') as no_kasaju,isnull(convert(varchar,d.tgl_input,120),'-') as tglinput  "+
				                                      "from yk_kasdrop_d a inner join lokasi b on a.kode_loktuj=b.kode_lokasi "+
													  "                    inner join bank_rek c on a.kode_rek=c.kode_rek and a.kode_loktuj=c.kode_lokasi "+
													  "					   left join yk_kasaju_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokbayar and a.no_dokumen=d.no_kasaju "+
													  "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.sg.appendData(["APP",line.kode_loktuj,line.nama_lokasi,line.kode_rek,line.nama_rek,line.kode_bank,line.cabang,line.no_rek,floatToNilai(line.nilai),line.keterangan,line.no_kasaju,line.tglinput]);
					}
				} else this.sg.clear(1);											
			}									
		} catch(e) {alert(e);}
	}	
});