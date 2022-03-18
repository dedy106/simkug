window.app_saku3_transaksi_tu_proyekbaru_fAjuHonor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fAjuHonor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fAjuHonor";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Beban Honor NTF", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pegajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],												
					readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data by PP",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150});				
		this.e_bruto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,202,20],caption:"Bruto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_user = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,300,20],caption:"User input", maxLength:50});								
		this.e_netto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,202,20],caption:"Netto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,305], childPage:["Data Honor", "Detail Honor","Pesan Error","File Dokumen"]});		
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Nama Perusahaan", maxLength:100});								
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Alamat", maxLength:200});								
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"NPWP", maxLength:50});										
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,222,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_pdpt = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,222,20],caption:"MTA Pendptan",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_drkp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,222,20],caption:"DRK Pendptan",tag:1,multiSelection:false});         				
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,222,20],caption:"MTA Beban",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,222,20],caption:"DRK Beban",tag:1,multiSelection:false,change:[this,"doChange"]});         				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,202,20],caption:"Saldo Budget TW", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
				colTitle:["ID Dosen","Bruto","Pot. Pajak","Inst. Fee", "Netto","Berita","Nama Dosen","Rekening"],
				colWidth:[[7,6,5,4,3,2,1,0],[250,200,200,100,100,100,100,80]],
				columnReadOnly:[true,[2,3,4,5,6,7],[0,1]],				
				colFormat:[[1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[5,5,400,295],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
		colTitle:["namaFile","status"],
		colWidth:[[1,0],[80,180]],
		readOnly: true,autoAppend:false,defaultRow:1});

		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							  "where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);									
			this.cb_pp.setText(this.app._kodePP);

			this.e_user.setText(this.app._namaUser);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);					
			
			this.cb_pdpt.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('022') "+				
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fAjuHonor.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fAjuHonor.implement({	
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
					"select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
					"select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
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
	doAfterPaste: function(sender,totalRow){	
		try {						
			var totBruto = totNetto = 0;			
			var err = 0;
			var msg  = ""; this.e_memo.setText("");
			for (var i=0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i)){
					var data = this.dbLib.getDataProvider("select nama,bank+' - '+cabang+' - '+no_rek+' - '+nama_rek as rekening from it_dosen where kode_dosen='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {
							var pajak = Math.round(nilaiToFloat(this.sg1.cells(1,i)) * 0.05); 
							if (nilaiToFloat(this.sg1.cells(1,i)) > 5000000) var fee = Math.round((nilaiToFloat(this.sg1.cells(1,i)) - pajak) * 0.075); 
							else var fee = 0;
							this.sg1.cells(2,i,pajak);
							this.sg1.cells(3,i,fee);

							var neto = nilaiToFloat(this.sg1.cells(1,i)) - nilaiToFloat(this.sg1.cells(2,i)) - nilaiToFloat(this.sg1.cells(3,i));
							this.sg1.cells(4,i,neto);							
							this.sg1.cells(6,i,line.nama);							
							this.sg1.cells(7,i,line.rekening);
							totBruto += nilaiToFloat(this.sg1.cells(1,i));
							totNetto += nilaiToFloat(this.sg1.cells(4,i));
						}
						else {							
							err = 1;
							msg+= this.sg1.cells(0,i)+"\n";											
						}
					}				
				}
			}
			this.e_memo.setText(msg);			
			
			if (err == 1) {			
				var j = i+1;
				system.alert(this,"Data Dosen tidak valid.","Lihat Tab Pesan Error.");
				this.sg1.clear(1);
				this.e_bruto.setText("0");
				this.e_netto.setText("0");			
				return false;
			}
			
			this.e_bruto.setText(floatToNilai(totBruto));
			this.e_netto.setText(floatToNilai(totNetto));			
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {			
			if (this.sg1.cells(0,row) != "") {							
				var data = this.dbLib.getDataProvider("select nama,bank+' - '+cabang+' - '+no_rek+' - '+nama_rek as rekening from it_dosen where kode_dosen='"+this.sg1.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {
						this.sg1.cells(6,row,line.nama);							
						this.sg1.cells(7,row,line.rekening);						
					}
					else {							
						this.sg1.cells(0,row,"");													
					}
				}	
			}
		}
		if (col == 1) {	
			var pajak = Math.round(nilaiToFloat(this.sg1.cells(1,row)) * 0.05); 
			if (nilaiToFloat(this.sg1.cells(1,row)) > 5000000) var fee = Math.round((nilaiToFloat(this.sg1.cells(1,row)) - pajak) * 0.075); 
			else var fee = 0;
			this.sg1.cells(2,row,pajak);
			this.sg1.cells(3,row,fee);

			var neto = nilaiToFloat(this.sg1.cells(1,row)) - nilaiToFloat(this.sg1.cells(2,row)) - nilaiToFloat(this.sg1.cells(3,row));
			this.sg1.cells(4,row,neto);							
						
			var totBruto = nilaiToFloat(this.sg1.cells(1,row));
			var totNetto = nilaiToFloat(this.sg1.cells(4,row));

			this.e_bruto.setText(floatToNilai(totBruto));
			this.e_netto.setText(floatToNilai(totNetto));			
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
						sql.add("delete from it_honorntf_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_honorntf_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
						sql.add("delete from it_honorntf_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
					}
					
					sql.add("insert into it_honorntf_m (no_bukti,tanggal,periode,kode_lokasi,tgl_input,nik_user,vendor,alamat,npwp,keterangan,user_input,nik_app,kode_pp,kode_akun,kode_drk,akun_pdpt,kode_drkp,bruto,neto,no_kas,no_agenda) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_vendor.getText()+"','"+this.e_alamat.getText()+"','"+this.e_npwp.getText()+"','"+this.e_ket.getText()+"','"+this.e_user.getText()+"','"+this.cb_app.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_drkp.getText()+"',"+nilaiToFloat(this.e_bruto.getText())+","+nilaiToFloat(this.e_netto.getText())+",'-','-')");

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into it_honorntf_rek(no_bukti,kode_lokasi,kode_dosen,bruto,pajak,fee,neto,berita,nama_dosen,rekening) values "+
								        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(1,i))+","+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(7,i)+"')");
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
							sql.add("insert into it_honorntf_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','NTFHONOR','"+this.e_nb.getText()+"')");															
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
					setTipeButton(tbSimpan);
					this.sg1.clear(1);
					this.sg3.clear(1);
				break;
			case "simpan" :									
			case "ubah" :																					
				if (nilaiToFloat(this.e_netto.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_honorntf_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_honorntf_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_honorntf_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																												
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;		
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);				
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_honorntf_m","no_bukti",this.app._lokasi+"-NHR"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_app.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if ((sender == this.cb_pp ||sender == this.e_periode ||sender == this.cb_pdpt)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="" && this.cb_pdpt.getText() !="") {
			this.cb_drkp.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_pdpt.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);					
		}
		if ((sender == this.cb_pp ||sender == this.e_periode)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="") {
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.cb_pp.getText()+"' and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
									"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
			if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);											
			else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"where","Data DRK",true);											
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				var sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_saldo.setText(floatToNilai(sls));				
			}
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

							// this.nama_report="server_report_saku2_kopeg_kbitt_rptHonorTu";
							// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
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
						}else system.info(this,result,"");
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
			setTipeButton(tbSimpan);
			this.sg1.clear(1);this.sg3.clear(1);
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);																		
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti, convert(varchar,a.tanggal,103) as tgl, a.keterangan, a.bruto as nilai "+
					 "from it_honorntf_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik = '"+this.app._userLog+"' "+
					 "where a.no_kas ='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
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
								
				var strSQL = "select * from it_honorntf_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.cb_pp.setText(line.kode_pp);				
						this.dp_d1.setText(line.tanggal);
						this.cb_app.setText(line.nik_app);
						this.e_ket.setText(line.keterangan);						
						this.e_user.setText(line.keterangan);						
						this.e_vendor.setText(line.vendor);						
						this.e_alamat.setText(line.alamat);						
						this.e_npwp.setText(line.npwp);						

						this.cb_pdpt.setText(line.akun_pdpt);
						this.cb_drkp.setText(line.kode_drkp);	
						this.cb_akun.setText(line.kode_akun);												
						this.cb_drk.setText(line.kode_drk);					
						
					} 
				}	

				var strSQL = "select * from it_honorntf_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					var totBruto = totNetto = 0;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						totBruto += parseFloat(line.bruto);
						totNetto += parseFloat(line.neto);
						this.sg1.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.fee),floatToNilai(line.neto),line.berita,line.nama_dosen,line.rekening]);
					}
				} else this.sg1.clear(1);											
				this.e_bruto.setText(floatToNilai(totBruto));
				this.e_netto.setText(floatToNilai(totNetto));	
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from it_honorntf_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
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
	}
	
});