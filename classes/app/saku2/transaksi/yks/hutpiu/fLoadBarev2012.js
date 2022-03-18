window.app_saku2_transaksi_yks_hutpiu_fLoadBarev2012 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fLoadBarev2012.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_hutpiu_fLoadBarev2012";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Billing Reverse: Load", 0);	
		
		this.maximize();		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bill", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_nbjurnal = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"No BAREV", readOnly:true});
		this.cb_noapp = new saiCBBL(this,{bound:[20,13,222,20],caption:"No App Piutang", multiSelection:false, maxLength:10, tag:9});						
		this.e_total = new saiLabelEdit(this,{bound:[792,13,220,20],caption:"Total Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});			
		this.e_kunj = new saiLabelEdit(this,{bound:[792,14,220,20],caption:"Tot. Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});												
		this.c_jenis = new saiCB(this,{bound:[20,13,202,20],caption:"Jenis Load",items:["BAREV"], readOnly:true, tag:2});		
		this.e_cs = new saiLabelEdit(this,{bound:[792,13,220,20],caption:"Tot. Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bUpload = new portalui_uploader(this,{bound:[587,13,80,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		this.bTampil = new button(this,{bound:[688,13,80,18],caption:"Jurnal",click:[this,"doTampil"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,990,360], childPage:["Data Billing","Pesan Error","Item Jurnal","Data Anggaran"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:38,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker Lama","Band","NIKKES","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai Kunj","Nilai CS",
						  "Jasa Dokter","KB-KIA","Jasa Dokter Gigi","Jasa Dokter Spe.","UGD","Tindakan Medis","Obat/Bhn Obat","Alkes","Pem. Penunjang","Kamar","Kamar Operasi","Ruang Perwtn Khusus","Kacamata dan Alat Rehab","Biaya Adm Lainnya","PPH","Kunj UMUM","Kunj GIGI","Kunj KBKIA","MATKES","CS","Loker Baru",
						  "Kode Keg","No Rujuk"],
				colWidth:[[37,36, 35, 34,33,32,31,30, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15, 14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
				          [80,80, 70, 80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,    80,80,70,70,70,70,70,100,70,70,100,100,70,100,70]],
				colFormat:[[34,33,32,31,30, 13,14, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15 ],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});				
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,5,980,380],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[875,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbAllFalse);		
		this.setTabChildIndex();		
		this.status = "";
		
		this.flagGarFree = "0"; 
		var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','PPBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
		if (typeof data == "object"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																	
				if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;							
				if (line.kode_spro == "PPBPCC") this.kodepp = line.flag;							
			}
		}	
	}
};
window.app_saku2_transaksi_yks_hutpiu_fLoadBarev2012.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_hutpiu_fLoadBarev2012.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.e_memo.setText("");
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);		
			
			var line;
			var tot = kunj = cs = 0;
			
			this.duplikasi = "0";
			var msg  = ""; this.e_memo.setText("");			
			
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];								
				var m = i+2;
				/*
				var kunci = line.kode_mitra+line.nikkes+line.tgl_masuk+line.umum+line.gigi+line.kbia+line.matkes;							
				for (var k=i;k < this.dataUpload.rows.length;k++){
					line1 = this.dataUpload.rows[k];				
					if (line1.kode_mitra+line1.nikkes+line1.tgl_masuk+line1.umum+line1.gigi+line1.kbia+line1.matkes == kunci && (i != k)) {
						var l = k+2;
						this.duplikasi = "1";
						msg+= "Baris : "+m+" dan "+l+"\n";										
					}
				}
				*/
				for (var j=1; j < 16;j++){		
					if (j ==10) continue;
					tot += parseFloat(line["n"+j]);					
				}
				tot -= parseFloat(line.pph);				
				kunj += parseFloat(line.umum)+parseFloat(line.gigi)+parseFloat(line.kbia)+parseFloat(line.matkes);
				cs += parseFloat(line.cs);
			}			
			if (this.duplikasi == "1") {
				this.e_memo.setText(msg);			
				system.alert(this,"Transaksi tidak valid.","Ditemukan duplikasi data lihat pesan error.");
				this.bTampil.setEnabled(false);
			} else this.bTampil.setEnabled(true);
			
			this.e_total.setText(floatToNilai(tot));
			this.e_kunj.setText(floatToNilai(kunj));
			this.e_cs.setText(floatToNilai(cs));
			
			this.doValid();
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		try {
			var start = (page - 1) * 20;
			var finish = start + 20;
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];
				this.sg1.appendData([line.kode_mitra,line.no_ref,line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.dokter,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_biaya,0,0,  	
									 floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n11),floatToNilai(line.n12),floatToNilai(line.n13),floatToNilai(line.n14),floatToNilai(line.n15),floatToNilai(line.pph),
									 floatToNilai(line.umum),floatToNilai(line.gigi),floatToNilai(line.kbia),floatToNilai(line.matkes),floatToNilai(line.cs),line.loker_baru,line.kode_keg,line.no_rujuk]);
			}
			this.sg1.setNoUrut(start);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					this.sg2.clear(1); 
					this.sg3.clear(1); 
					this.doClick(this.i_gen);
					setTipeButton(tbAllFalse);
					this.status = "";
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :																							
					this.doHitungGar();
					if (this.flagGarFree == "0") {
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.cells(0,i).substr(0,6) == "115101" || this.sg2.cells(0,i).substr(0,6) == "115102" || this.sg2.cells(0,i).substr(0,6) == "115103" || this.sg2.cells(0,i).substr(0,6) == "115104") {
								if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
									var k =i+1;
									system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
									return false;						
								}
							}							
						}
					}					
					this.doClick(this.i_gen);
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							var total = nilaiToFloat(this.e_total.getText());					
							
							sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
									"('"+this.e_nbjurnal.getText()+"','"+this.app._lokasi+"','-','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','BAREV','0','F')");								
							
							sql.add("insert into yk_bill_m(no_bill,kode_lokasi,periode,tanggal,keterangan,progress,nik_user,tgl_input,nilai,jenis,no_kasres,no_hutang,no_valid,no_load) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','1','"+this.app._userLog+"',getdate(),"+total+",'"+this.c_jenis.getText()+"','-','"+this.e_nbjurnal.getText()+"','"+this.e_nbjurnal.getText()+"','2012')");							
							sql.add("insert into yk_billkunj_m(no_bill,kode_lokasi,periode,tanggal,keterangan,progress,nik_user,tgl_input,total_kunj,total_cs,no_load,no_valid) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','1','"+this.app._userLog+"',getdate(),"+parseNilai(this.e_kunj.getText())+","+parseNilai(this.e_cs.getText())+",'2012','"+this.e_nbjurnal.getText()+"')");
							
							//loker lama
							sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_app,no_piutang,loker_bast,no_kas,jenis,periode,no_valid,no_tak,flag_aktif,no_selesai,no_rujuk,kode_keg) "+
							        "select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,-nilai,-nilai_kunj,-nilai_cs,-pph,loker,'"+this.e_nbjurnal.getText()+"','"+this.e_nbjurnal.getText()+"','"+this.e_nbjurnal.getText()+"',loker,'"+this.e_nbjurnal.getText()+"','BAREV','"+this.e_periode.getText()+"','"+this.e_nbjurnal.getText()+"','-','1','"+this.cb_noapp.getText()+"',no_rujuk,kode_keg "+ 
									"from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
							sql.add("insert into yk_billkunj_d (no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai,no_rujuk,kode_keg) "+
									"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,loker,'"+this.e_nbjurnal.getText()+"',loker,'"+this.e_nbjurnal.getText()+"','"+this.e_periode.getText()+"',-umum,-gigi,-kbia,-matkes,-cs,'"+this.e_nbjurnal.getText()+"','-','1','BAREV','"+this.cb_noapp.getText()+"',no_rujuk,kode_keg "+ 
									"from yk_billkunj_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");							
							//loker baru
							sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_app,no_piutang,loker_bast,no_kas,jenis,periode,no_valid,no_tak,flag_aktif,no_selesai,no_rujuk,kode_keg) "+
							        "select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker_baru,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_baru,'"+this.e_nbjurnal.getText()+"','"+this.e_nbjurnal.getText()+"','"+this.e_nbjurnal.getText()+"',loker_baru,'"+this.e_nbjurnal.getText()+"','BAREV','"+this.e_periode.getText()+"','"+this.e_nbjurnal.getText()+"','-','1','-',no_rujuk,kode_keg "+
									"from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
							sql.add("insert into yk_billkunj_d (no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai,no_rujuk,kode_keg) "+
									"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,no_ref,nik,nama,loker_baru,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,loker_baru,'"+this.e_nbjurnal.getText()+"',loker_baru,'"+this.e_nbjurnal.getText()+"','"+this.e_periode.getText()+"',umum,gigi,kbia,matkes,cs,'"+this.e_nbjurnal.getText()+"','-',1,'BAREV','-',no_rujuk,kode_keg "+
									"from yk_billkunj_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
								
							if (this.sg3.getRowValidCount() > 0){
								for (var i=0;i < this.sg3.getRowCount();i++){
									if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != "0"){																																				
										sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nbjurnal.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i)+"',"+parseNilai(this.sg3.cells(4,i))+",'"+this.kodepp+"','"+this.sg3.cells(6,i)+"','"+this.app._lokasi+"','BAREV','"+this.sg3.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
									}
								}
							}
							
							sql.add("delete from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
							sql.add("delete from yk_billkunj_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
														
							if (this.sg2.getRowValidCount() > 0){
								for (var i=0;i < this.sg2.getRowCount();i++){
									if (this.sg2.rowValid(i)){
										if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
											var DC = "D"; 
											var nilai = nilaiToFloat(this.sg2.cells(7,i));
										} else {
											var DC = "C";
											var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
										}
										sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','LBAREV','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
									}
								}
							}
							
							this.status = "SIMPAN";
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbAllFalse);
						}
					}
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
		this.doClick(this.i_gen);
		this.cb_noapp.setSQL("select no_valid, keterangan from yk_valid_m where kode_lokasi='"+this.app._lokasi+"' and modul='APPBAST'",["no_valid","keterangan"],false,["Kode","Nama"],"where","Daftar Approve Piutang",true);			
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_bill_m','no_bill',this.app._lokasi+"-BKJ"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_nbjurnal.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-LBREV"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	doValid: function(sender){		
		this.status = "VALIDASI";
		this.nbTmp = this.app._userLog;
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();												
		sql.add("delete from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");							
		sql.add("delete from yk_billkunj_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");				
		this.dbLib.execQuerySync(sql);			
		
		var line;
		var nilai = n_kunj = n_cs = 0;
		var kode_biaya = "";
		for (var i=0; i < this.dataUpload.rows.length;i++){
			line = this.dataUpload.rows[i];								
			for (var j=1; j < 16;j++){		
				if (j ==10) continue;
				if (j == 1) { 
					n_kunj = 0;
					n_cs = 0;
					pph = parseFloat(line.pph);
				} 
				else {
					n_kunj = 0;
					n_cs = 0;
					pph = 0;
				}
				nilai = Math.round(parseFloat(line["n"+j]));
				kode_biaya = line.kode_biaya+(j<10?"0":"")+j;
				if ((parseFloat(line["n"+j]) + n_kunj + n_cs + pph) != 0) {
					sql.add("insert into yk_bill_tmp(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,tgl_keluar,icdx,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_piutang,loker_bast,no_kas,jenis,periode,no_app,no_valid,no_tak,flag_aktif,no_selesai,loker_baru,no_rujuk,kode_keg) values "+  
							"('"+this.nbTmp+"',"+i+",'"+this.app._lokasi+"','"+line.kode_mitra+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.tgl_masuk+"','"+line.tgl_keluar+"','"+line.icdx+"','"+kode_biaya+"',"+nilai+","+n_kunj+","+n_cs+","+pph+",'"+line.loker+"','-','-','"+line.loker+"','-','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','-','-','-','1','-','"+line.loker_baru+"','"+line.no_rujuk+"','"+line.kode_keg+"')");
				}
			}
			if (parseFloat(line.umum) != 0 || parseFloat(line.gigi) != 0 || parseFloat(line.kbia) != 0 || parseFloat(line.matkes) != 0 || parseFloat(line.cs) != 0) {
				sql.add("insert into yk_billkunj_tmp(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai,loker_baru,no_rujuk,kode_keg) values "+
						"('"+this.nbTmp+"',"+i+",'"+this.app._lokasi+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.tgl_masuk+"','"+line.kode_biaya+"','"+line.loker+"','-','"+line.loker+"','-','"+this.e_periode.getText()+"',"+line.umum+","+line.gigi+","+line.kbia+","+line.matkes+","+line.cs+",'-','-','1','KUNJ','-','"+line.loker_baru+"','"+line.no_rujuk+"','"+line.kode_keg+"')");
				
			}								
		}
		this.dbLib.execArraySQL(sql);			
	},
	doTampil: function(sender){
		try {
			//------- VALIDASI -------- LOKER ngikut XLS, VENDOR tidak dicek
			var temu = false;
			var msg  = ""; this.e_memo.setText("");
			
			var strSQL = "select distinct a.kode_keg from yk_bill_tmp a left join yk_keg b on a.kode_keg=b.kode_keg where nilai<> 0 and b.kode_keg is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Kode Kegiatan : "+line.kode_keg+"\n";				
				}
			}
			var strSQL = "select distinct a.kode_keg from yk_billkunj_tmp a left join yk_keg b on a.kode_keg=b.kode_keg where (umum+gigi+kbia+matkes+cs <> 0) and b.kode_keg is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Kode Kegiatan Kunj : "+line.kode_keg+"\n";				
				}
			}
			
			var strSQL = "select distinct a.loker from yk_bill_tmp a left join cust b on a.loker=b.kode_cust where nilai<> 0 and b.kode_cust is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Loker : "+line.loker+"\n";
				}
			}			
			var strSQL = "select distinct a.loker_baru from yk_bill_tmp a left join cust b on a.loker_baru=b.kode_cust where nilai<> 0 and b.kode_cust is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Loker Baru : "+line.loker_baru+"\n";
				}
			}			
			var strSQL = "select distinct a.loker from yk_billkunj_tmp a left join cust b on a.loker=b.kode_cust where umum+gigi+kbia+matkes+cs<> 0 and b.kode_cust is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Loker Kunj : "+line.loker+"\n";
				}
			}			
			var strSQL = "select distinct a.loker_baru from yk_billkunj_tmp a left join cust b on a.loker_baru=b.kode_cust where umum+gigi+kbia+matkes+cs<> 0 and b.kode_cust is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Loker Baru Kunj : "+line.loker_baru+"\n";
				}
			}					
			var strSQL = "select distinct a.kode_produk from yk_bill_tmp a left join yk_produk b on a.kode_produk=b.kode_produk where nilai<> 0 and b.kode_produk is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Kode Biaya : "+line.kode_produk.substr(0,2)+"-KOLOM-"+line.kode_produk.substr(2,2)+"\n";				
				}
			}					
			var strSQL = "select distinct a.kode_produk from yk_billkunj_tmp a left join yk_kunj b on a.kode_produk=b.kode_produk where (umum+gigi+kbia+matkes+cs <> 0) and b.kode_produk is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Kode Kunj : "+line.kode_produk+"\n";				
				}
			}					
			var strSQL = "select distinct a.icdx from yk_bill_tmp a left join yk_icdx b on a.icdx=b.kode_icdx where nilai <> 0 and b.kode_icdx is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "Kode ICDX : "+line.icdx+"\n";				
				}
			}							
			var strSQL = "select distinct nik+' - '+substring(convert(varchar,tgl_masuk,103),7,4)+substring(convert(varchar,tgl_masuk,103),4,2) as nik from yk_bill_tmp where nilai <> 0 and loker ='-' and no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "NIK - Periode : "+line.nik+"\n";				
				}
			}
			var strSQL = "select distinct nik+' - '+substring(convert(varchar,tgl_masuk,103),7,4)+substring(convert(varchar,tgl_masuk,103),4,2) as nik from yk_billkunj_tmp where (umum+gigi+kbia+matkes+cs <> 0) and loker ='-' and no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true;
					line = data.rs.rows[i];							
					msg+= "NIK - Periode : "+line.nik+"\n";				
				}
			}		
			if (temu) {
				this.e_memo.setText(msg);			
				system.alert(this,"Data tidak valid.","Lihat Pesan ERROR.");
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
			else {
				setTipeButton(tbSimpan);
				this.doJurnal();				
			}
		} catch(e) {
			alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		//reverse dari loker lama tidak dicek dulu....susah
		var strSQL = "select case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end as kode_akun,"+
					 "d.nama as nama_akun, '"+this.app._lokasi+"1000' as kode_pp,'DALMED' as nama_pp,'900000001' as kode_drk,"+
					 "'Biaya Pengobatan dan Claim Cost' as nama_drk,"+
					 "sum(a.nilai) as nilai "+
					 "from yk_bill_tmp a "+
					 "inner join cust b on a.loker_baru = b.kode_cust "+
					 "inner join yk_produk c on a.kode_produk=c.kode_produk "+
					 "inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end) = d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "where "+
					 "b.jenis in ('PEGAWAI','PENSIUN') and a.no_bill = '"+this.nbTmp+"' "+
					 "group by "+
					 "d.nama,case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end "+
					 "order by d.kode_akun";
		var data9 = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data9 == "object" && data9.rs.rows[0] != undefined){
			var line9;
			this.sg2.clear();
			for (var i in data9.rs.rows){
				line9 = data9.rs.rows[i];											
				this.sg2.appendData([line9.kode_akun,line9.nama_akun,line9.kode_pp,line9.nama_pp,line9.kode_drk,line9.nama_drk,"0",floatToNilai(line9.nilai),"0"]);
			}
		} else this.sg2.clear(1);									
				
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data8 = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			if (typeof data8 == "object" && data8.rs.rows[0] != undefined){
				var line8 = data8.rs.rows[0];
				dataX = line8.gar.split(";");
				sls = parseFloat(dataX[0]) - parseFloat(dataX[1]);
				var nRev = 0;
				
				var data3 = this.dbLib.getDataProvider("select isnull(sum(a.nilai),0) as n_rev "+
							 "from yk_bill_tmp a "+
							 "inner join cust b on a.loker = b.kode_cust "+
							 "inner join yk_produk c on a.kode_produk=c.kode_produk "+					 
							 "where (case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end)='"+this.sg2.cells(0,i)+"' and b.jenis in ('PEGAWAI','PENSIUN') and a.no_bill = '"+this.nbTmp+"' ",true);
				if (typeof data3 == "object"){
					var line3 = data3.rs.rows[0];							
					if (line3 != undefined){						
						nRev = parseFloat(line3.n_rev);
					} 
				}
				
				sls = sls + nRev;
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						if (this.status == "SIMPAN") {
							this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
							this.app._mainForm.bClear.click();              
						}
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doJurnal: function(){
		//BILL LOKER BARU
		var strSQL = "select b.nama as ket,"+
					 "       case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                    when 'PEGAWAI' then b.akun_bp "+
					 "                    when 'GROUP' then b.akun_ap "+
					 "                    when 'MITRA' then b.akun_mitra "+
					 "       end as kode_akun,d.nama as nama_akun,'D' as dc,"+
					 "       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
					 "from yk_bill_tmp a  "+
					 "     inner join cust f on a.loker_baru=f.kode_cust "+
					 "     inner join yk_produk b on a.kode_produk=b.kode_produk "+
					 "     inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                             			     when 'PEGAWAI' then b.akun_bp "+
					 "                             				 when 'GROUP' then b.akun_ap "+
					"                                            when 'MITRA' then b.akun_mitra "+
					"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
					"  	   inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.no_bill ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by b.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
					"                             when 'PEGAWAI' then b.akun_bp "+
					"                             when 'GROUP' then b.akun_ap "+
					"                             when 'MITRA' then b.akun_mitra "+
					"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+					
					"union all "+						
					
		//BILL LOKER LAMA
					"select b.nama as ket,"+
					 "       case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                    when 'PEGAWAI' then b.akun_bp "+
					 "                    when 'GROUP' then b.akun_ap "+
					 "                    when 'MITRA' then b.akun_mitra "+
					 "       end as kode_akun,d.nama as nama_akun,'C' as dc,"+
					 "       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
					 "from yk_bill_tmp a  "+
					 "     inner join cust f on a.loker=f.kode_cust "+
					 "     inner join yk_produk b on a.kode_produk=b.kode_produk "+
					 "     inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                             			     when 'PEGAWAI' then b.akun_bp "+
					 "                             				 when 'GROUP' then b.akun_ap "+
					"                                            when 'MITRA' then b.akun_mitra "+
					"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
					"  	   inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.no_bill ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by b.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
					"                             when 'PEGAWAI' then b.akun_bp "+
					"                             when 'GROUP' then b.akun_ap "+
					"                             when 'MITRA' then b.akun_mitra "+
					"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+					
					"union all "+
					
		//PIU KUNJUNGAN	BARU
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pku as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.umum) as nilai,'PIUKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.umum<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill = '"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pku,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pkg as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.gigi) as nilai,'PIUKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pkg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.gigi<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pkg,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pkb as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.kbia) as nilai,'PIUKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pkb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.kbia<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pkb,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pmk as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.matkes) as nilai,'PIUKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pmk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pmk,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					
		//PDPT KUNJUNGAN BARU							
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.umum) as nilai,'PDPTKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.umum<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
					"union all "+						
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_kg as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.gigi) as nilai,'PDPTKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_kg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.gigi<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_kg,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_kb as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.kbia) as nilai,'PDPTKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_kb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.kbia<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_kb,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_mk as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.matkes) as nilai,'PDPTKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_mk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_mk,d.nama,c.drk_kunj,e.nama "+
					"union all "+
					
		//CS BARU						
					"select 'TTP CS '+c.nama as ket,c.akun_hutcs as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.cs) as nilai,'HUTCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_hutcs,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU CS '+c.nama as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.cs) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker_baru=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
					"union all "+
					
		//PIU KUNJUNGAN	LAMA
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pku as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.umum) as nilai,'PIUKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.umum<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill = '"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pku,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pkg as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.gigi) as nilai,'PIUKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pkg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.gigi<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pkg,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pkb as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.kbia) as nilai,'PIUKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pkb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.kbia<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pkb,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU KUNJ '+c.nama as ket,c.akun_pmk as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.matkes) as nilai,'PIUKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_pmk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_pmk,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					
		//PDPT KUNJUNGAN LAMA							
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.umum) as nilai,'PDPTKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.umum<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
					"union all "+						
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_kg as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.gigi) as nilai,'PDPTKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_kg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.gigi<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_kg,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_kb as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.kbia) as nilai,'PDPTKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_kb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.kbia<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_kb,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PDPT KUNJ '+c.nama as ket,c.akun_mk as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.matkes) as nilai,'PDPTKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_mk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_mk,d.nama,c.drk_kunj,e.nama "+
					"union all "+
					
		//CS LAMA						
					"select 'TTP CS '+c.nama as ket,c.akun_hutcs as kode_akun,d.nama as nama_akun,'C', "+
					"sum(a.cs) as nilai,'HUTCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_hutcs,d.nama,c.drk_kunj,e.nama "+
					"union all "+						
					"select 'PIU CS '+c.nama as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'D', "+
					"sum(a.cs) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					"from yk_billkunj_tmp a inner join cust b on a.loker=b.kode_cust "+
					"		 	            inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"		 	            inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					"		 	            inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					"group by  c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
					
					"order by dc desc,kode_akun";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk]);
			}
		}
		this.sg3.validasi();								
		this.pc1.setActivePage(this.pc1.childPage[2]);		
		this.doHitungGar();		
	}
});
