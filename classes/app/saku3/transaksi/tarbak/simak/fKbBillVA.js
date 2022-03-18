/*
Form ini hanya diperuntukan untuk akun2 YSPT dgn spesifikasi akun 1131107,1131108,1131109
*/

window.app_saku3_transaksi_tarbak_simak_fKbBillVA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fKbBillVA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fKbBillVA";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Billing KasBank - VA", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_piutang = new saiLabelEdit(this,{bound:[790,11,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.cb_va = new saiCBBL(this,{bound:[20,12,220,20],caption:"Bank VA", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[790,12,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_sisa = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Tot PDD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this,{bound:[590,17,80,20],caption:"Data Bill",click:[this,"doLoad"]});	
		this.bUpload = new portalui_uploader(this,{bound:[680,17,80,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});				
		
		this.pc1 = new pageControl(this,{bound:[5,12,1000,380], childPage:["Data Tagihan","File Upload","Data Pelunasan","Error Msg","No Bukti"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["NIS","Nama","No Bill","Periode","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","Sisa Tagih","ID Bank","Kode Param"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,80,80,150,150,120]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.sgUp = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,
					colTitle:["Account No.","Date","Value Date","Account No Alias","Description","Reference No.","Debit","Credit","Balance"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,300,100,100,100,100]],										
					readOnly:true, defaultRow:1
					});							
		this.sgnUp = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sgUp, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgnUp,{bound:[this.sgnUp.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"clearLayar"]});
		this.sgnUp.uploader.setParam3("object");
		this.sgUp.setAllowBlank(true);
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,750,this.pc1.height-35],colCount:8,
			colTitle:["ID Bank","Nilai Bayar","PDD Siswa","Validasi","Tanggal","Piu DSP","Piu SPP","Piu Lainnya"],
			colWidth:[[7,6,5, 4,3,2,1,0],[100,100,100,  80,80,100,100,100]],
			colFormat:[[1,2,5,6,7],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],			
			readOnly:true, defaultRow:1
			});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.e_totvalid = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,5,200,20],caption:"Total VA Valid", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_totinvalid = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,27,200,20],caption:"Total VA InValid", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bRekon = new button(this.pc1.childPage[2],{bound:[890,50,98,20],caption:"Rekon Pelunasan", click:[this,"doRekon"]});

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});	
		
		this.sg3 = new portalui_saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:7,tag:9,
			colTitle:["Tanggal","No Bukti","Total Bayar","Total PDD","Piu DSP","Piu SPP","Piu Lainnya"],
			colWidth:[[6,5,4, 3,2,1,0],[100,100,100,100,100,150,100]],
			colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
			autoAppend:false,
			readOnly:true, defaultRow:1
		});

		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_va.setSQL("select a.kode_bank, a.nama from sis_bankva a "+								 
								 "where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_bank","nama"],false,["Kode","Nama"],"and","Daftar Bank VA",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select akun_cd from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.akun_cd;

				this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.akunCD+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
				this.cb_titip.setText(this.akunCD);				
			} else this.akunCD = "";
			
			if (this.akunCD == "" || this.akunCD == "-") {
				system.alert(this,"Akun CD belum di seting di Form PP.","");
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};

window.app_saku3_transaksi_tarbak_simak_fKbBillVA.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fKbBillVA.implement({
	doAfterUpload: function(sender, result, data){		
		try {	
			if (this.cb_va.getText() != "") {	
				this.pc1.setActivePage(this.pc1.childPage[1]);					
				this.dataUpload = data;		

				var nilaiStr = idBank = "";	
				if (result) {			
					this.sg1.clear();
					for (var i=0; i < this.dataUpload.rows.length;i++){
						line = this.dataUpload.rows[i];																 
						if ( (line["Date"].substr(6,4)+line["Date"].substr(3,2) == this.e_periode.getText()) ) {	
							
							idBank = line["Description"].substr(this.digAwal-1,this.digJum);
							nilaiStr = line["Credit"];
							nilaiStr = nilaiStr.replace(/,/g,".");
							nilaiStr = nilaiStr.substr(0,nilaiStr.length-3);

							this.sg1.appendData([idBank,nilaiStr,"0","INVALID",line["Date"],"0","0","0"]);
						}
					}							
					this.sgUp.clear();								
					this.selectPage(undefined, 1);
					this.sgnUp.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
					this.sgnUp.rearrange();
					this.sgnUp.activePage = 0;	
				}else throw(data);
			}
			else {
				system.alert(this,"Data Bank VA tidak valid.","Bank VA harus terisi.");
			}
			
		} catch(e) {alert(e);}
	},
	selectPage: function(sender,page){
		try {
			var start = (page - 1) * 20;
			var finish = start + 20;			
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);						
			this.sgUp.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];					
				this.sgUp.appendData([line["Account No."],line["Date"],line["Value Date"],line["Account No Alias"],line["Description"],line["Reference No."],line["Debit"],line["Credit"],line["Balance"] ]);
			}			
			this.sgUp.setNoUrut(start);
		}
		catch(e) {
			alert(e);
		}
	},		
	doCekDataSiswa: function() {
		//cek idbank
		var strSQL = "select id_bank from sis_siswa where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' "+
					 "union "+
					 "select id_bank from sis_siswareg where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";					
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataNIS = dataS;
		}		
				
		this.inValid = false;		
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(3,i,"INVALID");
			for (var j=0;j < this.dataNIS.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataNIS.rs.rows[j].id_bank) {					
					this.sg1.cells(3,i,"VALID");				
				}
			}	
			if (this.sg1.cells(3,i) == "INVALID") this.inValid = true;									
		}	

		var totValid = totInvalid = 0;
		this.sg2.clear();
		for (var i=0; i < this.sg1.getRowCount();i++) {
			if (this.sg1.cells(3,i) == "INVALID") {
				totInvalid += nilaiToFloat(this.sg1.cells(1,i));
				var j = i+1;
				this.sg2.appendData([j]);						
			}
			else totValid += nilaiToFloat(this.sg1.cells(1,i));
		}

		this.e_totvalid.setText(floatToNilai(totValid));
		this.e_totinvalid.setText(floatToNilai(totInvalid));
	},
	doRekon:	function(sender){				
		try {
			//validasi manual, sebab di rc VA terdapat transaksi dummy / nonVA
			//ditemukan INVALID tetep bisa diproses, sesuai validasian manual user
			this.doCekDataSiswa();
		
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas = 0;				
			}	
			var totSisaRekon = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){
				if (this.sg1.cells(3,i) == "VALID") {								
					var nilaiBayar = nilaiToFloat(this.sg1.cells(1,i));	
					
					var nDSP = nSPP = nLain = 0;
				
					for (var j=0;j < this.dataJU.rs.rows.length;j++){
						if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].id_bank) {

							if (nilaiBayar >= (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
								nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo) - parseFloat(this.dataJU.rs.rows[j].lunas));
								
								var nilaiPakai = (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
								this.dataJU.rs.rows[j].lunas += nilaiPakai;
								
								if (this.dataJU.rs.rows[j].akun_piutang == "1131107") nDSP = nDSP + nilaiPakai;
								if (this.dataJU.rs.rows[j].akun_piutang == "1131108") nSPP = nSPP + nilaiPakai;
								if (this.dataJU.rs.rows[j].akun_piutang == "1131109") nLain = nLain + nilaiPakai;

							}
							else {
								this.dataJU.rs.rows[j].lunas += nilaiBayar;
								
								if (this.dataJU.rs.rows[j].akun_piutang == "1131107") nDSP = nDSP + nilaiBayar;
								if (this.dataJU.rs.rows[j].akun_piutang == "1131108") nSPP = nSPP + nilaiBayar;
								if (this.dataJU.rs.rows[j].akun_piutang == "1131109") nLain = nLain + nilaiBayar;

								nilaiBayar = 0;							
								break;
							}												
						}
					}	
				
					if (nilaiBayar != 0) {
						this.sg1.cells(2,i,floatToNilai(nilaiBayar));	
						totSisaRekon += nilaiBayar;				
					}	

					this.sg1.cells(5,i,floatToNilai(nDSP));	
					this.sg1.cells(6,i,floatToNilai(nSPP));	
					this.sg1.cells(7,i,floatToNilai(nLain));	

				}		
			}
		
			var tot = sisa = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.lunas);				
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_sisa.setText(floatToNilai(totSisaRekon));

			this.doGenBukti();
		
			this.pc1.setActivePage(this.pc1.childPage[2]);			
			this.doTampilData(1);
				
		}
		catch(e) {
			alert(e);
		}
	},
	doGenBukti : function() {		
		var buktiAwal = this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000");
		var formatID = buktiAwal.substr(0,10); 
		var nu = parseInt(buktiAwal.substr(10,4))-1;

		this.sg3.clear();
		var bayar = sisa = dsp = spp = lainnya = 0;
		for (var i=0;i < this.sg1.rows.getLength();i++){						
			if (this.sg1.rowValid(i) && this.sg1.cells(3,i) == "VALID") {
				bayar = nilaiToFloat(this.sg1.cells(1,i));
				sisa = nilaiToFloat(this.sg1.cells(2,i));

				dsp = nilaiToFloat(this.sg1.cells(5,i));
				spp = nilaiToFloat(this.sg1.cells(6,i));
				lainnya = nilaiToFloat(this.sg1.cells(7,i));

				var isAda = false;
				var idx = totalBayar = totalSisa = totDSP = totSPP = totLainnya = 0;
				for (var j=0;j < this.sg3.getRowCount();j++){
					if (this.sg1.cells(4,i) == this.sg3.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}				
				if (!isAda) {
					nu = nu + 1;
					var idx = nu.toString();
					if (idx.length == 1)  idx = "000"+idx;
					if (idx.length == 2)  idx = "00"+idx;
					if (idx.length == 3)  idx = "0"+idx;
					if (idx.length == 4)  idx = idx;

					var noKB = formatID + idx;
					this.sg3.appendData([this.sg1.cells(4,i),noKB,floatToNilai(bayar),floatToNilai(sisa), floatToNilai(dsp),floatToNilai(spp),floatToNilai(lainnya)]);
				} 
				else { 
					totalBayar = nilaiToFloat(this.sg3.cells(2,idx));
					totalBayar = totalBayar + bayar;
					this.sg3.setCell(2,idx,totalBayar);
					
					totalSisa = nilaiToFloat(this.sg3.cells(3,idx));
					totalSisa = totalSisa + sisa;
					this.sg3.setCell(3,idx,totalSisa);

					totDSP = nilaiToFloat(this.sg3.cells(4,idx));
					totDSP = totDSP + dsp;
					this.sg3.setCell(4,idx,totDSP);

					totSPP = nilaiToFloat(this.sg3.cells(5,idx));
					totSPP = totSPP + spp;
					this.sg3.setCell(5,idx,totSPP);

				 	totLainnya = nilaiToFloat(this.sg3.cells(6,idx));
					totLainnya = totLainnya + lainnya;
					this.sg3.setCell(6,idx,totLainnya);

				}								
			}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					//jurnal per tanggal transaksi
					for (var i=0;i < this.sg3.rows.getLength();i++){							
						var tgl = this.sg3.cells(0,i).substr(6,4) + "-" + this.sg3.cells(0,i).substr(3,2) + "-" + this.sg3.cells(0,i).substr(0,2);
						
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
								"('"+this.sg3.cells(1,i)+"','"+this.app._lokasi+"','-','-','-','"+tgl+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','KBVA','BM','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.sg3.cells(2,i))+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");																
						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.sg3.cells(1,i)+"','-','"+tgl+"',0,'"+this.akunKB+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg3.cells(2,i))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBVA','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(2,i))+")");

						if (nilaiToFloat(this.sg3.cells(3,i)) != 0) {
							var k = i + 1000;
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.sg3.cells(1,i)+"','-','"+tgl+"',"+k+",'"+this.akunCD+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg3.cells(3,i))+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBVA','CD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(3,i))+")");							
						}
						if (nilaiToFloat(this.sg3.cells(4,i)) != 0) {
							var l = i + 2000;												
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.sg3.cells(1,i)+"','-','"+tgl+"',"+l+",'1131107','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg3.cells(4,i))+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBVA','PIUDSP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(4,i))+")");							
						}
						if (nilaiToFloat(this.sg3.cells(5,i)) != 0) {
							var m = i + 3000;												
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.sg3.cells(1,i)+"','-','"+tgl+"',"+m+",'1131108','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg3.cells(5,i))+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBVA','PIUSPP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(5,i))+")");							
						}
						if (nilaiToFloat(this.sg3.cells(6,i)) != 0) {
							var n = i + 4000;												
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.sg3.cells(1,i)+"','-','"+tgl+"',"+n+",'1131109','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg3.cells(6,i))+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBVA','PIULAIN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(6,i))+")");							
						}
					}


					//this.sg3.cells(1,0) <---------- no bukti jurnal pertama dijadikan sebagai acuan bukti
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						var total = parseFloat(line.lunas) + parseFloat(line.sisa);
						if (parseFloat(line.lunas) != 0){							
							sql.add("insert into sis_rekon_d(no_rekon,nis,no_bill,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_param,dc,modul,id_bank,kode_pp, nilai_cd,periode_bill) values "+
									"('"+this.sg3.cells(1,0)+"','"+line.nis+"','"+line.no_bill+"','"+this.e_periode.getText()+"',"+parseFloat(line.lunas)+",'"+this.app._lokasi+"','"+this.cb_va.getText()+"','"+line.akun_piutang+"','"+line.kode_param+"','D','LOAD','"+line.id_bank+"','"+this.cb_pp.getText()+"',"+parseFloat(line.sisa)+",'"+line.periode+"')");							
						}						
					}	
					//pake IDbank dulu,, trus di update ke sis_siswa 
					for (var i=0; i < this.sg1.getRowCount();i++){
						if (nilaiToFloat(this.sg1.cells(2,i)) != 0 && this.sg1.cells(3,i) == "VALID") {											
							sql.add("insert into sis_cd_d(no_bukti,nis,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,kode_pp,no_ref1) values "+
									"('"+this.sg3.cells(1,0)+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+",'"+this.app._lokasi+"','"+this.akunCD+"','-','D','LOAD','"+this.cb_pp.getText()+"','-')");							
						}
					}			
					//kolom nis yg asalnya id_bank di update dengan no_reg (calon siswa)
					sql.add("update a set a.nis=b.no_reg "+
							"from sis_cd_d a inner join sis_siswareg b on a.nis=b.id_bank and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti='"+this.sg3.cells(1,0)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'");			
					//kolom nis yg asalnya id_bank di update dengan nis sebenarnya
					sql.add("update a set a.nis=b.nis "+
							"from sis_cd_d a inner join sis_siswa b on a.nis=b.id_bank and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti='"+this.sg3.cells(1,0)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'");			

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.dp_d1);
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgUp.clear(1); 
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
												
				if (nilaiToFloat(this.e_nilai.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang nol.");
					return false;						
				}
				if (nilaiToFloat(this.e_sisa.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Sisa pelunasan tidak boleh kurang nol.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m)		
	},
	doChange:function(sender){
		if (sender == this.cb_va && this.cb_va.getText()!="") {
			var strSQL = "select * from sis_bankva where kode_bank ='"+this.cb_va.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.akunKB = line.kode_akun;					
					this.digAwal = parseInt(line.dig_awal);
					this.digJum = parseInt(line.dig_jum);
				}				
			}	
		}
	},	
	doLoad: function(sender){	
		if (this.cb_pp.getText()!="") {
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");	
			
			this.nik_user=this.app._nikUser;						
			var sql = "exec sp_bill_saldo '"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.nik_user+"'";
			this.dbLib.execQuerySync(sql);	

			/*
			var strSQL = "select a.nis,a.siswa,a.id_bank,a.no_bill,a.periode,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,0 as lunas,0 as sisa,a.kode_param,a.idx "+
						 "from ("+

						 "		select aa.nis,aa.nama as siswa,aa.id_bank, a.no_bill,a.periode,a.akun_piutang,sum(a.nilai) as tot_bill,a.kode_param,c.idx "+
						 "		from sis_bill_d a "+
						 "			inner join sis_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi "+
						 "      	inner join sis_siswa aa on aa.nis=a.nis and a.kode_lokasi=aa.kode_lokasi and e.kode_pp=aa.kode_pp "+
						 "      	inner join sis_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi and e.kode_pp=d.kode_pp "+						
						 "      	inner join sis_param_idx c on a.kode_param = c.kode_param and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp and c.kode_pp='"+this.cb_pp.getText()+"' "+						
						 "		where a.akun_piutang in ('1131107','1131108','1131109') and a.periode<='"+this.e_periode.getText()+"' and e.kode_pp= '"+this.cb_pp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "		group by aa.id_bank,aa.nis,aa.nama,a.no_bill,a.periode,a.akun_piutang,a.kode_param,c.idx "+
						 ") a "+
						 
						 "left join ( "+
						 "		select no_bill,nis,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "      from sis_rekon_d "+
						 "		where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						 "		group by nis,no_bill,kode_lokasi,kode_param "+

						 ") b on a.nis=b.nis and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+						 

						 "where (a.tot_bill-isnull(b.tot_lunas,0)) > 0 "+
						 "order by a.nis,a.idx";
			*/
			
			var strSQL = "select * from sis_bill_saldo where nik_user='"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nis,line.siswa,line.no_bill,line.periode,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),floatToNilai(line.sisa),line.id_bank,line.kode_param]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_piutang;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nilai",parseFloat(line.lunas));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
			}
		}
		this.gridAR = dtJurnal;
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYptNon";
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
							this.pc1.hide();							
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_d1);
			this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgUp.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});