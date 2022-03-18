window.app_saku2_transaksi_kopeg_kbitt_fSPBpinbuk = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fSPBpinbuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fSPBpinbuk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB Pindah Buku", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data SPB","List SPB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No SPB","Tanggal","Nama","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.cb_bdh = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});							
		this.cb_ver = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Verifikator", multiSelection:false, maxLength:10, tag:2});							
		this.cb_fiat = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Fiatur", multiSelection:false, maxLength:10, tag:2});							
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total SPB", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
	
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,315], childPage:["Peruntukan","Data Pinbuk"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"Nama", maxLength:50,tag:9});								
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Alamat", maxLength:150,tag:9});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Uraian", maxLength:150,tag:9});								
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0, 
				colTitle:["ID Rek","Deskripsi","No Rek","Nama Rekening","Bank","Cabang","Kd Akun","Nilai"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,60,180,100,150,150,150,60]],					
				columnReadOnly:[true,[1,2,3,4,5,6],[0,7]],
				buttonStyle:[[0],[bsEllips]], 
				colFormat:[[7],[cfNilai]],checkItem:true,
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				autoAppend:true,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('ITBDH','ITVER','ITFIAT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "ITBDH") this.cb_bdh.setText(line.flag);
					if (line.kode_spro == "ITVER") this.cb_ver.setText(line.flag);
					if (line.kode_spro == "ITFIAT") this.cb_fiat.setText(line.flag);
				}
			}	
			
			var sql = new server_util_arrayList();
			sql.add("select kode_rek, nama from bank_rek where kode_lokasi='"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fSPBpinbuk.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fSPBpinbuk.implement({	
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
						sql.add("delete from it_spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_spb_rek where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					sql.add("insert into it_spb_m (no_spb,kode_lokasi,nik_user,tgl_input,periode,tanggal,nama,alamat,keterangan,nik_bdh,nik_ver,nik_fiat,nilai,no_kas,form) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_ket.getText()+"','"+this.cb_bdh.getText()+"','"+this.cb_ver.getText()+"','"+this.cb_fiat.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'-','PINBUK')");					

					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							sql.add("insert into it_spb_rek(no_spb,kode_lokasi,form,nu,kode_rek,bank,cabang,no_rek,nama_rek,nilai,param1) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','PINBUK',"+i+",'"+this.sg1.cells(0,i)+"', '"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(7,i))+",'"+this.sg1.cells(6,i)+"')");																	
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
					this.sg1.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total SPB tidak boleh nol atau kurang.");
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
				sql.add("delete from it_spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_spb_rek where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();				
	},		
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
				this.sg2.clear(1); 
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","00000"));						
			this.cb_bdh.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var total = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != "") {
					total += nilaiToFloat(this.sg1.cells(7,i));
				}
			}			
			this.e_total.setText(floatToNilai(total));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (col == 0){								
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined,
						"select kode_rek,nama from bank_rek where kode_lokasi='"+this.app._lokasi+"'",
						"select count(*) from bank_rek where kode_lokasi='"+this.app._lokasi+"'",
						["kode_rek","nama"],"and",["Kode","Nama"],false);				
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){	
		if (col == 7 && this.sg1.cells(7,row) != "") this.sg1.validasi();

		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {						
			if (sender.cells(0,row) != "") {			
				var rek = this.dataRek.get(sender.cells(0,row));
				if (rek) {
					sender.cells(1,row,rek);
					var data = this.dbLib.getDataProvider(
								"select a.*,b.nama as nama_bank from bank_rek a inner join bank b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_rek='"+sender.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.no_rek);
							sender.cells(3,row,line.nama_rek);
							sender.cells(4,row,line.nama_bank);
							sender.cells(5,row,line.cabang);
							sender.cells(6,row,line.kode_akun);
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Rekening "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkSaham");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");				
					sender.cells(2,row,"");				
					sender.cells(3,row,"");				
					sender.cells(4,row,"");				
					sender.cells(5,row,"");	
					sender.cells(6,row,"");				
				}
			}
		}
		sender.onChange.set(this,"doChangeCell1");				
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_kbitt_rptSpbTu";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
						}						
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataRek = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataRek.set(line.kode_rek, line.nama);										
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
			this.sg1.clear(1); this.sg3.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.nama,a.keterangan "+
		             "from it_spb_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas ='-' and form='PINBUK' order by a.no_spb ";
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
			this.sg3.appendData([line.no_spb,line.tgl,line.nama,line.keterangan]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.* from it_spb_m a "+
							 "where a.no_spb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_ket.setText(line.keterangan);
						this.cb_bdh.setText(line.nik_bdh);				
						this.cb_ver.setText(line.nik_ver);				
						this.cb_fiat.setText(line.nik_fiat);									
					}
				}				
				var strSQL = "select b.*, c.nama as nama_bank, a.nilai "+
							 "from it_spb_rek a inner join bank_rek b on a.kode_rek=b.kode_rek and a.kode_lokasi=b.kode_lokasi "+	
							 "				    inner join bank c on b.kode_bank=c.kode_bank and b.kode_lokasi=c.kode_lokasi "+				 					 
							 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_rek,line.nama,line.no_rek,line.nama_rek,line.nama_bank,line.cabang,line.kode_akun,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);											
			}						
		} catch(e) {alert(e);}
	}
});