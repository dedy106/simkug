window.app_saku3_transaksi_yakes21_panjar_fPtgAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_panjar_fPtgAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_panjar_fPtgAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pertanggungan Panjar", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Panjar","List Panjar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["No Pertggn","Tanggal","No Panjar","Deskripsi","Pemegang","Nilai","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,200,200,100,70,100]],
					colFormat:[[5,6],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSg3BtnClick"], colAlign:[[6],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Nilai Perttg.", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.e_sls = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Sisa Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,328], childPage:["Data Panjar","Item Perttgn","Jurnal+","Alokasi PJ","File Dok","Cttn. Approval"]});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_pj = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Bukti Panjar", multiSelection:false, tag:1,change:[this,"doChange"]});				
		this.e_akunpj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Akun Panjar", readOnly:true});								
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_pemegang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,400,20],caption:"Pemegang Panjar", readOnly:true});								
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Nilai","Keterangan"],
					colWidth:[[7,6,5,4,3,2,1,0],[350,90,150,80,150,80,150,80]],					
					columnReadOnly:[true,[1,3,5],[0,2,4,6,7]],					
					colFormat:[[6],[cfNilai]],checkItem: true,
					buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]], 
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				

		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,290,50,200,80]],								
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]], picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});					

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Alokasi PJ","Ni Pertgg"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,200,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[965,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});

		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[4],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});	
		
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
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif ='1' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);									
			
			this.doLoadCtt(this.e_nb.getText()); 	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_panjar_fPtgAju.extend(window.childForm);
window.app_saku3_transaksi_yakes21_panjar_fPtgAju.implement({
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	isiCBpanjar: function() {	
		try {	
			this.cb_pj.setSQL(
						"select a.no_panjar, a.keterangan "+
						"from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.progress = '2' and  a.no_kas<>'-' and a.modul='PJ2' and b.kode_bidang='"+this.app._kodeBidang+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"
						,["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true); 				
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();						
					if (this.stsSimpan == 0) {						
						sql.add("update panjar2_m set progress = '2' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from panjarptg2_m where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from panjarptg2_j where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	
											
					sql.add("update panjar2_m set progress = '3' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai)  "+
							"select '"+this.e_nb.getText()+"','PJPTG',kode_lokasi,kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"',case dc when 'C' then 'D' else 'C' end,0,nilai "+
							"from angg_r where no_bukti='"+this.cb_pj.getText()+"' ");

					sql.add("insert into panjarptg2_m (no_ptg,no_panjar,no_final,no_app,no_dokumen,tanggal,keterangan,akun_panjar,nik_buat,nik_app,kode_lokasi,kode_pp,nilai_pj,nilai,nilai_kas,progress,periode,nik_user,tgl_input,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','-','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_akunpj.getText()+"','"+this.nikPJ+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilaipj.getText())+","+parseNilai(this.e_total.getText())+","+parseNilai(this.e_sls.getText())+",'0','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PJPTG')");
										
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(7,i)+"','D',"+parseNilai(this.sg1.cells(6,i))+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"','"+this.app._lokasi+"','PJPTG','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
							}
						}
					}
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){								
								sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg4.cells(4,i))+",'"+this.sg4.cells(5,i)+"','-','"+this.app._lokasi+"','PJPTG','PAJAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
							}
						}
					}					
					sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.e_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','REVPANJAR','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					

					//---progress = 'X' ,menjadi '0' mennggu form approval dr manager -- (0--> serah terima dok)		
					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'PJPTG','X','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','"+this.nikPJ+"','"+this.cb_pj.getText()+"','-','-','"+this.e_akunpj.getText()+"','"+this.cb_app.getText()+"','X')");					
					sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) "+
							" select kode_vendor,nu,'"+this.e_nb.getText()+"',kode_lokasi,'PJPTG',nama_rek,no_rek,bank,nama,"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+
							" from pbh_rek where no_bukti='"+this.cb_pj.getText()+"'");
							
					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,'IDR',1 "+
							"from panjarptg2_j where no_ptg='"+this.e_nb.getText()+"'");												

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									//terpakai
									var DC = "C"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									//koreksi budget
									var DC = "D";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','PJPTG','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
						}
					}

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PJPTG','"+this.e_nb.getText()+"')");															
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); 
					this.sgUpld.clear(1); this.sgFile.clear(1);							
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";	
				if (nilaiToFloat(this.e_sls.getText()) < 0){
					system.alert(this,"Transaksi tidak valid.","Nilai Pertanggungan melebihi Nilai Panjar.");
					return false;
				}											
				
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
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
				this.sg1.validasi();											
				this.doHitungGar();
				
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Nilai Pertanggungan melebihi Alokasi Pengajuan. [Baris : "+k+"]");
						return false;						
					}
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
								
				sql.add("update panjar2_m set progress = '2' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("delete from panjarptg2_m where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from panjarptg2_j where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				break;					
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
			if (this.stsSimpan == 1) this.doClick();
		}
		catch(e) {
			alert(e);
		}				
	},	
	doChange:function(sender){
		try {
			if (sender == this.e_periode || sender == this.cb_pp) {
				if (this.e_periode.getText()!="" && this.cb_pp.getText()!="" && this.stsSimpan == 1) {				
					this.isiCBpanjar();
				}
			}
			if (sender == this.cb_pj && this.cb_pj.getText()!="") {				
				var strSQL = "select a.nilai,a.akun_panjar,a.nik_buat+' - '+b.nama as pemegang,a.nik_buat "+
							"from panjar2_m a inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_panjar='"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						this.e_pemegang.setText(line.pemegang);
						this.e_akunpj.setText(line.akun_panjar);
						this.e_nilaipj.setText(floatToNilai(line.nilai));																					
						this.nikPJ = line.nik_buat;


						var sql = new server_util_arrayList();
						sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'");			
						sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									

						sql.add("select distinct a.kode_pp,a.nama from pp a inner join panjar2_d b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.no_panjar='"+this.cb_pj.getText()+"' where a.flag_aktif= '1' and a.kode_lokasi <> '00'");			
						sql.add("select distinct a.kode_akun,a.nama from masakun a inner join panjar2_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.no_panjar='"+this.cb_pj.getText()+"' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
						this.dbLib.getMultiDataProviderA(sql);		
						
					} 
				}			

				if (this.stsSimpan == 1) {
					var data = this.dbLib.getDataProvider(
								"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"            	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"                 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
								"where a.jenis='BEBAN' and a.no_panjar = '"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg1.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai),line.keterangan]);
						}
					} else this.sg1.clear(1);
					
					var data = this.dbLib.getDataProvider(
								"select a.kode_akun,b.nama as nama_akun,sum(a.nilai) as nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk "+
								"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"            	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"                 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
								"where a.jenis='BEBAN' and a.no_panjar = '"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								"group by a.kode_akun,b.nama,a.kode_pp,c.nama,a.kode_drk,d.nama	"+
								"order by a.kode_akun,a.kode_pp,a.kode_drk",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai),"0"]);
						}
					} else this.sg2.clear(1);
					this.doHitungGar();
					
				}				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1); 
				this.sg4.clear(1); 
				this.e_total.setText("0");			
				this.e_sls.setText("0");							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjarptg2_m","no_ptg",this.app._lokasi+"-PTG"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doHitungGar: function(){
        try {            
			for (var j=0;j < this.sg2.getRowCount();j++){
				this.sg2.setCell(7,j,"0");				
			}  

            var nilai = total = 0;
            for (var i=0;i < this.sg1.getRowCount();i++){
                if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "0"){              
                    nilai = nilaiToFloat(this.sg1.cells(6,i));                                        
                    for (var j=0;j < this.sg2.getRowCount();j++){
                        if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(2,i) == this.sg2.cells(2,j) && this.sg1.cells(4,i) == this.sg2.cells(4,j) ) {
                            total = nilaiToFloat(this.sg2.cells(7,j));
                        	total = total + nilai;
                        	this.sg2.setCell(7,j,total);
                        }
                    }                    
                }
            }
        }
        catch(e) {
            alert(e);
        }
    },  
	doChangeCell1: function(sender, col, row){
		try {
			if (col == 6  && this.sg1.cells(6,row) != "") this.sg1.validasi();			

			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (this.sg1.cells(0,row) != "") {				
					var akun = this.dataAkunPj.get(sender.cells(0,row));				
					if (akun) sender.cells(1,row,akun);
					else {
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}		
			if (col == 2) {
				if (this.sg1.cells(2,row) != "") {
					var pp = this.dataPPpj.get(sender.cells(2,row));
					if (pp) sender.cells(3,row,pp);
					else {
						if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
						sender.cells(2,row,"");
						sender.cells(3,row,"");
					}				
				}
			}		
			if (col == 4) {
				if (this.sg1.cells(4,row) != "") {					
					var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join panjar2_d b on a.kode_drk=b.kode_drk and b.no_panjar='"+this.cb_pj.getText()+"' where a.tahun=substring(b.periode,1,4) and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(2,row)+"' and b.kode_drk = '"+this.sg1.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) this.sg1.cells(5,row,line.nama);
						else {							
							this.sg1.cells(4,row,"");
							this.sg1.cells(5,row,"");							
						}
					}
				}
			}
			sender.onChange.set(this,"doChangeCell1");

		}
		catch(e) {
			alert(e);
		}		
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select distinct a.kode_akun,a.nama from masakun a inner join panjar2_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.no_panjar='"+this.cb_pj.getText()+"' and b.jenis='BEBAN' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from (select distinct a.kode_akun,a.nama from masakun a inner join panjar2_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.no_panjar='"+this.cb_pj.getText()+"' and b.jenis = 'BEBAN' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') x",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					var strPP = "select distinct a.kode_pp,a.nama from pp a inner join panjar2_d b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.no_panjar='"+this.cb_pj.getText()+"' where a.flag_aktif= '1' and a.kode_lokasi <> '00'";
					var strPPCount = "select count(*) from pp a inner join panjar2_d b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.no_panjar='"+this.cb_pj.getText()+"' where a.flag_aktif= '1' and a.kode_lokasi <> '00'";                    
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}			
				if (col == 4){										
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
						    "select distinct a.kode_drk,a.nama from drk a inner join panjar2_d b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=substring(b.periode,1,4) and b.no_panjar='"+this.cb_pj.getText()+"' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_drk from drk a inner join panjar2_d b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=substring(b.periode,1,4) and b.no_panjar='"+this.cb_pj.getText()+"' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') x",
							["a.kode_drk","a.nama"],"and",["Kode","Nama"],false);				
				}										
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange1: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(6,i));	
				}
			}
			
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){
					if (this.sg4.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg4.cells(4,i));
					if (this.sg4.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg4.cells(4,i));
				}
			}

			this.e_total.setText(floatToNilai(totD - totC));
			var sls = nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_total.getText());
			this.e_sls.setText(floatToNilai(sls));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') x",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'";
					var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'";                    
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}												
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell4: function(sender, col, row){
		try {
			if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg4.validasi();
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var akun = this.dataAkunPjk.get(sender.cells(0,row));				
					if (akun) sender.cells(1,row,akun);
					else {
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}		
			if (col == 5) {
				if (sender.cells(5,row) != "") {
					var pp = this.dataPP.get(sender.cells(5,row));
					if (pp) sender.cells(6,row,pp);
					else {
						if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
						sender.cells(5,row,"");
						sender.cells(6,row,"");
					}				
				}
			}
			sender.onChange.set(this,"doChangeCell4");		
		}
		catch(e){
			alert(e);
		}				
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							if (this.preView == "1") {						
								this.nama_report="server_report_saku3_sapyakes_rptPjPtgForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
							this.dataPP = new portalui_arrayMap();														
							this.dataAkunPjk = new portalui_arrayMap();	
							
							this.dataPPpj = new portalui_arrayMap();														
							this.dataAkunPj = new portalui_arrayMap();	

							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataAkunPjk.set(line.kode_akun, line.nama);										
								}								
							}

							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];									
									this.dataPPpj.set(line.kode_pp, line.nama);										
								}								
							}
							if (result.result[3]){	    			        
								var line;
								for (var i in result.result[3].rs.rows){
									line = result.result[3].rs.rows[i];									
									this.dataAkunPj.set(line.kode_akun, line.nama);										
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); 
			this.sgUpld.clear(1); this.sgFile.clear(1);							
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select c.no_ptg,a.no_panjar,convert(varchar,c.tanggal,103) as tgl,c.no_dokumen,c.keterangan,a.nik_buat+' - '+b.nama as nama,c.nilai "+
		             "from panjarptg2_m c inner join panjar2_m a on c.no_panjar=a.no_panjar and c.kode_lokasi=a.kode_lokasi "+
					 "                    inner join karyawan b on a.nik_buat=b.nik "+
					 "                    inner join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
					 "					  inner join pbh_pb_m e on c.no_ptg=e.no_pb and e.progress in ('X','V') "+
					 "where c.periode<='"+this.e_periode.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' and c.progress in ('0','1','R') and d.kode_bidang='"+this.app._kodeBidang+"'";		
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
			this.sg3.appendData([line.no_ptg,line.tgl,line.no_panjar,line.keterangan,line.nama,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSg3BtnClick: function(sender, col, row){
		try{
			if (col === 6) {
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
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.doLoadCtt(this.e_nb.getText()); 

				this.cb_pj.setSQL("select no_panjar, keterangan from panjar2_m where no_panjar='"+this.sg3.cells(2,row)+"' and kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Panjar",true); 												  								
				
				var strSQL = "select a.nilai,a.akun_panjar,a.no_panjar,a.keterangan,a.nik_buat+' - '+e.nama as pemegang,b.progress, "+
							 " b.no_dokumen,b.keterangan as ket,b.nik_app,d.nama as nama_app,b.tanggal "+
							 "from panjar2_m a inner join panjarptg2_m b on a.no_panjar=b.no_panjar and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join karyawan d on b.nik_app=d.nik and b.kode_lokasi=d.kode_lokasi "+							 
							 "                 inner join karyawan e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi "+							 
							 "where b.no_ptg='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.ket);
						this.cb_app.setText(line.nik_app,line.nama_app);
						this.cb_pj.setText(line.no_panjar,line.keterangan);
						this.e_akunpj.setText(line.akun_panjar);
						this.e_nilaipj.setText(floatToNilai(line.nilai));															
						this.e_pemegang.setText(line.pemegang);																							
					} 
				}		

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,e.nilai as nilai_aju,a.nilai,a.keterangan "+
							"from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"					 inner join panjar2_d e on a.no_urut=e.no_urut and e.no_panjar='"+this.cb_pj.getText()+"'  "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis='BEBAN' and a.no_ptg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai),line.keterangan]);
					}
				} else this.sg1.clear(1);

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,sum(a.nilai) as nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk "+
							"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis='BEBAN' and a.no_panjar = '"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.kode_akun,b.nama,a.kode_pp,c.nama,a.kode_drk,d.nama	"+
							"order by a.kode_akun,a.kode_pp,a.kode_drk",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai),"0"]);
					}
				} else this.sg2.clear(1);
				this.doHitungGar();

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis='PAJAK' and a.no_ptg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg4.clear(1);

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

				this.doHitungGar();
			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and no_ver<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and no_ver<>'"+this.noAppLama+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});