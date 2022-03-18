window.app_saku3_transaksi_produk_fJualBaru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fJualBaru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fJualBaru";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Transaksi","List Penjualan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Net Total"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_periode = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.e_tgl = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Tanggal",readOnly:true,tag:2});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[520,11,200,20],caption:"No Faktur",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[820,11,20,20],hint:"Generate",visible:false,image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_brg = new saiCBBL(this.pc2.childPage[0],{bound:[20,34,220,20], multiSelection:false,caption:"ID",tag:3,change:[this,"doChange"], keyDown:[this,"editKeyDown"]}); 				

		this.p1 = new panel(this.pc2.childPage[0],{bound:[5,30,720,380],caption:"Detail Penjualan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
		            colTitle:["ID","Barang","Harga","%Disk","N.Disk","Qty","Subtotal"],					
					colWidth:[[6,5,4,3,2,1,0],[100,50,50,50,80,250,100]],					
					columnReadOnly:[true,[0,1,2,3,4,6]],
					colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[730,30,265,360], childPage:["  CASH  ","  NONCASH "]});
		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,220,40],caption:"Total", tipeText:ttNilai,text:"0", readOnly:true, change:[this,"doChange"]});
						   this.e_total.label.style.fontSize = 16;
						   this.e_total.input.style.fontSize = 16;	
						   this.e_total.input.style.height = 33;
						   this.e_total.label.style.height = 32;
		
		this.e_pot = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,220,40],caption:"Potongan", tag:2, tipeText:ttNilai,text:"0", readOnly:true});
						   this.e_pot.label.style.fontSize = 16;
						   this.e_pot.input.style.fontSize = 16;	
						   this.e_pot.input.style.height = 33;
						   this.e_pot.label.style.height = 32;
		

		this.e_totba = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,220,40],caption:"Net Faktur", tag:2, tipeText:ttNilai,text:"0", readOnly:true});
						   this.e_totba.label.style.fontSize = 16;
						   this.e_totba.input.style.fontSize = 16;	
						   this.e_totba.input.style.height = 33;
						   this.e_totba.label.style.height = 32;		

		this.e_bayar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,220,40],caption:"Nilai Bayar", tag:2, tipeText:ttNilai,text:"0", change:[this,"doChange"]});
						   this.e_bayar.label.style.fontSize = 16;
						   this.e_bayar.input.style.fontSize = 16;	
						   this.e_bayar.input.style.height = 33;
						   this.e_bayar.label.style.height = 32;							   
		
		this.e_sumb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,220,40],caption:"Sumbangan", tag:2, tipeText:ttNilai,text:"0",change:[this,"doChange"]});
						   this.e_sumb.label.style.fontSize = 16;
						   this.e_sumb.input.style.fontSize = 16;	
						   this.e_sumb.input.style.height = 33;
						   this.e_sumb.label.style.height = 32;							   

		this.e_sisa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,220,40],caption:"Sisa Bayar", tag:2, tipeText:ttNilai,text:"0", readOnly:true, exit:[this,"doExit"]});
						   this.e_sisa.label.style.fontSize = 16;
						   this.e_sisa.input.style.fontSize = 16;	
						   this.e_sisa.input.style.height = 33;
						   this.e_sisa.label.style.height = 32;							   
				
		
		this.cb_jenis = new saiCBBL(this.pc1.childPage[1],{bound:[20,21,240,20],caption:"Bank",tag:9,multiSelection:false}); 

		this.e_idbank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,220,40],caption:"ID Bank", tag:9});
						//   this.e_idbank.label.style.fontSize = 16;
						//   this.e_idbank.input.style.fontSize = 16;	
						//   this.e_idbank.input.style.height = 33;
						//   this.e_idbank.label.style.height = 32;

		this.e_nama = new saiEdit(this.pc2.childPage[0],{bound:[240,13,400,20],caption:"",tag:2,readOnly:true,labelWidth:0, visible:false});
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[650,13,100,20],labelWidth:50,caption:"Quantity",tag:2,change:[this,"doEnter"],tipeText:ttNilai,text:"",readOnly:true, visible:false});


		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(20, 40);
		this.pc1.childPage[1].rearrangeChild(20, 30);		

		this.bSatu = new button(this.pc1.childPage[0],{bound:[20,320,50,34],caption:"10K",click:[this,"doBayar"]});
		this.bDua = new button(this.pc1.childPage[0],{bound:[80,320,50,34],caption:"20K",click:[this,"doBayar"]});
		this.bLima = new button(this.pc1.childPage[0],{bound:[140,320,50,34],caption:"50K",click:[this,"doBayar"]});
		this.bRatus = new button(this.pc1.childPage[0],{bound:[200,320,50,34],caption:"100K",click:[this,"doBayar"]});
		this.bOk = new button(this.pc1.childPage[1],{bound:[120,90,50,34],caption:"OKE",click:[this,"doClick2"]});

		this.bSatu.captionFrame.style.fontSize = 20;
		this.bDua.captionFrame.style.fontSize = 20;
		this.bLima.captionFrame.style.fontSize = 20;
		this.bRatus.captionFrame.style.fontSize = 20;
		this.bOk.captionFrame.style.fontSize = 20;


		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			

		
			var strSQL = "select convert(varchar(10), GETDATE(),120) as tanggal, convert(varchar(6), GETDATE(),112) as periode ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){
					this.e_tgl.setText(line3.tanggal);																	
					this.e_periode.setText(line3.periode);	
				}
				this.doClick();
			}

			this.cb_brg.setSQL("select kode_barang, nama from brg_barang where kode_lokasi = '"+this.app._lokasi+"' ",["kode_barang","nama"],false,["Kode Barang","nama"],"and","Data Barang",true);			
			this.cb_jenis.setSQL("select kode_jenis, nama from brg_jbayar_jual where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_jenis","nama"],false,["Kode Jenis","nama"],"and","Data Jenis Bayar",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('JUALKAS','JUALDIS','JUALSUM','JUALPDPT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "JUALKAS") this.akunKas = line.flag;
					if (line.kode_spro == "JUALSUM") this.akunSum = line.flag;
					if (line.kode_spro == "JUALDIS") this.akunPot = line.flag;	
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fJualBaru.extend(window.portalui_childForm);
window.app_saku3_transaksi_produk_fJualBaru.implement({
	editKeyDown: function(sender, code, buttonState){ 
		try {
			if (sender == undefined) this.cb_brg.setFocus();

		}
		catch(e) {
			alert(e);
		}
	},
	doExit: function(sender){
		if(sender == this.e_sisa){
			alert("simpan");
			this.cb_brg.setFocus();
		}
	},
	doBayar : function(sender) {
		try {	
			if (sender == this.bSatu) this.e_bayar.setText("10.000");
			if (sender == this.bDua) this.e_bayar.setText("20.000");
			if (sender == this.bLima) this.e_bayar.setText("50.000");
			if (sender == this.bRatus) this.e_bayar.setText("100.000");

			this.doChange(this.e_bayar);

			this.e_bayar.setFocus();
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
			this.dbLib.execQuerySync(sql);	
			
			if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}	
			
					var strSQL = "select kode_gudang from brg_karyawan_gdg where nik = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var vGudang = line.kode_gudang;											
						}
					}	
					
					var strSQL = "select kode_akun from brg_jbayar_jual where kode_jenis = '"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line1 = data.rs.rows[0];							
						if (line1 != undefined){	
							var vAkun = line1.kode_akun;											
						}
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGJUAL','F','-','-','"+this.app._kodePP+"','"+this.e_tgl.getText()+"','-','Penjualan No: "+this.e_nb.getText()+"','IDR',1,"+
							nilaiToFloat(this.e_totba.getText())+","+nilaiToFloat(this.e_pot.getText())+",0,'-','-','-','"+this.cb_jenis.getText()+"','"+this.e_idbank.getText()+"','-','"+vGudang+"','-','-')");

					if(this.cb_jenis.getText() != ""){ 
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',0,'"+vAkun+"','D',"+parseNilai(this.e_totba.getText())+","+parseNilai(this.e_totba.getText())+",'Titipan Penjualan','BRGJUAL','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");		
					}

					if(this.cb_jenis.getText() == ""){	
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',0,'"+this.akunKas+"','D',"+parseNilai(this.e_totba.getText())+","+parseNilai(this.e_totba.getText())+",'Kas Penjualan','BRGJUAL','KAS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");		
					}
				
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',1,'"+this.akunPot+"','D',"+parseNilai(this.e_pot.getText())+","+parseNilai(this.e_pot.getText())+",'Potongan Penjualan','BRGJUAL','POTONGAN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");		
							
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							var data = this.dbLib.getDataProvider("select b.akun_pdpt from brg_barang a inner join brg_barangklp b on a.kode_klp=b.kode_klp where a.kode_barang ='"+this.sg.cells(0,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
							if (typeof data == "object"){
								var line = data.rs.rows[0];					
								this.akunPdpt = line.akun_pdpt;	

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',2,'"+this.akunPdpt+"','C',"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(6,i))+",'Penjualan Barang','BRGJUAL','JUALBRG','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
								
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGJUAL','BRGJUAL',"+i+",'"+vGudang+"','"+this.sg.cells(0,i)+"','-',getdate(),'-','C',0,"+
										nilaiToFloat(this.sg.cells(5,i))+",0,"+nilaiToFloat(this.sg.cells(2,i))+",0,"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+",0,"+nilaiToFloat(this.sg.cells(6,i))+")");
							}	
						}		
					}
				
					if(this.e_sumb.getText() > 0){
						if(this.cb_jenis.getText() != ""){ 
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',0,'"+vAkun+"','D',"+parseNilai(this.e_sumb.getText())+","+parseNilai(this.e_sumb.getText())+",'Titipan Sumbangan','BRGJUAL','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");		
						}
						if(this.cb_jenis.getText() == ""){
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',0,'"+this.akunKas+"','D',"+parseNilai(this.e_sumb.getText())+","+parseNilai(this.e_sumb.getText())+",'Kas Sumbangan','BRGJUAL','KAS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");		
						}
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.e_tgl.getText()+"',1,'"+this.akunSum+"','C',"+parseNilai(this.e_sumb.getText())+","+parseNilai(this.e_sumb.getText())+",'Titipan Sumbangan','BRGJUAL','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");		
					}
				
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();
					this.nik_user=this.app._userLog;															
				}
				break;
			case "simpan" :	
			case "ubah" :
			
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-SO"+this.e_periode.getText().substr(2,4)+".","0000"));								
				this.cb_brg.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},	

	doClick2:function(sender){
		try {
			if (this.cb_jenis.getText()!= "" && this.e_idbank.getText()!= "") {
				var nbayar = this.e_totba.getText();
				this.e_bayar.setText(nbayar);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
			} else ("Masukkan jenis & ID bank");
		}
		catch(e) {
			alert(e);
		}
	},

	doChange:function(sender){		
		try {
			if (sender == this.cb_brg && this.cb_brg.getText() != "") {
				this.e_nama.setText(this.cb_brg.rightLabelCaption);				
				this.e_jml.setText("1");							
				this.doEnter();
			}	
			
			if (sender == this.e_total) {
				if (this.e_total.getText()!="") {
					var strSQL = "select nilai_pot from brg_potjual where ("+nilaiToFloat(this.e_total.getText())+" between nilai_min and nilai_max) and kode_lokasi='"+this.app._lokasi+"'";										 							
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){					
							this.e_pot.setText(floatToNilai(line.nilai_pot));
						}
					}					
					this.e_totba.setText(floatToNilai(nilaiToFloat(this.e_total.getText())-nilaiToFloat(this.e_pot.getText())));	
				}

			}
			
			if (sender == this.e_bayar || sender == this.e_sumb || sender == this.e_totba) {
				if (this.e_bayar.getText() != "" && this.e_totba.getText() != ""  && this.e_sumb.getText() != ""){
					var sisa = nilaiToFloat(this.e_bayar.getText()) - nilaiToFloat(this.e_totba.getText()) - nilaiToFloat(this.e_sumb.getText());
					sisa = Math.round(sisa);				
					this.e_sisa.setText(floatToNilai(sisa));
				}
			}
			
			
		}
		catch(e) {
			alert(e);
		}
	},	
	doEnter:function(sender,col,row){
		try {
			if((sender == this.e_jml) && this.cb_brg.getText() != "" && this.e_jml.getText() != ""){
				var strSQL = "select a.kode_barang,a.nama,a.hna,isnull(b.p_disk,0) as diskon,isnull(b.pot_nilai,0) as pot "+
							 "from brg_barang a "+
							 "left join brg_diskonjual_d b on a.kode_barang=b.kode_barang and a.kode_lokasi =b.kode_lokasi and '"+this.e_tgl.getText()+"' between b.tgl_mulai and b.tgl_selesai "+
							 "where a.kode_barang = '"+this.cb_brg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						var subtotal = Math.round( ( (parseFloat(line.hna) - (parseFloat(line.hna) * parseFloat(line.diskon) / 100)) * nilaiToFloat(this.e_jml.getText()) ) - parseFloat(line.pot) );
						
						var vTemu = false;
						for (var i=0; i<this.sg.getRowCount(); i++){
							if (this.sg.rowValid(i)){
								if (this.cb_brg.getText() == this.sg.cells(0,i)) {
									vTemu = true;
									var j = i;
								}
							}
						}
						

						if (vTemu) {
							var jml = nilaiToFloat(this.sg.cells(5,j)) + nilaiToFloat(this.e_jml.getText());
							var pot = nilaiToFloat(this.sg.cells(4,j)) + nilaiToFloat(line.pot);
							var totdisk = subtotal + pot;
							var subtotal = Math.round( ( (parseFloat(line.hna) - (parseFloat(line.hna) * parseFloat(line.diskon) / 100)) * jml  ) - pot );
							this.sg.cells(4,j,pot);
							this.sg.cells(5,j,jml);
							this.sg.cells(6,j,subtotal);
						} 
						else this.sg.appendData([this.cb_brg.getText(),line.nama,floatToNilai(line.hna),floatToNilai(line.diskon),floatToNilai(line.pot),this.e_jml.getText(),subtotal]);
					}
				}

				this.sg.validasi();
				this.cb_brg.setText("","");
				this.e_nama.setText("");
				this.e_jml.setText("");		
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "") {
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}						
			this.e_total.setText(floatToNilai(tot));				
		}catch(e)
		{
			alert("[]"+e);
		}
	},	
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_produk_rptJual";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
			this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();

			this.nik_user=this.app._userLog;										
		} catch(e) {
			alert(e);
		}
	}	
});