window.app_saku3_transaksi_fitnes_fKunj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fKunj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fKunj";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kunjungan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Kunjungan","List Kunjungnan","Cari Data"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Kunj","Tanggal","No Register"],
					colWidth:[[2,1,0],[100,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_reg = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"No Register", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_nikkes = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Nikes", readOnly:true});						
		this.e_mcu = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Hasil MCU", readOnly:true});						
		this.e_ke = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Kunj Ke", readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,270], childPage:["Parameter","Trainner"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode","Nama Parameter","Satuan","Pengukuran Awal"],
					colWidth:[[3,2,1,0],[200,100,200,100]],					
					columnReadOnly:[true,[0,1,2],[3]],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["Kode","Nama Trainer"],
					colWidth:[[1,0],[200,80]],					
					columnReadOnly:[true,[1],[0]],
					buttonStyle:[[0],[bsEllips]], 
					checkItem: true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});				
		
		this.e_ket2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,15,450,20],caption:"No Register",tag:9});		
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);			
					
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
			
			this.cb_reg.setSQL("select a.no_reg,b.nama "+
							   "from fi_reg a inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
							   "where getdate() between a.tgl_awal and a.tgl_akhir and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_reg","b.nama"],false,["No Reg","Nama"],"and","Data Register",true);			
							
			var strSQL = "select kode_param,nama,satuan,'-' as hasil from fi_param "+
						 "where kode_lokasi = '"+this.app._lokasi+"'  order by kode_param";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil]);
				}
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_latih,nama from fi_pelatih where kode_lokasi = '"+this.app._lokasi+"'");									
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fKunj.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fKunj.implement({	
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
						sql.add("delete from fi_kunj_m where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fi_kunj_d where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from fi_kunj_latih where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}					
					
					sql.add("insert into fi_kunj_m(no_kunj,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_reg,kode_agg,ke,nilai_spa,nilai_sauna,nilai_fb,no_final,catatan) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_reg.getText()+"','"+this.kodeAgg+"',"+parseNilai(this.e_ke.getText())+",0,0,0,'-','-')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into fi_kunj_d(no_kunj,kode_lokasi,kode_param,hasil_bef,hasil_aft) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','-')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into fi_kunj_latih(no_kunj,kode_lokasi,kode_latih) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"')");
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 						
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);				
					var strSQL = "select kode_param,nama,satuan,'-' as hasil from fi_param "+
								 "where kode_lokasi = '"+this.app._lokasi+"'  order by kode_param";					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil]);
						}
					} else this.sg1.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from fi_kunj_m where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from fi_kunj_d where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from fi_kunj_latih where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_reg && this.cb_reg.getText()!="") {					   
			var data = this.dbLib.getDataProvider("select * from fi_reg a inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.no_reg='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];													
				this.e_nikkes.setText(line.nikkes);
				this.e_mcu.setText(line.kode_mcu);				
				this.kodeAgg = line.kode_agg;
			} 			
			if (this.stsSimpan ==1) {
				var data = this.dbLib.getDataProvider("select count(*) + 1 as ke from fi_kunj_m where no_reg='"+this.cb_reg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];													
					this.e_ke.setText(floatToNilai(line.ke));
				}			
			}
		}		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1);
				var strSQL = "select kode_param,nama,satuan,'-' as hasil from fi_param "+
							 "where kode_lokasi = '"+this.app._lokasi+"'  order by kode_param";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil]);
					}
				} else this.sg1.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);					
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_kunj_m","no_kunj",this.app._lokasi+"-KJ"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_reg.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) sender.cells(1,row,akun);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Trainner "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell2");		
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Trainner",sender,undefined, 
							"select kode_latih, nama  from fi_pelatih where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_latih) from fi_pelatih where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_latih","nama"],"and",["Kode","Nama"],false);				
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
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_latih, line.nama);										
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
			this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			var strSQL = "select kode_param,nama,satuan,'-' as hasil from fi_param "+
						 "where kode_lokasi = '"+this.app._lokasi+"'  order by kode_param";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil]);
				}
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			
			if (this.stsSimpan == 1) this.doClick();				
		} catch(e) {
			alert(e);
		}
	},
	doCari:function(sender){																									
		var filter = "";
		if (this.e_ket2.getText()!="") filter = " and a.no_reg like '%"+this.e_ket2.getText()+"%' ";		
		var strSQL = "select a.no_kunj,convert(varchar,a.tanggal,103) as tgl,a.no_reg "+
		             "from fi_kunj_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_final = '-' " +filter;		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
		this.pc2.setActivePage(this.pc2.childPage[1]);
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kunj,convert(varchar,a.tanggal,103) as tgl,a.no_reg "+
		             "from fi_kunj_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_final = '-'";		
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
			this.sg3.appendData([line.no_kunj,line.tgl,line.no_reg]); 
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
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * "+
							 "from fi_kunj_m "+							 
							 "where no_kunj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_reg.setText(line.no_reg);						
						this.e_ke.setText(line.ke);						
						this.kodeAgg = line.kode_agg;
					}
				}												
				
				this.sg1.clear();
				var strSQL = "select a.kode_param,a.nama,a.satuan,b.hasil_bef from fi_param a left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_param";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil_bef]);
					}
				} else this.sg1.clear(1);
				
				this.sg2.clear();
				var strSQL = "select a.kode_latih,a.nama from fi_pelatih a inner join fi_kunj_latih b on a.kode_latih=b.kode_latih and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_latih";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_latih,line.nama]);
					}
				} else this.sg2.clear(1);
				
				this.pc1.setActivePage(this.pc1.childPage[0]);					
			}									
		} catch(e) {alert(e);}
	}
});