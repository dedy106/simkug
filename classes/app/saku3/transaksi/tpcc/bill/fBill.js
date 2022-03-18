window.app_saku3_transaksi_tpcc_bill_fBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tpcc_bill_fBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tpcc_bill_fBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["No Bill","Tanggal","Customer","No PKS","Deskripsi","Total","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,250,150,200,80,100]],
					colFormat:[[5,6],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bill",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,12,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_nokwi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Kuitansi", tag:1, tipeText:ttNilai, text:"0"});
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,13,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.i_ppn = new portalui_imageButton(this.pc2.childPage[0],{bound:[977,13,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,14,200,20],caption:"Tot Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,15,996,328], childPage:["Data Billing","Detail Billing","Dokumen Upload","Cattn. Memo"]});						
		this.e_namabill = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Atensi Bill", maxLength:50});		
		this.cb_kontrak = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"ID Kontrak", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Tanggal PKS", readOnly:true});		
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[240,13,100,20],labelWidth:0,caption:"", readOnly:true});		
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Saldo PKS", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ba = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Keterangan Bayar", maxLength:200});	
		
		this.l_tgl12 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,12,100,18]}); 		
		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_jabatan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,300,20],caption:"Jabatan", maxLength:50});				
		this.cb_rek = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Bank/Cabang", maxLength:50});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[225,15,240,20],caption:"", maxLength:50,labelWidth:0});		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,300,20],caption:"No Rekening", maxLength:50});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,300,20],caption:"Nama Rekening", maxLength:50});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["Deskripsi","Harga Satuan","Jumlah Peserta","Total"],
					colWidth:[[3,2,1,0],[100,100,100,350]],
					columnReadOnly:[true,[3],[0,1,2]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],					
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					ellipsClick:[this,"doEllipsClick2"],
					defaultRow:1,autoAppend:true});
        this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});	
        
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","Download"],
					colWidth:[[4,3,2,1,0],[80,80,400,200,80]], 
					colFormat:[[3,4],[cfUpload,cfButton]], buttonStyle:[[0],[bsEllips]], 
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,rowCount:1,change:[this,"doGridChange"],tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.sgctt = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
		    this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
            
            this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);					
			this.cb_rek.setSQL("select kode_rek, nama_rek from bill_spro where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama_rek"],false,["Kode","Nama"],"and","Data Rekening",true);					
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);														
			
			this.doLoadCtt(this.e_nb.getText());
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tpcc_bill_fBill.extend(window.childForm);
window.app_saku3_transaksi_tpcc_bill_fBill.implement({
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
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}
						sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
					sql.add("insert into bill_m(no_bill,no_dokumen,no_ba,no_faktur,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ppn,kode_cust,no_kontrak,kode_pp,nik_buat,nik_app,jabatan,kode_lokasi,periode,nik_user,tgl_input,bank,cabang,no_rek,nama_rek,draft,nama_bill,kode_rek,no_kuitansi,no_piutang,progress,no_app,modul,tgl_mulai,tgl_selesai) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_ba.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_cust.getText()+"','"+this.cb_kontrak.getText()+"','"+this.app._kodePP+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.e_jabatan.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','-','"+this.e_namabill.getText()+"','"+this.cb_rek.getText()+"','"+this.e_nokwi.getText()+"','-','0','-','BILL','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')");								 
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																			
								sql.add("insert into bill_d(no_bill,kode_lokasi,nu,item,harga,jumlah) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(1,i))+","+nilaiToFloat(this.sg2.cells(2,i))+")");
							}
						}						
                    }
                    
                    var ix=0;                   
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;											
							sql.add("insert into bill_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_kontrak) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','BILL','"+this.cb_kontrak.getText()+"')");
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
				this.preView = "1";				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh melebihi saldo.");
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
				                    
				sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("delete from bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("delete from bill_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

				this.deletedFiles = "";	
				for (var i=0;i < this.sgUpld.getRowCount();i++){
					if (this.sgUpld.rowValid(i)){
						if (this.deletedFiles != "") this.deletedFiles += ";";
						this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
					}
				}

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
		if (this.stsSimpan==0) {
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.sgUpld.clear(1);
		}
		if (this.e_periode.getText()!="") {
			this.stsSimpan = 1;			
			var AddFormat = "/"+"TPCC/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(2,2);			
			var data = this.dbLib.getDataProvider("select isnull(max(no_bill),0) as no_bill from bill_m where no_bill like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_bill == "0") this.e_nb.setText("001"+AddFormat);
					else {
						var idx = parseFloat(line.no_bill.substr(0,4)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(nu+AddFormat);						
					}
				} 
			}
			this.e_nokwi.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bill_m","no_kuitansi","A"+this.e_periode.getText().substr(2,2),"000"));
			this.cb_cust.setFocus();		
			setTipeButton(tbSimpan);					
		}
	},
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {			
			var ppn = Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1);	
			this.e_ppn.setText(floatToNilai(ppn));
			this.sg.validasi();			
		}		
	},
	doChange:function(sender){
		try {
			if ((sender == this.e_nilai || sender == this.e_ppn) && this.e_nilai.getText()!="" && this.e_ppn.getText()!=""){			
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
			}

			if (sender == this.cb_rek && this.cb_rek.getText() != "" && this.stsSimpan==1) {
				var sql="select a.bank,a.cabang,a.no_rek,a.nama_rek "+
						"from bill_spro a "+					
						"where a.kode_rek='"+this.cb_rek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					this.e_bank.setText(line.bank);
					this.e_cabang.setText(line.cabang);
					this.e_norek.setText(line.no_rek);
					this.e_namarek.setText(line.nama_rek);				
				}
			}		

			if (sender == this.cb_cust && this.cb_cust.getText() != "" && this.stsSimpan==1) {
				this.cb_kontrak.setSQL("select a.no_kontrak, a.no_dok "+
									"from kontrak_m a "+
									"	 left join ("+
									"     	select kode_lokasi,no_kontrak,sum(nilai) as bill "+
									"		from bill_m where kode_lokasi='"+this.app._lokasi+"' and no_bill<>'"+this.e_nb.getText()+"' "+
									"		group by kode_lokasi,no_kontrak "+
									"		) b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
									"where (a.nilai-isnull(b.bill,0)) > 0 and a.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_kontrak","no_dok"],false,["ID","No Dokumen"],"and","Data PKS",true);														
				if (this.stsSimpan==1) this.e_namabill.setText(this.cb_kontrak.rightLabelCaption);
			}

			if (sender == this.cb_kontrak && this.cb_kontrak.getText() != "") {			
				var strSQL = "select a.keterangan,convert(varchar,a.tgl_awal,103) as tgl_awal,convert(varchar,a.tgl_akhir,103) as tgl_akhir,(a.nilai-isnull(b.bill,0)) as saldo "+
							"from kontrak_m a "+
							"		left join ("+
							"              select kode_lokasi,no_kontrak,sum(nilai) as bill "+
							"				from bill_m where kode_lokasi='"+this.app._lokasi+"' and no_bill<>'"+this.e_nb.getText()+"' "+
							"				group by kode_lokasi,no_kontrak "+
							"		) b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"where (a.nilai+a.nilai_ppn-isnull(b.bill,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kontrak='"+this.cb_kontrak.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_tgl1.setText(line.tgl_awal);
						this.e_tgl2.setText(line.tgl_akhir);
						this.e_ket.setText(line.keterangan);
						this.e_saldo.setText(floatToNilai(line.saldo));							
					}				
				}			
			}
			
			if (sender == this.cb_app && this.cb_app.getText() != "") {
				var strSQL = "select jabatan from karyawan where nik='"+this.cb_app.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_jabatan.setText(line.jabatan);					
					}				
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doChangeCell2: function(sender, col, row){		
		if (col == 1 || col == 2) {
			if (this.sg2.cells(1,row) != "" && this.sg2.cells(2,row) != "" ) {
			    var tot = Math.round(nilaiToFloat(this.sg2.cells(1,row)) * nilaiToFloat(this.sg2.cells(2,row)));
				this.sg2.cells(3,row,floatToNilai(tot));
			}
			this.sg2.validasi();
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1") {					                                			
								this.nama_report="server_report_saku3_tpcc_bill_rptBillGabung";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";							
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
                                this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
								this.app._mainForm.bClear.click();
							}
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
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
			this.sg3.clear(1); 
			this.sg2.clear(1); 
			this.sgUpld.clear(1); 
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,b.nama as cust,c.no_dok,a.keterangan,a.nilai+a.nilai_ppn as total "+
		             "from bill_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 
					 "              inner join kontrak_m c on a.no_kontrak=c.no_kontrak and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.modul='BILL'";						
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
				if (this.sg2.rowValid(i) && this.sg2.cells(3,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(3,i));										
				}
			}				
			this.e_nilai.setText(floatToNilai(tot));									
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
				this.doLoadCtt(this.e_nb.getText());							
								
				var strSQL = "select a.tanggal,a.kode_cust,a.no_kontrak,a.no_dokumen,a.keterangan,a.no_ba,a.no_faktur,a.nilai,a.nilai_ppn,a.nik_app,a.jabatan,a.bank,a.cabang,a.no_rek,a.nama_rek,a.draft,a.kode_rek,a.nama_bill,a.no_kuitansi "+
							 "from bill_m a "+
							 "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);
						this.cb_cust.setText(line.kode_cust);	

						this.cb_kontrak.setSQL(
									"select a.no_kontrak, a.no_dok "+
									"from kontrak_m a "+
									"where a.no_kontrak='"+line.no_kontrak+"' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_kontrak","no_dok"],false,["ID","No Dokumen"],"and","Data PKS",true);														
									
						this.cb_kontrak.setText(line.no_kontrak);
						this.e_ba.setText(line.no_ba);						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_jabatan.setText(line.jabatan);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);																				
						this.e_namabill.setText(line.nama_bill);														
						this.cb_rek.setText(line.kode_rek);														
						this.e_nokwi.setText(line.no_kuitansi);			
					} 
				}

				var strSQL = "select a.nu,a.item,a.harga,a.jumlah,a.harga*a.jumlah as total "+
							 "from bill_d a "+
							 "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by nu";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.item,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total)]);
					}
				} else this.sg2.clear(1);			
                this.sg2.validasi();
                
				this.sgUpld.clear();						
				this.listFiles = new arrayMap();	
				var strSQL= "select b.kode_jenis,b.nama,a.no_gambar "+
							"from bill_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
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
	doLoadCtt: function(kode){
		try{			
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from bill_app "+
						 "where no_bukti='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
										
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 300px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					var strSQL2 = "select catatan,no_app, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from bill_app "+
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
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
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
