window.app_saku3_transaksi_tu_rra_fHoldTUtw = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_rra_fHoldTUtw.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_rra_fHoldTUtw";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hold Bugdet", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_gridLib");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Hold"]});
		//gak iso koreksi krn budget langsung aktif.... RElease saja kalo mau batal		
		// this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,		            
		// 			colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Jenis"],
		// 			colWidth:[[4,3,2,1,0],[200,300,120,80,100]],
		// 			readOnly:true,
		// 			dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		// this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.e_persen = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Persen Hold", maxLength:10, tipeText:ttNilai, tag:2, text:"100"});		
		this.bHitung = new button(this.pc2.childPage[0],{bound:[250,18,80,18],caption:"Hold Bugdet",click:[this,"doHold"]});					
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total Hold", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,995,282], childPage:["Data Hold","Cek Anggaran"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","Bulan","Saldo","Nilai Hold"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,150,80,150,80,150,80]],					
					columnReadOnly:[true,[1,3,5,7],[0,2,4,6,8]],
					colFormat:[[7,8],[cfNilai,cfNilai]],
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 
					picklist:[[6],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]], 	
					pasteEnable:true,
					afterPaste:[this,"doAfterPaste"], 				
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.sgG = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir","Bulan"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgG});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGarTW"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
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
			this.gridLib = new util_gridLib();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);

			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;				
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where status_gar='1' and block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);							
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);

			// this.doLoad3();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_rra_fHoldTUtw.extend(window.childForm);
window.app_saku3_transaksi_tu_rra_fHoldTUtw.implement({	
	doHold: function() {
		try {
			var nilaiHold = 0;
			if (this.sg.getRowValidCount() > 0){
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){								
						nilaiHold = Math.round(nilaiToFloat(this.sg.cells(7,i)) * nilaiToFloat(this.e_persen.getText()) / 100);
						this.sg.cells(8,i,nilaiHold);
					}
				}			
			}
			this.sg.validasi();
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
			var k=0;
			this.doHitungGarTW();
			for (var i=0;i < this.sgG.getRowCount();i++){
				if (nilaiToFloat(this.sgG.cells(7,i))>0 && nilaiToFloat(this.sgG.cells(6,i)) < nilaiToFloat(this.sgG.cells(7,i))) {
					var k =i+1;
					system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
					return false;						
				}
			}
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					// if (this.stsSimpan == 0) {
					// 	sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					// 	sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					// } 					

					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.cb_app.getText()+"','HOLD')");					
					
					var periode = "";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								periode = this.e_periode.getText().substr(0,4)+ this.sg.cells(6,i);
								sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRA')");
								sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'D','-','"+this.app._userLog+"',getdate(),'HOLD')");

								sql.add("insert into anggaran_hold(no_agg,no_hold,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'D','-','"+this.app._userLog+"',getdate(),'HOLD')");

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
					this.sg.clear(1); 
					// this.sg3.clear(1); 					
					this.sgG.clear(1); 
					setTipeButton(tbAllFalse);								
					// this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}															
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Hold tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			// case "hapus" :	
			// 	this.preView = "0";
			// 	uses("server_util_arrayList");
			// 	var sql = new server_util_arrayList();					
			// 	sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			// 	sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			// 	setTipeButton(tbAllFalse);					
			// 	this.dbLib.execArraySQL(sql);
			// 	break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
				
			if (this.stsSimpan == 1) {
				this.doClick();
				// this.doLoad3();		
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){																		
		try{			
				
		}
		catch(e) {
			alert(e);
		}
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1);								
			this.sgG.clear(1);						
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-HLD"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},		
	doNilaiChange: function(){
		try{
			var totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(8,i));
				}
			}						
			this.e_total.setText(floatToNilai(totC));
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
								// this.nama_report = "server_report_saku3_rra_rptAggDis";
								// this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pdrk='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
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
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();							
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg.clear(1); 
			// this.sg3.clear(1); 
			this.sgG.clear(1); 
			setTipeButton(tbAllFalse);								
			// this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	},
	// doLoad3: function(sender){																						
	// 	var strSQL = "select no_agg,convert(varchar,tanggal,103) as tgl,no_dokumen,keterangan,jenis "+
	// 	             "from anggaran_m   "+					 					 
	// 				 "where jenis = 'HOLD' and kode_lokasi='"+this.app._lokasi+"'  order by no_agg";		
	// 	var data = this.dbLib.getDataProvider(strSQL,true);
	// 	if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 		this.dataJU3 = data;
	// 		this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
	// 		this.sgn3.rearrange();
	// 		this.doTampilData3(1);
	// 	} else this.sg3.clear(1);					
	// },
	// doTampilData3: function(page) {
	// 	this.sg3.clear();
	// 	var line;
	// 	this.page = page;
	// 	var start = (page - 1) * 20;
	// 	var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
	// 	for (var i=start;i<finish;i++){
	// 		line = this.dataJU3.rs.rows[i];													
	// 		this.sg3.appendData([line.no_agg,line.tgl,line.no_dokumen,line.keterangan,line.jenis]); 
	// 	}
	// 	this.sg3.setNoUrut(start);
	// },
	// doPager3: function(sender, page) {
	// 	this.doTampilData3(page);
	// },	
	// doDoubleClick3: function(sender, col , row) {
	// 	try{
	// 		if (this.sg3.cells(0,row) != "") {
	// 			this.pc2.setActivePage(this.pc2.childPage[0]);																		
	// 			this.pc1.setActivePage(this.pc1.childPage[0]);																		
	// 			setTipeButton(tbUbahHapus);
	// 			this.stsSimpan = 0;				
	// 			this.e_nb.setText(this.sg3.cells(0,row));																				
							
	// 			var strSQL = "select * from anggaran_m "+
	// 						 "where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
	// 			var data = this.dbLib.getDataProvider(strSQL,true);
	// 			if (typeof data == "object"){
	// 				var line = data.rs.rows[0];							
	// 				if (line != undefined){
	// 					this.cb_app.setText(line.nik_setuju);					
	// 					this.dp_d1.setText(line.tanggal);	
	// 					this.e_dok.setText(line.no_dokumen);					
	// 					this.e_ket.setText(line.keterangan);							
	// 				}
	// 			}

	// 			var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
	// 						 "from anggaran_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
	// 						 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
	// 						 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
	// 						 "where a.no_agg='"+this.e_nb.getText()+"' and a.dc ='C' ";					
	// 			var data = this.dbLib.getDataProvider(strSQL,true);
	// 			if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 				var line;
	// 				this.sg.clear(1);
	// 				for (var i in data.rs.rows){
	// 					line = data.rs.rows[i];							
	// 					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.bulan,"0",floatToNilai(line.nilai)]);
	// 				}
	// 			} else this.sg.clear(1);								
											
	// 		}									
	// 	} catch(e) {alert(e);}
	// },	
	doHitungGarTW: function(){
		this.sgG.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				nilai = nilaiToFloat(this.sg.cells(8,i));				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sgG.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sgG.cells(0,j) && this.sg.cells(2,i) == this.sgG.cells(2,j) && this.sg.cells(4,i) == this.sgG.cells(4,j) && this.sg.cells(6,i) == this.sgG.cells(9,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sgG.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(4,i),this.sg.cells(5,i),"0",floatToNilai(nilai),"0",this.sg.cells(6,i)]);
				} 
				else { 
					total = nilaiToFloat(this.sgG.cells(7,idx));
					total = total + nilai;
					this.sgG.setCell(7,idx,total);
				}
			}
		}
		
		var sls = 0;			
		for (var i=0;i < this.sgG.getRowCount();i++){					
			if (this.sgG.rowValid(i)){
				
				var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sgG.cells(2,i)+"','"+this.app._lokasi+"','"+this.sgG.cells(0,i)+"','"+this.sgG.cells(4,i)+"','"+this.e_periode.getText().substr(0,4)+this.sgG.cells(9,i)+"','"+this.e_nb.getText()+"') as gar ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.sgG.cells(6,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sgG.cells(7,i));
					this.sgG.cells(8,i,floatToNilai(sls));
				}
			}
		}
	},	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();		
			
			for (var i=0;i < this.sg.getRowCount();i++){				
				this.doChangeCell(this.sg,0,i);
				this.doChangeCell(this.sg,2,i);
				this.doChangeCell(this.sg,4,i);
				this.doChangeCell(this.sg,6,i);
				this.doChangeCell(this.sg,8,i);
			}
			
						
		} catch(e) {alert(e);}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 6 || col == 8) && (this.sg.cells(8,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var pp = this.dataPP.get(sender.cells(2,row));
				if (pp) sender.cells(3,row,pp);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}
		if (col == 4) {
			if (this.sg.cells(4,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and b.kode_drk = '"+this.sg.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(5,row,line.nama);
					else {
						if (!isAda) this.sg.cells(4,row,"-");
						else {
							this.sg.cells(4,row,"");
							this.sg.cells(5,row,"");
						}
					}
				}
			}
		}
		if (col == 0 || col == 2 || col == 4 || col == 6) {
			if (sender.cells(0,row) != "" && sender.cells(2,row) != "" && sender.cells(4,row) != "" && sender.cells(6,row) != "") {
				var totSeb = 0;
				for (var j=0; j < this.sg.getRowCount();j++){
					if (j < row && sender.cells(0,row) == this.sg.cells(0,j) && sender.cells(2,row) == this.sg.cells(2,j) && sender.cells(4,row) == this.sg.cells(4,j) && sender.cells(6,row) == this.sg.cells(6,j)) {
						totSeb += nilaiToFloat(this.sg.cells(8,j));
					}
				}												
				var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg.cells(2,row)+"','"+this.app._lokasi+"','"+this.sg.cells(0,row)+"','"+this.sg.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(6,row)+"','"+this.e_nb.getText()+"') as gar ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					sls = sls - totSeb;
					this.sg.cells(7,row,floatToNilai(sls));				
				}						
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mata Anggaran",sender,undefined, 
												  "select kode_akun,nama    from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where  kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where  kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
						
				}
				if (col == 4){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}	
});
