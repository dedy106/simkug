window.app_saku3_transaksi_sapyakes_fLoadBillKugRev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fLoadBillKugRev.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_sapyakes_fLoadBillKugRev";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing Pengobatan dan Kunjungan Revisi Loker", 0);	
		
		this.maximize();		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Billing","List Billing"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
		            colTitle:["No Bill","Tanggal","Jenis","No Invoice","Deskripsi","BP","Kunj","CS"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,250,100,70,70,100]],colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Billing",click:[this,"doLoad3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bill - BAREV", readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nb2 = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[260,12,100,20],caption:"", labelWidth: 0, readOnly:true});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Total BP (-PPh)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis Load",items:["BAREV"], readOnly:true, tag:2});								
		this.e_kunj = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Tot. Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_cs = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,20],caption:"Tot. Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bUpload = new portalui_uploader(this.pc2.childPage[0],{bound:[560,18,80,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		this.bValid = new button(this.pc2.childPage[0],{bound:[660,18,80,18],caption:"Validasi",click:[this,"doValid"]});			
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,995,349], childPage:["Data Billing","Pesan Error","Data Anggaran","Item Jurnal"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:38,tag:9,
				colTitle:["Kode Mitra","No ref","NIK","Nama","Loker Lama","Band","Nikes","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai Kunj","Nilai CS",
						  "Jasa Dokter","KB-KIA","Jasa Dokter Gigi","Jasa Dokter Spe.","UGD","Tindakan Medis","Obat/Bhn Obat","Alkes","Pem. Penunjang","Kamar","Kamar Operasi","Ruang Perwtn Khusus","Kacamata dan Alat Rehab","Biaya Adm Lainnya","PPH","Kunj UMUM","Kunj GIGI","Kunj KBKIA","MATKES","CS",
						  "Kode Keg","No Rujuk","Loker Baru"],
				colWidth:[[37,36,35,34,33,32,31,30, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15, 14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
				          [80,80,80,  80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,    80,80,70,70,70,70,70,100,70,70,100,100,70, 100,70]],
				colFormat:[[34,33,32,31,30, 13,14, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});				
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,5,980,340],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK","Kode SAP","Rek SAP"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7,8,9],[3]],
					colFormat:[[4],[cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg4});				
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.stsSimpan = 1;
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbAllFalse);		
		this.setTabChildIndex();		
		this.status = "";
		
		this.flagGarFree = "0"; this.ppBPCC = "-";
		var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','PPBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
		if (typeof data == "object"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																	
				if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;							
				if (line.kode_spro == "PPBPCC") this.ppBPCC = line.flag;							
			}
		}	
		var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('SAPPH')",true);			
		if (typeof data == "object"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																	
				if (line.kode_spro == "SAPPH") this.akunTemp = line.flag;				
			}
		}	
		this.bValid.setEnabled(false);	
		
		
	}
};
window.app_saku3_transaksi_sapyakes_fLoadBillKugRev.extend(window.portalui_childForm);
window.app_saku3_transaksi_sapyakes_fLoadBillKugRev.implement({	
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
			this.nilaiPPh = 0;
			var msg  = ""; this.e_memo.setText("");			
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];								
				var m = i+2;
				var kunci = line.kode_mitra+line.nikkes+line.tgl_masuk+line.umum+line.gigi+line.kbia+line.matkes;							
				if (parseFloat(line.umum)+parseFloat(line.gigi)+parseFloat(line.kbia)+parseFloat(line.matkes) != 0) {
					for (var k=i;k < this.dataUpload.rows.length;k++){
						line1 = this.dataUpload.rows[k];									
						if (line1.kode_mitra+line1.nikkes+line1.tgl_masuk+line1.umum+line1.gigi+line1.kbia+line1.matkes == kunci && (i != k)) {
							var l = k+2;
							this.duplikasi = "1";
							msg+= "Baris : "+m+" dan "+l+"\n";										
						}					
					}
				}				
				for (var j=1; j < 16;j++){		
					if (j ==10) continue;
					tot += parseFloat(line["n"+j]);					
				}
				this.nilaiPPh += parseFloat(line.pph);									
				tot -= parseFloat(line.pph);				
				kunj += parseFloat(line.umum)+parseFloat(line.gigi)+parseFloat(line.kbia)+parseFloat(line.matkes);
				cs += parseFloat(line.cs);
			}			
			
			this.e_total.setText(floatToNilai(tot));
			this.e_kunj.setText(floatToNilai(kunj));
			this.e_cs.setText(floatToNilai(cs));
			
			this.doLoadTmp();
			
			if (this.duplikasi == "1") {
				this.e_memo.setText(msg);			
				system.alert(this,"Transaksi tidak valid.","Ditemukan duplikasi data lihat pesan error.");
				this.bValid.setEnabled(false);
			} else this.bValid.setEnabled(true);
						
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		try {
			var start = (page - 1) * 20;
			var finish = start + 20;
			if (this.stsSimpan == 1) finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);			
			else finish = (finish > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				if (this.stsSimpan == 1) line = this.dataUpload.rows[i];
				else line = this.dataJU.rs.rows[i];
				this.sg1.appendData([line.kode_mitra,line.no_ref,line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.dokter,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_biaya,0,0,  	
									 floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n11),floatToNilai(line.n12),floatToNilai(line.n13),floatToNilai(line.n14),floatToNilai(line.n15),floatToNilai(line.pph),
									 floatToNilai(line.umum),floatToNilai(line.gigi),floatToNilai(line.kbia),floatToNilai(line.matkes),floatToNilai(line.cs),line.kode_keg,line.no_rujuk,line.loker_baru]);
			}
			this.sg1.setNoUrut(start);
		}
		catch(e) {
			alert(e);
		}
	},	
	doLoadTmp: function(sender){		
		try {			
			this.status = "VALIDASI";
			this.nbTmp = this.app._userLog;
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
			sql.add("delete from yk_billkunj_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");				
			this.dbLib.execQuerySync(sql);			
			
			var line;
			var nilai = pph = 0;
			var kode_biaya = "";
			var x = 50000;
			for (var i=0; i < this.dataUpload.rows.length;i++) {
				x=x+i;
				line = this.dataUpload.rows[i];
				for (var j=1; j < 16;j++) {		
					if (j ==10) continue;
					if (j == 1) { 					
						pph = parseFloat(line.pph);
					} 
					else {
						pph = 0;
					}
					nilai = Math.round(parseFloat(line["n"+j]));
					kode_biaya = line.kode_biaya+(j<10?"0":"")+j;
					if ((parseFloat(line["n"+j]) + pph) != 0) {					                                 
						sql.add("insert into yk_bill_tmp(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) values "+
								"('"+this.nbTmp+"',"+i+",'"+this.app._lokasi+"','"+line.kode_mitra+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker_baru+"','"+line.tgl_masuk+"','"+line.tgl_keluar+"','"+line.icdx+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+kode_biaya+"','"+line.kode_keg+"','"+line.no_rujuk+"',"+nilai+","+pph+",'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','-','-','-','-','"+this.app._lokasi+"')");
						sql.add("insert into yk_bill_tmp(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) values "+
								"('"+this.nbTmp+"',"+x+",'"+this.app._lokasi+"','"+line.kode_mitra+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.tgl_masuk+"','"+line.tgl_keluar+"','"+line.icdx+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+kode_biaya+"','"+line.kode_keg+"','"+line.no_rujuk+"',-"+nilai+","+pph+",'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','-','-','-','-','"+this.app._lokasi+"')");
					}
				}
				if (parseFloat(line.umum) != 0 || parseFloat(line.gigi) != 0 || parseFloat(line.kbia) != 0 || parseFloat(line.matkes) != 0 || parseFloat(line.cs) != 0) {				                                     
					if (line.loker.substr(0,4).toUpperCase() != "AREA") { //loker baru PENSIUN tidak masuk
						sql.add("insert into yk_billkunj_tmp(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_tak,no_selesai,no_hutang,kode_lokasal) values "+
								"('"+this.nbTmp+"',"+i+",'"+this.app._lokasi+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker_baru+"','"+line.tgl_masuk+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.kode_biaya+"','"+line.kode_keg+"','"+line.no_rujuk+"',"+line.umum+","+line.gigi+","+line.kbia+","+line.matkes+","+line.cs+",'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','-','-','-','-','-','"+this.app._lokasi+"')");
					}
					sql.add("insert into yk_billkunj_tmp(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_tak,no_selesai,no_hutang,kode_lokasal) values "+
							"('"+this.nbTmp+"',"+x+",'"+this.app._lokasi+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.tgl_masuk+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.kode_biaya+"','"+line.kode_keg+"','"+line.no_rujuk+"',-"+line.umum+",-"+line.gigi+",-"+line.kbia+",-"+line.matkes+",-"+line.cs+",'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','-','-','-','-','-','"+this.app._lokasi+"')");
				}								
			}					
			this.dbLib.execArraySQL(sql);								
		}
		catch(e) {
			alert(e);
		}
	},
	doValid: function(sender){									
		var temu = false;
		var msg  = ""; this.e_memo.setText("");
		
		var strSQL = "select distinct a.kode_vendor from yk_bill_tmp a left join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi where nilai <> 0 and b.kode_vendor is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "Kode Mitra : "+line.kode_vendor+"\n";				
			}
		}
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
		var strSQL = "select distinct a.loker from yk_bill_tmp a left join yk_loker b on a.loker=b.loker where a.nilai<> 0 and b.loker is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "Loker : "+line.loker+"\n";
			}
		}								
		var strSQL = "select distinct a.loker from yk_billkunj_tmp a left join yk_loker b on a.loker=b.loker where a.umum+a.gigi+a.kbia+a.matkes+a.cs<> 0 and b.loker is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "Loker Kunj : "+line.loker+"\n";
			}
		}					
		//nikkes di cek
		var strSQL = "select distinct a.nikkes as nikkes from yk_bill_tmp a left join yk_peserta b on a.nikkes=b.nikes where b.nikes is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.loker <> 'SIGMA'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "NIKKES : "+line.nikkes+"\n";				
			}
		}
		var strSQL = "select distinct a.nikkes as nikkes from yk_billkunj_tmp a left join yk_peserta b on a.nikkes=b.nikes where b.nikes is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.loker <> 'SIGMA'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "NIKKES: "+line.nikkes+"\n";				
			}
		}			
		if (temu) {
			setTipeButton(tbAllFalse);
			this.e_memo.setText(msg);			
			system.alert(this,"Data tidak valid.","Lihat Pesan ERROR.");
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else setTipeButton(tbSimpan);					
		this.doJurnal();				
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
					this.sg4.clear(1);
					this.e_memo.setText("");
					this.doClick(this.i_gen);
					setTipeButton(tbAllFalse);
					this.status = "";
				}
				break;
			case "simpan" :								
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}				
					if (this.totD != this.totC) {
						system.alert(this,"Transaksi tidak valid.","Jurnal tidak balance.");
						return false;						
					}
					this.doHitungGar();					
					/*
					if (this.flagGarFree == "0") {
						for (var i=0;i < this.sg2.getRowCount();i++){							
							if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}							
						}
					}					
					*/
					this.doClick(this.i_gen);
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();															
							sql.add("insert into yk_bill_m(no_bill,kode_lokasi,tanggal,periode,tgl_input,nik_user,no_dokumen,keterangan,kode_vendor,nilai,kunj,cs,pph,jenis,progress,no_kasres,no_batch,no_hutang,modul) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','-','"+this.e_ket.getText()+"','-',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_kunj.getText())+","+nilaiToFloat(this.e_cs.getText())+","+this.nilaiPPh+",'"+this.c_jenis.getText()+"','1','-','-','"+this.e_nb2.getText()+"','KUG')");
							sql.add("insert into yk_billkunj_m(no_bill,kode_lokasi,tanggal,periode,keterangan,tgl_input,nik_user,total_kunj,total_cs,jenis,progress,no_batch,no_hutang,modul) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_kunj.getText())+","+nilaiToFloat(this.e_cs.getText())+",'"+this.c_jenis.getText()+"','1','-','"+this.e_nb2.getText()+"','KUG')");
														
							sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) "+
							        "select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb2.getText()+"',no_piutang,no_selesai,no_tak,kode_lokasal "+
									"from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");							
							sql.add("insert into yk_billkunj_d (no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_tak,no_selesai,no_hutang,kode_lokasal) "+
									"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"',no_kas,no_piutang,no_tak,no_selesai,'"+this.e_nb2.getText()+"',kode_lokasal "+
									"from yk_billkunj_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
							
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
											"	('"+this.e_nb.getText()+"','BILL','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
									}
								}
							}							
							
							sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress) values "+
									"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.ppBPCC+"','BAREV','BILL','IDR',1,"+this.totD+",'"+this.app._userLog+"','"+this.app._userLog+"','F',getdate(),'"+this.app._userLog+"','"+this.app._lokasi+"','-','0')");							
							if (this.sg4.getRowValidCount() > 0){
								for (var i=0;i < this.sg4.getRowCount();i++){
									if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != "0") {																											
										sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,kode_rek) values "+
												"('"+this.e_nb2.getText()+"','"+this.sg4.cells(8,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i)+"',"+parseNilai(this.sg4.cells(4,i))+",'"+this.ppBPCC+"','"+this.sg4.cells(6,i)+"','"+this.app._lokasi+"','BAREV','"+this.sg4.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,'R001')");								
									}
								}
							}
							
							
							sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
									"select no_hutang+no_dokumen,no_urut,kode_lokasi,'PH',jenis,no_hutang,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"', "+
									"(case when jenis in ('BP','CC','PIUKUNJ') then no_dokumen else '-' end) as kode_cust, "+
									"'-','-',"+
									"'-' as kode_vendor,"+
									"'-','-','-',kode_rek,'-','T' "+
									"from yk_hutang_j "+
									"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_hutang='"+this.e_nb2.getText()+"'");
				
							sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
									"select no_bukti,999,kode_lokasi,modul,'TEMP',no_dokumen,tanggal,'"+this.akunTemp+"',case dc when 'D' then 'C' else 'D' end,sum(nilai),'Temporary Account',kode_pp,periode,kode_drk,kode_curr,kurs,sum(nilai_curr),getdate(),nik_user,'-',kode_proyek,kode_task,'-',kode_lokarea,nik,no_doksap,'-','-','-' "+
									"from glsap "+
									"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_dokumen='"+this.e_nb2.getText()+"' "+
									"group by "+
									"no_bukti,kode_lokasi,modul,no_dokumen,tanggal,case dc when 'D' then 'C' else 'D' end,kode_pp,periode,kode_drk,kode_curr,kurs,nik_user,kode_proyek,kode_task,kode_lokarea,nik,no_doksap ");
					
					
							//update spesial gl utl=k cust dan vendor
							sql.add("update a set a.kode_task = b.spe_gl "+
									"from glsap a inner join sap_spe_gl b on a.kode_cust=b.kode_mitra and a.kode_akun=b.kode_akun and b.jenis='CUST' "+
									"where a.no_dokumen='"+this.e_nb2.getText()+"'");
																
							this.status = "SIMPAN";
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbAllFalse);
						}
					}
				break;
			case "hapus" :
					this.status = "SIMPAN";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_billkunj_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_billkunj_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_hutang_m where no_hutang = '"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_hutang_j where no_hutang = '"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from glsap where no_dokumen='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-BRV"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			this.stsSimpan = 1;
			this.bUpload.show();
			this.bValid.show();
			this.sg1.clear(1);
			this.sg3.clear(1);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},				
	doHitungGar: function(){
		this.sg2.clear();
		var strSQL = "select case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end as kode_akun,"+
					 "d.nama as nama_akun, '"+this.ppBPCC+"' as kode_pp,e.nama as nama_pp,case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end as kode_drk,"+
					 "f.nama as nama_drk,"+
					 "sum(a.nilai) as nilai "+
					 "from yk_bill_tmp a "+
					 "inner join yk_loker bb on a.loker = bb.loker "+
					 "inner join cust b on bb.kode_cust = b.kode_cust and b.sts_gar='1' "+
					 "inner join yk_produk c on a.kode_produk=c.kode_produk "+
					 "inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end) = d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join pp e on e.kode_pp='"+this.ppBPCC+"' and e.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join drk f on f.kode_drk=(case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end) and f.kode_lokasi='"+this.app._lokasi+"' and f.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.loker<>'-' and b.jenis in ('PEGAWAI','PENSIUN') and a.no_bill = '"+this.nbTmp+"' "+
					 "group by f.nama,e.nama,d.nama,case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end,case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end "+
					 "order by kode_akun";				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,"0",floatToNilai(line.nilai),"0"]);
			}
		} else this.sg2.clear(1);									
				
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},	
	doJurnal: function(){			
		var strSQL = "select d.nama as ket,"+
					 "       case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                    when 'PEGAWAI' then b.akun_bp "+
					 "                    when 'GROUP' then b.akun_ap "+					 
					 "       end as kode_akun,d.nama as nama_akun,'D' as dc,"+
					 "       abs(sum(a.nilai)) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
					 "      ,f.kode_sap as atensi, f.kode_rek "+
					 "from yk_bill_tmp a  "+
					 "     inner join yk_loker bb on a.loker=bb.loker "+
					 "     inner join cust f on bb.kode_cust=f.kode_cust "+
					 "     inner join yk_produk b on a.kode_produk=b.kode_produk "+
					 "     inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                             			     when 'PEGAWAI' then b.akun_bp "+
					 "                             				 when 'GROUP' then b.akun_ap "+					
					 "       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
					 "     inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.nilai > 0 and a.no_bill ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "group by d.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                             when 'PEGAWAI' then b.akun_bp "+
					 "                             when 'GROUP' then b.akun_ap "+					 
					 "       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+	
					 "		 ,f.kode_sap, f.kode_rek "+
					 				
					 "union all "+	
					 					
					 "select d.nama as ket,"+
					 "       case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                    when 'PEGAWAI' then b.akun_bp "+
					 "                    when 'GROUP' then b.akun_ap "+					 
					 "       end as kode_akun,d.nama as nama_akun,'C' as dc,"+
					 "       abs(sum(a.nilai)) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
					 "		 ,f.kode_sap as atensi, f.kode_rek "+
					 "from yk_bill_tmp a  "+
					 "     inner join yk_loker bb on a.loker=bb.loker "+
					 "     inner join cust f on bb.kode_cust=f.kode_cust "+
					 "     inner join yk_produk b on a.kode_produk=b.kode_produk "+
					 "     inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                             			     when 'PEGAWAI' then b.akun_bp "+
					 "                             				 when 'GROUP' then b.akun_ap "+					
					 "       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
					 "     inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.nilai < 0 and a.no_bill ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "group by d.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
					 "                             when 'PEGAWAI' then b.akun_bp "+
					 "                             when 'GROUP' then b.akun_ap "+					 
					 "       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+	
					 "		 ,f.kode_sap, f.kode_rek "+		
					 		
					 "union all "+						
					//------------------
					
					 "select 'PIU KUNJ '+c.nama as ket,(case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end) as kode_akun,d.nama as nama_akun,'D' as dc, "+
					 "abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai,'PIUKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",b.kode_sap as atensi, b.kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+
					 "		 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		 inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end)=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		 inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where (a.umum+a.gigi+a.kbia+a.matkes) > 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill = '"+this.app._userLog+"' "+
					 "group by  c.nama,(case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end),d.nama,c.drk_kunj,e.nama "+
					 ",b.kode_sap, b.kode_rek "+
					 
					 "union all "+												
					 
					 "select 'PIU KUNJ '+c.nama as ket,(case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end) as kode_akun,d.nama as nama_akun,'C' as dc, "+
					 "abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai,'PIUKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",b.kode_sap as atensi, b.kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+
					 "		 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		 inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end)=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		 inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where (a.umum+a.gigi+a.kbia+a.matkes) < 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill = '"+this.app._userLog+"' "+
					 "group by  c.nama,(case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end),d.nama,c.drk_kunj,e.nama "+
					 ",b.kode_sap, b.kode_rek "+
					 "union all "+							
					//-------------------
					 
					 "select 'PDPT KUNJ '+c.nama as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'C' as dc, "+
					 "abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai,'PDPTKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",'-' as atensi, '-' as kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+
					 "		inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where (a.umum+a.gigi+a.kbia+a.matkes)> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					 "group by  c.nama,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
					 "union all "+						
					 "select 'PDPT KUNJ '+c.nama as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'D' as dc, "+
					 "abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai,'PDPTKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",'-' as atensi, '-' as kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+
					 "		inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where (a.umum+a.gigi+a.kbia+a.matkes)< 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					 "group by  c.nama,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
					 "union all "+				
					 
					//---------------------------
										
					 "select 'TTP CS '+c.nama as ket,c.akun_hutcs as kode_akun,d.nama as nama_akun,'D' as dc, "+
					 "abs(sum(a.cs)) as nilai,'HUTCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",b.kode_sap as atensi, b.kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+					
					 "		 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		 inner join masakun d on c.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		 inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.cs> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					 "group by  c.nama,c.akun_hutcs,d.nama,c.drk_kunj,e.nama "+
					 ",b.kode_sap, b.kode_rek "+
					 
					 "union all "+						
					 
					 "select 'TTP CS '+c.nama as ket,c.akun_hutcs as kode_akun,d.nama as nama_akun,'C' as dc, "+
					 "abs(sum(a.cs)) as nilai,'HUTCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",b.kode_sap as atensi, b.kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+					
					 "		 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		 inner join masakun d on c.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		 inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.cs< 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					 "group by  c.nama,c.akun_hutcs,d.nama,c.drk_kunj,e.nama "+
					 ",b.kode_sap, b.kode_rek "+
					  
					 "union all "+						
					 
					 //------------------------------
					 "select 'PIU CS '+c.nama as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'C' as dc, "+
					 "abs(sum(a.cs)) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",b.kode_sap as atensi, b.kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+					
					 "		 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		 inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		 inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.cs> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					 "group by  c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
					 ",b.kode_sap, b.kode_rek "+
					  
					 "union all "+
					 "select 'PIU CS '+c.nama as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'D' as dc, "+
					 "abs(sum(a.cs)) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
					 ",b.kode_sap as atensi, b.kode_rek "+
					 "from yk_billkunj_tmp a "+
					 "       inner join yk_loker bb on a.loker=bb.loker "+					
					 "       inner join cust b on bb.kode_cust=b.kode_cust "+					
					 "		 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					 "		 inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "		 inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.cs< 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill ='"+this.app._userLog+"' "+
					 "group by  c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
					 ",b.kode_sap, b.kode_rek "+
					
					 "order by dc desc,kode_akun";				
		this.totD = this.totC = 0;
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				if (line.dc.toUpperCase() == "D") this.totD += parseFloat(line.nilai);
				if (line.dc.toUpperCase() == "C") this.totC += parseFloat(line.nilai);
				this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk,line.atensi,line.kode_rek]);
			}
		}
		this.sg4.validasi();										
		this.doHitungGar();		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						if (this.status == "SIMPAN") {
							this.app._mainForm.pesan(2,"Transaksi Sukses Tereksekusi ("+ this.e_nb.getText()+")");
							this.app._mainForm.bClear.click();              
						}
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai,a.kunj,a.cs "+
		             "from yk_bill_m a inner join yk_hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.posted ='F' and a.modul='KUG' and a.jenis='BAREV' ";		
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
			this.sg3.appendData([line.no_bill,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs)]); 
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
				this.stsSimpan = 0;
				setTipeButton(tbHapus);
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.bUpload.hide();
				this.bValid.hide();
				
				var strSQL = "select keterangan,jenis,tanggal,nilai,kunj,cs,no_hutang from yk_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.e_nb2.setText(line.no_hutang);						
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);												
						this.e_total.setText(floatToNilai(line.nilai));						
						this.e_kunj.setText(floatToNilai(line.kunj));						
						this.e_cs.setText(floatToNilai(line.cs));						
					}
				}																
				
				this.dbLib.execQuerySync("call sp_yk_bill ('"+this.e_nb.getText()+"','"+this.app._lokasi+"')");			
				var data = this.dbLib.getDataProvider("select *,kode_produk as kode_biaya,kode_vendor as kode_mitra,'-' as loker_baru from yk_bill_lap where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;					
					this.sg1.clear();				
					this.selectPage(undefined, 1);
					this.sgn.setTotalPage(Math.ceil(this.dataJU.rs.rows.length / 20));
					this.sgn.rearrange();
					this.sgn.activePage = 0;	
					
				} else this.sg1.clear(1);										
			}									
		} catch(e) {alert(e);}
	}
});
