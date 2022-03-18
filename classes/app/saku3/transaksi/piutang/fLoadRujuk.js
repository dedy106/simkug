window.app_saku3_transaksi_piutang_fLoadRujuk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fLoadRujuk.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_piutang_fLoadRujuk";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing Pengobatan Rujukan", 0);	
		
		this.maximize();		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);			
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Billing","List Billing"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bill","Tanggal","Jenis","No Invoice","Deskripsi","BP"],
					colWidth:[[5,4,3,2,1,0],[80,250,100,70,70,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Billing",click:[this,"doLoad3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bill", readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis Load",items:["AKRU"], readOnly:true, tag:2});								
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Total Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});							
		this.bLoad = new button(this.pc2.childPage[0],{bound:[560,18,80,18],caption:"Load Data",click:[this,"doLoad"]});		
		this.bValid = new button(this.pc2.childPage[0],{bound:[660,18,80,18],caption:"Rekon Data",click:[this,"doValid"]});			
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,995,349], childPage:["Data Billing","Pesan Error","Data Anggaran"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:18,tag:9,
				colTitle:["Kode Mitra","No ref","NIK","Nama","Loker","Band","Nikes","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya", //0-12
						  "Nilai Rujukan", //13
						  "Kode Keg","No Rujuk","No Urut","Status"], //14-17
				colWidth:[[17,16,15, 14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
				          [100,80,80,80,  80,   70,70,70,70,70,100,70,70,100,100,70, 100,70]],
				colFormat:[[13],[cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});		
		
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
	}
};
window.app_saku3_transaksi_piutang_fLoadRujuk.extend(window.portalui_childForm);
window.app_saku3_transaksi_piutang_fLoadRujuk.implement({	
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_vendor.toUpperCase(),line.noref,line.nik,line.namapegawai,line.loker.toUpperCase(),line.band,line.nikes,line.namapasien,line.dokter,line.tglmasuk,line.tglkeluar,line.icd10.toUpperCase(),line.kodebiaya,	
								floatToNilai(line.nilai_utangpiutang),
								'0.0',line.norujukan,line.transutangpiutangid,line.status.toUpperCase()]);
		
		}
		this.sg1.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doLoad : function () {
		var strSQL = "select "+
		            
		             "isnull(b.kode_vendor,'XXX') as kode_vendor,a.noref,a.nik,a.namapegawai,isnull(c.loker,'XXX') as loker,a.band,a.nikes,a.namapasien,a.dokter,a.tglmasuk,a.tglkeluar,isnull(d.kode_icdx,'XXX') as icd10,a.kodebiaya,"+	
					 "sum(a.nilai_utangpiutang) as nilai_utangpiutang,"+
					 "substring(a.norujukan,15,6) as norujukan,a.transutangpiutangid,'AKRU' as status "+
									 
		             "from dbhupitmp.dbo.transutangpiutang a "+
		             "left join dbhupitmp.dbo.mitra_vendor b on a.kodelokasi=b.kode_lokasi and a.kodemitra=b.kode_mitra "+
		             "left join (select x.nik,x.loker,y.periode from yk_peserta_d x inner join yk_peserta_m y on x.no_load=y.no_load) c on a.nik=c.nik and a.periode = c.periode   "+
		          	 "left join yk_icdx d on substring(a.icd10,1,3)=d.kode_icdx "+
		          	 "where a.periode<='"+this.e_periode.getText()+"' and a.kodelokasi='"+this.app._lokasi+"' and a.stsAkru ='-' "+ 
		          	 
		          	 "group by "+
		          	 
		          	 "isnull(b.kode_vendor,'XXX'),a.noref,a.nik,a.namapegawai,isnull(c.loker,'XXX'),a.band,a.nikes,a.namapasien,a.dokter,a.tglmasuk,a.tglkeluar,isnull(d.kode_icdx,'XXX'),a.kodebiaya,"+	
					 "substring(a.norujukan,15,6),a.transutangpiutangid "+
					
		          	 "order by a.transutangpiutangid ";
		          	 		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
			
			
			var tot = 0 ;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				tot += parseFloat(line.nilai_utangpiutang);					
			}
			this.e_total.setText(floatToNilai(tot));
			
		} else this.sg1.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},	
	doValid: function(sender){	
		try {	
			
			var temu = false;
			var msg  = ""; this.e_memo.setText("");
						
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];							
				if (line.kode_vendor.toUpperCase() == "XXX") {
					temu = true;
					msg+= "Kode Mitra : "+line.kode_vendor.toUpperCase()+"\n";
				}
				if (line.loker.toUpperCase() == "XXX") {
					temu = true;
					msg+= "Kode Loker : "+line.loker.toUpperCase()+"\n";
				}
				if (line.icd10.toUpperCase() == "XXX") {
					temu = true;
					msg+= "Kode ICD : "+line.icd10.toUpperCase()+"\n";
				}
			}				
					
		
			if (temu) {
				setTipeButton(tbAllFalse);
				this.e_memo.setText(msg);			
				system.alert(this,"Data tidak valid.","Lihat Pesan ERROR.");
				this.pc1.setActivePage(this.pc1.childPage[1]);
				return false;
			}
			else  { 
				setTipeButton(tbSimpan);					
				var totNA = 0 ;
				var strSQL = "select substring(a.norujukan,15,6) as norujukan,a.nikes "+
							 "from  dbhupitmp.dbo.transutangpiutang a "+
							 "inner join yk_bill_d b on a.periode=b.periode and a.kodelokasi=b.kode_lokasi and substring(a.norujukan,15,6)=b.no_rujuk and a.nikes=b.nikkes and b.jenis <> 'AKRU' "+
							 "where a.periode ='"+this.e_periode.getText()+"' and a.kodelokasi ='"+this.app._lokasi+"' and a.stsAkru ='-' "; 
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataValid = data;
					var line;		
					for (var i=0;i < this.dataValid.rs.rows.length;i++){
						line = this.dataValid.rs.rows[i];	
						for (var j=0;j < this.dataJU.rs.rows.length;j++){
							if (line.norujukan == this.dataJU.rs.rows[j].norujukan) {
								this.dataJU.rs.rows[j].status = "NONAKRU";
								totNA += parseFloat(this.dataJU.rs.rows[j].nilai_utangpiutang);
							}							
						}			
					}								
				} 
				
				var n_akru = nilaiToFloat(this.e_total.getText()) - totNA;
				this.e_nilai.setText(floatToNilai(n_akru));	
				
				this.doTampilData(1);	
				
				this.status = "VALIDASI";
				this.nbTmp = this.app._userLog;
				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();												
				sql.add("delete from yk_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
				this.dbLib.execQuerySync(sql);			
			
				var nilai = 0;
				var kode_biaya = "";
				for (var i=0;i < this.dataJU.rs.rows.length;i++){	
					nilai = Math.round(parseFloat(this.dataJU.rs.rows[i].nilai_utangpiutang));
					kode_biaya = this.dataJU.rs.rows[i].kodebiaya+"10";			
					if ((Math.round(parseFloat(this.dataJU.rs.rows[i].nilai_utangpiutang)) != 0) && (this.dataJU.rs.rows[i].status.toUpperCase() == "AKRU")) {					                                 
						sql.add("insert into yk_bill_tmp(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) values "+
								"('"+this.nbTmp+"',"+i+",'"+this.app._lokasi+"','"+this.dataJU.rs.rows[i].kode_vendor.toUpperCase()+"','"+this.dataJU.rs.rows[i].noref+"','"+this.dataJU.rs.rows[i].nik+"','"+this.dataJU.rs.rows[i].namapegawai+"','"+this.dataJU.rs.rows[i].loker.toUpperCase()+"','"+this.dataJU.rs.rows[i].tglmasuk+"','"+this.dataJU.rs.rows[i].tglkeluar+"','"+this.dataJU.rs.rows[i].icd10.toUpperCase()+"','"+this.dataJU.rs.rows[i].band+"','"+this.dataJU.rs.rows[i].nikes+"','"+this.dataJU.rs.rows[i].namapasien+"','"+this.dataJU.rs.rows[i].dokter.substr(0,10)+"','"+kode_biaya+"','0.0','"+this.dataJU.rs.rows[i].norujukan+"',"+nilai+",0,'AKRU','"+this.e_periode.getText()+"','-','-','-','-','"+this.app._lokasi+"')");
					}										
				}		
				this.dbLib.execArraySQL(sql);
			
				this.doHitungGar();
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					this.sg2.clear(1); 
					this.sg3.clear(1);
					this.e_memo.setText("");
					this.doClick(this.i_gen);
					setTipeButton(tbAllFalse);
					this.status = "";
				}
				break;
			case "simpan" :																	
					this.doHitungGar();					
					
					/*
					di open untuk optimalisasi 6-10-15
										
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
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','-','"+this.e_ket.getText()+"','-',"+nilaiToFloat(this.e_nilai.getText())+",0,0,0,'"+this.c_jenis.getText()+"','0','-','-','-','RUJUK')");							
							sql.add("insert into yk_billkunj_m(no_bill,kode_lokasi,tanggal,periode,keterangan,tgl_input,nik_user,total_kunj,total_cs,jenis,progress,no_batch,no_hutang,modul) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"',0,0,'"+this.c_jenis.getText()+"','0','-','-','RUJUK')");
														
							
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								var line = this.dataJU.rs.rows[i];	
								if (line.status.toUpperCase() == "AKRU") {
									var stsAkru = "AKRU";
									
									var kodeBiaya = line.kodebiaya+"10";
									sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) values "+
											"('"+this.e_nb.getText()+"',"+i+",'"+this.app._lokasi+"','"+line.kode_vendor.toUpperCase()+"','"+line.noref+"','"+line.nik+"','"+line.namapegawai+"','"+line.loker.toUpperCase()+"','"+line.tglmasuk+"','"+line.tglkeluar+"','"+line.icd10.toUpperCase()+"','"+line.band+"','"+line.nikes+"','"+line.namapasien+"','"+line.dokter.substr(0,10)+"','"+kodeBiaya+"','0.0','"+line.norujukan+"',"+parseNilai(line.nilai_utangpiutang)+",0,'AKRU','"+this.e_periode.getText()+"','-','-','-','-','"+this.app._lokasi+"')");
									sql.add("insert into dbhupitmp.dbo.yk_akru_d (nobukti,kode_lokasi,periode,nikes,norujukan,nilai_utangpiutang,transutangpiutangid) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.nikes+"','"+line.norujukan+"',"+nilaiToFloat(line.nilai_utangpiutang)+","+line.transutangpiutangid+")");
								}
								else var stsAkru = "NONAKRU";
								
								sql.add("update dbhupitmp.dbo.transutangpiutang set stsakru='"+stsAkru+"',nobukti='"+this.e_nb.getText()+"' "+
									    "where nikes='"+line.nikes+"' and substring(norujukan,15,6)='"+line.norujukan+"' and kodelokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"'");
									    
							} 
							
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
											    "('"+this.e_nb.getText()+"','BILL','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
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
			case "hapus" :																				
					this.status = "SIMPAN";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_billkunj_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update dbhupitmp.dbo.transutangpiutang set stsakru='-',nobukti='-' where nobukti='"+this.e_nb.getText()+"' and kodelokasi='"+this.app._lokasi+"'");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_bill_m','no_bill',this.app._lokasi+"-RUJ"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_ket.setFocus();
			this.stsSimpan = 1;
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
	doRequestReady: function(sender, methodName, result){
		try {
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
		}
		catch(e) {
			alert(e);
		}	
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
		             "from yk_bill_m a  "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress ='0' and a.modul='RUJUK' and a.jenis='AKRU'";		
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
			this.sg3.appendData([line.no_bill,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.bValid.hide();
				
				var strSQL = "select keterangan,jenis,tanggal,nilai,kunj,cs from yk_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);												
						this.e_total.setText(floatToNilai(line.nilai));												
					}
				}	
				
																			
				/*
				this.dbLib.execQuerySync("call sp_yk_bill ('"+this.e_nb.getText()+"','"+this.app._lokasi+"')");			
				var data = this.dbLib.getDataProvider("select *,kode_produk as kode_biaya,kode_vendor as kode_mitra from yk_bill_lap where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;					
					this.sg1.clear();				
					this.selectPage(undefined, 1);
					this.sgn.setTotalPage(Math.ceil(this.dataJU.rs.rows.length / 20));
					this.sgn.rearrange();
					this.sgn.activePage = 0;	
					
				} else this.sg1.clear(1);
				*/										
			}									
		} catch(e) {alert(e);}
	}
});


/*

closing bulanan cek data akru rujukan yg belum reverse

*/
