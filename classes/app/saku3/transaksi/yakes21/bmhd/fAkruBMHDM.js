window.app_saku3_transaksi_yakes21_bmhd_fAkruBMHDM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_bmhd_fAkruBMHDM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_bmhd_fAkruBMHDM";		
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru BMHD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});						
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,200,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],
					readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Batch",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,350,20],caption:"No Dokumen", maxLength:50});						
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Data Mitra", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.cb_bmhd = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Akun Hutang", multiSelection:false, maxLength:10, tag:2});			
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});												
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total BMHD", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,282], childPage:["Item BMHD","Controlling","File Dok"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Deskripsi","Nilai","Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,350]],	
					columnReadOnly:[true,[3,5,7],[0,1,2,4,5,6]],
					buttonStyle:[[2,4,6],[bsEllips,bsEllips,bsEllips]], 
					colFormat:[[1],[cfNilai]],checkItem: true,
					pasteEnable: true,
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,200,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[965,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});

		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
						
			this.cb_bmhd.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag in ('004') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Titipan",true);			
			this.cb_vendor.setSQL("select a.kode_vendor,a.nama from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi where b.kode_klpvendor='100'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");																	
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_bmhd_fAkruBMHDM.extend(window.childForm);
window.app_saku3_transaksi_yakes21_bmhd_fAkruBMHDM.implement({		
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
					"select kode_jenis, nama  from pbh_dok_ver ", 
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
                if (this.sg1.rowValid(i) && this.sg1.cells(1,i) != "0" && this.sg1.cells(6,i) != "-"){              
                    nilai = nilaiToFloat(this.sg1.cells(1,i));
                    
                    var isAda = false;
                    var idx = total = 0;
                    for (var j=0;j < this.sg2.getRowCount();j++){
                        if (this.sg1.cells(2,i) == this.sg2.cells(0,j) && this.sg1.cells(4,i) == this.sg2.cells(2,j) && this.sg1.cells(6,i) == this.sg2.cells(4,j) ) {
                            isAda = true;
                            idx = j;
                            break;
                        }
                    }
                    if (!isAda) {
                        this.sg2.appendData([this.sg1.cells(2,i),this.sg1.cells(3,i),this.sg1.cells(4,i),this.sg1.cells(5,i),this.sg1.cells(6,i),this.sg1.cells(7,i),"0",floatToNilai(nilai)]);
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
						sql.add("delete from angg_r where no_bukti in (select no_hutang from hutang_m where no_ref='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");												
						sql.add("delete from hutang_j where no_hutang in (select no_hutang from hutang_m where no_ref='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') ");	
						sql.add("delete from hutang_m where no_ref = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_batch where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					var fBukti = this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_m","no_hutang",this.app._lokasi+"-HU"+this.e_periode.getText().substr(2,4)+".","0000");						
					var idx = parseFloat(fBukti.substr(10,4));
					var fBukti = fBukti.substr(0,10);

					sql.add("insert into hutang_batch(no_batch,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_dokumen,kode_vendor,nik_app,akun_hutang,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_dok.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_app.getText()+"','"+this.cb_bmhd.getText()+"',"+nilaiToFloat(this.e_total.getText())+")");

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								var k = idx+i;
								var j = k.toString();
								if (j.length == 1) var nu = "000"+j;
								if (j.length == 2) var nu = "00"+j;
								if (j.length == 3) var nu = "0"+j;
								if (j.length == 4) var nu = j;
								
								var nbhut = fBukti + nu;
								sql.add("insert into hutang_m (no_hutang, kode_lokasi, no_dokumen, tanggal, keterangan, kode_vendor, kode_curr, kurs, nik_app, kode_pp, nilai, periode, nik_user, tgl_input, akun_hutang, posted, nilai_ppn, modul, no_ref, dc) values "+
										"('"+nbhut+"', '"+this.app._lokasi+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', '"+this.sg1.cells(0,i)+"', '"+this.cb_vendor.getText()+"', 'IDR', 1, '"+this.cb_app.getText()+"', '"+this.sg1.cells(4,i)+"', "+parseNilai(this.sg1.cells(1,i))+", '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '"+this.cb_bmhd.getText()+"', 'F', 0, 'BMHD', '"+this.e_nb.getText()+"','D')")
								
								sql.add("insert into hutang_j (no_hutang, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input) values "+
										"('"+nbhut+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', "+i+", '"+this.sg1.cells(2,i)+"', '"+this.sg1.cells(0,i)+"', 'D', 'IDR', 1, "+nilaiToFloat(this.sg1.cells(1,i))+", "+nilaiToFloat(this.sg1.cells(1,i))+", '"+this.sg1.cells(4,i)+"', '"+this.sg1.cells(6,i)+"', '"+this.app._lokasi+"', 'BMHD', 'BEBAN', '"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								sql.add("insert into hutang_j (no_hutang, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input) values "+
										"('"+nbhut+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', "+i+", '"+this.cb_bmhd.getText()+"', '"+this.sg1.cells(0,i)+"', 'C', 'IDR', 1, "+nilaiToFloat(this.sg1.cells(1,i))+", "+nilaiToFloat(this.sg1.cells(1,i))+", '"+this.sg1.cells(4,i)+"', '-', '"+this.app._lokasi+"', 'BMHD', 'BMHD', '"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+nbhut+"','BMHD','"+this.app._lokasi+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+parseNilai(this.sg1.cells(1,i))+")");
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
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','BMHD','"+this.e_nb.getText()+"')");															
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
					this.sg1.clear(1); this.sg2.clear(1); 	
					this.sgUpld.clear(1);
					this.sgFile.clear(1);							
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :																														
				this.preView = "1";								
				this.sg1.validasi();	

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

				
				this.sg1.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				this.doHitungGar();
								
				for (var i=0;i < this.sg2.getRowCount();i++){
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i) && nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}
									
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																									
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total BMHD tidak boleh kurang atau sama dengan nol.");
					return false;						
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from angg_r where no_bukti in (select no_hutang from hutang_m where no_ref='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");												
					sql.add("delete from hutang_j where no_hutang in (select no_hutang from hutang_m where no_ref='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') ");	
					sql.add("delete from hutang_m where no_ref = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_batch where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		try{
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}		
			if (this.stsSimpan == 1) {
				this.doClick();							
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {					
					this.sg1.clear(1); this.sg2.clear(1); 
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_batch","no_batch",this.app._lokasi+"-BC"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}	
		}
		catch(e) {
			alert(e);
		}	
	},	
	doChangeCell1: function(sender, col, row){
		if (col == 1 && this.sg1.cells(1,row) != "") this.sg1.validasi();
		sender.onChange.set(undefined,undefined);	

		if (col == 2) {
			if (this.sg1.cells(2,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(2,row));				
				if (akun) sender.cells(3,row,akun);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Akun "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		
		if (col == 4) {
			if (this.sg1.cells(4,row) != "") {
				var pp = this.dataPP.get(sender.cells(4,row));
				if (pp) sender.cells(5,row,pp);
				else {
					if (trim(sender.cells(4,row)) != "") system.alert(this,"Kode PP "+sender.cells(4,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(4,row,"");
					sender.cells(5,row,"");
				}				
			}
		}		
		if (col == 6) {
			if (this.sg1.cells(6,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join angg_r b on a.kode_drk=b.kode_drk where b.modul='RELEASE' and a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(2,row)+"' and b.kode_pp = '"+this.sg1.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where b.modul='RELEASE' and a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(2,row)+"' and b.kode_pp = '"+this.sg1.cells(4,row)+"' and b.kode_drk = '"+this.sg1.cells(6,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg1.cells(7,row,line.nama);
					else {
						if (!isAda) this.sg1.cells(7,row,"-");
						else {
							this.sg1.cells(6,row,"");
							this.sg1.cells(7,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange1: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(1,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(1,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 4){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
							"select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}							
				if (col == 6){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(2,row)+"' and b.kode_pp = '"+this.sg1.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(2,row)+"' and b.kode_pp = '"+this.sg1.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE'",
							"select count(*) from (select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(2,row)+"' and b.kode_pp = '"+this.sg1.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE') x",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
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
								// this.nama_report="server_report_saku3_tu_bmhd_rptBuktiJurnalHU";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
			this.sg1.clear(1); this.sg2.clear(1); 	
			this.sgUpld.clear(1);
			this.sgFile.clear(1);							
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);	
			this.doClick();				
		} catch(e) {
			alert(e);
		}
	},

	doLoad3:function(sender){																		
		var strSQL = "select no_batch,convert(varchar,tanggal,103) as tgl,no_dokumen,nilai "+
					 "from hutang_batch where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"'";		
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
			this.sg3.appendData([line.no_batch,line.tgl,line.no_dokumen,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) {
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
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
								
				var strSQL = "select * from hutang_batch where no_batch='"+this.e_nb.getText()+"'";	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_dok.setText(line.no_dokumen);						
						this.dp_d1.setText(line.tanggal);
						this.cb_vendor.setText(line.kode_vendor);	
						this.cb_bmhd.setText(line.akun_hutang);						
						this.cb_app.setText(line.nik_app);						
					}
				}	
				
				var strSQL = "select a.keterangan,a.nilai,b.kode_akun,c.nama as nama_akun,b.kode_pp,d.nama as nama_pp,b.kode_drk,isnull(e.nama,'-') as nama_drk "+
							 "from hutang_m a inner join hutang_j b on a.no_hutang=b.no_hutang and b.jenis='BEBAN' "+
							 "				  inner join masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi=b.kode_lokasi "+
							 "				  inner join pp d on b.kode_pp=d.kode_pp and d.kode_lokasi=b.kode_lokasi "+
							 "				  inner join drk e on b.kode_drk=e.kode_drk and e.kode_lokasi=b.kode_lokasi and substring(b.periode,1,4)=e.tahun "+
							 "where a.no_ref='"+this.e_nb.getText()+"' order by a.no_hutang";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.keterangan,floatToNilai(line.nilai),line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg1.clear(1);	

			}									
		} catch(e) {alert(e);}
	}
	
});