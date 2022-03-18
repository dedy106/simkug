window.app_saku3_transaksi_yakes21_budget_fAppKPA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_budget_fAppKPA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_budget_fAppKPA";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve KPA", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_gridLib");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pengajuan","Data Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,		            
				colTitle:["Pilih","No Pengajuan","Tanggal","No Dokumen","Deskripsi","Progress","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[120,100,300,120,100,120,70]],
				readOnly:true,
				colFormat:[[0,6],[cfButton,cfNilai]],
				click:[this,"doSgBtnClick3"], colAlign:[[0],[alCenter]],
				dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN","NONAPP"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});						

		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,5,995,310], childPage:["Rekap RRA","Pemberi","Penerima","Controlling","File Dok"]});						
		this.c_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,9,200,20],caption:"Jenis Budget", readOnly:true});		
		this.cb_lok2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Lokasi Pemberi", readOnly:true});		
		this.cb_lok1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Lokasi Penerima", readOnly:true});				
		this.e_noaju = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Pengajuan",maxLength:30,readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Tanggal", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});						
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", readOnly:true, tag:2});										
		this.e_donor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total Pemberi", readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_terima = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});	

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
					colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","TW","Saldo","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,150,80,150,80,150,80]],					
					columnReadOnly:[true,[1,3,5,7],[0,2,4,6,8]],
					colFormat:[[7,8],[cfNilai,cfNilai]],					
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 
					picklist:[[6],[new portalui_arrayMap({items:["TW1","TW2","TW3","TW4"]})]], 					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
					colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","TW","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,200,80,150,80,180,80]],					
					columnReadOnly:[true,[1,3,5],[0,2,4,6,7]],
					colFormat:[[7],[cfNilai]],
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 					
					picklist:[[6],[new portalui_arrayMap({items:["TW1","TW2","TW3","TW4"]})]], 					
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","TW"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});

		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
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
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_budget_fAppKPA.extend(window.childForm);
window.app_saku3_transaksi_yakes21_budget_fAppKPA.implement({	
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
					"select kode_jenis, nama  from inv_dok_jenis  ", 
					"select count(*) from inv_dok_jenis ", 
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app",this.app._lokasi+"-KPA"+this.e_periode.getText().substr(2,4)+".","0000"));															
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
									
					if (this.c_status.getText() == "APPROVE") var vStatus = "1"; 
					if (this.c_status.getText() == "RETURN") var vStatus = "K";	
					if (this.c_status.getText() == "NONAPP") var vStatus = "X";										
					
					sql.add("update rra_app_m set no_flag='"+this.e_nb.getText()+"' where no_pdrk='"+this.e_noaju.getText()+"' and no_flag='-' and modul='APPKPA' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into rra_app_m (no_app, kode_lokasi, tanggal, keterangan, modul, periode, no_pdrk, nik_buat, nik_app, nik_user, tgl_input, jenis_form, status, no_flag) values "+		
							"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"', '"+this.e_memo.getText()+"', 'APPKPA', '"+this.e_periode.getText()+"', '"+this.e_noaju.getText()+"', '"+this.app._userLog+"', '-', '"+this.app._userLog+"', getdate(), 'APPKPA','"+vStatus+"','-')");

					
					if (vStatus != "1") sql.add("update rra_pdrk_m set progress='"+vStatus+"',no_app1='"+this.e_nb.getText()+"' where no_pdrk='"+this.e_noaju.getText()+"' ");
					
					//jika approve replace pengajuan , progreess=1
					if (vStatus == "1") {						
						sql.add("delete from anggaran_m where no_agg='"+this.e_noaju.getText()+"'");						
						if (this.c_jenis.getText() == "ANGGARAN") sql.add("delete from anggaran_d where no_agg='"+this.e_noaju.getText()+"'");
						else sql.add("delete from angg_r where no_bukti='"+this.e_noaju.getText()+"'");
						sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_noaju.getText()+"'");
						sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_noaju.getText()+"'");

						if (this.c_jenis.getText() == "ANGGARAN") var jenis = "RRA";											
						else var jenis = "RRRMULTI";

						sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
							    "('"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.tglAju+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_donor.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+jenis+"')");					
						sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,lok_donor,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul,no_app1,no_app2) values "+
							    "('"+this.e_noaju.getText()+"','"+this.cb_lok1.getText()+"','"+this.cb_lok2.getText()+"','"+this.e_ket.getText()+"','-','-','"+this.c_jenis.getText()+"','"+this.tglAju+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','-','-','"+jenis+"','-','"+this.app._userLog+"',getdate(),'"+vStatus+"','PUSAT','-','-')");

						var periode = "";
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){						
									if (this.sg.cells(6,i) == "TW1") var bulan = "01";
									if (this.sg.cells(6,i) == "TW2") var bulan = "04";
									if (this.sg.cells(6,i) == "TW3") var bulan = "07";
									if (this.sg.cells(6,i) == "TW4") var bulan = "10";

									periode = this.e_periode.getText().substr(0,4)+ bulan;
									sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
											"('"+this.e_noaju.getText()+"','"+this.cb_lok2.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-')");

									if (this.c_jenis.getText() == "ANGGARAN") {		
										sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
												"('"+this.e_noaju.getText()+"','"+this.cb_lok2.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-','"+this.app._userLog+"',getdate(),'"+jenis+"')");
									}
									else {
										sql.add("insert into angg_r (no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, dc, saldo, nilai) values "+
								 				"('"+this.e_noaju.getText()+"', 'RELEASE', '"+this.cb_lok2.getText()+"', '"+this.sg.cells(0,i)+"', '"+this.sg.cells(2,i)+"', '"+this.sg.cells(4,i)+"', '"+periode+"', '"+periode+"', 'C', 0, "+parseNilai(this.sg.cells(8,i))+")");					
									}
								}
							}
						}
						
						if (this.sg4.getRowValidCount() > 0){
							for (var i=0;i < this.sg4.getRowCount();i++){
								if (this.sg.rowValid(i)){						
									if (this.sg4.cells(6,i) == "TW1") var bulan = "01";
									if (this.sg4.cells(6,i) == "TW2") var bulan = "04";
									if (this.sg4.cells(6,i) == "TW3") var bulan = "07";
									if (this.sg4.cells(6,i) == "TW4") var bulan = "10";

									periode = this.e_periode.getText().substr(0,4)+ bulan;
									sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
											"('"+this.e_noaju.getText()+"','"+this.cb_lok1.getText()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(4,i)+"','"+periode+"',0,"+parseNilai(this.sg4.cells(7,i))+",'D','-')");								
								}
							}
						}
					}

					//direject langsung oleh petugas KPA.. usulan dikembalikan lg
					if (vStatus == "X") {		
						if (this.c_jenis.getText() == "ANGGARAN") {
							sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+		
									"select no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,'D',satuan,'"+this.app._userLog+"',getdate(),'X-"+jenis+"' "+
									"from anggaran_d "+
									"where no_agg='"+this.e_noaju.getText()+"' and dc ='C'");
						}
						else {
							sql.add("insert into angg_r (no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, dc, saldo, nilai) "+
								 	"select no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, 'D', 0, nilai "+
									"from angg_r "+
									"where no_bukti='"+this.e_noaju.getText()+"' and dc='C'");					
						}
					}

					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','RRA','"+this.e_noaju.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_noaju);			
					this.sg.clear(1); 					
					this.sg2.clear(1);	
					this.sg4.clear(1);	
					this.sgUpld.clear(1);
					this.sgFile.clear();		
					this.e_memo.setText("");			
					setTipeButton(tbAllFalse);								
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "0"; //tidak perlu report
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;								
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {		
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);			
			this.doLoad3();			
		}
		catch(e) {
			alert(e);
		}
	},						
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(7,i) != ""){					
					totD += nilaiToFloat(this.sg4.cells(7,i));
				}
			}						
			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(8,i));
				}
			}						

			this.e_terima.setText(floatToNilai(totD));
			this.e_donor.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},   		
	doHitungGar: function(){
        try {
            this.sg2.clear();
            var nilai = total = 0;
            for (var i=0;i < this.sg.getRowCount();i++){
                if (this.sg.rowValid(i) && this.sg.cells(8,i) != "0"){              
                    nilai = nilaiToFloat(this.sg.cells(8,i));
                    
                    var isAda = false;
                    var idx = total = 0;
                    for (var j=0;j < this.sg2.getRowCount();j++){
                        if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(2,i) == this.sg2.cells(2,j) && this.sg.cells(4,i) == this.sg2.cells(4,j) && this.sg.cells(6,i) == this.sg2.cells(8,j)) {
                            isAda = true;
                            idx = j;
                            break;
                        }
                    }
                    if (!isAda) {
                        this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(4,i),this.sg.cells(5,i),"0",floatToNilai(nilai),this.sg.cells(6,i)]);
                    } 
                    else { 
                        total = nilaiToFloat(this.sg2.cells(7,idx));
                        total = total + nilai;
                        this.sg2.setCell(7,idx,total);
                    }
                }
            }

            for (var i=0;i < this.sg2.getRowCount();i++){   
				if (this.c_jenis.getText() == "ANGGARAN") {
					var data = this.dbLib.getDataProvider("select fn_saldoGarTW('"+this.cb_lok2.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText().substr(0,4)+"','"+this.sg2.cells(8,i)+"','"+this.e_noaju.getText()+"') as saldo ",true);
				}
				else  {					
					if (this.sg2.cells(8,i) == "TW1") var bulan = "01";
					if (this.sg2.cells(8,i) == "TW2") var bulan = "04";
					if (this.sg2.cells(8,i) == "TW3") var bulan = "07";
					if (this.sg2.cells(8,i) == "TW4") var bulan = "10";

					var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.cb_lok2.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText().substr(0,4)+bulan+"','"+this.e_noaju.getText()+"') as saldo ",true);
				}
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.sg2.cells(6,i,floatToNilai(line.saldo));                       
				}
            }
			
        }
        catch(e) {
            alert(e);
        }
    },  
	doChangeCell: function(sender, col, row){
		if ((col == 6 || col == 8) && (this.sg.cells(8,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);

	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {				
				var data = this.dbLib.getDataProvider("select nama from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(1,row,line.nama);
					else {						
						this.sg.cells(0,row,"");
						this.sg.cells(1,row,"");						
					}
				}
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {		
				var data = this.dbLib.getDataProvider("select nama from pp where kode_pp='"+sender.cells(2,row)+"' and kode_lokasi='"+this.cb_lok2.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(3,row,line.nama);
					else {						
						this.sg.cells(2,row,"");
						this.sg.cells(3,row,"");						
					}
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
				
				if (this.c_jenis.getText() == "ANGGARAN") {
					var data = this.dbLib.getDataProvider("select fn_saldoGarTW('"+this.cb_lok2.getText()+"','"+sender.cells(0,row)+"','"+sender.cells(2,row)+"','"+sender.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+"','"+sender.cells(6,row)+"','"+this.e_noaju.getText()+"') as saldo ",true);
				}
				else {
					if (sender.cells(6,row) == "TW1") var bulan = "01";
					if (sender.cells(6,row) == "TW2") var bulan = "04";
					if (sender.cells(6,row) == "TW3") var bulan = "07";
					if (sender.cells(6,row) == "TW4") var bulan = "10";

					var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.cb_lok2.getText()+"','"+sender.cells(0,row)+"','"+sender.cells(2,row)+"','"+sender.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+bulan+"','"+this.e_noaju.getText()+"') as saldo ",true);
				}

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					var saldo = parseFloat(line.saldo) - totSeb;
					sender.cells(7,row,saldo);				
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
								"select a.kode_pp, a.nama  from pp a where a.kode_lokasi = '"+this.cb_lok2.getText()+"' and a.flag_aktif ='1'",
								"select count(*) from pp a where a.kode_lokasi = '"+this.cb_lok2.getText()+"' and a.flag_aktif ='1'",						
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
						
				}
				if (col == 4){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lok2.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
								"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lok2.getText()+"'",
								"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lok2.getText()+"'",
								["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mata Anggaran",sender,undefined, 
								"select kode_akun,nama    from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
								"select count(kode_akun)  from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
								["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 												  
								"select a.kode_pp, a.nama  from pp a where a.kode_lokasi = '"+this.cb_lok1.getText()+"' and a.flag_aktif ='1'",
								"select count(*)  from pp a where a.kode_lokasi = '"+this.cb_lok1.getText()+"' and a.flag_aktif ='1'",						
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
						
				}
				if (col == 4){										
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
								"select a.kode_drk, a.nama from drk a where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.cb_lok1.getText()+"'",
								"select count(*) from drk a where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.cb_lok1.getText()+"'",
								["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell4: function(sender, col, row){
		if ((col == 6 || col == 8) && (this.sg4.cells(7,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);

	    if (col == 0) {
			if (this.sg4.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg4.cells(1,row,line.nama);
					else {						
						this.sg4.cells(0,row,"");
						this.sg4.cells(1,row,"");						
					}
				}				
			}
		}
		if (col == 2) {
			if (this.sg4.cells(2,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from pp where kode_pp='"+sender.cells(2,row)+"' and kode_lokasi='"+this.cb_lok1.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg4.cells(3,row,line.nama);
					else {						
						this.sg4.cells(2,row,"");
						this.sg4.cells(3,row,"");						
					}
				}				
			}
		}
		if (col == 4) {
			if (this.sg4.cells(4,row) != "") {				
				var data = this.dbLib.getDataProvider("select a.nama from drk a where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg4.cells(5,row,line.nama);
					else {						
						this.sg4.cells(4,row,"");
						this.sg4.cells(5,row,"");						
					}
				}
			}
		}			
		sender.onChange.set(this,"doChangeCell4");		
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
								// this.nama_report = "server_report_saku3_rra_rptAggDis";
								// this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pdrk='" + this.e_noaju.getText() + "' ";
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
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_noaju.getText() + ")", "");
								this.clearLayar();
							}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_noaju);			
			this.sg.clear(1); 
			this.sg2.clear(1);				
			this.sg4.clear(1);		
			this.sgUpld.clear(1);
			this.sgFile.clear();	
			this.e_memo.setText("");									
			setTipeButton(tbAllFalse);								
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,b.no_dokumen,a.keterangan,case a.progress when '0' then 'Pengajuan' end as progress,a.tanggal,b.nilai "+
		             "from rra_pdrk_m a "+
					 "inner join anggaran_m b on a.no_pdrk=b.no_agg "+					 					 					 					 
					 "where a.modul = 'PUSAT' and a.progress = '0'  order by a.tanggal";		
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
			this.sg3.appendData(["Pilih",line.no_pdrk,line.tgl,line.no_dokumen,line.keterangan,line.progress.toUpperCase(),floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick3(this.sg3,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				
				this.c_status.setFocus();
				setTipeButton(tbSimpan);			

				this.e_noaju.setText(this.sg3.cells(1,row));
				this.e_tgl.setText(this.sg3.cells(2,row));																											
				this.e_memo.setText(this.sg3.cells(4,row));
				var strSQL = "select a.jenis_agg,b.no_dokumen,a.nik_app1,a.tanggal,a.keterangan,a.kode_lokasi,a.lok_donor,c.nama "+
							 "from rra_pdrk_m a inner join anggaran_m b on a.no_pdrk=b.no_agg "+							 
							 "inner join karyawan c on a.nik_app1=c.nik "+
							 "where a.no_pdrk='"+this.e_noaju.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.c_jenis.setText(line.jenis_agg);
						this.cb_lok1.setText(line.kode_lokasi);
						this.cb_lok2.setText(line.lok_donor);
						this.cb_app.setText(line.nik_app1,line.nama);					
						this.dp_d1.setText(line.tanggal);	
						this.tglAju = line.tanggal;
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);							
					}
				}

				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk='"+this.e_noaju.getText()+"' and a.dc ='C' ";								 		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						if (line.bulan == "01")	var tw = "TW1";
						if (line.bulan == "04")	var tw = "TW2";
						if (line.bulan == "07")	var tw = "TW3";
						if (line.bulan == "10")	var tw = "TW4";				
						this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,tw,"0",floatToNilai(line.nilai)]);						
						this.doChangeCell(this.sg,0,i);
					}
				} else this.sg.clear(1);		
				
				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk='"+this.e_noaju.getText()+"' and a.dc ='D' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						if (line.bulan == "01")	var tw = "TW1";
						if (line.bulan == "04")	var tw = "TW2";
						if (line.bulan == "07")	var tw = "TW3";
						if (line.bulan == "10")	var tw = "TW4";				
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,tw,floatToNilai(line.nilai)]);
					}
				} else this.sg4.clear(1);

				this.sg.validasi();

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
											
			}									
		} catch(e) {alert(e);}
	}	
});
