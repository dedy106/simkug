window.app_saku3_transaksi_fitnes_fKunjFinal3 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fKunjFinal3.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fKunjFinal3";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Kunjungan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Finalisasi","List Finalisasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Final","Tanggal","No Kunjungan","Peserta","Kode"],
					colWidth:[[4,3,2,1,0],[1,200,100,80,100]],readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_kunj = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_tglakhir = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,11,165,20],caption:"Exp Date (Hari)", readOnly:true});						
		this.e_jmlhari = new saiLabelEdit(this.pc2.childPage[0],{bound:[950,11,30,20],labelWidth:0,caption:"", readOnly:true});						
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,400,20],caption:"Nama", readOnly:true});								
		this.e_ke = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Kunj Ke", readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,340], childPage:["Data Pengukuran","Latihan Otot","Treadmill","Ergo Cycle","Cross Trainner","Senam Aerobik"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama Parameter","Satuan","Pengukuran Awal","Pengukuran Akhir"],
					colWidth:[[4,3,2,1,0],[200,200,100,200,100]],					
					columnReadOnly:[true,[0,1,2,3],[4]],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});						
		
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
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);		
		this.pc1.childPage[4].rearrangeChild(10, 23);		
		this.pc1.childPage[5].rearrangeChild(10, 23);		
					
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
						
			this.cb_kunj.setSQL("select a.kode_agg,a.no_kunj,b.nama from fi_kunj_m a inner join fi_anggota b on a.kode_agg=b.kode_agg where a.no_final = '-' and a.kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj","nama"],false,["ID Peserta","No Kunjungan","Nama"],"and","Data Peserta Kunj",true);			
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fKunjFinal3.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fKunjFinal3.implement({	
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
						sql.add("delete from fi_kunj_final where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kunj_m set no_final='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kunj_d set hasil_aft='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kunj_beban set hasil1=0 where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from fi_kunj_beban_inti where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into fi_kunj_final(no_final,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_kunj,kode_pp) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_kunj.rightLabelCaption+"','"+this.app._kodePP+"')");					
					sql.add("update fi_kunj_m set no_final='"+this.e_nb.getText()+"' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++) {
							if (this.sg1.rowValid(i)){
								sql.add("update fi_kunj_d set hasil_aft='"+this.sg1.cells(4,i)+"' where kode_param='"+this.sg1.cells(0,i)+"' and no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("update fi_kunj_beban set hasil1='"+this.sg2.cells(2,i)+"' "+
										"where kode_beban='"+this.sg2.cells(0,i)+"' and no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}					
					
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.cb_kunj.rightLabelCaption+"','"+this.app._lokasi+"','TM','"+this.e_modeltm.getText()+"',"+parseNilai(this.e_waktutm.getText())+","+parseNilai(this.e_speedtm.getText())+","+parseNilai(this.e_inclinetm.getText())+","+parseNilai(this.e_distancetm.getText())+","+parseNilai(this.e_detaktm.getText())+","+parseNilai(this.e_kaloritm.getText())+")");
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.cb_kunj.rightLabelCaption+"','"+this.app._lokasi+"','EC','"+this.e_modelec.getText()+"',"+parseNilai(this.e_waktuec.getText())+","+parseNilai(this.e_speedec.getText())+","+parseNilai(this.e_levelec.getText())+","+parseNilai(this.e_distanceec.getText())+","+parseNilai(this.e_detakec.getText())+","+parseNilai(this.e_kaloriec.getText())+")");		
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.cb_kunj.rightLabelCaption+"','"+this.app._lokasi+"','CT','"+this.e_modelct.getText()+"',"+parseNilai(this.e_waktuct.getText())+","+parseNilai(this.e_speedct.getText())+","+parseNilai(this.e_levelct.getText())+","+parseNilai(this.e_distancect.getText())+","+parseNilai(this.e_detakct.getText())+","+parseNilai(this.e_kalorict.getText())+")");		
					sql.add("insert into fi_kunj_beban_inti(no_kunj,kode_lokasi,jenis,model,waktu,speed,level,distance,detak,kalori) values "+
							"('"+this.cb_kunj.rightLabelCaption+"','"+this.app._lokasi+"','SN','-',"+parseNilai(this.e_waktusn.getText())+",0,0,0,"+parseNilai(this.e_detaksn.getText())+",0)");		
							
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
					this.stsSimpan = 1;								
					//this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
					this.cb_kunj.setSQL("select a.kode_agg,a.no_kunj,b.nama from fi_kunj_m a inner join fi_anggota b on a.kode_agg=b.kode_agg where a.no_final = '-' and a.kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj","nama"],false,["ID Peserta","No Kunjungan","Nama"],"and","Data Peserta Kunj",true);			
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
				sql.add("delete from fi_kunj_final where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_m set no_final='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_d set hasil_aft='-' where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_beban set hasil1=0 where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update fi_kunj_beban_inti set detak=0,kalori=0 where no_kunj='"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.sg3.clear(1);			
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_kunj && this.cb_kunj.getText()!="" && this.stsSimpan ==1) {					   
			var data = this.dbLib.getDataProvider("select a.ke,b.nama,convert(varchar,c.tgl_akhir,103) as due_date,datediff(day,'"+this.dp_d1.getDateString()+"',c.tgl_akhir) as jmlhari "+
			                                      "from fi_kunj_m a "+
			                                      "inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
												  "inner join fi_reg c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi "+
			                                      "where a.no_kunj = '"+this.cb_kunj.rightLabelCaption+"' and a.kode_lokasi ='"+this.app._lokasi+"'",true);												
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];													
				if (parseFloat(line.jmlhari) >= 0) this.e_jmlhari.setText(line.jmlhari);			
				else this.e_jmlhari.setText("0");			
				this.e_ke.setText(line.ke);			
				this.e_tglakhir.setText(line.due_date);		
				this.e_nama.setText(line.nama);							
			} 									
			
			this.sg1.clear();
			var strSQL = "select a.kode_param,a.nama,a.satuan,b.hasil_bef,'-' as hasil_aft from fi_param a left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by a.kode_param";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil_bef,line.hasil_aft]);
				}
			} else this.sg1.clear(1);
			
			this.sg2.clear();
			var strSQL = "select a.kode_beban,a.nama "+
						 "from fi_beban a left join fi_kunj_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_beban";					
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_beban,line.nama,"0"]);
				}
			} else this.sg2.clear(1);
			
			var strSQL = "select * from fi_kunj_beban_inti "+
						 "where no_kunj = '"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi = '"+this.app._lokasi+"' ";					
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
				
			this.pc1.setActivePage(this.pc1.childPage[0]);					
		}				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1);
				//this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
				this.cb_kunj.setSQL("select a.kode_agg,a.no_kunj,b.nama from fi_kunj_m a inner join fi_anggota b on a.kode_agg=b.kode_agg where a.no_final = '-' and a.kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj","nama"],false,["ID Peserta","No Kunjungan","Nama"],"and","Data Peserta Kunj",true);			
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_kunj_final","no_final",this.app._lokasi+"-FL"+this.e_periode.getText().substr(2,4)+".","0000"));						
			//this.cb_kunj.setFocus();
			setTipeButton(tbSimpan);			
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
			this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.stsSimpan = 1;
			//this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '-' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
			this.cb_kunj.setSQL("select a.kode_agg,a.no_kunj,b.nama from fi_kunj_m a inner join fi_anggota b on a.kode_agg=b.kode_agg where a.no_final = '-' and a.kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj","nama"],false,["ID Peserta","No Kunjungan","Nama"],"and","Data Peserta Kunj",true);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_final,a.no_kunj,convert(varchar,c.tanggal,103) as tgl,b.kode_agg+' - '+b.nama as agg,b.kode_agg  "+
		             "from fi_kunj_final a inner join fi_kunj_m c on a.no_kunj=c.no_kunj and a.kode_lokasi=c.kode_lokasi "+
					 "inner join fi_anggota b on c.kode_agg=b.kode_agg and c.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.tanggal= '"+this.dp_d1.getDateString()+"' and a.kode_pp='"+this.app._kodePP+"'  and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by b.kode_agg";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_final,line.tgl,line.no_kunj,line.agg,line.kode_agg]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);	
		this.page = page-1;						
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
				if (this.page == undefined) this.page = 0;
				row = row + (this.page * 20);
				this.e_nb.setText(this.sg3.cells(0,row));	
				
				//this.cb_kunj.setSQL("select kode_agg,no_kunj from fi_kunj_m where no_final = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj"],false,["ID Peserta","No Kunjungan"],"and","Data Peserta Kunj",true);			
				this.cb_kunj.setSQL("select a.kode_agg,a.no_kunj,b.nama from fi_kunj_m a inner join fi_anggota b on a.kode_agg=b.kode_agg where a.no_final = '"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","no_kunj","nama"],false,["ID Peserta","No Kunjungan","Nama"],"and","Data Peserta Kunj",true);						
				this.cb_kunj.setText(this.sg3.cells(4,row),this.sg3.cells(2,row));								
				
				var data = this.dbLib.getDataProvider("select a.ke,b.nama,convert(varchar,c.tgl_akhir,103) as due_date,datediff(day,'"+this.dp_d1.getDateString()+"',c.tgl_akhir) as jmlhari "+
													  "from fi_kunj_m a "+
													  "inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
													  "inner join fi_reg c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi "+
													  "where a.no_kunj = '"+this.cb_kunj.rightLabelCaption+"' and a.kode_lokasi ='"+this.app._lokasi+"'",true);												
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];													
					this.e_jmlhari.setText(line.jmlhari);			
					this.e_ke.setText(line.ke);			
					this.e_tglakhir.setText(line.due_date);		
					this.e_nama.setText(line.nama);							
				}
			
				this.sg1.clear();
				var strSQL = "select a.kode_param,a.nama,a.satuan,b.hasil_bef,b.hasil_aft from fi_param a left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_param";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil_bef,line.hasil_aft]);
					}
				} else this.sg1.clear(1);
				
				this.sg2.clear();
				var strSQL = "select a.kode_beban,a.nama,a.keterangan,b.hasil1 "+
				             "from fi_beban a left join fi_kunj_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj='"+this.cb_kunj.rightLabelCaption+"' and b.kode_lokasi = '"+this.app._lokasi+"'  order by a.kode_beban";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_beban,line.nama,line.hasil1]);
					}
				} else this.sg2.clear(1);
				
				var strSQL = "select * from fi_kunj_beban_inti "+
							 "where no_kunj = '"+this.cb_kunj.rightLabelCaption+"' and kode_lokasi = '"+this.app._lokasi+"' ";					
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
				
				this.pc1.setActivePage(this.pc1.childPage[0]);					
			}									
		} catch(e) {alert(e);}
	}
});