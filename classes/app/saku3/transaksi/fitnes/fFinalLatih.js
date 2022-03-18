window.app_saku3_transaksi_fitnes_fFinalLatih = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fFinalLatih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fFinalLatih";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Latihan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Finalisasi"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,400,20],caption:"Nama", readOnly:true});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,340], childPage:["Daftar Kunjungan","Latihan Otot","Treadmill","Ergo Cycle","Cross Trainner","Senam Aerobik","Evaluasi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:0,
		            colTitle:["No Kunj","Periode","Tanggal","Jam","No Final"],
					colWidth:[[4,3,2,1,0],[200,100,100,80,200]],					
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});						
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["Kode","Gerakan","Hasil"],
					colWidth:[[2,1,0],[200,300,80]],					
					columnReadOnly:[true,[0,1],[2]],									
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});				
		
		this.e_modeltm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Mode", maxLength:50});				
		this.e_waktutm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Time (min)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_speedtm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Speed (km/h)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_inclinetm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Incline (deg)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_distancetm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Distance (mtr)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_detaktm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Heart Rate(mnt)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_kaloritm = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Kalori Dibakar", maxLength:10, tipeText:ttNilai, text:"0"});				
		
		this.e_modelec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"Mode", maxLength:50});				
		this.e_waktuec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Time (min)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_speedec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,200,20],caption:"Speed (km/h)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_levelec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,200,20],caption:"Level", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_distanceec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,200,20],caption:"Distance (mtr)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_detakec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,200,20],caption:"Heart Rate(mnt)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_kaloriec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,200,20],caption:"Kalori Dibakar", maxLength:10, tipeText:ttNilai, text:"0"});				
		
		this.e_modelct = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"Mode", maxLength:50});				
		this.e_waktuct = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,12,200,20],caption:"Time (min)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_speedct = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,13,200,20],caption:"Speed (km/h)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_levelct = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,14,200,20],caption:"Level", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_distancect = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,200,20],caption:"Distance (mtr)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_detakct = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,200,20],caption:"Heart Rate(mnt)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_kalorict = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,200,20],caption:"Kalori Dibakar", maxLength:10, tipeText:ttNilai, text:"0"});				
		
		this.e_waktusn = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,12,200,20],caption:"Time (min)", maxLength:10, tipeText:ttNilai, text:"0"});				
		this.e_detaksn = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,16,200,20],caption:"Heart Rate(mnt)", maxLength:10, tipeText:ttNilai, text:"0"});				
		
		
		this.sg4 = new saiGrid(this.pc1.childPage[6],{bound:[1,5,530,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["Kode","Parameter","Hasil"],
					colWidth:[[2,1,0],[100,300,80]],					
					columnReadOnly:[true,[0,1],[2]],	
					colFormat:[[2],[cfNilai]],								
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[6],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});				
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);		
		this.pc1.childPage[4].rearrangeChild(10, 23);		
		this.pc1.childPage[5].rearrangeChild(10, 23);		
		
		this.e_memo = new saiMemo(this.pc1.childPage[6],{bound:[550,1,430,300],caption:"Catatan",tag:9,readOnly:true});
								
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
						
			this.cb_agg.setSQL("select kode_agg,nama from fi_anggota where kode_pp='"+this.app._kodePP+"' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","nama"],false,["ID Peserta","Nama"],"and","Data Peserta",true);			
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fFinalLatih.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fFinalLatih.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var data = this.dbLib.getDataProvider("select no_final,tanggal from fi_kunj_m where no_kunj = '"+this.noKunj+"' and kode_lokasi ='"+this.app._lokasi+"'",true);												
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];													
						this.e_nb.setText(line.no_final);	
						this.dp_d1.setText(line.tanggal);									
					} 		
					if (this.e_nb.getText() == "-") {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_kunj_final","no_final",this.app._lokasi+"-FL"+this.e_periode.getText().substr(2,4)+".","0000"));										
						sql.add("insert into fi_kunj_final(no_final,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_kunj,kode_pp) values "+
					        	"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.noKunj+"','"+this.app._kodePP+"')");										
					}
					else {
						sql.add("delete from fi_kunj_beban_inti where no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					sql.add("update fi_kunj_m set no_final='"+this.e_nb.getText()+"',catat_eval='"+this.e_memo.getText()+"' where no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
							
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("update fi_kunj_beban set hasil1='"+this.sg2.cells(2,i)+"' "+
										"where kode_beban='"+this.sg2.cells(0,i)+"' and no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}					
					
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.noKunj+"','"+this.app._lokasi+"','TM','"+this.e_modeltm.getText()+"',"+parseNilai(this.e_waktutm.getText())+","+parseNilai(this.e_speedtm.getText())+","+parseNilai(this.e_inclinetm.getText())+","+parseNilai(this.e_distancetm.getText())+","+parseNilai(this.e_detaktm.getText())+","+parseNilai(this.e_kaloritm.getText())+")");
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.noKunj+"','"+this.app._lokasi+"','EC','"+this.e_modelec.getText()+"',"+parseNilai(this.e_waktuec.getText())+","+parseNilai(this.e_speedec.getText())+","+parseNilai(this.e_levelec.getText())+","+parseNilai(this.e_distanceec.getText())+","+parseNilai(this.e_detakec.getText())+","+parseNilai(this.e_kaloriec.getText())+")");		
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.noKunj+"','"+this.app._lokasi+"','CT','"+this.e_modelct.getText()+"',"+parseNilai(this.e_waktuct.getText())+","+parseNilai(this.e_speedct.getText())+","+parseNilai(this.e_levelct.getText())+","+parseNilai(this.e_distancect.getText())+","+parseNilai(this.e_detakct.getText())+","+parseNilai(this.e_kalorict.getText())+")");		
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.noKunj+"','"+this.app._lokasi+"','SN','-',"+parseNilai(this.e_waktusn.getText())+",0,0,0,"+parseNilai(this.e_detaksn.getText())+",0)");		
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("update fi_eval_d set nilai='"+this.sg4.cells(2,i)+"' "+
										"where kode_eval='"+this.sg4.cells(0,i)+"' and no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg2.clear(1); this.sg.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbSimpan);						
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
	},
	doChange:function(sender){
		if (sender == this.cb_agg && this.cb_agg.getText()!="") {					   
			var data = this.dbLib.getDataProvider("select nama from fi_anggota "+
			                                      "where kode_agg = '"+this.cb_agg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'",true);												
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];													
				this.e_nama.setText(line.nama);										
			} 									
			
			this.sg.clear();
			var strSQL = "select no_kunj,no_final,convert(varchar,tanggal,103) as tgl,tanggal,periode,jam from fi_kunj_m where kode_agg='"+this.cb_agg.getText()+"' and kode_pp='"+this.app._kodePP+"' and periode='"+this.e_periode.getText()+"' order by tanggal desc";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_kunj,line.periode,line.tgl,line.jam,line.no_final]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);					
		}	
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (sender.cells(0,row) != "") {
				this.noKunj = sender.cells(0,row);
				this.dp_d1.setText(sender.cells(2,row));
				this.pc1.setActivePage(this.pc1.childPage[1]);
				
				this.sg2.clear();
				var strSQL = "select a.kode_beban,a.nama,a.keterangan,b.hasil1 "+
				             "from fi_beban a left join fi_kunj_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj='"+this.noKunj+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_beban";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_beban,line.nama,line.hasil1]);
					}
				} else this.sg2.clear(1);
				
				var strSQL = "select * from fi_kunj_beban_inti "+
							 "where no_kunj = '"+this.noKunj+"' and kode_lokasi = '"+this.app._lokasi+"' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){					
					var line;										
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line.jenis == "TM") {
							this.e_modeltm.setText(line.model);
							this.e_waktutm.setText(floatToNilai(line.waktu));
							this.e_speedtm.setText(floatToNilai(line.speed));
							this.e_inclinetm.setText(floatToNilai(line.level));
							this.e_distancetm.setText(floatToNilai(line.distance));
							this.e_detaktm.setText(floatToNilai(line.detak));
							this.e_kaloritm.setText(floatToNilai(line.kalori));
						}
						if (line.jenis == "EC") {
							this.e_modelec.setText(line.model);
							this.e_waktuec.setText(floatToNilai(line.waktu));
							this.e_speedec.setText(floatToNilai(line.speed));
							this.e_levelec.setText(floatToNilai(line.level));
							this.e_distanceec.setText(floatToNilai(line.distance));
							this.e_detakec.setText(floatToNilai(line.detak));
							this.e_kaloriec.setText(floatToNilai(line.kalori));
						}
						if (line.jenis == "CT") {
							this.e_modelct.setText(line.model);
							this.e_waktuct.setText(floatToNilai(line.waktu));
							this.e_speedct.setText(floatToNilai(line.speed));
							this.e_levelct.setText(floatToNilai(line.level));
							this.e_distancect.setText(floatToNilai(line.distance));
							this.e_detakct.setText(floatToNilai(line.detak));
							this.e_kalorict.setText(floatToNilai(line.kalori));
						}
						if (line.jenis == "SN") {
							this.e_waktusn.setText(floatToNilai(line.waktu));							
							this.e_detaksn.setText(floatToNilai(line.detak));							
						}
					}
				}	
				
				this.sg4.clear();
				var strSQL = "select a.kode_eval,a.nama,isnull(b.nilai,0) as nilai "+
				             "from fi_param_eval a left join fi_eval_d b on a.kode_eval=b.kode_eval "+
							 "where b.no_kunj='"+this.noKunj+"' order by a.kode_eval";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_eval,line.nama,line.nilai]);
					}
				} else this.sg4.clear(1);
				
				var data = this.dbLib.getDataProvider("select catat_eval from fi_kunj_m "+
													  "where no_kunj = '"+this.noKunj+"' and kode_lokasi ='"+this.app._lokasi+"'",true);												
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];													
					this.e_memo.setText(line.catat_eval);										
				}
			
				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg2.clear(1); this.sg.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	}
});