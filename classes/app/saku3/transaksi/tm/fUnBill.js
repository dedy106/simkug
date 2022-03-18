window.app_saku3_transaksi_tm_fUnBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fUnBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fUnBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form UnBilling", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Akru","List Akru"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Customer","No PKS","Deskripsi","Total","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,250,150,150,80,100]],
					colFormat:[[5,6],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[550,12,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],visible:false});
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});				
		this.cb_cust2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Cutomer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	        
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		
        this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,15,996,328], childPage:["Data Ref","Detail Akru","Dokumen Upload"]});	        
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
        this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});	
        this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});	
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Deskripsi","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,250,60,200,80]],
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]],
					picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					ellipsClick:[this,"doEllipsClick2"],
					defaultRow:1,autoAppend:true});
        this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});	
        
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","Download"],
					colWidth:[[4,3,2,1,0],[80,80,400,200,80]], 
					colFormat:[[3,4],[cfUpload,cfButton]], buttonStyle:[[0],[bsEllips]], 
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,rowCount:1,change:[this,"doGridChange"],tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
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
			this.stsSimpan = 1;		
			
			var sql = new server_util_arrayList();			
			sql.add("select a.kode_akun,a.nama from masakun a "+
					"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+					
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif='1' and a.kode_lokasi = '"+this.app._lokasi+"'");						
            this.dbLib.getMultiDataProviderA(sql);
	   
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);            
            this.cb_cust2.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
            this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '003' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);
            this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
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
window.app_saku3_transaksi_tm_fUnBill.extend(window.childForm);
window.app_saku3_transaksi_tm_fUnBill.implement({	
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
						sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
                        sql.add("delete from bill_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
                        sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
                        sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
                        sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into bill_m(no_bill,no_dokumen,no_ba,no_faktur,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ppn,kode_cust,no_kontrak,kode_pp,nik_buat,nik_app,jabatan,kode_lokasi,periode,nik_user,tgl_input,bank,cabang,no_rek,nama_rek,draft,nama_bill,kode_rek,no_kuitansi,no_piutang,progress,no_app,modul,akun_piutang) values "+
                            "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",0,'"+this.cb_cust2.getText()+"','-','"+this.app._kodePP+"','"+this.app._userLog+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','-','-','-','-','-','-','-','"+this.e_nb.getText()+"','X','-','UNBILL','"+this.cb_akun.getText()+"')");		
					sql.add("insert into piutang_d(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_cust,kode_curr,kurs,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,nilai_ppn,nilai_pph,no_fp,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_cust2.getText()+"','IDR',1,'"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"',0,0,'-','UNBILL')");		
		
					var vPosted = "F";		

                    sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','UNBILL','"+vPosted+"','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
                            parseNilai(this.e_nilai.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_cust2.getText()+"','"+this.cb_akun.getText()+"','-')");                    
                    sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_nilai.getText())+","+
							parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','AR','PIUTANG','IDR',1,'"+this.cb_pp.getText()+"','-','"+this.cb_cust2.getText()+"','-','-','-','-','-','-')");					
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){	
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+
                                        parseNilai(this.sg2.cells(4,i))+",'"+this.sg2.cells(3,i)+"','AR','PDPT','IDR',1,'"+this.sg2.cells(5,i)+"','-','-','-','-','-','-','-','-')");	                                
							}
						}
					}
                    
                    var ix=0;                    
                    for (var i=0;i < this.sgUpld.getRowCount();i++){
                        if (this.sgUpld.rowValid(i)){
                            ix++;											
                            sql.add("insert into bill_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_kontrak) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','UNBILL','-')");
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
					this.sg2.clear(1); 
					this.sg3.clear(1); 
                    this.sgUpld.clear(1);
					this.doClick();
				break;
			case "simpan" :	
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.preView = "1";
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
				else this.simpan();
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
                	this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
                    }                    
					sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from bill_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	                
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();				
    },
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doClick:function(sender){	
		if (this.e_periode.getText()!="") {	
			if (this.stsSimpan == 0) {					
				this.sg2.clear(1); 
				this.sg3.clear(1); 
                this.sgUpld.clear(1);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bill_m","no_bill",this.app._lokasi+"-UBL"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.cb_cust2.setFocus();			
			setTipeButton(tbSimpan);						
		}
	},
	doChange:function(sender){
		if (sender == this.e_nilai && this.e_nilai.getText()!=""){
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())));
		}							
	},	
	doChangeCell2: function(sender, col, row){
		try {
		if (col == 4) this.sg2.validasi();
		
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
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

		sender.onChange.set(this,"doChangeCell2");	
		}
		catch(e) {
   			alert(e);		  
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
    doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg2.cells(2,row) == ""){
						this.sg2.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg2.cells(3,row) == ""){
						if (row == 0) this.sg2.setCell(3,row,this.e_ket.getText());
						else this.sg2.setCell(3,row,this.sg2.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg2.cells(5,row) == "") && (row > 0)) {
						this.sg2.setCell(5,row,this.sg2.cells(5,(row-1)));
						this.sg2.setCell(6,row,this.sg2.cells(6,(row-1)));
					}
					else {
						this.sg2.setCell(5,row,this.app._kodePP);
						this.sg2.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
                    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
                    		"select a.kode_akun,a.nama from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+					
							"where a.block= '0' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+					
							"where a.block= '0' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
                }
                if (col == 5){
                    this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
                            "select a.kode_pp,a.nama from pp a  where a.flag_aktif='1' and a.kode_lokasi = '"+this.app._lokasi+"'",
                            "select count(*) from pp a where a.flag_aktif='1' and a.kode_lokasi = '"+this.app._lokasi+"'",
                            ["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
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
                                if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
                                if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
                                			
								this.nama_report="server_report_saku3_travel_rptPiutangJurnal";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";							
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
							}else{
                                if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
								this.app._mainForm.bClear.click();
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
			this.sg2.clear(1); 
			this.sg3.clear(1); 			
			this.sgUpld.clear(1); 
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){			
		var vPosted = "F";		

		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,b.nama as cust,a.no_dokumen as no_dok,a.keterangan,a.nilai+a.nilai_ppn as total "+
		             "from bill_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "				inner join trans_m d on a.no_bill=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.posted='"+vPosted+"' "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='UNBILL' ";						
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
			this.sg3.appendData([line.no_bill,line.tgl,line.cust,line.no_dok,line.keterangan,floatToNilai(line.total),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doNilaiChange2: function(){
		try{			
			var tot = 0;
			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i) == "C") tot += nilaiToFloat(this.sg2.cells(4,i));										
					if (this.sg2.cells(2,i) == "D") tot -= nilaiToFloat(this.sg2.cells(4,i));										
				}
			}	
			
			this.e_nilai.setText(floatToNilai(tot));						
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
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
								
				var strSQL = "select a.tanggal,a.kode_cust,a.no_kontrak,a.no_dokumen,a.keterangan,a.no_ba,a.no_faktur,a.nilai,a.nilai_ppn,a.nik_app,a.jabatan,a.bank,a.cabang,a.no_rek,a.nama_rek,a.draft,a.kode_rek,a.nama_bill,a.no_kuitansi,b.param2,b.kode_pp "+
                             "from bill_m a "+
                             "inner join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_cust2.setText(line.kode_cust);											
						//this.cb_kontrak.setText(line.no_kontrak);										
                        this.cb_pp.setText(line.kode_pp);
						this.cb_akun.setText(line.param2);
						this.e_nilai.setText(floatToNilai(line.nilai));																	
					} 
				}

				var strSQL = "select a.kode_akun,a.kode_pp,b.nama as nama_akun,a.dc,c.nama as nama_pp,a.keterangan,a.nilai  "+
                             "from trans_j a "+
                             "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							 
							 "where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.nu";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg2.clear(1);			
				this.sg2.validasi();
                
                this.sgUpld.clear();
                this.deleteFiles = [];
				this.listFiles = new arrayMap();
                var strSQL= "select b.kode_jenis,b.nama,a.no_gambar "+
                			"from bill_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
                			"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";

                var data = this.dbLib.getDataProvider(strSQL,true);
                if (typeof data == "object" && data.rs.rows[0] != undefined){
                    var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
					}
                } else this.sgUpld.clear(1);
			}									
		} catch(e) {alert(e);}
    },
    doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4)
				window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
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
    }
});
