window.app_saku3_transaksi_yakes21_bmhd_fPbBMHD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_bmhd_fPbBMHD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_bmhd_fPbBMHD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Bayar BMHD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai","Pendanaan","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,80,100,350,100,80,100]],
					colFormat:[[4,6],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});						        
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[790,13,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[890,13,100,18]}); 				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_totalDC = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total PB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
        this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,328], childPage:["Data Mitra","Atensi Pembayaran","Jurnal++","Otorisasi","Cattn Verf.","File Dok","Budget"]});            		
		this.cb_bmhd = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akru Mitra", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_akun = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Akun Hutang", readOnly:true});			
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Data Mitra", readOnly:true});			
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Alamat", readOnly:true});			
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Saldo Akru", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Ni. Penyelesaian", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		
		this.c_dana = new saiCB(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Pendanaan", items:["PUSAT","IFUND"], readOnly:true,tag:1,change:[this,"doChange"]});						
		this.cb_if = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Pemegang IF",tag:9,readOnly:true,multiSelection:false,change:[this,"doChange"],visible:false}); 		
		this.e_saldoif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Saldo IF", tag:9, tipeText:ttNilai, text:"0", readOnly:true,visible:false});
		this.cb_rek = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"ID Rekening", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});	
		this.e_banktrans = new saiCB(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Bank Transfer",items:["MANDIRI","X-MANDIRI","BNI","BRI"], readOnly:true,tag:2});	
		this.e_totalRek = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,21,200,20],caption:"Total Rekening", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.sgRek = new saiGrid(this.pc1.childPage[1],{bound:[1,5,990,173],colCount:5,tag:0,
					colTitle:["Nama Atensi","Bank","No Rekening","Nama Rekening","Nilai"],
					colWidth:[[4,3,2,1,0],[100,250,200,100,250]],
					colFormat:[[4],[cfNilai]],
					pasteEnable:true, afterPaste:[this,"doAfterPasteRek"],
					change:[this,"doChangeCellRek"],nilaiChange:[this,"doNilaiChangeRek"],
					defaultRow:1,autoAppend:true});
		this.sgnRek = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgRek});	

		// this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Bank - Cabang", readOnly:true});			
		// this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Rekening", readOnly:true});			
		// this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Nama Rekening", readOnly:true});			
		// this.e_banktrans = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Bank Transfer", readOnly:true});			
	
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
        		
		this.cb_buat = new saiCBBL(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.cb_ver = new saiCBBL(this.pc1.childPage[3],{bound:[20,14,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:2});						
		
		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});

		this.sgUpld = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[5],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sg2 = new saiGrid(this.pc1.childPage[6],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,200,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[6],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[965,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	        
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);	
        			
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.isiCBnik();

			var strSQL = "select status_admin from hakakses where nik = '"+this.app._userLog+"'";										
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.stsAdmin = line.status_admin;								
				}
			}	
						
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('NIKVER','SAPHIF') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "NIKVER") this.cb_ver.setText(line.flag);	
					if (line.kode_spro == "SAPHIF") this.akunHutIF = line.flag;																		
				}
			}
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'SAPHIF'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "SAPHIF") this.akunHutIF = line.flag;																		
				}
			}
		
			this.cb_buat.setText(this.app._userLog);

			var sql = new server_util_arrayList();
			sql.add("select distinct a.kode_akun,a.nama from masakun a "+
					"	inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+						
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
								
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);				
			
			this.doLoadCtt(this.e_nb.getText());
			this.c_dana.setText("");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_bmhd_fPbBMHD.extend(window.childForm);
window.app_saku3_transaksi_yakes21_bmhd_fPbBMHD.implement({	
	doAfterPasteRek: function(sender,totalRow){
		try {			
			this.sgRek.validasi();			
		} catch(e) {alert(e);}
	},
	isiCBnik: function() {
		try {			
			this.cb_if.setSQL("select distinct a.nik, a.nama from karyawan a "+
							  "inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
							  "inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
							  "inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
							  "where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"'",
				["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

			//ut default sesuai karyawan PP pemegang IF dan yg login					
			var strSQL = "select distinct a.nik,b.no_kas from karyawan a "+
						"		inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
						"		inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
						"where c.kode_pp='"+this.app._kodePP+"' and c.kode_lokasi='"+this.app._lokasi+"'";							  
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.noKasOpen = line.no_kas;
					this.cb_if.setText(line.nik);
					this.nikIF = this.cb_if.getText();
				}
				else {
					this.noKasOpen = "-";
					this.cb_if.setText("");
					this.nikIF = "";
				}
			}		
		}
		catch(e){
			alert(e);
		}
	},
	isiBMHD: function() {
		//hanya modul bmhd dari akru (kasus akhir tahun)
		this.cb_bmhd.setSQL("select a.no_hutang,a.keterangan "+
				"from hutang_m a left join ("+
				"        select no_hutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar  "+
				"		 from hutang_bayar where kode_lokasi='"+this.app._lokasi+"' group by no_hutang,kode_lokasi "+
				"		) b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
				"where a.posted='T' and a.modul='BMHD' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai > isnull(b.bayar,0) and a.periode<='"+this.e_periode.getText()+"' "
				,["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data BMHD",true);
	},
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
	doHitungGar: function(){
        try {
            this.sg2.clear();
            var nilai = total = 0;
            for (var i=0;i < this.sg1.getRowCount();i++){
                if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "0" && this.sg1.cells(7,i) != "-"){              
                    if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
                    else nilai = nilaiToFloat(this.s13.cells(4,i)) * -1;        

                    var isAda = false;
                    var idx = total = 0;
                    for (var j=0;j < this.sg2.getRowCount();j++){
                        if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(5,i) == this.sg2.cells(2,j) && this.sg1.cells(7,i) == this.sg2.cells(4,j) ) {
                            isAda = true;
                            idx = j;
                            break;
                        }
                    }
                    if (!isAda) {
                        this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(1,i),this.sg1.cells(5,i),this.sg1.cells(6,i),this.sg1.cells(7,i),this.sg1.cells(8,i),"0",floatToNilai(nilai)]);
                    } 
                    else { 
                        total = nilaiToFloat(this.sg2.cells(7,idx));
                        total = total + nilai;
                        this.sg2.setCell(7,idx,total);
                    }
                }
            }

			for (var i=0;i < this.sg2.getRowCount();i++){               
				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as saldo ",true);
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
						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_bayar where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
						sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");														
					}								
					
					if (this.c_dana.getText() == "PUSAT") {		
						sql.add("insert into hutang_bayar (no_bayar,no_hutang,kode_lokasi,akun_hutang,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
								"('"+this.e_nb.getText()+"','"+this.cb_bmhd.getText()+"','"+this.app._lokasi+"','"+this.akunBMHD+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','PBBMHD','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','-','-',0)");		

						sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",'PBBMHD','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_bmhd.getText()+"','-','-','"+this.akunBMHD+"','"+this.cb_ver.getText()+"','"+this.e_banktrans.getText()+"','-','-')");

						sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunBMHD+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePPAkru+"','-','"+this.app._lokasi+"','PBBMHD','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										

						if (this.sg1.getRowValidCount() > 0){
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){								
									sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','"+this.app._lokasi+"','PBBMHD','TAMBAH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
								}
							}
						}	
					
						// sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
						// 		"('"+this.kodeVendor+"',"+this.cb_rek.getText()+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBBMHD','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_vendor.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",0,"+nilaiToFloat(this.e_totalDC.getText())+")");
					
						if (this.sgRek.getRowValidCount() > 0){
							for (var i=0;i < this.sgRek.getRowCount();i++){
								if (this.sgRek.rowValid(i)){		
									var k = 1000+i;								
									 sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai,bank_trans) values "+
											"('"+this.kodeVendor+"','"+this.cb_rek.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBBMHD','"+this.sgRek.cells(3,i)+"','"+this.sgRek.cells(2,i)+"','"+this.sgRek.cells(1,i)+"','"+this.sgRek.cells(0,i)+"',"+nilaiToFloat(this.sgRek.cells(4,i))+",0,"+nilaiToFloat(this.sgRek.cells(4,i))+",'"+this.e_banktrans.getText()+"')");										
								}
							}
						}


					}
					else {			
						sql.add("insert into hutang_bayar (no_bayar,no_hutang,kode_lokasi,akun_hutang,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
								"('"+this.e_nb.getText()+"','"+this.cb_bmhd.getText()+"','"+this.app._lokasi+"','"+this.akunBMHD+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','IFUND','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','-','-',0)");		

						sql.add("insert into if_aju_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_kuitansi,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,sts_pajak,npajak,no_app,progress,nik_app,no_reim,no_kasopen,posted,nik_setuju, nilai_dpp,persen, nik_if,form) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.cb_buat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','IFAJU','"+this.akunHutIF+"','"+this.app._kodePP+"','-','"+
								this.e_ket.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",'NON',0,'-','0','"+this.cb_ver.getText()+"','-','"+this.noKasOpen+"','X','"+this.cb_app.getText()+"', "+nilaiToFloat(this.e_totalDC.getText())+",0,'"+this.cb_if.getText()+"','PBBMHD')");
											
						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_bmhd.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',99999,'"+this.e_periode.getText()+"','"+this.akunHutIF+"','"+this.app._kodePP+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",'HUTIF')");

						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_bmhd.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',999,'"+this.e_periode.getText()+"','"+this.akunBMHD+"','"+this.app._kodePP+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'BEBAN')");		

						if (this.sg1.getRowValidCount() > 0){
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){													
									sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
											"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.e_periode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(5,i)+"','-','"+this.sg1.cells(2,i).toUpperCase()+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'TAMBAH')");									
								}
							}
						}		
					}	
					
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
										"('"+this.e_nb.getText()+"','PBBMHD','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
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
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PBBMHD','"+this.e_nb.getText()+"')");															
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
					this.sg1.clear(1); 
					this.sg2.clear(1);
					this.sg3.clear(1); 							
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
					this.pc2.setActivePage(this.pc2.childPage[0]);								
					setTipeButton(tbAllFalse);	
					this.doClick();		
					this.doLoad3();			
					this.isiBMHD();		
					if (this.stsSimpan==1) {
						this.isiCBnik();						
					}		
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";								
				this.sg1.validasi();	
				this.sgRek.validasi();	
				
				if (nilaiToFloat(this.e_totalRek.getText()) != nilaiToFloat(this.e_totalDC.getText())) {
					system.alert(this,"Nilai PB tidak valid.","Total PB dan Rekening tidak sama.");
					return false;
				}
				
				if (this.c_dana.getText() == "IFUND" && nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldoif.getText()) ) {
					system.alert(this,"Nilai tidak valid.","Nilai melebihi Saldo IF.");
					return false;
				}				
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Penyelesaian melebihi saldo.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Penyelesaian harus lebih besar nol.");
					return false;
				}

				if (nilaiToFloat(this.e_totalDC.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total PB harus lebih besar nol..");
					return false;
				}
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}						
					}	
					else {
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
							line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg1.cells(0,i) && this.sg1.cells(7,i) == "-") {		
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
								return false;						
							}
						}
					}									
				}				
				
				this.doHitungGar();								
				for (var i=0;i < this.sg2.getRowCount();i++){
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i))>0 && nilaiToFloat(this.sg2.cells(3,i)) < nilaiToFloat(this.sg2.cells(4,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"] , silahkan melakukan RRA dari menu anggaran");
								return false;						
							}							
						}
					}
				}

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);							
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_bayar where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_ver_m where no_bukti = '"+this.e_nb.getText()+"'");

					sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;		
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.isiBMHD();
			this.doLoad3();
		}
	},
	doChange: function(sender){
		try {		

			if (sender == this.c_dana && this.c_dana.getText()!="") { 
				if (this.c_dana.getText() == "PUSAT") {
					if (this.stsSimpan ==  1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));						
					if (this.cb_bmhd.getText()!="") {
						this.doChange(this.cb_bmhd);						
					}

					this.cb_if.hide();
					this.e_saldoif.hide();
					this.cb_rek.setTag("1");
				}
				if (this.c_dana.getText()=="IFUND") {
					if (this.stsSimpan ==  1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_aju_m","no_aju",this.app._lokasi+"-IFA"+this.e_periode.getText().substr(2,4)+".","0000"));						
					if (this.cb_if.getText()!="") {
						this.doChange(this.cb_if);						
					}

					this.cb_if.show();
					this.e_saldoif.show();
					this.cb_rek.setTag("9");
				}
			}

			if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();	

			if (sender == this.cb_bmhd && this.cb_bmhd.getText()!="") {
				var strSQL =  "select a.kode_vendor,c.nama,a.akun_hutang,a.nilai-isnull(b.bayar,0) as saldo,c.alamat,d.nu,a.kode_pp "+
							"from hutang_m a "+
							"inner join vendor c on a.kode_vendor=c.kode_vendor  "+
							"inner join vendor_rek d on c.kode_vendor=d.kode_vendor and d.status='1' "+
							"left join ("+
							"        select no_hutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar  "+
							"		   from hutang_bayar where kode_lokasi='"+this.app._lokasi+"' and no_bayar<>'"+this.e_nb.getText()+"' group by no_hutang,kode_lokasi "+
							"		   ) b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.cb_bmhd.getText()+"' ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.akunBMHD = line.akun_hutang;					
						this.kodeVendor = line.kode_vendor;	
						this.kodePPAkru = line.kode_pp;				
						this.e_vendor.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_akun.setText(line.akun_hutang);
						this.e_saldo.setText(floatToNilai(line.saldo));	

						this.cb_rek.setSQL("select nu, bank+'-'+cabang as bank from vendor_rek where kode_vendor='"+this.kodeVendor+"' ",["nu","bank"],false,["Kode","Bank"],"and","Data Rekening",true);
						if (this.stsSimpan == 1) {
							this.e_nilai.setText("0");	
							this.cb_rek.setText(line.nu);												
						}
					}
				}			
			}

			if (sender == this.e_nilai && this.e_nilai.getText()!="") {
				this.sg1.validasi();
			}

			if (sender == this.cb_rek && this.cb_rek.getText()!="" && this.stsSimpan==1) {
				var data = this.dbLib.getDataProvider("select * from vendor_rek a where nu="+this.cb_rek.getText()+" and kode_vendor='"+this.kodeVendor+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						// this.e_bank.setText(line.bank+' - '+line.cabang);
						// this.e_norek.setText(line.no_rek);
						// this.e_namarek.setText(line.nama_rek);
						this.e_banktrans.setText(line.bank_trans);						
						this.sgRek.clear();
						this.sgRek.appendData([this.e_vendor.getText(),line.bank,line.no_rek,line.nama_rek,"0"]);
					}
				}
			}

			if (sender == this.cb_if && this.cb_if.getText()!="") {
				var strSQL = "select a.nik_app,a.no_kas,a.nilai - isnull(b.pakai,0) as saldo, a.bank,a.no_rek,a.nama_rek,a.bank_trans  "+
							"from if_nik a "+

							"		left join  ("+						
							"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
							"			 from if_aju_m a "+
							"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
							"			 where b.no_reim is null and a.nik_if='"+this.cb_if.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju<>'"+this.e_nb.getText()+"' "+
							"			 group by a.nik_if,a.kode_lokasi "+												
							"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

							"where a.jenis='OPERASIONAL' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.nikIF = this.cb_if.getText();
						this.noKasOpen = line.no_kas;
						this.e_saldoif.setText(floatToNilai(line.saldo));	
						
						this.sgRek.clear();
						this.sgRek.appendData([line.nama_rek,line.bank,line.no_rek,line.nama_rek,"0"]);
						// this.e_bank.setText(line.bank);
						// this.e_banktrans.setText(line.bank_trans);
						// this.e_norek.setText(line.no_rek);
						// this.e_namarek.setText(line.nama_rek);
					}
				}
			}
		}
		catch(e) {
			alert(e)
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {								
					this.sg1.clear(1);	
					this.sgUpld.clear(1);
					this.sgFile.clear(1);			
					this.doLoad3();								
				}
				this.stsSimpan = 1;
				if (this.c_dana.getText() == "PUSAT") this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));						
				else this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_aju_m","no_aju",this.app._lokasi+"-IFA"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},		
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg1.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
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
		if (col == 7) {
			if (sender.cells(7,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama);
					else {						
						sender.cells(7,row,"-");
						sender.cells(8,row,"-");						
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange: function(){		
		try{
			var totDC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg1.cells(4,i));
				}
			}
			totDC += nilaiToFloat(this.e_nilai.getText());			
			this.e_totalDC.setText(floatToNilai(totDC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},	
	doChangeCellRek: function(sender, col, row){
		if (col == 4) this.sgRek.validasi();
	},
	doNilaiChangeRek: function(){		
		try{
			var totRek = 0;
			for (var i = 0; i < this.sgRek.getRowCount();i++){
				if (this.sgRek.rowValid(i) && this.sgRek.cells(4,i) != ""){
					totRek += nilaiToFloat(this.sgRek.cells(4,i));					
				}
			}			
			this.e_totalRek.setText(floatToNilai(totRek));

		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},		
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (this.sg1.cells(5,row) == "") {
						if (row == 0) this.sg1.setCell(5,row,this.app._kodePP);
						else {
							this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
							this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
						}
					}
				break;							
		}
	},		
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
							"select distinct a.kode_akun,a.nama from masakun a "+
							"	inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",

							"select count(*) from ("+
							"select distinct a.kode_akun,a.nama from masakun a "+
							"	inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') a",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					if (this.stsAdmin == "A") {
						var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
                    }
					else {
						var strPP = "select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}		
				if (col == 7) {								
					var vUnion = "";
					var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
							"select count(distinct a.kode_drk)  from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
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
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_yakes21_pbh_rptPb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); 	
			this.sg2.clear(1); 	
			this.sg3.clear(1); 				
			this.sgUpld.clear(1);
			this.sgFile.clear(1);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);		
			this.doClick();	
			this.doLoad3();
			this.isiBMHD();
			this.isiCBnik();		
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		try {																		
			this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
			var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,'PUSAT' as dana "+
						 "from pbh_pb_m a "+
						 "		inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+	
						 "		inner join hutang_bayar c on a.no_pb=c.no_bayar and c.modul='PBBMHD' "+	 
						 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "and a.modul = 'PBBMHD' and a.progress in ('0','V') "+
						
						 "union all "+
						 "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,'-' as no_dokumen,a.keterangan,a.nilai,'IFUND' as dana "+
						 "from if_aju_m a "+
						 "		inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+		 
						 "		inner join hutang_bayar c on a.no_aju=c.no_bayar and c.modul='IFUND' "+	 
						 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "and a.progress in ('0','R') and a.posted = 'X' "+

						 "order by no_pb desc";		

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);	
		}
		catch(e) {
			alert(e);
		}
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_pb,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.dana.toUpperCase(),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 6) this.doDoubleClick3(this.sg3,0,row); 				
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
				this.c_dana.setText(this.sg3.cells(5,row));
				this.doLoadCtt(this.e_nb.getText());				

				if (this.sg3.cells(5,row) == "PUSAT") {
					var strSQL = "select isnull(a.bank_trans,'X-MANDIRI') as bank_trans,b.nilai,a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_buat,a.nik_app,a.nik_ver,a.no_hutang, "+
								"        c.kode_vendor,c.nu,c.no_rek,c.bank,c.nama_rek,d.bank_trans "+
								"from pbh_pb_m a "+
								"inner join hutang_bayar b on a.no_pb=b.no_bayar and a.kode_lokasi=b.kode_lokasi "+								 
								"inner join pbh_rek c on a.no_pb=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
								"inner join vendor_rek d on c.kode_vendor=d.kode_vendor and c.nu=d.nu "+
								"where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_dok.setText(line.no_dokumen);
							this.cb_bmhd.setSQL("select a.no_hutang,a.keterangan from hutang_m a where a.no_hutang='"+line.no_hutang+"'",["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data BMHD",true);								
							this.cb_bmhd.setText(line.no_hutang);
							this.e_nilai.setText(floatToNilai(line.nilai));
							this.e_ket.setText(line.keterangan);						
							this.dp_d1.setText(line.tanggal);
							this.dp_d2.setText(line.due_date);
							this.cb_app.setText(line.nik_app);
							this.cb_buat.setText(line.nik_buat);
							this.cb_ver.setText(line.nik_ver);																							

							this.kodeVendor = line.kode_vendor;
							this.cb_rek.setText(line.nu);
							// this.e_bank.setText(line.bank);
							// this.e_norek.setText(line.no_rek);
							// this.e_namarek.setText(line.nama_rek);
							this.e_banktrans.setText(line.bank_trans);

							var strSQL1 = "select bank,nama,no_rek,nama_rek,bruto,pajak,bruto-pajak as netto "+
										"from pbh_rek where no_bukti ='"+this.e_nb.getText()+"' ";
							var data = this.dbLib.getDataProvider(strSQL1,true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sgRek.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];																		
									this.sgRek.appendData([line.nama,line.bank,line.no_rek,line.nama_rek,floatToNilai(line.netto)]);
								}
							} else this.sgRek.clear(1);	
							this.sgRek.validasi();
							
						}
					}								
					
					var data = this.dbLib.getDataProvider(
								"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								"from pbh_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+		
								"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																				
								"where a.jenis='TAMBAH' and a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);							
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg1.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					} else this.sg1.clear(1);	
				}
				else {

					var strSQL = "select b.nilai,a.keterangan,a.tanggal,a.user_input,a.nik_app,a.nik_setuju,b.no_hutang,a.nik_if,c.no_kas "+								
								"from if_aju_m a "+
								"inner join hutang_bayar b on a.no_aju=b.no_bayar and a.kode_lokasi=b.kode_lokasi "+								 
								"inner join if_nik c on a.nik_if=c.nik and  a.kode_lokasi=c.kode_lokasi and c.flag_aktif='1' and c.jenis='OPERASIONAL' "+								
								"where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
												
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_dok.setText("-");
							this.cb_bmhd.setSQL("select a.no_hutang,a.keterangan from hutang_m a where a.no_hutang='"+line.no_hutang+"'",["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data BMHD",true);								
							this.cb_bmhd.setText(line.no_hutang);
							this.e_nilai.setText(floatToNilai(line.nilai));
							this.e_ket.setText(line.keterangan);						
							this.dp_d1.setText(line.tanggal);
							this.dp_d2.setText(line.tanggal);

							this.cb_app.setText(line.nik_ver);
							this.cb_buat.setText(line.user_input);
							this.cb_ver.setText(line.nik_setuju);								
							this.cb_if.setText(line.nik_if);

							this.nikIF = this.cb_if.getText();
							this.noKasOpen = line.no_kas;
							

						}
					}	

					var data = this.dbLib.getDataProvider(
								"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								"from if_aju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+		
								"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																				
								"where a.jenis='TAMBAH' and a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);							
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg1.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					} else this.sg1.clear(1);	
				}
				
				this.sg1.validasi();

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
		
			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
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
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' "+
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