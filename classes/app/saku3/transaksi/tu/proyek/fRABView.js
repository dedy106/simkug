window.app_saku3_transaksi_tu_proyek_fRABView = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fRABView.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fRABView";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approve Data RAB", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tanggal", underline:true, visible:false});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,10,100,18],selectDate:[this,"doSelectDate"],visible:false});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,470], childPage:["List RAB","Data RAB","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No RAB","Customer","Deskripsi","Nilai","No App"],
					colWidth:[[4,3,2,1,0],[100,100,300,300,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Approve", readOnly:true});				
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,202,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"No RAB", readOnly:true, change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,343], childPage:["Data RAB","PDPT RAB", "Detail RAB","File Dokumen","Cat. App. Proyek"]});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,430,20],caption:"No Kontrak", maxLength:50, tag:1});			
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,430,20],caption:"Deskripsi", maxLength:200, tag:1,readOnly:true});			
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Png. Jawab",tag:1,readOnly:true}); 						
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],readOnly:true}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18],readOnly:true}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:1,readOnly:true}); 						
		this.e_jenissewa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Kategori Proyek", readOnly:true, tag:1});			
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		//this.bHitung = new portalui_button(this.pc1.childPage[0],{bound:[250,15,80,18],caption:"Sync RAB",click:[this,"doHitung"]});		
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_totrab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Total RAB", tag:1, tipeText:ttNilai, text:"0", readOnly:true,   visible:false,change:[this,"doChange"]});						
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"PPh Psl4-2", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		

		this.sgp = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
			colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
			colWidth:[[3,2,1,0],[100,100,100,500]],
			columnReadOnly:[true,[3],[]],
			colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
			pasteEnable:true,afterPaste:[this,"doAfterPastep"], 
			nilaiChange:[this,"doNilaiChangep"],change:[this,"doChangeCellsp"],autoAppend:true,defaultRow:1});
		this.sgnp = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sgp});		

		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					columnReadOnly:[true,[3],[]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPaste"], 
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, 
									pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
		

		this.e_memopr = new saiMemo(this.pc1.childPage[4],{bound:[20,11,450,80],caption:"Cat. App. Proyek",tag:9,readOnly:true});


		this.c_status2 = new saiCB(this.pc2.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Customer",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[520,10,450,80],caption:"Catatan Approve",tag:9,readOnly:true});		

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust2.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from tu_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			
			this.cb_app.setSQL("select a.nik,a.nama from karyawan a "+
							   "where a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.cb_pp.setText(this.app._kodePP);		

			this.e_memopr.setReadOnly(true);		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fRABView.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fRABView.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sg.validasi();
		} catch(e) {alert(e);}
	},
	doAfterPastep: function(sender,totalRow){
		try {
			this.sgp.validasi();
		} catch(e) {alert(e);}
	},
	/*
	doHitung: function(sender){
		try{	
			var subttl = total = bobot = 0;		
			total = nilaiToFloat(this.e_totrab.getText());
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {													
					bobot = nilaiToFloat(this.sg.cells(3,i)) / total;
					
					this.sg.cells(3,i,  Math.round(bobot * nilaiToFloat(this.e_nilaior.getText())) );
					this.sg.cells(1,i,  Math.round(Math.round(bobot * nilaiToFloat(this.e_nilaior.getText())) / nilaiToFloat(this.sg.cells(2,i)) * 100) / 100 );
					
					subttl += nilaiToFloat(this.sg.cells(3,i));
				}
			}
			var sls = nilaiToFloat(this.e_nilaior.getText()) - subttl;
			sls = sls + nilaiToFloat(this.sg.cells(3,i-1));			
			this.sg.cells(3,i-1,sls);		
			
			this.sg.validasi();
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	*/
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
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
			if (this.stsSimpan==1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_proyek_app","no_app",this.app._lokasi+"-AP"+this.e_periode.getText().substr(2,4)+".","0000"));				
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";												
					
					
					sql.add("update tu_rab_m set progress='"+prog+"',no_app='"+this.e_nb.getText()+"' where no_rab ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update tu_proyek_app set no_appseb = '"+this.e_nb.getText()+"' where no_appseb ='-' and no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='APP_RAB' ");

					sql.add("delete from tu_rabapp_m where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_rabapp_d where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into tu_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.cb_kode.getText()+"','APP_RAB','-','"+this.e_memo.getText()+"')");

					sql.add("insert into tu_rabapp_m(no_app,no_rab,keterangan,kode_lokasi,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nik_app,progress,kode_proyek,pp_kelola,periode,no_dok, ppn,pph4) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.kodeCust+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"','"+this.cb_app.getText()+"','"+prog+"','-','"+this.ppkelola+"','"+this.periode+"','"+this.e_dok.getText()+"' ,"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph4.getText())+")");
				
					for (var i=0;i < this.sgp.getRowCount();i++){
						if (this.sgp.rowValid(i)){								
							sql.add("insert into tu_rabapp_d(no_app,no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sgp.cells(0,i)+"',"+nilaiToFloat(this.sgp.cells(1,i))+","+nilaiToFloat(this.sgp.cells(2,i))+","+nilaiToFloat(this.sgp.cells(3,i))+",'PDPT')");
						}
					}

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){								
							sql.add("insert into tu_rabapp_d(no_app,no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'BEBAN')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg3.clear(1);
					this.sg1mp2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doLoad3();																
				break;
			case "simpan" :	
			case "ubah" :	
				if (nilaiToFloat(this.e_nilaior.getText()) != nilaiToFloat(this.e_totrab.getText())) {
					system.alert(this,"Nilai OR tidak valid.","Nilai OR tidak sama dengan Total RAB.");
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
				sql.add("delete from tu_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from tu_rabapp_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from tu_rabapp_d where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update tu_rab_m set progress='0',no_app='-' where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.doLoad3();
	},		
	doChange: function(sender){
		try{						
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {					
				if (this.noAppLama == "-") {	
					setTipeButton(tbSimpan);				
					var strSQL = "select a.*,c.jenis_sewa,'-' as catatan "+
								 "from tu_rab_m a "+
								 "inner join tu_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi  "+
								 "where a.no_rab ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									
				}
				else {
					setTipeButton(tbUbahHapus);
					var strSQL = "select a.*,c.jenis_sewa, isnull(b.catatan,'-') as catatan,x.cat_app_proyek "+
								 "from tu_rabapp_m a "+
								 "inner join tu_rab_m x on a.no_rab=x.no_rab and a.kode_lokasi=x.kode_lokasi "+
								 "inner join tu_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi  "+
								 "left join tu_proyek_app b on a.no_rab=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_appseb='-' "+
								 "where a.no_rab ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.kodeCust = line.kode_cust;							
						this.e_memo.setText(line.catatan);	
						this.e_memopr.setText(line.cat_app_proyek);	

						this.e_nama.setText(line.keterangan);
						this.e_dok.setText(line.no_dok);
						this.cb_pp.setText(line.kode_pp);
						this.ppkelola = line.pp_kelola;
						this.periode = line.periode;
						this.cb_app.setText(line.nik_app);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jenissewa.setText(line.jenis_sewa);
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph4.setText(floatToNilai(line.pph4));
						

						if (this.noAppLama == "-") var data = this.dbLib.getDataProvider("select * from tu_rab_d where jenis='PDPT' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						else var data = this.dbLib.getDataProvider("select * from tu_rabapp_d where jenis='PDPT' and no_app='"+this.noAppLama+"' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgp.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgp.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sgp.clear(1);	

						
						if (this.noAppLama == "-") var data = this.dbLib.getDataProvider("select * from tu_rab_d where jenis='BEBAN' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						else var data = this.dbLib.getDataProvider("select * from tu_rabapp_d where jenis='BEBAN' and no_app='"+this.noAppLama+"' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sg.clear(1);	
						
						this.sg1mp2.clear();
						var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from tu_rab_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_rab = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1mp2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													 
								this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);	

					}					
				}
			}
			/*
			if ((sender == this.e_persenor || sender == this.e_nilai) && this.e_persenor.getText() != "" && this.e_nilai.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
			*/
			
			if (sender == this.e_totrab && this.e_totrab.getText() != "") {								
				this.e_nilaior.setText(this.e_totrab.getText());

				if (this.e_nilai.getText()!= "0") {
					var persenOR = Math.round((nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText())) * 10000) / 100;
					this.e_persenor.setText(floatToNilai(persenOR));					
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},		

	doChangeCells: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sg.cells(1,row) != "" && this.sg.cells(2,row) != "") this.sg.validasi();				
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.cells(1,i) != "" && this.sg.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sg.cells(1,i)) * nilaiToFloat(this.sg.cells(2,i)) * 100) / 100; 
					this.sg.cells(3,i,subttl);
					tot += nilaiToFloat(this.sg.cells(3,i));					
				}
			}						
			this.e_totrab.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	

	doChangeCellsp: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sgp.cells(1,row) != "" && this.sgp.cells(2,row) != "") this.sgp.validasi();				
	},
	doNilaiChangep: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sgp.getRowCount();i++){
				if (this.sgp.cells(1,i) != "" && this.sgp.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sgp.cells(1,i)) * nilaiToFloat(this.sgp.cells(2,i)) * 100) / 100; 
					this.sgp.cells(3,i,subttl);
					tot += nilaiToFloat(this.sgp.cells(3,i));					
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad3:function(sender){		
		this.pc2.setActivePage(this.pc2.childPage[0]);																			
		var strSQL = "select a.no_rab,b.nama,a.keterangan,a.nilai_or,'-' as no_app "+
		             "from tu_rab_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 " inner join karyawan_pp c on a.pp_kelola=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.nik='"+this.app._userLog+"' "+		
					 "where  a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' order by a.no_rab desc";				
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
			this.sg3.appendData([line.no_rab,line.nama,line.keterangan,floatToNilai(line.nilai_or),line.no_app]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				
				this.noAppLama = this.sg3.cells(4,row);			
				this.cb_kode.setText(this.sg3.cells(0,row));		

				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_proyek_app","no_app",this.app._lokasi+"-AP"+this.e_periode.getText().substr(2,4)+".","0000"));				
				this.c_status.setFocus();
			}									
		} catch(e) {alert(e);}
	},
	doCari:function(sender){			
		this.stsSimpan=0;		
		setTipeButton(tbUbahHapus);			
		var filter = "";
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '1' ";
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'R' "; 
		
		var strSQL = "select a.no_rab,b.nama,a.keterangan,a.nilai_or,a.no_app "+
		             "from tu_rabapp_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "                   inner join tu_proyek_app c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi and c.no_appseb='-' "+
					 " inner join karyawan_pp d on a.pp_kelola=d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+		
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and a.kode_cust='"+this.cb_cust2.getText()+"' order by a.no_rab desc";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);	
		this.pc2.setActivePage(this.pc2.childPage[0]);	
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	}
});